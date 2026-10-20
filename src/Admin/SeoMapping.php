<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Sunrice\Admin\Resources\Forms\Section;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Cms\Models\Blueprint;

/**
 * The "SEO from fields" card of Structure → Collections and Taxonomies:
 * which fields fill in what a page's SEO card leaves empty (Seo::for()).
 *
 * @internal
 */
final class SeoMapping
{
    /** The field types each one may name. */
    public const TYPES = [
        'seo_title_field' => ['text'],
        'seo_description_field' => ['text', 'textarea'],
        'seo_image_field' => ['media'],
    ];

    public static function section(string $whose): Section
    {
        $blueprints = Blueprint::query()->orderBy('title')->get();
        $options = fn (array $types): array => $blueprints->flatMap(fn (Blueprint $blueprint): array => array_values(array_filter(
            $blueprint->schema()->fields(),
            fn ($field): bool => in_array($field->type, $types, true),
        )))->mapWithKeys(fn ($field): array => [$field->handle => $field->displayLabel().' ('.$field->handle.')'])->sort()->all();

        return Section::make('SEO from fields')
            ->description("What {$whose} SEO card leaves empty comes from these fields, then from Settings → Site.")
            ->columns(3)
            ->schema([
                Select::make('seo_title_field')->label('Title')->options($options(self::TYPES['seo_title_field']))->help('A text field.'),
                Select::make('seo_description_field')->label('Description')->options($options(self::TYPES['seo_description_field']))->help('A text or textarea field.'),
                Select::make('seo_image_field')->label('Share image')->options($options(self::TYPES['seo_image_field']))->help('A media field: its first image.'),
            ]);
    }
}
