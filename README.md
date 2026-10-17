# Sunrice CMS

An easy to set up and extend CMS for Laravel, built as a package — collections, blueprints, fieldsets, taxonomies, navigation, globals, assets and forms, with draft/publish workflow, translations and SEO, in the spirit of Statamic and WordPress ACF.

## Requirements

- PHP 8.3 or newer
- Laravel 13
- sqlite, MySQL or PostgreSQL

## Quick start

```bash
composer require sunrice/cms
php artisan sunrice:install
```

The installer publishes the config and the prebuilt admin assets, runs
the migrations, creates the `Super Admin` role and offers to create a
super admin user. Open the admin at `/cms` (set `SUNRICE_ADMIN_PATH` to
change it).

Your user model needs `Spatie\Permission\Traits\HasRoles` — the
installer adds it to your model if it is missing. Add a scheduler entry for scheduled
publishing and submission pruning: `* * * * * php artisan schedule:run`.

After upgrades: `php artisan sunrice:publish-assets && php artisan migrate && php artisan sunrice:sync-permissions`.

## Documentation

| Topic | Doc |
| --- | --- |
| Install & configure | [docs/installation.md](docs/installation.md), [docs/configuration.md](docs/configuration.md), [docs/commands.md](docs/commands.md) |
| Modeling content | [docs/content-modeling.md](docs/content-modeling.md), [docs/custom-fields.md](docs/custom-fields.md) |
| Frontend | [docs/templates.md](docs/templates.md), [docs/blade-components.md](docs/blade-components.md), [docs/helpers.md](docs/helpers.md) |
| Locales | [docs/multilingual.md](docs/multilingual.md), [docs/translation.md](docs/translation.md) |
| Admin extras | [docs/extending.md](docs/extending.md), [docs/resources.md](docs/resources.md), [docs/permissions.md](docs/permissions.md), [docs/forms.md](docs/forms.md), [docs/assets.md](docs/assets.md) |
| Ops | [docs/mail.md](docs/mail.md), [docs/caching.md](docs/caching.md), [docs/upgrading.md](docs/upgrading.md) |

The same guides are readable inside the admin under **Manage → Docs**
(permission `sunrice.docs.view`).

The full product contract lives in [`SPEC.md`](SPEC.md); the build plan
in [`EXECUTION_PLAN.md`](EXECUTION_PLAN.md); contributor/agent rules in
[`AGENTS.md`](AGENTS.md).

## Developing the package

The repository includes a Testbench workbench app for trying the admin
without a host application:

```bash
composer install
npm install && npm run build          # admin assets into dist/
vendor/bin/testbench workbench:build  # publish assets, fresh sqlite DB, seed
vendor/bin/testbench serve            # http://127.0.0.1:8000/cms
```

Sign in as `admin@example.com` / `password`. `workbench:build` resets
the database; re-run it (or `vendor/bin/testbench sunrice:publish-assets`)
after `npm run build`. Tests: `vendor/bin/pest`; frontend component checks:
`npm run test:frontend`; code style: `vendor/bin/pint`.

## License

MIT.
