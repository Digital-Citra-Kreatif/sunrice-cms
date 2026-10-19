<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * A published version of an entry translation, kept when it was
 * published. RestoreRevision loads one back into the draft.
 *
 * @property int $id
 * @property int $entry_translation_id
 * @property int|null $user_id who published it
 * @property string $title
 * @property string $slug
 * @property array<string, mixed> $data
 * @property Carbon|null $created_at
 * @property-read EntryTranslation $translation
 *
 * @api
 */
class Revision extends Model
{
    public const UPDATED_AT = null;

    protected $table = 'sunrice_revisions';

    protected $guarded = [];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['data' => 'array'];
    }

    /** @return BelongsTo<EntryTranslation, $this> */
    public function translation(): BelongsTo
    {
        return $this->belongsTo(EntryTranslation::class, 'entry_translation_id');
    }
}
