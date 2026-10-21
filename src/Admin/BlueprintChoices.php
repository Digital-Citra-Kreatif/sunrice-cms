<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Database\Eloquent\Model;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\Taxonomy;

/**
 * The blueprints a picker offers, by what it's for: content (entries,
 * listing pages, terms), a global set or a form. A blueprint already used
 * for one of them isn't offered for the others (a form's fields make no
 * sense as a global set's); unused ones, and the one the record has, are.
 *
 * @internal
 */
final class BlueprintChoices
{
    public const CONTENT = 'content';

    public const GLOBAL = 'global';

    public const FORM = 'form';

    /**
     * For a Select's or CheckboxList's options: handle => title.
     *
     * @param  self::CONTENT|self::GLOBAL|self::FORM  $kind
     * @param  string  $attribute  the record's attribute holding its blueprint
     * @return \Closure(?Model=): array<string, string>
     */
    public static function options(string $kind, string $attribute = 'blueprint'): \Closure
    {
        return function (?Model $record = null) use ($kind, $attribute): array {
            $current = $record?->getAttribute($attribute);
            $uses = self::uses();
            $choices = [];
            foreach (Blueprint::query()->orderBy('title')->get(['handle', 'title']) as $blueprint) {
                $kinds = $uses[$blueprint->handle] ?? [];
                if ($kinds === [] || in_array($kind, $kinds, true) || $blueprint->handle === $current || (is_array($current) && in_array($blueprint->handle, $current, true))) {
                    $choices[$blueprint->handle] = $blueprint->title;
                }
            }

            return $choices;
        };
    }

    /** @return array<string, list<string>> blueprint handle => what it's used for */
    private static function uses(): array
    {
        $uses = [];
        $add = function (mixed $handle, string $kind) use (&$uses): void {
            if (is_string($handle) && $handle !== '' && ! in_array($kind, $uses[$handle] ?? [], true)) {
                $uses[$handle][] = $kind;
            }
        };
        foreach (Collection::withTrashed()->get(['blueprint', 'blueprints', 'listing_blueprint']) as $collection) {
            foreach ([$collection->blueprint, $collection->listing_blueprint, ...($collection->blueprints ?? [])] as $handle) {
                $add($handle, self::CONTENT);
            }
        }
        foreach (Taxonomy::withTrashed()->pluck('blueprint') as $handle) {
            $add($handle, self::CONTENT);
        }
        foreach (GlobalSet::query()->pluck('blueprint') as $handle) {
            $add($handle, self::GLOBAL);
        }
        foreach (Form::query()->pluck('blueprint') as $handle) {
            $add($handle, self::FORM);
        }

        return $uses;
    }
}
