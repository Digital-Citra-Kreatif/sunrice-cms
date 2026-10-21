<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Resources\Forms\Section;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;

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
        // The fields of the record's own blueprints (all of them while it's being created), and the value it has.
        $options = fn (string $setting): \Closure => function (?Model $record) use ($setting): array {
            $handles = match (true) {
                $record instanceof Collection => $record->allowedBlueprints(),
                $record instanceof Taxonomy => $record->blueprint === null ? [] : [$record->blueprint],
                default => null,
            };
            // Saving with another blueprint chosen: its fields count too.
            if ($handles !== null) {
                $chosen = [request()->input('blueprint'), ...(array) request()->input('blueprints', [])];
                $handles = [...$handles, ...array_filter($chosen, fn (mixed $handle): bool => is_string($handle) && $handle !== '')];
            }
            $blueprints = Blueprint::query()->when($handles !== null, fn ($query) => $query->whereIn('handle', $handles ?? []))->orderBy('title')->get();
            $types = self::TYPES[$setting];
            $options = $blueprints->flatMap(fn (Blueprint $blueprint): array => array_values(array_filter(
                $blueprint->schema()->fields(),
                fn ($field): bool => in_array($field->type, $types, true),
            )))->mapWithKeys(fn ($field): array => [$field->handle => $field->displayLabel().' ('.$field->handle.')'])->sort()->all();
            $current = $record?->getAttribute($setting);
            if (is_string($current) && $current !== '' && ! isset($options[$current])) {
                $options[$current] = $current.' (not in its blueprint)';
            }

            return $options;
        };

        return Section::make('SEO from fields')
            ->description("What {$whose} SEO card leaves empty comes from these fields (of its blueprint: after changing it, save to choose from the new one's), then from Settings → Site.")
            ->columns(3)
            ->schema([
                Select::make('seo_title_field')->label('Title')->options($options('seo_title_field'))->help('A text field.'),
                Select::make('seo_description_field')->label('Description')->options($options('seo_description_field'))->help('A text or textarea field.'),
                Select::make('seo_image_field')->label('Share image')->options($options('seo_image_field'))->help('A media field: its first image.'),
            ]);
    }
}
