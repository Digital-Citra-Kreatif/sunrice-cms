<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\Taxonomy;

/**
 * Who may do what with content. Each permission comes for everything, or
 * scoped to one collection, taxonomy or form:
 *
 *   cms.entries.{action}            cms.entries.{collection}.{action}     view, create, update, publish, delete, export
 *   cms.entries.update-own, .delete-own   their own entries, in collections they may view
 *   cms.entries.translate           the other languages of entries they may view, not the main one
 *   cms.terms.{action}              cms.terms.{taxonomy}.{action}         view, create, update, delete
 *   cms.submissions.{action}        cms.submissions.{form}.{action}       view, export, delete
 *
 *     Access::entries($user, 'publish', $collection)
 *
 * @api
 */
final class Access
{
    public const ENTRY_ACTIONS = ['view', 'create', 'update', 'publish', 'delete', 'export'];

    public const TERM_ACTIONS = ['view', 'create', 'update', 'delete'];

    public const SUBMISSION_ACTIONS = ['view', 'export', 'delete'];

    /**
     * Whether a user may do this with entries: of a collection (or, with
     * none, of some collection); of an entry (their own ones) and in a
     * language (translators).
     */
    public static function entries(?Authorizable $user, string $action, Collection|string|null $collection = null, ?Entry $entry = null, ?string $locale = null): bool
    {
        if ($user === null) {
            return false;
        }
        $handle = $collection instanceof Collection ? $collection->handle : $collection;
        if ($user->can("cms.entries.{$action}") || ($handle !== null ? $user->can("cms.entries.{$handle}.{$action}") : self::anyScoped($user, "cms.entries.%s.{$action}", Handles::collections()))) {
            return true;
        }
        if ($handle === null || ! in_array($action, ['update', 'delete'], true) || ! self::entries($user, 'view', $handle)) {
            return false;
        }
        // Their own entries.
        $id = $user instanceof Model ? $user->getKey() : null;
        if ($entry !== null && $entry->author_id !== null && is_scalar($id) && (string) $entry->author_id === (string) $id && $user->can("cms.entries.{$action}-own")) {
            return true;
        }

        // Translators: the other languages.
        return $action === 'update' && $locale !== null && $locale !== Locales::default() && $user->can('cms.entries.translate');
    }

    /**
     * The collections whose entries a user may view (or more).
     *
     * @return \Illuminate\Database\Eloquent\Collection<int, Collection>
     */
    public static function collections(?Authorizable $user, string $action = 'view'): \Illuminate\Database\Eloquent\Collection
    {
        return Collection::query()->orderBy('title')->get()->filter(fn (Collection $c): bool => self::entries($user, $action, $c))->values();
    }

    /** Whether a user may view, create, update or delete a taxonomy's terms (with none: some taxonomy's). */
    public static function terms(?Authorizable $user, string $action, Taxonomy|string|null $taxonomy = null): bool
    {
        if ($user === null) {
            return false;
        }
        $handle = $taxonomy instanceof Taxonomy ? $taxonomy->handle : $taxonomy;

        return $user->can("cms.terms.{$action}")
            || ($handle !== null ? $user->can("cms.terms.{$handle}.{$action}") : self::anyScoped($user, "cms.terms.%s.{$action}", Handles::taxonomies()));
    }

    /** Whether a user may view, export or delete a form's submissions (with none: some form's). */
    public static function submissions(?Authorizable $user, string $action, Form|string|null $form = null): bool
    {
        if ($user === null) {
            return false;
        }
        $handle = $form instanceof Form ? $form->handle : $form;

        return $user->can("cms.submissions.{$action}")
            || ($handle !== null ? $user->can("cms.submissions.{$handle}.{$action}") : self::anyScoped($user, "cms.submissions.%s.{$action}", Handles::forms()));
    }

    /** @param list<string> $handles */
    private static function anyScoped(Authorizable $user, string $pattern, array $handles): bool
    {
        foreach ($handles as $handle) {
            if ($user->can(sprintf($pattern, $handle))) {
                return true;
            }
        }

        return false;
    }
}
