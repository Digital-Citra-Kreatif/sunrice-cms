<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Support\Arr;
use Illuminate\Translation\Translator;

/**
 * Laravel's own lines (pagination, validation, auth, passwords and the
 * pagination view's words) come in English only, and a new app has no
 * lang/ folder, so an Indonesian site showed them in English. The CMS
 * brings Indonesian ones (resources/lang-core), used for each group the
 * app has no file of its own for: lang/id/validation.php always wins, and
 * so do the app's lang/id.json lines.
 *
 * @internal
 */
final class CoreTranslations
{
    public static function register(Translator $translator): void
    {
        $root = dirname(__DIR__, 2).'/resources/lang-core';
        // JSON lines ("Showing", "results"…), below the app's own lang/{locale}.json.
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
