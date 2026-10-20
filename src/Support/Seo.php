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
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Site\Page;
use Sunrice\Cms\Site\Site;

/**
 * An entry translation's SEO: a title and description for search results,
 * a share image and noindex. Stored with its fields under the reserved
 * "seo" key, so it has drafts and revisions like the rest.
 *
 * @phpstan-type SeoTags array{title: string, description: string|null, image: string|null, noindex: bool, canonical: string|null, alternates: array<string, string>, type: string, site_name: string, locale: string, twitter: string|null}
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
     * og:type, site name, language and X account. What the entry's SEO card
     * leaves empty comes from Settings → Site.
     *
     * @return SeoTags
     */
    public static function for(EntryTranslation $translation, bool $preview = false): array
    {
        $data = ($preview ? $translation->draft_data : $translation->data) ?? [];
        $seo = is_array($data[self::KEY] ?? null) ? $data[self::KEY] : [];
        $title = is_string($seo['title'] ?? null) ? $seo['title'] : (string) ($preview ? $translation->draft_title : $translation->title);
        $home = app(Site::class)->isHomepage($translation);
        $collection = $translation->entry->collection;

        return self::tags($seo, $home && ! is_string($seo['title'] ?? null) ? '' : $title, $preview, $preview ? null : $translation->url(),
            self::alternates($translation), $translation->locale, ! $home && $collection->dated ? 'article' : 'website');
    }

    /**
     * The same for a term's page: its SEO (under "seo" in the term's data)
     * or its title, and its other languages' pages. Past the first page of
     * its entries, the canonical and alternate URLs carry the page number
     * (null: the page shown, when it's this term's).
     *
     * @return SeoTags
     */
    public static function forTerm(TermTranslation $translation, ?int $page = null): array
    {
        $page ??= self::shownPage(fn (Page $shown): bool => $shown->term?->is($translation) === true);
        $seo = is_array($translation->data[self::KEY] ?? null) ? $translation->data[self::KEY] : [];
        $alternates = [];
        foreach ($translation->term->translations as $other) {
            $other->setRelation('term', $translation->term);
            if (($url = $other->url()) !== null) {
                $alternates[$other->locale] = self::paged($url, $page);
            }
        }

        $url = $translation->url();

        return self::tags($seo, is_string($seo['title'] ?? null) ? $seo['title'] : $translation->title, false, $url === null ? null : self::paged($url, $page),
            self::withDefault($alternates), $translation->locale, 'website');
    }

    /**
     * The same for a collection's listing page: its title, in each
     * language, with the page number past the first page (null: the page
     * shown, when it's this listing).
     *
     * @return SeoTags
     */
    public static function forListing(Collection $collection, string $locale, ?int $page = null): array
    {
        $page ??= self::shownPage(fn (Page $shown): bool => $shown->collection?->is($collection) === true && $shown->locale === $locale);
        $alternates = [];
        foreach (Locales::all() as $other) {
            if (($url = $collection->listingUrl($other)) !== null) {
                $alternates[$other] = self::paged($url, $page);
            }
        }

        $url = $collection->listingUrl($locale);

        return self::tags([], $collection->title, false, $url === null ? null : self::paged($url, $page), self::withDefault($alternates), $locale, 'website');
    }

    /** The number of the page shown, when it's the one asked about (else 1). */
    private static function shownPage(Closure $isThis): int
    {
        $shown = Page::current();

        return $shown !== null && $isThis($shown) ? $shown->pageNumber : 1;
    }

    /** A URL with ?page=n past the first page: each page is its own, not a copy of the first. */
    private static function paged(string $url, int $page): string
    {
        return $page > 1 ? "{$url}?page={$page}" : $url;
    }

    /**
     * The tags of the page being shown (see Page), or the site's own for a
     * page of the app's: `$title` is then the page's title.
     *
     * @return SeoTags
     */
    public static function forPage(?Page $page, ?string $title = null): array
    {
        return match (true) {
            $page?->entry !== null => self::for($page->entry, $page->preview),
            $page?->term !== null => self::forTerm($page->term, $page->pageNumber),
            $page?->collection !== null => self::forListing($page->collection, $page->locale, $page->pageNumber),
            // Search results aren't pages to index.
            $page?->type === Page::SEARCH => self::tags(['noindex' => true], $title ?? 'Search', false, null, [], $page->locale, 'website'),
            default => self::tags([], $title ?? '', false, url()->current(), [], app()->getLocale(), 'website'),
        };
    }

    /**
     * @param  array<mixed>  $seo  the page's SEO card
     * @param  array<string, string>  $alternates
     * @return SeoTags
     */
    private static function tags(array $seo, string $title, bool $preview, ?string $canonical, array $alternates, string $locale, string $type): array
    {
        $site = app(SiteSettings::class);
        $imageId = is_int($seo['image'] ?? null) ? $seo['image'] : $site->image;
        $description = is_string($seo['description'] ?? null) ? $seo['description'] : (trim($site->description) !== '' ? Str::squish($site->description) : null);
        $own = is_string($seo['canonical'] ?? null) && SafeUrl::isSafe($seo['canonical']) ? $seo['canonical'] : null;

        return [
            'title' => $site->title($title),
            'description' => $description,
            'image' => $imageId !== null ? Media::query()->find($imageId)?->url() : null,
            'noindex' => $preview || ($seo['noindex'] ?? false) === true || $site->hidden(),
            'canonical' => $preview ? null : ($own ?? $canonical),
            'alternates' => $alternates,
            'type' => $type,
            'site_name' => $site->name(),
            'locale' => $locale,
            'twitter' => $site->twitterHandle(),
        ];
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
