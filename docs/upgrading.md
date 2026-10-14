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

After upgrading from a version without shared translation layouts, run
`php artisan sunrice:upgrade-translations` once (see
[multilingual](multilingual.md#storage-format)). Run it again after
upgrading to the version where terms and globals share the layout too:
until then their translations are still read correctly.

That version also drops the global sets' **Translatable** switch: each
field's own Translatable setting decides instead. A set that wasn't
translatable keeps its values as the main language's; its text fields
are now translatable by default, so switch off any (a phone number, a
code) that must stay the same in every language. Existing term
translations start Ready.

## Breaking changes

See `CHANGELOG.md`. The package follows semver; the 1.x public API is
the `Sunrice` facade/manager, the `sunrice_*` helpers, the Blade
components and the field-type/Resource extension points.
