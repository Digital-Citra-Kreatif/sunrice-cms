<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Site\Site;

/**
 * Rich text links to things on the site, as pages show them (the
 * rich_text field's hydrate()): a link with `data-link` gets the current
 * URL of what it points at in the page's language, as a Link field's
 * entry link does, so a new slug or a translation needs no edit.
 *
 *     data-link="entry:12"     the entry's page: its translation in the page's language, else its main language's
 *                              (at this language's address, with the fallback on); live only (drafts in a preview get no link)
 *     data-link="term:5"       the term's page in the page's language
 *     data-link="listing:3"    the collection's listing page in the page's language
 *
 * When it isn't there any more (missing, in the trash, not live, no
 * page), the link is dropped and its text kept. `data-link` itself is
 * never printed; a link without one, or with another plugin's kind, is
 * printed as stored. What every
 * link of the text points at is read at once, one query per kind (with
 * the context's other references, Schema::references(), none more).
 *
 * @internal RichText::hydrate() calls it.
 */
final class RichTextLinks
{
    public const ENTRY = 'entry';

    public const TERM = 'term';

    public const LISTING = 'listing';

    /** A link and its content: links don't nest, and sanitised HTML closes each one. */
    private const LINK = '/<a\b((?:[^>"\']++|"[^"]*+"|\'[^\']*+\')*+)>(.*?)<\/a>/is';

    /**
     * The ids each kind's links point at.
     *
     * @return array<string, list<int>> kind => ids
     */
    public static function targets(string $html): array
    {
        if (! str_contains($html, 'data-link')) {
            return [];
        }
        preg_match_all('/\sdata-link="([a-z][a-z0-9_-]*):(\d{1,18})"/', $html, $matches, PREG_SET_ORDER);
        $targets = [];
        foreach ($matches as $match) {
            $targets[$match[1]][] = (int) $match[2];
        }

        return array_map(fn (array $ids): array => array_values(array_unique($ids)), $targets);
    }

    public static function render(string $html, HydrationContext $context): string
    {
        $targets = self::targets($html);
        if ($targets === []) {
            return $html;
        }
        // Each kind at once: usually loaded already, with the entries' other references.
        $context->preloadEntries($targets[self::ENTRY] ?? []);
        $context->preloadTerms($targets[self::TERM] ?? []);
        $listings = [];
        foreach (($targets[self::LISTING] ?? []) === [] ? [] : Collection::query()->whereKey($targets[self::LISTING])->get() as $collection) {
            $listings[$collection->id] = $collection;
        }

        return preg_replace_callback(self::LINK, function (array $link) use ($context, $listings): string {
            if (! str_contains($link[1], 'data-link')) {
                return $link[0];
            }
            $attributes = HtmlTag::attributes('<a'.$link[1].'>');
            [$kind, $id] = explode(':', $attributes['data-link'] ?? '', 2) + ['', ''];
            // Another plugin's kind of link: as stored.
            if (! in_array($kind, [self::ENTRY, self::TERM, self::LISTING], true)) {
                return $link[0];
            }
            $url = ctype_digit($id) ? self::url($kind, (int) $id, $context, $listings) : null;
            if ($url === null) {
                return $link[2];
            }
            $tag = '<a'.HtmlTag::attribute('href', $url);
            foreach ($attributes as $name => $value) {
                if ($name !== 'href' && $name !== 'data-link') {
                    $tag .= HtmlTag::attribute($name, $value);
                }
            }

            return $tag.'>'.$link[2].'</a>';
        }, $html) ?? $html;
    }

    /**
     * Where a link goes now, or null when there's nowhere.
     *
     * @param  array<int, Collection>  $listings
     */
    private static function url(string $kind, int $id, HydrationContext $context, array $listings): ?string
    {
        if ($kind === self::ENTRY) {
            $translation = $context->entries([$id])->first();

            return $translation !== null && $translation->isLive() ? app(Site::class)->urlIn($translation, $context->locale) : null;
        }
        if ($kind === self::TERM) {
            $term = $context->terms([$id])->first();

            return $term === null || $term->taxonomy->trashed() ? null : $term->url($context->locale);
        }
        if ($kind === self::LISTING) {
            return isset($listings[$id]) ? $listings[$id]->listingUrl($context->locale) : null;
        }

        return null;
    }
}
