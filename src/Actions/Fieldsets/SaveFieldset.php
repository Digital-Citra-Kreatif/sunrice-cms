<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Fieldsets;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Admin\HandleField;
use Sunrice\Cms\Fields\DefinitionValidator;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Models\Fieldset;

/**
 * Creates a fieldset or changes one. Input: handle (only when creating:
 * blueprints refer to it), title and fields. A fieldset can't include
 * itself, directly or through another.
 *
 * @api
 */
final class SaveFieldset
{
    public function __construct(
        private readonly DefinitionValidator $definitions,
        private readonly Fieldsets $fieldsets,
        private readonly ActivityLog $activity,
    ) {}

    /**
     * @param  array<mixed>  $input
     *
     * @throws ValidationException
     */
    public function handle(array $input, ?Fieldset $fieldset = null): Fieldset
    {
        $fieldset ??= new Fieldset;
        /** @var array{handle?: string, title: string} $validated */
        $validated = Validator::make($input, [
            'handle' => $fieldset->exists ? ['prohibited'] : ['required', 'string', 'max:64', 'regex:/^[a-z][a-z0-9_]*$/', Rule::notIn(HandleField::RESERVED), Rule::unique($fieldset->getTable(), 'handle')],
            'title' => ['required', 'string', 'max:255'],
        ])->validate();
        $handle = $fieldset->exists ? $fieldset->handle : ($validated['handle'] ?? '');
        $fields = $this->definitions->validate($input['fields'] ?? null, fieldset: $handle);

        $action = $fieldset->exists ? 'updated' : 'created';
        $fieldset->handle = $handle;
        $fieldset->title = $validated['title'];
        $fieldset->fields = Field::listToArray($fields);
        $changed = array_keys($fieldset->getDirty());
        $fieldset->save();
        $this->fieldsets->flush();

        if ($action === 'created') {
            $this->activity->record('created', 'fieldset', $fieldset, $fieldset->title);
        } elseif ($changed !== []) {
            $this->activity->updated('fieldset', $fieldset, $fieldset->title, $changed);
        }

        return $fieldset;
    }
}
