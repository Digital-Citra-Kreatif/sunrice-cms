<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;
use Illuminate\Http\Request;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Support\SiteCache;

/**
 * The whole-page cache (`sunrice-cms.cache.pages`, with
 * spatie/laravel-responsecache): site pages rendered once and kept until
 * the content changes, for visitors who aren't signed in. Forms keep
 * working: each visitor gets their own CSRF token in a kept page.
 *
 * Left out: anyone signed in, a visitor with something flashed to them
 * (form errors, old input, a thank-you message), search results and any
 * address with `?q=` or `?reply_to=` (UNKEPT_QUERY), a `?page=` that isn't
 * a plain number or that the page doesn't paginate by (one past the last
 * page is a 404), pages that aren't a plain 200, a page whose rendering
 * called dontKeep() (an entry filter given a value it ignores or one of
 * any number or text), a `cache.query` parameter the page didn't read()
 * (an entry filter reads the values among its terms and options), and
 * what skipWhen() says:
 *
 *     app(PageCache::class)->skipWhen(fn (Request $request, ?Page $page): bool =>
 *         $request->cookies->has('cart') || $page?->collection?->handle === 'products');
 *
 * How long a page is kept: `sunrice-cms.cache.ttl` at most, shorter when
 * lifetimeUsing() says (the shortest answer wins; 0 keeps nothing):
 *
 *     app(PageCache::class)->lifetimeUsing(fn (Request $request, ?Page $page): ?int =>
 *         $page?->collection?->handle === 'events' ? 300 : null);
 *
 * See PageCacheProfile for how responsecache asks.
 *
 * @api
 */
final class PageCache
{
    /**
     * Query parameters whose pages are neither served from the cache nor
     * kept: what's searched (search boxes show it) and the comment a
     * visitor replies to.
     */
    public const UNKEPT_QUERY = ['q', 'reply_to'];

    /** @internal The request attribute dontKeep() sets. */
    public const DONT_KEEP = 'sunrice-cms.page-cache.dont-keep';

    /** @internal The request attribute set when the page asked for its page number. */
    public const PAGINATED = 'sunrice-cms.page-cache.paginated';

    /** @internal The request attribute read() adds to: the `cache.query` parameters the page read. */
    public const READ = 'sunrice-cms.page-cache.read';

    /** @var list<Closure(Request, ?Page): bool> */
    private array $skips = [];

    /** @var list<Closure(Request, ?Page): ?int> */
    private array $lifetimes = [];

    public static function enabled(): bool
    {
        return SiteCache::enabled() && filter_var(config('sunrice-cms.cache.pages', false), FILTER_VALIDATE_BOOL);
    }

    /** @param Closure(Request, ?Page): bool $skip true: don't serve this page from the cache, or keep it */
    public function skipWhen(Closure $skip): self
    {
        $this->skips[] = $skip;

        return $this;
    }

    /** @param Closure(Request, ?Page): ?int $lifetime seconds to keep this page; null: no opinion */
    public function lifetimeUsing(Closure $lifetime): self
    {
        $this->lifetimes[] = $lifetime;

        return $this;
    }

    /** The shortest lifetimeUsing() answer for a page (never below 0), or null when none has one. */
    public function lifetime(Request $request, ?Page $page): ?int
    {
        $shortest = null;
        foreach ($this->lifetimes as $lifetime) {
            $seconds = $lifetime($request, $page);
            if ($seconds !== null) {
                $shortest = max(0, $shortest === null ? $seconds : min($shortest, $seconds));
            }
        }

        return $shortest;
    }

    /** A visitor who sees the same pages as everyone: served and kept pages. */
    public function forVisitor(Request $request): bool
    {
        if (! self::enabled() || ! $request->isMethod('GET') || auth()->check() || auth(app(Panel::class)->getGuard())->check()) {
            return false;
        }
        foreach (self::UNKEPT_QUERY as $name) {
            if ($request->query->has($name)) {
                return false;
            }
        }
        // ?page=abc reads as page 1: kept apart it would be a copy, kept as page 1 a wrong page for some paginator.
        if ($request->query->has('page') && ! PageCacheHasher::plainPageNumber($request->query('page'))) {
            return false;
        }
        if ($request->hasSession()) {
            $session = $request->session();
            if ($session->has('errors') || $session->get('_flash.old', []) !== [] || $session->hasOldInput()) {
                return false;
            }
        }

        return ! $this->skipped($request, null);
    }

    /** Whether the page just rendered may be kept. */
    public function keeps(Request $request, ?Page $page): bool
    {
        // Search results: as many pages as searches. Drafts and previews: never. A lifetime of 0: not at all.
        // A page number the page didn't read: as many copies as numbers.
        // A `cache.query` parameter the page didn't read (or read a value it doesn't have): as many copies as values.
        return $page?->type !== Page::SEARCH && $page?->preview !== true
            && $request->attributes->get(self::DONT_KEEP) !== true
            && (PageCacheHasher::pageNumber($request) === null || $request->attributes->get(self::PAGINATED) === true)
            && $this->unread($request) === []
            && $this->lifetime($request, $page) !== 0 && ! $this->skipped($request, $page);
    }

    /**
     * Say that the page being rendered read these `cache.query` parameters
     * and found their values among what it offers (a term, an option): a
     * kept page is told apart by them. A page whose address has a
     * `cache.query` parameter it didn't say it read isn't kept, so
     * `/about?sort=zzz` or `?price_min=<any number>` can't add copies of a
     * page to the cache store. The entry filter and paginators say it
     * themselves; call it from your own templates for what they read:
     *
     *     app(PageCache::class)->read('tab');
     */
    public function read(string $name, ?Request $request = null): void
    {
        $request ??= request();
        $read = $request->attributes->get(self::READ, []);
        $request->attributes->set(self::READ, [...(is_array($read) ? $read : []), $name]);
    }

    /**
     * The `cache.query` parameters with a value in the address that the
     * page didn't read (`page` is PAGINATED's).
     *
     * @return list<string>
     */
    public function unread(Request $request): array
    {
        $read = $request->attributes->get(self::READ, []);
        $read = is_array($read) ? $read : [];

        return array_values(array_filter(PageCacheHasher::query(), fn (string $name): bool => $name !== 'page'
            && PageCacheHasher::given($request->query($name)) && ! in_array($name, $read, true)));
    }

    /**
     * Don't keep the page being rendered: a template or component that
     * reads something from the address it ignores (an entry filter given
     * a value that isn't among its options) calls it, so a made-up value
     * can't add a copy of the page to the cache store.
     */
    public function dontKeep(?Request $request = null): void
    {
        ($request ?? request())->attributes->set(self::DONT_KEEP, true);
    }

    private function skipped(Request $request, ?Page $page): bool
    {
        foreach ($this->skips as $skip) {
            if ($skip($request, $page)) {
                return true;
            }
        }

        return false;
    }
}
