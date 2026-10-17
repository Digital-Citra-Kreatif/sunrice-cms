# Configuration

All options live in `config/sunrice.php` (publish with
`php artisan vendor:publish --tag=sunrice-config`).

## Site settings (admin)

**Manage → Settings** (permission `sunrice.settings.edit`) edits the site
name, description, timezone, homepage, languages, search-engine options,
default share image, code snippets and two-factor login, and sends a test
email. Saved values override the config below at boot (`app.name`,
`app.timezone`, `sunrice.locales.*`, `sunrice.seo.*`, `sunrice.code.*`,
`sunrice.auth.two_factor`), so config/`.env` act as defaults. They
are stored in `sunrice_settings` (`site` key) and cached until saved again.
The main language can only be changed before any content exists.

| Key | Default | Description |
| --- | --- | --- |
| `sunrice.admin.path` | `cms` | URL prefix of the admin panel (`SUNRICE_ADMIN_PATH`). |
| `sunrice.admin.domain` | `null` | Optional domain restriction for admin routes. |
| `sunrice.admin.middleware` | `['web']` | Middleware stack for admin routes. |
| `sunrice.auth.guard` | `web` | Guard used for admin login and permissions. |
| `sunrice.auth.user_model` | `App\Models\User` (`SUNRICE_USER_MODEL`) | Eloquent user model (must use `HasRoles`). |
| `sunrice.auth.throttle.*` | see [Security](#security) | Login and password-reset limits against brute force. |
| `sunrice.auth.two_factor` | `env('SUNRICE_TWO_FACTOR', false)` | Two-factor login: a code is emailed after the password (Settings → Security). See [Mail](mail.md#two-factor-login). |
| `sunrice.locales.main` | `id` | Main locale; unprefixed URLs resolve in it. |
| `sunrice.locales.available` | `['id']` | All locales. |
| `sunrice.locales.names` | `[]` | Display names keyed by locale. |
| `sunrice.frontend.enabled` | `true` | Mount the public catch-all + preview routes. |
| `sunrice.frontend.middleware` | `['web']` | Middleware stack for frontend routes. |
| `sunrice.cache.enabled` | `true` | Enable the content-version query cache. |
| `sunrice.cache.store` | `null` | Cache store name (`null` = default store). |
| `sunrice.cache.ttl` | `3600` | Seconds entries stay cached. |
| `sunrice.cache.full_page` | `false` | Full-page HTTP cache (requires `spatie/laravel-responsecache`, PHP 8.4+). |
| `sunrice.assets.optimize.*` | see [assets](assets.md#optimizing-images) | Defaults for `sunrice:optimize-images`. |
| `sunrice.translation.*` | see [translation](translation.md) | Driver, model and API keys for `sunrice:translate` (`SUNRICE_TRANSLATE_DRIVER`, `SUNRICE_TRANSLATE_MODEL`, `GEMINI_API_KEY`, `OPENROUTER_API_KEY`). |
| `sunrice.branding.*` | name `Sunrice`, tagline, logo (asset id), font `instrument-sans`, color `null` | White-label the admin panel (Settings → Branding): its name, tagline, logo/favicon, font (a key of `Branding::FONTS`) and accent color (`#rrggbb`). `SUNRICE_BRAND_NAME`, `SUNRICE_BRAND_COLOR`. |
| `sunrice.seo.noindex` | `env('SUNRICE_NOINDEX', false)` | Add `noindex, follow` to every page (e.g. staging). |
| `sunrice.search.enabled` / `path` | `true` (`SUNRICE_SEARCH`) / `search` | The site search page at `/search` and `/{locale}/search`. It wins over a page with the same slug. |
| `sunrice.search.collections` / `per_page` | `null` (all with entry pages) / `10` | What the search page covers, and results per page. |
| `sunrice.seo.twitter_site` | `env('SUNRICE_TWITTER_SITE')` | X/Twitter handle for `twitter:site`. |
| `sunrice.seo.title_suffix` / `title_separator` | `false` / `\|` | Add the site name to every `<title>` ("About us \| Acme"), set in Settings → General. `og:title` and `twitter:title` keep the bare title, and a title already ending with the site name is left alone. |
| `sunrice.seo.description` | `null` | Default meta description. |
| `sunrice.seo.image` | `null` | Default share image (asset id). |
| `sunrice.code.head` / `body_start` / `body_end` | `null` | HTML snippets printed by `<x-sunrice::code>`. |
| `sunrice.assets.disk` | `public` | Filesystem disk for the asset library. |
| `sunrice.assets.directory` | `sunrice` | Root directory inside the disk. |
| `sunrice.assets.max_upload_kb` | `20480` | Upload size limit in KB. |
| `sunrice.assets.image_sizes` | thumbnail/medium/large | Named derived sizes `{name: [width, height, mode]}` with mode `crop` or `fit`. |
| `sunrice.forms.upload_disk` | `local` | Private disk for form uploads. |
| `sunrice.forms.upload_max_kb` | `10240` | Size limit (KB) for form file fields that don't set their own `max_kb`. |
| `sunrice.forms.prune_after_days` | `null` | Days to keep submissions (`null` = keep forever). |
| `sunrice.forms.rate_limit` | `{attempts: 5, per_minutes: 1}` | Per-IP+form submission limit. |
| `sunrice.forms.captcha.*` | provider `turnstile`, no keys | Captcha for public forms (`SUNRICE_CAPTCHA_PROVIDER`: `turnstile`, `recaptcha` or `hcaptcha`; `SUNRICE_CAPTCHA_SITE_KEY`, `SUNRICE_CAPTCHA_SECRET_KEY`). With both keys set, each form can turn on "Require captcha". See [Forms](forms.md#captcha). |
| `sunrice.revisions.keep` | `50` | Revisions kept per entry translation. |
| `sunrice.comments.*` | see [Comments](comments.md) | Moderation, sign-in, captcha, rate limit, closing, reply depth, notifications and spam pruning. Settings → Comments overrides them. |
| `sunrice.activity.enabled` | `env('SUNRICE_ACTIVITY_LOG', true)` | Record who created, changed or deleted what. See [Activity log](activity-log.md). |
| `sunrice.activity.prune_days` | `180` | What `sunrice:prune-activity` and the admin's Prune button delete by default: entries older than this many days. |
| `sunrice.super_admin_role` | `Super Admin` | Role that bypasses all permissions. |

## Security

The admin login is protected against password guessing. Wrong passwords
are counted three ways, and reaching any limit makes that login wait
(even with the right password):

| Key (`sunrice.auth.throttle.*`) | Default | What it limits |
|---|---|---|
| `attempts` / `decay_seconds` | `5` / `60` | One email from one IP: 5 wrong passwords, then wait a minute. |
| `per_ip` / `per_ip_decay_seconds` | `20` / `60` | One IP across all emails (password spraying). |
| `per_account` / `account_lock_seconds` | `30` / `900` | One account across all IPs (a botnet): locks that account for 15 minutes. |
| `password_resets_per_minute` | `5` | The forgot-password and reset-password forms, per IP (answers 429 beyond it). |

Set a limit to `0` to turn it off. A successful login clears that email's
counts; the IP count stays. Every failed login is logged (`notice`, with
email and IP) and every lockout too (`warning`), so attacks show in
`storage/logs` and can feed a tool such as fail2ban. Two-factor login
([Mail](mail.md#two-factor-login)) adds its own limit: 10 wrong codes
lock the login for 15 minutes.

Behind a load balancer or proxy (Cloudflare…), configure Laravel's
trusted proxies so the limits see visitors' real IPs, not the proxy's.

Public forms have their own limit (`sunrice.forms.rate_limit`) and a
honeypot; the MCP endpoint allows 300 requests a minute per token.

## Honeypot

Form spam protection uses `spatie/laravel-honeypot`; its `honeypot.*`
config keys apply. Render `<x-honeypot />` inside your own forms.
