<?php

declare(strict_types=1);

namespace Sunrice\Console;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Model;
use Sunrice\Fields\BlueprintSchema;
use Sunrice\Fields\TranslationOverlay;
use Sunrice\Models\Entry;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\GlobalValue;
use Sunrice\Models\Term;
use Sunrice\Models\TermTranslation;
use Sunrice\Support\Locales;

/**
 * sunrice:upgrade-translations — one-off conversion of entries, terms
 * and globals saved before translations shared the main language's
 * layout:
 *
 * - gives main-language repeater rows and flexible blocks stable ids;
 * - rewrites every secondary translation (live data and entry drafts)
 *   to store only its translated values, keyed by those ids.
 *
 * Safe to run more than once. Old revisions are left alone; they are
 * read the same way when restored.
 */
class UpgradeTranslationsCommand extends Command
{
    protected $signature = 'sunrice:upgrade-translations {--dry-run : Report what would change without saving}';

    protected $description = 'Convert entry, term and global translations to the shared-layout format (translated text only)';

    public function handle(): int
    {
        $dryRun = (bool) $this->option('dry-run');
        $changed = 0;

        Entry::withTrashed()
            ->with(['translations', 'collection.blueprint', 'blueprint'])
            ->chunkById(100, function ($entries) use ($dryRun, &$changed): void {
                foreach ($entries as $entry) {
                    $changed += $this->upgrade($entry, $dryRun);
                }
            });

        Term::withTrashed()
            ->with(['translations', 'taxonomy.blueprint'])
            ->chunkById(200, function ($terms) use ($dryRun, &$changed): void {
                foreach ($terms as $term) {
                    $fields = $term->taxonomy?->blueprint?->schema();
                    $changed += $this->upgradeRows($term->translations->all(), $fields, $dryRun);
                }
            });

        foreach (GlobalSet::query()->with(['values', 'blueprint'])->get() as $set) {
            $changed += $this->upgradeRows($set->values->all(), $set->blueprint?->schema(), $dryRun);
        }

        $this->info(($dryRun ? 'Would update ' : 'Updated ')."{$changed} translation(s).");

        return self::SUCCESS;
    }

    protected function upgrade(Entry $entry, bool $dryRun): int
    {
        $schema = $entry->activeBlueprint()?->schema();
        $main = $entry->mainTranslation();
        if ($schema === null || $main === null) {
            return 0;
        }

        $fields = $schema->fields();
        $changed = 0;

        // 1. Main language: assign row/block ids (normalize adds them).
        $mainData = $schema->normalize((array) ($main->data ?? []));
        $mainDraft = is_array($main->draft) ? $main->draft : null;
        if ($mainDraft !== null) {
            $mainDraft['data'] = $schema->normalize((array) ($mainDraft['data'] ?? []));
        }
        if (! static::same($mainData, $main->data) || ! static::same($mainDraft, $main->draft)) {
            $changed += $this->save($main, ['data' => $mainData, 'draft' => $mainDraft], $dryRun);
        }

        // 2. Secondary languages: keep only translated values.
        foreach ($entry->translations as $translation) {
            if (Locales::isMain($translation->locale)) {
                continue;
            }

            $data = TranslationOverlay::extract(
                $fields,
                TranslationOverlay::merge($fields, $mainData, (array) ($translation->data ?? [])),
                $mainData,
            );

            $draft = is_array($translation->draft) ? $translation->draft : null;
            if ($draft !== null) {
                $base = (array) ($mainDraft['data'] ?? $mainData);
                $draft['data'] = TranslationOverlay::extract(
                    $fields,
                    TranslationOverlay::merge($fields, $base, (array) ($draft['data'] ?? [])),
                    $base,
                );
            }

            if (! static::same($data, $translation->data) || ! static::same($draft, $translation->draft)) {
                $changed += $this->save($translation, ['data' => $data, 'draft' => $draft], $dryRun);
            }
        }

        return $changed;
    }

    /**
     * Terms and globals: one row per language with a `data` column.
     *
     * @param  array<int, TermTranslation|GlobalValue>  $rows
     */
    protected function upgradeRows(array $rows, ?BlueprintSchema $schema, bool $dryRun): int
    {
        $main = collect($rows)->first(fn (Model $row) => Locales::isMain((string) $row->getAttribute('locale')));
        if ($schema === null || $main === null) {
            return 0;
        }

        $fields = $schema->fields();
        $changed = 0;
        $mainData = $schema->normalize((array) ($main->getAttribute('data') ?? []));
        if (! static::same($mainData, $main->getAttribute('data'))) {
            $changed += $this->save($main, ['data' => $mainData], $dryRun);
        }

        foreach ($rows as $row) {
            if ($row === $main) {
                continue;
            }
            $data = TranslationOverlay::extract($fields, TranslationOverlay::merge($fields, $mainData, (array) ($row->getAttribute('data') ?? [])), $mainData);
            if (! static::same($data, $row->getAttribute('data'))) {
                $changed += $this->save($row, ['data' => $data], $dryRun);
            }
        }

        return $changed;
    }

    /**
     * Equal JSON values, ignoring object key order (MySQL and jsonb
     * reorder keys on save).
     */
    protected static function same(mixed $a, mixed $b): bool
    {
        return static::canonical($a) === static::canonical($b);
    }

    protected static function canonical(mixed $value): mixed
    {
        if (! is_array($value)) {
            return $value;
        }
        if (! array_is_list($value)) {
            ksort($value);
        }

        return array_map(static::canonical(...), $value);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    protected function save(Model $translation, array $attributes, bool $dryRun): int
    {
        if (! $dryRun) {
            // Not an editorial change: leave timestamps (and "outdated" flags) alone.
            $translation->timestamps = false;
            $translation->forceFill($attributes)->saveQuietly();
            $translation->timestamps = true;
        }

        return 1;
    }
}
