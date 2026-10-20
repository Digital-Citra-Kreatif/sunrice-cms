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
    public const RULE = 'regex:/^[a-z][a-z0-9_]*$/';

    /**
     * @param  'collection'|'taxonomy'|'form'  $kind
     * @return list<TextInput> the create form's field and the edit form's
     */
    public static function make(string $kind, string $help, string $warning): array
    {
        return [
            TextInput::make('handle')->required()->maxLength(64)->unique()->onlyOnCreate()->rules([self::RULE])->help($help),
            // Left out or empty when editing: it stays as it is.
            TextInput::make('handle')->maxLength(64)->unique()->onlyOnEdit()->rules([self::RULE])->help($warning)
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
