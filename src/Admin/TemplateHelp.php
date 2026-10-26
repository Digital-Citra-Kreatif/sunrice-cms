<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Closure;
use Illuminate\Database\Eloquent\Model;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Cms\Actions\Entries\SaveEntrySettings;
use Sunrice\Cms\Site\TemplateRule;
use Symfony\Component\Finder\Finder;

/**
 * Help for a template setting: how a view name maps to a file, and the
 * files tried in order when it's left empty (the editor's TemplateHelp).
 *
 * @internal
 */
final class TemplateHelp
{
    /**
     * A collection's or taxonomy's template setting on its form, like the
     * editors' Template choice: Automatic (empty) first, the views that
     * exist (those in cms/ first; read when the form is shown or saved),
     * and Other… for any view name typed in, checked by TemplateRule.
     * `$uses` gives the views tried for the record's page when it's empty,
     * for an "Uses …" line under it (null: none, as for entry templates,
     * which differ per entry).
     *
     * @param  (Closure(Model): list<string>)|null  $uses
     */
    public static function select(string $name, string $example, string $help, ?Closure $uses = null): Select
    {
        return Select::make($name)->searchable()->verbatim()->placeholder(__('Automatic'))
            ->options(function (): array {
                $choices = self::choices();
                $views = array_combine($choices, $choices);
                $inCms = array_filter($views, fn (string $view): bool => str_starts_with($view, 'cms.'));
                $others = array_diff_key($views, $inCms);

                return array_filter([__('In cms/') => $inCms, ($inCms === [] ? __('Views') : __('Other views')) => $others]);
            })
            ->other(__('Other view…'), [new TemplateRule($example)], $example)
            ->rules([new TemplateRule($example)])
            ->help(fn (?Model $record): string => $record === null || $uses === null ? __($help) : __($help).' '.self::uses($uses($record)));
    }

    /**
     * "Uses cms/collections/index.blade.php.": the first of the views that exists, else the built-in template.
     *
     * @param  list<string>  $views
     */
    private static function uses(array $views): string
    {
        foreach ($views as $view) {
            if (view()->exists($view)) {
                return __('Uses :file.', ['file' => self::shortFile($view)]);
            }
        }

        return __('Uses the built-in template.');
    }

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

    /**
     * The views a template setting may name that exist: the app's Blade
     * files (under the template prefixes when the site has some: cms/…
     * for "cms."), without layouts, partials, components and the like
     * (SaveEntrySettings::NOT_PAGES); at most `$limit`, sorted. For the
     * editor's Template choice, loaded when it opens.
     *
     * @return list<string>
     */
    public static function choices(int $limit = 200): array
    {
        $paths = config('view.paths');
        $root = rtrim(is_array($paths) && is_string($first = reset($paths)) && $first !== '' ? $first : resource_path('views'), '/');
        $views = [];
        $prefixes = SaveEntrySettings::prefixes();
        foreach ($prefixes ?? [''] as $prefix) {
            // Only plain prefixes ("cms.", "site.pages."): a package's views ("pkg::") aren't under the app's views.
            if ($prefix !== '' && preg_match('/^[a-z0-9_-]+(\.[a-z0-9_-]+)*\.?$/', $prefix) !== 1) {
                continue;
            }
            $dir = rtrim(str_replace('.', '/', $prefix), '/');
            $in = $dir === '' ? $root : "{$root}/{$dir}";
            if (! is_dir($in)) {
                continue;
            }
            foreach ((new Finder)->files()->in($in)->name('*.blade.php')->exclude(SaveEntrySettings::NOT_PAGES)->notName('_*')->sortByName() as $file) {
                $view = ($dir === '' ? '' : str_replace('/', '.', $dir).'.').str_replace(['\\', '/'], '.', (string) preg_replace('/\.blade\.php$/', '', $file->getRelativePathname()));
                if (SaveEntrySettings::allowed($view) && preg_match(SaveEntrySettings::TEMPLATE, $view) === 1) {
                    $views[$view] = $view;
                }
            }
        }
        sort($views);

        return array_slice($views, 0, $limit);
    }

    /**
     * A view name to show how names map to files ("pages.{name}"; under
     * the first template prefix when the site has some: "cms.{name}").
     */
    public static function example(string $name): string
    {
        // pages. first: the folder for one-off pages of an app's own.
        $prefixes = SaveEntrySettings::prefixes() ?? ['pages.'];
        usort($prefixes, fn (string $a, string $b): int => ($b === 'pages.') <=> ($a === 'pages.'));
        foreach ($prefixes as $prefix) {
            if (preg_match('/^[a-z0-9_-]+(\.[a-z0-9_-]+)*\.$/', $prefix) === 1) {
                return $prefix.$name;
            }
        }

        return 'cms.'.$name;
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
