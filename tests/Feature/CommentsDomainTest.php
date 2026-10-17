<?php

declare(strict_types=1);

use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Sunrice\Actions\Structure\SaveCollection;
use Sunrice\Database\Seeders\RolesSeeder;
use Sunrice\Models\Comment;
use Sunrice\Permissions\PermissionRegistry;
use Sunrice\Permissions\SyncPermissions;

use function Pest\Laravel\artisan;
use function Pest\Laravel\get;
use function Pest\Laravel\put;

beforeEach(function () {
    actingAsSuperAdmin();
    $this->articles = createCollection('articles', ['comments' => true]);
    $this->entry = createEntry($this->articles, 'Hello');
});

/** Settings → Comments payload on top of the required site settings. */
function commentSettings(array $comments): array
{
    return [
        'name' => 'Site',
        'timezone' => 'UTC',
        'locales' => ['main' => 'id', 'available' => ['id', 'en']],
        'comments' => $comments,
    ];
}

it('threads comments on an entry', function () {
    $first = Comment::factory()->create(['entry_id' => $this->entry->id]);
    $reply = Comment::factory()->create(['entry_id' => $this->entry->id, 'parent_id' => $first->id]);
    Comment::factory()->pending()->create(['entry_id' => $this->entry->id]);

    expect($this->entry->comments()->count())->toBe(3)
        ->and($this->entry->comments()->approved()->count())->toBe(2)
        ->and($first->replies->pluck('id')->all())->toBe([$reply->id])
        ->and($reply->parent->is($first))->toBeTrue();

    // Deleting a comment keeps its replies in the thread.
    $first->forceDelete();
    expect($reply->fresh()->parent_id)->toBeNull();
});

it('accepts comments only where the collection, the entry and the age allow', function () {
    expect($this->entry->acceptsComments())->toBeTrue();

    $this->entry->update(['comments_closed' => true]);
    expect($this->entry->fresh()->acceptsComments())->toBeFalse();
    $this->entry->update(['comments_closed' => false]);

    config(['sunrice.comments.close_after_days' => 30]);
    $this->entry->update(['published_at' => now()->subDays(31)]);
    expect($this->entry->fresh()->acceptsComments())->toBeFalse();
    $this->entry->update(['published_at' => now()->subDays(2)]);
    expect($this->entry->fresh()->acceptsComments())->toBeTrue();

    // No single pages, no comments.
    $this->articles->update(['settings' => array_merge($this->articles->settings, ['has_single' => false])]);
    expect($this->entry->fresh()->acceptsComments())->toBeFalse();

    $plain = createEntry(createCollection('pages'), 'About');
    expect($plain->acceptsComments())->toBeFalse();
});

it('decides whether a new comment waits for approval', function () {
    config(['sunrice.comments.moderation' => 'first_time']);
    expect(Comment::initialStatus('new@example.com'))->toBe(Comment::PENDING);

    Comment::factory()->create(['entry_id' => $this->entry->id, 'author_email' => 'known@example.com']);
    Comment::factory()->create(['entry_id' => $this->entry->id, 'user_id' => 7, 'author_email' => null]);
    expect(Comment::initialStatus('known@example.com'))->toBe(Comment::APPROVED)
        ->and(Comment::initialStatus('KNOWN@example.com'))->toBe(Comment::APPROVED)
        ->and(Comment::initialStatus(null, 7))->toBe(Comment::APPROVED)
        ->and(Comment::initialStatus(null))->toBe(Comment::PENDING)
        ->and(Comment::initialStatus('new@example.com', moderator: true))->toBe(Comment::APPROVED);

    config(['sunrice.comments.moderation' => 'all']);
    expect(Comment::initialStatus('known@example.com'))->toBe(Comment::PENDING);

    config(['sunrice.comments.moderation' => 'none']);
    expect(Comment::initialStatus('new@example.com'))->toBe(Comment::APPROVED);
});

it('stores IP addresses only as a keyed hash', function () {
    $hash = Comment::hashIp('203.0.113.9');

    expect($hash)->toHaveLength(64)
        ->and($hash)->not->toContain('203.0.113.9')
        ->and(Comment::hashIp('203.0.113.9'))->toBe($hash)
        ->and(Comment::hashIp(null))->toBeNull();
});

it('prunes old spam only', function () {
    $old = Comment::factory()->spam()->create(['entry_id' => $this->entry->id, 'created_at' => now()->subDays(40)]);
    $recent = Comment::factory()->spam()->create(['entry_id' => $this->entry->id, 'created_at' => now()->subDays(5)]);
    $approved = Comment::factory()->create(['entry_id' => $this->entry->id, 'created_at' => now()->subDays(400)]);

    artisan('model:prune', ['--model' => Comment::class])->assertSuccessful();

    expect(Comment::withTrashed()->find($old->id))->toBeNull()
        ->and(Comment::find($recent->id))->not->toBeNull()
        ->and(Comment::find($approved->id))->not->toBeNull();
});

it('turns comments on in the collection settings', function () {
    $pages = createCollection('pages');
    app(SaveCollection::class)->handle(['title' => 'Pages', 'settings' => ['comments' => true]], $pages);

    expect($pages->fresh()->allowsComments())->toBeTrue();
});

it('saves the comment settings and applies them over the config', function () {
    Role::findOrCreate('Editor', 'web');

    put('/cms/settings', commentSettings([
        'moderation' => 'all',
        'require_login' => true,
        'captcha' => false,
        'rate_limit' => ['attempts' => 5, 'per_minutes' => 10],
        'close_after_days' => 90,
        'max_depth' => 4,
        'notify' => true,
        'notify_roles' => ['Editor'],
        'notify_emails' => ['Team@Example.com'],
        'reply_notifications' => false,
    ]))->assertSessionHasNoErrors();

    expect(config('sunrice.comments.moderation'))->toBe('all')
        ->and(config('sunrice.comments.require_login'))->toBeTrue()
        ->and(config('sunrice.comments.rate_limit'))->toBe(['attempts' => 5, 'per_minutes' => 10])
        ->and(config('sunrice.comments.close_after_days'))->toBe(90)
        ->and(config('sunrice.comments.max_depth'))->toBe(4)
        ->and(config('sunrice.comments.notify_roles'))->toBe(['Editor'])
        ->and(config('sunrice.comments.notify_emails'))->toBe(['team@example.com'])
        ->and(config('sunrice.comments.reply_notifications'))->toBeFalse();

    get('/cms/settings')->assertInertia(fn (Assert $page) => $page
        ->where('settings.comments.moderation', 'all')
        ->where('roles', fn ($roles) => collect($roles)->contains('Editor'))
        ->has('captchaConfigured'));

    // Not sent (e.g. an older admin page): kept.
    $payload = commentSettings([]);
    unset($payload['comments']);
    put('/cms/settings', $payload)->assertSessionHasNoErrors();
    expect(config('sunrice.comments.moderation'))->toBe('all');
});

it('rejects unknown roles, bad emails and moderation values', function () {
    put('/cms/settings', commentSettings(['notify_roles' => ['Nobody']]))->assertSessionHasErrors('comments.notify_roles.0');
    put('/cms/settings', commentSettings(['notify_emails' => ['not-an-email']]))->assertSessionHasErrors('comments.notify_emails.0');
    put('/cms/settings', commentSettings(['moderation' => 'sometimes']))->assertSessionHasErrors('comments.moderation');
});

it('adds comment permissions, given to Administrator and Editor', function () {
    $names = collect(app(PermissionRegistry::class)->global())->pluck('name');
    expect($names)->toContain('sunrice.comments.view', 'sunrice.comments.moderate', 'sunrice.comments.delete');

    app(SyncPermissions::class)->handle();
    app(RolesSeeder::class)->run();

    expect(Role::findByName('Editor', 'web')->hasPermissionTo('sunrice.comments.moderate'))->toBeTrue()
        ->and(Role::findByName('Administrator', 'web')->hasPermissionTo('sunrice.comments.delete'))->toBeTrue()
        ->and(Role::findByName('Author', 'web')->hasPermissionTo('sunrice.comments.view'))->toBeFalse();
});
