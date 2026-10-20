<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Sunrice\Cms\Fields\Types\TermsField;
use Sunrice\Cms\Models\Entry;

/**
 * Keeps the entry's row in sunrice_entry_term in step with the terms
 * fields of its published main translation (terms are shared by all
 * languages). PublishEntry runs it; top-level terms fields count.
 *
 * @internal
 */
final class SyncEntryTerms
{
    public function handle(Entry $entry): void
    {
        $entry->unsetRelation('translations');
        $main = $entry->mainTranslation();
        if ($main === null || ! $main->isPublished()) {
            return;
        }
        $data = $main->data ?? [];
        $ids = [];
        foreach ($entry->schema()->fields() as $field) {
            if ($field->type === TermsField::TYPE) {
                $value = $data[$field->handle] ?? null;
                array_push($ids, ...array_filter(is_array($value) ? $value : [$value], is_int(...)));
            }
        }
        $entry->terms()->sync(array_values(array_unique($ids)));
    }
}
