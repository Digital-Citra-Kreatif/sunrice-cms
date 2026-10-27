<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Closure;
use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Resources\Forms\Link;
use Sunrice\Cms\Models\Blueprint;

/**
 * The one rule for links to a blueprint from where content using it is
 * edited or configured: only for those who may edit blueprints
 * (cms.blueprints.update), to its editor (sunrice.admin.cms.blueprints.edit).
 * Pages put them in their ⋮ menu (menu(), url()); the settings forms
 * where a blueprint is chosen put them under the choice (field(),
 * choices()), with "New blueprint" for those who may create one
 * (cms.blueprints.create) while none is chosen.
 *
 * @internal
 */
final class BlueprintLinks
{
    /**
     * "Edit blueprint" for the ⋮ menu: one, or with several, one each by
     * title ("Edit blueprint: Property"). Handles of missing blueprints
     * are left out.
     *
     * @param  mixed  $user  the signed-in user (Request::user())
     * @param  list<string>  $handles
     * @return list<array{label: string, href: string}>
     */
    public static function menu(mixed $user, array $handles): array
    {
        $handles = array_values(array_unique(array_filter($handles, fn (string $handle): bool => $handle !== '')));
        if ($handles === [] || ! self::mayEdit($user)) {
            return [];
        }
        $blueprints = Blueprint::query()->whereIn('handle', $handles)->get(['handle', 'title'])->keyBy('handle');
        $links = [];
        foreach ($handles as $handle) {
            $blueprint = $blueprints->get($handle);
            if ($blueprint instanceof Blueprint) {
                $label = count($handles) > 1 ? __('Edit blueprint: :title', ['title' => $blueprint->title]) : __('Edit blueprint');
                $links[] = ['label' => is_string($label) ? $label : 'Edit blueprint', 'href' => route('sunrice.admin.cms.blueprints.edit', $blueprint->handle)];
            }
        }

        return $links;
    }

    /** One blueprint's editor, for a page's "Edit blueprint" (null: none, or not allowed). */
    public static function url(mixed $user, ?string $handle): ?string
    {
        return self::menu($user, $handle === null ? [] : [$handle])[0]['href'] ?? null;
    }

    /**
     * Under a blueprint Select: "Edit blueprint →" to the chosen one,
     * following the choice as it's edited, or "New blueprint →" while
     * none is chosen.
     *
     * @return Closure(?Model): list<Link>
     */
    public static function field(string $field): Closure
    {
        return function () use ($field): array {
            $user = self::user();
            $links = [];
            if (self::mayCreate($user)) {
                $links[] = Link::make('New blueprint →', route('sunrice.admin.cms.blueprints.create', [], false))->showUnless($field);
            }
            if (self::mayEdit($user)) {
                $links[] = Link::make('Edit blueprint →', self::editPattern($field))->showWhen($field);
            }

            return $links;
        };
    }

    /**
     * Under a CheckboxList of blueprints: "Edit blueprint: Property →"
     * for each one ticked, following the ticks as they're edited.
     *
     * @param  Closure(?Model=): array<string, string>  $options  handle => title, as the list's
     * @return Closure(?Model): list<Link>
     */
    public static function choices(string $field, Closure $options): Closure
    {
        return function (?Model $record) use ($field, $options): array {
            if (! self::mayEdit(self::user())) {
                return [];
            }
            $links = [];
            foreach ($options($record) as $handle => $title) {
                $label = __('Edit blueprint: :title', ['title' => $title]);
                $links[] = Link::make((is_string($label) ? $label : $title).' →', route('sunrice.admin.cms.blueprints.edit', $handle, false))->showWhen($field, $handle);
            }

            return $links;
        };
    }

    /** The blueprint editor's address with `{field}` for the form's value (Link). */
    private static function editPattern(string $field): string
    {
        return route('sunrice.admin.cms.blueprints.index', [], false).'/{'.$field.'}/edit';
    }

    private static function user(): mixed
    {
        return request()->user();
    }

    private static function mayEdit(mixed $user): bool
    {
        return $user instanceof Authorizable && $user->can('cms.blueprints.update');
    }

    private static function mayCreate(mixed $user): bool
    {
        return $user instanceof Authorizable && $user->can('cms.blueprints.create');
    }
}
