<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Menus;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Validator as ValidatorInstance;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Menus;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SafeUrl;

/**
 * Replaces a menu's items with the given tree. Each item: entry_id (an
 * entry) or url (a safe address), labels by language (required for an
 * address), new_tab, and children (three levels at most).
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
            $menu->items()->delete();
            $this->create($menu, $items, null);
        });
        $menu->unsetRelation('items');
        $this->menus->flush();
        $this->activity->record('updated', 'menu', $menu, $menu->title);
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
            $rules["{$key}.entry_id"] = ["required_without:{$key}.url", 'nullable', 'integer', 'exists:'.(new Entry)->getTable().',id'];
            $rules["{$key}.url"] = ["required_without:{$key}.entry_id", 'nullable', 'string', 'max:2048', SafeUrl::rule()];
            $rules["{$key}.labels"] = ['nullable', 'array'];
            foreach (Locales::all() as $locale) {
                $rules["{$key}.labels.{$locale}"] = ['nullable', 'string', 'max:255'];
            }
            // An address has no title to fall back on.
            $rules["{$key}.labels.".Locales::default()][] = "required_with:{$key}.url";
            $rules["{$key}.new_tab"] = ['nullable', 'boolean'];
            $rules["{$key}.children"] = $depth >= self::MAX_DEPTH ? ['prohibited'] : ['nullable', 'array', 'list'];
            $children = is_array($item) && is_array($item['children'] ?? null) ? $item['children'] : [];
            if ($depth < self::MAX_DEPTH && $children !== []) {
                $this->rules($children, "{$key}.children", $depth + 1, $rules, $count);
            }
        }
    }

    /** @param array<mixed> $items */
    private function create(Menu $menu, array $items, ?int $parent): void
    {
        foreach (array_values($items) as $position => $item) {
            if (! is_array($item)) {
                continue;
            }
            $entry = $item['entry_id'] ?? null;
            $labels = array_filter(is_array($item['labels'] ?? null) ? $item['labels'] : [], fn (mixed $label): bool => is_string($label) && trim($label) !== '');
            $created = $menu->items()->create([
                'parent_id' => $parent,
                'sort_order' => $position,
                'entry_id' => is_numeric($entry) ? (int) $entry : null,
                'url' => is_numeric($entry) ? null : (is_string($item['url'] ?? null) ? trim($item['url']) : null),
                'labels' => array_map(trim(...), $labels),
                'new_tab' => ($item['new_tab'] ?? false) === true,
            ]);
            $this->create($menu, is_array($item['children'] ?? null) ? $item['children'] : [], $created->id);
        }
    }
}
