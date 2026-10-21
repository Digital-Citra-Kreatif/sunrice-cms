<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

/**
 * Help for a template setting: how a view name maps to a file, and the
 * files tried in order when it's left empty (the editor's TemplateHelp).
 *
 * @internal
 */
final class TemplateHelp
{
    /**
     * What a resource form's "Which file?" disclosure says (Field::helpDetails()):
     * the files tried in order, under resources/views, the paths as code, and
     * how a view name maps to its file when there's an example.
     *
     * @param  list<string>  $fallbacks  view names, tried in this order
     */
    public static function files(array $fallbacks, ?string $example = null): string
    {
        $lines = [__('The first that exists, under resources/views:')];
        foreach ([...array_map(fn (string $view): string => '`'.self::shortFile($view).'`', $fallbacks), __('the built-in template')] as $i => $fallback) {
            $lines[] = ($i + 1).'. '.$fallback;
        }
        if ($example !== null) {
            $lines[] = __('A view name is a file there: :example is :file.', ['example' => "`{$example}`", 'file' => '`'.self::shortFile($example).'`']);
        }

        return implode("\n", $lines);
    }

    /**
     * The views a page may render with, in the order they're tried, and
     * whether each exists: for the editor's "Which file?" list.
     *
     * @param  list<string|null>  $views  empty ones (a template not set) are left out
     * @return list<array{view: string, exists: bool}>
     */
    public static function lookup(array $views): array
    {
        $found = [];
        foreach (array_unique(array_filter($views, fn (?string $view): bool => $view !== null && $view !== '')) as $view) {
            $found[] = ['view' => $view, 'exists' => view()->exists($view)];
        }

        return $found;
    }

    /** cms.article → resources/views/cms/article.blade.php */
    public static function file(string $view): string
    {
        return 'resources/views/'.self::shortFile($view);
    }

    /** cms.article → cms/article.blade.php (under resources/views) */
    public static function shortFile(string $view): string
    {
        return str_replace('.', '/', $view).'.blade.php';
    }
}
