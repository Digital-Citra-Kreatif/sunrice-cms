<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Support\Locales;

/**
 * An old address that moved: the site sends visitors of from_path to
 * to_url. Made when a published entry's slug changes, or by hand under
 * Structure → Redirects. A from_path ending in `/*` is a wildcard: it
 * takes every path under it (/blog/* takes /blog/2024/hello), and a `*`
 * in to_url is what it stood for (/journal/* → /journal/2024/hello).
 *
 * @property int $id
 * @property string $from_path a path on the site, like /blog/old-title, or a wildcard, like /blog/*
 * @property string $to_url a path or a web address, with `*` for what a wildcard's stood for
 * @property int $status 301 (permanent) or 302 (temporary)
 * @property bool $every_language also from the same path in every language's prefix (/listings and /id/listings)
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @api
 */
class Redirect extends Model
{
    protected $table = 'sunrice_redirects';

    protected $guarded = [];

    protected $attributes = ['status' => 301, 'every_language' => false];

    /** In a wildcard's from_path (at its end, after a /) and in its to_url: the rest of the path. */
    public const WILDCARD = '*';

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['status' => 'integer', 'every_language' => 'boolean'];
    }

    /**
     * Where a visitor of `$path` goes: to_url, or for a redirect in every
     * language to a path, that path in the visitor's language
     * (/listings → /properties, so /id/listings → /id/properties).
     */
    public function targetFor(string $path): string
    {
        $to = $this->to_url;
        if ($this->isWildcard()) {
            // The visitor's rest of the path, never a way to another host (/old//evil.com, /old/\evil.com),
            // and always after a / so it can't become the scheme or the host (* → https:evil.com).
            $rest = ltrim((string) preg_replace('#[/\\\\]+#', '/', $this->captured($path) ?? ''), '/');
            $before = strstr($to, self::WILDCARD, true);
            $to = str_replace(self::WILDCARD, ($before === false || str_ends_with($before, '/') ? '' : '/').$rest, $to);
            if (str_starts_with($to, '//') || str_starts_with($to, '/\\')) {
                $to = '/';
            }
        }
        if (! $this->every_language || ! str_starts_with($to, '/') || str_starts_with($to, '//')) {
            return $to;
        }
        [$locale] = Locales::split($path);
        [, $rest] = Locales::split($to);

        return (Locales::prefix($locale).($rest === '/' ? '' : $rest)) ?: '/';
    }

    /** What a wildcard's `*` stands for: `/blog/*` and the visitor's /blog/2024/hello → "2024/hello"; null when it doesn't match. */
    public function captured(string $path): ?string
    {
        if (! $this->isWildcard()) {
            return null;
        }
        $path = self::normalizePath($path);
        $prefix = self::prefixOf($this->from_path);
        if (str_starts_with($path, $prefix) && strlen($path) > strlen($prefix)) {
            return substr($path, strlen($prefix));
        }
        if ($this->every_language) {
            // From the same path in another language: compared without the prefixes.
            [, $rest] = Locales::split($path);
            $prefix = self::prefixOf(Locales::split($this->from_path)[1]);
            if (str_starts_with($rest, $prefix) && strlen($rest) > strlen($prefix)) {
                return substr($rest, strlen($prefix));
            }
        }

        return null;
    }

    public function isWildcard(): bool
    {
        return self::wildcard($this->from_path);
    }

    /** Whether a from path is a wildcard: it ends in `/*`. */
    public static function wildcard(string $from): bool
    {
        return str_ends_with($from, '/'.self::WILDCARD);
    }

    /** What a wildcard's paths start with: "/blog/" for `/blog/*`. */
    public static function prefixOf(string $from): string
    {
        return self::wildcard($from) ? substr($from, 0, -1) : $from;
    }

    /** A valid from path: a path on the site, starting with /, with `*` only as its last segment (/blog/*). */
    public static function validFrom(string $from): bool
    {
        return preg_match('#^/[^\s?\#*]*$#', self::prefixOf($from)) === 1;
    }

    /** A path as stored: one leading slash, no trailing one. */
    public static function normalizePath(string $path): string
    {
        return '/'.trim($path, '/');
    }
}
