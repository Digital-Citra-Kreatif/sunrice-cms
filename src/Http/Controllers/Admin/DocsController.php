<?php

declare(strict_types=1);

namespace Sunrice\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Support\MarkdownPages;

/**
 * The developer docs inside the admin: the package's own docs/*.md,
 * rendered as they are on GitHub, so there is one copy to maintain.
 */
class DocsController extends Controller
{
    /** Guides in sidebar order (file names without .md). */
    public const SECTIONS = [
        'Getting started' => ['installation', 'configuration', 'commands', 'upgrading'],
        'Content' => ['content-modeling', 'custom-fields', 'assets', 'forms', 'comments'],
        'Frontend' => ['templates', 'blade-components', 'helpers'],
        'Languages' => ['multilingual', 'translation'],
        'Admin' => ['permissions', 'activity-log', 'extending', 'resources', 'packages', 'ai-agents'],
        'Operations' => ['mail', 'caching'],
    ];

    public function show(?string $page = null): Response
    {
        Gate::authorize('sunrice.docs.view');

        $page ??= 'installation';
        abort_unless(in_array($page, Arr::flatten(static::SECTIONS), true) && is_file(static::path($page)), 404);

        $markdown = (string) file_get_contents(static::path($page));

        return Inertia::render('Docs/Show', [
            'page' => $page,
            'title' => MarkdownPages::title($markdown) ?? Str::headline($page),
            // Links between guides ("forms.md#x") point at their admin pages.
            'html' => MarkdownPages::render($markdown, fn (string $slug) => route('sunrice.admin.docs.show', $slug, false)),
            'headings' => MarkdownPages::headings($markdown),
            'sections' => static::sections(),
        ]);
    }

    /**
     * The guide list: sections with each guide's slug and title.
     *
     * @return array<int, array{label: string, pages: array<int, array{slug: string, title: string}>}>
     */
    protected static function sections(): array
    {
        $sections = [];
        foreach (static::SECTIONS as $label => $slugs) {
            $pages = [];
            foreach ($slugs as $slug) {
                if (is_file(static::path($slug))) {
                    $pages[] = ['slug' => $slug, 'title' => MarkdownPages::title((string) file_get_contents(static::path($slug))) ?? Str::headline($slug)];
                }
            }
            $sections[] = ['label' => $label, 'pages' => $pages];
        }

        return $sections;
    }

    public static function path(string $page): string
    {
        return dirname(__DIR__, 4).'/docs/'.$page.'.md';
    }
}
