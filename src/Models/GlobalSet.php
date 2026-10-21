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
use Sunrice\Cms\Support\SiteRecords;

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
        return $this->schema ??= SiteRecords::blueprint($this->blueprint)?->schema() ?? Schema::make([]);
    }

    /** The fields editable in a language: all in the main one, the translated ones in the others. */
    public function editableSchema(string $locale): Schema
    {
        $schema = $this->schema();

        return $locale === Locales::default() ? $schema : $schema->except($schema->shared());
    }

    /**
     * The stored values in a language, with the shared fields from the main
     * language and defaults for what was never saved. In another language,
     * a translated field it has no value for (never saved, or left empty)
     * shows the main language's, as untranslated pages do; so the editor
     * starts from them too.
     *
     * @return array<string, mixed>
     */
    public function data(string $locale): array
    {
        $schema = $this->schema();
        $stored = fn (string $code): array => $this->values->firstWhere('locale', $code)->data ?? [];
        $data = array_replace($schema->defaults(), $stored($locale));
        if ($locale !== Locales::default()) {
            $main = array_replace($schema->defaults(), $stored(Locales::default()));
            $data = array_replace($data, array_intersect_key($main, array_flip($schema->shared())));
            foreach ($data as $handle => $value) {
                if (($value === null || $value === '' || $value === []) && isset($main[$handle])) {
                    $data[$handle] = $main[$handle];
                }
            }
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
