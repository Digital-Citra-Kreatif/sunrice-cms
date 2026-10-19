<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Validation\ValidationException;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Sunrice\Admin\Ai\Tool;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Locales;

/**
 * What the CMS's tools for AI agents share: finding entries and their
 * translations, and describing them.
 *
 * @internal
 */
abstract class CmsTool extends Tool
{
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
        foreach (Locales::all() as $code) {
            $locales[$code] = $entry->translation($code)?->status();
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
        ];
    }

    protected static function invalid(ValidationException $e): Response
    {
        return Response::error('Not saved: '.implode(' ', array_filter($e->validator->errors()->all(), is_string(...))));
    }
}
