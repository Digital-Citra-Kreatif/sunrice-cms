<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Support\Str;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Locales;

/**
 * The site page being shown, for layouts: `Cms::page()` (null outside the
 * CMS's pages), `Cms::bodyClass()` and `Cms::localeUrls()`.
 *
 * @api
 */
final readonly class Page
{
    public const ENTRY = 'entry';

    public const LISTING = 'listing';

    public const TERM = 'term';

    private const KEY = 'sunrice-cms.page';

    /**
     * @param  self::ENTRY|self::LISTING|self::TERM  $type
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
    ) {}

    public static function current(): ?self
    {
        $page = request()->attributes->get(self::KEY);

        return $page instanceof self ? $page : null;
    }

    /** @internal set by the site's controller */
    public function share(): void
    {
        request()->attributes->set(self::KEY, $this);
    }

    /**
     * Classes for the <body>, so CSS and scripts can target a kind of page:
     *
     *   entry     page-entry collection-{handle} entry-{id} entry-{slug} [home] [has-parent parent-{id}] [is-preview]
     *   listing   page-listing collection-{handle} [paged paged-{n}]
     *   term      page-term taxonomy-{handle} term-{id} term-{slug} [paged paged-{n}]
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
        if ($this->term !== null) {
            array_push($own, 'taxonomy-'.$this->term->term->taxonomy->handle, 'term-'.$this->term->term_id, 'term-'.$this->term->slug);
        }
        if ($this->pageNumber > 1) {
            array_push($own, 'paged', 'paged-'.$this->pageNumber);
        }
        if ($this->preview) {
            $own[] = 'is-preview';
        }
        $own[] = 'template-'.str_replace(['::', '.', '/'], '-', $this->view);
        $own[] = 'lang-'.$this->locale;

        return self::clean([...$own, ...$classes]);
    }

    /**
     * This page in each language it's on, for a language switcher:
     * ['en' => 'https://…/about', 'id' => 'https://…/id/tentang'].
     *
     * @return array<string, string>
     */
    public function localeUrls(): array
    {
        $urls = [];
        if ($this->entry !== null) {
            $entry = $this->entry->entry;
            foreach ($entry->translations as $translation) {
                $translation->setRelation('entry', $entry);
                if ($translation->isLive() && ($url = $translation->url()) !== null) {
                    $urls[$translation->locale] = $url;
                }
            }
        } elseif ($this->term !== null) {
            $term = $this->term->term;
            foreach ($term->translations as $translation) {
                $translation->setRelation('term', $term);
                if (($url = $translation->url()) !== null) {
                    $urls[$translation->locale] = $url;
                }
            }
        } elseif ($this->collection !== null) {
            foreach (Locales::all() as $locale) {
                if (($url = $this->collection->listingUrl($locale)) !== null) {
                    $urls[$locale] = $url;
                }
            }
        }

        // In the order of the site's languages.
        return array_filter(array_replace(array_fill_keys(Locales::all(), null), $urls), fn (?string $url): bool => $url !== null);
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
