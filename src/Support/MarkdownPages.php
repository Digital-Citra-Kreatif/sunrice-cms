<?php

declare(strict_types=1);

namespace Sunrice\Support;

use Closure;
use Illuminate\Support\Str;
use League\CommonMark\Extension\HeadingPermalink\HeadingPermalinkExtension;
use League\CommonMark\Normalizer\SlugNormalizer;

/**
 * Markdown pages shown in the admin: the developer docs (docs/*.md) and
 * the user guide (guide/{locale}/*.md). Renders them as on GitHub, with
 * heading anchors, GitHub-style callouts and links between pages:
 *
 *   > [!TIP] / [!NOTE] / [!WARNING]   friendly hints
 *   > [!TECHNICAL]                    "For developers": code, .env, commands
 *
 *   [Entries](entries.md#drafts)      another page of the same set
 *   [Templates](docs:templates.md)    a developer docs page (from the guide)
 */
class MarkdownPages
{
    /** Callout kind => label per language (English when the language has none). */
    public const CALLOUTS = [
        'tip' => ['en' => 'Tip', 'id' => 'Tips'],
        'note' => ['en' => 'Note', 'id' => 'Catatan'],
        'warning' => ['en' => 'Careful', 'id' => 'Perhatian'],
        'technical' => ['en' => 'For developers', 'id' => 'Untuk developer'],
    ];

    /** The document's "# Title" line. */
    public static function title(string $markdown): ?string
    {
        return preg_match('/^#\s+(.+)$/m', $markdown, $m) === 1 ? trim($m[1]) : null;
    }

    /**
     * The "## " and "### " headings, for the "On this page" list. Ids
     * match the ones the permalink extension gives the rendered headings.
     *
     * @return array<int, array{id: string, text: string, level: int}>
     */
    public static function headings(string $markdown): array
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

    /**
     * @param  Closure(string): string  $pageUrl  a page of this set by slug
     * @param  (Closure(string): ?string)|null  $docsUrl  a developer docs page, or null to show only its text
     */
    public static function render(string $markdown, Closure $pageUrl, ?Closure $docsUrl = null, string $locale = 'en'): string
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

        $html = static::callouts($html, $locale);

        // Developer docs links: to the docs page, or plain text for readers who can't open it.
        $html = (string) preg_replace_callback(
            '#<a href="docs:([a-z0-9-]+)\.md(\#[^"]*)?"[^>]*>(.*?)</a>#s',
            function (array $m) use ($docsUrl) {
                $url = $docsUrl === null ? null : $docsUrl($m[1]);

                return $url === null ? $m[3] : '<a href="'.e($url).$m[2].'">'.$m[3].'</a>';
            },
            $html,
        );

        // Links between pages of the same set ("forms.md#x").
        return (string) preg_replace_callback(
            '/href="([a-z0-9-]+)\.md(#[^"]*)?"/',
            fn (array $m) => 'href="'.e($pageUrl($m[1])).($m[2] ?? '').'"',
            $html,
        );
    }

    /** "> [!TIP] …" blockquotes as labelled boxes. */
    protected static function callouts(string $html, string $locale): string
    {
        return (string) preg_replace_callback(
            '#<blockquote>\s*<p>\[!(TIP|NOTE|WARNING|TECHNICAL)\]\s*(.*?)</blockquote>#s',
            function (array $m) use ($locale) {
                $kind = strtolower($m[1]);
                $label = static::CALLOUTS[$kind][$locale] ?? static::CALLOUTS[$kind]['en'];
                // The marker alone in its paragraph leaves an empty one behind.
                $body = (string) preg_replace('#^<p>\s*</p>\s*#', '', '<p>'.ltrim($m[2]));

                return '<aside class="sunrice-callout sunrice-callout-'.$kind.'" role="note">'
                    .'<p class="sunrice-callout-title">'.e($label).'</p>'
                    .trim($body)
                    .'</aside>';
            },
            $html,
        );
    }
}
