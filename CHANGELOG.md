# Changelog

## Unreleased

- Fixed: the admin was blank while the site's own Vite dev server was
  running (`npm run dev` for the site's CSS and scripts). It asked that
  server for its script. It now always loads its own published bundle.
- Activity log: a **Source** column and filter (Admin, AI agent, System).
  Changes made through an AI agent show the access token's name
  (`AI agent · Claude Desktop`), and reordering through the agent's
  `reorder` tool is logged too. `ActivityLogger::withSource()` marks changes
  from your own code. Run `php artisan migrate`.
- AI agents: new `get_activity` tool reads the activity log (with
  "View the activity log"; `mine: true` for the token's own changes), and
  the agent is told its changes are logged. `read_docs` now needs "Read the
  developer docs", like the admin's Docs page.
- **Activity log** (Manage → Activity log): who created, changed or deleted
  entries, terms, structure, menus, globals, assets, forms, users, roles,
  resources and site settings, with what changed. Filter by period, action,
  type and user; search by name. Permissions `sunrice.activity.view` and
  `sunrice.activity.prune`. Old entries are deleted with the Prune button
  or `php artisan sunrice:prune-activity` (default: older than 180 days,
  `--days=` for another age). Run `php artisan migrate` and
  `php artisan sunrice:sync-permissions`.
- **Packages can extend the admin**: `Sunrice::adminRoutes()` adds signed-in
  admin routes for a package's own screens, `window.Sunrice.registerPage()`
  registers their React pages (with Inertia, the admin's UI components,
  `DataTable`, `FieldRenderer`, `adminUrl()` and `useBreadcrumbs()` on
  `window.Sunrice`, API version 2), and `Sunrice::registerPermission()` adds
  a package's permissions to the role editor. New guide: Writing a package.
- **Resource actions**: `Resource::actions()` adds buttons to a record's
  editor ("Mark as paid", "Download invoice") and, with `bulk()`, to the
  list's selection, with confirmation, visibility, permissions and
  messages.
- **Captcha for forms**: Cloudflare Turnstile, Google reCAPTCHA or hCaptcha.
  Put the keys in `.env` (`SUNRICE_CAPTCHA_PROVIDER`,
  `SUNRICE_CAPTCHA_SITE_KEY`, `SUNRICE_CAPTCHA_SECRET_KEY`) and turn on
  "Require captcha" per form. `<x-sunrice::form>` adds the widget, and
  submissions are checked with the provider before they're saved.
- **Custom field components without rebuilding the admin**: list scripts in
  `sunrice.admin.scripts` (or `Sunrice::registerAdminScript()`) and register
  React components with `window.Sunrice.registerField(type, Component)`;
  `window.Sunrice` also exposes the admin's React, UI primitives, `fetchJson`
  and `toast`. The custom fields guide now leads with `CustomField` (reuse a
  built-in control, no JavaScript) and documents the admin-script route. A
  field type without an admin control shows a helpful notice.
- Entry, term and asset pickers no longer offer items that are already
  chosen in the field (remove a chip to pick it again).
- **Reverse relationships** in `EntryQuery`: `whereEntry('related_articles',
  $entry)` finds entries whose entries field links to an entry, and
  `whereFieldTerm('industries', $term)` (model, id or slug; optional
  `includeChildren`) finds entries whose terms field holds a term.
- **Form file uploads**: the form builder sets accepted file types (grouped
  presets plus custom extensions) and a maximum size in MB, and shows the
  server's PHP upload limit. Upload errors have readable messages in English
  and Indonesian (no more raw `validation.mimes`); the file input gets an
  `accept` attribute and a hint. Files that could run as code are always
  refused. Submission downloads stream through the storage disk (local or
  cloud) and report a missing file clearly.
- **Deleting a collection or taxonomy keeps its content**, hidden from
  the admin and the site. Creating one with the same handle restores it with
  its entries or terms (and roles keep their permissions).
  `php artisan sunrice:orphans` lists what's kept; `--purge` deletes it for
  good. Run `php artisan migrate` (adds `deleted_at` to collections and
  taxonomies).
- Editing a collection, taxonomy, blueprint or fieldset handle shows a
  warning explaining what the change can break.
- **Security fixes** (from a code review):
  - Submission downloads only serve uploads of file fields, never a path
    typed into another field, and refuse `..` in paths.
  - SVG uploads containing scripts, event handlers, `javascript:` links or
    entities are refused (they'd run on the site's domain when opened).
  - Passwords set in Users are hashed by Sunrice itself, even when the
    host's User model has no `hashed` cast.
  - Menu item and Link field URLs only accept http(s), mailto, tel and
    relative links; `javascript:` and similar saved earlier aren't printed.
  - CSV exports prefix cells starting with `= + - @` so spreadsheets don't
    run them as formulas.
  - Blueprint/fieldset field handles allow only letters, numbers, `-` and
    `_`; `JsonField` refuses other paths and unknown operators.
  - Password reset requests answer the same whether or not the email has
    an account.
- Entry and term slugs must be lowercase kebab-case, not a language code or
  the admin path (an existing slug can still be saved unchanged).
- Menu items can't be moved under their own sub-items (they used to vanish).
- Form file fields default to a 10 MB limit (`sunrice.forms.upload_max_kb`).
- The sitemap streams entries and terms instead of loading them all.
- **Two-factor login** — Settings → Security can require a 6-digit code,
  emailed after the password, for every admin login (off by default).
  Codes expire after 10 minutes; wrong guesses are limited.
  `php artisan sunrice:two-factor off` turns it off if mail stops working.
- **Test email** — Settings → Email shows the mail setup in use and sends
  a test email to any address, showing the server's error if it fails.
- **Docs in the admin** — Manage → Docs shows the developer guides
  (templates, artisan commands, languages, mail/SMTP and more) to users
  with the new `sunrice.docs.view` permission. New guides: artisan commands
  and mail (SMTP). `php artisan sunrice:sync-permissions` creates the
  permission and gives it to the existing Administrator role (new global
  permissions now go to the default roles whose patterns cover them).
- **Site settings** — Manage → Settings edits the site name, description,
  timezone, homepage, languages (main, available, names), site-wide
  noindex (also empties the sitemap), X/Twitter handle and default share
  image. Values override the config at boot.
- **Code snippets** — add tracking or other code to the head, body start
  or body end from Settings; layouts print them with
  `<x-sunrice::code position="head|body_start|body_end" />` (already in the
  starter layout and fallback views).
- Fixed: the asset field crashed once a single-asset field had a value.
- Menus: the item editor can now link to a collection archive (it was
  saved without its target and never showed), pick a term from a taxonomy
  (instead of typing an id), set a label per language (empty uses the linked
  title), and edit existing items. Targets are validated for their type.
- Taxonomies: attach collections from the taxonomy form, and switch term
  archive pages on there (there was no way to before). Term pages default
  to one per attached collection at `/{collection}/{taxonomy}/{slug}`,
  listing that collection's entries; a custom route gives one page across
  collections. `$term->urlIn($collection)` links to a collection's page.
- Collections: the route prefix field now takes a prefix (`blog` →
  `/blog/{slug}`), a full pattern, or `/` for the site root; left empty it
  follows the handle. Two collections can no longer share a URL pattern.
  Fixed: a plain prefix like `pages` made entries unreachable, and entry
  links used `/{slug}` while the router served `/{handle}/{slug}` when no
  route was set. Taxonomy routes accept prefixes the same way.
- Collections: choose the sidebar icon in the collection settings.
- **Granular permissions** — the `sunrice.manage-*` permissions are replaced
  by view/create/edit/delete permissions per area (collections, blueprints,
  fieldsets, taxonomies, menus, globals, users, roles), `forms.create` /
  `forms.delete` and `assets.edit`. `sunrice:sync-permissions` hands the new
  permissions to every role and user that held the old ones.
- **Translate permission** — `sunrice.entries.{id}.translate` allows editing
  an entry's other-language versions only (no main language, publishing or
  marking Ready).
- **Default roles** — `php artisan sunrice:seed-roles` (or
  `sunrice:install --roles`) creates Administrator, Editor, Author and
  Translator; rerun it after adding collections. Seeder:
  `Sunrice\Database\Seeders\RolesSeeder`.
- Fixed: users who could manage users could edit or delete super admins and
  hand out the super-admin role; role managers could rename or delete the
  super-admin role. Reordering collections had no permission check, and
  reordering entries or terms only needed view access (and could touch
  other collections' entries). The Taxonomies sidebar section never showed
  for non-super-admins.
- Fixed: `sunrice:install` failed on a fresh app because the
  spatie/laravel-permission tables were never created. It now publishes
  spatie's migration when the tables are missing, before migrating. It also
  no longer creates a super admin user that can't hold the Super Admin role
  (user model without `HasRoles`); it warns and skips instead.
- **Shared layout, translated text** — secondary languages now store only
  their translated text and render inside the main language's layout, so
  adding, reordering or hiding blocks and swapping images happens once for
  every language. Fields have a **Translatable** switch in the blueprint
  builder (text types on by default); shared fields are read-only when
  editing a translation. Run `php artisan sunrice:upgrade-translations` once
  to convert existing translations (old ones still render meanwhile).
- Repeater rows and flexible blocks get an optional **key** and a **Show**
  switch: hidden items are skipped on the site, and templates can fetch an
  item with `$entry->get('sections')->byKey('hero')`. Rows now carry a
  stable `_id`.
- Fixed: the blueprint builder stored group/repeater children and flexible
  block types where the server didn't read them, type settings (max, min,
  multiple…) didn't save, select fields had no options setting, and the
  entry editor never received the fieldsets of flexible fields.
- Fixed: preview rendered the draft's top-level keys as field data and
  showed the main language for translations that weren't Ready yet.

- **Starter templates** — `php artisan vendor:publish --tag=sunrice-templates`
  publishes a layout, header/footer, single, archive, term archive, an
  articles override and flexible-content block templates that show how to
  read entries, fields, assets, globals, menus, terms and forms.
- `Term::get()` reads taxonomy-blueprint fields, hydrated like entry fields.
- Menus: the active item is worked out per request instead of being cached
  with the menu, and home links (`/`, `/en`) only match their own page.
- SEO: per-entry "Hide from search engines" (robots `noindex`, also removed
  from the sitemap), a site-wide `SUNRICE_NOINDEX` switch, Twitter card tags,
  `og:type`/`og:site_name`, and absolute canonical, `og:url`, hreflang and
  sitemap URLs.
- `sunrice:translate` machine-translates entries, terms, globals, menu labels
  and Laravel language files with Gemini (default) or OpenRouter. Only
  missing translations are filled in unless `--force`; entry translations
  are saved as drafts for review.
- `sunrice:optimize-images` resizes and recompresses image assets in place
  (defaults in `sunrice.assets.optimize`, overridable per run), backs up the
  originals to the private `local` disk by default and can `--restore` them.
- Admin password reset emails now link to the CMS reset page instead of the
  host app's `password.reset` route.
- The package's fallback `show` view no longer prints plain-text fields
  unescaped.
- **Admin UI refresh** — components regenerated with the official shadcn/ui
  CLI (new-york, Tailwind 4) and the shell rebuilt on the layout patterns of
  Laravel's React starter kit: collapsible inset sidebar with icons and a
  mobile drawer, user menu with light/dark/system appearance, breadcrumbs,
  Instrument Sans, and a redesigned login, dashboard, data table and entry
  editor.

## 1.0.0

Initial release of Sunrice CMS — a Laravel package CMS with:

- **Content domain** — collections, blueprints, fieldsets, entries with
  whole-entity translations, Draft/Ready per translation, draft/publish
  with revisions, scheduled publishing, slugs + automatic redirects,
  trash/restore, taxonomies (hierarchical terms), menus, globals and
  template parts, asset library with image sizes and usage tracking,
  public forms with honeypot/rate-limit/upload handling and pruning.
- **Admin** — Inertia + React + Tailwind panel at `/cms`: structure
  manager (collections/blueprints/fieldsets), entry editor with
  conditional fields, taxonomy/menu/global editors, form builder,
  submissions browser + CSV export, asset library with drag-drop
  upload, users/roles/permissions, settings, model resources for
  host-app models, localized UI, table preferences.
- **Frontend** — Blade rendering with template hierarchy +
  `resolveTemplateUsing` hooks, `<x-sunrice::entries>`,
  `<x-sunrice::seo>` (canonical/hreflang/OG), `<x-sunrice::form>`,
  signed draft previews, sitemap.xml, per-locale URLs with whole-entity
  fallback.
- **Platform** — permission system with entity scopes, content-version
  caching with automatic invalidation, optional full-page cache,
  `sunrice:install` / `sync-permissions` / `regenerate-images` /
  `publish-assets` / `rename-field` / `publish-scheduled` commands.

## Unreleased
