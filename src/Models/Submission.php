<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * What a visitor sent with a form, by field handle.
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
    protected $table = 'sunrice_form_submissions';

    protected $guarded = [];

    protected function casts(): array
    {
        return ['data' => 'array'];
    }

    /** @return BelongsTo<Form, $this> */
    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }
}
