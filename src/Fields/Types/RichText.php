<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Support\HtmlSanitizer;
use Sunrice\Cms\Support\RichTextImages;

/**
 * Formatted text (HTML), cleaned on save: only the formatting the editor
 * can produce is kept, so scripts and event handlers never reach the site.
 * Images from the media library carry data-media-id, and get their sizes
 * (srcset, sizes, width and height, lazy loading) when pages show them,
 * so the stored HTML never changes (RichTextImages).
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
        return is_string($value) ? RichTextImages::render($value, $context) : $value;
    }

    public function references(mixed $value, Field $field): array
    {
        return Reference::many(Reference::MEDIA, is_string($value) ? HtmlSanitizer::mediaIds($value) : []);
    }

    public function translatableByDefault(): bool
    {
        return true;
    }
}
