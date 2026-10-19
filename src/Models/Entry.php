<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Support\Locales;

/**
 * A piece of content in a collection. Its title, slug and fields live in
 * its translations, one per language (EntryTranslation). Created with
 * CreateEntry; trashed with TrashEntry.
 *
 * @property int $id
 * @property int $collection_id
 * @property int|null $author_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read Collection $collection
 * @property-read \Illuminate\Database\Eloquent\Collection<int, EntryTranslation> $translations
 *
 * @api
 */
class Entry extends Model
{
    use SoftDeletes;

    protected $table = 'sunrice_entries';

    protected $guarded = [];

    /** @return BelongsTo<Collection, $this> */
    public function collection(): BelongsTo
    {
        // Trashed collections too: their entries still exist.
        return $this->belongsTo(Collection::class)->withTrashed();
    }

    /** @return HasMany<EntryTranslation, $this> */
    public function translations(): HasMany
    {
        return $this->hasMany(EntryTranslation::class);
    }

    public function translation(string $locale): ?EntryTranslation
    {
        return $this->translations->firstWhere('locale', $locale);
    }

    /**
     * The translation in the main language, which holds the fields shared
     * by all languages; the oldest one if there's none in it.
     */
    public function mainTranslation(): ?EntryTranslation
    {
        return $this->translation(Locales::default()) ?? $this->translations->sortBy('id')->first();
    }
}
