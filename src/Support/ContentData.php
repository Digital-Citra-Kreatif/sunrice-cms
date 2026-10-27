<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use DateTimeInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Support\Collection;
use Stringable;
use Sunrice\Admin\Media\Media;
use Sunrice\Cms\Fields\Block;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Fields\Types\Flexible;
use Sunrice\Cms\Fields\Types\Group;
use Sunrice\Cms\Fields\Types\Repeater;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;

/**
 * Plain arrays of what the site shows, for scripts on its pages and small
 * JSON routes of the app's (EntryTranslation::toData(), Term::toData(),
 * Media::toData(), Cms::toData()). Fields come from values(), so they're
 * what templates get: the live version (a preview's draft), in the page's
 * language with the main language's standing in. Only the fields a
 * blueprint defines, converted by kind; never stored data as it is.
 *
 * @phpstan-import-type EntryData from EntryTranslation
 * @phpstan-import-type TermData from Term
 * @phpstan-import-type MediaData from Media
 *
 * @internal
 */
final class ContentData
{
    /**
     * @param  list<string>  $fields  the handles of the fields to add (none: no fields)
     * @return EntryData
     */
    public static function entry(EntryTranslation $translation, HydrationContext $context, array $fields = [], bool $withFields = true): array
    {
        // values() first: it loads what all the entries sharing the context point at (linked ones too), so their terms are read together below.
        $values = $withFields && $fields !== [] ? $translation->values($context) : null;
        $entry = $translation->entry;
        $terms = [];
        foreach ($translation->termsOf() as $term) {
            $terms[$term->taxonomy->handle][] = self::contextTerm($term, $context);
        }
        $data = [
            'id' => $translation->entry_id,
            'locale' => $translation->locale,
            'title' => $context->preview ? $translation->draft_title : $translation->title,
            'slug' => $context->preview ? $translation->draft_slug : $translation->slug,
            'url' => $translation->url(),
            'collection' => $entry->collection->handle,
            'published_at' => $translation->published_at?->format(DateTimeInterface::ATOM),
            'parent_id' => $entry->parent_id,
            'terms' => $terms,
        ];
        if ($values !== null) {
            $data['fields'] = self::fields($entry->schema(), $values, $context, $fields);
        }

        return $data;
    }

    /** @return TermData */
    public static function term(Term $term, ?string $locale = null): array
    {
        $locale ??= Locales::current();
        $translation = $term->translation($locale);

        return [
            'id' => $term->id,
            'taxonomy' => $term->taxonomy->handle,
            'locale' => $translation?->locale,
            // As $term->title($locale), without looking for the translation again.
            'title' => $translation->title ?? '',
            'slug' => $translation?->slug,
            'url' => $term->url($locale),
            'parent_id' => $term->parent_id,
        ];
    }

    /**
     * A term of an entry's (its own, or a field's value) as data, made once
     * per context: the entries of a list share most of their terms.
     *
     * @return TermData
     */
    private static function contextTerm(Term $term, HydrationContext $context): array
    {
        return $context->data($term, 'term|'.$context->locale, fn (): array => self::term($term, $context->locale));
    }

    /** @return TermData */
    public static function termTranslation(TermTranslation $translation): array
    {
        $term = $translation->term;

        return [
            'id' => $term->id,
            'taxonomy' => $term->taxonomy->handle,
            'locale' => $translation->locale,
            'title' => $translation->title,
            'slug' => $translation->slug,
            'url' => $translation->url(),
            'parent_id' => $term->parent_id,
        ];
    }

    /**
     * A page of records as data, with where it is.
     *
     * @param  LengthAwarePaginator<array-key, mixed>  $page
     * @param  list<string>  $fields
     * @return array{data: list<EntryData|TermData|MediaData>, meta: array{current_page: int, last_page: int, per_page: int, total: int, next_url: string|null, prev_url: string|null}}
     */
    public static function page(LengthAwarePaginator $page, array $fields = []): array
    {
        return [
            'data' => self::list($page->items(), $fields),
            'meta' => [
                'current_page' => $page->currentPage(),
                'last_page' => $page->lastPage(),
                'per_page' => $page->perPage(),
                'total' => $page->total(),
                'next_url' => $page->nextPageUrl(),
                'prev_url' => $page->previousPageUrl(),
            ],
        ];
    }

    /**
     * Records as data, in order: entries (with these fields), terms, term
     * translations and media; anything else is left out.
     *
     * @param  iterable<mixed>  $items
     * @param  list<string>  $fields
     * @return list<EntryData|TermData|MediaData>
     */
    public static function list(iterable $items, array $fields = []): array
    {
        $list = [];
        foreach ($items as $item) {
            $data = match (true) {
                $item instanceof EntryTranslation => $item->toData($fields),
                $item instanceof Term => $item->toData(),
                $item instanceof TermTranslation => $item->toData(),
                $item instanceof Media => $item->toData(),
                default => null,
            };
            if ($data !== null) {
                $list[] = $data;
            }
        }

        return $list;
    }

    /**
     * The fields asked for that the schema has, in the order asked.
     *
     * @param  array<mixed>  $values  as values() gives them
     * @param  list<string>|null  $handles  null: all of the schema's
     * @return array<string, mixed>
     */
    private static function fields(Schema $schema, array $values, HydrationContext $context, ?array $handles = null): array
    {
        $byHandle = [];
        foreach ($schema->fields() as $field) {
            $byHandle[$field->handle] = $field;
        }
        $data = [];
        foreach ($handles ?? array_keys($byHandle) as $handle) {
            $field = $byHandle[$handle] ?? null;
            if ($field !== null && ! array_key_exists($handle, $data)) {
                $data[$handle] = self::field($schema, $field, $values[$handle] ?? null, $context);
            }
        }

        return $data;
    }

    private static function field(Schema $schema, Field $field, mixed $value, HydrationContext $context): mixed
    {
        $type = $schema->type($field);
        if ($type instanceof Group) {
            return is_array($value) ? self::fields(Schema::children($field, $schema->depth()), $value, $context) : null;
        }
        if ($type instanceof Repeater) {
            $children = Schema::children($field, $schema->depth());
            $rows = [];
            foreach (is_iterable($value) ? $value : [] as $row) {
                if (is_array($row)) {
                    $rows[] = self::fields($children, $row, $context);
                }
            }

            return $rows;
        }
        if ($type instanceof Flexible) {
            $blocks = [];
            foreach (is_iterable($value) ? $value : [] as $block) {
                if ($block instanceof Block) {
                    $fields = app(Fieldsets::class)->fields($block->type);
                    $blocks[] = [
                        'type' => $block->type,
                        'key' => $block->key,
                        // A block whose fieldset is gone has no fields to show.
                        'values' => $fields === null ? [] : self::fields(Schema::make($fields, $schema->depth() + 1), $block->values, $context),
                    ];
                }
            }

            return $blocks;
        }

        return self::value($value, $context);
    }

    /** A value as values() gives it, as plain data: records as their data, dates as ISO 8601, anything else not plain left out. */
    private static function value(mixed $value, HydrationContext $context): mixed
    {
        return match (true) {
            $value === null, is_scalar($value) => $value,
            $value instanceof DateTimeInterface => $value->format(DateTimeInterface::ATOM),
            $value instanceof Media => $value->toData($context->locale),
            // Linked entries: without their fields, so links never go round in circles.
            // Made once per context: entries of a list often link to the same ones.
            $value instanceof EntryTranslation => $context->data($value, 'entry', fn (): array => self::entry($value, $context, withFields: false)),
            $value instanceof Term => self::contextTerm($value, $context),
            $value instanceof Collection => $value->map(fn (mixed $item): mixed => self::value($item, $context))->values()->all(),
            is_array($value) => array_map(fn (mixed $item): mixed => self::value($item, $context), $value),
            $value instanceof Htmlable => $value->toHtml(),
            $value instanceof Stringable => (string) $value,
            default => null,
        };
    }
}
