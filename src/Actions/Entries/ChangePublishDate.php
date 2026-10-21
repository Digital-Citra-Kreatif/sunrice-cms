<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use DateTimeInterface;
use Illuminate\Support\Carbon;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Events\EntryPublished;
use Sunrice\Cms\Events\EntryUnpublished;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * Moves a published entry translation's date, leaving its draft alone: a
 * past date keeps it live with that date (or puts it live now, when it
 * was scheduled), a date to come schedules it.
 *
 * @api
 */
final class ChangePublishDate
{
    public function __construct(private readonly ActivityLog $activity) {}

    /** @throws ValidationException */
    public function handle(EntryTranslation $translation, DateTimeInterface $date): EntryTranslation
    {
        if (! $translation->isPublished()) {
            throw ValidationException::withMessages(['published_at' => __('Only a published entry has a date to change: publish it on a date instead.')]);
        }
        $wasLive = $translation->isLive();
        $translation->published_at = Carbon::instance($date);
        if (! $translation->isDirty('published_at')) {
            return $translation;
        }
        $translation->save();
        $this->activity->updated('entry', $translation->entry, $translation->title ?? $translation->draft_title, ['published date']);
        if (! $wasLive && $translation->isLive()) {
            EntryPublished::dispatch($translation);
        } elseif ($wasLive && ! $translation->isLive()) {
            EntryUnpublished::dispatch($translation);
        }

        return $translation;
    }
}
