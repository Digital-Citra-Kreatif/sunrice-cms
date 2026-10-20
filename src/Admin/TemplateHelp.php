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
    /** @param  list<string>  $fallbacks  view names, tried in this order */
    public static function text(string $example, array $fallbacks): string
    {
        $lines = ["A Blade view: {$example} is ".self::file($example).'.', 'Empty: the first that exists of'];
        foreach ([...array_map(self::file(...), $fallbacks), 'the built-in template'] as $i => $fallback) {
            $lines[] = ($i + 1).'. '.$fallback;
        }

        return implode("\n", $lines);
    }

    /** cms.article → resources/views/cms/article.blade.php */
    public static function file(string $view): string
    {
        return 'resources/views/'.str_replace('.', '/', $view).'.blade.php';
    }
}
