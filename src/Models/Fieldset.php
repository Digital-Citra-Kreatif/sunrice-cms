<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Fields\Schema;

/**
 * Fields used in several places: included in blueprints (a "fieldset"
 * field) and the kinds of block of flexible fields. Saved with
 * SaveFieldset.
 *
 * @property int $id
 * @property string $handle
 * @property string $title
 * @property list<array<string, mixed>> $fields
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @api
 */
class Fieldset extends Model
{
    protected $table = 'sunrice_fieldsets';

    protected $guarded = [];

    protected $attributes = ['fields' => '[]'];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['fields' => 'array'];
    }

    /** @return list<Field> */
    public function fields(): array
    {
        return Field::listFromArray($this->fields);
    }

    public function schema(): Schema
    {
        return Schema::make($this->fields());
    }

    /**
     * The fieldsets as select options.
     *
     * @return list<array{value: string, label: string}>
     */
    public static function options(): array
    {
        return array_values(array_map(
            fn (Fieldset $fieldset): array => ['value' => $fieldset->handle, 'label' => $fieldset->title],
            app(Fieldsets::class)->all(),
        ));
    }
}
