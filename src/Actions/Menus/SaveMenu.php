<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Menus;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Validator as ValidatorInstance;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Menus;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\MenuItem;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SafeUrl;

/**
 * Replaces a menu's items with the given tree. Each item: entry_id (an
 * entry), term_id (a term's page), collection_id (its listing page) or
 * url (a safe address), labels by language (required for an
 * address), new_tab, and children (three levels at most). A listing
 * page's link may take `query`, its filters as a query string
 * ("listing_type=for-sale"), added to its address in every language.
 *
 * @api
 */
final class SaveMenu
{
    public const MAX_DEPTH = 3;

    public const MAX_ITEMS = 200;

    public function __construct(
        private readonly ActivityLog $activity,
        private readonly Menus $menus,
    ) {}

    /**
     * @param  array<mixed>  $items
     *
     * @throws ValidationException
     */
    public function handle(Menu $menu, array $items): void
    {
        $rules = ['items' => ['array', 'list']];
        $count = 0;
        $this->rules($items, 'items', 1, $rules, $count);
        $validator = Validator::make(['items' => $items], $rules);
        $validator->after(function (ValidatorInstance $validator) use ($count): void {
            if ($count > self::MAX_ITEMS) {
                $validator->errors()->add('items', 'A menu holds '.self::MAX_ITEMS.' links at most.');
            }
        });
        $validator->validate();

        DB::transaction(function () use ($menu, $items): void {
            // Unhooked from their parents first, so no row is deleted by a
            // cascade while the statement runs: MySQL's ordered delete (the
            // relation is ordered) left all but the first branch behind.
            $old = MenuItem::query()->where('menu_id', $menu->id);
            (clone $old)->whereNotNull('parent_id')->update(['parent_id' => null]);
            $old->delete();
            $this->create($menu, $items, null);
        });
        $menu->unsetRelation('items');
        $this->menus->flush();
        $this->activity->record('updated', 'menu', $menu, $menu->title, ['note' => $count.' '.($count === 1 ? 'link' : 'links')]);
    }

    /**
     * @param  array<mixed>  $items
     * @param  array<string, list<mixed>>  $rules
     */
    private function rules(array $items, string $path, int $depth, array &$rules, int &$count): void
    {
        foreach ($items as $index => $item) {
            $count++;
            $key = "{$path}.{$index}";
            $rules[$key] = ['array'];
            // One target: an entry, a term's page (with a collection: its page there), a listing page or an address.
            $targets = ["{$key}.entry_id", "{$key}.term_id", "{$key}.collection_id", "{$key}.url"];
            $others = fn (string $target, string ...$also): string => 'prohibits:'.implode(',', array_diff($targets, [$target, ...$also]));
            $rules["{$key}.entry_id"] = ['required_without_all:'.implode(',', array_diff($targets, ["{$key}.entry_id"])), 'nullable', $others("{$key}.entry_id"), 'integer', 'exists:'.(new Entry)->getTable().',id'];
            $rules["{$key}.term_id"] = ['nullable', $others("{$key}.term_id", "{$key}.collection_id"), 'integer', 'exists:'.(new Term)->getTable().',id'];
            $rules["{$key}.collection_id"] = ['nullable', $others("{$key}.collection_id", "{$key}.term_id"), 'integer', 'exists:'.(new Collection)->getTable().',id',
                function (string $attribute, mixed $value, \Closure $fail) use ($item): void {
                    // A term's page in a collection: only where its taxonomy's terms have pages.
                    $term = is_array($item) && is_numeric($item['term_id'] ?? null) ? Term::query()->find((int) $item['term_id']) : null;
                    if ($term !== null && is_numeric($value) && ! $term->taxonomy->collections()->wherePivot('term_pages', true)->whereKey((int) $value)->exists()) {
                        $fail(__('Its terms have no pages in that collection.'));
                    }
                }];
            $rules["{$key}.url"] = ['nullable', $others("{$key}.url"), 'string', 'max:2048', SafeUrl::rule()];
            $rules["{$key}.labels"] = ['nullable', 'array'];
            foreach (Locales::all() as $locale) {
                $rules["{$key}.labels.{$locale}"] = ['nullable', 'string', 'max:255'];
            }
            // An address has no title to fall back on.
            $rules["{$key}.labels.".Locales::default()][] = "required_with:{$key}.url";
            $rules["{$key}.query"] = ['nullable', 'string', 'max:500', function (string $attribute, mixed $value, \Closure $fail) use ($item): void {
                if (! is_array($item) || ! is_numeric($item['collection_id'] ?? null) || is_numeric($item['term_id'] ?? null)) {
                    $fail(__('Only a link to a listing page takes filters.'));
                } elseif (self::queryString($value) === null) {
                    $fail(__('Write the filters as on the listing page\'s address: listing_type=for-sale&city=jakarta.'));
                }
            }];
            $rules["{$key}.new_tab"] = ['nullable', 'boolean'];
            $rules["{$key}.children"] = $depth >= self::MAX_DEPTH ? ['prohibited'] : ['nullable', 'array', 'list'];
            $children = is_array($item) && is_array($item['children'] ?? null) ? $item['children'] : [];
            if ($depth < self::MAX_DEPTH && $children !== []) {
                $this->rules($children, "{$key}.children", $depth + 1, $rules, $count);
            }
        }
    }

    /**
     * A listing link's filters as kept: a query string without its "?",
     * re-encoded ("a=1&b[]=x"); null when there are none, or it isn't one.
     */
    public static function queryString(mixed $value): ?string
    {
        if (! is_string($value) || trim(ltrim(trim($value), '?')) === '') {
            return null;
        }
        $value = ltrim(trim($value), '?');
        if (str_contains($value, '#') || preg_match('/\s/', $value) === 1) {
            return null;
        }
        parse_str($value, $parameters);
        $query = http_build_query($parameters, '', '&', PHP_QUERY_RFC3986);

        return $query === '' ? null : $query;
    }

    /** @param array<mixed> $items */
    private function create(Menu $menu, array $items, ?int $parent): void
    {
        foreach (array_values($items) as $position => $item) {
            if (! is_array($item)) {
                continue;
            }
            $entry = $item['entry_id'] ?? null;
            $term = $item['term_id'] ?? null;
            $collection = $item['collection_id'] ?? null;
            $labels = array_filter(is_array($item['labels'] ?? null) ? $item['labels'] : [], fn (mixed $label): bool => is_string($label) && trim($label) !== '');
            $created = $menu->items()->create([
                'parent_id' => $parent,
                'sort_order' => $position,
                'entry_id' => is_numeric($entry) ? (int) $entry : null,
                'term_id' => is_numeric($term) ? (int) $term : null,
                'collection_id' => is_numeric($collection) ? (int) $collection : null,
                'url' => is_string($item['url'] ?? null) && trim($item['url']) !== '' ? trim($item['url']) : null,
                'labels' => array_map(trim(...), $labels),
                'new_tab' => ($item['new_tab'] ?? false) === true,
                'query_string' => is_numeric($collection) ? self::queryString($item['query'] ?? null) : null,
            ]);
            $this->create($menu, is_array($item['children'] ?? null) ? $item['children'] : [], $created->id);
        }
    }
}
