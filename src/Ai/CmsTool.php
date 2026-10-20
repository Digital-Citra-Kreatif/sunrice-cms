<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Validation\ValidationException;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Sunrice\Admin\Ai\Tool;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\Locales;

/**
 * What the CMS's tools for AI agents share: finding entries and their
 * translations, and describing them.
 *
 * @internal
 */
abstract class CmsTool extends Tool
{
    /** The token's user. */
    protected function user(): ?Authorizable
    {
        $user = auth(app(Panel::class)->getGuard())->user();

        return $user instanceof Authorizable ? $user : null;
    }

    /** Whether the token's user may do this with entries (see Access): in a collection, of an entry, in a language. */
    protected function may(string $action, Collection|string|null $collection = null, ?Entry $entry = null, ?string $locale = null): bool
    {
        return Access::entries($this->user(), $action, $collection, $entry, $locale);
    }

    /** The entry asked for ("id"), with its translations, or an error. */
    protected function findEntry(Request $request, bool $withTrashed = false): Entry|Response
    {
        $id = $request->get('id');
        $entry = is_int($id) || (is_string($id) && ctype_digit($id))
            ? Entry::query()->when($withTrashed, fn ($query) => $query->withTrashed())->with('translations', 'collection')->find((int) $id)
            : null;

        return $entry === null || $entry->collection->trashed() ? Response::error('No such entry. cms_list_entries lists them.') : $entry;
    }

    /** The translation in "locale", or the main one; or an error. */
    protected function findTranslation(Request $request, Entry $entry): EntryTranslation|Response
    {
        $locale = $request->get('locale');
        if (! is_string($locale) || $locale === '') {
            return $entry->mainTranslation() ?? Response::error('The entry has no translations.');
        }

        return $entry->translation($locale)
            ?? Response::error("The entry has no {$locale} translation. Languages: ".implode(', ', Locales::all()).'; add one with cms_translate_entry.');
    }

    /** @return array<string, mixed> */
    protected static function describe(EntryTranslation $translation): array
    {
        $entry = $translation->entry;
        $locales = [];
        $outdated = [];
        foreach (Locales::all() as $code) {
            $other = $entry->translation($code);
            $locales[$code] = $other?->status();
            if ($other?->isOutdated() === true) {
                $outdated[] = $code;
            }
        }

        return [
            'id' => $entry->id,
            'collection' => $entry->collection->handle,
            'locale' => $translation->locale,
            'title' => $translation->draft_title,
            'slug' => $translation->draft_slug,
            'status' => $translation->status(),
            'published_at' => $translation->published_at?->toIso8601String(),
            'has_unpublished_changes' => $translation->isPublished() && $translation->hasUnpublishedChanges(),
            'url' => $translation->isLive() && ! $entry->trashed() ? $translation->url() : null,
            'trashed' => $entry->trashed(),
            'languages' => $locales,
            // This translation, and the languages, whose main language changed since they were translated.
            'outdated' => $translation->isOutdated(),
            'outdated_languages' => $outdated,
        ];
    }

    protected static function invalid(ValidationException $e): Response
    {
        return Response::error('Not saved: '.implode(' ', array_filter($e->validator->errors()->all(), is_string(...))));
    }
}
