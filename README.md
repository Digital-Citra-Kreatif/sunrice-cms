# sunrice/cms

A CMS for Laravel, built as a plugin for [`sunrice/admin`](https://github.com/Digital-Citra-Kreatif/sunrice/tree/main/packages/admin): editors write content in the panel, and the CMS serves it as your website, in as many languages as you need.

Developed in [Digital-Citra-Kreatif/sunrice](https://github.com/Digital-Citra-Kreatif/sunrice); this package's own repository is a read-only copy. In development, before 1.0.

## Features

- **Collections and entries**: drafts, publishing now or on a date, revisions, previews and drafts on the site, manual order and nesting, duplicates, the trash, per-entry blueprints, references ("used by").
- **Blueprints and fieldsets** built in the panel: text, rich text, numbers, dates, links, media, entries, terms, groups, repeaters, flexible blocks, and field types of your own.
- **Languages**: a translation per language, shared and translated fields, outdated-translation badges, machine translation, a fallback to the main language.
- **Taxonomies** with term pages, **globals**, **menus**, **forms** with submissions and notifications, **comments** with moderation.
- **The site**: URLs per collection, listing and term pages, Blade templates and components, SEO tags, structured data, a sitemap, redirects, site search, site code, caching (with an optional whole-page cache).
- **Structure tools**: export and import, renaming fields, leftovers, demo content; **AI tools** for content.

## Installing

```bash
composer require sunrice/cms
```

Add `Sunrice\Cms\CmsPlugin::make()` to your panel (`$panel->plugin(CmsPlugin::make())`) and run `php artisan sunrice:install --roles`. Starter templates for the site: `php artisan vendor:publish --tag=sunrice-cms-templates`. The full steps: [Installation](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/packages/admin/docs/installation.md).

## Admin assets

The CMS's admin pages are a JavaScript bundle in `dist/`, served from `public/vendor/sunrice-cms`. **After installing or updating, run:**

```bash
php artisan sunrice:assets
```

It publishes the panel's assets and the CMS's (and other plugins') bundles, and belongs in your deploy script. With the package installed from a path (a symlinked path repository), a `git pull` doesn't publish anything: run it then too. Until it has run, the admin keeps the old scripts, under the same URLs (their `?v=` comes from the published copy), and super admins see a warning saying to run it; once it has, open admin tabs load the new code on their next click. `php artisan vendor:publish --tag=sunrice-cms-assets --force` (also part of `laravel-assets`, which Laravel apps publish on `composer update`) still works.

## Documentation

- [Collections and entries](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/packages/cms/docs/collections.md), [Fields](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/packages/cms/docs/fields.md), [The site](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/packages/cms/docs/site.md), [Helpers and the `Cms` facade](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/packages/cms/docs/helpers.md)
- [Configuration](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/packages/cms/docs/configuration.md), [Commands](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/packages/cms/docs/commands.md)
- [All the docs](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/docs/README.md) and [Upgrading](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/docs/upgrading.md)
