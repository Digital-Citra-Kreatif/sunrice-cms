<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\File;
use Sunrice\Admin\Users\PermissionRank;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Site\TemplateLookup;
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
        $lookup = new TemplateLookup;
        $collections = [];
        foreach (Collection::query()->orderBy('title')->get() as $c) {
            $collections[$c->handle] = array_filter([
                'entry_page' => $c->route === null ? null : ['note' => "An entry's own template (its Page settings) comes first, then cms.collections.{$c->handle}.{slug} for the entry with that main-language slug (not index or show).", ...self::chain($lookup, TemplateLookup::entry($c, null), TemplateLookup::ENTRY)],
                'listing_page' => $c->listing_route === null ? null : self::chain($lookup, TemplateLookup::listing($c), TemplateLookup::LISTING),
            ]);
        }
        $taxonomies = [];
        // Those whose terms have pages: shared ones, or in a collection.
        foreach (Taxonomy::query()->where(fn ($q) => $q->whereNotNull('route')->orWhereHas('collections', fn ($q) => $q->where('sunrice_collection_taxonomy.term_pages', true)))->orderBy('title')->get() as $t) {
            $taxonomies[$t->handle] = ['note' => "A term's own template comes first, then cms.taxonomies.{$t->handle}.{slug} for the term with that main-language slug. On a collection's term page, cms.collections.{collection}.{$t->handle}.{slug} and cms.collections.{collection}.{$t->handle}.show come right after the term's own.", ...self::chain($lookup, TemplateLookup::term($t, null, null), TemplateLookup::TERM)];
        }

        // Taxonomies' index pages: the shared one's chain; in a collection, cms.collections.{collection}.{handle}.index comes after the index_template setting.
        $indexes = [];
        foreach (Taxonomy::query()->where(fn ($q) => $q->whereNotNull('index_route')->orWhereHas('collections', fn ($q) => $q->where('sunrice_collection_taxonomy.index_page', true)))->orderBy('title')->get() as $t) {
            $indexes[$t->handle] = ['note' => "In a collection, cms.collections.{collection}.{$t->handle}.index comes right after the taxonomy's index_template.", ...self::chain($lookup, TemplateLookup::index($t, null), TemplateLookup::INDEX)];
        }

        return ['collections' => $collections, 'taxonomies' => $taxonomies, 'taxonomy_indexes' => $indexes, 'search' => self::chain($lookup, ['cms.search'], 'sunrice-cms::search')];
    }

    /**
     * The views in order, whether each exists, and the one used.
     *
     * @param  list<string>  $views
     * @return array{candidates: list<array{view: string, exists: bool}>, uses: string}
     */
    private static function chain(TemplateLookup $lookup, array $views, string $fallback): array
    {
        $candidates = [];
        $uses = $fallback;
        foreach ($views as $view) {
            $candidates[] = ['view' => $view, 'exists' => $exists = $lookup->exists($view)];
            if ($exists && $uses === $fallback) {
                $uses = $view;
            }
        }

        return ['candidates' => $candidates, 'uses' => $uses];
    }
}
