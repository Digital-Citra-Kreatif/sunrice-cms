<?php

declare(strict_types=1);

namespace Sunrice\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Sunrice\Admin\Navigation;
use Sunrice\Sunrice;
use Sunrice\Support\Branding;
use Sunrice\Support\Locales;

class HandleSunriceInertiaRequests extends Middleware
{
    protected $rootView = 'sunrice::app';

    /**
     * Asset version: md5 of the built manifest, so editors get fresh
     * assets after each deploy.
     */
    public function version(Request $request): ?string
    {
        foreach ([public_path('vendor/sunrice/manifest.json'), __DIR__.'/../../../dist/manifest.json'] as $manifest) {
            if (is_file($manifest)) {
                return md5_file($manifest) ?: null;
            }
        }

        return null;
    }

    /**
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user(config('sunrice.auth.guard'));

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user === null ? null : [
                    'id' => $user->getAuthIdentifier(),
                    'name' => $user->name ?? null,
                    'email' => $user->email ?? null,
                ],
            ],
            'permissions' => fn () => $user === null
                ? []
                : ($this->isSuperAdmin($user) ? ['*'] : $user->getAllPermissions()->pluck('name')->all()),
            'navigation' => fn () => $user === null ? [] : app(Navigation::class)->for($user),
            'settingsTabs' => fn () => app(Sunrice::class)->settingsTabs($user),
            'branding' => fn () => Branding::shared(),
            'locales' => fn () => [
                'main' => Locales::main(),
                'available' => Locales::available(),
                'names' => Locales::names(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                // Changes on every flashed message, so saving twice with the
                // same text still shows a toast each time.
                'id' => fn () => $request->session()->has('success') || $request->session()->has('error')
                    ? bin2hex(random_bytes(4))
                    : null,
            ],
            'adminPath' => config('sunrice.admin.path', 'cms'),
        ]);
    }

    protected function isSuperAdmin(mixed $user): bool
    {
        $role = config('sunrice.super_admin_role');

        return $role !== null && method_exists($user, 'hasRole') && $user->hasRole($role);
    }
}
