<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Blueprints;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\CollectionListing;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\GlobalValue;
use Sunrice\Cms\Models\Revision;
use Sunrice\Cms\Models\Submission;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Seo;
use Sunrice\Cms\Support\SiteCache;

/**
 * Renames a blueprint's field (sunrice:rename-field), in the blueprint and
 * in everything stored with it: entries (live, draft and revisions),
 * listing pages, terms, globals and form submissions. Templates that read
 * the old handle need changing too.
 *
 * @api
 */
final class RenameField
{
    public function __construct(private readonly ActivityLog $activity, private readonly SiteCache $cache) {}

    /**
     * @return int the records changed
     *
     * @throws InvalidArgumentException
     */
    public function handle(Blueprint $blueprint, string $from, string $to): int
    {
        $handles = array_map(fn (array $field): mixed => $field['handle'] ?? null, $blueprint->fields);
        if (! in_array($from, $handles, true)) {
            throw new InvalidArgumentException("The blueprint \"{$blueprint->handle}\" has no field \"{$from}\".");
        }
        if (preg_match('/^[a-z][a-z0-9_]*$/', $to) !== 1 || strlen($to) > 64 || $to === Seo::KEY) {
            throw new InvalidArgumentException("\"{$to}\" can't be a field's handle: use lowercase letters, digits and underscores, starting with a letter.");
        }
        if (in_array($to, $handles, true)) {
            throw new InvalidArgumentException("The blueprint \"{$blueprint->handle}\" has a field \"{$to}\" already.");
        }

        $changed = 0;
        DB::transaction(function () use ($blueprint, $from, $to, &$changed): void {
            $blueprint->fields = array_map(fn (array $field): array => ($field['handle'] ?? null) === $from ? ['handle' => $to] + $field : $field, $blueprint->fields);
            $blueprint->save();

            $collections = Collection::withTrashed()->where('blueprint', $blueprint->handle)->pluck('id');
            $rename = fn (Builder $query, string ...$columns) => $changed += $this->rename($query, array_values($columns), $from, $to);
            $rename(EntryTranslation::query()->whereIn('collection_id', $collections), 'data', 'draft_data');
            $rename(Revision::query()->whereIn('entry_translation_id', EntryTranslation::query()->whereIn('collection_id', $collections)->select('id')), 'data');
            $rename(CollectionListing::query()->whereIn('collection_id', Collection::withTrashed()->where('listing_blueprint', $blueprint->handle)->select('id')), 'data');
            $rename(TermTranslation::query()->whereIn('taxonomy_id', Taxonomy::withTrashed()->where('blueprint', $blueprint->handle)->select('id')), 'data');
            $rename(GlobalValue::query()->whereIn('global_set_id', GlobalSet::query()->where('blueprint', $blueprint->handle)->select('id')), 'data');
            $rename(Submission::query()->whereIn('form_id', Form::query()->where('blueprint', $blueprint->handle)->select('id')), 'data');
        });
        $this->cache->changed("blueprint {$blueprint->handle}");
        $this->activity->record('renamed field', 'blueprint', $blueprint, $blueprint->title, ['from' => $from, 'to' => $to, 'records' => $changed]);

        return $changed;
    }

    /**
     * @template TModel of Model
     *
     * @param  Builder<TModel>  $query
     * @param  list<string>  $columns
     */
    private function rename(Builder $query, array $columns, string $from, string $to): int
    {
        $changed = 0;
        $move = function (mixed $data) use ($from, $to): mixed {
            if (! is_array($data) || ! array_key_exists($from, $data)) {
                return $data;
            }
            $renamed = [];
            foreach ($data as $key => $value) {
                $renamed[$key === $from ? $to : $key] = $value;
            }

            return $renamed;
        };
        $query->chunkById(500, function ($records) use ($columns, $move, &$changed): void {
            foreach ($records as $record) {
                foreach ($columns as $column) {
                    $record->setAttribute($column, $move($record->getAttribute($column)));
                }
                if ($record->isDirty()) {
                    // Quietly: renaming isn't an edit (no new version, no events).
                    $record->saveQuietly();
                    $changed++;
                }
            }
        });

        return $changed;
    }
}
