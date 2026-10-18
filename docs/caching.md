# Caching and performance

## Content version

Every public read path (`EntryQuery`, menus, globals, the route matcher,
the sitemap) keys its cache as `sunrice:{version}:{locale}:{key}` where
`version` is a single global counter stored as `sunrice:content_version`.

Publishing, unpublishing, deleting or restoring an entry — and every
`ContentChanged` event (term, menu, global, asset, structure and
settings saves) — bumps the version, so all public keys become
unreachable at once. Works on every cache driver; no tags needed.

Draft saves never bump the version; previews bypass the cache entirely.

Only plain values are cached (ids, arrays, strings), never models or
other objects, so the cache works with Laravel 13's default
`cache.serializable_classes = false`. Entry queries cache the matching
ids and load those entries by key.

## Config

- `sunrice.cache.enabled` — master switch.
- `sunrice.cache.store` — cache store (default: app default).
- `sunrice.cache.ttl` — TTL seconds.
- `sunrice.cache.full_page` — enable the optional full-page cache.
  Requires `spatie/laravel-responsecache` (PHP 8.4+); when enabled the
  `CacheResponse` middleware wraps frontend routes and the whole page
  cache is cleared on every bump.

### Pages the full-page cache leaves out

The full-page cache keeps every successful GET page. Pages that differ per
visitor (a cart, prices for a signed-in customer) shouldn't be kept: say
which with `Sunrice::cachePageUsing()`, from a service provider's `boot()`:

```php
use Illuminate\Http\Request;
use Sunrice\Frontend\TemplateContext;

Sunrice::cachePageUsing(function (Request $request, ?TemplateContext $page): bool {
    // false: don't cache this page.
    return $page?->collection?->handle !== 'products' || ! $request->user();
});
```

- The callback runs after the page has rendered. `$page` is the page Sunrice
  rendered (entry, listing or term), or null for other routes.
- A page is cached only when the cache's own rules allow it and every
  callback returns true.
- The callbacks are consulted through Sunrice's cache profile
  (`Sunrice\Cache\FullPageCacheProfile`, which extends the package's
  default `CacheAllSuccessfulGetRequests`). It is used unless you set your
  own `responsecache.cache_profile`; then extend Sunrice's profile, or call
  `Sunrice::shouldCachePage($request)` from yours.

## Testing with lots of content

Fill a staging site with fake articles, try the pages, then remove them:

```bash
php artisan sunrice:demo-content 1000          # or 10000
# open the printed pages, or time them:
curl -s -o /dev/null -w "%{time_total}s\n" https://staging.example.com/demo
php artisan sunrice:demo-content --remove
```

The articles live in their own `demo` collection (pages at `/demo/…`, a
listing at `/demo`, topics at `/demo_topics/…`), so real content and
menus are never touched. Measure on the server itself or with a load
tool (`ab`, `hey`, k6) against staging, not production. To see the
database queries behind a page, install
[Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar) on
staging (`APP_DEBUG=true`), or [Telescope](https://laravel.com/docs/telescope).

For reference, with 10,000 articles (PHP 8.4, no full-page cache,
default templates):

| Page | Time | Queries |
| --- | --- | --- |
| Article | ~10 ms | 16 |
| Listing (first or last page) | ~10 ms | 5 |
| Term page | ~23 ms | 13 |
| Search | ~26 ms | 9 |
| Admin: dashboard | ~18 ms | 9 |
| Admin: entries list / search / sort by title | ~20 / ~32 / ~36 ms | 11 |
| Admin: entry editor | ~12 ms | 12 |
| Admin: terms list (200 terms) | ~32 ms | 7 |
| Admin: CSV export of all 10,000 | ~1.3 s | 104 |

Public pages measured on SQLite, admin pages on Postgres. Query counts
don't grow with the amount of content or the number of cards on a page
(tests guard this, for public and admin pages). Settings are read once per
request, listed entries share their collection and blueprint instead of
loading them one by one, and term entry counts come from one grouped
query rather than one per term.

On Postgres, right after a big import, pages can be slower until the
database refreshes its statistics (autovacuum does this within minutes);
run `ANALYZE;` in `psql` to do it at once.
