<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Support\Access;

/**
 * One action on many entries of a collection, in their main language:
 * publish, unpublish, trash, restore or delete (for good, from the
 * trash). Entries the user may not act on, or that don't fit the action
 * (publishing a trashed one), are skipped.
 *
 * @api
 */
final class BulkEntries
{
    public const ACTIONS = ['publish', 'unpublish', 'trash', 'restore', 'delete'];

    /** At most this many entries at once. */
    public const MAX = 200;

    public function __construct(
        private readonly PublishEntry $publish,
        private readonly UnpublishEntry $unpublish,
        private readonly TrashEntry $trash,
        private readonly RestoreEntry $restore,
        private readonly ForceDeleteEntry $forceDelete,
    ) {}

    /**
     * @param  list<int>  $ids
     * @return int how many entries it was done to
     *
     * @throws ValidationException
     */
    public function handle(Collection $collection, string $action, array $ids, ?Authorizable $user): int
    {
        if (! in_array($action, self::ACTIONS, true)) {
            throw ValidationException::withMessages(['action' => 'Choose one of: '.implode(', ', self::ACTIONS).'.']);
        }
        if (count($ids) > self::MAX) {
            throw ValidationException::withMessages(['ids' => 'Choose at most '.self::MAX.' entries at once.']);
        }
        $ability = in_array($action, ['publish', 'unpublish'], true) ? 'publish' : 'delete';
        if ($user === null) {
            return 0;
        }

        $done = 0;
        $entries = Entry::query()->withTrashed()->where('collection_id', $collection->id)->whereKey($ids)->with('translations')->get();
        foreach ($entries as $entry) {
            // For the collection, or (trashing) their own entries.
            if (! Access::entries($user, $ability, $collection, $entry)) {
                continue;
            }
            $main = $entry->mainTranslation();
            $did = match ($action) {
                'publish' => ! $entry->trashed() && $main !== null && $this->ran(fn () => $this->publish->handle($main)),
                'unpublish' => ! $entry->trashed() && $main !== null && $main->isPublished() && $this->ran(fn () => $this->unpublish->handle($main)),
                'trash' => ! $entry->trashed() && $this->ran(fn () => $this->trash->handle($entry)),
                'restore' => $entry->trashed() && $this->ran(fn () => $this->restore->handle($entry)),
                'delete' => $entry->trashed() && $this->ran(fn () => $this->forceDelete->handle($entry)),
            };
            $done += $did ? 1 : 0;
        }

        return $done;
    }

    /** Runs one; an entry that can't be published as it is (a required field empty) is skipped. */
    private function ran(\Closure $do): bool
    {
        try {
            $do();

            return true;
        } catch (ValidationException) {
            return false;
        }
    }
}
