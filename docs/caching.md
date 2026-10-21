# Caching, events and scheduled publishing

## Events

Listen to these (`Sunrice\Cms\Events`) to react to content, from the admin, AI tools or code alike:

| Event | When |
| --- | --- |
| `EntryPublished` (`$translation`, `$scheduled`) | A language of an entry was published. One published for a later date fires again with `$scheduled` true when its time comes (see [Scheduled publishing](#scheduled-publishing)). |
| `EntryUnpublished` (`$translation`) | A language was taken off the site. |
| `EntryTrashed`, `EntryRestored` (`$entry`) | An entry went to the trash, or came back. |
| `EntryDeleted` (`$entry`) | An entry was permanently deleted. |
| `ContentChanged` (`$what`, like `"menu 3"`) | Anything the site shows changed: an entry going live or off, terms, menus, global sets, collections, taxonomies, blueprints, fieldsets, redirects, forms, media files, Settings → Site and Site code. Saving a draft isn't a change, and neither is a comment (they're read from the database on every render), except an approved one appearing, changing or going while whole pages are kept. |

They fire after the database transaction they're part of commits. `ContentChanged` may fire several times for one save (once per record), so keep its listeners cheap, or queue them:

```php
Event::listen(ContentChanged::class, fn () => Http::post('https://api.example.com/purge')); // better: a queued listener
```

## The site's cache

The site keeps what it reads on every page in the cache: which page is at an address, the collections' and taxonomies' URL patterns, listing pages, menus, the sitemap, and the global sets, fieldsets, forms and blueprints templates use (so `Cms::global()` and a newsletter form on every page cost no queries). Everything is kept under a **content version** per area, and a change starts a new version of the areas it touches, so nothing old is read again, on any cache store and without tags. Only plain values are kept, never models. The areas (`SiteCache::PAGES`, `ROUTES`, `MENUS`, `SITEMAP`):

| Area | What's in it | New version when |
| --- | --- | --- |
| `pages` | Whole pages, the site's share image, global sets, fieldsets, forms and blueprints (as plain attributes), anything templates render | Any change: every change below too, plus global sets, blueprints, fieldsets, forms, media files (even alt text), Site code, and approved comments while whole pages are kept |
| `routes` | Which page is at an address, URL patterns, listing routes | Entries going live, off or moving, terms, collections, taxonomies, redirects, Settings → Site |
| `menus` | Menus | Menus and their items, entries, terms, collections, taxonomies |
| `sitemap` | The sitemap's files | Entries, terms, collections, taxonomies |

So editing a menu doesn't rebuild the sitemap, and fixing a file's alt text doesn't drop the address lookups.

Settings → Cache sets `ttl` and `pages` without code (see [Cache settings](#cache-settings)).

```php
// config/sunrice-cms.php
'cache' => [
    'enabled' => env('SUNRICE_CACHE', true),
    'store' => env('SUNRICE_CACHE_STORE'),   // null: the app's default store
    'ttl' => 3600,                           // seconds anything is kept at most
    'pages' => env('SUNRICE_PAGE_CACHE', false),
],
```

With several servers, use a shared store (redis, memcached, database). Cache your own things the same way, in the `pages` area (gone with the next change) or another:

```php
app(\Sunrice\Cms\Support\SiteCache::class)->remember('shop:bestsellers', fn () => $ids);
app(\Sunrice\Cms\Support\SiteCache::class)->remember('shop:paths', fn () => $paths, SiteCache::ROUTES);
app(\Sunrice\Cms\Support\SiteCache::class)->changed('shop products', SiteCache::PAGES); // no areas: all of them
app(\Sunrice\Cms\Support\SiteCache::class)->remember('shop:stock', fn () => $stock, ttl: 60); // seconds, instead of cache.ttl
```

`Cms::entries()->remember()` keeps a query's matched ids this way (see [Querying entries](site.md#querying-entries)).

The admin keeps the handles of the collections, taxonomies and forms and their scoped permissions in the app's default cache (for `ttl` seconds at most), so the sidebar costs no queries; creating, changing, deleting or restoring one forgets them.

Menu entries are keyed by the site's URL (`url('/')`), since they hold full links; the sitemap's are on `APP_URL` and kept once. Set `APP_URL` and Laravel's `TrustHosts` middleware (or your web server's host check) so a request with a made-up `Host:` header can't fill the store with copies under other hosts.

## Whole pages

The whole-page cache uses [spatie/laravel-responsecache](https://github.com/spatie/laravel-responsecache) (PHP 8.4). Install it and turn it on:

```bash
composer require spatie/laravel-responsecache
```

```dotenv
SUNRICE_PAGE_CACHE=true
```

Site pages are then rendered once and kept for visitors who aren't signed in. Pages are kept under the content version and the front end's build (the hash of Vite's `public/build/manifest.json`), so a change to the content, or `npm run build` renaming the CSS and JS files pages link, shows at once (no clearing needed), and for `cache.ttl` at most. Changed templates don't start new kept pages by themselves: when a deploy changes Blade views, clear the kept pages too (see [Deploying](#deploying)). Forms keep working: each visitor gets their own CSRF token in a kept page, and kept pages carry none of the first visitor's cookies.

Left out: what Settings → Cache leaves out (below), anyone signed in (to the app or the panel), a visitor with something flashed to them (form errors, old input, a thank-you message), search results and any address with `?q=` (a search box shows what was searched) or `?reply_to=` (a comment's Reply link) (`PageCache::UNKEPT_QUERY`), pages that aren't a plain 200, and what you skip. Pages that show something per visitor (a cart, "Hi, Ana") must be skipped:

```php
// A service provider's boot()
app(\Sunrice\Cms\Site\PageCache::class)->skipWhen(fn (Request $request, ?Page $page): bool =>
    $request->cookies->has('cart') || $page?->collection?->handle === 'products');
```

The callback is asked twice: before a kept page is served (`$page` is null then: only the request is known), and after a page renders, before it's kept.

Pages are kept for `cache.ttl` at most (or Settings → Cache's minutes). Keep some for less with `lifetimeUsing()`: return seconds, or null for no opinion; the shortest answer wins, and 0 doesn't keep the page at all. Drafts and previews are never kept.

```php
app(\Sunrice\Cms\Site\PageCache::class)->lifetimeUsing(fn (Request $request, ?Page $page): ?int =>
    $page?->collection?->handle === 'events' ? 300 : null);
```

The CMS sets responsecache's `cache_profile` (`Sunrice\Cms\Site\PageCacheProfile`), `serializer` (one that drops cookies) and `hasher` (`Sunrice\Cms\Site\PageCacheHasher`) unless your `config/responsecache.php` names its own: then extend them, and keep cookies out of what's stored. Where pages are kept is responsecache's `cache.store` (`RESPONSE_CACHE_DRIVER`, `file` by default). With `APP_DEBUG` on, responses say `X-Cache-Status: HIT` or `MISS`.

A kept page is told apart by its host, path, language and only the query parameters the site reads: a `page` number above 1 and those in `sunrice-cms.cache.query` and Settings → Cache. `?utm_source=…` or `?x=<anything>` gets the same kept page, so nobody can fill the store with copies of one page. Add a parameter to `cache.query` when a template reads it (`['sort']`), or skip those pages. A page is kept under a `cache.query` parameter only when it says it read it, with a value it offers: the [entry filter](site.md#filtering-entries) says so for its terms, options, range steps and sorts, and a paginator for its own page name (`paginate(6, 'listings')`); for a parameter your own template reads, call `app(PageCache::class)->read('tab')` once the value checks out. So `/about?sort=zzz` or `/about?bedrooms_min=5` (a parameter that page doesn't read) is rendered but not kept, nor is `?price_min=1234567` (any number). An empty one (`?sort=`) is the page without it. A `?page=` is kept apart only on pages that paginate (any paginator asking for its page number counts: listings, `Cms::entries()->paginate()`, your own Eloquent `paginate()`), so `/about?page=7771` is rendered but not kept; on a site page, one past a paginator's last page is a 404 (past the last of another page name, `?listings=99`, the page is shown but not kept), and one not written plainly (`abc`, `02`) is never served from the cache nor kept. A page whose rendering ignored a value from the address (an entry filter given an option it doesn't have, or one of any number, date or text) isn't kept either: call `app(PageCache::class)->dontKeep()` from your own templates or components to do the same.

Kept pages need responsecache's `Spatie\ResponseCache\Replacers\CsrfTokenReplacer` (in `responsecache.replacers`, where the package puts it): it swaps each visitor's own CSRF token into a page rendered for someone else. Without it every visitor would get the first one's token and no form would submit, so with `cache.pages` on, the CMS refuses to boot (`PanelMisconfigured`) if the replacer is missing from your published config. The CMS adds its own `Sunrice\Cms\Site\HoneypotReplacer` there too: it gives each visitor fresh [honeypot](forms.md) fields (the time the form was shown and the trap's random name), so the honeypot's "sent too fast" check counts from when the visitor got the page, not from when it was kept.

A kept page still boots the framework and starts a session for each visitor (kept pages carry forms, and each visitor gets their own CSRF token), so a cookieless visit writes a session with the `database` session driver and responses say `Cache-Control: no-cache, private`. On a busy site use the `redis` or `file` session driver (or `cookie`), or put a CDN in front for pages without forms.

Comments are read from the database on every render, so a comment changes nothing kept, except on a kept page that shows it: an approved comment appearing, changing or going starts a new version of the `pages` area. With *New comments* set to publish at once, that means visitors' comments do too (within their per-address limit), and only that area.

### Cache settings

Admins with `cms.settings.cache` (*Edit Cache settings*; administrators have it) set the caching up without code in **Settings → Cache** (`Sunrice\Cms\Settings\CacheSettings`, `@api`). What's set there wins over `config/sunrice-cms.php`, which stays the default (and the only place for `cache.enabled` and `cache.store`, shown read-only on the screen's card). Saving starts a new version of every area, so it applies at once.

| Setting | Property | What it does |
| --- | --- | --- |
| **Whole-page cache** | `pageCache` | `configured` (as `cache.pages` says, the default), `on` or `off`. |
| **Keep pages for (minutes)** | `pageMinutes` | How long a page is kept at most; empty: as long as the site's data. Never longer than responsecache's own `cache.lifetime_in_seconds`, and `lifetimeUsing()` can still shorten it. |
| **Pages never kept → Addresses** | `exclude` | Path patterns, one per line, starting with `/` (or `*`); `*` is any characters, `/` included: `/contact`, `/account/*` (every page under `/account`), `/search*`, `*/print`. Case doesn't matter, nor a trailing slash, and a pattern matches an address with or without its language's prefix (`/contact` matches `/id/contact`; a translated address needs its own line). |
| **Pages never kept → Collections** | `collections` | Handles of collections whose entry pages and listing page are rendered every time, never kept. |
| **Parameters that make a page of their own** | `query` | Added to `cache.query` (both apply; `PageCacheHasher::query()` returns them all, `PageCacheHasher::configuredQuery()` only `page` and the config's). The page must still `read()` them, as above. `q` and `reply_to` are refused: those pages are never kept. |
| **Any other parameter** | `otherQuery` | `ignore` (the default, as before): any other parameter gets the kept page. `skip`: an address with any other parameter is neither served from the cache nor kept, for templates that read parameters you can't list. |
| **Parameters always ignored** | `ignore` | With `skip`: parameters that never skip the cache, `*` for any characters. `utm_*`, `fbclid`, `gclid` and `msclkid` by default (`CacheSettings::TRACKING`). |
| **Keep the site's data for (minutes)** | `siteMinutes` | Over `cache.ttl`: how long addresses, menus, the sitemap and everything else in SiteCache is kept at most (`SiteCache::ttl()`). |

The page-cache settings are greyed out, with the reason under them and on the card, while whole pages can't be kept on this server (`PageCache::unavailable()` says why, for developers): `cache.enabled` is off, spatie/laravel-responsecache isn't installed or is turned off (`RESPONSE_CACHE_ENABLED=false`), or its `CsrfTokenReplacer` is missing from `responsecache.replacers`. `PageCache::enabled()` is false then whatever the settings say. Addresses and other query parameters are checked before a kept page is served (`PageCache::excluded()`); collections after the page renders, so their pages are rendered every time but never kept. In code:

```php
$settings = app(\Sunrice\Cms\Settings\CacheSettings::class);
$settings->pagesOn();             // as set, else cache.pages
$settings->pageLifetime();        // seconds
$settings->excludesPath('/id/contact');
$settings->fill(['exclude' => "/contact\n/account/*"])->save();
```

### Clearing the caches

The card on Settings → Cache shows whether whole pages are kept, where pages and the site's data are kept, and when the caches were last cleared and by whom. Its buttons ask first, need `cms.settings.cache`, and write the activity log ("Rina cleared the page cache"):

- **Clear page cache** (`POST admin/cms/cache/clear-pages`, `sunrice.admin.cms.cache.clear-pages`): a new version of the `pages` area, so no page kept before is served again. Shown only while whole pages can be kept.
- **Clear all site caches** (`POST admin/cms/cache/clear`, `sunrice.admin.cms.cache.clear`): a new version of every area: pages, addresses, menus, the sitemap and what you keep with `SiteCache`.

Both are `Sunrice\Cms\Actions\Cache\ClearCache` (`@api`; `handle(ClearCache::PAGES)` or `handle(ClearCache::ALL)`). A new version works on any store without touching anything else in it; the pages left behind expire within their lifetime. Kept pages are also removed from responsecache's store right away when it holds nothing else (`ClearCache::ownPageStore()`: a `responsecache.cache.tag`, or a store that is neither the app's default nor `cache.store`), so a shared store is never flushed.

### Deploying

New CSS and JS from `npm run build` start new kept pages by themselves. Changed Blade templates, translations or code don't: after a deploy that changes them, clear the kept pages with **Clear page cache**, or from the command line with

```bash
php artisan responsecache:clear
```

(with `php artisan view:clear` if your deploy doesn't already), or wait `cache.ttl` at most. `responsecache:clear` empties responsecache's whole store (`cache.store`, `file` by default), so give it a store of its own when that's the app's default store.

## Scheduled publishing

An entry published for a later date is live from that moment: the site only shows what's past its date. Laravel's scheduler runs `sunrice:publish-scheduled` every minute to tell everyone else: it starts a new content version (so kept listings, menus, sitemaps and pages show it) and fires `EntryPublished` with `$scheduled` true for each. Add the scheduler to cron once:

```
* * * * * php artisan schedule:run
```

Without it, kept content shows a scheduled entry within `cache.ttl` at the latest.

## Query budgets

Site pages make a fixed number of queries however much content there is: no queries in loops. With the cache warm, the CMS's own views take at most 5 queries for an entry page, 6 for a listing page, 7 for a term page and none for the sitemap (`tests/Cms/CachingTest.php` checks this). The site's share image is read once per content version, and an entry's other languages come with it (for `hreflang` links). Templates add their own, but `values()` in a loop doesn't: the entries of a page (its `$entries`, `$results`, `Cms::entries()`, an entries field) hydrate together, one query per kind for each level of links (see [Fields](fields.md)). Otherwise eager load (`Cms::entries()` loads entries with their collections), and see the queries behind a page with Laravel Debugbar or Telescope on staging.
