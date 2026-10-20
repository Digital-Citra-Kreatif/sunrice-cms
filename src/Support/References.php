<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Models\ContentReference;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\GlobalValue;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;

/**
 * Keeps sunrice_references: which entries and terms an entry's draft and
 * live values, a term's values and a global set's values point at, per
 * language, read from the field definitions (Schema::references()) on
 * every save, one delete and one insert. And reads them back as "Used by".
 *
 * @internal
 */
final class References
{
    public static function entry(EntryTranslation $translation): void
    {
        $schema = $translation->entry->collection->schema();
        self::sync(ContentReference::ENTRY, $translation->entry_id, $translation->locale,
            [...$schema->references($translation->draft_data), ...$schema->references($translation->data ?? [])]);
    }

    public static function term(TermTranslation $translation): void
    {
        self::sync(ContentReference::TERM, $translation->term_id, $translation->locale,
            $translation->term->taxonomy->schema()->references($translation->data ?? []));
    }

    public static function global(GlobalValue $value): void
    {
        self::sync(ContentReference::GLOBAL, $value->global_set_id, $value->locale, $value->globalSet->schema()->references($value->data));
    }

    /** Forgets what a source points at: in one language, or in all (null). */
    public static function forget(string $sourceType, int $sourceId, ?string $locale = null): void
    {
        ContentReference::query()->where('source_type', $sourceType)->where('source_id', $sourceId)
            ->when($locale !== null, fn ($query) => $query->where('locale', $locale))->delete();
    }

    /**
     * Where an entry or a term is used, a source and language once.
     *
     * @param  string  $type  Reference::ENTRY or Reference::TERM
     * @return list<array{label: string, url: string|null, field: string}>
     */
    public static function usedBy(string $type, int $id): array
    {
        return self::usedByMany($type, [$id])[$id] ?? [];
    }

    /**
     * Where each of some entries or terms is used, in one go.
     *
     * @param  list<int>  $ids
     * @return array<int, list<array{label: string, url: string|null, field: string}>>
     */
    public static function usedByMany(string $type, array $ids): array
    {
        if ($ids === []) {
            return [];
        }
        $rows = ContentReference::query()->where('target_type', $type)->whereIn('target_id', $ids)->orderBy('id')->get()
            // Pointing at itself doesn't keep it from going.
            ->reject(fn (ContentReference $r): bool => $r->source_type === $type && $r->source_id === $r->target_id);
        $ofType = fn (string $source): array => $rows->where('source_type', $source)->pluck('source_id')->unique()->values()->all();
        $entries = Entry::withTrashed()->with(['collection', 'translations'])->whereKey($ofType(ContentReference::ENTRY))->get()->keyBy('id');
        $terms = Term::withTrashed()->with(['taxonomy', 'translations'])->whereKey($ofType(ContentReference::TERM))->get()->keyBy('id');
        $sets = GlobalSet::query()->whereKey($ofType(ContentReference::GLOBAL))->get()->keyBy('id');

        $used = [];
        foreach ($rows as $row) {
            $key = $row->source_type.':'.$row->source_id.':'.$row->locale;
            if (isset($used[$row->target_id][$key])) {
                continue;
            }
            $language = $row->locale === '' ? '' : ' ('.strtoupper($row->locale).')';
            $item = match ($row->source_type) {
                ContentReference::ENTRY => ($entry = $entries->get($row->source_id)) === null ? null : [
                    'label' => $entry->collection->title.': '.($entry->translation($row->locale)->draft_title ?? '#'.$entry->id).$language.($entry->trashed() ? ' — in the trash' : ''),
                    'url' => Route::has('sunrice.admin.cms.entries.edit') ? route('sunrice.admin.cms.entries.edit', [$entry->id, 'locale' => $row->locale]) : null,
                ],
                ContentReference::TERM => ($term = $terms->get($row->source_id)) === null ? null : [
                    'label' => $term->taxonomy->title.': '.$term->title($row->locale).$language.($term->trashed() ? ' — in the trash' : ''),
                    'url' => Route::has('sunrice.admin.cms.terms.edit') ? route('sunrice.admin.cms.terms.edit', [$term->id, 'locale' => $row->locale]) : null,
                ],
                ContentReference::GLOBAL => ($set = $sets->get($row->source_id)) === null ? null : [
                    'label' => 'Globals: '.$set->title.$language,
                    'url' => Route::has('sunrice.admin.cms.globals.edit') ? route('sunrice.admin.cms.globals.edit', [$set->handle, 'locale' => $row->locale]) : null,
                ],
                default => null,
            };
            if ($item !== null) {
                $used[$row->target_id][$key] = $item + ['field' => $row->field];
            }
        }

        return array_map(array_values(...), $used);
    }

    /**
     * Where it's used, in a line, for confirmations and refusals.
     *
     * @param  list<array{label: string, url: string|null, field: string}>  $usedBy
     */
    public static function sentence(array $usedBy, int $limit = 5): string
    {
        $labels = array_map(fn (array $item): string => $item['label'], array_slice($usedBy, 0, $limit));
        $more = count($usedBy) - count($labels);

        return implode('; ', $labels).($more > 0 ? " and {$more} more" : '');
    }

    /**
     * Replaces what a source in a language points at.
     *
     * @param  list<Reference>  $references
     */
    private static function sync(string $sourceType, int $sourceId, string $locale, array $references): void
    {
        $rows = [];
        foreach ($references as $reference) {
            if (in_array($reference->type, [Reference::ENTRY, Reference::TERM], true)) {
                $field = mb_substr($reference->path, 0, 255);
                $rows[$reference->type.':'.$reference->id.':'.$field] = [
                    'source_type' => $sourceType, 'source_id' => $sourceId, 'locale' => $locale,
                    'target_type' => $reference->type, 'target_id' => $reference->id, 'field' => $field,
                ];
            }
        }
        DB::transaction(function () use ($sourceType, $sourceId, $locale, $rows): void {
            self::forget($sourceType, $sourceId, $locale);
            if ($rows !== []) {
                ContentReference::query()->insert(array_values($rows));
            }
        });
    }
}
