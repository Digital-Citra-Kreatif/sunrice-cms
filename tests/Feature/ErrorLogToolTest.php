<?php

declare(strict_types=1);

use Illuminate\Support\Facades\File;
use Laravel\Mcp\Server\Testing\TestResponse;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Sunrice\Mcp\SunriceServer;
use Sunrice\Mcp\Tools\ReadErrorLog;
use Sunrice\Permissions\SyncPermissions;
use Workbench\App\Models\User;

/** The tool's JSON, or ['error' => text]. */
function errorLog(mixed $user, array $args = []): array
{
    $result = (new ReflectionProperty(TestResponse::class, 'response'))
        ->getValue(SunriceServer::actingAs($user)->tool(ReadErrorLog::class, $args))->toArray()['result'];
    $text = (string) ($result['content'][0]['text'] ?? '');

    return ($result['isError'] ?? false) ? ['error' => $text] : (array) json_decode($text, true);
}

beforeEach(function () {
    $this->admin = actingAsSuperAdmin();
    $this->logs = sys_get_temp_dir().'/sunrice-logs-'.uniqid();
    File::ensureDirectoryExists($this->logs);
    config(['sunrice.mcp.log_path' => $this->logs]);

    $base = base_path();
    $exception = fn (string $at, string $message) => "[{$at}] production.ERROR: {$message} {\"userId\":1,\"exception\":\"[object] (Illuminate\\\\Database\\\\QueryException(code: 42S22): {$message} at {$base}/vendor/laravel/framework/src/Illuminate/Database/Connection.php:825)\n"
        ."[stacktrace]\n"
        ."#0 {$base}/vendor/laravel/framework/src/Illuminate/Database/Connection.php(779): Illuminate\\\\Database\\\\Connection->runQueryCallback()\n"
        ."#1 {$base}/app/Http/Controllers/UnitController.php(42): Illuminate\\\\Database\\\\Query\\\\Builder->get()\n"
        ."#2 {main}\n"
        ."\"} \n";

    File::put($this->logs.'/laravel.log', implode('', [
        "[2026-10-10 08:00:00] production.INFO: Cache cleared [] []\n",
        $exception('2026-10-10 09:00:00', 'SQLSTATE[42S22]: Column not found: unit_slug'),
        "[2026-10-10 09:30:00] production.WARNING: Slow request {\"path\":\"/projects\"} []\n",
        $exception('2026-10-11 10:00:00', 'SQLSTATE[42S22]: Column not found: unit_slug'),
        "[2026-10-11 11:00:00] production.ERROR: Mail failed for smtp://mailer:hunter2@mail.example.com password=hunter2 Bearer sr_abcdefghijklmnop [] []\n",
    ]));
});

afterEach(fn () => File::deleteDirectory($this->logs));

it('groups recent errors, newest first, with where they were thrown', function () {
    $log = errorLog($this->admin);

    expect($log['count'])->toBe(2)
        ->and($log['files'])->toHaveCount(1)
        ->and($log['errors'][0]['message'])->toStartWith('Mail failed');

    $query = $log['errors'][1];
    expect($query)->toMatchArray([
        'level' => 'error',
        'count' => 2,
        'first_seen' => '2026-10-10 09:00:00',
        'last_seen' => '2026-10-11 10:00:00',
        'environment' => 'production',
        'message' => 'SQLSTATE[42S22]: Column not found: unit_slug',
        'exception' => 'Illuminate\Database\QueryException',
        'at' => 'vendor/laravel/framework/src/Illuminate/Database/Connection.php:825',
    ])
        // The site's own frame comes first.
        ->and($query['trace'][0])->toBe('app/Http/Controllers/UnitController.php(42): Illuminate\Database\Query\Builder->get()');
});

it('masks secrets in messages', function () {
    $message = errorLog($this->admin)['errors'][0]['message'];

    expect($message)->not->toContain('hunter2')
        ->and($message)->not->toContain('abcdefghijklmnop')
        ->and($message)->toContain('smtp://mailer:[masked]@mail.example.com')
        ->and($message)->toContain('password=[masked]');
});

it('filters by level, search and time', function () {
    expect(errorLog($this->admin, ['level' => 'warning'])['count'])->toBe(3)
        ->and(errorLog($this->admin, ['level' => 'debug'])['count'])->toBe(4)
        ->and(errorLog($this->admin, ['search' => 'column not found'])['count'])->toBe(1)
        ->and(errorLog($this->admin, ['limit' => 1])['count'])->toBe(1);

    $this->travelTo('2026-10-11 12:00:00');
    expect(errorLog($this->admin, ['since_hours' => 6])['count'])->toBe(2)
        ->and(errorLog($this->admin, ['since_hours' => 1])['count'])->toBe(1);
});

it('returns nothing when there are no logs', function () {
    File::cleanDirectory($this->logs);

    expect(errorLog($this->admin))->toMatchArray(['count' => 0, 'files' => [], 'errors' => []]);
});

it('needs its permission and can be turned off', function () {
    app(SyncPermissions::class)->handle();
    $role = Role::findOrCreate('Agent', config('sunrice.auth.guard', 'web'));
    $role->givePermissionTo(['sunrice.access-admin', 'sunrice.ai-access']);
    $agent = User::query()->create(['name' => 'Agent', 'email' => 'agent@example.com', 'password' => 'x']);
    $agent->assignRole($role);

    expect(errorLog($agent))->toHaveKey('error');

    $role->givePermissionTo('sunrice.error-log.view');
    app(PermissionRegistrar::class)->forgetCachedPermissions();
    expect(errorLog($agent->refresh())['count'])->toBe(2);

    config(['sunrice.mcp.error_log' => false]);
    expect(errorLog($this->admin)['error'])->toContain('turned off');
});
