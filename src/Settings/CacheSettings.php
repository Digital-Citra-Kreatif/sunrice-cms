<?php

declare(strict_types=1);

namespace Sunrice\Cms\Settings;

use Closure;
use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Support\Carbon;
use Sunrice\Admin\Activity\Activity;
use Sunrice\Admin\Resources\Forms\CheckboxList;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\ListInput;
use Sunrice\Admin\Resources\Forms\NumberInput;
use Sunrice\Admin\Resources\Forms\Section;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Settings\Settings;
use Sunrice\Admin\Support\Card;
use Sunrice\Cms\Actions\Cache\PreloadCache;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Site\PageCache;
use Sunrice\Cms\Site\PageCacheHasher;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SiteCache;

/**
 * Settings → Cache, guarded by cms.settings.cache: the whole-page cache
 * (on or off, how long pages are kept, pages never kept, which query
 * parameters count) and how long the site's data is kept, without code.
 * What's set here wins over `sunrice-cms.cache`, which stays the default
 * (the store is config only). The section's card clears the caches
 * (Actions\Cache\ClearCache). See packages/cms/docs/caching.md.
 *
 * @api
 */
final class CacheSettings extends Settings
{
    /** The whole-page cache as `sunrice-cms.cache.pages` says. */
    public const CONFIGURED = 'configured';

    public const ON = 'on';

    public const OFF = 'off';

    /** Other query parameters: the same kept page (as without them). */
    public const IGNORE = 'ignore';

    /** Other query parameters: neither served from the cache nor kept. */
    public const SKIP = 'skip';

    /** Preload on a schedule: never, every hour, every day. */
    public const NEVER = 'off';

    public const HOURLY = 'hourly';

    public const DAILY = 'daily';

    /** Common tracking parameters, ignored even when other parameters skip the cache. */
    public const TRACKING = "utm_*\nfbclid\ngclid\nmsclkid";

    public string $pageCache = self::CONFIGURED;

    /** Minutes a page is kept at most; null: the site data's lifetime. */
    public ?int $pageMinutes = null;

    /** Addresses never kept, one pattern per line ("/contact", "/account/*"). */
    public string $exclude = '';

    /** @var list<string> handles of the collections whose pages (and listing) are never kept */
    public array $collections = [];

    /** Query parameters that make a kept page of their own, one per line, besides `sunrice-cms.cache.query`. */
    public string $query = '';

    /** What other query parameters do: IGNORE or SKIP. */
    public string $otherQuery = self::IGNORE;

    /** Parameters ignored even with SKIP, one per line; `*` for any characters ("utm_*"). */
    public string $ignore = self::TRACKING;

    /** Minutes the site's data (addresses, menus, the sitemap) is kept at most; null: `sunrice-cms.cache.ttl`. */
    public ?int $siteMinutes = null;

    /** Preload the page cache after Clear page cache / Clear all site caches. */
    public bool $preloadAfterClear = false;

    /** Preload the page cache a minute after content changes. */
    public bool $preloadAfterChanges = false;

    /** Preload on a schedule: NEVER, HOURLY or DAILY (needs Laravel's scheduler). */
    public string $preloadSchedule = self::NEVER;

    /** @var array{0: string, 1: string, 2: string}|null the exclusion and ignore patterns as regular expressions, for the text they're from */
    private ?array $patterns = null;

    public static function key(): string
    {
        return 'cache';
    }

    public static function description(): string
    {
        return 'Keep whole pages for visitors, choose what\'s never kept, and clear the caches.';
    }

    public static function form(Form $form): Form
    {
        $unavailable = PageCache::unavailable();
        $off = $unavailable !== null;
        $configured = self::configuredPages() ? 'on' : 'off';

        return $form->schema([
            Section::make('Whole pages')->description('Pages rendered once and kept for visitors who aren\'t signed in: much faster, and a busy day costs the server little. A change to the content shows at once.')->columns(2)->schema([
                Select::make('pageCache')->label('Whole-page cache')->required()->disabled($off)->options([
                    self::CONFIGURED => $configured === 'on' ? 'As set up by the developer (on)' : 'As set up by the developer (off)',
                    self::ON => 'Keep whole pages',
                    self::OFF => 'Don\'t keep whole pages',
                ])->help($off ? 'Not available on this server: ask your developer.' : 'Turn it off when templates show something per visitor (a cart, "Hi, Ana") on every page.')
                    ->developerHelp($unavailable ?? 'The default is SUNRICE_PAGE_CACHE in the app\'s .env (config sunrice-cms.cache.pages); what\'s chosen here wins.'),
                NumberInput::make('pageMinutes')->label('Keep pages for (minutes)')->integer()->min(1)->max(10080)->disabled($off)
                    ->placeholder((string) intdiv(self::configuredTtl() + 59, 60))
                    ->help('At most; a change to the content shows at once anyway. Empty: as long as the site\'s data.'),
            ]),
            Section::make('Pages never kept')->description('Always rendered afresh, for pages that show something per visitor or change by the minute.')->schema([
                ListInput::make('exclude')->label('Addresses')->addLabel('Add address')->max(100)->maxLength(5000)->placeholder('/account/*')->disabled($off)
                    ->rules([self::listRule(self::pathProblem(...))])
                    ->help('One address per row, starting with /. * stands for anything: /account/* is every page under /account, /search* every address starting with /search. They match in every language (/contact is /id/contact too).'),
                CheckboxList::make('collections')->label('Collections')->verbatim()->disabled($off)->options(fn (): array => self::collectionOptions())
                    ->help('Their pages and their listing page.'),
            ]),
            Section::make('Query strings')->description('What comes after ? in an address (?sort=price&utm_source=newsletter). Kept pages are told apart only by the parameters listed here, so made-up ones can\'t fill the cache with copies of a page.')->schema([
                ListInput::make('query')->label('Parameters that make a page of their own')->addLabel('Add parameter')->max(50)->maxLength(2000)->placeholder('sort')->disabled($off)
                    ->rules([self::listRule(fn (string $name): ?string => self::parameterProblem($name, false))])
                    ->help(self::configuredQuery() === []
                        ? 'Parameters templates read (a filter, a sort, a tab). ?page= always counts.'
                        : __('Parameters templates read (a filter, a sort, a tab). ?page= always counts, and so do :names (set up by the developer).', ['names' => implode(', ', self::configuredQuery())])),
                Select::make('otherQuery')->label('Any other parameter')->required()->disabled($off)->options([
                    self::IGNORE => 'Ignore it: visitors get the kept page',
                    self::SKIP => 'Skip the cache: the page is rendered afresh and not kept',
                ])->help('Ignoring is faster. Skip the cache when templates read parameters that aren\'t listed above.'),
                ListInput::make('ignore')->label('Parameters always ignored')->addLabel('Add parameter')->max(50)->maxLength(2000)->placeholder('utm_*')->disabled($off)
                    ->showWhen('otherQuery', self::SKIP)
                    ->rules([self::listRule(fn (string $name): ?string => self::parameterProblem($name, true))])
                    ->help('Tracking parameters from newsletters and ads, which never skip the cache. * stands for anything: utm_* is utm_source, utm_medium…'),
            ]),
            Section::make('Preloading')->description('Request the site\'s pages ahead of visitors, so even the first visitor gets a kept page. It runs in the background, a few pages at a time.')->schema([
                Toggle::make('preloadAfterClear')->label('Preload after clearing the cache')->disabled($off),
                Toggle::make('preloadAfterChanges')->label('Preload after content changes')->disabled($off)
                    ->help('A minute after the last change. On a big site, this keeps the server busy after every edit.'),
                Select::make('preloadSchedule')->label('Preload on a schedule')->required()->disabled($off)->options([
                    self::NEVER => 'Never',
                    self::HOURLY => 'Every hour',
                    self::DAILY => 'Every day',
                ])->developerHelp('Preloading runs in queued jobs: it needs a queue worker (php artisan queue:work), and a schedule needs Laravel\'s scheduler in cron. From the command line: `php artisan sunrice:cache-preload`'),
            ]),
            Section::make('Site data')->description('Which page is at an address, menus, the sitemap, global sets and forms, kept until the content changes.')->schema([
                NumberInput::make('siteMinutes')->label('Keep the site\'s data for (minutes)')->integer()->min(1)->max(10080)->disabled(! SiteCache::enabled())
                    ->placeholder((string) intdiv(self::configuredTtl() + 59, 60))
                    ->help(SiteCache::enabled() ? 'At most; a change shows at once anyway. Empty: as set up by the developer.' : 'The site\'s cache is turned off on this server.')
                    ->developerHelp('The default is sunrice-cms.cache.ttl (seconds); where it\'s kept is sunrice-cms.cache.store (SUNRICE_CACHE_STORE).'),
            ]),
        ]);
    }

    public static function cards(Authorizable $user): array
    {
        $settings = new self;
        $unavailable = PageCache::unavailable();
        $last = Activity::query()->where('subject_type', 'cache')->where('action', 'cleared')->latest('id')->first();
        $state = match (true) {
            $unavailable !== null => self::said('Not available', []),
            ! PageCache::enabled() => self::said($settings->pageCache === self::CONFIGURED ? 'Off (as configured)' : 'Off (set here)', []),
            default => self::said($settings->pageCache === self::CONFIGURED ? 'On (as configured)' : 'On (set here)', []),
        };
        $preloader = app(PreloadCache::class);
        $preload = $preloader->status();
        $running = $preloader->running();
        $card = Card::make('Cache')->rows([
            'Whole-page cache' => $state,
            'Pages kept in' => $unavailable === null ? self::storeName(config('responsecache.cache.store')) : null,
            'Site data kept in' => SiteCache::enabled() ? self::storeName(config('sunrice-cms.cache.store')) : self::said('Not kept (turned off)', []),
            'Last cleared' => $last?->created_at,
            'Last cleared by' => $last === null ? null : ($last->user_name ?? self::said('System', [])).' ('.self::said($last->subject_id === 'pages' ? 'page cache' : 'all site caches', []).')',
            'Last preload' => $preload === null ? null : Carbon::createFromTimestamp($preload['started_at']),
            'Preload finished' => $preload === null || $preload['finished_at'] === null ? null : Carbon::createFromTimestamp($preload['finished_at']),
            'Pages preloaded' => $preload === null ? null : self::said(':warmed of :total, :failed failed', ['warmed' => (string) $preload['warmed'], 'total' => (string) $preload['total'], 'failed' => (string) $preload['failed']]),
        ]);
        if ($running && $preload !== null) {
            $card->notice(self::said('Preloading now: :done of :total pages so far.', ['done' => (string) ($preload['warmed'] + $preload['failed']), 'total' => (string) $preload['total']]));
        } elseif ($preload !== null && $preload['stopped'] !== null) {
            $card->notice('The last preload stopped early.', Card::WARNING, $preload['stopped']);
        }
        if ($unavailable !== null) {
            $card->notice('The whole-page cache isn\'t available on this server: ask your developer.', Card::WARNING, $unavailable);
        }
        if (PageCache::enabled() && ! $running) {
            $card->button('Preload cache', route('sunrice.admin.cms.cache.preload', [], false), 'Preload the page cache now? The site\'s pages are requested in the background, a few at a time.');
        }
        if ($unavailable === null) {
            $card->button('Clear page cache', route('sunrice.admin.cms.cache.clear-pages', [], false), 'Clear the page cache now? Visitors get freshly rendered pages, so the site is a little slower for a moment.');
        }
        $card->button('Clear all site caches', route('sunrice.admin.cms.cache.clear', [], false), 'Clear all the site\'s caches now? Pages, addresses, menus and the sitemap are read afresh, so the site is slower for a moment.');

        return [$card];
    }

    /** Whether whole pages are kept: as chosen here, else `sunrice-cms.cache.pages`. */
    public function pagesOn(): bool
    {
        return match ($this->pageCache) {
            self::ON => true,
            self::OFF => false,
            default => self::configuredPages(),
        };
    }

    /** Seconds a page is kept at most: the minutes set, else the site data's lifetime. */
    public function pageLifetime(): int
    {
        return $this->pageMinutes !== null && $this->pageMinutes > 0 ? $this->pageMinutes * 60 : $this->siteTtl();
    }

    /** Seconds the site's data is kept at most: the minutes set, else `sunrice-cms.cache.ttl`. */
    public function siteTtl(): int
    {
        return $this->siteMinutes !== null && $this->siteMinutes > 0 ? $this->siteMinutes * 60 : self::configuredTtl();
    }

    /** @return list<string> the address patterns never kept */
    public function excludedPaths(): array
    {
        return ListInput::items($this->exclude);
    }

    /** @return list<string> the query parameters set here that make a kept page of their own */
    public function queryParameters(): array
    {
        return array_values(array_filter(ListInput::items($this->query), fn (string $name): bool => self::parameterProblem($name, false) === null));
    }

    /** @return list<string> the parameter patterns always ignored */
    public function ignoredParameters(): array
    {
        return ListInput::items($this->ignore);
    }

    /** Whether a query parameter that isn't listed skips the cache. */
    public function skipsOtherQuery(): bool
    {
        return $this->otherQuery === self::SKIP;
    }

    /**
     * Whether an address (a path, "/id/contact") is never kept: it, or it
     * without its language's prefix, matches a pattern.
     */
    public function excludesPath(string $path): bool
    {
        $regex = $this->patterns()[0];
        if ($regex === '') {
            return false;
        }
        $path = '/'.trim($path, '/');

        return preg_match($regex, $path) === 1 || preg_match($regex, Locales::split($path)[1]) === 1;
    }

    /** Whether a collection's pages are never kept. */
    public function excludesCollection(?string $handle): bool
    {
        return $handle !== null && in_array($handle, $this->collections, true);
    }

    /** Whether a query parameter is always ignored. */
    public function ignores(string $name): bool
    {
        $regex = $this->patterns()[1];

        return $regex !== '' && preg_match($regex, $name) === 1;
    }

    /** @return array{0: string, 1: string, 2: string} the exclusion and ignore regular expressions, and what they're from */
    private function patterns(): array
    {
        $from = $this->exclude."\0".$this->ignore;
        if ($this->patterns === null || $this->patterns[2] !== $from) {
            $this->patterns = [self::regex(array_map(fn (string $p): string => str_starts_with($p, '*') ? rtrim($p, '/') : '/'.trim($p, '/'), $this->excludedPaths()), 'i'), self::regex($this->ignoredParameters(), ''), $from];
        }

        return $this->patterns;
    }

    /** @param list<string> $patterns "*" for any characters; '' for none */
    private static function regex(array $patterns, string $flags): string
    {
        $parts = array_map(fn (string $p): string => str_replace('\*', '.*', preg_quote($p, '#')), $patterns);

        return $parts === [] ? '' : '#^(?:'.implode('|', $parts).')$#'.$flags;
    }

    /** @param Closure(string): ?string $problem */
    private static function listRule(Closure $problem): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail) use ($problem): void {
            foreach (ListInput::items($value) as $item) {
                $message = $problem($item);
                if ($message !== null) {
                    $fail($message);

                    return;
                }
            }
        };
    }

    private static function pathProblem(string $path): ?string
    {
        return preg_match('#^[/*][A-Za-z0-9\-._~/*%@!$&\'()+,;=:]{0,199}$#', $path) === 1 ? null : self::said('":item" isn\'t an address starting with / or * (without ?…).', ['item' => $path]);
    }

    private static function parameterProblem(string $name, bool $wildcards): ?string
    {
        if (in_array($name, PageCache::UNKEPT_QUERY, true)) {
            return self::said('?:item= pages are never kept.', ['item' => $name]);
        }

        return preg_match($wildcards ? '/^[A-Za-z0-9_.\-\[\]*]{1,64}$/' : '/^[A-Za-z0-9_.\-\[\]]{1,64}$/', $name) === 1 ? null
            : self::said($wildcards ? '":item" isn\'t a parameter name (letters, numbers, _ - . [ ] and *).' : '":item" isn\'t a parameter name (letters, numbers, _ - . [ ]).', ['item' => $name]);
    }

    /** @param array<string, string> $replace */
    private static function said(string $text, array $replace): string
    {
        $said = __($text, $replace);

        return is_string($said) ? $said : $text;
    }

    /** @return array<string, string> collections with pages, by handle */
    private static function collectionOptions(): array
    {
        $options = [];
        foreach (Collection::query()->where(fn ($q) => $q->whereNotNull('route')->orWhereNotNull('listing_route'))->orderBy('title')->get(['handle', 'title']) as $collection) {
            $options[$collection->handle] = $collection->title;
        }

        return $options;
    }

    private static function configuredPages(): bool
    {
        return filter_var(config('sunrice-cms.cache.pages', false), FILTER_VALIDATE_BOOL);
    }

    private static function configuredTtl(): int
    {
        $ttl = config('sunrice-cms.cache.ttl', 3600);

        return is_numeric($ttl) ? max(1, (int) $ttl) : 3600;
    }

    /** @return list<string> */
    private static function configuredQuery(): array
    {
        return array_values(array_diff(PageCacheHasher::configuredQuery(), PageCacheHasher::QUERY));
    }

    private static function storeName(mixed $store): string
    {
        $default = config('cache.default');
        $name = is_string($store) && $store !== '' ? $store : (is_string($default) ? $default : 'file');
        $driver = config("cache.stores.{$name}.driver");

        return is_string($driver) && $driver !== $name ? "{$name} ({$driver})" : $name;
    }
}
