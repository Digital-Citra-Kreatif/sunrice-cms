# Installation

Requirements: PHP 8.3+, Laravel 13, one of SQLite / MySQL / PostgreSQL.

```bash
composer require sunrice/cms
php artisan sunrice:install
```

`sunrice:install` publishes `config/sunrice.php`, publishes the compiled
admin assets to `public/vendor/sunrice`, publishes the
spatie/laravel-permission migration if your app doesn't have the
permission tables yet, runs the migrations (`sunrice_*` tables plus the
permission tables), syncs permissions, creates the `Super Admin` role, and
offers to create a super admin user (`--no-user` skips it). Add `--roles`
to also create the default Administrator, Editor, Author and Translator
roles (see [permissions](permissions.md#default-roles)). It is safe to run
again.

Your user model must use `Spatie\Permission\Traits\HasRoles`. If it
doesn't, the install command adds the trait (and its import) to the
model's file for you, then creates the super admin as usual. It only
edits a writable model file inside your application; otherwise it warns
and skips creating the super admin, so add the trait yourself and run
`sunrice:install` again:

```php
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles;
}
```

Open the admin at `/cms` (configurable via `sunrice.admin.path` /
`SUNRICE_ADMIN_PATH`).

## Scheduler

Add the Laravel scheduler so scheduled entries publish and old
submissions prune:

```
* * * * * php artisan schedule:run
```

## Upgrades

After every package upgrade, republish the compiled admin assets:

```bash
php artisan sunrice:publish-assets
php artisan migrate
php artisan sunrice:sync-permissions
```

No `npm`/`vite` step is required in the host app — the admin ships
prebuilt assets.
