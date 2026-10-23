<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Install;

use ParseError;
use PhpToken;

/**
 * Takes Laravel's stock welcome route out of the app's `routes/web.php`:
 * `Route::get('/', function () { return view('welcome'); });` (or the
 * `fn () => view('welcome')` form, or `Route::view('/', 'welcome')`),
 * whatever its spacing. The app's routes come before the CMS's, so it
 * hides the site's homepage. Anything else is left alone, and the file
 * is written only if it still parses. Used by `sunrice:install`
 * (Site\AppHomeRoute).
 *
 * @internal
 */
final class RemoveWelcomeRoute
{
    private const PATTERNS = [
        // Route::get('/', function () { return view('welcome'); });
        '/^[ \t]*Route::get\(\s*([\'"])\/\1\s*,\s*(?:static\s+)?function\s*\(\s*\)\s*(?::\s*[\w\\\\]+\s*)?\{\s*return\s+view\(\s*([\'"])welcome\2\s*\)\s*;\s*\}\s*\)\s*;[ \t]*(?:\r?\n|$)/m',
        // Route::get('/', fn () => view('welcome'));
        '/^[ \t]*Route::get\(\s*([\'"])\/\1\s*,\s*(?:static\s+)?fn\s*\(\s*\)\s*(?::\s*[\w\\\\]+\s*)?=>\s*view\(\s*([\'"])welcome\2\s*\)\s*\)\s*;[ \t]*(?:\r?\n|$)/m',
        // Route::view('/', 'welcome');
        '/^[ \t]*Route::view\(\s*([\'"])\/\1\s*,\s*([\'"])welcome\2\s*\)\s*;[ \t]*(?:\r?\n|$)/m',
    ];

    /** The welcome route's lines in the code, or null when it has none. */
    public function find(string $code): ?string
    {
        foreach (self::PATTERNS as $pattern) {
            if (preg_match($pattern, $code, $match) === 1) {
                return rtrim($match[0]);
            }
        }

        return null;
    }

    /** The code without the welcome route, or null when it has none or the result wouldn't parse. */
    public function edit(string $code): ?string
    {
        foreach (self::PATTERNS as $pattern) {
            if (preg_match($pattern, $code, $match, PREG_OFFSET_CAPTURE) !== 1) {
                continue;
            }
            $before = substr($code, 0, $match[0][1]);
            $after = substr($code, $match[0][1] + strlen($match[0][0]));
            // No run of blank lines where it was, and one newline at the end.
            if (str_ends_with($before, "\n\n") && (str_starts_with($after, "\n") || trim($after) === '')) {
                $after = ltrim($after, "\n");
            }
            $edited = $before.$after;
            $edited = trim($after) === '' ? rtrim($edited)."\n" : $edited;

            return $this->parses($edited) ? $edited : null;
        }

        return null;
    }

    /** Whether it removed the route from the file (false: it has none, or isn't one it can change). */
    public function handle(string $file): bool
    {
        $code = is_file($file) && is_writable($file) ? file_get_contents($file) : false;
        $edited = $code === false ? null : $this->edit($code);
        if ($code === false || $edited === null) {
            return false;
        }
        if (file_put_contents($file, $edited, LOCK_EX) === false || file_get_contents($file) !== $edited) {
            file_put_contents($file, $code, LOCK_EX);

            return false;
        }

        return true;
    }

    private function parses(string $code): bool
    {
        try {
            PhpToken::tokenize($code, TOKEN_PARSE);

            return true;
        } catch (ParseError) {
            return false;
        }
    }
}
