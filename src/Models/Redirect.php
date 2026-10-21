<?php

declare(strict_types=1);

namespace Sunrice\Cms\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * An old address that moved: the site sends visitors of from_path to
 * to_url. Made when a published entry's slug changes, or by hand under
 * Structure → Redirects.
 *
 * @property int $id
 * @property string $from_path a path on the site, like /blog/old-title
 * @property string $to_url a path or a web address
 * @property int $status 301 (permanent) or 302 (temporary)
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @api
 */
class Redirect extends Model
{
    protected $table = 'sunrice_redirects';

    protected $guarded = [];

    protected $attributes = ['status' => 301];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['status' => 'integer'];
    }

    /** A path as stored: one leading slash, no trailing one. */
    public static function normalizePath(string $path): string
    {
        return '/'.trim($path, '/');
    }
}
