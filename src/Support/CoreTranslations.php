<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Contracts\Translation\Loader;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Arr;
use Illuminate\Translation\FileLoader;
use Illuminate\Translation\Translator;

/**
 * Laravel's own lines (pagination, validation, auth, passwords and the
 * pagination view's words) come in English only, and a new app has no
 * lang/ folder, so an Indonesian site showed them in English. The CMS
 * brings Indonesian ones (resources/lang-core), as a translation path
 * between Laravel's and the app's: like any language file, a group is
 * read the first time a page asks for it (never when the translator is
 * made), and the app's lang/id/validation.php and lang/id.json win, line
 * by line.
 *
 * @internal
 */
final class CoreTranslations
{
    public static function path(): string
    {
        return dirname(__DIR__, 2).'/resources/lang-core';
    }

    /**
     * Laravel's file loader with the CMS's lines after Laravel's own and
     * before the app's (`translation.loader`, extended before it's made).
     * Another kind of loader is left as it is (see register()).
     */
    public static function loader(Loader $loader, Filesystem $files): Loader
    {
        if ($loader::class !== FileLoader::class || in_array(self::path(), $loader->paths(), true)) {
            return $loader;
        }
        $paths = array_values(array_filter($loader->paths(), is_string(...)));
        // Laravel's own lines come first (its English ones); the CMS's next.
        $at = 0;
        foreach ($paths as $index => $path) {
            if (str_ends_with(str_replace('\\', '/', $path), 'Illuminate/Translation/lang')) {
                $at = $index + 1;
            }
        }
        array_splice($paths, $at, 0, [self::path()]);
        $extended = new FileLoader($files, $paths);
        foreach ($loader->namespaces() as $namespace => $hint) {
            $extended->addNamespace($namespace, $hint);
        }
        foreach (array_filter($loader->jsonPaths(), is_string(...)) as $path) {
            $extended->addJsonPath($path);
        }

        return $extended;
    }

    /**
     * For a translator whose loader isn't Laravel's own file loader: the
     * CMS's lines added up front, for each group the app has no file of.
     */
    public static function register(Translator $translator): void
    {
        $loader = $translator->getLoader();
        if ($loader instanceof FileLoader && in_array(self::path(), $loader->paths(), true)) {
            return;
        }
        $root = self::path();
        $translator->addJsonPath($root);
        foreach (glob($root.'/*', GLOB_ONLYDIR) ?: [] as $dir) {
            $locale = basename($dir);
            foreach (glob($dir.'/*.php') ?: [] as $file) {
                $group = basename($file, '.php');
                if (is_file(lang_path("{$locale}/{$group}.php"))) {
                    continue;
                }
                $lines = [];
                foreach (Arr::dot((array) require $file) as $key => $line) {
                    if (is_string($line)) {
                        $lines["{$group}.{$key}"] = $line;
                    }
                }
                $translator->addLines($lines, $locale);
            }
        }
    }
}
