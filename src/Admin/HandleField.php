<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Cms\Support\ScopedPermissions;

/**
 * The handle of a collection, taxonomy or form on its resource's form:
 * typed when creating, and editable afterwards with a warning. A new
 * handle renames the scoped permissions in place (ScopedPermissions::renamed),
 * so roles keep what they were given.
 *
 * @internal
 */
final class HandleField
{
    /** The edit form's help: what a new handle breaks. */
    public const WARNING = 'Changing it breaks templates and code that use the old one.';

    /** Words the admin's addresses use next to a handle (/admin/cms/collections/create). */
    public const RESERVED = ['create', 'export', 'bulk', 'options', 'picker'];

    /** Lowercase letters, numbers and underscores, from a letter, said plainly when it isn't; not a RESERVED word. */
    public static function rule(): \Closure
    {
        return function (string $attribute, mixed $value, \Closure $fail): void {
            if (is_string($value) && $value !== '' && preg_match('/^[a-z][a-z0-9_]*$/', $value) !== 1) {
                $fail('Use lowercase letters, numbers and underscores, starting with a letter (like main_menu).');
            } elseif (in_array($value, self::RESERVED, true)) {
                $fail("\"{$value}\" is used by the admin's addresses: choose another handle.");
            }
        };
    }

    /**
     * @param  'collection'|'taxonomy'|'form'  $kind
     * @return list<TextInput> the create form's field and the edit form's
     */
    public static function make(string $kind, string $help, string $warning): array
    {
        return [
            TextInput::make('handle')->required()->maxLength(64)->unique()->onlyOnCreate()->slugFrom('title')->rules([self::rule()])->help($help),
            // Left out or empty when editing: it stays as it is.
            TextInput::make('handle')->maxLength(64)->unique()->onlyOnEdit()->rules([self::rule()])->help($warning)
                ->saveUsing(function (Model $record, mixed $value) use ($kind): void {
                    $old = $record->getAttribute('handle');
                    if (! is_string($value) || $value === '' || ! is_string($old) || $value === $old) {
                        return;
                    }
                    $record->setAttribute('handle', $value);
                    $record->save();
                    ScopedPermissions::renamed($kind, $old, $value);
                }),
        ];
    }
}
