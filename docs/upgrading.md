# Upgrading

```bash
composer update sunrice/cms
php artisan sunrice:publish-assets
php artisan migrate
php artisan sunrice:sync-permissions
```

- `sunrice:publish-assets` republishes the compiled admin bundle to
  `public/vendor/sunrice` — no npm required in the host app.
- `sunrice:sync-permissions` adds permissions for new collections,
  taxonomies, forms and resources, and removes stale ones.

## Breaking changes

See `CHANGELOG.md`. The package follows semver; the 1.x public API is
the `Sunrice` facade/manager, the `sunrice_*` helpers, the Blade
components and the field-type/Resource extension points.
