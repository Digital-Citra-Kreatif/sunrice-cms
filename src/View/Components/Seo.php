<?php

declare(strict_types=1);

namespace Sunrice\View\Components;

use Illuminate\View\Component;
use Sunrice\Frontend\TemplateContext;
use Sunrice\Frontend\UrlGenerator;
use Sunrice\Models\Asset;
use Sunrice\Models\Collection as ContentCollection;
use Sunrice\Models\Entry;
use Sunrice\Models\Setting;
use Sunrice\Models\Term;
use Sunrice\Support\Locales;
use Sunrice\Support\SeoFields;

/**
 * `<x-sunrice::seo />` — title, description, robots,
 * canonical, Open Graph, Twitter card and hreflang alternates. Fallback
 * pages get a canonical pointing at the main-language URL and no hreflang
 * output. All URLs are absolute, as search engines require.
 *
 * Put it once in the <head> of your site layout: without attributes it
 * describes the page being rendered (entry, term or listing page). Pass
 * :entry / :term / :collection to describe another page, :title to force
 * a title, or :default-title for pages without a meta title of their own.
 */
class Seo extends Component
{
    public ?Entry $entry;

    public string $title;

    public ?string $description;

    /** Null on error pages (404…): they have no address of their own to point at. */
    public ?string $canonical;

    /** og:type: "article" for entries (except the homepage), else "website". */
    public string $ogType = 'website';

    public ?string $publishedTime = null;

    public ?string $modifiedTime = null;

    public ?string $image;

    public string $locale;

    public bool $isFallback;

    /** @var array<string, string> */
    public array $alternates;

    /** `noindex, follow` when the page should stay out of search results, else null. */
    public ?string $robots;

    public string $siteName;

    /** The <title>: the title plus " | site name" when Settings → General turns that on. og:title stays bare. */
    public string $documentTitle;

    public ?string $twitterSite;

    /**
     * @param  string|null  $defaultTitle  used when the page has no meta title of its own
     * @param  Term|null  $term  on term pages, for hreflang links to the term in each language
     * @param  ContentCollection|null  $collection  on per-collection term pages
     */
    public function __construct(
        ?Entry $entry = null,
        ?string $title = null,
        ?string $description = null,
        ?string $defaultTitle = null,
        ?bool $noindex = null,
        protected ?Term $term = null,
        protected ?ContentCollection $collection = null,
    ) {
        // Nothing passed: the page being rendered (set by the page
        // controller), so a bare <x-sunrice::seo /> works in any layout.
        if ($entry === null && $term === null && $collection === null) {
            $page = request()->attributes->get('sunrice.page');
            if ($page instanceof TemplateContext) {
                $entry = $page->pageType === 'entry' ? $page->entry : null;
                $term = $page->term;
                $collection = $page->collection;
                $this->term = $term;
                $this->collection = $collection;
            }
        }

        $this->entry = $entry;
        $this->locale = $entry === null ? Locales::current() : ($entry->resolvedLocale ?? Locales::current());
        $this->isFallback = $entry !== null && (bool) $entry->isFallback;

        // The page's own SEO, then its collection's or taxonomy's defaults,
        // then the site settings.
        $seo = $this->pageSeo();
        $defaults = $this->defaultSeo();
        // Empty SEO fields filled from the page's own content (Settings → SEO).
        $fromFields = $this->fieldSeo($defaults);
        foreach (['title', 'description', 'image'] as $key) {
            if (($seo[$key] ?? '') === '' || ($seo[$key] ?? null) === null) {
                if (($fromFields[$key] ?? null) !== null) {
                    $seo[$key] = $fromFields[$key];
                }
            }
        }

        // An explicit title (passed by the template) wins, as before.
        $this->title = $title
            ?? ((($seo['title'] ?? '') ?: null)
            ?? $defaultTitle
            ?? ($entry !== null ? $entry->title : null)
            ?? ($term !== null ? $term->name : null)
            ?? $collection?->titleIn($this->locale)
            ?? (string) config('app.name'));
        $this->description = $description
            ?? ((($seo['description'] ?? '') ?: (($defaults['description'] ?? '') ?: config('sunrice.seo.description'))) ?: null);
        // Whatever the source (a template passing a rich-text field, the
        // page's own SEO, defaults), the tags hold plain text only.
        $this->title = SeoFields::plainText($this->title, 300) ?? (string) config('app.name');
        $this->description = SeoFields::plainText($this->description, 300);
        if (! is_numeric($seo['image'] ?? null) && is_numeric($defaults['image'] ?? null)) {
            $seo['image'] = $defaults['image'];
        }
        if (! empty($defaults['noindex'])) {
            $seo['noindex'] = true;
        }
        $this->image = $this->image($seo);
        $this->canonical = $this->canonical($seo);
        $this->alternates = $this->alternates();
        $this->robots = $this->robots($seo, $noindex);
        // A custom canonical sends search engines elsewhere: language
        // links from this page would contradict it.
        if (! empty($seo['canonical'])) {
            $this->alternates = [];
        }
        // Search result pages stay out of search engines.
        if (request()->attributes->get('sunrice.noindex') === true) {
            $this->robots = 'noindex, follow';
        }
        // Error pages (404…) stay out of search results and claim no URL.
        if (request()->attributes->has('sunrice.error_status')) {
            $this->robots = 'noindex, follow';
            $this->canonical = null;
            $this->alternates = [];
        }
        if ($entry !== null && (int) Setting::get('homepage_entry_id', 0) !== (int) $entry->id) {
            $this->ogType = 'article';
            $this->publishedTime = $entry->published_at?->toIso8601String();
            $this->modifiedTime = $entry->updated_at?->toIso8601String();
        }
        $this->siteName = (string) config('app.name');
        $this->documentTitle = $this->withSuffix($this->title);
        $this->twitterSite = config('sunrice.seo.twitter_site') ?: null;
    }

    protected function withSuffix(string $title): string
    {
        $site = trim($this->siteName);
        if (! config('sunrice.seo.title_suffix') || $site === '' || $title === $site || str_ends_with($title, $site)) {
            return $title;
        }
        $separator = trim((string) config('sunrice.seo.title_separator', '|')) ?: '|';

        return $title.' '.$separator.' '.$site;
    }

    /**
     * This page's own SEO fields: the entry's, the term's (in the page's
     * language, else the main one), or the listing page's.
     *
     * @return array<string, mixed>
     */
    protected function pageSeo(): array
    {
        if ($this->entry !== null) {
            return (array) ($this->entry->seo ?? []);
        }
        if ($this->term !== null) {
            $translation = $this->term->resolved ?? $this->term->readyTranslation($this->locale) ?? $this->term->mainTranslation();

            return $translation === null ? [] : (array) ($translation->seo ?? []);
        }
        if ($this->collection !== null) {
            $byLocale = ContentCollection::archiveByLocale($this->collection->archive_data);
            /** @var array<string, mixed> $own */
            $own = (array) ($byLocale[$this->locale]['seo'] ?? []);
            /** @var array<string, mixed> $main */
            $main = (array) ($byLocale[Locales::main()]['seo'] ?? []);

            // Field by field: a translation's empty field uses the main one.
            return array_merge($main, array_filter($own, fn (mixed $v) => ! in_array($v, [null, ''], true)));
        }

        return [];
    }

    /**
     * Meta title, description and image taken from the fields chosen for
     * the page's collection or taxonomy (or picked automatically).
     *
     * @param  array<string, mixed>  $defaults  the collection's or taxonomy's settings.seo
     * @return array{title?: string, description?: string, image?: int}
     */
    protected function fieldSeo(array $defaults): array
    {
        if ($this->entry !== null) {
            $blueprint = $this->entry->activeBlueprint();
            $data = $this->entry->data;
        } elseif ($this->term !== null) {
            $blueprint = $this->term->taxonomy?->blueprint;
            $translation = $this->term->resolved ?? $this->term->readyTranslation($this->locale) ?? $this->term->mainTranslation();
            $data = $translation === null ? [] : (array) ($translation->data ?? []);
        } else {
            return [];
        }

        $fields = SeoFields::resolve($blueprint, $defaults);
        $out = [];
        if ($fields['title'] !== null && ($title = SeoFields::plainText($data[$fields['title']] ?? null, 70)) !== null) {
            $out['title'] = $title;
        }
        if ($fields['description'] !== null && ($description = SeoFields::plainText($data[$fields['description']] ?? null)) !== null) {
            $out['description'] = $description;
        }
        if ($fields['image'] !== null) {
            $image = $data[$fields['image']] ?? null;
            $image = is_array($image) ? ($image[0] ?? null) : $image;
            if (is_numeric($image)) {
                $out['image'] = (int) $image;
            }
        }

        return $out;
    }

    /**
     * Defaults from the page's collection (entries, listing pages) or
     * taxonomy (term pages): description, image, noindex.
     *
     * @return array<string, mixed>
     */
    protected function defaultSeo(): array
    {
        if ($this->entry !== null) {
            return (array) ($this->entry->collection?->setting('seo') ?? []);
        }
        if ($this->term !== null) {
            return (array) ($this->term->taxonomy?->setting('seo') ?? []);
        }

        return (array) ($this->collection?->setting('seo') ?? []);
    }

    /** @param array<string, mixed> $seo */
    protected function robots(array $seo, ?bool $noindex): ?string
    {
        // The site-wide switch (e.g. on staging) wins over per-page settings.
        $hidden = (bool) config('sunrice.seo.noindex', false)
            || ($noindex ?? (bool) ($seo['noindex'] ?? false));

        return $hidden ? 'noindex, follow' : null;
    }

    /** @param array<string, mixed> $seo */
    protected function canonical(array $seo): string
    {
        $urls = app(UrlGenerator::class);

        // Fallback pages canonicalize to the main-language URL.
        if ($this->isFallback && $this->entry !== null) {
            return url($urls->entry($this->entry, Locales::main()));
        }

        if (! empty($seo['canonical'])) {
            return url((string) $seo['canonical']);
        }

        // A term shown in a language it has no translation for repeats the
        // main-language page: point there.
        if ($this->term !== null && $this->termIsFallback()) {
            return url($urls->term($this->term, Locales::main(), $this->collection));
        }

        if ($this->entry !== null) {
            return url($urls->entry($this->entry, $this->locale));
        }

        // Listings: keep the page number so page 2 isn't marked a copy of page 1.
        $page = array_filter(
            request()->query(),
            fn ($value, $key) => preg_match('/(^|_)page$/', (string) $key) === 1 && is_numeric($value) && (int) $value > 1,
            ARRAY_FILTER_USE_BOTH,
        );

        return url()->current().($page === [] ? '' : '?'.http_build_query($page));
    }

    protected function termIsFallback(): bool
    {
        return $this->entry === null && $this->term !== null
            && ! Locales::isMain($this->locale) && $this->term->readyTranslation($this->locale) === null;
    }

    /** @return array<string, string> */
    protected function alternates(): array
    {
        if ($this->entry === null) {
            return $this->termIsFallback() ? [] : $this->pageAlternates();
        }

        // No hreflang on fallback pages.
        if ($this->isFallback) {
            return [];
        }

        $urls = app(UrlGenerator::class);
        $alternates = [];

        foreach (Locales::available() as $locale) {
            if (! Locales::isMain($locale)) {
                $translation = $this->entry->translation($locale);
                if (! $translation?->is_ready) {
                    continue;
                }
            }
            $alternates[$locale] = url($urls->entry($this->entry, $locale));
        }

        $alternates['x-default'] = url($urls->entry($this->entry, Locales::main()));

        return $alternates;
    }

    /**
     * Listing and term pages exist in every language: link them all. A
     * term only counts in a language it has a Ready translation for.
     *
     * @return array<string, string>
     */
    protected function pageAlternates(): array
    {
        if (Locales::available() === [Locales::main()] || ! request()->attributes->has('sunrice.path')) {
            return [];
        }

        $urls = app(UrlGenerator::class)->localeUrls($this->term, $this->collection);
        if ($this->term !== null) {
            $urls = array_filter(
                $urls,
                fn (string $locale) => Locales::isMain($locale) || $this->term->readyTranslation($locale) !== null,
                ARRAY_FILTER_USE_KEY,
            );
        }
        if (count($urls) < 2) {
            return [];
        }

        $alternates = array_map(fn (string $url) => url($url), $urls);
        $alternates['x-default'] = $alternates[Locales::main()] ?? url('/');

        return $alternates;
    }

    /** @param array<string, mixed> $seo */
    protected function image(array $seo): ?string
    {
        // The page's own image, else the site's default share image.
        $id = $seo['image'] ?? null;
        if (! is_numeric($id)) {
            $id = config('sunrice.seo.image');
        }
        if (! is_numeric($id)) {
            return null;
        }

        $asset = Asset::query()->find((int) $id);

        return $asset === null ? null : url($asset->url('large'));
    }

    public function render(): string
    {
        return 'sunrice::components.seo';
    }
}
