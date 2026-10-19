<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Fieldsets;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Fields\DefinitionValidator;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Fieldset;

/**
 * Deletes a fieldset no blueprint or other fieldset uses.
 *
 * @api
 */
final class DeleteFieldset
{
    public function __construct(
        private readonly Fieldsets $fieldsets,
        private readonly ActivityLog $activity,
    ) {}

    /** @throws ValidationException when it is in use */
    public function handle(Fieldset $fieldset): void
    {
        $users = $this->usedBy($fieldset);
        if ($users !== []) {
            throw ValidationException::withMessages([
                'fieldset' => "\"{$fieldset->title}\" is used by ".implode(', ', $users).'. Remove it from there first.',
            ]);
        }
        $fieldset->delete();
        $this->fieldsets->flush();
        $this->activity->record('deleted', 'fieldset', $fieldset, $fieldset->title);
    }

    /**
     * The blueprints and fieldsets that include it or use it as a kind of block.
     *
     * @return list<string>
     */
    public function usedBy(Fieldset $fieldset): array
    {
        $users = [];
        foreach (Blueprint::query()->orderBy('title')->get() as $blueprint) {
            if (in_array($fieldset->handle, DefinitionValidator::usedFieldsets($blueprint->fields()), true)) {
                $users[] = "the blueprint \"{$blueprint->title}\"";
            }
        }
        foreach ($this->fieldsets->all() as $other) {
            if ($other->handle !== $fieldset->handle && in_array($fieldset->handle, DefinitionValidator::usedFieldsets($other->fields()), true)) {
                $users[] = "the fieldset \"{$other->title}\"";
            }
        }

        return $users;
    }
}
