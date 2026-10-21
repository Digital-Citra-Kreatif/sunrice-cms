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
     * A template as typed, checked: a view name under one of the site's
     * template prefixes (config sunrice-cms.site.template_prefixes, "cms."
     * by default), so no other view of the app can be made a public page.
     * Null when empty.
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
            throw ValidationException::withMessages(['template' => __('Use a view under :prefixes, like :example.', ['prefixes' => implode(', ', self::prefixes()), 'example' => $example])]);
        }

        return $template;
    }

    /** Whether a view name is under one of the site's template prefixes. */
    public static function allowed(string $template): bool
    {
        foreach (self::prefixes() as $prefix) {
            if (str_starts_with($template, $prefix)) {
                return true;
            }
        }

        return false;
    }

    /** @return non-empty-list<string> */
    private static function prefixes(): array
    {
        $prefixes = config('sunrice-cms.site.template_prefixes', ['cms.']);
        $prefixes = is_array($prefixes) ? array_values(array_filter($prefixes, fn (mixed $p): bool => is_string($p) && $p !== '')) : [];

        return $prefixes === [] ? ['cms.'] : $prefixes;
    }

    /**
     * The parent an entry may have, from an id as given (null when empty):
     * an entry of its hierarchical collection, never itself or one below
     * it, at most Entry::MAX_DEPTH deep. The entry may be new (unsaved).
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

        return $parent;
    }
}
