<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Actions\Permissions\SyncPermissions;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Mail\ReviewRequested;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Access;
use Throwable;

/**
 * "Submit for review": someone who may edit an entry but not publish it
 * asks for it to be published. The translation keeps when and by whom
 * (shown in the editor and on the dashboard's "Waiting for review"), the
 * people who may publish in its collection get an email, and publishing
 * it clears the request (PublishEntry).
 *
 * @api
 */
final class RequestReview
{
    public function __construct(private readonly ActivityLog $activity) {}

    public function handle(EntryTranslation $translation, ?Authorizable $user = null): EntryTranslation
    {
        $entry = $translation->entry;
        if ($entry->trashed()) {
            throw ValidationException::withMessages(['entry' => __('This entry is in the trash; restore it first.')]);
        }
        if (! $translation->hasUnpublishedChanges() && $translation->isPublished()) {
            throw ValidationException::withMessages(['entry' => __('Nothing to review: the site already shows this version.')]);
        }
        $id = $user instanceof Model ? $user->getKey() : null;
        $translation->forceFill(['review_requested_at' => now(), 'review_requested_by' => is_int($id) ? $id : null])->save();
        $this->activity->record('review requested', 'entry', $entry, $translation->draft_title, ['locale' => $translation->locale]);

        foreach ($this->reviewers($translation, $user) as $address) {
            Mail::to($address)->queue(new ReviewRequested($translation, $user instanceof Model ? $user : null));
        }

        return $translation;
    }

    /**
     * The email addresses of the people who may publish in the entry's
     * collection (everywhere, or that collection), but not the requester.
     *
     * @return list<string>
     */
    private function reviewers(EntryTranslation $translation, ?Authorizable $requester): array
    {
        $collection = $translation->entry->collection;
        $addresses = [];
        // Users with the permission, directly or through a role (spatie/laravel-permission's scopes), and
        // super admins, who may do everything without being given it (often a small site's only publisher).
        $finders = [
            fn (): mixed => app(Panel::class)->getUserModel()::query()->__call('permission', ['cms.entries.publish']),
            fn (): mixed => app(Panel::class)->getUserModel()::query()->__call('permission', ["cms.entries.{$collection->handle}.publish"]),
            fn (): mixed => app(Panel::class)->getUserModel()::query()->__call('role', [SyncPermissions::superAdminRole()]),
        ];
        foreach ($finders as $find) {
            try {
                $users = $find();
            } catch (Throwable) {
                continue; // Nobody has this permission (or role) yet.
            }
            foreach ($users instanceof Builder ? $users->get() : [] as $user) {
                $address = $user->getAttribute('email');
                if (is_string($address) && ! ($requester instanceof Model && $user->is($requester))
                    && $user instanceof Authorizable && Access::entries($user, 'publish', $collection)) {
                    $addresses[] = $address;
                }
            }
        }

        return array_values(array_unique($addresses));
    }
}
