<?php

declare(strict_types=1);

namespace Sunrice\Permissions;

use Sunrice\Models\Collection;
use Sunrice\Models\Form;
use Sunrice\Models\Taxonomy;
use Sunrice\Sunrice;

/**
 * Produces the full permission matrix: entity permissions keyed by id
 * (renaming a collection never breaks permissions) plus global ones.
 * Every entry carries a human label and group for the role editor.
 */
class PermissionRegistry
{
    public const ENTRY_ACTIONS = ['view', 'create', 'edit', 'edit-own', 'translate', 'delete', 'delete-own', 'publish'];

    /** Areas with view/create/edit/delete permissions: sunrice.<area>.<action>. */
    public const CRUD_AREAS = [
        'collections' => ['Collections', 'Structure'],
        'blueprints' => ['Blueprints', 'Structure'],
        'fieldsets' => ['Fieldsets', 'Structure'],
        'taxonomies' => ['Taxonomies', 'Structure'],
        'menus' => ['Menus', 'Navigation'],
        'globals' => ['Globals', 'Globals'],
        'users' => ['Users', 'Users & roles'],
        'roles' => ['Roles', 'Users & roles'],
    ];

    public const CRUD_ACTIONS = ['view', 'create', 'edit', 'delete'];

    /**
     * Permissions replaced by finer ones. When a replacement is first
     * created, every role and user holding the old permission gets it,
     * so upgrading keeps access unchanged. Old names are then removed.
     *
     * @var array<string, array<int, string>>
     */
    public const LEGACY = [
        'sunrice.manage-structure' => [
            'sunrice.collections.view', 'sunrice.collections.create', 'sunrice.collections.edit', 'sunrice.collections.delete',
            'sunrice.blueprints.view', 'sunrice.blueprints.create', 'sunrice.blueprints.edit', 'sunrice.blueprints.delete',
            'sunrice.fieldsets.view', 'sunrice.fieldsets.create', 'sunrice.fieldsets.edit', 'sunrice.fieldsets.delete',
            'sunrice.taxonomies.view', 'sunrice.taxonomies.create', 'sunrice.taxonomies.edit', 'sunrice.taxonomies.delete',
            'sunrice.forms.create', 'sunrice.forms.delete',
        ],
        'sunrice.manage-navigation' => ['sunrice.menus.view', 'sunrice.menus.create', 'sunrice.menus.edit', 'sunrice.menus.delete'],
        'sunrice.manage-globals' => ['sunrice.globals.view', 'sunrice.globals.create', 'sunrice.globals.edit', 'sunrice.globals.delete'],
        'sunrice.manage-users' => ['sunrice.users.view', 'sunrice.users.create', 'sunrice.users.edit', 'sunrice.users.delete'],
        'sunrice.manage-roles' => ['sunrice.roles.view', 'sunrice.roles.create', 'sunrice.roles.edit', 'sunrice.roles.delete'],
        'sunrice.manage-settings' => ['sunrice.settings.edit'],
        // Editing asset details used to need the upload permission.
        'sunrice.assets.upload' => ['sunrice.assets.edit'],
    ];

    public const TERM_ACTIONS = ['view', 'create', 'edit', 'delete'];

    public const FORM_ACTIONS = ['edit', 'view-submissions', 'export-submissions', 'delete-submissions'];

    public const RESOURCE_ACTIONS = ['view', 'create', 'edit', 'delete', 'export'];

    /**
     * @param  bool  $withDeleted  also deleted collections and taxonomies, whose
     *                             permissions are kept so a restore keeps access
     * @return array<int, array{name: string, label: string, group: string}>
     */
    public function all(bool $withDeleted = false): array
    {
        return array_merge(
            $this->global(),
            $this->forEntries($withDeleted),
            $this->forTaxonomies($withDeleted),
            $this->forForms(),
            $this->forResources(),
            app(Sunrice::class)->permissions(),
        );
    }

    /**
     * Every permission that should exist, including those of deleted
     * collections and taxonomies (kept until they're purged).
     *
     * @return array<int, string>
     */
    public function names(): array
    {
        return array_column($this->all(true), 'name');
    }

    /**
     * Permissions shown in the role editor (none for deleted collections
     * or taxonomies).
     *
     * @return array<int, string>
     */
    public function visibleNames(): array
    {
        return array_column($this->all(), 'name');
    }

    /**
     * Permissions grouped by section for the role editor:
     * [{group, permissions: [{name, label}]}]
     *
     * @return array<int, array{group: string, permissions: array<int, array{name: string, label: string}>}>
     */
    public function grouped(): array
    {
        $groups = [];
        foreach ($this->all() as $permission) {
            $groups[$permission['group']][] = [
                'name' => $permission['name'],
                'label' => $permission['label'],
            ];
        }

        return collect($groups)
            ->map(fn (array $permissions, string $group) => ['group' => $group, 'permissions' => $permissions])
            ->values()
            ->all();
    }

    /**
     * @return array<int, array{name: string, label: string, group: string}>
     */
    public function global(): array
    {
        $defs = [
            ['sunrice.access-admin', 'Access the admin panel', 'Admin'],
            ['sunrice.settings.edit', 'Edit settings', 'Admin'],
            ['sunrice.view-drafts', 'See unpublished entries on the site while signed in', 'Admin'],
            ['sunrice.guide.view', 'Read the user guide', 'Admin'],
            ['sunrice.docs.view', 'Read the developer docs', 'Admin'],
            ['sunrice.ai-access', 'Connect AI agents (MCP) with an access token', 'Admin'],
            ['sunrice.run-commands', 'Let AI agents run maintenance commands', 'Admin'],
            ['sunrice.activity.view', 'View the activity log', 'Admin'],
            ['sunrice.activity.prune', 'Delete old activity log entries', 'Admin'],
            ['sunrice.error-log.view', 'Let AI agents read the error log', 'Admin'],
        ];

        foreach (static::CRUD_AREAS as $area => [$label, $group]) {
            foreach (static::CRUD_ACTIONS as $action) {
                $defs[] = ["sunrice.{$area}.{$action}", ucfirst($action).' '.strtolower($label), $group];
            }
        }

        array_push(
            $defs,
            ['sunrice.forms.create', 'Create forms', 'Forms'],
            ['sunrice.forms.delete', 'Delete forms', 'Forms'],
            ['sunrice.assets.view', 'View assets', 'Assets'],
            ['sunrice.assets.upload', 'Upload assets', 'Assets'],
            ['sunrice.assets.edit', 'Edit asset details and replace files', 'Assets'],
            ['sunrice.assets.delete', 'Delete assets', 'Assets'],
            ['sunrice.comments.view', 'View comments', 'Comments'],
            ['sunrice.comments.moderate', 'Approve, reply to and edit comments, mark spam', 'Comments'],
            ['sunrice.comments.delete', 'Delete comments', 'Comments'],
        );

        return array_map(fn (array $d) => ['name' => $d[0], 'label' => $d[1], 'group' => $d[2]], $defs);
    }

    /**
     * @return array<int, array{name: string, label: string, group: string}>
     */
    public function forEntries(bool $withDeleted = false): array
    {
        $out = [];
        $query = $withDeleted ? Collection::withTrashed() : Collection::query();
        foreach ($query->orderBy('handle')->get() as $collection) {
            foreach (static::ENTRY_ACTIONS as $action) {
                $out[] = [
                    'name' => "sunrice.entries.{$collection->id}.{$action}",
                    'label' => $action === 'translate'
                        ? "{$collection->title}: translate (edit other languages only)"
                        : "{$collection->title}: {$action}",
                    'group' => "Entries — {$collection->title}",
                ];
            }
        }

        return $out;
    }

    /**
     * @return array<int, array{name: string, label: string, group: string}>
     */
    public function forTaxonomies(bool $withDeleted = false): array
    {
        $out = [];
        $query = $withDeleted ? Taxonomy::withTrashed() : Taxonomy::query();
        foreach ($query->orderBy('handle')->get() as $taxonomy) {
            foreach (static::TERM_ACTIONS as $action) {
                $out[] = [
                    'name' => "sunrice.terms.{$taxonomy->id}.{$action}",
                    'label' => "{$taxonomy->title}: {$action}",
                    'group' => "Terms — {$taxonomy->title}",
                ];
            }
        }

        return $out;
    }

    /**
     * @return array<int, array{name: string, label: string, group: string}>
     */
    public function forForms(): array
    {
        $out = [];
        foreach (Form::query()->orderBy('handle')->get() as $form) {
            foreach (static::FORM_ACTIONS as $action) {
                $out[] = [
                    'name' => "sunrice.forms.{$form->id}.{$action}",
                    'label' => "{$form->title}: {$action}",
                    'group' => "Forms — {$form->title}",
                ];
            }
        }

        return $out;
    }

    /**
     * @return array<int, array{name: string, label: string, group: string}>
     */
    public function forResources(): array
    {
        $out = [];
        foreach (app(Sunrice::class)->resources() as $key => $resource) {
            foreach (static::RESOURCE_ACTIONS as $action) {
                $out[] = [
                    'name' => "sunrice.resources.{$key}.{$action}",
                    'label' => "{$resource::label()}: {$action}",
                    'group' => "Resources — {$resource::label()}",
                ];
            }
        }

        return $out;
    }

    /**
     * Names that are entity-scoped (should be deleted when the entity
     * is deleted) versus global ones (always kept).
     *
     * @return array<int, string>
     */
    public function scopedNames(): array
    {
        return array_column(
            array_merge($this->forEntries(), $this->forTaxonomies(), $this->forForms(), $this->forResources()),
            'name',
        );
    }
}
