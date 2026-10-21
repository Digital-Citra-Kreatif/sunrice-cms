<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Cms\Support\HandleRule;
use Sunrice\Cms\Support\ScopedPermissions;

/**
 * The handle of a collection, taxonomy, form, global set or menu on its
 * resource's form: made from the title as it's typed when creating (until
 * typed in), and editable afterwards with a warning once it differs from
 * the saved one (warnWhenChanged): what the CMS keeps in step and what
 * templates and code must change. A new handle of a collection, taxonomy
 * or form renames its scoped permissions in place
 * (ScopedPermissions::renamed), so roles keep what they were given.
 *
 * @internal
 */
final class HandleField
{
    /** Words the admin's addresses use next to a handle (/admin/cms/collections/create). */
    public const RESERVED = ['create', 'export', 'bulk', 'options', 'picker'];

    /** A handle (HandleRule: its error suggests the one meant) that isn't a RESERVED word. */
    public static function rule(): \Closure
    {
        return function (string $attribute, mixed $value, \Closure $fail): void {
            if (in_array($value, self::RESERVED, true)) {
                $fail(__('":value" is used by the admin\'s addresses: choose another handle.', ['value' => $value]));
            } elseif (is_string($value) && $value !== '') {
                (new HandleRule)->validate($attribute, $value, $fail);
            }
        };
    }

    /**
     * The edit form's warning for a new handle (":old" and ":new" are the
     * saved and the typed one): what Sunrice updates, what you update.
     *
     * @param  'collection'|'taxonomy'|'form'|'global'|'menu'  $kind
     */
    public static function warning(string $kind): string
    {
        $warning = match ($kind) {
            'collection' => __('Changing the handle can break your site. Sunrice renames the collection\'s permissions (roles keep them), and its addresses stay as they are. You update the rest: templates named after it (cms/:old.blade.php, cms/:old-listing.blade.php), code that names it (Cms::entries(\':old\'), cms_entries(\':old\')), styles for the collection-:old body class, entries fields limited to it, and structure exports made before.'),
            'taxonomy' => __('Changing the handle can break your site. Sunrice renames the taxonomy\'s permissions (roles keep them), and term addresses stay as they are. You update the rest: templates named after it (cms/taxonomy-:old.blade.php), code that names it (whereTerm(\':old\', …)), styles for the taxonomy-:old body class, terms fields that use it, and structure exports made before.'),
            'form' => __('Changing the handle can break your site. Sunrice renames the form\'s permissions (roles keep them) and keeps its submissions. You update the rest: templates that show it (<x-sunrice-cms::form handle=":old" />), forms of your own that post to /forms/:old or link to #form-:old, and structure exports made before.'),
            'global' => __('Changing the handle can break your site. Sunrice keeps the set\'s values. You update the rest: templates and code that read it (Cms::global(\':old\'), cms_global(\':old\')), which get nothing until then, and structure exports made before.'),
            'menu' => __('Changing the handle can break your site. Sunrice keeps the menu\'s links. You update the rest: templates and code that show it (Cms::menu(\':old\'), cms_menu(\':old\')), which show no links until then, and structure exports made before. The CMS\'s own layout shows the menus "main" and "footer".'),
        };

        return is_string($warning) ? $warning : '';
    }

    /**
     * What developers write with the handle, `:value` standing for it, and
     * an example for while it's empty: the "For developers:" line under it.
     *
     * @param  'collection'|'taxonomy'|'form'|'global'|'menu'  $kind
     * @return array{0: string, 1: string}
     */
    public static function snippet(string $kind): array
    {
        return match ($kind) {
            'collection' => ['In templates and code: `Cms::entries(\':value\')`, templates `cms/:value.blade.php`.', 'articles'],
            'taxonomy' => ['In templates: `<x-sunrice-cms::terms taxonomy=":value" />`, in code `whereTerm(\':value\', …)`.', 'categories'],
            'form' => ['In a template: `<x-sunrice-cms::form handle=":value" />`', 'newsletter'],
            'global' => ['In templates and code: `Cms::global(\':value\')`', 'contact'],
            'menu' => ['In templates and code: `Cms::menu(\':value\')`', 'footer'],
        };
    }

    /**
     * The handle's fields: a plain line for editors (`$help`), then what
     * developers write with it, following the handle as it's typed.
     *
     * @param  'collection'|'taxonomy'|'form'|'global'|'menu'  $kind
     * @return list<TextInput> the create form's field and the edit form's
     */
    public static function make(string $kind, string $help): array
    {
        [$snippet, $example] = self::snippet($kind);
        $developer = __($snippet);
        $developer = is_string($developer) ? $developer : $snippet;

        return [
            TextInput::make('handle')->required()->maxLength(64)->unique()->onlyOnCreate()->slugFrom('title')->rules([self::rule()])->help($help)->developerHelp($developer, $example),
            // Left out or empty when editing: it stays as it is.
            TextInput::make('handle')->maxLength(64)->unique()->onlyOnEdit()->slugFrom('title')->rules([self::rule()])->help($help)->developerHelp($developer, $example)
                ->warnWhenChanged(self::warning($kind))
                ->saveUsing(function (Model $record, mixed $value) use ($kind): void {
                    $old = $record->getAttribute('handle');
                    if (! is_string($value) || $value === '' || ! is_string($old) || $value === $old) {
                        return;
                    }
                    $record->setAttribute('handle', $value);
                    $record->save();
                    if (in_array($kind, ['collection', 'taxonomy', 'form'], true)) {
                        ScopedPermissions::renamed($kind, $old, $value);
                    }
                }),
        ];
    }
}
