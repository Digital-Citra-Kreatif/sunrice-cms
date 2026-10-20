<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Sunrice\Admin\Security\SecurityLog;
use Sunrice\Admin\Support\Csv;
use Sunrice\Cms\Actions\Entries\BulkEntries;
use Sunrice\Cms\Actions\Entries\DuplicateEntry;
use Sunrice\Cms\Actions\Entries\ForceDeleteEntry;
use Sunrice\Cms\Actions\Entries\MoveEntry;
use Sunrice\Cms\Actions\Entries\PutBackDraft;
use Sunrice\Cms\Actions\Entries\SaveEntrySettings;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\FieldText;
use Sunrice\Cms\Support\Locales;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Entries beyond the editor: bulk actions and CSV export of a collection,
 * duplicating, deleting for good, and undoing a revision restore.
 *
 * @internal
 */
final class EntryManageController
{
    public function bulk(Request $request, Collection $collection, BulkEntries $bulk): RedirectResponse
    {
        $request->validate(['action' => ['required', 'string'], 'ids' => ['required', 'array'], 'ids.*' => ['integer']]);
        $ids = [];
        foreach ((array) $request->input('ids') as $id) {
            $ids[] = is_numeric($id) ? (int) $id : 0;
        }
        $user = $request->user();
        $done = $bulk->handle($collection, $request->string('action')->toString(), $ids, $user instanceof Authorizable ? $user : null);
        $skipped = count($ids) - $done;

        return back()->with($done > 0 ? 'success' : 'error', match (true) {
            $done === 0 => 'Nothing was changed.',
            $skipped > 0 => "Done for {$done} of ".count($ids)." entries; the others can't be (not allowed, or not ready to publish).",
            default => "Done for {$done} ".($done === 1 ? 'entry' : 'entries').'.',
        });
    }

    /** The collection's entries in the main language as CSV, a column per top-level field. Logged: it carries content out. */
    public function export(Request $request, Collection $collection, SecurityLog $security): StreamedResponse
    {
        $user = $request->user();
        $security->record('exported', $user instanceof Model ? $user : null, null, ['note' => $collection->title.' entries (CSV)']);
        $fields = $collection->schema()->fields();

        return response()->streamDownload(function () use ($collection, $fields): void {
            $out = fopen('php://output', 'w');
            if ($out === false) {
                return;
            }
            Csv::write($out, ['ID', 'Title', 'Slug', 'Status', 'Published', 'URL', 'Updated', ...array_map(FieldText::label(...), $fields)]);
            EntryTranslation::query()->where('collection_id', $collection->id)->where('locale', Locales::default())
                ->whereHas('entry', fn ($query) => $query->withoutTrashed())->with('entry.collection')
                ->orderBy('id')->chunkById(500, function ($translations) use ($fields, $out): void {
                    foreach ($translations as $translation) {
                        $values = array_map(fn ($field): string => FieldText::text($translation->draft_data[$field->handle] ?? null, $field), $fields);
                        Csv::write($out, [
                            $translation->entry_id, $translation->draft_title, $translation->draft_slug, $translation->status(),
                            $translation->published_at?->toDateTimeString(), $translation->isLive() ? $translation->url() : null,
                            $translation->updated_at?->toDateTimeString(), ...$values,
                        ]);
                    }
                });
            fclose($out);
        }, $collection->handle.'-entries-'.now()->format('Y-m-d').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    public function duplicate(Entry $entry, DuplicateEntry $duplicate): RedirectResponse
    {
        abort_if($entry->collection->trashed(), 404);
        $copy = $duplicate->handle($entry);

        return redirect()->route('sunrice.admin.cms.entries.edit', $copy->id)->with('success', 'Copied as a new draft.');
    }

    /** The parent and the template, in every language. */
    public function settings(Request $request, Entry $entry, SaveEntrySettings $save): RedirectResponse
    {
        abort_if($entry->collection->trashed(), 404);
        $input = $request->only(['parent_id', 'template', 'comments_closed']);
        // Picking a view is for the collection's editors (cms.entries.update), not authors of their own entries: theirs may only stay as it is.
        if (array_key_exists('template', $input) && ! Access::entries($request->user(), 'update', $entry->collection)) {
            $template = is_string($input['template']) ? trim($input['template']) : '';
            abort_unless(($template === '' ? null : $template) === $entry->template, 403);
            unset($input['template']);
        }
        $save->handle($entry, $input);

        return back()->with('success', 'Saved.');
    }

    public function move(Request $request, Entry $entry, MoveEntry $move): RedirectResponse
    {
        $move->handle($entry, $request->string('direction')->toString());

        return back();
    }

    /** For good; one used elsewhere only with "force" (the editor asks first). */
    public function forceDelete(Request $request, Entry $entry, ForceDeleteEntry $delete): RedirectResponse
    {
        $collection = $entry->collection->handle;
        $delete->handle($entry, $request->boolean('force'));

        return redirect()->route('sunrice.admin.cms.entries.index', [$collection, 'trashed' => 1])->with('success', 'Deleted for good.');
    }

    /** Puts back the draft a revision restore replaced, in this session. */
    public function undoRestore(Request $request, EntryTranslation $translation, PutBackDraft $putBack): RedirectResponse
    {
        $draft = $request->session()->pull(self::undoKey($translation));
        if (! is_array($draft) || ! is_string($draft['title'] ?? null) || ! is_string($draft['slug'] ?? null) || ! is_array($draft['data'] ?? null)) {
            return back()->with('error', 'There is no restore to undo.');
        }
        $putBack->handle($translation, ['title' => $draft['title'], 'slug' => $draft['slug'], 'data' => $draft['data']]);

        return back()->with('success', 'Your previous draft is back.');
    }

    public static function undoKey(EntryTranslation $translation): string
    {
        return 'sunrice-cms.undo-restore.'.$translation->id;
    }
}
