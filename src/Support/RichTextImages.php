<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Sunrice\Cms\Fields\HydrationContext;

/**
 * Makes rich text's media library images responsive when pages show
 * them (the rich_text field's hydrate()): each `<img data-media-id>`
 * gets the file's `srcset`, a `sizes` worked out from its width preset,
 * `width` and `height` when it has none (no layout shift), and
 * `loading="lazy"` and `decoding="async"`. Only attributes are added,
 * before the tag's end: everything stored (its `src`, `alt`, `class`) and
 * all other markup is printed byte for byte, and nothing stored changes.
 *
 * Left as stored: images of files that are missing, in the trash or can't
 * have sizes (SVGs, other files), external images (no data-media-id), and
 * images with a `srcset` or `loading` of their own. Rich text without a
 * data-media-id costs one str_contains(). The files are read with the
 * context's other references (Schema::references() has them), so a list
 * of entries costs no query more.
 *
 * Config `sunrice-cms.rich_text`: `responsive_images` (false: printed as
 * stored), `content_width` and `sizes`.
 *
 * @internal RichText::hydrate() calls it.
 */
final class RichTextImages
{
    /** Below this viewport width the starter templates' floated images take the text's full width (site.css). */
    private const FLOAT_BREAKPOINT = '40em';

    /** An <img> tag, its attribute values quoted or not. */
    private const IMG = '/<img\b(?:[^>"\']++|"[^"]*+"|\'[^\']*+\')*+>/i';

    /** One attribute of a tag: its name, and its value in double, single or no quotes. */
    private const ATTRIBUTE = '/\s([^\s"\'>\/=]++)(?:\s*+=\s*+(?:"([^"]*+)"|\'([^\']*+)\'|([^\s>]++)))?/';

    public static function render(string $html, HydrationContext $context): string
    {
        if (! str_contains($html, 'data-media-id')) {
            return $html;
        }
        $config = config('sunrice-cms.rich_text');
        $config = is_array($config) ? $config : [];
        if (! (bool) ($config['responsive_images'] ?? true)) {
            return $html;
        }
        $ids = HtmlSanitizer::mediaIds($html);
        if ($ids === []) {
            return $html;
        }
        // Usually loaded already, with everything else the entries point at: one query for this field otherwise.
        $context->preloadMedia($ids);
        $sizes = $config['sizes'] ?? null;
        $sizes = is_string($sizes) && trim($sizes) !== '' ? trim($sizes) : null;
        $width = self::length($config['content_width'] ?? '46rem');

        return preg_replace_callback(self::IMG, fn (array $tag): string => self::image($tag[0], $context, $sizes, $width), $html) ?? $html;
    }

    /**
     * The tag with the attributes it lacks, or as it is.
     *
     * @param  array{0: float, 1: string}|null  $width
     */
    private static function image(string $tag, HydrationContext $context, ?string $sizes, ?array $width): string
    {
        if (! str_contains($tag, 'data-media-id')) {
            return $tag;
        }
        $attributes = self::attributes($tag);
        $id = $attributes['data-media-id'] ?? '';
        if (isset($attributes['srcset']) || isset($attributes['loading']) || ! ctype_digit($id) || strlen($id) > 18) {
            return $tag;
        }
        $media = $context->media((int) $id);
        if ($media === null || ! $media->isResizable() || $media->trashed()) {
            return $tag;
        }
        $added = [];
        $srcset = $media->srcset();
        // Only with a choice to make: the original alone is what src gives.
        if (str_contains($srcset, ',')) {
            $added['srcset'] = $srcset;
            if (! isset($attributes['sizes'])) {
                $added['sizes'] = $sizes ?? self::sizes($attributes['class'] ?? '', $width);
            }
        }
        [$storedWidth, $storedHeight] = [$attributes['width'] ?? null, $attributes['height'] ?? null];
        [$mediaWidth, $mediaHeight] = [$media->width, $media->height];
        if ($mediaWidth !== null && $mediaHeight !== null && $mediaWidth > 0 && $mediaHeight > 0) {
            if ($storedWidth === null && $storedHeight === null) {
                $added['width'] = (string) $mediaWidth;
                $added['height'] = (string) $mediaHeight;
            } elseif ($storedHeight === null && ctype_digit((string) $storedWidth)) {
                // The stored width kept, the height in the file's proportions.
                $added['height'] = (string) max(1, (int) round((int) $storedWidth * $mediaHeight / $mediaWidth));
            } elseif ($storedWidth === null && ctype_digit((string) $storedHeight)) {
                $added['width'] = (string) max(1, (int) round((int) $storedHeight * $mediaWidth / $mediaHeight));
            }
        }
        $added['loading'] = 'lazy';
        if (! isset($attributes['decoding'])) {
            $added['decoding'] = 'async';
        }
        $html = '';
        foreach ($added as $name => $value) {
            $html .= ' '.$name.'="'.htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE | ENT_HTML5, 'UTF-8').'"';
        }
        $closing = str_ends_with($tag, '/>') ? ' />' : '>';

        return rtrim(substr($tag, 0, -strlen(trim($closing)))).$html.$closing;
    }

    /**
     * A tag's attributes, by lowercase name (the first of a name counts, as
     * in browsers), their values decoded.
     *
     * @return array<string, string>
     */
    private static function attributes(string $tag): array
    {
        preg_match_all(self::ATTRIBUTE, substr($tag, 4), $matches, PREG_SET_ORDER | PREG_UNMATCHED_AS_NULL);
        $attributes = [];
        foreach ($matches as $match) {
            $name = strtolower((string) $match[1]);
            $value = $match[2] ?? $match[3] ?? $match[4] ?? '';
            $attributes[$name] ??= str_contains($value, '&') ? html_entity_decode($value, ENT_QUOTES | ENT_HTML5, 'UTF-8') : $value;
        }

        return $attributes;
    }

    /**
     * How wide the image is shown, from its width and alignment presets:
     * a share of the text's width (content_width) on wide screens and of
     * the viewport below it; a floated image takes the full width on narrow
     * screens. Without a width preset, the full width (half a floated one's,
     * which the starter CSS caps at 50%).
     *
     *     sunrice-img-w-50 sunrice-img-left   (min-width: 46rem) 23rem, (min-width: 40em) 50vw, 100vw
     *     sunrice-img-w-75                    (min-width: 46rem) 34.5rem, 75vw
     *     (none)                              (min-width: 46rem) 46rem, 100vw
     *
     * @param  array{0: float, 1: string}|null  $width  the text's width
     */
    private static function sizes(string $class, ?array $width): string
    {
        $share = null;
        $floated = false;
        foreach (preg_split('/\s+/', trim($class)) ?: [] as $name) {
            if (preg_match('/^sunrice-img-w-(\d{1,3})$/', $name, $match) === 1 && (int) $match[1] >= 1 && (int) $match[1] <= 100) {
                $share ??= (int) $match[1];
            } elseif ($name === 'sunrice-img-full') {
                $share ??= 100;
            } elseif ($name === 'sunrice-img-left' || $name === 'sunrice-img-right') {
                $floated = true;
            }
        }
        $share ??= $floated ? 50 : 100;
        $sizes = [];
        if ($width !== null) {
            $sizes[] = '(min-width: '.self::number($width[0]).$width[1].') '.self::number($width[0] * $share / 100).$width[1];
        }
        if ($floated && $share < 100) {
            $sizes[] = '(min-width: '.self::FLOAT_BREAKPOINT.') '.$share.'vw';
            $sizes[] = '100vw';
        } else {
            $sizes[] = $share.'vw';
        }

        return implode(', ', $sizes);
    }

    /**
     * A CSS length in px, rem or em (a number alone is px), or null.
     *
     * @return array{0: float, 1: string}|null
     */
    private static function length(mixed $value): ?array
    {
        if (is_int($value) || is_float($value)) {
            return $value > 0 ? [(float) $value, 'px'] : null;
        }
        if (! is_string($value) || preg_match('/^\s*(\d+(?:\.\d+)?)\s*(px|rem|em)?\s*$/', $value, $match) !== 1 || (float) $match[1] <= 0) {
            return null;
        }

        return [(float) $match[1], ($match[2] ?? '') === '' ? 'px' : $match[2]];
    }

    private static function number(float $number): string
    {
        return rtrim(rtrim(number_format($number, 2, '.', ''), '0'), '.');
    }
}
