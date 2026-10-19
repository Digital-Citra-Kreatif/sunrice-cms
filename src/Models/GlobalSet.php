<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Support\Locales;

/**
 * Site-wide values (contact details, social links, footer text), filled in
 * with a blueprint's fields in each language. Saved with SaveGlobals;
 * templates read them with Globals.
 *
 * @property int $id
 * @property string $handle
 * @property string $title
 * @property string|null $blueprint
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, GlobalValue> $values
 *
 * @api
 */
class GlobalSet extends Model
{
    protected $table = 'sunrice_global_sets';

    protected $guarded = [];

    private ?Schema $schema = null;

    /** @return HasMany<GlobalValue, $this> */
    public function values(): HasMany
    {
        return $this->hasMany(GlobalValue::class);
    }

    public function schema(): Schema
    {
        return $this->schema ??= ($this->blueprint === null ? null : Blueprint::query()->where('handle', $this->blueprint)->first()?->schema()) ?? Schema::make([]);
    }

    /** The fields editable in a language: all in the main one, the translated ones in the others. */
    public function editableSchema(string $locale): Schema
    {
        $schema = $this->schema();

        return $locale === Locales::default() ? $schema : $schema->except($schema->shared());
    }

    /**
     * The stored values in a language, with the shared fields from the main
     * language and defaults for what was never saved.
     *
     * @return array<string, mixed>
     */
    public function data(string $locale): array
    {
        $schema = $this->schema();
        $stored = fn (string $code): array => $this->values->firstWhere('locale', $code)->data ?? [];
        $data = array_replace($schema->defaults(), $stored($locale));
        if ($locale !== Locales::default()) {
            $data = array_replace($data, array_intersect_key(array_replace($schema->defaults(), $stored(Locales::default())), array_flip($schema->shared())));
        }

        return $data;
    }

    /**
     * The values as templates get them, in a language.
     *
     * @return array<mixed>
     */
    public function hydrated(?HydrationContext $context = null): array
    {
        $context ??= new HydrationContext(Locales::default());

        return $this->schema()->hydrate($this->data($context->locale), $context);
    }
}
