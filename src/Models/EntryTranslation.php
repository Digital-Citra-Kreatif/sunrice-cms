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
use Sunrice\Cms\Support\SearchText;

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
 * @property string|null $search_text the live version's field text, for site search (kept by the model)
 * @property array<string, mixed>|null $data
 * @property string $draft_title
 * @property string $draft_slug
 * @property array<string, mixed> $draft_data
 * @property Carbon|null $published_at
 * @property int $version
 * @property int|null $main_version the main translation's version when this one was made or last saved (another language than the main one)
 * @property Carbon|null $review_requested_at when it was sent for review (RequestReview); null once published
 * @property int|null $review_requested_by who sent it for review (a user id)
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

    /** The context values() hydrates with when given none: shared by a query's whole result (EntryQuery). */
    private ?HydrationContext $hydration = null;

    protected static function booted(): void
    {
        // The live version's words for site search, whenever it changes.
        static::saving(function (self $translation): void {
            if ($translation->isDirty('data')) {
                $translation->search_text = SearchText::of($translation->completeData());
            }
        });
    }

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['data' => 'array', 'draft_data' => 'array', 'published_at' => 'datetime', 'version' => 'integer', 'main_version' => 'integer', 'review_requested_at' => 'datetime', 'review_requested_by' => 'integer'];
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
     * Another language than the main one, whose main translation changed
     * (its version moved on) since this one was made, saved or published.
     */
    public function isOutdated(): bool
    {
        if ($this->main_version === null) {
            return false;
        }
        $main = $this->entry->mainTranslation();

        return $main !== null && ! $main->is($this) && $main->version > $this->main_version;
    }

    /** The main translation's version as stored now, to keep in main_version; null on the main translation. */
    public function currentMainVersion(): ?int
    {
        $main = $this->entry->mainTranslation();
        if ($main === null || $main->is($this)) {
            return null;
        }
        $version = self::query()->whereKey($main->id)->value('version');

        return is_numeric($version) ? (int) $version : $main->version;
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
        $context ??= $this->hydration ?? new HydrationContext($this->locale);
        // What its fields point at, loaded one query per kind (with the other entries sharing the context).
        $context->prepare($this);

        return $this->entry->schema()->hydrate($this->completeData($context->preview), $context);
    }

    /**
     * The stored fields, complete: the live version (or the draft) with,
     * for a language other than the main one, what all languages share from
     * the main translation: the shared fields, and the shared fields inside
     * translated groups, repeater rows and flexible blocks the main one has
     * too (rows and blocks matched by id). Other languages store only the
     * rest (see ownData()), so the shared values are never stale copies.
     *
     * @return array<string, mixed>
     */
    public function completeData(bool $draft = false): array
    {
        $data = $draft ? $this->draft_data : ($this->data ?? []);
        $main = $this->entry->mainTranslation();
        if ($main !== null && ! $main->is($this)) {
            // Fields are keyed by handle.
            $data = array_filter($this->entry->schema()->withShared($data, $draft ? $main->draft_data : ($main->data ?? [])), is_string(...), ARRAY_FILTER_USE_KEY);
        }

        return $data;
    }

    /**
     * What this translation stores of the given fields: all of them for the
     * main one; for the others, without what completeData() takes from the
     * main translation's draft (or the given main data).
     *
     * @param  array<mixed>  $data
     * @param  array<mixed>|null  $main  the main translation's data to compare with (null: its draft)
     * @return array<mixed>
     */
    public function ownData(array $data, ?array $main = null): array
    {
        $mainTranslation = $this->entry->mainTranslation();
        if ($mainTranslation === null || $mainTranslation->is($this)) {
            return $data;
        }

        return $this->entry->schema()->withoutShared($data, $main ?? $mainTranslation->draft_data);
    }

    /** Hydrate with this context when values() is given none: a query shares one with its whole result. */
    public function hydrateWith(HydrationContext $context): static
    {
        $this->hydration = $context;

        return $this;
    }

    /** The fields this translation edits: all of them for the main one, the translated ones for the others. */
    public function editableSchema(): Schema
    {
        $schema = $this->entry->schema();

        return $this->isMain() ? $schema : $schema->except($schema->shared());
    }
}
