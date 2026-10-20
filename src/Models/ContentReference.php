<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * One place where content points at an entry or a term: an entry's, a
 * term's or a global set's values in a language (the source) hold the
 * target's id in a field. Kept by every save; read with
 * Entry::referencedBy() and Term::referencedBy().
 *
 * @property int $id
 * @property string $source_type self::ENTRY, self::TERM or self::GLOBAL
 * @property int $source_id the entry's, term's or global set's id
 * @property string $locale the source's language
 * @property string $target_type Fields\Reference::ENTRY or Fields\Reference::TERM
 * @property int $target_id
 * @property string $field where in the source's values ("related", "sections.2.links")
 *
 * @api
 */
class ContentReference extends Model
{
    public const ENTRY = 'entry';

    public const TERM = 'term';

    public const GLOBAL = 'global';

    protected $table = 'sunrice_references';

    public $timestamps = false;

    protected $guarded = [];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['source_id' => 'integer', 'target_id' => 'integer'];
    }
}
