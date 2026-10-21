<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Support\Str;
use Sunrice\Admin\Media\Media;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Site\Page;
use Sunrice\Cms\Site\Search;
use Sunrice\Cms\Site\Site;

/**
 * Structured data (schema.org, as JSON-LD) for a page's head, so search
 * engines know what it is: the website (with its search box) and who
 * publishes it on every page; entries as articles or web pages (the
 * collection's `schema_type`) with breadcrumbs; listing and term pages as
 * collection pages; search pages as search results. Printed by
 * <x-sunrice-cms::seo />, which takes more nodes from templates
 * (`:schema="[…]"`). Off in Settings → Site.
 *
 * @api
 */
final class StructuredData
{
    /** Types a collection's entries may be. */
    public const ENTRY_TYPES = [
        'Article' => 'Article', 'BlogPosting' => 'Blog post', 'NewsArticle' => 'News article',
        'WebPage' => 'Web page', 'AboutPage' => 'About page', 'ContactPage' => 'Contact page',
        'RealEstateListing' => 'Real estate listing',
        'Person' => 'Person (a profile page)', 'Place' => 'Place', 'Product' => 'Product or offer',
    ];

    private const ARTICLES = ['Article', 'BlogPosting', 'NewsArticle'];

    /**
     * Types that are a thing the page is about rather than a kind of page:
     * the page is the WebPage subtype given, with the thing as its
     * `mainEntity` (`@id` the page's URL with #main, for a template's own
     * node to add to).
     */
    private const THINGS = ['Person' => 'ProfilePage', 'Place' => 'WebPage', 'Product' => 'ItemPage'];

    /**
     * The `@graph` for a page (null: the app's own pages), with `$extra`
     * nodes from the template. `$author`: an article's author, a name (a
     * Person) or a node of its own (a relative `url` made full); else who
     * publishes the site.
     *
     * @param  list<array<string, mixed>>  $extra
     * @param  string|array<string, mixed>|null  $author
     * @return list<array<string, mixed>>
     */
    public static function graph(?Page $page, array $extra = [], string|array|null $author = null): array
    {
        $site = app(SiteSettings::class);
        $locale = $page->locale ?? app()->getLocale();
        $home = url($locale === Locales::default() ? '/' : '/'.$locale);
        $person = $site->publisher === 'Person';
        $type = $person ? 'Person' : (preg_match('/^[A-Z][A-Za-z]{2,59}$/', $site->publisherType) === 1 ? $site->publisherType : 'Organization');
        $name = trim($site->publisherName) !== '' ? trim($site->publisherName) : $site->name();
        $publisher = ['@type' => $type, '@id' => url('/').'#publisher', 'name' => $name, 'url' => url('/')];
        if (! $person && $site->logo !== null && ($logo = Media::query()->find($site->logo)?->url()) !== null) {
            $publisher['logo'] = ['@type' => 'ImageObject', 'url' => $logo];
        }
        if (trim($site->telephone) !== '') {
            $publisher['telephone'] = trim($site->telephone);
        }
        if (trim($site->address) !== '') {
            $publisher['address'] = implode(', ', array_filter(array_map(trim(...), preg_split('/\R/', $site->address) ?: [])));
        }
        if ($site->profiles() !== []) {
            $publisher['sameAs'] = $site->profiles();
        }
        // Each language's home is its own WebSite node.
        $website = ['@type' => 'WebSite', '@id' => $home.'#website', 'url' => $home, 'name' => $site->name(), 'inLanguage' => self::language($locale), 'publisher' => ['@id' => $publisher['@id']]];
        if (trim($site->descriptionIn($locale)) !== '') {
            $website['description'] = Str::squish($site->descriptionIn($locale));
        }
        if (Search::enabled()) {
            $website['potentialAction'] = ['@type' => 'SearchAction', 'target' => ['@type' => 'EntryPoint', 'urlTemplate' => Search::url($locale).'?'.Search::NAME.'={search_term_string}'], 'query-input' => 'required name=search_term_string'];
        }

        $graph = [$website, $publisher];
        if ($page !== null && ! $page->preview) {
            array_push($graph, ...self::forPage($page, $website['@id'], $publisher['@id'], self::author($author)));
        }

        return [...$graph, ...$extra];
    }

    /**
     * The `<script type="application/ld+json">` contents: safe to print as
     * is (no characters that could end the script).
     *
     * @param  list<array<string, mixed>>  $graph
     */
    public static function json(array $graph): string
    {
        return (string) json_encode(['@context' => 'https://schema.org', '@graph' => $graph],
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_INVALID_UTF8_SUBSTITUTE);
    }

    /**
     * @param  string|array<string, mixed>|null  $author
     * @return array<string, mixed>|null
     */
    private static function author(string|array|null $author): ?array
    {
        if (is_string($author)) {
            $author = trim($author) === '' ? null : ['@type' => 'Person', 'name' => Str::squish($author)];
        }
        if ($author === null || $author === []) {
            return null;
        }
        if (is_string($author['url'] ?? null) && str_starts_with($author['url'], '/') && ! str_starts_with($author['url'], '//')) {
            $author['url'] = url($author['url']);
        }

        return $author;
    }

    /**
     * @param  array<string, mixed>|null  $author
     * @return list<array<string, mixed>>
     */
    private static function forPage(Page $page, string $website, string $publisher, ?array $author = null): array
    {
        $seo = Seo::forPage($page);
        $url = $seo['canonical'] ?? url()->current();
        $node = ['@id' => $url.'#webpage', 'url' => $url, 'inLanguage' => self::language($page->locale), 'isPartOf' => ['@id' => $website]];
        if ($seo['description'] !== null) {
            $node['description'] = $seo['description'];
        }
        $crumbs = [];

        if ($page->entry !== null) {
            $translation = $page->entry;
            $collection = $translation->entry->collection;
            $type = $collection->schema_type !== null && isset(self::ENTRY_TYPES[$collection->schema_type]) ? $collection->schema_type : ($collection->dated ? 'Article' : 'WebPage');
            $title = (string) $translation->title;
            $thing = isset(self::THINGS[$type]) ? ['@type' => $type, '@id' => $url.'#main', 'name' => $title, 'url' => $url] : null;
            $node = ['@type' => self::THINGS[$type] ?? $type, ...$node, 'name' => $title];
            if ($thing !== null) {
                if ($seo['description'] !== null) {
                    $thing['description'] = $seo['description'];
                }
                if ($seo['image'] !== null) {
                    $thing['image'] = $seo['image'];
                }
                $node['mainEntity'] = $thing;
            }
            if (in_array($type, self::ARTICLES, true)) {
                $node['headline'] = Str::limit($title, 107);
                $node['mainEntityOfPage'] = $url;
                $node['author'] = $author ?? ['@id' => $publisher];
                $node['publisher'] = ['@id' => $publisher];
                if ($translation->published_at !== null) {
                    $node['datePublished'] = $translation->published_at->toAtomString();
                }
                if ($translation->updated_at !== null) {
                    $node['dateModified'] = $translation->updated_at->toAtomString();
                }
            }
            if ($seo['image'] !== null) {
                $node['image'] = $seo['image'];
            }
            $crumbs = self::entryCrumbs($translation, $page->home, $page->locale);
        } elseif ($page->term !== null) {
            $node = ['@type' => 'CollectionPage', ...$node, 'name' => $page->term->title];
            $crumbs = [[$page->term->title, $url]];
        } elseif ($page->collection !== null) {
            $node = ['@type' => 'CollectionPage', ...$node, 'name' => $page->collection->titleIn($page->locale)];
            $crumbs = [[$page->collection->titleIn($page->locale), $url]];
        } elseif ($page->type === Page::SEARCH) {
            $node = ['@type' => 'SearchResultsPage', ...$node, 'name' => __('sunrice-cms::site.search.title', [], $page->locale)];
        }

        $nodes = [$node];
        if ($crumbs !== [] && ! $page->home) {
            $items = [[__('sunrice-cms::site.home', [], $page->locale), url($page->locale === Locales::default() ? '/' : '/'.$page->locale)], ...$crumbs];
            $list = [];
            foreach ($items as $i => [$name, $item]) {
                $list[] = ['@type' => 'ListItem', 'position' => $i + 1, 'name' => $name, 'item' => $item];
            }
            $nodes[0]['breadcrumb'] = ['@id' => $url.'#breadcrumb'];
            $nodes[] = ['@type' => 'BreadcrumbList', '@id' => $url.'#breadcrumb', 'itemListElement' => $list];
        }

        return $nodes;
    }

    /**
     * The way to an entry in the page's language: its collection's listing
     * page, its parents (as visitors there see them), itself.
     *
     * @return list<array{0: string, 1: string}>
     */
    private static function entryCrumbs(EntryTranslation $translation, bool $home, string $locale): array
    {
        if ($home) {
            return [];
        }
        $crumbs = [];
        $collection = $translation->entry->collection;
        if (($listing = $collection->listingUrl($locale)) !== null) {
            $crumbs[] = [$collection->titleIn($locale), $listing];
        }
        if ($collection->hierarchical) {
            foreach ($translation->entry->ancestors() as $ancestor) {
                $parent = $ancestor->shownIn($locale);
                if ($parent !== null && ($parentUrl = $parent->url()) !== null) {
                    $crumbs[] = [(string) $parent->title, $parentUrl];
                }
            }
        }
        $crumbs[] = [(string) $translation->title, (string) app(Site::class)->urlIn($translation, $locale)];

        return $crumbs;
    }

    private static function language(string $locale): string
    {
        return str_replace('_', '-', $locale);
    }
}
