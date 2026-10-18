<?php

declare(strict_types=1);

namespace Sunrice\Admin;

use Sunrice\Models\Collection;
use Sunrice\Models\Entry;
use Sunrice\Models\Form;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\Term;
use Sunrice\Sunrice;

/**
 * Builds the admin sidebar tree for the current user: only sections
 * they have permission to see.
 */
class Navigation
{
    /**
     * Each item carries a lucide icon name (kebab-case) for the sidebar.
     *
     * @return array<int, array{label: string, items: array<int, array{label: string, href: string, icon: string, external: bool}>}>
     */
    public function for(mixed $user): array
    {
        $groups = [];

        $content = [];
        $comments = false;
        foreach (Collection::query()->orderBy('sort_order')->orderBy('title')->get() as $collection) {
            $comments = $comments || $collection->allowsComments();
            if ($user->can('viewAny', [Entry::class, $collection->id])) {
                $content[] = [
                    'label' => $collection->title,
                    'href' => "collections/{$collection->handle}/entries",
                    'icon' => (string) ($collection->setting('icon') ?: 'file-text'),
                ];
            }
        }
        // One Comments page for every collection that has them.
        if ($comments && $user->can('sunrice.comments.view')) {
            $content[] = ['label' => 'Comments', 'href' => 'comments', 'icon' => 'message-square'];
        }
        if ($content !== []) {
            $groups[] = ['label' => 'Content', 'items' => $content];
        }

        $taxonomies = [];
        foreach (Taxonomy::query()->orderBy('handle')->get() as $taxonomy) {
            if ($user->can('viewAny', [Term::class, $taxonomy->id])) {
                $taxonomies[] = ['label' => $taxonomy->title, 'href' => "taxonomies/{$taxonomy->handle}/terms", 'icon' => 'tags'];
            }
        }
        if ($taxonomies !== []) {
            $groups[] = ['label' => 'Taxonomies', 'items' => $taxonomies];
        }

        $structure = [];
        if ($user->can('sunrice.menus.view')) {
            $structure[] = ['label' => 'Menus', 'href' => 'menus', 'icon' => 'list-tree'];
        }
        if ($user->can('sunrice.globals.view')) {
            $structure[] = ['label' => 'Globals', 'href' => 'globals', 'icon' => 'globe'];
        }
        // One Forms entry: the forms list links each form's submissions and builder.
        $canSeeForms = $user->can('create', Form::class)
            || Form::query()->get()->contains(fn (Form $form) => $user->can('view', $form));
        if ($canSeeForms) {
            $structure[] = ['label' => 'Forms', 'href' => 'forms', 'icon' => 'inbox'];
        }

        if ($structure !== []) {
            $groups[] = ['label' => 'Structure', 'items' => $structure];
        }

        $resources = [];
        foreach (app(Sunrice::class)->resources() as $key => $resource) {
            if ($user->can("sunrice.resources.{$key}.view")) {
                $resources[] = ['label' => $resource::label(), 'href' => "resources/{$key}", 'icon' => 'database'];
            }
        }
        if ($resources !== []) {
            $groups[] = ['label' => 'Resources', 'items' => $resources];
        }

        $admin = [];
        if ($user->can('sunrice.assets.view')) {
            $admin[] = ['label' => 'Assets', 'href' => 'assets', 'icon' => 'image'];
        }
        $manage = [
            ['collections', 'Collections', 'structure/collections', 'library'],
            ['blueprints', 'Blueprints', 'structure/blueprints', 'layout-template'],
            ['fieldsets', 'Fieldsets', 'structure/fieldsets', 'blocks'],
            ['taxonomies', 'Taxonomies', 'structure/taxonomies', 'tags'],
            ['users', 'Users', 'users', 'users'],
            ['roles', 'Roles', 'roles', 'shield'],
        ];
        foreach ($manage as [$area, $label, $href, $icon]) {
            if ($user->can("sunrice.{$area}.view")) {
                $admin[] = ['label' => $label, 'href' => $href, 'icon' => $icon];
            }
        }
        if ($user->can('sunrice.activity.view')) {
            $admin[] = ['label' => 'Activity log', 'href' => 'activity', 'icon' => 'history'];
        }
        // Settings opens its first tab this user may see (a package's
        // tab when they can't edit the site settings themselves).
        $settingsTab = app(Sunrice::class)->settingsTabs($user)[0] ?? null;
        if ($settingsTab !== null) {
            $admin[] = ['label' => 'Settings', 'href' => $settingsTab['href'], 'icon' => 'settings'];
        }
        if ($user->can('sunrice.ai-access')) {
            $admin[] = ['label' => 'AI access', 'href' => 'ai-access', 'icon' => 'bot'];
        }
        if ($user->can('sunrice.guide.view')) {
            $admin[] = ['label' => 'Guide', 'href' => 'guide', 'icon' => 'life-buoy'];
        }
        if ($user->can('sunrice.docs.view')) {
            $admin[] = ['label' => 'Docs', 'href' => 'docs', 'icon' => 'book-open'];
        }
        if ($admin !== []) {
            $groups[] = ['label' => 'Manage', 'items' => $admin];
        }
        $groups = $this->withRegisteredItems($groups, $user);

        foreach (app(Sunrice::class)->navigationHooks() as $hook) {
            $groups = array_values((array) $hook($groups, $user));
        }

        return array_map(fn (array $group): array => [
            'label' => (string) $group['label'],
            'items' => array_values(array_map(fn (array $item): array => [
                'label' => (string) $item['label'],
                'href' => (string) $item['href'],
                'icon' => (string) ($item['icon'] ?? 'circle'),
                // Outside the admin: a plain link, not an admin (Inertia) visit.
                'external' => static::isExternal((string) $item['href']),
            ], (array) $group['items'])),
        ], array_filter($groups, fn ($group) => is_array($group) && ! empty($group['items'])));
    }

    /**
     * Items added with Sunrice::addNavigationItem(), into their group
     * (new groups go after the built-in ones, before "Manage").
     *
     * @param  array<int, array<string, mixed>>  $groups
     * @return array<int, array<string, mixed>>
     */
    protected function withRegisteredItems(array $groups, mixed $user): array
    {
        foreach (app(Sunrice::class)->navigationItems() as $item) {
            $can = $item['can'];
            $allowed = match (true) {
                $can === null => true,
                is_string($can) => $user->can($can),
                default => (bool) $can($user),
            };
            if (! $allowed) {
                continue;
            }
            $link = ['label' => $item['label'], 'href' => $item['href'], 'icon' => $item['icon']];
            $index = array_search($item['group'], array_column($groups, 'label'), true);
            if ($index === false) {
                $manage = array_search('Manage', array_column($groups, 'label'), true);
                array_splice($groups, $manage === false ? count($groups) : $manage, 0, [['label' => $item['group'], 'items' => [$link]]]);
            } else {
                $groups[$index]['items'][] = $link;
            }
        }

        return $groups;
    }

    protected static function isExternal(string $href): bool
    {
        return str_starts_with($href, '/') || preg_match('#^[a-z][a-z0-9+.-]*:#i', $href) === 1;
    }
}
