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

Add `Sunrice\Cms\CmsPlugin::make()` to your panel (`$panel->plugin(CmsPlugin::make())`) and run `php artisan sunrice:install --roles`. Starter templates for the site: `php artisan vendor:publish --tag=sunrice-cms-templates`. The full steps: [Installation](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/docs/admin/installation.md).

## Admin assets

The CMS's admin pages are a JavaScript bundle in `dist/`. Publish it after installing or updating (Laravel apps publish `laravel-assets` on `composer update` already):

```bash
php artisan vendor:publish --tag=sunrice-cms-assets --force
```

## Documentation

- [Collections and entries](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/docs/cms/collections.md), [Fields](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/docs/cms/fields.md), [The site](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/docs/cms/site.md), [Helpers and the `Cms` facade](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/docs/cms/helpers.md)
- [Configuration](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/docs/cms/configuration.md), [Commands](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/docs/cms/commands.md)
- [All the docs](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/docs/README.md) and [Upgrading](https://github.com/Digital-Citra-Kreatif/sunrice/blob/main/docs/upgrading.md)
