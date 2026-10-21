<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Sunrice\Admin\Dashboard\Widget;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Models\Comment;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\Submission;
use Sunrice\Cms\Settings\SiteSettings;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\Handles;
use Sunrice\Cms\Support\Locales;

/**
 * The CMS's dashboard widgets: what's left to set up, entries per collection, recent edits,
 * what's scheduled, comments waiting and the latest submissions. Each
 * reads only what the user may see (Support\Access), in one query (the
 * comments widget a second one for signed-in authors' names).
 *
 * @internal
 */
final class DashboardWidgets
{
    public const RECENT = 8;

    /** @return list<Widget> */
    public static function all(): array
    {
        return [self::setup(), self::collections(), self::review(), self::recentEdits(), self::comments(), self::scheduled(), self::submissions()];
    }

    /**
     * What's left to set up a new site, for site managers (cms.settings.site),
     * shown until it's done: the first entries, the homepage, menus without
     * links. Three small queries, only for them.
     */
    public static function setup(): Widget
    {
        return Widget::list('cms.setup')->title('Getting the site ready')->description('Still to do before the site goes live')
            ->icon('clipboard-list')->sort(5)->span(2)->permission('cms.settings.site')
            ->visible(fn (): bool => self::setupSteps() !== [])
            ->data(fn (): array => ['rows' => self::setupSteps()]);
    }

    /** @return list<array{title: string, meta: string, url: string}> */
    private static function setupSteps(): array
    {
        $steps = [];
        if (! Entry::query()->exists()) {
            $steps[] = ['title' => self::said(__('Write the first entries'), 'Write the first entries'), 'meta' => self::said(__('Pages, posts… in the collections under Content.'), ''), 'url' => 'cms/entries'];
        }
        if (app(SiteSettings::class)->homepage === null) {
            $steps[] = ['title' => self::said(__('Choose the homepage'), 'Choose the homepage'), 'meta' => self::said(__('The entry shown at the site\'s address: Settings → Site.'), ''), 'url' => 'settings/site'];
        }
        foreach (Menu::query()->whereDoesntHave('items')->orderBy('title')->limit(5)->get(['handle', 'title']) as $menu) {
            $steps[] = ['title' => self::said(__('Add links to the :menu menu', ['menu' => $menu->title]), $menu->title), 'meta' => self::said(__('It has no links yet, so the site shows nothing there.'), ''), 'url' => "cms/menus/{$menu->handle}/links"];
        }

        return $steps;
    }

    public static function collections(): Widget
    {
        return Widget::list('cms.collections')->title('Content')->icon('file-text')->sort(10)
            ->link('cms/entries', 'All entries')->empty('No collections yet.')
            ->visible(fn (Authorizable $user): bool => Access::entries($user, 'view'))
            ->data(function (Authorizable $user): array {
                $handles = self::collectionsFor($user);
                if ($handles === []) {
                    return ['rows' => []];
                }
                $now = now();
                $rows = [];
                foreach (DB::table('sunrice_collections as c')
                    // Main-language translations of entries not in the trash.
                    ->leftJoin('sunrice_entry_translations as t', fn (JoinClause $join) => $join->on('t.collection_id', '=', 'c.id')
                        ->where('t.locale', Locales::default())
                        ->whereIn('t.entry_id', fn (QueryBuilder $entries) => $entries->select('id')->from('sunrice_entries')->whereNull('deleted_at')))
                    ->whereNull('c.deleted_at')->whereIn('c.handle', $handles)
                    ->groupBy('c.id', 'c.handle', 'c.title')->orderBy('c.title')
                    ->select('c.handle', 'c.title')
                    ->selectRaw('sum(case when t.status = ? and t.published_at <= ? then 1 else 0 end) as live', [EntryTranslation::PUBLISHED, $now])
                    ->selectRaw('sum(case when t.status = ? then 1 else 0 end) as drafts', [EntryTranslation::DRAFT])
                    ->selectRaw('sum(case when t.status = ? and t.published_at > ? then 1 else 0 end) as scheduled', [EntryTranslation::PUBLISHED, $now])
                    ->get() as $row) {
                    $live = self::int($row->live ?? null);
                    $drafts = self::int($row->drafts ?? null);
                    $scheduled = self::int($row->scheduled ?? null);
                    $rows[] = [
                        'title' => is_string($row->title ?? null) ? $row->title : '',
                        'meta' => match (true) {
                            $drafts > 0 && $scheduled > 0 => __(':drafts · :scheduled', ['drafts' => self::drafts($drafts), 'scheduled' => self::said(__(':count scheduled', ['count' => $scheduled]), "{$scheduled} scheduled")]),
                            $drafts > 0 => self::drafts($drafts),
                            $scheduled > 0 => __(':count scheduled', ['count' => $scheduled]),
                            default => __('No drafts'),
                        },
                        'badge' => __(':count live', ['count' => $live]),
                        'tone' => $live > 0 ? 'success' : 'neutral',
                        'url' => 'cms/collections/'.(is_string($row->handle ?? null) ? $row->handle : '').'/entries',
                    ];
                }

                return ['rows' => $rows];
            });
    }

    public static function recentEdits(): Widget
    {
        return Widget::list('cms.recent-edits')->title('Recently edited entries')->icon('history')->sort(20)->span(2)
            ->empty('No entries have been edited yet.')
            ->visible(fn (Authorizable $user): bool => Access::entries($user, 'view'))
            ->data(fn (Authorizable $user): array => ['rows' => self::translations($user)
                ->orderByDesc('sunrice_entry_translations.updated_at')->orderByDesc('sunrice_entry_translations.id')
                ->get()->map(fn (EntryTranslation $translation): array => self::entryRow($translation, $translation->updated_at?->toIso8601String()))->all()]);
    }

    /** Drafts sent for review (RequestReview), for those who may publish them: oldest request first. */
    public static function review(): Widget
    {
        return Widget::list('cms.review')->title('Waiting for review')->description('Sent by their authors to be published')->icon('clipboard-list')->sort(15)
            ->empty('Nothing is waiting for review.')
            ->visible(fn (Authorizable $user): bool => Access::entries($user, 'publish'))
            ->data(function (Authorizable $user): array {
                $handles = array_values(array_filter(Handles::collections(), fn (string $handle): bool => Access::entries($user, 'publish', $handle)));
                $waiting = self::translations($user)
                    ->whereIn('sunrice_collections.handle', $handles === [] ? [''] : $handles)
                    ->whereNotNull('sunrice_entry_translations.review_requested_at');
                $count = (clone $waiting)->count(); // One row: the limit leaves the count whole.
                $translations = $waiting
                    ->addSelect('sunrice_entry_translations.review_requested_at', 'sunrice_entry_translations.review_requested_by')
                    ->orderBy('sunrice_entry_translations.review_requested_at')->orderBy('sunrice_entry_translations.id')
                    ->get();
                // The requesters' names, in one query.
                $ids = $translations->pluck('review_requested_by')->filter()->unique()->values()->all();
                $names = $ids === [] ? collect() : app(Panel::class)->getUserModel()::query()->whereKey($ids)->pluck('name', 'id');

                return ['count' => $count, 'rows' => $translations->map(function (EntryTranslation $translation) use ($names): array {
                    $row = self::entryRow($translation, $translation->review_requested_at?->toIso8601String());
                    $name = $names->get($translation->review_requested_by ?? 0);

                    return [...$row, 'meta' => $row['meta'].(is_string($name) ? " · from {$name}" : ''), 'badge' => 'Review', 'tone' => 'warning'];
                })->all()];
            });
    }

    public static function scheduled(): Widget
    {
        return Widget::list('cms.scheduled')->title('Coming up')->description('Scheduled to go live')->icon('calendar')->sort(40)
            ->empty('Nothing is scheduled.')
            ->visible(fn (Authorizable $user): bool => Access::entries($user, 'view'))
            ->data(fn (Authorizable $user): array => ['rows' => self::translations($user)
                ->where('sunrice_entry_translations.status', EntryTranslation::PUBLISHED)
                ->where('sunrice_entry_translations.published_at', '>', now())
                ->orderBy('sunrice_entry_translations.published_at')->orderBy('sunrice_entry_translations.id')
                ->get()->map(fn (EntryTranslation $translation): array => [
                    ...self::entryRow($translation, $translation->published_at?->toIso8601String()),
                    'badge' => null,
                ])->all()]);
    }

    public static function comments(): Widget
    {
        return Widget::list('cms.comments')->title('Comments waiting')->icon('message-square')->sort(30)
            ->permission('cms.comments.view')->link('cms/comments?status=pending', 'Moderate')->empty('No comments are waiting.')
            ->data(function (): array {
                $comments = Comment::query()->where('status', Comment::PENDING)
                    ->select('id', 'entry_id', 'user_id', 'author_name', 'body', 'created_at')
                    ->selectSub(Comment::query()->where('status', Comment::PENDING)->selectRaw('count(*)'), 'waiting')
                    ->selectSub(EntryTranslation::query()->select('draft_title')->whereColumn('entry_id', 'sunrice_comments.entry_id')
                        ->orderByRaw('case when locale = ? then 0 else 1 end', [Locales::default()])->orderBy('id')->limit(1), 'entry_title')
                    ->orderByDesc('id')->limit(5)->get();
                Comment::withAuthors($comments);
                $first = $comments->first();

                return [
                    'count' => $first === null ? 0 : self::int($first->getAttribute('waiting')),
                    'rows' => $comments->map(fn (Comment $comment): array => [
                        'title' => is_string($title = $comment->getAttribute('entry_title')) ? __(':author on :entry', ['author' => $comment->authorName(), 'entry' => $title]) : $comment->authorName(),
                        'meta' => Str::limit(Str::squish($comment->body), 90),
                        'url' => 'cms/comments?status=pending',
                        'at' => $comment->created_at?->toIso8601String(),
                    ])->all(),
                ];
            });
    }

    public static function submissions(): Widget
    {
        return Widget::list('cms.submissions')->title('Latest submissions')->icon('inbox')->sort(50)
            ->link('cms/submissions', 'All submissions')->empty('No submissions yet.')
            ->visible(fn (Authorizable $user): bool => Access::submissions($user, 'view'))
            ->data(function (Authorizable $user): array {
                $forms = array_values(array_filter(Handles::forms(), fn (string $form): bool => Access::submissions($user, 'view', $form)));
                if ($forms === []) {
                    return ['rows' => []];
                }

                return ['rows' => Submission::query()
                    ->join('sunrice_forms', 'sunrice_forms.id', '=', 'sunrice_form_submissions.form_id')
                    ->whereIn('sunrice_forms.handle', $forms)
                    ->select('sunrice_form_submissions.id', 'sunrice_form_submissions.data', 'sunrice_form_submissions.created_at', 'sunrice_forms.handle as form_handle', 'sunrice_forms.title as form_title')
                    ->orderByDesc('sunrice_form_submissions.created_at')->orderByDesc('sunrice_form_submissions.id')
                    ->limit(self::RECENT)->get()
                    ->map(function (Submission $submission): array {
                        // A one-line summary: the first field filled in with text.
                        $summary = null;
                        foreach ($submission->data as $value) {
                            if (is_string($value) && trim($value) !== '') {
                                $summary = Str::limit(Str::squish($value), 90);
                                break;
                            }
                        }
                        $handle = $submission->getAttribute('form_handle');
                        $title = $submission->getAttribute('form_title');

                        return [
                            'title' => $summary ?? __('Submission #:id', ['id' => $submission->id]),
                            'meta' => is_string($title) ? $title : null,
                            'url' => is_string($handle) ? "cms/forms/{$handle}/submissions" : null,
                            'at' => $submission->created_at?->toIso8601String(),
                        ];
                    })->all()];
            });
    }

    /**
     * Translations of entries (not trashed) in collections the user may
     * view, with their collection's title; the latest RECENT of them.
     *
     * @return Builder<EntryTranslation>
     */
    private static function translations(Authorizable $user): Builder
    {
        $handles = self::collectionsFor($user);

        return EntryTranslation::query()
            ->join('sunrice_collections', 'sunrice_collections.id', '=', 'sunrice_entry_translations.collection_id')
            ->whereNull('sunrice_collections.deleted_at')
            ->whereIn('sunrice_collections.handle', $handles === [] ? [''] : $handles)
            ->whereIn('sunrice_entry_translations.entry_id', fn (QueryBuilder $entries) => $entries->select('id')->from('sunrice_entries')->whereNull('deleted_at'))
            ->select('sunrice_entry_translations.id', 'sunrice_entry_translations.entry_id', 'sunrice_entry_translations.locale', 'sunrice_entry_translations.status',
                'sunrice_entry_translations.draft_title', 'sunrice_entry_translations.published_at', 'sunrice_entry_translations.updated_at',
                'sunrice_collections.title as collection_title', 'sunrice_collections.handle as collection_handle')
            ->limit(self::RECENT);
    }

    /** @return array{title: string, meta: string, url: string, badge: string|null, tone: string, at: string|null} */
    private static function entryRow(EntryTranslation $translation, ?string $at): array
    {
        $status = $translation->status();
        $collection = $translation->getAttribute('collection_title');
        $handle = $translation->getAttribute('collection_handle');
        $main = $translation->locale === Locales::default();

        return [
            'title' => $translation->draft_title !== '' ? $translation->draft_title : "#{$translation->entry_id}",
            'meta' => (is_string($collection) ? $collection : '').(count(Locales::all()) > 1 ? ' · '.Str::upper($translation->locale) : ''),
            'url' => 'cms/collections/'.(is_string($handle) ? $handle : '').'/entries/'.$translation->entry_id.'/edit'.($main ? '' : '?locale='.urlencode($translation->locale)),
            'badge' => match ($status) {
                'published' => __('Live'),
                'scheduled' => __('Scheduled'),
                default => __('Draft'),
            },
            'tone' => match ($status) {
                'published' => 'success',
                'scheduled' => 'warning',
                default => 'neutral',
            },
            'at' => $at,
        ];
    }

    /** @return list<string> the handles of the collections whose entries the user may view (no query: Handles is cached) */
    private static function collectionsFor(Authorizable $user): array
    {
        return array_values(array_filter(Handles::collections(), fn (string $handle): bool => Access::entries($user, 'view', $handle)));
    }

    /** "1 draft", "3 drafts" */
    private static function drafts(int $count): string
    {
        return $count === 1 ? self::said(__('1 draft'), '1 draft') : self::said(__(':count drafts', ['count' => $count]), "{$count} drafts");
    }

    /** What __() said, or the English when it gave something else. */
    private static function said(mixed $said, string $english): string
    {
        return is_string($said) ? $said : $english;
    }

    private static function int(mixed $value): int
    {
        return is_numeric($value) ? (int) $value : 0;
    }
}
