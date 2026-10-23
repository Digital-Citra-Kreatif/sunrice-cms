<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Fieldsets;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Fields\DefinitionValidator;
use Sunrice\Cms\Fields\Field;
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
                'fieldset' => __('":title" is used by :users. Remove it from there first.', ['title' => $fieldset->title, 'users' => implode(', ', $users)]),
            ]);
        }
        $fieldset->delete();
        $this->fieldsets->flush();
        $this->activity->record('deleted', 'fieldset', $fieldset, $fieldset->title);
    }

    /**
     * The blueprints and fieldsets that include it or use it as a kind of
     * block, saying where: 'the blueprint "Post" (a block in its "More" field)'.
     *
     * @return list<string>
     */
    public function usedBy(Fieldset $fieldset): array
    {
        return array_map(function (array $user): string {
            $who = $user['kind'] === 'blueprint'
                ? __('the blueprint ":title"', ['title' => $user['title']])
                : __('the fieldset ":title"', ['title' => $user['title']]);

            return $who.' ('.implode(', ', array_map(fn (array $use): string => self::how($use['how'], $use['field']), $user['uses'])).')';
        }, $this->uses($fieldset));
    }

    /**
     * The blueprints and fieldsets that use it, and each field that does: its labels down from the top ("Sections ›
     * Columns") and how ('include': a fieldset field; 'block': a kind of
     * block of a flexible field).
     *
     * @return list<array{kind: 'blueprint'|'fieldset', handle: string, title: string, uses: list<array{field: string, how: 'include'|'block'}>}>
     */
    public function uses(Fieldset $fieldset): array
    {
        return $this->usesOf()[$fieldset->handle] ?? [];
    }

    /**
     * Who uses each fieldset, by its handle, as uses() says it: all of
     * them in one pass (the fieldsets list).
     *
     * @return array<string, list<array{kind: 'blueprint'|'fieldset', handle: string, title: string, uses: list<array{field: string, how: 'include'|'block'}>}>>
     */
    public function usesOf(): array
    {
        $users = [];
        foreach (Blueprint::query()->orderBy('title')->get() as $blueprint) {
            $this->collect($users, 'blueprint', $blueprint->handle, $blueprint->title, $blueprint->fields());
        }
        foreach ($this->fieldsets->all() as $other) {
            $this->collect($users, 'fieldset', $other->handle, $other->title, $other->fields());
        }

        return $users;
    }

    /**
     * @param  array<string, list<array{kind: 'blueprint'|'fieldset', handle: string, title: string, uses: list<array{field: string, how: 'include'|'block'}>}>>  $users
     * @param  'blueprint'|'fieldset'  $kind
     * @param  list<Field>  $fields
     */
    private function collect(array &$users, string $kind, string $handle, string $title, array $fields): void
    {
        $found = [];
        foreach (DefinitionValidator::fieldsetUses($fields) as $use) {
            // A fieldset may offer itself as a block: that isn't a use that keeps it.
            if ($kind === 'fieldset' && $use['fieldset'] === $handle) {
                continue;
            }
            $found[$use['fieldset']][] = ['field' => implode(' › ', $use['path']), 'how' => $use['how']];
        }
        foreach ($found as $fieldset => $uses) {
            $users[$fieldset][] = ['kind' => $kind, 'handle' => $handle, 'title' => $title, 'uses' => $uses];
        }
    }

    /** @param 'include'|'block' $how */
    private static function how(string $how, string $field): string
    {
        $said = $how === 'block'
            ? __('a block in its ":field" field', ['field' => $field])
            : __('included as ":field"', ['field' => $field]);

        return is_string($said) ? $said : $field;
    }
}
