<?php

declare(strict_types=1);

namespace Sunrice\Http\Controllers\Admin;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Sunrice\Actions\Users\DeleteUser;
use Sunrice\Activity\ActivityLogger;
use Sunrice\Admin\Table\Column;
use Sunrice\Admin\Table\TableQuery;
use Sunrice\Models\Asset;
use Sunrice\Models\Entry;
use Sunrice\Sunrice;

class UsersController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request): Response
    {
        $model = config('sunrice.auth.user_model');
        $this->authorize('viewAny', $model);

        $table = TableQuery::for(app(Sunrice::class)->usersQuery()->with('roles:id,name'))
            ->searchable(['name', 'email'])
            ->filter('role', fn (Builder $q, mixed $value) => $value === 'none'
                ? $q->whereDoesntHave('roles')
                : $q->whereHas('roles', fn (Builder $r) => $r->where('name', $value)))
            ->sortable(['name', 'email', 'created_at'])
            ->apply($request);
        if ($table->meta()['sort'] === null) {
            $table->builder()->orderBy('name')->orderBy((new $model)->getKeyName());
        }
        $rows = $table->defaultPerPage(TablePreferencesController::perPageFor($request, 'users', 25))->paginate($request);

        // What each listed user created, for the delete dialog.
        $ids = $rows->getCollection()->map(fn (Model $u) => $u->getKey())->all();
        $entries = Entry::query()->whereIn('author_id', $ids)->groupBy('author_id')->selectRaw('author_id, count(*) as total')->pluck('total', 'author_id');
        $assets = Asset::query()->whereIn('uploaded_by', $ids)->groupBy('uploaded_by')->selectRaw('uploaded_by, count(*) as total')->pluck('total', 'uploaded_by');
        $roles = Role::query()->orderBy('name')->get(['id', 'name']);

        return Inertia::render('Users/Index', [
            'columns' => [
                new Column('name', 'Name', sortable: true),
                new Column('email', 'Email', sortable: true),
                new Column('roles', 'Roles'),
            ],
            'rows' => $rows->through(fn (Model $u): array => [
                'id' => $u->getKey(),
                'name' => $u->getAttribute('name'),
                'email' => $u->getAttribute('email'),
                'roles' => $u->getAttribute('roles')->pluck('name'),
                'content' => ['entries' => (int) ($entries[$u->getKey()] ?? 0), 'assets' => (int) ($assets[$u->getKey()] ?? 0)],
                // What the current user may do to that account (super admins are protected).
                'can' => [
                    'update' => $request->user()->can('update', $u),
                    'delete' => $request->user()->can('delete', $u),
                ],
            ]),
            'meta' => $table->meta(),
            'filters' => [[
                'key' => 'role',
                'label' => 'Role',
                'type' => 'select',
                'options' => [
                    ...$roles->map(fn (Role $r) => ['value' => $r->name, 'label' => $r->name])->all(),
                    ['value' => 'none', 'label' => 'No role'],
                ],
            ]],
            'roles' => $roles,
            // Who could receive a deleted user's content.
            'others' => static::others(),
        ]);
    }

    /**
     * Accounts that can receive a deleted user's content: the users the
     * Users screen lists (Sunrice::usersQueryUsing() scopes applied).
     *
     * @return Collection<int, array{id: mixed, name: mixed, email: mixed}>
     */
    protected static function others(mixed $except = null): Collection
    {
        return app(Sunrice::class)->usersQuery()
            ->when($except !== null, fn (Builder $q) => $q->whereKeyNot($except))
            ->orderBy('name')
            ->get()
            ->map(fn (Model $u) => ['id' => $u->getKey(), 'name' => $u->getAttribute('name'), 'email' => $u->getAttribute('email')]);
    }

    public function create(): Response
    {
        $this->authorize('create', config('sunrice.auth.user_model'));

        return $this->editor(null);
    }

    public function edit(int|string $user): Response
    {
        $model = config('sunrice.auth.user_model');
        $user = $model::findOrFail($user);
        $this->authorize('update', $user);

        return $this->editor($user);
    }

    /** The user editor page (create and edit). */
    protected function editor(?Model $user): Response
    {
        return Inertia::render('Users/Edit', [
            'user' => $user === null ? null : [
                'id' => $user->getKey(),
                'name' => $user->getAttribute('name'),
                'email' => $user->getAttribute('email'),
                'roles' => $user->getAttribute('roles')->pluck('name'),
                'content' => DeleteUser::counts($user),
                'is_self' => (string) $user->getKey() === (string) request()->user()->getAuthIdentifier(),
            ],
            'roles' => Role::query()->orderBy('name')->get(['id', 'name']),
            // Who could receive this user's content when deleting them.
            'others' => $user === null ? [] : static::others($user->getKey()),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('create', config('sunrice.auth.user_model'));
        $model = config('sunrice.auth.user_model');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique((new $model)->getTable(), 'email')],
            'password' => ['required', 'confirmed', Password::defaults()],
            'roles' => ['array'],
            'roles.*' => ['string', Rule::exists('roles', 'name')],
        ]);

        $this->guardSuperAdminRole($request, [], $validated['roles'] ?? []);

        // Hashed here: the host's User model may not have the "hashed"
        // cast (which skips values that are already hashed anyway).
        $validated['password'] = Hash::make($validated['password']);
        $model = config('sunrice.auth.user_model');
        $user = $model::create(Arr::except($validated, 'roles'));
        $user->syncRoles($validated['roles'] ?? []);
        app(ActivityLogger::class)->record('updated', $user, ['changes' => ['roles']]);

        return redirect()->route('sunrice.admin.users.index')->with('success', "User {$user->email} created.");
    }

    public function update(Request $request, int|string $user): RedirectResponse
    {
        $model = config('sunrice.auth.user_model');
        $user = $model::findOrFail($user);
        $this->authorize('update', $user);

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'email', 'max:255', Rule::unique($user->getTable(), 'email')->ignore($user->getKey(), $user->getKeyName())],
            'password' => ['nullable', 'confirmed', Password::defaults()],
            'roles' => ['sometimes', 'array'],
            'roles.*' => ['string', Rule::exists('roles', 'name')],
        ]);

        if (empty($validated['password'])) {
            unset($validated['password']);
        } else {
            $validated['password'] = Hash::make($validated['password']);
        }
        // Check the role change before saving anything, so a refused
        // change doesn't leave the other fields half-saved.
        if (isset($validated['roles'])) {
            $this->guardSuperAdminRole($request, $user->roles->pluck('name')->all(), $validated['roles']);
        }

        $user->update(Arr::except($validated, 'roles'));

        if (isset($validated['roles'])) {
            $before = $user->roles->pluck('name')->sort()->values()->all();
            $user->syncRoles($validated['roles']);
            if ($user->refresh()->roles->pluck('name')->sort()->values()->all() !== $before) {
                app(ActivityLogger::class)->record('updated', $user, ['changes' => ['roles']]);
            }
        }

        return back()->with('success', 'User saved.');
    }

    public function destroy(Request $request, int|string $user, DeleteUser $delete): RedirectResponse
    {
        $model = config('sunrice.auth.user_model');
        $user = $model::findOrFail($user);
        if ((string) $user->getKey() === (string) $request->user()->getAuthIdentifier()) {
            return back()->with('error', 'You cannot delete yourself.');
        }
        $this->authorize('delete', $user);

        $validated = $request->validate([
            'content' => ['nullable', Rule::in(DeleteUser::MODES)],
            'reassign_to' => ['nullable', 'required_if:content,reassign'],
        ]);
        $reassignTo = ($validated['content'] ?? null) === 'reassign'
            ? app(Sunrice::class)->usersQuery()->find($validated['reassign_to'])
            : null;
        if (($validated['content'] ?? null) === 'reassign' && $reassignTo === null) {
            return back()->withErrors(['reassign_to' => 'Choose another user to receive the content.']);
        }

        $delete->handle($user, $validated['content'] ?? 'keep', $reassignTo);

        return redirect()->route('sunrice.admin.users.index')->with('success', match ($validated['content'] ?? 'keep') {
            'reassign' => "User deleted. Their content now belongs to {$reassignTo?->getAttribute('name')}.",
            'delete' => 'User deleted and their entries moved to the trash.',
            default => 'User deleted. Their content was kept without an author.',
        });
    }

    /**
     * Only a super admin may give or take away the super-admin role.
     *
     * @param  array<int, string>  $before
     * @param  array<int, string>  $after
     */
    protected function guardSuperAdminRole(Request $request, array $before, array $after): void
    {
        $role = config('sunrice.super_admin_role');
        if ($role === null || in_array($role, $before, true) === in_array($role, $after, true)) {
            return;
        }

        if (! $request->user()->can('assignSuperAdmin', config('sunrice.auth.user_model'))) {
            throw ValidationException::withMessages(['roles' => 'Only a super admin can change who is a super admin.']);
        }
    }
}
