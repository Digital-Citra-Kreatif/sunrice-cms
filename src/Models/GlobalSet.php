<?php

declare(strict_types=1);

namespace Sunrice\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Sunrice\Database\Factories\GlobalSetFactory;
use Sunrice\Fields\TranslationOverlay;
use Sunrice\Support\Locales;

/**
 * Named, blueprint-driven group of site-wide content ("global" is a
 * reserved word in PHP). Template parts are globals with group
 * 'template_part'.
 *
 * @property int $id
 * @property string $handle
 * @property string $title
 * @property int|null $blueprint_id
 * @property string $group
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @use HasFactory<GlobalSetFactory>
 */
class GlobalSet extends Model
{
    /** @use HasFactory<GlobalSetFactory> */
    use HasFactory, \Sunrice\References\HasReferences;

    protected $table = 'sunrice_globals';

    protected $guarded = [];

    protected static function newFactory(): GlobalSetFactory
    {
        return GlobalSetFactory::new();
    }

    /** @return BelongsTo<Blueprint, $this> */
    public function blueprint(): BelongsTo
    {
        return $this->belongsTo(Blueprint::class);
    }

    /** @return HasMany<GlobalValue, $this> */
    public function values(): HasMany
    {
        return $this->hasMany(GlobalValue::class, 'global_id');
    }

    /** The stored row of a language (the main language when null). */
    public function valueFor(?string $locale): ?GlobalValue
    {
        $locale ??= Locales::main();

        return $this->values->firstWhere('locale', $locale)
            ?? $this->values()->where('locale', $locale)->first();
    }

    /**
     * Persist the values edited in a language and return its row. Like
     * entries, the main language stores every value; another language
     * stores only its translatable values that differ from the main ones.
     *
     * @param  array<string, mixed>  $data
     */
    public function setValuesFor(?string $locale, array $data): GlobalValue
    {
        $locale ??= Locales::main();
        $fields = $this->blueprint?->schema()->fields();
        if (! Locales::isMain($locale) && $fields !== null) {
            $data = TranslationOverlay::extract($fields, $data, (array) ($this->valueFor(Locales::main())->data ?? []));
        }

        $row = $this->values()->firstOrNew(['locale' => $locale]);
        $row->data = $data;
        $row->save();
        $this->unsetRelation('values');

        return $row;
    }

    /**
     * Values in a language: the main language's, with this language's
     * translatable ones laid over.
     *
     * @return array<string, mixed>
     */
    public function valuesFor(?string $locale = null): array
    {
        $locale ??= Locales::main();
        $main = (array) ($this->valueFor(Locales::main())->data ?? []);
        if (Locales::isMain($locale)) {
            return $main;
        }

        $overlay = (array) ($this->valueFor($locale)->data ?? []);
        $fields = $this->blueprint?->schema()->fields();

        return $fields === null ? ($overlay ?: $main) : TranslationOverlay::merge($fields, $main, $overlay);
    }
}
