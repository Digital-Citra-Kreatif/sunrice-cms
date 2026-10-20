<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\View;
use Sunrice\Admin\Users\PermissionRank;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;
use Symfony\Component\Finder\Finder;
use Throwable;

/**
 * The site's Blade templates for AI agents: where they live
 * (resources/views/cms, views "cms.…"), which one each page uses, and
 * safe reading and writing.
 *
 * @internal
 */
final class Templates
{
    /** The app's views directory (the first of view.paths: resources/views) + /cms. */
    public static function directory(): string
    {
        $paths = config('view.paths');
        $first = is_array($paths) ? reset($paths) : false;

        return rtrim(is_string($first) && $first !== '' ? $first : resource_path('views'), '/').'/cms';
    }

    /** Whether this user's agents may write templates: a super admin, and the site allows it (sunrice-cms.ai.templates). */
    public static function writable(?Authorizable $user): bool
    {
        return filter_var(config('sunrice-cms.ai.templates', false), FILTER_VALIDATE_BOOL)
            && $user instanceof Model && app(PermissionRank::class)->isSuperAdmin($user);
    }

    /**
     * The absolute path of a template under the directory, or null when
     * the path isn't a plain relative "name.blade.php" (no "..", no
     * hidden files, nothing outside).
     */
    public static function path(string $relative): ?string
    {
        $relative = ltrim(str_replace('\\', '/', trim($relative)), '/');
        if (preg_match('#^([a-z0-9][a-z0-9_-]*/)*[a-z0-9][a-z0-9_-]*\.blade\.php$#i', $relative) !== 1 || strlen($relative) > 200) {
            return null;
        }
        $path = self::directory().'/'.$relative;
        // A link inside may still point outside: what exists must resolve under the directory.
        $real = realpath(is_file($path) ? $path : dirname($path));
        $root = realpath(self::directory());
        if ($real !== false && $root !== false && $real !== $root && ! str_starts_with($real, $root.DIRECTORY_SEPARATOR)) {
            return null;
        }

        return $path;
    }

    /** "pages/landing.blade.php" → "cms.pages.landing" */
    public static function view(string $relative): string
    {
        return 'cms.'.str_replace('/', '.', (string) preg_replace('/\.blade\.php$/i', '', ltrim($relative, '/')));
    }

    /**
     * The site's templates.
     *
     * @return list<array{path: string, view: string, size: int, modified: string}>
     */
    public static function files(): array
    {
        if (! is_dir(self::directory())) {
            return [];
        }
        $files = [];
        foreach ((new Finder)->files()->in(self::directory())->name('*.blade.php')->sortByName() as $file) {
            $path = str_replace('\\', '/', $file->getRelativePathname());
            $files[] = ['path' => $path, 'view' => self::view($path), 'size' => (int) $file->getSize(), 'modified' => date(DATE_ATOM, (int) $file->getMTime())];
        }

        return $files;
    }

    /** The Blade's error, compiled and parsed as PHP; null when it's fine. */
    public static function syntaxError(string $blade): ?string
    {
        try {
            token_get_all(Blade::compileString($blade), TOKEN_PARSE);
        } catch (Throwable $e) {
            return $e->getMessage().' (line '.$e->getLine().' of the compiled template)';
        }

        return null;
    }

    /** Keeps a copy of a template before it changes: storage/app/sunrice-cms/template-backups/{time}/{path}. */
    public static function backup(string $file, string $relative): string
    {
        $target = storage_path('app/sunrice-cms/template-backups/'.date('Y-m-d_His').'/'.ltrim($relative, '/'));
        File::ensureDirectoryExists(dirname($target));
        File::copy($file, $target);

        return str_replace(base_path().'/', '', $target);
    }

    /**
     * Which view each kind of page uses now: the candidates in order, the
     * first that exists winning.
     *
     * @return array<string, mixed>
     */
    public static function map(): array
    {
        $chain = function (array $candidates, string $fallback): array {
            $views = array_values(array_filter($candidates, is_string(...)));
            $exists = array_map(fn (string $view): bool => View::exists($view), $views);
            $first = array_search(true, $exists, true);

            return [
                'candidates' => array_map(fn (string $view, bool $found): array => ['view' => $view, 'exists' => $found], $views, $exists),
                'uses' => $first === false ? $fallback : $views[$first],
            ];
        };
        $collections = [];
        foreach (Collection::query()->orderBy('title')->get() as $c) {
            $collections[$c->handle] = array_filter([
                'entry_page' => $c->route === null ? null : ['note' => 'An entry\'s own template (its Page settings) comes first.', ...$chain([$c->template, "cms.{$c->handle}", 'cms.entry'], 'sunrice-cms::entry')],
                'listing_page' => $c->listing_route === null ? null : $chain(["cms.{$c->handle}-listing", 'cms.listing'], 'sunrice-cms::listing'),
            ]);
        }
        $taxonomies = [];
        foreach (Taxonomy::query()->whereNotNull('route')->orderBy('title')->get() as $t) {
            $taxonomies[$t->handle] = ['note' => 'A term\'s own template comes first.', ...$chain([$t->template, "cms.taxonomy-{$t->handle}", 'cms.term'], 'sunrice-cms::term')];
        }

        return ['collections' => $collections, 'taxonomies' => $taxonomies, 'search' => $chain(['cms.search'], 'sunrice-cms::search')];
    }
}
