<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Builder;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Site\Site;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\RichTextLinks;

/**
 * What rich text links can point at in the CMS, the menu builder's kinds:
 * entries, terms and listing pages ($panel->richTextLinkSource()). Each
 * lists only what the user may view: entries of collections they may view
 * (Access::collections()), with a page; terms of taxonomies whose terms
 * they may view, with term pages; listing pages of those collections.
 * Main-language titles (the draft's for entries) and URLs, as paths;
 * pages show each link's current URL in their language (RichTextLinks).
 *
 * @internal CmsPlugin registers them.
 */
final class RichTextLinkSources
{
    private const LIMIT = 8;

    public static function register(Panel $panel): void
    {
        $panel->richTextLinkSource(RichTextLinks::ENTRY, 'Entry',
            fn (string $query, Authorizable $user): array => self::entries($user, $query),
            fn (array $ids, Authorizable $user): array => self::entries($user, null, $ids));
        $panel->richTextLinkSource(RichTextLinks::TERM, 'Term',
            fn (string $query, Authorizable $user): array => self::terms($user, $query),
            fn (array $ids, Authorizable $user): array => self::terms($user, null, $ids));
        $panel->richTextLinkSource(RichTextLinks::LISTING, 'Listing',
            fn (string $query, Authorizable $user): array => self::listings($user, $query),
            fn (array $ids, Authorizable $user): array => self::listings($user, null, $ids));
    }

    /**
     * @param  list<int>|null  $ids
     * @return list<array{id: int, title: string, hint: string, url: string}>
     */
    public static function entries(Authorizable $user, ?string $query, ?array $ids = null): array
    {
        $collections = Access::collections($user)->filter(fn (Collection $collection): bool => $collection->route !== null);
        if ($collections->isEmpty()) {
            return [];
        }
        $found = EntryTranslation::query()
            ->with('entry.collection')
            ->where('locale', Locales::default())
            ->whereIn('collection_id', $collections->modelKeys())
            ->notTrashed()
            ->when($ids !== null, fn (Builder $q) => $q->whereIn('entry_id', $ids ?? []))
            ->when($query !== null, fn (Builder $q) => $q->whereLike('draft_title', self::like((string) $query))->orderByDesc('updated_at')->limit(self::LIMIT))
            ->get();
        $site = app(Site::class);
        $items = [];
        foreach ($found as $translation) {
            $path = $site->path($translation, $translation->slug ?? $translation->draft_slug);
            if ($path === null) {
                continue;
            }
            $status = $translation->status();
            $items[] = [
                'id' => $translation->entry_id,
                'title' => $translation->draft_title,
                'hint' => implode(' · ', array_filter([$translation->entry->collection->title, $status === 'published' ? null : self::said(ucfirst($status))])),
                'url' => $path,
            ];
        }

        return $items;
    }

    /**
     * @param  list<int>|null  $ids
     * @return list<array{id: int, title: string, hint: string, url: string}>
     */
    public static function terms(Authorizable $user, ?string $query, ?array $ids = null): array
    {
        $taxonomies = Taxonomy::query()->with('collections')->get()
            ->filter(fn (Taxonomy $taxonomy): bool => Access::terms($user, 'view', $taxonomy) && $taxonomy->hasTermPages())
            ->keyBy('id');
        if ($taxonomies->isEmpty()) {
            return [];
        }
        $main = Locales::default();
        $found = Term::query()
            ->with('translations')
            ->whereIn('taxonomy_id', $taxonomies->keys()->all())
            ->when($ids !== null, fn (Builder $q) => $q->whereKey($ids ?? []))
            ->when($query !== null, fn (Builder $q) => $q->whereHas('translations', fn (Builder $t) => $t->where('locale', $main)->whereLike('title', self::like((string) $query)))
                ->orderBy('sort_order')->limit(self::LIMIT))
            ->get();
        $items = [];
        foreach ($found as $term) {
            $taxonomy = $taxonomies->get($term->taxonomy_id);
            if (! $taxonomy instanceof Taxonomy) {
                continue;
            }
            $term->setRelation('taxonomy', $taxonomy);
            $url = self::path($term->url($main));
            if ($url !== null) {
                $items[] = ['id' => $term->id, 'title' => $term->title($main), 'hint' => $taxonomy->title, 'url' => $url];
            }
        }

        return $items;
    }

    /**
     * @param  list<int>|null  $ids
     * @return list<array{id: int, title: string, hint: string, url: string}>
     */
    public static function listings(Authorizable $user, ?string $query, ?array $ids = null): array
    {
        $needle = $query === null ? null : mb_strtolower($query);
        $items = [];
        foreach (Access::collections($user) as $collection) {
            if ($collection->listing_route === null || ($ids !== null && ! in_array($collection->id, $ids, true))
                || ($needle !== null && ! str_contains(mb_strtolower($collection->title), $needle))) {
                continue;
            }
            $url = self::path($collection->listingUrl(Locales::default()));
            if ($url !== null) {
                $items[] = ['id' => $collection->id, 'title' => $collection->title, 'hint' => self::said('Listing page'), 'url' => $url];
            }
        }

        return array_slice($items, 0, self::LIMIT);
    }

    /** An absolute URL of this site as a path ("/blog"), so the stored link works on any of its addresses. */
    private static function path(?string $url): ?string
    {
        if ($url === null) {
            return null;
        }
        $root = rtrim(url('/'), '/');

        return str_starts_with($url, $root.'/') ? substr($url, strlen($root)) : ($url === $root ? '/' : $url);
    }

    private static function like(string $query): string
    {
        return '%'.addcslashes(trim($query), '%_\\').'%';
    }

    private static function said(string $text): string
    {
        $said = __($text);

        return is_string($said) ? $said : $text;
    }
}
