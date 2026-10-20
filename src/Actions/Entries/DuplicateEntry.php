<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * Copies an entry, every language's draft, as a new draft entry: titles
 * get " (copy)" and slugs "-copy" (made unique). Nothing is published.
 *
 * @api
 */
final class DuplicateEntry
{
    public function __construct(private readonly ActivityLog $activity) {}

    public function handle(Entry $entry): Entry
    {
        $entry->loadMissing('translations');

        $copy = DB::transaction(function () use ($entry): Entry {
            $copy = Entry::query()->create([
                'collection_id' => $entry->collection_id, 'author_id' => auth()->id(), 'parent_id' => $entry->parent_id,
                'template' => $entry->template, 'blueprint' => $entry->blueprint, 'sort_order' => MoveEntry::last($entry->collection_id),
            ]);
            foreach ($entry->translations as $translation) {
                $copy->translations()->create([
                    'collection_id' => $translation->collection_id,
                    'locale' => $translation->locale,
                    'status' => EntryTranslation::DRAFT,
                    'draft_title' => Str::limit($translation->draft_title, 240, '').' (copy)',
                    'draft_slug' => self::slug($translation),
                    'draft_data' => $translation->draft_data,
                ]);
            }

            return $copy;
        });
        $copy->load('translations');
        $this->activity->record('duplicated', 'entry', $copy, TrashEntry::label($copy), ['from' => $entry->id]);

        return $copy;
    }

    private static function slug(EntryTranslation $translation): string
    {
        $base = Str::limit($translation->draft_slug, 185, '').'-copy';
        $slug = $base;
        for ($i = 2; EntryInput::taken($slug, $translation->collection_id, $translation->locale, null); $i++) {
            $slug = "{$base}-{$i}";
        }

        return $slug;
    }
}
