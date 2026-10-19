<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\Schema;

/**
 * The fields of a kind of content: what editors fill in for an entry of a
 * collection, a term, a global set or a form. Saved with SaveBlueprint.
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
class Blueprint extends Model
{
    /** Handles content keeps outside its fields, which no field may use. */
    public const RESERVED = ['id', 'title', 'slug', 'url', 'status', 'locale', 'published_at', 'created_at', 'updated_at', 'parent', 'children', 'collection', 'blueprint', 'data', 'seo', 'author'];

    protected $table = 'sunrice_blueprints';

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

    /** The fields with fieldsets included. */
    public function schema(): Schema
    {
        return Schema::make($this->fields());
    }
}
