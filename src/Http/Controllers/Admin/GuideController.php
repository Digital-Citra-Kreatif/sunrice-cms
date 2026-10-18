<?php

declare(strict_types=1);

namespace Sunrice\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Support\MarkdownPages;

/**
 * The user guide inside the admin (Manage → Guide): how to work with the
 * CMS day to day, in English and Indonesian (guide/{locale}/*.md).
 * Technical details sit in "For developers" boxes, linking to the
 * developer docs for readers who may open them.
 *
 * The language comes from ?lang=, then the reader's last choice, then
 * the browser's language. A page missing in a language shows in English.
 */
class GuideController extends Controller
{
    public const LOCALES = ['en' => 'English', 'id' => 'Bahasa Indonesia'];

    /** Sections in sidebar order: label per language, then page slugs. */
    public const SECTIONS = [
        [['en' => 'Getting started', 'id' => 'Memulai'], ['welcome']],
        [['en' => 'Content', 'id' => 'Konten'], ['entries', 'translations', 'media', 'taxonomies', 'menus', 'globals', 'forms', 'comments', 'seo']],
        [['en' => 'Site setup', 'id' => 'Pengaturan situs'], ['structure', 'appearance', 'settings']],
        [['en' => 'Team and tools', 'id' => 'Tim dan alat'], ['users-roles', 'activity-log', 'ai-access']],
    ];

    protected const SESSION_KEY = 'sunrice.guide_locale';

    public function show(Request $request, ?string $page = null): Response
    {
        Gate::authorize('sunrice.guide.view');

        $locale = $this->locale($request);
        $page ??= 'welcome';
        abort_unless(in_array($page, static::slugs(), true) && static::path($page, $locale) !== null, 404);

        $markdown = (string) file_get_contents((string) static::path($page, $locale));
        $canDocs = Gate::allows('sunrice.docs.view');

        return Inertia::render('Guide/Show', [
            'page' => $page,
            'title' => MarkdownPages::title($markdown) ?? Str::headline($page),
            'html' => MarkdownPages::render(
                $markdown,
                fn (string $slug) => route('sunrice.admin.guide.show', $slug, false),
                fn (string $slug) => $canDocs && is_file(DocsController::path($slug)) ? route('sunrice.admin.docs.show', $slug, false) : null,
                $locale,
            ),
            'headings' => MarkdownPages::headings($markdown),
            'sections' => static::sections($locale),
            'locale' => $locale,
            'locales' => array_map(fn (string $code, string $label) => ['code' => $code, 'label' => $label], array_keys(static::LOCALES), static::LOCALES),
        ]);
    }

    /** The guide file for a page, in the language or else in English. */
    public static function path(string $page, string $locale = 'en'): ?string
    {
        foreach (array_unique([$locale, 'en']) as $lang) {
            $file = dirname(__DIR__, 4)."/guide/{$lang}/{$page}.md";
            if (is_file($file)) {
                return $file;
            }
        }

        return null;
    }

    /** @return array<int, string> */
    public static function slugs(): array
    {
        return array_merge(...array_map(fn (array $section) => $section[1], static::SECTIONS));
    }

    protected function locale(Request $request): string
    {
        $chosen = $request->query('lang');
        if (is_string($chosen) && array_key_exists($chosen, static::LOCALES)) {
            $request->session()->put(static::SESSION_KEY, $chosen);

            return $chosen;
        }

        $remembered = $request->session()->get(static::SESSION_KEY);
        if (is_string($remembered) && array_key_exists($remembered, static::LOCALES)) {
            return $remembered;
        }

        return $request->getPreferredLanguage(array_keys(static::LOCALES)) ?? 'en';
    }

    /**
     * @return array<int, array{label: string, pages: array<int, array{slug: string, title: string}>}>
     */
    protected static function sections(string $locale): array
    {
        return array_map(function (array $section) use ($locale) {
            $pages = [];
            foreach ($section[1] as $slug) {
                $file = static::path($slug, $locale);
                if ($file !== null) {
                    $pages[] = ['slug' => $slug, 'title' => MarkdownPages::title((string) file_get_contents($file)) ?? Str::headline($slug)];
                }
            }

            return ['label' => $section[0][$locale] ?? $section[0]['en'], 'pages' => $pages];
        }, static::SECTIONS);
    }
}
