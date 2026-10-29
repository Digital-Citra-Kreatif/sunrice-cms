<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Sunrice\Admin\Resources\Forms\RichTextImageClasses;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Support\HtmlSanitizer;
use Sunrice\Cms\Support\RichTextImages;
use Sunrice\Cms\Support\RichTextLinks;

/**
 * Formatted text (HTML), cleaned on save: only the formatting the editor
 * can produce is kept, so scripts and event handlers never reach the site.
 * Images from the media library carry data-media-id, and on images only
 * the editor's presets and the configured image styles are kept
 * (the panel's RichTextImageClasses). They get their sizes (srcset, sizes,
 * width and height, lazy loading) when pages show them, so the stored HTML
 * never changes (RichTextImages). Links keep the editor's rel choices
 * (nofollow, sponsored, ugc, always with noopener noreferrer), and a link
 * to an entry, term or listing page (data-link="entry:12") gets its
 * current URL when pages show it, or only its text once that's gone
 * (RichTextLinks).
 */
final class RichText extends FieldType
{
    public function type(): string
    {
        return 'rich_text';
    }

    public function label(): string
    {
        return 'Rich text';
    }

    public function rules(Field $field): array
    {
        return ['string', 'max:'.HtmlSanitizer::MAX_LENGTH];
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        $html = is_string($value) ? HtmlSanitizer::sanitize($value) : '';

        return trim(strip_tags($html, '<img>')) === '' ? null : $html;
    }

    public function hydrate(mixed $value, Field $field, HydrationContext $context): mixed
    {
        return is_string($value) ? RichTextLinks::render(RichTextImages::render($value, $context), $context) : $value;
    }

    public function references(mixed $value, Field $field): array
    {
        if (! is_string($value)) {
            return [];
        }
        $links = RichTextLinks::targets($value);

        // Its links' entries and terms too: where they're used, and loaded with the rest when pages show them.
        return [
            ...Reference::many(Reference::MEDIA, HtmlSanitizer::mediaIds($value)),
            ...Reference::many(Reference::ENTRY, $links[RichTextLinks::ENTRY] ?? []),
            ...Reference::many(Reference::TERM, $links[RichTextLinks::TERM] ?? []),
        ];
    }

    /** The editor also gets the image styles to offer (config `sunrice-admin.rich_text.image_classes`). */
    public function toAdmin(Field $field, Schema $schema): array
    {
        return parent::toAdmin($field, $schema) + ['imageStyles' => RichTextImageClasses::options()];
    }

    public function translatableByDefault(): bool
    {
        return true;
    }
}
