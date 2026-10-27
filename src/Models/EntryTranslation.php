<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Collection as ContentCollection;
use Sunrice\Cms\Site\Site;
use Sunrice\Cms\Support\ContentData;
use Sunrice\Cms\Support\Locales;
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
 * @property int|null $live_version its version when last published (DiscardChanges goes back to it)
 * @property Carbon|null $live_updated_at when it was last published (liveUpdatedAt())
 * @property Carbon|null $review_requested_at when it was sent for review (RequestReview); null once published
 * @property int|null $review_requested_by who sent it for review (a user id)
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Entry $entry
 * @property-read Collection<int, Revision> $revisions
 * @property-read \Illuminate\Support\Collection<int, Term> $terms the entry's own terms, as its page shows them (termsOf())
 *
 * @phpstan-import-type TermData from Term
 *
 * @phpstan-type EntryData array{id: int, locale: string, title: string|null, slug: string|null, url: string|null, collection: string, published_at: string|null, parent_id: int|null, terms: array<string, list<TermData>>, fields?: array<string, mixed>}
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

    /** @var array{0: mixed, 1: Carbon|null}|null published_at as isLive() last read it, with the stored value */
    private ?array $publishedAt = null;

    protected static function booted(): void
    {
        // The live version's words for site search, whenever it changes.
        static::saving(function (self $translation): void {
            if ($translation->isDirty('data')) {
                $translation->search_text = SearchText::of($translation->completeData(), $translation->entry->schema());
            }
        });
    }

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['data' => 'array', 'draft_data' => 'array', 'published_at' => 'datetime', 'version' => 'integer', 'main_version' => 'integer', 'live_version' => 'integer', 'live_updated_at' => 'datetime', 'review_requested_at' => 'datetime', 'review_requested_by' => 'integer'];
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
            ->notTrashed();
    }

    /**
     * Its entry and collection not deleted. The collection is checked on
     * the translation's own collection_id (the entry's, copied), against
     * the collections in the trash: MySQL turns an exists nested in the
     * entry's, or an IN of the collections kept, into a join of every
     * collection with the rows, then sorts the rows whole in a temporary
     * table (80 ms for a page of 1,300 entries, against 1 ms).
     *
     * @param  Builder<self>  $query
     */
    public function scopeNotTrashed(Builder $query): void
    {
        $query->whereNotIn($query->qualifyColumn('collection_id'), ContentCollection::onlyTrashed()->select('id'))
            ->whereHas('entry', fn (Builder $entry) => $entry->withoutTrashed());
    }

    /**
     * In a language as the site shows it: the translations in that
     * language and, with the main-language fallback (`$fallback`; null:
     * `sunrice-cms.site.fallback`), the main language's of entries that
     * aren't live in it: one row per entry. In a preview (`$preview`) a
     * translation counts there whether it's live or not. Combine it with
     * live() (or the preview's own conditions).
     *
     * @param  Builder<self>  $query
     */
    public function scopeShownIn(Builder $query, string $locale, ?bool $fallback = null, bool $preview = false): void
    {
        $main = Locales::default();
        $column = $query->qualifyColumn('locale');
        if ($locale === $main || ! ($fallback ?? Site::fallback())) {
            $query->where($column, $locale);

            return;
        }
        $table = $this->getTable();
        $live = fn (QueryBuilder $own) => $own->when(! $preview, fn (QueryBuilder $live) => $live->where('own.status', self::PUBLISHED)->where('own.published_at', '<=', now()));
        if ($this->getConnection()->getDriverName() === 'pgsql') {
            // Postgres looks each main-language row up quickly enough. It would charge the NOT IN
            // below, nested in a term's count on an index page, once per term: an estimate past
            // its JIT thresholds, and an index page twice as slow.
            $query->where(fn (Builder $either) => $either->where($column, $locale)->orWhere(fn (Builder $stand) => $stand->where($column, $main)
                ->whereNotExists(fn (QueryBuilder $own) => $live($own->selectRaw('1')->from($table.' as own')
                    ->whereColumn('own.entry_id', $table.'.entry_id')->where('own.locale', $locale)))));

            return;
        }
        // The entries live in the language, found once rather than looked up row by row: MySQL can't
        // turn a NOT EXISTS under an OR into an anti-join, so it checked each main-language row on its
        // own, and SQLite scanned them. The indexes on (collection_id, locale, status, published_at,
        // entry_id) and (locale, status, published_at, entry_id) answer both halves without the rows.
        $query->whereIn($column, [$locale, $main])->where(fn (Builder $either) => $either->where($column, $locale)
            ->orWhereNotIn($query->qualifyColumn('entry_id'), fn (QueryBuilder $own) => $live($own->select('own.entry_id')->from($table.' as own')->where('own.locale', $locale))));
    }

    public function isPublished(): bool
    {
        return $this->status === self::PUBLISHED;
    }

    /** Published with its date reached. Doesn't look at the entry or collection being deleted. */
    public function isLive(): bool
    {
        if (! $this->isPublished()) {
            return false;
        }
        // The date as read last, while it's the same: every URL and link asks (a cast date is a new Carbon on each read).
        $stored = $this->attributes['published_at'] ?? null;
        if ($this->publishedAt === null || $this->publishedAt[0] !== $stored) {
            $this->publishedAt = [$stored, $this->published_at];
        }

        return $this->publishedAt[1] !== null && $this->publishedAt[1]->lte(now());
    }

    /** "draft", "scheduled" (published with a date to come) or "published". */
    public function status(): string
    {
        return ! $this->isPublished() ? 'draft' : ($this->isLive() ? 'published' : 'scheduled');
    }

    /**
     * Whether the draft differs from what was last published, or the
     * entry has terms not published yet (they're every language's).
     */
    public function hasUnpublishedChanges(): bool
    {
        return $this->title === null
            || $this->draft_title !== $this->title
            || $this->draft_slug !== $this->slug
            // Not the values another language keeps of shared fields, out of sight (ownData()).
            || ($this->draft_data != $this->data && $this->shownData($this->draft_data) != $this->shownData($this->data))
            || $this->entry->hasUnpublishedTerms();
    }

    /**
     * The live page's URL, or null when the collection has no route (or it
     * was never published). Hydrated for a page in another language (a
     * main-language entry in a list on /id, see hydrateWith()), the page
     * at that language's address when it stands in there (Site::urlIn()).
     */
    public function url(): ?string
    {
        $site = app(Site::class);

        return $this->hydration !== null ? $site->urlIn($this, $this->hydration->locale) : $site->url($this);
    }

    /**
     * When the live version last changed, for the site's "modified" dates
     * (structured data, the sitemap): when it was last published, not
     * when a draft was saved, and never before it went live.
     */
    public function liveUpdatedAt(): ?Carbon
    {
        $at = $this->live_updated_at ?? $this->updated_at;
        if ($at === null || $this->published_at === null) {
            return $at;
        }

        return $at->lt($this->published_at) ? $this->published_at : $at;
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
     * main translation's draft (or the given main data). What the others
     * have stored for shared fields (their values from when the field was
     * translated) stays as it is, out of sight, whatever the given data
     * holds for them: it comes back when the field is translated again.
     *
     * @param  array<mixed>  $data
     * @param  array<mixed>|null  $main  the main translation's data to compare with (null: its draft)
     * @param  array<mixed>|null  $stored  what it stores now, to keep its values of shared fields from (null: its draft)
     * @return array<mixed>
     */
    public function ownData(array $data, ?array $main = null, ?array $stored = null): array
    {
        $mainTranslation = $this->entry->mainTranslation();
        if ($mainTranslation === null || $mainTranslation->is($this)) {
            return $data;
        }

        return $this->entry->schema()->withoutShared($data, $main ?? $mainTranslation->draft_data, $stored ?? $this->draft_data);
    }

    /**
     * What of the given stored data (its draft, its live version or a
     * revision) is this translation's own to show: for another language
     * than the main one, without the shared fields, so values it keeps of
     * them out of sight (see ownData()) aren't compared as changes.
     *
     * @param  array<string, mixed>|null  $data
     * @return array<string, mixed>|null
     */
    public function shownData(?array $data): ?array
    {
        $main = $this->entry->mainTranslation();
        if ($data === null || $main === null || $main->is($this)) {
            return $data;
        }

        // Fields are keyed by handle.
        return array_filter($this->entry->schema()->withoutShared($data, $main->draft_data), is_string(...), ARRAY_FILTER_USE_KEY);
    }

    /**
     * Hydrate with this context when values() is given none (a query shares
     * one with its whole result), and give url() in its language.
     */
    public function hydrateWith(HydrationContext $context): static
    {
        $this->hydration = $context;

        return $this;
    }

    /**
     * `$entry->terms` in a template: the entry's own terms (every
     * language's, chosen in the editor's Taxonomies card), as its page
     * shows them: the live ones (in a preview, those not published yet),
     * by taxonomy title, then in the editors' order. A list of entries
     * reads them all at once (HydrationContext::entryTerms()).
     *
     * @return Attribute<\Illuminate\Support\Collection<int, Term>, never>
     */
    protected function terms(): Attribute
    {
        return Attribute::get(fn (): \Illuminate\Support\Collection => $this->termsOf());
    }

    /**
     * The entry's terms of one taxonomy (its handle), as `terms` gives
     * them: `$entry->termsOf('topics')`; null: all of them.
     *
     * @return \Illuminate\Support\Collection<int, Term>
     */
    public function termsOf(?string $taxonomy = null): \Illuminate\Support\Collection
    {
        $this->hydration ??= new HydrationContext($this->locale);
        $terms = $this->hydration->entryTerms($this);

        return $taxonomy === null ? $terms : $terms->filter(fn (Term $term): bool => $term->taxonomy->handle === $taxonomy)->values();
    }

    /**
     * A plain array of the entry as its page shows it, for a script on a
     * page (a map's pins, cards loaded later) or a small JSON route of the
     * app's: `id` (the entry's), `locale` (its content's language), `title`,
     * `slug`, `url`, `collection` (handle), `published_at` (ISO 8601),
     * `parent_id` and `terms` (its own, by taxonomy handle), plus `fields`
     * with the fields asked for by handle (unknown ones left out), from
     * values(): the live version, or the draft in a preview, in the page's
     * language with the main one standing in. Media, linked entries (no
     * fields of their own) and terms come as their data, dates as ISO 8601.
     * Entries sharing a context (Cms::entries()) are read together: a list
     * costs a fixed number of queries. toArray() is Eloquent's own: never
     * give it to a page.
     *
     *     <div data-pins='@json(Cms::toData($properties, ['location', 'photo']))'></div>
     *
     * @param  list<string>  $fields
     * @return EntryData
     */
    public function toData(array $fields = []): array
    {
        $this->hydration ??= new HydrationContext($this->locale);

        return ContentData::entry($this, $this->hydration, $fields);
    }

    /** The fields this translation edits: all of them for the main one, the translated ones for the others. */
    public function editableSchema(): Schema
    {
        $schema = $this->entry->schema();

        return $this->isMain() ? $schema : $schema->except($schema->shared());
    }
}
