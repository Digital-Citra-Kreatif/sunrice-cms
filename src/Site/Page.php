<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\HtmlString;
use Illuminate\Support\Str;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Locales;

/**
 * The site page being shown, for layouts: `Cms::page()` (null outside the
 * CMS's pages), `Cms::bodyClass()` and `Cms::localeUrls()`. A taxonomy's
 * index page (TAXONOMY) has `$taxonomy`, and `$collection` when it's that
 * collection's (/books/tags), else it's the shared one. `$fallback`:
 * the entry or term is the main language's, shown in a language it isn't
 * translated into (`$locale`). `$draft`: an editor looking at the live
 * page's unpublished changes (`?draft`; `$preview` too).
 *
 * @api
 */
final readonly class Page
{
    public const ENTRY = 'entry';

    public const LISTING = 'listing';

    public const TERM = 'term';

    public const SEARCH = 'search';

    /** A taxonomy's index page: its terms, linking to their pages. */
    public const TAXONOMY = 'taxonomy';

    private const KEY = 'sunrice-cms.page';

    /**
     * @param  self::ENTRY|self::LISTING|self::TERM|self::SEARCH|self::TAXONOMY  $type
     */
    public function __construct(
        public string $type,
        public string $locale,
        public string $view,
        public ?EntryTranslation $entry = null,
        public ?Collection $collection = null,
        public ?TermTranslation $term = null,
        public bool $preview = false,
        public bool $home = false,
        public int $pageNumber = 1,
        public bool $fallback = false,
        public bool $draft = false,
        public ?Taxonomy $taxonomy = null,
    ) {}

    public static function current(): ?self
    {
        $page = request()->attributes->get(self::KEY);

        return $page instanceof self ? $page : null;
    }

    /**
     * Sets the page shown, with the view Cms::resolveTemplateUsing() hooks
     * chose, and returns it.
     *
     * @internal set by the site's controllers
     */
    public function share(): self
    {
        $page = app(SiteHooks::class)->template($this);
        request()->attributes->set(self::KEY, $page);

        return $page;
    }

    /**
     * The language the page's content is in: the entry's or term's own,
     * which is the main language's on an untranslated page ($fallback),
     * else the page's. Mark fallback content with it (`lang="en"`), so
     * screen readers read it in the right language.
     */
    public function contentLocale(): string
    {
        return $this->entry->locale ?? $this->term->locale ?? $this->locale;
    }

    /**
     * ` lang="en"` on an untranslated page ($fallback), else nothing: for
     * the element around the entry's or term's own content, which is in
     * another language than the page (`<article{{ cms_page()?->langAttribute() }}>`).
     */
    public function langAttribute(): HtmlString
    {
        return new HtmlString($this->fallback ? ' lang="'.e(str_replace('_', '-', $this->contentLocale())).'"' : '');
    }

    /** The same page rendered with another view. */
    public function withView(string $view): self
    {
        return new self($this->type, $this->locale, $view, $this->entry, $this->collection, $this->term, $this->preview, $this->home, $this->pageNumber, $this->fallback, $this->draft, $this->taxonomy);
    }

    /**
     * Classes for the <body>, so CSS and scripts can target a kind of page:
     *
     *   entry     page-entry collection-{handle} entry-{id} entry-{slug} [home] [has-parent parent-{id}] [is-preview | is-draft]
     *   listing   page-listing collection-{handle} [paged paged-{n}]
     *   term      page-term [collection-{handle}] taxonomy-{handle} term-{id} term-{slug} [paged paged-{n}] (collection-: a collection's term page)
     *   search    page-search [paged paged-{n}]
     *   taxonomy  page-taxonomy [collection-{handle}] taxonomy-{handle} (a taxonomy's index page; collection-: a collection's)
     *   always    template-{view} lang-{locale} [logged-in]
     *
     * @param  list<string>  $classes
     * @return list<string>
     */
    public function classes(array $classes = []): array
    {
        $own = ['page-'.$this->type];
        if ($this->collection !== null) {
            $own[] = 'collection-'.$this->collection->handle;
        }
        if ($this->entry !== null) {
            $slug = $this->preview ? $this->entry->draft_slug : $this->entry->slug;
            array_push($own, 'entry-'.$this->entry->entry_id, 'entry-'.$slug);
            if ($this->home) {
                $own[] = 'home';
            }
            if (($parent = $this->entry->entry->parent_id) !== null) {
                array_push($own, 'has-parent', 'parent-'.$parent);
            }
        }
        if ($this->taxonomy !== null) {
            $own[] = 'taxonomy-'.$this->taxonomy->handle;
        }
        if ($this->term !== null) {
            array_push($own, 'taxonomy-'.$this->term->term->taxonomy->handle, 'term-'.$this->term->term_id, 'term-'.$this->term->slug);
        }
        if ($this->pageNumber > 1) {
            array_push($own, 'paged', 'paged-'.$this->pageNumber);
        }
        if ($this->draft) {
            $own[] = 'is-draft';
        } elseif ($this->preview) {
            $own[] = 'is-preview';
        }
        $own[] = 'template-'.str_replace(['::', '.', '/'], '-', $this->view);
        $own[] = 'lang-'.$this->locale;

        return self::clean([...$own, ...app(SiteHooks::class)->bodyClasses($this), ...$classes]);
    }

    /**
     * This page in each language it's on, for a language switcher:
     * ['en' => 'https://…/about', 'id' => 'https://…/id/tentang']. A
     * listing's and term page's keep the query string (its filters).
     *
     * @return array<string, string>
     */
    public function localeUrls(): array
    {
        return array_map(fn (array $link): string => $link['url'], $this->localeLinks());
    }

    /**
     * The same as localeUrls(), each with whether it's the main language's
     * entry or term standing in for one not translated into that language
     * (the main-language fallback): ['id' => ['url' => …, 'fallback' => true]].
     *
     * @return array<string, array{url: string, fallback: bool}>
     */
    public function localeLinks(): array
    {
        $urls = [];
        /** @var array<string, true> $fallback */
        $fallback = [];
        if ($this->entry !== null) {
            $entry = $this->entry->entry;
            $site = app(Site::class);
            $main = null;
            foreach ($entry->translations as $translation) {
                $translation->setRelation('entry', $entry);
                if ($translation->isLive() && ($url = $site->url($translation)) !== null) {
                    $urls[$translation->locale] = $url;
                }
                if ($translation->locale === Locales::default()) {
                    $main = $translation;
                }
            }
            // Languages it isn't live in show the main language's (Site::fallback()).
            foreach (Locales::all() as $locale) {
                if (! isset($urls[$locale]) && $main !== null && $site->isFallbackFor($main, $locale) && ($url = $site->urlIn($main, $locale)) !== null) {
                    $urls[$locale] = $url;
                    $fallback[$locale] = true;
                }
            }
        } elseif ($this->term !== null) {
            $term = $this->term->term;
            $site = app(Site::class);
            // A collection's term page stays in that collection in every language.
            foreach ($term->translations as $translation) {
                $translation->setRelation('term', $term)->in($this->term->scope);
                if (($url = $translation->url()) !== null) {
                    $urls[$translation->locale] = $this->paged($url);
                }
            }
            $main = $term->translations->firstWhere('locale', Locales::default());
            foreach (Locales::all() as $locale) {
                if (! isset($urls[$locale]) && $main !== null && Site::fallback() && ($url = $site->termUrlIn($main->in($this->term->scope), $locale)) !== null) {
                    $urls[$locale] = $this->paged($url);
                    $fallback[$locale] = true;
                }
            }
        } elseif ($this->type === self::SEARCH) {
            $q = request()->query(Search::NAME);
            $query = http_build_query(array_filter([Search::NAME => is_string($q) ? $q : null, 'page' => $this->pageNumber > 1 ? $this->pageNumber : null]));
            foreach (Locales::all() as $locale) {
                $urls[$locale] = Search::url($locale).($query === '' ? '' : "?{$query}");
            }
        } elseif ($this->taxonomy !== null) {
            foreach (Locales::all() as $locale) {
                if (($url = $this->taxonomy->indexUrl($locale, $this->collection)) !== null) {
                    $urls[$locale] = $this->paged($url);
                }
            }
        } elseif ($this->collection !== null) {
            foreach (Locales::all() as $locale) {
                if (($url = $this->collection->listingUrl($locale)) !== null) {
                    $urls[$locale] = $this->paged($url);
                }
            }
        }

        // In the order of the site's languages.
        $links = [];
        foreach (Locales::all() as $locale) {
            if (isset($urls[$locale])) {
                $links[$locale] = ['url' => $urls[$locale], 'fallback' => isset($fallback[$locale])];
            }
        }

        return $links;
    }

    /**
     * A listing's or term page's address in another language with what the
     * visitor chose kept: its query string (filters, sort, page number).
     * Term filters take a term's slug in any language (entry-filter). With
     * the page cache on, only the parameters kept pages are told apart by
     * (PageCacheQuery::query()): a page kept from `?utm_source=…` is
     * served for the address without it, so its links never carry it.
     */
    private function paged(string $url): string
    {
        $request = request();
        $query = PageCache::enabled() ? self::keyedQuery($request) : $request->getQueryString();
        if ($query !== null && $query !== '') {
            return "{$url}?{$query}";
        }

        return $this->pageNumber > 1 ? "{$url}?page={$this->pageNumber}" : $url;
    }

    /** The address's query parameters kept pages are told apart by (see PageCacheHasher), as a query string. */
    private static function keyedQuery(Request $request): string
    {
        $kept = [];
        foreach (PageCacheQuery::query() as $name) {
            $value = $name === 'page' ? PageCacheQuery::pageNumber($request) : $request->query($name);
            if (PageCacheQuery::given($value)) {
                $kept[$name] = $value;
            }
        }

        return Arr::query($kept);
    }

    /**
     * Body classes when no CMS page is shown (the app's own routes).
     *
     * @param  list<string>  $classes
     * @return list<string>
     */
    public static function classesOutside(array $classes = []): array
    {
        return self::clean(['lang-'.app()->getLocale(), ...$classes]);
    }

    /**
     * @param  list<string>  $classes
     * @return list<string>
     */
    private static function clean(array $classes): array
    {
        if (auth(app(Panel::class)->getGuard())->check()) {
            $classes[] = 'logged-in';
        }
        $clean = [];
        foreach ($classes as $class) {
            $class = Str::slug($class, '-', null);
            if ($class !== '') {
                $clean[] = $class;
            }
        }

        return array_values(array_unique($clean));
    }
}
