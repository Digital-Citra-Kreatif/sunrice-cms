<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;

/**
 * Which fields a collection or taxonomy can fill its pages' SEO from,
 * for Settings → SEO (Seo::for() reads the choice).
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

    /**
     * The fields a collection (any of its blueprints) or taxonomy can use
     * for each, handle => label, from the blueprints given (all of them,
     * loaded once by the caller) or loaded here.
     *
     * @param  array<string, Blueprint>|null  $blueprints  by handle
     * @return array{seo_title_field: array<string, string>, seo_description_field: array<string, string>, seo_image_field: array<string, string>}
     */
    public static function options(Collection|Taxonomy $owner, ?array $blueprints = null): array
    {
        $handles = $owner instanceof Collection ? $owner->allowedBlueprints() : ($owner->blueprint !== null ? [$owner->blueprint] : []);
        $blueprints ??= Blueprint::query()->whereIn('handle', $handles)->get()->keyBy('handle')->all();
        $options = ['seo_title_field' => [], 'seo_description_field' => [], 'seo_image_field' => []];
        foreach ($handles as $handle) {
            foreach (isset($blueprints[$handle]) ? $blueprints[$handle]->schema()->fields() : [] as $field) {
                foreach (self::TYPES as $column => $types) {
                    if (in_array($field->type, $types, true)) {
                        $options[$column][$field->handle] ??= $field->displayLabel();
                    }
                }
            }
        }

        return $options;
    }
}
