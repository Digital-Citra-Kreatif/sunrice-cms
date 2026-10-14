<?php

declare(strict_types=1);

namespace Sunrice\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Sunrice\Database\Factories\TermTranslationFactory;
use Sunrice\Models\Scopes\HiddenWithParent;

/**
 * @property int $id
 * @property int $term_id
 * @property int $taxonomy_id
 * @property string $locale
 * @property string $name
 * @property string $slug
 * @property array<string,mixed> $data
 * @property array<string,mixed>|null $seo
 * @property bool $is_ready
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @use HasFactory<TermTranslationFactory>
 */
class TermTranslation extends Model
{
    /** @use HasFactory<TermTranslationFactory> */
    use HasFactory;

    protected $table = 'sunrice_term_translations';

    protected $guarded = [];

    protected $attributes = ['data' => '{}'];

    protected $casts = ['data' => 'array', 'seo' => 'array', 'is_ready' => 'boolean'];

    protected static function newFactory(): TermTranslationFactory
    {
        return TermTranslationFactory::new();
    }

    protected static function booted(): void
    {
        // Hidden while its taxonomy is deleted (see HiddenWithParent).
        static::addGlobalScope(new HiddenWithParent('taxonomy_id', 'sunrice_taxonomies'));
    }

    /** @return BelongsTo<Term, $this> */
    public function term(): BelongsTo
    {
        return $this->belongsTo(Term::class);
    }
}
