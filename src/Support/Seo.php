<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Closure;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Media\Media;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Site\Page;
use Sunrice\Cms\Site\Site;

/**
 * An entry translation's SEO: a title and description for search results,
 * a share image and noindex. Stored with its fields under the reserved
 * "seo" key, so it has drafts and revisions like the rest.
 *
 * @phpstan-type SeoTags array{title: string, page_title: string, own_title: bool, description: string|null, image: string|null, noindex: bool, robots: string|null, canonical: string|null, alternates: array<string, string>, type: string, site_name: string, locale: string, twitter: string|null, published_time: string|null, modified_time: string|null}
 *
 * @api
 */
final class Seo
{
    public const KEY = 'seo';

    /**
     * Checks SEO input and returns it as stored (null when empty).
     *
     * @return array{title: string|null, description: string|null, image: int|null, noindex: bool, canonical?: string}|null
     *
     * @throws ValidationException
     */
    public static function validate(mixed $input): ?array
    {
        if ($input === null) {
            return null;
        }
        /** @var array{title?: string|null, description?: string|null, image?: int|null, noindex?: bool|null, canonical?: string|null} $valid */
        $valid = Validator::make(['seo' => $input], [
            'seo' => ['array'],
            'seo.title' => ['nullable', 'string', 'max:255'],
            'seo.description' => ['nullable', 'string', 'max:500'],
            'seo.image' => ['nullable', 'integer', Rule::exists((new Media)->getTable(), 'id')->where(function (Builder $query): void {
                $query->whereNull('deleted_at');
                Media::whereTypes($query, ['image']);
            })],
            'seo.noindex' => ['nullable', 'boolean'],
            'seo.canonical' => ['nullable', 'string', 'max:2000', 'url:http,https'],
        ], [], ['seo.title' => 'SEO title', 'seo.description' => 'description', 'seo.image' => 'share image', 'seo.canonical' => 'canonical address'])->validate()['seo'] ?? [];
        $seo = [
            'title' => self::text($valid['title'] ?? null),
            'description' => self::text($valid['description'] ?? null),
            'image' => isset($valid['image']) ? (int) $valid['image'] : null,
            'noindex' => (bool) ($valid['noindex'] ?? false),
        ];
        // Only when set: older SEO without it stays as it was.
        if (($canonical = self::text($valid['canonical'] ?? null)) !== null) {
            $seo['canonical'] = $canonical;
        }

        return $seo['title'] === null && $seo['description'] === null && $seo['image'] === null && ! $seo['noindex'] && ! isset($seo['canonical']) ? null : $seo;
    }

    /**
     * What a page's head needs: title ("About | Acme", see SiteSettings),
     * description, image URL, noindex, canonical URL, the URLs of its other
     * languages (and "x-default", the main one's), and for share cards the
     * og:type, site name, language and X account (and for dated entries
     * when they were published and changed). What the entry's SEO card
     * leaves empty comes from the fields its collection names (SEO from
     * fields), then from Settings → Site.
     *
     * @return SeoTags
     */
    public static function for(EntryTranslation $translation, bool $preview = false): array
    {
        $data = ($preview ? $translation->draft_data : $translation->data) ?? [];
        $collection = $translation->entry->collection;
        $seo = self::withFields(is_array($data[self::KEY] ?? null) ? $data[self::KEY] : [], $collection, fn (): array => $translation->completeData($preview));
        $title = is_string($seo['title'] ?? null) ? $seo['title'] : (string) ($preview ? $translation->draft_title : $translation->title);
        $home = app(Site::class)->isHomepage($translation);
        $article = ! $home && $collection->dated;

        $tags = self::tags($seo, $home && ! is_string($seo['title'] ?? null) ? '' : $title, $preview, $preview ? null : app(Site::class)->url($translation),
            self::alternates($translation), $translation->locale, $article ? 'article' : 'website', is_string($seo['title'] ?? null));
        if ($article && ! $preview) {
            $tags['published_time'] = $translation->published_at?->toIso8601String();
            $tags['modified_time'] = $translation->updated_at?->toIso8601String();
        }

        return $tags;
    }

    /**
     * The same for a term's page: its SEO (under "seo" in the term's data),
     * the fields its taxonomy names, or its title, and its other languages'
     * pages. Past the first page of its entries, the canonical and
     * alternate URLs carry the page number (null: the page shown, when
     * it's this term's).
     *
     * @return SeoTags
     */
    public static function forTerm(TermTranslation $translation, ?int $page = null): array
    {
        $page ??= self::shownPage(fn (Page $shown): bool => $shown->term?->is($translation) === true);
        $term = $translation->term;
        $seo = self::withFields(is_array($translation->data[self::KEY] ?? null) ? $translation->data[self::KEY] : [], $term->taxonomy, function () use ($translation, $term): array {
            // Shared fields live in the main language's translation.
            $main = $term->translations->firstWhere('locale', Locales::default());

            return array_replace($main->data ?? [], $translation->data ?? []);
        });
        $url = $translation->url();

        return self::tags($seo, self::pageTitle(is_string($seo['title'] ?? null) ? $seo['title'] : $translation->title, $page), false, $url === null ? null : self::paged($url, $page),
            self::termAlternates($translation, $page), $translation->locale, 'website', is_string($seo['title'] ?? null));
    }

    /**
     * The URLs of a term page's languages by locale (with "x-default"),
     * for hreflang links; none when it has only one.
     *
     * @return array<string, string>
     */
    public static function termAlternates(TermTranslation $translation, int $page = 1): array
    {
        $term = $translation->term;
        $alternates = [];
        foreach ($term->translations as $other) {
            $other->setRelation('term', $term);
            if (($url = $other->url()) !== null) {
                $alternates[$other->locale] = self::paged($url, $page);
            }
        }

        return self::withDefault($alternates);
    }

    /**
     * The URLs of a listing page's languages by locale (with "x-default"),
     * for hreflang links; none with only one language.
     *
     * @return array<string, string>
     */
    public static function listingAlternates(Collection $collection, int $page = 1): array
    {
        $alternates = [];
        foreach (Locales::all() as $other) {
            if (($url = $collection->listingUrl($other)) !== null) {
                $alternates[$other] = self::paged($url, $page);
            }
        }

        return self::withDefault($alternates);
    }

    /**
     * The same for a collection's listing page: its SEO (the listing page's
     * own, per language: CollectionListing data under "seo") or the
     * collection's title, in each language, with the page number past the
     * first page (null: the page shown, when it's this listing).
     *
     * @return SeoTags
     */
    public static function forListing(Collection $collection, string $locale, ?int $page = null): array
    {
        $page ??= self::shownPage(fn (Page $shown): bool => $shown->collection?->is($collection) === true && $shown->locale === $locale);
        $own = $collection->listings->firstWhere('locale', $locale)?->data[self::KEY] ?? null;
        $seo = is_array($own) ? $own : [];

        $url = $collection->listingUrl($locale);

        return self::tags($seo, self::pageTitle(is_string($seo['title'] ?? null) ? $seo['title'] : $collection->titleIn($locale), $page), false, $url === null ? null : self::paged($url, $page),
            self::listingAlternates($collection, $page), $locale, 'website', is_string($seo['title'] ?? null));
    }

    /**
     * The SEO card's values, with what it leaves empty taken from the
     * fields the collection or taxonomy names: a text field's text as the
     * title, a text or textarea field's as the description (plain, at most
     * 300 characters), a media field's first file as the share image.
     *
     * @param  array<mixed>  $seo
     * @param  Closure(): array<mixed>  $data  the page's field values, read only when a field is named
     * @return array<mixed>
     */
    private static function withFields(array $seo, Collection|Taxonomy $owner, Closure $data): array
    {
        $mapped = ['title' => $owner->seo_title_field, 'description' => $owner->seo_description_field, 'image' => $owner->seo_image_field];
        $values = null;
        foreach ($mapped as $key => $field) {
            $empty = $key === 'image' ? ! is_int($seo[$key] ?? null) : ! is_string($seo[$key] ?? null);
            if ($field === null || $field === '' || ! $empty) {
                continue;
            }
            $values ??= $data();
            $value = $values[$field] ?? null;
            if ($key === 'image') {
                $first = is_array($value) ? ($value[0] ?? null) : $value;
                if (is_int($first) || (is_string($first) && ctype_digit($first))) {
                    $seo['image'] = (int) $first;
                    $seo['image_from_field'] = true;
                }

                continue;
            }
            $text = self::plain(is_string($value) ? $value : null);
            if ($text !== null) {
                $seo[$key] = $key === 'description' ? Str::limit($text, 300) : Str::limit($text, 255);
            }
        }

        return $seo;
    }

    /** The number of the page shown, when it's the one asked about (else 1). */
    private static function shownPage(Closure $isThis): int
    {
        $shown = Page::current();

        return $shown !== null && $isThis($shown) ? $shown->pageNumber : 1;
    }

    /** A title with the page number past the first page: "Blog (page 2)". */
    private static function pageTitle(string $title, int $page): string
    {
        $numbered = $page > 1 ? __('sunrice-cms::site.page_title', ['title' => $title, 'page' => $page]) : null;

        return is_string($numbered) ? $numbered : $title;
    }

    /** A URL with ?page=n past the first page: each page is its own, not a copy of the first. */
    private static function paged(string $url, int $page): string
    {
        return $page > 1 ? "{$url}?page={$page}" : $url;
    }

    /**
     * The tags of the page being shown (see Page), or the site's own for a
     * page of the app's: `$title` is then the page's title. A page shown
     * with the main language's content (Page::$fallback) is canonical to
     * the main language's page and has no hreflang links.
     *
     * @return SeoTags
     */
    public static function forPage(?Page $page, ?string $title = null): array
    {
        return match (true) {
            // The main language's page shown in another language: canonical to the main page, no hreflang links.
            $page?->entry !== null && $page->fallback => ['alternates' => []] + self::for($page->entry, $page->preview),
            $page?->entry !== null => self::for($page->entry, $page->preview),
            $page?->term !== null && $page->fallback => ['alternates' => []] + self::forTerm($page->term, $page->pageNumber),
            $page?->term !== null => self::forTerm($page->term, $page->pageNumber),
            $page?->collection !== null => self::forListing($page->collection, $page->locale, $page->pageNumber),
            // Search results aren't pages to index.
            $page?->type === Page::SEARCH => self::tags(['noindex' => true], $title ?? 'Search', false, null, [], $page->locale, 'website', $title !== null),
            // An error page (404 and the like): not a page to index, nor the address's canonical.
            self::errorPage() => self::tags(['noindex' => true], $title ?? '', false, null, [], app()->getLocale(), 'website', $title !== null),
            default => self::tags([], $title ?? '', false, url()->current(), [], app()->getLocale(), 'website', $title !== null),
        };
    }

    /**
     * Marks the request as showing an error page (the app's errors::404
     * and others, through a view composer), for forPage().
     *
     * @internal
     */
    public static function markErrorPage(): void
    {
        request()->attributes->set('sunrice-cms.error-page', true);
    }

    private static function errorPage(): bool
    {
        return request()->attributes->get('sunrice-cms.error-page') === true;
    }

    /**
     * @param  array<mixed>  $seo  the page's SEO card
     * @param  array<string, string>  $alternates
     * @return SeoTags
     */
    private static function tags(array $seo, string $title, bool $preview, ?string $canonical, array $alternates, string $locale, string $type, bool $ownTitle = false): array
    {
        $site = app(SiteSettings::class);
        $imageId = is_int($seo['image'] ?? null) ? $seo['image'] : $site->image;
        $siteDescription = $site->descriptionIn($locale);
        $description = is_string($seo['description'] ?? null) ? $seo['description'] : (trim($siteDescription) !== '' ? Str::squish($siteDescription) : null);
        $own = is_string($seo['canonical'] ?? null) && SafeUrl::isSafe($seo['canonical']) ? $seo['canonical'] : null;

        return [
            'title' => $site->title($title),
            'page_title' => $title,
            'own_title' => $ownTitle,
            'description' => $description,
            'image' => $imageId !== null ? self::imageUrl($imageId, ($seo['image_from_field'] ?? false) === true) : null,
            'noindex' => $preview || ($seo['noindex'] ?? false) === true || $site->hidden(),
            // A page that asks not to be indexed still has links worth following; a preview or a hidden site doesn't.
            'robots' => match (true) {
                $preview || $site->hidden() => 'noindex, nofollow',
                ($seo['noindex'] ?? false) === true => 'noindex',
                default => null,
            },
            'canonical' => $preview ? null : ($own ?? $canonical),
            'alternates' => $alternates,
            'type' => $type,
            'site_name' => $site->name(),
            'locale' => $locale,
            'twitter' => $site->twitterHandle(),
            'published_time' => null,
            'modified_time' => null,
        ];
    }

    /**
     * A template's say over the tags (<x-sunrice-cms::seo>'s attributes):
     * `title` instead of the page's, `defaultTitle` when the page has no
     * SEO title of its own, `description` instead of the page's, and
     * `noindex` to keep this page out of search results. Titles and
     * descriptions are taken as plain text.
     *
     * @param  SeoTags  $tags
     * @return SeoTags
     */
    public static function adjust(array $tags, ?string $title = null, ?string $description = null, ?string $defaultTitle = null, bool $noindex = false): array
    {
        $title = self::plain($title) ?? ($tags['own_title'] ? null : self::plain($defaultTitle));
        if ($title !== null) {
            $tags['title'] = app(SiteSettings::class)->title($title);
            $tags['page_title'] = $title;
            $tags['own_title'] = true;
        }
        if (($description = self::plain($description)) !== null) {
            $tags['description'] = Str::limit($description, 300);
        }
        $tags['noindex'] = $tags['noindex'] || $noindex;
        $tags['robots'] ??= $noindex ? 'noindex' : null;

        return $tags;
    }

    /** Text without tags or runs of spaces; null when nothing is left. */
    private static function plain(?string $text): ?string
    {
        return self::text($text === null ? null : html_entity_decode(strip_tags($text), ENT_QUOTES | ENT_HTML5));
    }

    /**
     * @param  array<string, string>  $alternates
     * @return array<string, string> with "x-default" (the main language's), when there are several
     */
    private static function withDefault(array $alternates): array
    {
        if (count($alternates) < 2) {
            return [];
        }
        $main = $alternates[Locales::default()] ?? null;

        return $main !== null ? [...$alternates, 'x-default' => $main] : $alternates;
    }

    /**
     * The live URLs of an entry's languages by locale, for hreflang links;
     * none when it's live in only one.
     *
     * @return array<string, string>
     */
    public static function alternates(EntryTranslation $translation): array
    {
        $entry = $translation->entry;
        $alternates = [];
        foreach ($entry->translations as $other) {
            $other->setRelation('entry', $entry);
            if ($other->isLive() && ($url = $other->url()) !== null) {
                $alternates[$other->locale] = $url;
            }
        }

        return self::withDefault($alternates);
    }

    /**
     * A share image's URL, read once per content version (a change to the
     * file starts a new one). `$imagesOnly`: null for a file that isn't an
     * image (a media field may hold any kind).
     */
    private static function imageUrl(int $id, bool $imagesOnly = false): ?string
    {
        $url = app(SiteCache::class)->remember("media-url:{$id}", function () use ($id): string {
            $media = Media::query()->find($id);

            return $media === null ? '' : ($media->isImage() ? '' : '!').$media->url();
        });
        if (str_starts_with($url, '!')) {
            return $imagesOnly ? null : substr($url, 1);
        }

        return $url === '' ? null : $url;
    }

    /** Territories for languages whose own code isn't one (en: en_US); the others are doubled (fr: fr_FR). */
    private const TERRITORIES = [
        'af' => 'ZA', 'ar' => 'AR', 'bn' => 'IN', 'ca' => 'ES', 'cs' => 'CZ', 'cy' => 'GB', 'da' => 'DK', 'el' => 'GR',
        'en' => 'US', 'et' => 'EE', 'eu' => 'ES', 'fa' => 'IR', 'fil' => 'PH', 'ga' => 'IE', 'gl' => 'ES', 'he' => 'IL',
        'hi' => 'IN', 'hy' => 'AM', 'ja' => 'JP', 'jv' => 'ID', 'ka' => 'GE', 'kk' => 'KZ', 'km' => 'KH', 'ko' => 'KR',
        'ms' => 'MY', 'nb' => 'NO', 'nn' => 'NO', 'no' => 'NO', 'sl' => 'SI', 'sq' => 'AL', 'sr' => 'RS', 'su' => 'ID',
        'sv' => 'SE', 'sw' => 'KE', 'ta' => 'IN', 'te' => 'IN', 'tl' => 'PH', 'uk' => 'UA', 'ur' => 'PK', 'vi' => 'VN', 'zh' => 'CN',
    ];

    /**
     * A language as share cards name it (og:locale), language_TERRITORY:
     * "id" → "id_ID", "en" → "en_US", "pt-BR" → "pt_BR", "zh-Hant" → "zh_TW".
     */
    public static function ogLocale(string $locale): string
    {
        $parts = preg_split('/[-_]/', $locale) ?: [$locale];
        $language = strtolower($parts[0]);
        $region = $parts[1] ?? null;
        $region = match (true) {
            $region === null => null,
            strtolower($region) === 'hant' => 'TW',
            strtolower($region) === 'hans' => 'CN',
            strlen($region) === 2 || ctype_digit($region) => strtoupper($region),
            default => null,
        };

        return $language.'_'.($region ?? self::TERRITORIES[$language] ?? strtoupper($language));
    }

    /** Whether a translation's live version asks not to be indexed. */
    public static function noindex(EntryTranslation $translation): bool
    {
        $seo = $translation->data[self::KEY] ?? null;

        return is_array($seo) && ($seo['noindex'] ?? false) === true;
    }

    private static function text(mixed $value): ?string
    {
        return is_string($value) && trim($value) !== '' ? Str::squish($value) : null;
    }
}
