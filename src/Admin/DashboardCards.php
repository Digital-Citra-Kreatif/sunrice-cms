<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Sunrice\Admin\Dashboard\DashboardCard;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Models\Comment;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\Submission;
use Sunrice\Cms\Support\Access;

/**
 * The CMS's dashboard cards: entries per collection, recent edits, new
 * submissions and comments waiting, each as far as the user may see.
 *
 * @internal
 */
final class DashboardCards
{
    /** @return list<DashboardCard> */
    public static function all(): array
    {
        return [
            DashboardCard::make('cms.collections')->title('Content')->sort(10)->span(2)
                ->visible(fn (Authorizable $user): bool => Access::entries($user, 'view'))
                ->stats(function (Authorizable $user): array {
                    $collections = Access::collections($user);
                    $counts = Entry::query()->whereIn('collection_id', $collections->modelKeys())
                        ->selectRaw('collection_id, count(*) as aggregate')->groupBy('collection_id')->pluck('aggregate', 'collection_id');

                    return $collections->map(fn ($collection): array => [
                        'label' => $collection->title,
                        'value' => is_numeric($counts[$collection->id] ?? null) ? (int) $counts[$collection->id] : 0,
                        'url' => self::url("cms/collections/{$collection->handle}/entries"),
                    ])->values()->all();
                })
                ->empty('No collections yet.'),
            DashboardCard::make('cms.recent')->title('Recent edits')->sort(20)
                ->visible(fn (Authorizable $user): bool => Access::entries($user, 'view'))
                ->list(fn (Authorizable $user): array => EntryTranslation::query()
                    ->whereIn('collection_id', Access::collections($user)->modelKeys())
                    ->whereHas('entry')->with('entry.collection')->latest('updated_at')->limit(8)->get()
                    ->map(fn (EntryTranslation $translation): array => [
                        'title' => $translation->draft_title,
                        'meta' => $translation->entry->collection->title.' · '.$translation->updated_at?->diffForHumans(),
                        'url' => self::url("cms/entries/{$translation->entry_id}/edit").($translation->isMain() ? '' : "?locale={$translation->locale}"),
                    ])->all())
                ->empty('No entries yet.')->link('All entries', 'cms/entries'),
            DashboardCard::make('cms.submissions')->title('New submissions')->sort(30)
                ->visible(fn (Authorizable $user): bool => Access::submissions($user, 'view'))
                ->list(function (Authorizable $user): array {
                    $forms = Form::query()->get()->filter(fn (Form $form): bool => Access::submissions($user, 'view', $form))->keyBy('id');

                    return Submission::query()->whereIn('form_id', $forms->keys()->all())->latest('id')->limit(8)->get()
                        ->map(fn (Submission $submission): array => [
                            'title' => $forms[$submission->form_id]->title ?? '',
                            'meta' => $submission->created_at?->diffForHumans(),
                            'url' => self::url('cms/forms/'.($forms[$submission->form_id]->handle ?? '').'/submissions'),
                        ])->all();
                })
                ->empty('Nothing has been sent yet.')->link('All submissions', 'cms/submissions'),
            DashboardCard::make('cms.comments')->title('Comments')->sort(40)->permission('cms.comments.view')
                ->stats(fn (): array => [
                    ['label' => 'Waiting for approval', 'value' => Comment::query()->where('status', Comment::PENDING)->count(), 'url' => self::url('cms/comments?status=pending')],
                    ['label' => 'Approved this week', 'value' => Comment::query()->where('status', Comment::APPROVED)->where('created_at', '>=', now()->subWeek())->count(), 'url' => self::url('cms/comments')],
                ]),
        ];
    }

    private static function url(string $path): string
    {
        return '/'.trim(app(Panel::class)->getPath(), '/').'/'.$path;
    }
}
