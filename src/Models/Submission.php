<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Sunrice\Cms\Actions\Forms\SubmitForm;

/**
 * What a visitor sent with a form, by field handle. Deleting it deletes
 * the files sent; old ones are pruned (`sunrice-cms.forms.prune_after_days`).
 *
 * @property int $id
 * @property int $form_id
 * @property string $locale
 * @property array<string, mixed> $data
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Form $form
 *
 * @api
 */
class Submission extends Model
{
    use Prunable;

    protected $table = 'sunrice_form_submissions';

    protected $guarded = [];

    protected function casts(): array
    {
        return ['data' => 'array'];
    }

    protected static function booted(): void
    {
        // Its files go with it.
        static::deleted(fn (self $submission) => $submission->deleteFiles());
    }

    /**
     * Older than `sunrice-cms.forms.prune_after_days` (none when it's not
     * set): deleted with their files by the daily model:prune.
     *
     * @return Builder<static>
     */
    public function prunable(): Builder
    {
        $days = config('sunrice-cms.forms.prune_after_days');

        return is_numeric($days) && (int) $days > 0
            ? static::query()->where('created_at', '<', now()->subDays((int) $days))
            : static::query()->whereRaw('1 = 0');
    }

    /** Deletes the files sent with it. */
    public function deleteFiles(): void
    {
        $paths = [];
        foreach ($this->data as $value) {
            if (is_array($value) && is_string($value['path'] ?? null) && str_starts_with($value['path'], 'form-uploads/')) {
                $paths[] = $value['path'];
            }
        }
        if ($paths !== []) {
            Storage::disk(SubmitForm::disk())->delete($paths);
        }
    }

    /** @return BelongsTo<Form, $this> */
    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }
}
