# Configuration

The CMS's settings for developers live in `config/sunrice-cms.php` (key `sunrice-cms`). Publish it to change them:

```bash
php artisan vendor:publish --tag=sunrice-cms-config
```

What editors change in the panel (the homepage, site name and SEO defaults, languages, site code, comments) is in **Settings**: Settings → Site, Languages, Site code and Comments override or complete what's here where they overlap (the languages, `noindex`). The panel's own file is described in [the panel's configuration](../../admin/docs/configuration.md).

**Times** (comments' and submissions' dates, publish dates, scheduled publishing) are in the app's time zone, Laravel's `app.timezone` (`APP_TIMEZONE`, UTC unless set): a site for Indonesia sets `APP_TIMEZONE=Asia/Jakarta` so a comment posted at 17:55 WIB reads 17:55, not 10:55. The panel shows dates in each editor's own time zone.

A dash in the *Env* column means the key has no environment variable: change it in the published file.

## Languages

| Key | Default | Env | |
| --- | --- | --- | --- |
| `locales` | `APP_LOCALE` (`['en']`) | `SUNRICE_LOCALES` (`en,id`) | The content languages, the first being the main one, until Settings → Languages is saved. Codes as `app.locale` uses them (`en`, `id`, `pt_BR`). |
| `locale_names` | `[]` | — | Their names by code (`['id' => 'Bahasa Indonesia']`); others are named in English (with `intl`). Settings → Languages, once saved, replaces both. |

See [Languages](collections.md#languages).

## The site

| Key | Default | Env | |
| --- | --- | --- | --- |
| `site.enabled` | `true` | — | Serve entries, listing and term pages at their URLs. The CMS's route is the app's fallback, after the app's own routes. The admin and previews work either way. |
| `site.middleware` | `['web']` | — | Middleware for the site's pages (the groups it names are expanded on the first request, into the `sunrice-cms.site` group). |
| `site.lazy_sessions` | `true` | `SUNRICE_LAZY_SESSIONS` | Start a visitor's session only when a page needs one, so pages without forms write no session and set no cookie; `false` keeps Laravel's session for every visitor. See [Sessions](site.md#sessions). |
| `site.template_prefixes` | `['cms.', 'pages.']` | — | What the views editors pick for an entry or a term (Page settings → Template) may start with: views in `resources/views/cms/` and `resources/views/pages/`; add the folders you want. `null`: any of the app's own views but those under `layouts`, `partials`, `components`, `errors`, `vendor`, `emails`, `mail` and `auth`, `_` files and packages' views. |
| `site.custom_code` | `true` | `SUNRICE_SITE_CODE` | Settings → Site code, HTML editors add to every page. `false` turns it off: the page and its menu item are gone (its address is a 404), `<x-sunrice-cms::code>` prints nothing, and agents can't read or change it. What was saved is kept, and shows again once it's back on. See [Site code](site.md#site-code). |
| `site.headers` | `nosniff`, `SAMEORIGIN` framing, `strict-origin-when-cross-origin`, a `Permissions-Policy` | `SUNRICE_SITE_CSP` (the CSP) | Security headers on every site response; null leaves one out, and a header the response already has is kept. No Content-Security-Policy unless set. See [Security headers](site.md#security-headers). |
| `site.fallback` | `null` | `SUNRICE_FALLBACK` | Untranslated entries and terms show the main language's content at the other language's address (canonical to the main page); off, they're a 404 there. `null`: Settings → Site decides (on by default); `true` or `false` forces it. See [Untranslated pages](site.md#untranslated-pages). |

## Caching

| Key | Default | Env | |
| --- | --- | --- | --- |
| `cache.enabled` | `true` | `SUNRICE_CACHE` | Keep what the site reads often (which page is at an address, URL patterns, menus, the sitemap) until the content changes. |
| `cache.store` | `null` | `SUNRICE_CACHE_STORE` | The cache store; `null` for the app's default. Use a shared one with several servers. |
| `cache.ttl` | `3600` | — | Seconds anything is kept at most. Settings → Cache's *Keep the site's data for* wins when set. |
| `cache.pages` | `false` | `SUNRICE_PAGE_CACHE` | Keep whole pages for visitors who aren't signed in (needs `spatie/laravel-responsecache`). Turn it on only when templates show nothing personal. Settings → Cache can turn it on or off over this. |
| `cache.query` | `[]` | — | Query parameters that make a kept page different, besides `page`. Settings → Cache adds to them. |
| `cache.preload.batch` | `25` | — | Pages each queued preload job requests ([preloading](caching.md#preloading)). |
| `cache.preload.delay` | `100` | — | Milliseconds between two preloaded pages. |

See [Caching, events and scheduled publishing](caching.md).

## Search

| Key | Default | Env | |
| --- | --- | --- | --- |
| `search.enabled` | `true` | `SUNRICE_SEARCH` | The search page at `/search` (and `/{locale}/search`). |
| `search.path` | `'search'` | — | Its path. |
| `search.collections` | `null` | — | Collection handles it covers; `null` for every collection with pages. |
| `search.per_page` | `10` | — | Results per page. |
| `search.per_minute`, `search.per_minute_global` | `30`, `300` | — | Searches per visitor (IP) a minute, and for everyone together. |

See [Search](site.md#search).

## SEO

| Key | Default | Env | |
| --- | --- | --- | --- |
| `seo.noindex` | `false` | `SUNRICE_NOINDEX` | Ask search engines to stay away from the whole site (a staging copy): noindex everywhere, an `X-Robots-Tag` header and an empty sitemap. Settings → SEO has the same switch. |

## Comments and forms

| Key | Default | Env | |
| --- | --- | --- | --- |
| `comments.prune_spam_after_days` | `30` | — | Days spam is kept before the daily prune deletes it; `null` keeps it. See [Comments](comments.md). |
| `forms.per_minute` | `5` | — | Submissions per visitor (IP) a minute to a form, unless the form says otherwise. |
| `forms.upload_disk` | `'local'` | `SUNRICE_FORMS_DISK` | The private disk files sent with forms are kept on (never served to the public). |
| `forms.upload_max_kb` | `10240` | — | The largest file a file field takes, in KB, unless the field says. |
| `forms.prune_after_days` | `null` | `SUNRICE_FORMS_PRUNE_DAYS` | Days submissions and their files are kept; `null` forever. |
| `forms.visitor_details` | `true` | `SUNRICE_FORMS_VISITOR_DETAILS` | Keep the sender's IP address, browser and referring page with each submission (personal data). |

See [Forms](forms.md).

## AI and machine translation

| Key | Default | Env | |
| --- | --- | --- | --- |
| `ai.templates` | `false` | `SUNRICE_AI_TEMPLATES` | Let super admins' AI agents write templates in `resources/views/cms` (`cms_write_template`). Blade runs PHP: leave it off unless you need it. See [AI tools](ai.md). |
| `translation.driver` | `null` | `SUNRICE_TRANSLATE_DRIVER` | Machine translation: `gemini`, `openrouter`, or `null` for none. |
| `translation.model` | `null` | `SUNRICE_TRANSLATE_MODEL` | The model; `null` for the driver's default. |
| `translation.gemini_key` | `null` | `SUNRICE_GEMINI_KEY` | The Gemini API key. |
| `translation.openrouter_key` | `null` | `SUNRICE_OPENROUTER_KEY` | The OpenRouter API key. |
| `translation.batch_size`, `translation.timeout` | `40`, `120` | — | Strings per request, and seconds a request may take. |

See [Machine translation](translation.md).

## Revisions

| Key | Default | Env | |
| --- | --- | --- | --- |
| `revisions.keep` | `50` | — | Published versions kept per entry and language; older ones are deleted on publish. |
