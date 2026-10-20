<?php

declare(strict_types=1);

namespace Sunrice\Cms\Support;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use LogicException;
use Spatie\Permission\PermissionRegistrar;
use Sunrice\Admin\Panel;

/**
 * The panel's roles, for "also email these roles" settings, and the email
 * addresses of their members.
 *
 * @internal
 */
final class RoleMembers
{
    /** @return array<string, string> role name => name, for a CheckboxList */
    public static function options(): array
    {
        $roles = [];
        foreach (self::roles()->orderBy('name')->pluck('name') as $name) {
            if (is_string($name)) {
                $roles[$name] = $name;
            }
        }

        return $roles;
    }

    /**
     * The addresses of the users who have any of these roles (roles that
     * no longer exist are skipped).
     *
     * @param  list<string>  $names
     * @return list<string>
     */
    public static function emails(array $names): array
    {
        if ($names === []) {
            return [];
        }
        $roles = self::roles()->whereIn('name', $names)->get();
        if ($roles->isEmpty()) {
            return [];
        }
        // Users with the role, through spatie/laravel-permission's scope.
        $users = app(Panel::class)->getUserModel()::query()->__call('role', [$roles]);
        $emails = [];
        foreach ($users instanceof Builder ? $users->get() : [] as $user) {
            $email = $user->getAttribute('email');
            if (is_string($email) && filter_var($email, FILTER_VALIDATE_EMAIL) !== false) {
                $emails[] = $email;
            }
        }

        return array_values(array_unique($emails));
    }

    /** @return Builder<Model> the panel guard's roles */
    private static function roles(): Builder
    {
        $class = app(PermissionRegistrar::class)->getRoleClass();
        if (! is_subclass_of($class, Model::class)) {
            throw new LogicException('The permission package\'s role class must be an Eloquent model.');
        }

        return $class::query()->where('guard_name', app(Panel::class)->getGuard());
    }
}
