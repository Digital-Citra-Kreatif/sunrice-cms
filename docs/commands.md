# Commands

The CMS's Artisan commands. The panel's own (installing, roles and permissions, accounts, AI tokens, media, assets, the activity log) are in [the panel's commands](../../admin/docs/commands.md).

| Command | What it does |
| --- | --- |
| `sunrice:publish-scheduled` | Announces entries whose scheduled publish time came: clears the site's caches and fires `EntryPublished` (`scheduled`). The scheduler runs it every minute; see [caching](caching.md). |
| `sunrice:cache-preload [--limit=] [--locale=] [--now]` | Preloads the whole-page cache with the site's pages (the sitemap's, but those Settings → Cache leaves out), in queued jobs, or here and now with `--now`; `--limit` caps the pages, `--locale` keeps to one language. Refused while a preload runs or whole pages aren't kept. The scheduler runs it hourly or daily when Settings → Cache says so; see [preloading](caching.md#preloading). |
| `sunrice:rename-field {definition} {old} {new} [--dry-run]` | Renames a blueprint's or fieldset's field (`fieldset:cta`, dot paths like `hero.title`) and moves the values stored under it. See [renaming a field](structure.md#renaming-a-field). |
| `sunrice:references [--dry-run]` | Rebuilds which entries and terms content points at (entries, terms, global sets; drafts and live versions) and which media files it uses, from what is stored, in chunks; reports the counts. See [references](structure.md#references). |
| `sunrice:export-structure {file} [--entries] [--settings]` | Writes fieldsets, blueprints, collections (with listing pages), taxonomies, global sets, forms, menus and redirects as JSON; `--entries` adds terms, entries and global values; `--settings` adds Settings → Site's values (name, description, logo, homepage…) and Settings → SEO's (share image, X account, structured data). |
| `sunrice:import-structure {file} [--dry-run] [--force] [--replace-menus] [--skip-other-languages]` | Creates or updates, by handle, what such a file describes; `--force` lets fieldsets and blueprints lose fields. Menus that exist keep their links and get only the file's missing ones, unless `--replace-menus`. Texts in languages the site lacks stop it up front, unless `--skip-other-languages` leaves them out. Fails (and saves nothing) on an invalid item, or when something was refused. See [exporting and importing](structure.md#exporting-and-importing-structure). |
| `sunrice:orphans [--purge] [--force]` | Lists deleted collections and taxonomies with what they keep, media whose file is missing, and fields pointing at missing entries or terms; `--purge` deletes the deleted collections and taxonomies permanently (asking first unless `--force`). See [leftovers](structure.md#leftovers). |
| `sunrice:translate [--to=*] [--from=] [--only=*] [--collection=*] [--force] [--dry-run]` | Machine-translates content into the other languages: entries into their drafts, and terms, globals, menus, listing and index pages and the site's texts (`--only=entries,terms,globals,menus,pages,texts`), or the app's language files (`--only=lang`). Needs a driver in `sunrice-cms.translation`. See [Machine translation](translation.md). |
| `sunrice:switch-main-language {locale} [--dry-run] [--copy-missing] [--force]` | Makes another content language the main one, moving the shared values, addresses and redirects. Back up the database first. See [switching the main language](collections.md#switching-the-main-language). |
| `sunrice:scaffold-collections [--pages] [--posts]` | Makes the Pages and Posts collections with their blueprints (both, or those named), skipping any the site has; `sunrice:install` offers them. See [Pages and Posts to start with](collections.md#pages-and-posts-to-start-with). |
| `sunrice:demo-content [--fresh]` | Fills the site with a small demo; `--fresh` deletes the demo's structure first. See [demo content](structure.md#demo-content). |

The CMS also schedules Laravel's `model:prune` daily for old form submissions and comments ([forms](forms.md), [comments](comments.md)).

## Panel commands

See [the panel's commands](../../admin/docs/commands.md): `sunrice:install`, `sunrice:make-admin`, `sunrice:sync-permissions`, `sunrice:roles`, `sunrice:two-factor`, `sunrice:unlock`, `sunrice:ai-token`, `mcp:start sunrice`, `sunrice:media-sizes`, `sunrice:optimize-images`, `sunrice:assets` and `sunrice:activity-prune`.
