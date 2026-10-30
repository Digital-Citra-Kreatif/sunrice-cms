<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Sunrice\Admin\Resources\Forms\RichTextImageClasses;
use Sunrice\Admin\Resources\Forms\RichTextLinkAttributes;
use Symfony\Component\HtmlSanitizer\HtmlSanitizer as Sanitizer;
use Symfony\Component\HtmlSanitizer\HtmlSanitizerConfig;

/**
 * Cleans rich text before it is stored: only the formatting the editor
 * produces is kept, so no script, style or event handler reaches the site.
 * Images from the media library keep data-media-id, so their use is known,
 * and on images (and a captioned image's <figure>) only the editor's width
 * and alignment classes and the configured image styles are kept (the
 * panel's RichTextImageClasses, which reads its config each time, so the
 * shared instance below never goes stale); no other element keeps a class.
 * Links keep the editor's rel choices (nofollow, sponsored, ugc), always
 * with noopener noreferrer, and what they point at on the site
 * (data-link="entry:12", resolved when pages show them: RichTextLinks),
 * through the panel's RichTextLinkAttributes.
 *
 * @api
 */
final class HtmlSanitizer
{
    public const MAX_LENGTH = 500_000;

    private static ?Sanitizer $sanitizer = null;

    public static function sanitize(string $html): string
    {
        return $html === '' ? '' : RichTextLinkAttributes::secure(self::sanitizer()->sanitize($html));
    }

    /**
     * The media library images in the HTML.
     *
     * @return list<int>
     */
    public static function mediaIds(string $html): array
    {
        preg_match_all('/data-media-id=["\'](\d+)["\']/', $html, $matches);

        return array_values(array_unique(array_map(intval(...), $matches[1])));
    }

    private static function sanitizer(): Sanitizer
    {
        if (self::$sanitizer !== null) {
            return self::$sanitizer;
        }
        $config = (new HtmlSanitizerConfig)
            ->allowElement('a', ['href', 'title', 'target', 'rel', 'data-link'])
            // Classes only on images and a captioned image's figure, held to the editor's (RichTextImageClasses).
            ->allowElement('img', ['src', 'alt', 'title', 'width', 'height', 'data-media-id', 'class'])
            ->allowElement('figure', ['class'])
            ->allowElement('th', ['colspan', 'rowspan'])
            ->allowElement('td', ['colspan', 'rowspan'])
            ->allowLinkSchemes(SafeUrl::SCHEMES)
            ->allowMediaSchemes(['https', 'http'])
            ->allowRelativeLinks()
            ->allowRelativeMedias()
            ->withAttributeSanitizer(new RichTextImageClasses)
            ->withAttributeSanitizer(new RichTextLinkAttributes)
            ->withMaxInputLength(self::MAX_LENGTH);
        foreach (['p', 'br', 'hr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'b', 'em', 'i', 'u', 's', 'del', 'sub', 'sup', 'mark', 'code', 'pre', 'blockquote', 'ul', 'ol', 'li', 'figcaption', 'table', 'thead', 'tbody', 'tr'] as $element) {
            $config = $config->allowElement($element);
        }

        return self::$sanitizer = new Sanitizer($config);
    }
}
