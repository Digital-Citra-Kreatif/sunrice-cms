<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Settings\CommentSettings;
use Sunrice\Cms\Support\Locales;

/**
 * A piece of content in a collection. Its title, slug and fields live in
 * its translations, one per language (EntryTranslation). Created with
 * CreateEntry; trashed with TrashEntry.
 *
 * @property int $id
 * @property int $collection_id
 * @property int|null $author_id
 * @property int|null $parent_id
 * @property int $sort_order
 * @property string|null $template a Blade view for this entry alone
 * @property bool $comments_closed it takes no new comments
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read Collection $collection
 * @property-read Entry|null $parent
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Entry> $children
 * @property-read \Illuminate\Database\Eloquent\Collection<int, EntryTranslation> $translations
 *
 * @api
 */
class Entry extends Model
{
    use SoftDeletes;

    protected $table = 'sunrice_entries';

    /** How deep entries may nest under parents. */
    public const MAX_DEPTH = 10;

    protected $guarded = [];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['comments_closed' => 'boolean'];
    }

    /** @return HasMany<Comment, $this> */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Whether it takes new comments now: its collection allows them, it
     * isn't closed (by hand, or by Settings → Comments' days after its
     * publish date) and it's on the site in some language.
     */
    public function acceptsComments(): bool
    {
        if (! $this->collection->comments || $this->comments_closed || $this->trashed() || $this->collection->trashed()) {
            return false;
        }
        $days = app(CommentSettings::class)->closeAfterDays;
        $published = null;
        foreach ($this->translations as $translation) {
            if ($translation->isLive() && $translation->published_at !== null && ($published === null || $translation->published_at->lt($published))) {
                $published = $translation->published_at;
            }
        }
        if ($published === null) {
            return false;
        }

        return $days === null || now()->lt($published->copy()->addDays($days));
    }

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

    /**
     * The terms of its published terms fields (synced on publish).
     *
     * @return BelongsToMany<Term, $this>
     */
    public function terms(): BelongsToMany
    {
        return $this->belongsToMany(Term::class, 'sunrice_entry_term');
    }

    /**
     * The parent entry, in a hierarchical collection.
     *
     * @return BelongsTo<Entry, $this>
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /** @return HasMany<Entry, $this> */
    public function children(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /**
     * The entries above this one, top-down (for breadcrumbs).
     *
     * @return list<Entry>
     */
    public function ancestors(): array
    {
        $ancestors = [];
        $seen = [$this->id => true];
        for ($parent = $this->parent; $parent !== null && ! isset($seen[$parent->id]) && count($ancestors) < self::MAX_DEPTH; $parent = $parent->parent) {
            $seen[$parent->id] = true;
            array_unshift($ancestors, $parent);
        }

        return $ancestors;
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
