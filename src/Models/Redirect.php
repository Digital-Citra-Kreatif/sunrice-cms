<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Sunrice\Cms\Support\Locales;

/**
 * An old address that moved: the site sends visitors of from_path to
 * to_url. Made when a published entry's slug changes, or by hand under
 * Structure → Redirects.
 *
 * @property int $id
 * @property string $from_path a path on the site, like /blog/old-title
 * @property string $to_url a path or a web address
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
        if (! $this->every_language || ! str_starts_with($this->to_url, '/') || str_starts_with($this->to_url, '//')) {
            return $this->to_url;
        }
        [$locale] = Locales::split($path);
        [, $rest] = Locales::split($this->to_url);

        return (Locales::prefix($locale).($rest === '/' ? '' : $rest)) ?: '/';
    }

    /** A path as stored: one leading slash, no trailing one. */
    public static function normalizePath(string $path): string
    {
        return '/'.trim($path, '/');
    }
}
