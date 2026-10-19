<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Support\Facades\Route;
use Sunrice\Admin\Media\MediaUsages;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\GlobalValue;

/**
 * Tells the media library which files entries and global sets use (the
 * draft and the live version, and the SEO share image), on every save.
 *
 * @internal
 */
final class MediaUsage
{
    public static function entry(EntryTranslation $translation): void
    {
        $entry = $translation->entry;
        $collection = $entry->collection;
        $schema = $collection->schema();
        $ids = [...self::ids($schema, $translation->draft_data), ...self::ids($schema, $translation->data ?? [])];
        $url = Route::has('sunrice.admin.cms.entries.edit') ? route('sunrice.admin.cms.entries.edit', [$entry->id, 'locale' => $translation->locale]) : null;
        app(MediaUsages::class)->sync('cms.entry', (string) $entry->id, $ids,
            "{$collection->title}: {$translation->draft_title} (".strtoupper($translation->locale).')', $url, $translation->locale);
    }

    public static function global(GlobalValue $value): void
    {
        $set = $value->globalSet;
        $url = Route::has('sunrice.admin.cms.globals.edit') ? route('sunrice.admin.cms.globals.edit', [$set->handle, 'locale' => $value->locale]) : null;
        app(MediaUsages::class)->sync('cms.global', (string) $set->id, self::ids($set->schema(), $value->data),
            "Globals: {$set->title} (".strtoupper($value->locale).')', $url, $value->locale);
    }

    /**
     * @param  array<mixed>  $data
     * @return list<int>
     */
    private static function ids(Schema $schema, array $data): array
    {
        $ids = [];
        foreach ($schema->references($data) as $reference) {
            if ($reference->type === Reference::MEDIA) {
                $ids[] = $reference->id;
            }
        }
        $seo = $data[Seo::KEY] ?? null;
        if (is_array($seo) && is_int($seo['image'] ?? null)) {
            $ids[] = $seo['image'];
        }

        return $ids;
    }
}
