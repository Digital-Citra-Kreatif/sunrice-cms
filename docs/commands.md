# Artisan commands

Every Sunrice command, what it does and its options. Run
`php artisan <command> --help` for the full signature.

## Setup and upgrades

| Command | What it does |
| --- | --- |
| `sunrice:install` | Publishes config and admin assets, runs migrations, links storage and creates a super admin. `--roles` also creates the default roles; `--no-user` skips the user prompt. |
| `sunrice:publish-assets` | Republishes the prebuilt admin assets to `public/vendor/sunrice`. Run after every package upgrade. |
| `sunrice:sync-permissions` | Creates missing permissions and removes stale ones. Run after adding collections, taxonomies, forms or resources. |
| `sunrice:seed-roles` | Creates the default roles (Administrator, Editor, Author, Translator), or adds new permissions to them. |
| `sunrice:mcp-token {email}` | Creates an access token for AI agents acting as that user (shown once). `--name=`, `--list`, `--revoke=ID`. See [AI agents](ai-agents.md). |
| `sunrice:prune-activity` | Deletes [activity log](activity-log.md) entries older than 180 days (`sunrice.activity.prune_days`); `--days=30` for another age. |
| `sunrice:import-structure {file}` | Creates fieldsets, blueprints, taxonomies, collections, globals, forms, draft entries and menus from a definition file (`.php` returning an array, or `.json`). Safe to rerun; `--dry-run` reports only, `--force` overwrites items that differ. See [Importing structure](content-modeling.md#importing-structure). |
| `sunrice:two-factor {on\|off}` | Turns two-factor (emailed code) login on or off; no argument shows the current state. The way back in if mail breaks while it's on. See [Mail](mail.md#two-factor-login). |

After upgrading the package:

```bash
php artisan sunrice:publish-assets
php artisan migrate
php artisan sunrice:sync-permissions
```

## Languages

| Command | What it does |
| --- | --- |
| `sunrice:translate` | Machine-translates entries, terms, globals, menus and Laravel `lang/` files with Gemini or OpenRouter. See [Machine translation](translation.md). |
| `sunrice:switch-main-language {locale}` | Makes another language the main one and converts existing content. See [Multilingual content](multilingual.md). |

Common `sunrice:translate` runs:

```bash
# Everything into every other language
php artisan sunrice:translate

# Only Indonesian, only the "articles" collection, preview first
php artisan sunrice:translate --to=id --only=entries --collection=articles --dry-run

# Re-translate fields that already have a translation
php artisan sunrice:translate --to=id --force

# Only the Laravel language files
php artisan sunrice:translate --only=lang
```

Options: `--to=*`, `--from=`, `--only=*` (entries, terms, globals,
menus, lang), `--collection=*`, `--force`, `--dry-run`, `--driver=`
(gemini, openrouter), `--model=`. The API key comes from
`GEMINI_API_KEY` or `OPENROUTER_API_KEY`.

`sunrice:switch-main-language` options: `--dry-run` (report blockers
only), `--copy-missing` (give content without that language a copy of
the current main-language content), `--force` (skip confirmation).

## Content

| Command | What it does |
| --- | --- |
| `sunrice:publish-scheduled` | Publishes entries whose scheduled time has passed. The scheduler runs it every minute. |
| `sunrice:rename-field {blueprint} {from} {to}` | Renames a field handle in a blueprint and in all stored entry data. |
| `sunrice:demo-content {count=1000}` | Adds fake published articles to a separate `demo` collection (with a `demo_topics` taxonomy) to see how the site performs with lots of content, and prints pages to try. `--collection=` picks another handle; `--remove` deletes all demo content again (asks first; `--force` skips that). It never touches other collections. See [Caching and performance](caching.md#testing-with-lots-of-content). |
| `sunrice:orphans` | Lists entries and terms kept from deleted collections and taxonomies. `--purge` deletes them permanently (asks first; `--force` skips that), `--handle=` limits it to some handles. See [Content modeling](content-modeling.md#deleting-collections-and-taxonomies). |

## Images

| Command | What it does |
| --- | --- |
| `sunrice:regenerate-images` | Regenerates the configured image sizes for every image asset. `--id=` for one asset. Run after changing `sunrice.assets.image_sizes`. |
| `sunrice:optimize-images` | Resizes and compresses originals in place, keeping backups. See [Assets](assets.md#optimizing-images). |

`sunrice:optimize-images` options: `--id=*`, `--max-width=`,
`--max-height=`, `--quality=`, `--no-backup`, `--dry-run`, `--restore`
(put the backed-up originals back).

## Scheduler

`sunrice:publish-scheduled` (every minute) and pruning old form
submissions (daily) are registered automatically. Add the Laravel
scheduler to cron once:

```
* * * * * php artisan schedule:run
```
