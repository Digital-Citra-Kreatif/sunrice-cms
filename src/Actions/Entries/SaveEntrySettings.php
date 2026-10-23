<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Models\Entry;

/**
 * An entry's settings beyond its fields, in every language: its parent
 * entry (in a hierarchical collection; never itself or one below it, at
 * most Entry::MAX_DEPTH deep) and its own Blade view, under the site's
 * template prefixes only (template()).
 *
 * @api
 */
final class SaveEntrySettings
{
    public const TEMPLATE = '/^[a-z0-9_\-]+(?:[.:][a-z0-9_\-]+)*$/';

    /**
     * Folders of the app's views that hold no pages: a template may not be
     * under them (without template prefixes), and the Template choice
     * leaves them out.
     */
    public const NOT_PAGES = ['layouts', 'partials', 'components', 'errors', 'vendor', 'emails', 'mail', 'auth'];

    /** Views that are no page wherever they are: the site's layout (`cms.layout`, which pages extend). */
    public const NOT_PAGE_NAMES = ['layout'];

    public function __construct(private readonly ActivityLog $activity) {}

    /**
     * @param  array{parent_id?: mixed, template?: mixed, comments_closed?: mixed}  $input  only what's given changes
     *
     * @throws ValidationException
     */
    public function handle(Entry $entry, array $input): Entry
    {
        $changed = [];
        if (array_key_exists('parent_id', $input)) {
            $parent = self::parent($entry, $input['parent_id']);
            if ($entry->parent_id !== $parent?->id) {
                $entry->parent_id = $parent?->id;
                $changed[] = 'parent';
            }
        }
        if (array_key_exists('template', $input)) {
            $template = self::template($input['template'], 'cms.landing');
            if ($entry->template !== $template) {
                $entry->template = $template;
                $changed[] = 'template';
            }
        }
        if (array_key_exists('comments_closed', $input)) {
            $closed = filter_var($input['comments_closed'], FILTER_VALIDATE_BOOL);
            if ($entry->comments_closed !== $closed) {
                $entry->comments_closed = $closed;
                $changed[] = 'comments';
            }
        }
        if ($changed !== []) {
            $entry->save();
            $this->activity->updated('entry', $entry, TrashEntry::label($entry), $changed);
        }

        return $entry;
    }

    /**
     * A template as typed, checked: a view name of the app's own (see
     * allowed()), so no layout, partial, mail or package view can be made
     * a public page. Null when empty.
     *
     * @throws ValidationException
     */
    public static function template(mixed $input, string $example = 'cms.landing'): ?string
    {
        $template = is_string($input) ? trim($input) : '';
        if ($template === '') {
            return null;
        }
        if (strlen($template) > 100 || preg_match(self::TEMPLATE, $template) !== 1) {
            throw ValidationException::withMessages(['template' => __('Use a view name like :example: lowercase letters, digits, dashes, dots.', ['example' => $example])]);
        }
        if (! self::allowed($template)) {
            $prefixes = self::prefixes();
            throw ValidationException::withMessages(['template' => $prefixes === null
                ? __('Use a view of your own, not under :folders, like :example.', ['folders' => implode(', ', self::NOT_PAGES), 'example' => $example])
                : __('Use a view under :prefixes, not under :folders, like :example.', ['prefixes' => implode(', ', $prefixes), 'folders' => implode(', ', self::NOT_PAGES), 'example' => $example])]);
        }

        return $template;
    }

    /**
     * Whether a view may be a page's template: with template prefixes
     * (sunrice-cms.site.template_prefixes), one under them; without, any
     * of the app's own views (resources/views), never a package's
     * ("pkg::…"). Either way, never one in the NOT_PAGES folders (at any
     * depth), a site layout (NOT_PAGE_NAMES: `cms.layout`) or one with a
     * part whose name starts with "_".
     */
    public static function allowed(string $template): bool
    {
        $prefixes = self::prefixes();
        if ($prefixes === null && str_contains($template, '::')) {
            return false;
        }
        // A package's view under a prefix ("pkg::pages."): its own folders count, not the namespace.
        $name = str_contains($template, '::') ? substr($template, (int) strrpos($template, '::') + 2) : $template;
        $parts = preg_split('/[.:]/', $name) ?: [];
        foreach ($parts as $i => $part) {
            $last = $i === count($parts) - 1;
            if (str_starts_with($part, '_') || (! $last && in_array($part, self::NOT_PAGES, true)) || ($last && in_array($part, self::NOT_PAGE_NAMES, true))) {
                return false;
            }
        }
        if ($prefixes === null) {
            return true;
        }
        foreach ($prefixes as $prefix) {
            if (str_starts_with($template, $prefix)) {
                return true;
            }
        }

        return false;
    }

    /**
     * The site's template prefixes (sunrice-cms.site.template_prefixes):
     * null, the default, for any of the app's own views (allowed()); an
     * empty list stands for "cms.".
     *
     * @return non-empty-list<string>|null
     */
    public static function prefixes(): ?array
    {
        $prefixes = config('sunrice-cms.site.template_prefixes');
        if ($prefixes === null) {
            return null;
        }
        $prefixes = is_array($prefixes) ? array_values(array_filter($prefixes, fn (mixed $p): bool => is_string($p) && $p !== '')) : [];

        return $prefixes === [] ? ['cms.'] : $prefixes;
    }

    /**
     * The parent an entry may have, from an id as given (null when empty):
     * an entry of its hierarchical collection, never itself or one below
     * it, at most Entry::MAX_DEPTH deep with the entries under it. The
     * entry may be new (unsaved).
     *
     * @throws ValidationException
     */
    public static function parent(Entry $entry, mixed $id): ?Entry
    {
        if ($id === null || $id === '' || $id === 0) {
            return null;
        }
        if (! $entry->collection->hierarchical) {
            throw ValidationException::withMessages(['parent_id' => __('Entries of this collection have no parents: turn on Hierarchical for it first.')]);
        }
        $parent = is_numeric($id) ? Entry::query()->where('collection_id', $entry->collection_id)->find((int) $id) : null;
        if ($parent === null) {
            throw ValidationException::withMessages(['parent_id' => __('Choose an entry of the same collection.')]);
        }
        // Never under itself or one of its own children, which would make a loop.
        $depth = 1;
        for ($above = $parent; $above !== null; $above = $above->parent) {
            if ($above->id === $entry->id) {
                throw ValidationException::withMessages(['parent_id' => __('An entry can\'t be under itself or one of its own children.')]);
            }
            if (++$depth > Entry::MAX_DEPTH) {
                throw ValidationException::withMessages(['parent_id' => __('Entries nest at most :max deep.', ['max' => Entry::MAX_DEPTH])]);
            }
        }
        // Its own children move with it.
        if ($entry->exists && $depth + self::levelsBelow($entry, Entry::MAX_DEPTH - $depth + 1) > Entry::MAX_DEPTH) {
            throw ValidationException::withMessages(['parent_id' => __('Entries nest at most :max deep, counting the ones under this entry.', ['max' => Entry::MAX_DEPTH])]);
        }

        return $parent;
    }

    /** How many levels of entries are under an entry (0 for none), counting at most $limit: one query a level. */
    private static function levelsBelow(Entry $entry, int $limit): int
    {
        $levels = 0;
        $ids = [$entry->id];
        while ($levels < $limit) {
            $ids = Entry::query()->withTrashed()->whereIn('parent_id', $ids)->pluck('id')->all();
            if ($ids === []) {
                break;
            }
            $levels++;
        }

        return $levels;
    }
}
