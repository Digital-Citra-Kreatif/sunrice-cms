<?php

declare(strict_types=1);
use App\Models\User;

return [

    /*
    |--------------------------------------------------------------------------
    | Admin panel
    |--------------------------------------------------------------------------
    |
    | path:    URL prefix for every admin route (default /cms).
    | domain:  Optional domain constraint for the admin routes.
    | middleware: Middleware applied to all admin routes.
    |
    */
    'admin' => [
        'path' => env('SUNRICE_ADMIN_PATH', 'cms'),
        'domain' => null,
        'middleware' => ['web'],
        // Extra JS/CSS loaded in the admin after its own bundle, e.g. React
        // components for custom field types (see docs/custom-fields.md).
        // Paths go through asset(); full URLs are used as they are.
        'scripts' => [],
        'styles' => [],
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication
    |--------------------------------------------------------------------------
    |
    | guard:      Laravel authentication guard used for the admin.
    | user_model: Eloquent model used for admin users. It must use
    |             Spatie\Permission\Traits\HasRoles for permissions.
    |
    */
    'auth' => [
        'guard' => 'web',
        'user_model' => env('SUNRICE_USER_MODEL', User::class),
        // Two-factor login: after the password, a one-time code is emailed
        // and must be entered. Usually switched on in Settings → Security.
        'two_factor' => (bool) env('SUNRICE_TWO_FACTOR', false),
        // Brute-force protection for the admin login. Wrong passwords are
        // counted three ways; the first limit reached makes the person wait.
        'throttle' => [
            // The same email from the same IP.
            'attempts' => 5,
            'decay_seconds' => 60,
            // One IP trying any emails (password spraying).
            'per_ip' => 20,
            'per_ip_decay_seconds' => 60,
            // One account from any IPs (a botnet): it is locked for a while.
            'per_account' => 30,
            'account_lock_seconds' => 900,
            // Forgot / reset password requests per IP per minute.
            'password_resets_per_minute' => 5,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Locales
    |--------------------------------------------------------------------------
    |
    | main:      The site's main language. Its URLs carry no prefix.
    | available: All locales the site serves (includes main).
    | names:     Human-readable names per locale for the admin.
    |
    | Switching between a single-language and a multilingual site only
    | requires editing this section — no migrations are needed.
    |
    */
    'locales' => [
        'main' => 'id',
        'available' => ['id'],
        'names' => ['id' => 'Bahasa Indonesia'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Frontend
    |--------------------------------------------------------------------------
    |
    | enabled:    Set false to disable Sunrice's catch-all frontend route.
    | middleware: Middleware applied to public content routes.
    |
    */
    'frontend' => [
        'enabled' => true,
        'middleware' => ['web'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Caching
    |--------------------------------------------------------------------------
    |
    | enabled:   Content/query caching (per locale, filters, pagination).
    | store:     Cache store name; null uses the application's default.
    | ttl:       Seconds cached content lives (bounds staleness when the
    |            scheduler is not running).
    | full_page: Optional full-page cache via spatie/laravel-responsecache
    |            (requires PHP 8.4 and the package installed).
    |
    */
    'cache' => [
        'enabled' => true,
        'store' => null,
        'ttl' => 3600,
        'full_page' => false,
    ],

    /*
    |--------------------------------------------------------------------------
    | Machine translation
    |--------------------------------------------------------------------------
    |
    | Used by `php artisan sunrice:translate` to translate content and the
    | app's language files with an LLM.
    |
    | driver:     gemini (Google AI Studio key) or openrouter (any model).
    | model:      overrides the driver's default model below.
    | batch_size: strings sent per request.
    |
    */
    'translation' => [
        'driver' => env('SUNRICE_TRANSLATE_DRIVER', 'gemini'),
        'model' => env('SUNRICE_TRANSLATE_MODEL'),
        'gemini' => [
            'key' => env('GEMINI_API_KEY'),
            'model' => 'gemini-3.5-flash-lite',
        ],
        'openrouter' => [
            'key' => env('OPENROUTER_API_KEY'),
            'model' => 'google/gemini-3.5-flash-lite',
        ],
        'batch_size' => 40,
        'timeout' => 120,
    ],

    /*
    |--------------------------------------------------------------------------
    | SEO
    |--------------------------------------------------------------------------
    |
    | noindex:      Hide the whole site from search engines (adds
    |               `<meta name="robots" content="noindex, follow">` to every
    |               page). Useful on staging. Single pages can be hidden from
    |               the entry's SEO tab instead.
    | twitter_site: The site's X/Twitter handle for `twitter:site`, e.g. "@acme".
    | description:  Default meta description for pages without their own.
    | image:        Default share image (asset id) for pages without their own.
    |
    | All of these (and the site name, timezone, languages and code snippets
    | below) can be changed in the admin under Settings, which overrides
    | the values here.
    |
    */
    /*
    |--------------------------------------------------------------------------
    | Branding (white label)
    |--------------------------------------------------------------------------
    |
    | The admin panel's name, tagline, logo (asset id), font (a key of
    | Sunrice\Support\Branding::FONTS) and global color (#rrggbb, null
    | for the neutral default). Editable under Settings → Branding.
    |
    */
    'branding' => [
        'name' => env('SUNRICE_BRAND_NAME', 'Sunrice'),
        'tagline' => 'Content workspace',
        'logo' => null,
        'font' => 'instrument-sans',
        'color' => env('SUNRICE_BRAND_COLOR'),
    ],

    /*
    | Site search: GET /search?q=… (and /{locale}/search), rendered with the
    | `sunrice.search` template. Searches the title and field text of
    | published entries that have pages; `collections` limits it to some
    | handles (null = all). The path wins over a page with the same slug.
    */
    'search' => [
        'enabled' => (bool) env('SUNRICE_SEARCH', true),
        'path' => 'search',
        'collections' => null,
        'per_page' => 10,
    ],

    'seo' => [
        'noindex' => (bool) env('SUNRICE_NOINDEX', false),
        'twitter_site' => env('SUNRICE_TWITTER_SITE'),
        // Append the site name to every <title>: "About us | Acme". The
        // separator goes between them (with a space on each side).
        'title_suffix' => false,
        'title_separator' => '|',
        'description' => null,
        'image' => null,
    ],

    /*
    |--------------------------------------------------------------------------
    | Code snippets
    |--------------------------------------------------------------------------
    |
    | HTML added to every public page by <x-sunrice::code position="…" />:
    | head (end of <head>), body_start (after <body>), body_end (before
    | </body>) — e.g. analytics or tag-manager snippets. Edited under
    | Settings in the admin.
    |
    */
    'code' => [
        'head' => null,
        'body_start' => null,
        'body_end' => null,
    ],

    /*
    |--------------------------------------------------------------------------
    | Assets
    |--------------------------------------------------------------------------
    |
    | disk:          Laravel storage disk for uploaded files.
    | directory:     Root directory inside the disk.
    | max_upload_kb: Maximum upload size in kilobytes.
    | image_sizes:   Generated sizes: name => [width, height, mode].
    |                mode 'crop' = center cover crop, 'fit' = scale down.
    | optimize:      Defaults for `php artisan sunrice:optimize-images`
    |                (each can be overridden with a command option):
    |                  max_width / max_height  shrink larger images to fit
    |                  quality                 JPEG/WebP/AVIF quality, 1-100
    |                  backup                  keep the original before overwriting
    |                  backup_disk             private disk for the originals (null = the asset's own disk)
    |                  backup_directory        folder the originals are copied into
    |
    */
    'assets' => [
        'disk' => 'public',
        'directory' => 'sunrice',
        'max_upload_kb' => 20480,
        // File types editors may upload. Scripts and HTML are always refused.
        'allowed_extensions' => [
            'jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'svg', 'ico',
            'pdf', 'txt', 'csv', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp', 'rtf',
            'zip', 'mp4', 'webm', 'mov', 'm4v', 'mp3', 'wav', 'ogg', 'm4a', 'woff', 'woff2', 'json',
        ],
        'image_sizes' => [
            'thumbnail' => [300, 300, 'crop'],
            'medium' => [800, null, 'fit'],
            'large' => [1600, null, 'fit'],
        ],
        'optimize' => [
            'max_width' => 2560,
            'max_height' => 2560,
            'quality' => 82,
            'backup' => true,
            'backup_disk' => 'local',
            'backup_directory' => 'sunrice-originals',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Forms
    |--------------------------------------------------------------------------
    |
    | upload_disk:      Private disk for form file uploads.
    | prune_after_days: Days to keep submissions (null = never prune).
    | rate_limit:       Submission rate limit per IP + form.
    | captcha:          Cloudflare Turnstile, Google reCAPTCHA (v2 checkbox)
    |                   or hCaptcha. With both keys set, "Require captcha"
    |                   can be turned on per form in the admin.
    |
    */
    'forms' => [
        'upload_disk' => 'local',
        // Size limit (KB) for file fields that don't set their own "max_kb".
        'upload_max_kb' => 10240,
        'prune_after_days' => null,
        'rate_limit' => ['attempts' => 5, 'per_minutes' => 1],
        'captcha' => [
            'provider' => env('SUNRICE_CAPTCHA_PROVIDER', 'turnstile'), // turnstile | recaptcha | hcaptcha
            'site_key' => env('SUNRICE_CAPTCHA_SITE_KEY'),
            'secret_key' => env('SUNRICE_CAPTCHA_SECRET_KEY'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Comments
    |--------------------------------------------------------------------------
    |
    | Discussions on entries of collections with "Allow comments" on. These
    | are the defaults: Settings → Comments in the admin overrides them.
    |
    | moderation:     all (every comment waits for approval), first_time (a
    |                 commenter's comments wait until one is approved) or none.
    | require_login:  Only signed-in users may comment.
    | captcha:        Ask for the captcha (keys under forms.captcha).
    | rate_limit:     Comments per IP within per_minutes.
    | close_after_days: Stop new comments on entries published longer ago.
    | max_depth:      Nesting shown on the site; deeper replies line up
    |                 at the last level.
    | notify:         Email moderators about new comments: notify_roles
    |                 (role names; empty = everyone who can moderate
    |                 comments) and notify_emails (extra addresses).
    | reply_notifications: Commenters may ask to be emailed about replies.
    | prune_spam_after_days: Delete spam after this many days (null keeps it).
    |
    */
    'comments' => [
        'moderation' => 'first_time',
        'require_login' => false,
        'captcha' => false,
        'rate_limit' => ['attempts' => 3, 'per_minutes' => 1],
        'close_after_days' => null,
        'max_depth' => 3,
        'notify' => true,
        'notify_roles' => [],
        'notify_emails' => [],
        'reply_notifications' => true,
        'prune_spam_after_days' => 30,
    ],

    /*
    |--------------------------------------------------------------------------
    | Revisions
    |--------------------------------------------------------------------------
    |
    | keep: Maximum number of revisions kept per translation.
    |
    */
    'revisions' => ['keep' => 50],

    /*
    |--------------------------------------------------------------------------
    | Activity log
    |--------------------------------------------------------------------------
    |
    | enabled:    Record who created, changed or deleted what (Manage → Activity log).
    | prune_days: What `sunrice:prune-activity` and the admin's Prune button
    |             delete by default: entries older than this many days.
    |
    */
    'activity' => [
        'enabled' => (bool) env('SUNRICE_ACTIVITY_LOG', true),
        'prune_days' => 180,
    ],

    /*
    |--------------------------------------------------------------------------
    | Super admin role
    |--------------------------------------------------------------------------
    |
    | Users with this role bypass every permission check (Gate::before).
    |
    */
    'super_admin_role' => 'Super Admin',

    /*
    |--------------------------------------------------------------------------
    | AI agents (MCP)
    |--------------------------------------------------------------------------
    |
    | An MCP (Model Context Protocol) server so AI agents (Claude, Cursor,
    | ChatGPT…) can manage the site. Agents connect to POST {path} with an
    | access token created in the admin (AI access) or with
    | `php artisan sunrice:mcp-token`, and act with that user's permissions.
    |
    | path:         Endpoint path (outside the admin path).
    | local_user:   Email of the user `php artisan mcp:start sunrice` (stdio,
    |               for agents running on the server) acts as.
    | templates:    Let super admins' agents create and edit templates.
    | commands:     Artisan commands agents may run (with the "Run commands"
    |               permission). Anything else is refused.
    |
    */
    'mcp' => [
        'enabled' => env('SUNRICE_MCP_ENABLED', true),
        'path' => 'mcp',
        'local_user' => env('SUNRICE_MCP_USER'),
        // Super admins' agents may write Blade templates and theme files
        // (Blade runs PHP: turn off where that isn't wanted).
        'templates' => env('SUNRICE_MCP_TEMPLATES', true),
        // read_error_log: recent errors from the Laravel log, secrets masked.
        'error_log' => env('SUNRICE_MCP_ERROR_LOG', true),
        'log_path' => env('SUNRICE_MCP_LOG_PATH'), // default storage/logs
        'commands' => [
            'sunrice:publish-scheduled',
            'sunrice:sync-permissions',
            'sunrice:regenerate-images',
            'sunrice:optimize-images',
            'sunrice:translate',
            'sunrice:orphans',
            'cache:clear',
            'view:clear',
            'config:clear',
            'route:clear',
            'optimize:clear',
        ],
    ],
];
