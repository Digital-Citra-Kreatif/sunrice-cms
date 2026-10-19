# sunrice/cms

A CMS for Laravel, built as a plugin for [`sunrice/admin`](../admin): collections, entries, taxonomies, globals, menus, forms, multilingual content and the site side.

In early development. Developed in [Digital-Citra-Kreatif/sunrice](https://github.com/Digital-Citra-Kreatif/sunrice); this package's own repository is a read-only copy.

## Admin assets

The CMS's admin pages are a JavaScript bundle in `dist/`. Publish it after installing or updating (Laravel apps publish `laravel-assets` on `composer update` already):

```bash
php artisan vendor:publish --tag=sunrice-cms-assets --force
```
