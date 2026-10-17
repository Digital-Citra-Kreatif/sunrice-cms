<?php

declare(strict_types=1);

namespace Sunrice\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use League\CommonMark\Extension\HeadingPermalink\HeadingPermalinkExtension;
use League\CommonMark\Normalizer\SlugNormalizer;

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
            'title' => static::title($markdown) ?? Str::headline($page),
            'html' => static::render($markdown),
            'headings' => static::headings($markdown),
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
                    $pages[] = ['slug' => $slug, 'title' => static::title((string) file_get_contents(static::path($slug))) ?? Str::headline($slug)];
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

    /** The document's "# Title" line. */
    protected static function title(string $markdown): ?string
    {
        return preg_match('/^#\s+(.+)$/m', $markdown, $m) === 1 ? trim($m[1]) : null;
    }

    /**
     * The "## " and "### " headings, for the "On this page" list. Ids
     * match the ones the permalink extension gives the rendered headings.
     *
     * @return array<int, array{id: string, text: string, level: int}>
     */
    protected static function headings(string $markdown): array
    {
        // Ignore "## " lines inside fenced code blocks.
        $markdown = (string) preg_replace('/^```.*?^```/ms', '', $markdown);
        preg_match_all('/^(#{2,3})\s+(.+)$/m', $markdown, $matches, PREG_SET_ORDER);
        $slugs = new SlugNormalizer;

        return array_map(fn (array $m) => [
            'id' => $slugs->normalize(trim(str_replace('`', '', $m[2]))),
            'text' => trim(str_replace('`', '', $m[2])),
            'level' => strlen($m[1]),
        ], $matches);
    }

    protected static function render(string $markdown): string
    {
        $html = Str::markdown($markdown, [
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
            'heading_permalink' => [
                'id_prefix' => '',
                'fragment_prefix' => '',
                'apply_id_to_heading' => true,
                'insert' => 'after',
                'symbol' => '#',
                'min_heading_level' => 2,
                'max_heading_level' => 3,
            ],
        ], [new HeadingPermalinkExtension]);

        // Links between guides ("forms.md#x") point at their admin pages.
        return (string) preg_replace_callback(
            '/href="([a-z0-9-]+)\.md(#[^"]*)?"/',
            fn (array $m) => 'href="'.e(route('sunrice.admin.docs.show', $m[1], false)).($m[2] ?? '').'"',
            $html,
        );
    }
}
