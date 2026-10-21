<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Sunrice\Admin\Preferences\Preferences;
use Sunrice\Admin\Security\SecurityLog;
use Sunrice\Admin\Support\Csv;
use Sunrice\Cms\Actions\Entries\BulkEntries;
use Sunrice\Cms\Actions\Entries\ChangeBlueprint;
use Sunrice\Cms\Actions\Entries\DuplicateEntry;
use Sunrice\Cms\Actions\Entries\ForceDeleteEntry;
use Sunrice\Cms\Actions\Entries\MoveEntry;
use Sunrice\Cms\Actions\Entries\PutBackDraft;
use Sunrice\Cms\Actions\Entries\ReorderEntries;
use Sunrice\Cms\Actions\Entries\SaveEntrySettings;
use Sunrice\Cms\Admin\EntryList;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Access;
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

    /**
     * The entries list as CSV, with its filters, search, sort and language
     * (not paged): the columns, and a column per top-level field. Logged:
     * it carries content out.
     */
    public function export(Request $request, Collection $collection, SecurityLog $security, Preferences $preferences): StreamedResponse
    {
        $user = $request->user();
        $security->record('exported', $user instanceof Model ? $user : null, null, ['note' => $collection->title.' entries (CSV)']);
        $list = new EntryList($collection, $request, $user instanceof Authenticatable ? $user : null, $preferences);

        return response()->streamDownload(function () use ($list): void {
            $out = fopen('php://output', 'w');
            if ($out === false) {
                return;
            }
            $list->export(fn (array $row) => Csv::write($out, $row));
            fclose($out);
        }, $collection->handle.'-entries-'.now()->format('Y-m-d').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    public function duplicate(Entry $entry, DuplicateEntry $duplicate): RedirectResponse
    {
        abort_if($entry->collection->trashed(), 404);
        $copy = $duplicate->handle($entry);

        return redirect()->route('sunrice.admin.cms.entries.edit', $copy->id)->with('success', 'Copied as a new draft.');
    }

    /** The parent, the template and the blueprint, in every language. */
    public function settings(Request $request, Entry $entry, SaveEntrySettings $save, ChangeBlueprint $blueprint): RedirectResponse
    {
        abort_if($entry->collection->trashed(), 404);
        // Every language's settings: for those who may edit the entry itself, not translators
        // (whose "locale" lets them past the route's check for their languages' text).
        abort_unless(Access::entries($request->user(), 'update', $entry->collection, $entry), 403);
        $input = $request->only(['parent_id', 'template', 'comments_closed']);
        if ($request->has('blueprint')) {
            $handle = $request->input('blueprint');
            $blueprint->handle($entry, is_string($handle) ? $handle : null);
        }
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
        // The order is every language's: not for translators.
        abort_unless(Access::entries($request->user(), 'update', $entry->collection, $entry), 403);
        $move->handle($entry, $request->string('direction')->toString());

        return back();
    }

    /** Entries of an ordered collection in the order dragged: "collection", "ids" and "parent_id". */
    public function reorder(Request $request, ReorderEntries $reorder): RedirectResponse
    {
        $handle = $request->input('collection');
        $collection = is_string($handle) ? Collection::query()->where('handle', $handle)->first() : null;
        abort_if($collection === null, 404);
        abort_unless(Access::entries($request->user(), 'update', $collection), 403);
        $parent = $request->input('parent_id');
        $reorder->handle($collection, (array) $request->input('ids', []), is_numeric($parent) ? (int) $parent : null);

        return back()->with('success', 'Order saved.');
    }

    /** For good; one used elsewhere only with "force" (the editor asks first). */
    public function forceDelete(Request $request, Entry $entry, ForceDeleteEntry $delete): RedirectResponse
    {
        $collection = $entry->collection->handle;
        $delete->handle($entry, $request->boolean('force'));

        return redirect()->route('sunrice.admin.cms.entries.index', [$collection, 'status' => 'trashed'])->with('success', 'Deleted for good.');
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
