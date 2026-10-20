<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\References;

use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\GlobalValue;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\MediaUsage;
use Sunrice\Cms\Support\References;

/**
 * Rebuilds what content points at (sunrice_references) from the stored
 * values, as a save would: every entry translation (draft and live, in
 * the trash too), term translation and global value, in chunks. With
 * $media, the media library's usages of entries and global sets too.
 * With $dryRun nothing is written; the counts say what would be.
 *
 *     app(RebuildReferences::class)->handle();
 *
 * @api
 */
final class RebuildReferences
{
    /** What is counted: sources gone through, and the references they hold. */
    public const COUNTS = ['entries', 'terms', 'globals', 'references'];

    private const CHUNK = 200;

    /** @return array<string, int> per self::COUNTS */
    public function handle(bool $dryRun = false, bool $media = true): array
    {
        $counts = array_fill_keys(self::COUNTS, 0);
        $write = ! $dryRun && $media;

        // Shared across chunks, so each one's fields load once.
        $collections = Collection::withTrashed()->get()->keyBy('id');
        foreach (EntryTranslation::query()->with('entry')->lazyById(self::CHUNK) as $translation) {
            $entry = $translation->entry;
            $collection = $collections->get($entry->collection_id);
            if ($collection === null) {
                continue;
            }
            $entry->setRelation('collection', $collection);
            $counts['entries']++;
            $counts['references'] += References::entry($translation, $dryRun);
            if ($write) {
                MediaUsage::entry($translation);
            }
        }

        $taxonomies = Taxonomy::withTrashed()->get()->keyBy('id');
        foreach (TermTranslation::query()->with('term')->lazyById(self::CHUNK) as $translation) {
            $taxonomy = $taxonomies->get($translation->term->taxonomy_id);
            if ($taxonomy === null) {
                continue;
            }
            $translation->term->setRelation('taxonomy', $taxonomy);
            $counts['terms']++;
            $counts['references'] += References::term($translation, $dryRun);
        }

        $sets = GlobalSet::query()->get()->keyBy('id');
        foreach (GlobalValue::query()->lazyById(self::CHUNK) as $value) {
            $set = $sets->get($value->global_set_id);
            if ($set === null) {
                continue;
            }
            $value->setRelation('globalSet', $set);
            $counts['globals']++;
            $counts['references'] += References::global($value, $dryRun);
            if ($write) {
                MediaUsage::global($value);
            }
        }

        return $counts;
    }
}
