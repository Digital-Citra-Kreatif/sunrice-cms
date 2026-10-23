<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use Sunrice\Admin\Actions\Permissions\RenamePermissions;
use Sunrice\Admin\Actions\Permissions\SyncPermissions;
use Sunrice\Admin\Panel;
use Sunrice\Admin\Permissions\Permission;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\Taxonomy;
use Throwable;

/**
 * The permissions for one collection, taxonomy or form (see Access),
 * kept in step with them: created when one is, renamed with its handle
 * (renamed()), deleted with it. A collection or taxonomy in the trash
 * keeps them, and the roles and users that have them, until it's deleted
 * for good: restoring it gives the same access back.
 *
 * @internal
 */
final class ScopedPermissions
{
    private const ENTRY_LABELS = ['view' => 'View', 'create' => 'Create', 'update' => 'Edit drafts', 'publish' => 'Publish and unpublish', 'delete' => 'Trash and restore', 'export' => 'Export as CSV'];

    private const TERM_LABELS = ['view' => 'View terms', 'create' => 'Create terms', 'update' => 'Edit terms', 'delete' => 'Trash and delete terms'];

    /** Versioned: v2 keeps the groups as patterns with their replacements. */
    private const KEY = 'sunrice-cms:scoped-permissions:v2';

    /** The actions scoped permissions come in, by what they're scoped to. */
    private const SCOPES = [
        'collection' => ['cms.entries.%s.', Access::ENTRY_ACTIONS],
        'taxonomy' => ['cms.terms.%s.', Access::TERM_ACTIONS],
        'form' => ['cms.submissions.%s.', Access::SUBMISSION_ACTIONS],
    ];

    /**
     * Cached (as plain values) until a collection, taxonomy or form changes.
     *
     * @return list<Permission>
     */
    public static function all(): array
    {
        try {
            $cached = Cache::remember(self::KEY, SiteCache::ttl(), fn (): array => self::read());
        } catch (Throwable) {
            // No database yet (a fresh install, config:cache).
            return [];
        }

        return array_map(fn (array $row): Permission => Permission::make($row['name'], $row['label'], $row['group'], $row['replace'] ?? []), $cached);
    }

    /**
     * The group is a translatable pattern ("Entries: :collection"), with the title as its replacement.
     *
     * @return list<array{name: string, label: string, group: string, replace?: array<string, string>}>
     */
    private static function read(): array
    {
        if (! Schema::hasTable('sunrice_collections')) {
            return [];
        }
        $permissions = [];
        $make = function (string $name, string $label, string $group, string $key, string $title) use (&$permissions): void {
            try {
                $permission = Permission::make($name, $label, $group, [$key => $title]);
                $permissions[] = ['name' => $permission->name, 'label' => $label, 'group' => $group, 'replace' => [$key => $title]];
            } catch (\InvalidArgumentException) {
                // A handle permissions can't hold (a double or trailing underscore): no scoped permission.
            }
        };
        foreach (Collection::query()->withTrashed()->orderBy('title')->get(['handle', 'title']) as $collection) {
            foreach (self::ENTRY_LABELS as $action => $label) {
                $make("cms.entries.{$collection->handle}.{$action}", $label, 'Entries: :collection', 'collection', $collection->title);
            }
        }
        foreach (Taxonomy::query()->withTrashed()->orderBy('title')->get(['handle', 'title']) as $taxonomy) {
            foreach (self::TERM_LABELS as $action => $label) {
                $make("cms.terms.{$taxonomy->handle}.{$action}", $label, 'Terms: :taxonomy', 'taxonomy', $taxonomy->title);
            }
        }
        foreach (Form::query()->orderBy('title')->get(['handle', 'title']) as $form) {
            $make("cms.submissions.{$form->handle}.view", 'View submissions', 'Submissions: :form', 'form', $form->title);
            $make("cms.submissions.{$form->handle}.export", 'Export submissions as CSV', 'Submissions: :form', 'form', $form->title);
            $make("cms.submissions.{$form->handle}.delete", 'Delete submissions', 'Submissions: :form', 'form', $form->title);
        }

        return $permissions;
    }

    /** Forget what's cached, after a collection, taxonomy or form changed (with the handles Access reads). */
    public static function flush(): void
    {
        Cache::forget(self::KEY);
        Handles::flush();
        app(Panel::class)->flushPermissions();
    }

    /**
     * After a collection's, taxonomy's or form's handle changed: its stored
     * permissions are renamed in place, so the roles and people that had
     * them keep them ("cms.entries.blog.view" becomes "cms.entries.news.view").
     *
     * @param  'collection'|'taxonomy'|'form'  $kind
     */
    public static function renamed(string $kind, string $old, string $new): void
    {
        if ($old === $new) {
            return;
        }
        [$pattern, $actions] = self::SCOPES[$kind];
        $names = [];
        foreach ($actions as $action) {
            $names[sprintf($pattern, $old).$action] = sprintf($pattern, $new).$action;
        }
        app(RenamePermissions::class)->handle($names);
        self::flush();
    }

    /** After a collection, taxonomy or form came or went: its permissions too. */
    public static function sync(): void
    {
        self::flush();
        app(SyncPermissions::class)->handle();
    }
}
