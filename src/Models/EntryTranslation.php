<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Site\Site;

/**
 * An entry in one language. Editors change the draft (draft_title,
 * draft_slug, draft_data, saved with SaveDraft); publishing copies it to
 * the live version (title, slug, data) that the site shows, and keeps a
 * revision. A published entry dated in the future goes live on that date.
 *
 * @property int $id
 * @property int $entry_id
 * @property int $collection_id
 * @property string $locale
 * @property string $status "draft" or "published"
 * @property string|null $title
 * @property string|null $slug
 * @property array<string, mixed>|null $data
 * @property string $draft_title
 * @property string $draft_slug
 * @property array<string, mixed> $draft_data
 * @property Carbon|null $published_at
 * @property int $version
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Entry $entry
 * @property-read Collection<int, Revision> $revisions
 *
 * @api
 */
class EntryTranslation extends Model
{
    public const DRAFT = 'draft';

    public const PUBLISHED = 'published';

    protected $table = 'sunrice_entry_translations';

    protected $guarded = [];

    protected $attributes = ['status' => self::DRAFT, 'draft_data' => '{}', 'version' => 1];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['data' => 'array', 'draft_data' => 'array', 'published_at' => 'datetime', 'version' => 'integer'];
    }

    /** @return BelongsTo<Entry, $this> */
    public function entry(): BelongsTo
    {
        return $this->belongsTo(Entry::class)->withTrashed();
    }

    /** @return HasMany<Revision, $this> */
    public function revisions(): HasMany
    {
        return $this->hasMany(Revision::class)->latest('id');
    }

    /**
     * Published, its date reached, and its entry and collection not deleted.
     *
     * @param  Builder<self>  $query
     */
    public function scopeLive(Builder $query): void
    {
        $query->where('status', self::PUBLISHED)
            ->where('published_at', '<=', now())
            ->whereHas('entry', fn (Builder $entry) => $entry->withoutTrashed()->whereHas('collection', fn (Builder $collection) => $collection->withoutTrashed()));
    }

    public function isPublished(): bool
    {
        return $this->status === self::PUBLISHED;
    }

    /** Published with its date reached. Doesn't look at the entry or collection being deleted. */
    public function isLive(): bool
    {
        return $this->isPublished() && $this->published_at !== null && $this->published_at->lte(now());
    }

    /** "draft", "scheduled" (published with a date to come) or "published". */
    public function status(): string
    {
        return ! $this->isPublished() ? 'draft' : ($this->isLive() ? 'published' : 'scheduled');
    }

    /** Whether the draft differs from what was last published. */
    public function hasUnpublishedChanges(): bool
    {
        return $this->title === null
            || $this->draft_title !== $this->title
            || $this->draft_slug !== $this->slug
            || $this->draft_data != $this->data;
    }

    /** The live page's URL, or null when the collection has no route (or it was never published). */
    public function url(): ?string
    {
        return app(Site::class)->url($this);
    }

    /** Whether this is the entry's main translation, which holds the shared fields. */
    public function isMain(): bool
    {
        return $this->entry->mainTranslation()?->is($this) ?? true;
    }

    /**
     * The fields as templates get them: the live version, or the draft for
     * a preview. Fields shared by all languages come from the main
     * translation.
     *
     * @return array<mixed>
     */
    public function values(?HydrationContext $context = null): array
    {
        $context ??= new HydrationContext($this->locale);
        $schema = $this->entry->collection->schema();
        $data = $context->preview ? $this->draft_data : ($this->data ?? []);
        $main = $this->entry->mainTranslation();
        if ($main !== null && ! $main->is($this)) {
            $shared = array_flip($schema->shared());
            $data = array_replace($data, array_intersect_key($context->preview ? $main->draft_data : ($main->data ?? []), $shared));
        }

        return $schema->hydrate($data, $context);
    }

    /** The fields this translation edits: all of them for the main one, the translated ones for the others. */
    public function editableSchema(): Schema
    {
        $schema = $this->entry->collection->schema();

        return $this->isMain() ? $schema : $schema->except($schema->shared());
    }
}
