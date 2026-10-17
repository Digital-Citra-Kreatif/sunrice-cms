<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Mail;
use Inertia\Testing\AssertableInertia as Assert;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Sunrice\Admin\AdminUrls;
use Sunrice\Admin\Navigation;
use Sunrice\Mail\CommentReplyNotification;
use Sunrice\Mail\NewCommentNotification;
use Sunrice\Models\Comment;
use Sunrice\Permissions\SyncPermissions;
use Workbench\App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\getJson;
use function Pest\Laravel\post;
use function Pest\Laravel\postJson;
use function Pest\Laravel\put;
use function Pest\Laravel\putJson;

beforeEach(function () {
    Mail::fake();
    $this->admin = actingAsSuperAdmin();
    $this->articles = createCollection('articles', ['comments' => true]);
    $this->entry = createEntry($this->articles, 'Hello');
    $this->other = createEntry($this->articles, 'Other');
});

/** A signed-in user whose role has exactly these permissions. */
function commentsUser(array $permissions): User
{
    app(SyncPermissions::class)->handle();
    $role = Role::findOrCreate('Commenter '.count($permissions), 'web');
    $role->syncPermissions(['sunrice.access-admin', ...$permissions]);
    app(PermissionRegistrar::class)->forgetCachedPermissions();
    $user = User::query()->create(['name' => 'Mod', 'email' => 'mod'.count($permissions).'@example.com', 'password' => 'x']);
    $user->assignRole($role);
    actingAs($user);

    return $user;
}

it('lists comments by status, entry, collection and text', function () {
    Comment::factory()->pending()->create(['entry_id' => $this->entry->id, 'body' => 'Waiting here']);
    Comment::factory()->create(['entry_id' => $this->entry->id, 'body' => 'Approved one']);
    Comment::factory()->create(['entry_id' => $this->other->id, 'author_name' => 'Zed']);
    Comment::factory()->spam()->create(['entry_id' => $this->entry->id]);
    Comment::factory()->create(['entry_id' => $this->entry->id])->delete();

    get('/cms/comments')->assertOk()->assertInertia(fn (Assert $page) => $page
        ->component('Comments/Index')
        ->where('counts', ['all' => 3, 'pending' => 1, 'approved' => 2, 'spam' => 1, 'trash' => 1])
        ->has('comments.data', 3)
        ->where('collections.0.handle', 'articles'));

    get('/cms/comments?status=pending')->assertInertia(fn (Assert $page) => $page
        ->has('comments.data', 1)
        ->where('comments.data.0.body', 'Waiting here')
        ->where('comments.data.0.entry.title', 'Hello'));
    get('/cms/comments?status=trash')->assertInertia(fn (Assert $page) => $page->has('comments.data', 1)->where('comments.data.0.trashed', true));
    get("/cms/comments?entry={$this->other->id}")->assertInertia(fn (Assert $page) => $page->has('comments.data', 1)->where('entry.title', 'Other'));
    get('/cms/comments?search=zed')->assertInertia(fn (Assert $page) => $page->has('comments.data', 1));
    get('/cms/comments?collection=nope')->assertInertia(fn (Assert $page) => $page->has('comments.data', 0));

    // The entry editor's card reads the same list as JSON.
    getJson("/cms/comments?entry={$this->entry->id}")->assertOk()
        ->assertJsonPath('counts.pending', 1)
        ->assertJsonCount(2, 'comments.data');
});

it('approves, holds, marks spam, trashes, restores and deletes', function () {
    $comment = Comment::factory()->pending()->create(['entry_id' => $this->entry->id]);
    $moderate = fn (string $action) => post("/cms/comments/{$comment->id}/moderate", ['action' => $action])->assertSessionHas('success');

    $moderate('approve');
    expect($comment->fresh())->status->toBe('approved')->approved_at->not->toBeNull();

    $moderate('pending');
    expect($comment->fresh()->status)->toBe('pending');

    $moderate('spam');
    expect($comment->fresh()->status)->toBe('spam');

    $moderate('trash');
    expect($comment->fresh()->trashed())->toBeTrue();

    $moderate('restore');
    expect($comment->fresh()->trashed())->toBeFalse();

    $moderate('delete');
    expect(Comment::withTrashed()->find($comment->id))->toBeNull();

    post('/cms/comments/'.Comment::factory()->create(['entry_id' => $this->entry->id])->id.'/moderate', ['action' => 'nonsense'])->assertSessionHasErrors('action');
});

it('emails the commenter when a held reply to them is approved', function () {
    $parent = Comment::factory()->create(['entry_id' => $this->entry->id, 'author_email' => 'ada@example.com', 'notify_replies' => true]);
    $reply = Comment::factory()->pending()->create(['entry_id' => $this->entry->id, 'parent_id' => $parent->id, 'author_email' => 'bob@example.com']);

    post("/cms/comments/{$reply->id}/moderate", ['action' => 'approve']);
    Mail::assertQueued(CommentReplyNotification::class, fn ($mail) => $mail->hasTo('ada@example.com'));

    // Not again when it's approved a second time.
    Mail::fake();
    post("/cms/comments/{$reply->id}/moderate", ['action' => 'pending']);
    post("/cms/comments/{$reply->id}/moderate", ['action' => 'approve']);
    Mail::assertQueued(CommentReplyNotification::class, 1);
});

it('moderates in bulk', function () {
    $ids = Comment::factory()->count(3)->pending()->create(['entry_id' => $this->entry->id])->pluck('id')->all();

    post('/cms/comments/bulk', ['action' => 'approve', 'ids' => $ids])->assertSessionHas('success', '3 comments approved.');
    expect(Comment::query()->approved()->count())->toBe(3);

    postJson('/cms/comments/bulk', ['action' => 'trash', 'ids' => $ids])->assertOk()->assertJson(['message' => '3 comments moved to the trash.']);
    expect(Comment::query()->count())->toBe(0);
});

it('edits a comment and replies as the moderator, approving what they answer', function () {
    $comment = Comment::factory()->pending()->create(['entry_id' => $this->entry->id, 'body' => 'Teh typo']);

    put("/cms/comments/{$comment->id}", ['body' => 'The typo'])->assertSessionHas('success');
    expect($comment->fresh()->body)->toBe('The typo');
    put("/cms/comments/{$comment->id}", ['body' => ''])->assertSessionHasErrors('body');

    // Closed entries still take a moderator's reply.
    $this->entry->update(['comments_closed' => true]);
    postJson("/cms/comments/{$comment->id}/reply", ['body' => 'Thanks for reading'])->assertOk()->assertJson(['message' => 'Reply posted.']);

    $reply = Comment::query()->where('parent_id', $comment->id)->sole();
    expect($reply)->status->toBe('approved')->user_id->toBe($this->admin->id)->author_name->toBe('Admin')
        ->and($comment->fresh()->status)->toBe('approved');
});

it('closes and reopens an entry\'s comments', function () {
    putJson("/cms/entries/{$this->entry->id}/comments-closed", ['closed' => true])->assertOk();
    expect($this->entry->fresh()->comments_closed)->toBeTrue();

    put("/cms/entries/{$this->entry->id}/comments-closed", ['closed' => false])->assertSessionHas('success');
    expect($this->entry->fresh()->comments_closed)->toBeFalse();

    get(AdminUrls::entry($this->entry))->assertInertia(fn (Assert $page) => $page->where('entry.comments_closed', false));
});

it('keeps comments behind their permissions', function () {
    $comment = Comment::factory()->pending()->create(['entry_id' => $this->entry->id]);

    commentsUser([]);
    get('/cms/comments')->assertForbidden();

    commentsUser(['sunrice.comments.view']);
    get('/cms/comments')->assertOk();
    post("/cms/comments/{$comment->id}/moderate", ['action' => 'approve'])->assertForbidden();

    commentsUser(['sunrice.comments.view', 'sunrice.comments.moderate']);
    post("/cms/comments/{$comment->id}/moderate", ['action' => 'approve'])->assertSessionHas('success');
    post("/cms/comments/{$comment->id}/moderate", ['action' => 'trash'])->assertForbidden();
    post('/cms/comments/bulk', ['action' => 'delete', 'ids' => [$comment->id]])->assertForbidden();
    put("/cms/entries/{$this->entry->id}/comments-closed", ['closed' => true])->assertSessionHas('success');

    commentsUser(['sunrice.comments.view', 'sunrice.comments.moderate', 'sunrice.comments.delete']);
    post("/cms/comments/{$comment->id}/moderate", ['action' => 'trash'])->assertSessionHas('success');
});

it('shows Comments in the sidebar once a collection allows them', function () {
    $items = fn () => collect(app(Navigation::class)->for(auth()->user()))->firstWhere('label', 'Content')['items'];

    expect(collect($items())->pluck('href'))->toContain('comments');

    $this->articles->update(['settings' => array_merge($this->articles->settings, ['comments' => false])]);
    expect(collect($items())->pluck('href'))->not->toContain('comments');
});

it('links moderators from the new-comment email to the comments waiting on that entry', function () {
    config(['honeypot.enabled' => false, 'sunrice.comments.notify_emails' => ['team@example.com']]);
    auth()->logout();

    post("/sunrice/comments/{$this->entry->id}", ['author_name' => 'Ada', 'author_email' => 'ada@example.com', 'body' => 'Hi there']);

    Mail::assertQueued(NewCommentNotification::class, fn ($mail) => str_contains($mail->render(), "/cms/comments?entry={$this->entry->id}&status=pending"));
});
