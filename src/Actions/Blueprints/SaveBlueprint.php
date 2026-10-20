<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Blueprints;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Admin\HandleField;
use Sunrice\Cms\Fields\DefinitionValidator;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Models\Blueprint;

/**
 * Creates a blueprint or changes one. Input: handle (only when creating:
 * it can't change later), title and fields, as from the blueprint builder.
 * Content keeps its data when a field is removed or changed.
 *
 * @api
 */
final class SaveBlueprint
{
    public function __construct(
        private readonly DefinitionValidator $definitions,
        private readonly ActivityLog $activity,
    ) {}

    /**
     * @param  array<mixed>  $input
     *
     * @throws ValidationException
     */
    public function handle(array $input, ?Blueprint $blueprint = null): Blueprint
    {
        $blueprint ??= new Blueprint;
        /** @var array{handle?: string, title: string} $validated */
        $validated = Validator::make($input, [
            'handle' => $blueprint->exists ? ['prohibited'] : ['required', 'string', 'max:64', 'regex:/^[a-z][a-z0-9_]*$/', Rule::notIn(HandleField::RESERVED), Rule::unique($blueprint->getTable(), 'handle')],
            'title' => ['required', 'string', 'max:255'],
        ])->validate();
        $fields = $this->definitions->validate($input['fields'] ?? null, reserved: Blueprint::RESERVED);

        $action = $blueprint->exists ? 'updated' : 'created';
        if (! $blueprint->exists) {
            $blueprint->handle = $validated['handle'] ?? '';
        }
        $blueprint->title = $validated['title'];
        $blueprint->fields = Field::listToArray($fields);
        $changed = array_keys($blueprint->getDirty());
        $blueprint->save();

        if ($action === 'created') {
            $this->activity->record('created', 'blueprint', $blueprint, $blueprint->title);
        } elseif ($changed !== []) {
            $this->activity->updated('blueprint', $blueprint, $blueprint->title, $changed);
        }

        return $blueprint;
    }
}
