<?php

declare(strict_types=1);

namespace Sunrice\Cms\Fields\Types;

use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Exists;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\FieldType;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Reference;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;

/**
 * Terms of a taxonomy (config: taxonomy, multiple, max). Stores term ids;
 * templates get Term models. Published entries' terms are kept in a
 * table too (SyncEntryTerms), for "entries with this term" queries.
 */
final class TermsField extends FieldType
{
    public const TYPE = 'terms';

    public function type(): string
    {
        return self::TYPE;
    }

    public function label(): string
    {
        return 'Terms';
    }

    public function rules(Field $field): array
    {
        if (! $field->configBool('multiple')) {
            return ['integer', $this->exists($field)];
        }
        $max = $field->configInt('max');

        return ['array', ...($max === null ? [] : ["max:{$max}"])];
    }

    public function nestedRules(Field $field, string $key, mixed $value): array
    {
        return $field->configBool('multiple') ? ["{$key}.*" => ['integer', 'distinct', $this->exists($field)]] : [];
    }

    public function defaultValue(Field $field): mixed
    {
        return $field->configBool('multiple') ? [] : null;
    }

    public function normalize(mixed $value, Field $field): mixed
    {
        if (! $field->configBool('multiple')) {
            return is_numeric($value) ? (int) $value : null;
        }

        return is_array($value) ? array_values(array_unique(array_map(intval(...), array_filter($value, 'is_numeric')))) : [];
    }

    public function hydrate(mixed $value, Field $field, HydrationContext $context): mixed
    {
        if (! $field->configBool('multiple')) {
            return is_int($value) ? $context->terms([$value])->first() : null;
        }

        return $context->terms(is_array($value) ? array_values(array_filter($value, 'is_int')) : []);
    }

    public function references(mixed $value, Field $field): array
    {
        return Reference::many(Reference::TERM, is_array($value) ? $value : [$value]);
    }

    public function settings(): array
    {
        return [
            new Field('taxonomy', 'select', 'Taxonomy', required: true, config: [
                'options' => Taxonomy::query()->orderBy('title')->get()->map(fn (Taxonomy $t): array => ['value' => $t->handle, 'label' => $t->title])->all(),
            ]),
            new Field('multiple', 'toggle', 'Several terms'),
            new Field('max', 'number', 'At most', instructions: 'With several terms.', config: ['min' => 1, 'step' => 1]),
        ];
    }

    /** The editor gets the taxonomy's terms to choose from, nested ones indented. */
    public function toAdmin(Field $field, Schema $schema): array
    {
        $taxonomy = $this->taxonomy($field);
        $options = [];
        if ($taxonomy !== null) {
            $terms = Term::query()->with('translations')->where('taxonomy_id', $taxonomy->id)->orderBy('sort_order')->orderBy('id')->get();
            foreach (self::tree(array_values($terms->all()), null, 0) as [$term, $depth]) {
                $options[] = ['value' => (string) $term->id, 'label' => str_repeat('— ', $depth).$term->title()];
            }
        }

        return ['terms' => $options] + parent::toAdmin($field, $schema);
    }

    /**
     * Terms in tree order, with their depth.
     *
     * @param  list<Term>  $terms
     * @return list<array{0: Term, 1: int}>
     */
    public static function tree(array $terms, ?int $parent, int $depth): array
    {
        $ordered = [];
        foreach ($terms as $term) {
            if ($term->parent_id === $parent) {
                $ordered[] = [$term, $depth];
                if ($depth < 20) {
                    array_push($ordered, ...self::tree($terms, $term->id, $depth + 1));
                }
            }
        }

        return $ordered;
    }

    private function taxonomy(Field $field): ?Taxonomy
    {
        $handle = $field->configString('taxonomy');

        return $handle === null ? null : Taxonomy::query()->where('handle', $handle)->first();
    }

    private function exists(Field $field): Exists
    {
        return Rule::exists((new Term)->getTable(), 'id')->where('taxonomy_id', $this->taxonomy($field)->id ?? 0);
    }
}
