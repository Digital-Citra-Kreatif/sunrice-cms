<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Blueprints;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Fields\FieldTypes;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Fields\Types\FieldsetInclude;
use Sunrice\Cms\Fields\Types\Flexible;
use Sunrice\Cms\Fields\Types\Repeater;
use Sunrice\Cms\Globals;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionListing;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Fieldset;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\GlobalValue;
use Sunrice\Cms\Models\Revision;
use Sunrice\Cms\Models\Submission;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\References;
use Sunrice\Cms\Support\SearchText;

/**
 * Renames a field of a blueprint or a fieldset, also inside groups and
 * repeaters ("hero.title"), and moves what content stores under the old
 * handle to the new one: entries (draft, live and revisions), terms,
 * global sets, listing pages and form submissions, wherever the field is,
 * a fieldset's fields included in blueprints or used as flexible blocks
 * too. References and search text are rebuilt for what changed. With
 * $dryRun nothing is written; the counts say what would change.
 *
 *     app(RenameFieldHandle::class)->handle($blueprint, 'hero.title', 'heading');
 *
 * @api
 */
final class RenameFieldHandle
{
    /** What is counted: records whose stored values change. */
    public const COUNTS = ['entries', 'revisions', 'terms', 'globals', 'listings', 'submissions'];

    private string $owner = '';

    /** @var list<string> */
    private array $target = [];

    private string $new = '';

    /** @var array<string, list<array<mixed>>> fieldset handle => raw fields */
    private array $fieldsets = [];

    public function __construct(
        private readonly FieldTypes $types,
        private readonly ActivityLog $activity,
    ) {}

    /**
     * @param  string  $from  the field's handle, or its dot path into groups and repeaters
     * @param  string  $to  the new handle (or the same dot path with the new handle last)
     * @return array<string, int> per self::COUNTS, how many records changed (or would)
     *
     * @throws ValidationException when the field isn't there or the new handle can't be used
     */
    public function handle(Blueprint|Fieldset $definition, string $from, string $to, bool $dryRun = false): array
    {
        $path = explode('.', trim($from));
        $parent = array_slice($path, 0, -1);
        $handle = str_contains($to, '.') ? (string) substr($to, (int) strrpos($to, '.') + 1) : trim($to);
        if (str_contains($to, '.') && $to !== implode('.', [...$parent, $handle])) {
            throw ValidationException::withMessages(['to' => 'The new handle stays where the field is: give only the new name.']);
        }
        $kind = $definition instanceof Blueprint ? 'blueprint' : 'fieldset';
        $fields = $definition->fields;
        if ($this->locate($fields, $path) === null) {
            throw ValidationException::withMessages(['from' => "The {$kind} \"{$definition->handle}\" has no field \"{$from}\" of its own (a fieldset's fields are renamed in the fieldset)."]);
        }
        $this->validateHandle($definition, $parent, $handle, end($path));

        $this->fieldsets = [];
        foreach (Fieldset::query()->get(['handle', 'fields']) as $fieldset) {
            $this->fieldsets[$fieldset->handle] = $fieldset->fields;
        }
        $this->owner = $kind.':'.$definition->handle;
        $this->target = $path;
        $this->new = $handle;
        // The definitions before the rename: stored values still have the old handle.
        $blueprints = [];
        foreach (Blueprint::query()->get(['handle', 'fields']) as $blueprint) {
            if ($kind === 'blueprint' ? $blueprint->handle === $definition->handle : $this->reaches($blueprint->fields, $definition->handle)) {
                $blueprints[$blueprint->handle] = $blueprint->fields;
            }
        }

        $counts = array_fill_keys(self::COUNTS, 0);
        DB::transaction(function () use ($definition, $fields, $path, $handle, $blueprints, $dryRun, &$counts): void {
            if (! $dryRun) {
                $definition->fields = $this->renameDefinition($fields, $path, $handle);
                $definition->save();
                app(Fieldsets::class)->flush();
            }
            foreach ($blueprints as $blueprint => $old) {
                $this->migrate($blueprint, $old, $dryRun, $counts);
            }
        });
        if (! $dryRun) {
            app(Globals::class)->flush();
            $this->activity->updated($kind, $definition, $definition->title, ["{$from} → {$handle}"]);
        }

        return $counts;
    }

    /**
     * @param  list<string>  $parent
     *
     * @throws ValidationException
     */
    private function validateHandle(Blueprint|Fieldset $definition, array $parent, string $handle, string $old): void
    {
        if (preg_match('/^[a-z][a-z0-9_]*$/', $handle) !== 1 || strlen($handle) > 64) {
            throw ValidationException::withMessages(['to' => 'A handle is lowercase letters, digits and underscores, starting with a letter (64 at most).']);
        }
        if ($handle === $old) {
            throw ValidationException::withMessages(['to' => 'The field already has that handle.']);
        }
        if ($parent === [] && in_array($handle, Blueprint::RESERVED, true)) {
            throw ValidationException::withMessages(['to' => "\"{$handle}\" is used by content itself; choose another handle."]);
        }
        // Siblings, fieldsets' included fields counted.
        $schema = $definition->schema();
        $siblings = $parent === [] ? $schema->fields() : ($schema->field(implode('.', $parent))->fields ?? []);
        foreach ($siblings as $sibling) {
            if ($sibling->handle === $handle) {
                throw ValidationException::withMessages(['to' => "There already is a field \"{$handle}\" there."]);
            }
        }
    }

    /**
     * The raw definition at a path (through fields' own children), or null.
     *
     * @param  array<mixed>  $fields
     * @param  list<string>  $path
     * @return array<mixed>|null
     */
    private function locate(array $fields, array $path): ?array
    {
        $found = null;
        foreach ($path as $segment) {
            $found = null;
            foreach ($fields as $field) {
                if (is_array($field) && ($field['handle'] ?? null) === $segment && ($field['type'] ?? null) !== FieldsetInclude::TYPE) {
                    $found = $field;
                }
            }
            if ($found === null) {
                return null;
            }
            $fields = is_array($found['fields'] ?? null) ? $found['fields'] : [];
        }

        return $found;
    }

    /**
     * @param  array<mixed>  $fields
     * @param  list<string>  $path
     * @return list<array<string, mixed>>
     */
    private function renameDefinition(array $fields, array $path, string $handle): array
    {
        $segment = array_shift($path);
        $renamed = [];
        foreach ($fields as $field) {
            if (! is_array($field)) {
                continue;
            }
            /** @var array<string, mixed> $field */
            if (($field['handle'] ?? null) === $segment && ($field['type'] ?? null) !== FieldsetInclude::TYPE) {
                if ($path === []) {
                    $field['handle'] = $handle;
                } else {
                    $field['fields'] = $this->renameDefinition(is_array($field['fields'] ?? null) ? $field['fields'] : [], $path, $handle);
                }
            }
            $renamed[] = $field;
        }

        return $renamed;
    }

    /**
     * Whether fields include the fieldset or use it as a block, at any depth.
     *
     * @param  array<mixed>  $fields
     * @param  array<string, true>  $seen
     */
    private function reaches(array $fields, string $fieldset, array $seen = []): bool
    {
        foreach ($fields as $field) {
            if (! is_array($field)) {
                continue;
            }
            $config = is_array($field['config'] ?? null) ? $field['config'] : [];
            $used = match ($field['type'] ?? null) {
                FieldsetInclude::TYPE => [$config['fieldset'] ?? null],
                Flexible::TYPE => is_array($config['blocks'] ?? null) ? $config['blocks'] : [],
                default => [],
            };
            foreach ($used as $handle) {
                if ($handle === $fieldset) {
                    return true;
                }
                if (is_string($handle) && ! isset($seen[$handle]) && isset($this->fieldsets[$handle]) && $this->reaches($this->fieldsets[$handle], $fieldset, $seen + [$handle => true])) {
                    return true;
                }
            }
            if (is_array($field['fields'] ?? null) && $this->reaches($field['fields'], $fieldset, $seen)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Moves the stored values of everything filled in with a blueprint.
     *
     * @param  array<mixed>  $fields  its definition before the rename
     * @param  array<string, int>  $counts
     */
    private function migrate(string $blueprint, array $fields, bool $dryRun, array &$counts): void
    {
        $rename = fn (mixed $data): mixed => is_array($data) ? $this->walk($fields, $data, 'blueprint:'.$blueprint, [], 0) : $data;

        $collections = Collection::withTrashed()->where('blueprint', $blueprint)->pluck('id');
        $this->each(EntryTranslation::query()->with('entry.collection', 'entry.translations')->whereIn('collection_id', $collections), ['data', 'draft_data'], $rename, $dryRun, $counts['entries'],
            function (EntryTranslation $translation): void {
                References::entry($translation);
                if ($translation->data !== null) {
                    $translation->newQuery()->whereKey($translation->id)->update(['search_text' => SearchText::of($translation->completeData())]);
                }
            });
        $this->each(Revision::query()->whereIn('entry_translation_id', EntryTranslation::query()->whereIn('collection_id', $collections)->select('id')), ['data'], $rename, $dryRun, $counts['revisions']);
        $this->each(TermTranslation::query()->with('term.taxonomy')->whereIn('taxonomy_id', Taxonomy::withTrashed()->where('blueprint', $blueprint)->select('id')), ['data'], $rename, $dryRun, $counts['terms'],
            fn (TermTranslation $translation) => References::term($translation));
        $this->each(GlobalValue::query()->with('globalSet')->whereIn('global_set_id', GlobalSet::query()->where('blueprint', $blueprint)->select('id')), ['data'], $rename, $dryRun, $counts['globals'],
            fn (GlobalValue $value) => References::global($value));
        $this->each(CollectionListing::query()->whereIn('collection_id', Collection::withTrashed()->where('listing_blueprint', $blueprint)->select('id')), ['data'], $rename, $dryRun, $counts['listings']);
        $this->each(Submission::query()->whereIn('form_id', Form::query()->where('blueprint', $blueprint)->select('id')), ['data'], $rename, $dryRun, $counts['submissions']);
    }

    /**
     * Renames the columns' values of each record, writing the changed ones
     * (without model events; the version counts up where there is one).
     *
     * @template TModel of Model
     *
     * @param  Builder<TModel>  $query
     * @param  list<string>  $columns
     * @param  \Closure(mixed): mixed  $rename
     * @param  (\Closure(TModel): void)|null  $after
     */
    private function each(Builder $query, array $columns, \Closure $rename, bool $dryRun, int &$count, ?\Closure $after = null): void
    {
        $query->chunkById(200, function ($records) use ($columns, $rename, $dryRun, &$count, $after): void {
            foreach ($records as $record) {
                $changes = [];
                foreach ($columns as $column) {
                    $value = $record->getAttribute($column);
                    $renamed = $rename($value);
                    if ($renamed !== $value) {
                        $changes[$column] = $renamed;
                    }
                }
                if ($changes === []) {
                    continue;
                }
                $count++;
                if ($dryRun) {
                    continue;
                }
                $update = array_map(fn (mixed $v): string => json_encode($v, JSON_THROW_ON_ERROR), $changes);
                if (array_key_exists('version', $record->getAttributes())) {
                    $update['version'] = DB::raw('version + 1');
                }
                $record->newQuery()->whereKey($record->getKey())->update($update);
                if ($after !== null) {
                    $record->forceFill($changes);
                    $after($record);
                }
            }
        });
    }

    /**
     * Stored values with the field renamed where it is: walks the fields
     * with the data, through groups, repeaters, fieldset includes and
     * flexible blocks, knowing whose fields (a blueprint's or a fieldset's)
     * it's in and where.
     *
     * @param  array<mixed>  $fields  raw definitions
     * @param  array<mixed>  $data
     * @param  list<string>  $path  where in the owner's fields
     * @return array<mixed>
     */
    private function walk(array $fields, array $data, string $owner, array $path, int $depth): array
    {
        if ($depth > Schema::MAX_DEPTH * 2) {
            return $data;
        }
        foreach ($fields as $field) {
            if (! is_array($field) || ! is_string($field['handle'] ?? null) || ! is_string($field['type'] ?? null)) {
                continue;
            }
            $config = is_array($field['config'] ?? null) ? $field['config'] : [];
            $type = $field['type'];
            $handle = $field['handle'];
            if ($type === FieldsetInclude::TYPE) {
                $included = is_string($config['fieldset'] ?? null) ? $config['fieldset'] : '';
                if (isset($this->fieldsets[$included])) {
                    $data = $this->walk($this->fieldsets[$included], $data, 'fieldset:'.$included, [], $depth + 1);
                }

                continue;
            }
            if (! array_key_exists($handle, $data)) {
                continue;
            }
            $here = [...$path, $handle];
            $value = $data[$handle];
            $children = is_array($field['fields'] ?? null) ? $field['fields'] : [];
            if (is_array($value)) {
                if ($type === Repeater::TYPE) {
                    foreach ($value as $i => $row) {
                        $value[$i] = is_array($row) ? $this->walk($children, $row, $owner, $here, $depth + 1) : $row;
                    }
                } elseif ($type === Flexible::TYPE) {
                    foreach ($value as $i => $block) {
                        if (! is_array($block)) {
                            continue;
                        }
                        $kind = is_string($block['type'] ?? null) ? $block['type'] : '';
                        if (isset($this->fieldsets[$kind]) && is_array($block['values'] ?? null)) {
                            $block['values'] = $this->walk($this->fieldsets[$kind], $block['values'], 'fieldset:'.$kind, [], $depth + 1);
                            $value[$i] = $block;
                        }
                    }
                } elseif ($this->types->has($type) && $this->types->get($type)->hasChildren()) {
                    $value = $this->walk($children, $value, $owner, $here, $depth + 1);
                }
            }
            $data[$handle] = $value;
            if ($owner === $this->owner && $here === $this->target) {
                $data = self::renameKey($data, $handle, $this->new);
            }
        }

        return $data;
    }

    /**
     * The array with a key renamed in its place (over a stale value under the new key).
     *
     * @param  array<mixed>  $data
     * @return array<mixed>
     */
    private static function renameKey(array $data, string $from, string $to): array
    {
        $renamed = [];
        foreach ($data as $key => $value) {
            if ($key !== $to) {
                $renamed[$key === $from ? $to : $key] = $value;
            }
        }

        return $renamed;
    }
}
