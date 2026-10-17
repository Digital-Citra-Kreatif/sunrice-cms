<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Spatie\Permission\Models\Role;
use Sunrice\Actions\Comments\PostComment;
use Sunrice\Frontend\RouteMatcher;
use Sunrice\Mail\CommentReplyNotification;
use Sunrice\Mail\NewCommentNotification;
use Sunrice\Models\Comment;
use Sunrice\Permissions\SyncPermissions;
use Sunrice\Support\CommentNotifier;
use Sunrice\View\Components\Comments;
use Workbench\App\Models\User;

use function Pest\Laravel\get;
use function Pest\Laravel\post;

beforeEach(function () {
    config()->set('honeypot.enabled', false);
    config()->set('sunrice.comments.rate_limit', ['attempts' => 100, 'per_minutes' => 1]);
    Mail::fake();
    $this->articles = createCollection('articles', ['comments' => true]);
    $this->entry = createEntry($this->articles, 'Hello');
    RouteMatcher::flush();
});

/** A guest's comment form payload. */
function guestComment(array $overrides = []): array
{
    return array_merge(['author_name' => 'Ada', 'author_email' => 'Ada@Example.com', 'body' => 'Great article!'], $overrides);
}

it('stores a guest comment, held for approval the first time', function () {
    post("/sunrice/comments/{$this->entry->id}", guestComment(['notify_replies' => '1']), ['Referer' => 'http://localhost/articles/hello'])
        ->assertRedirect('http://localhost/articles/hello#comments')
        ->assertSessionHas('sunrice_comment_status', 'Terima kasih! Komentar Anda akan tampil setelah disetujui.');

    $comment = Comment::query()->sole();
    expect($comment)->toMatchArray([
        'entry_id' => $this->entry->id,
        'author_name' => 'Ada',
        'author_email' => 'ada@example.com',
        'body' => 'Great article!',
        'status' => Comment::PENDING,
        'locale' => 'id',
        'notify_replies' => true,
    ])->and($comment->ip_hash)->toBe(Comment::hashIp('127.0.0.1'));

    // Once one is approved, the next appears at once.
    $comment->update(['status' => Comment::APPROVED]);
    post("/sunrice/comments/{$this->entry->id}", guestComment(['body' => 'Me again']), ['Referer' => 'http://localhost/articles/hello'])
        ->assertRedirectContains('#comment-');
    expect(Comment::query()->latest('id')->first()->status)->toBe(Comment::APPROVED);
});

it('validates comments and answers AJAX posts with JSON', function () {
    post("/sunrice/comments/{$this->entry->id}", ['body' => 'x'])->assertSessionHasErrorsIn('comments', ['author_name', 'author_email', 'body']);

    post("/sunrice/comments/{$this->entry->id}", guestComment(['_locale' => 'en']), ['Accept' => 'application/json'])
        ->assertOk()
        ->assertJson(['success' => true, 'status' => 'pending', 'message' => 'Thanks! Your comment will appear once it is approved.']);

    post("/sunrice/comments/{$this->entry->id}", ['body' => ''], ['Accept' => 'application/json'])
        ->assertStatus(422)->assertJsonStructure(['errors' => ['body']]);
});

it('refuses comments where they are off, closed or need a sign-in', function () {
    $pages = createCollection('pages');
    $page = createEntry($pages, 'About');
    post("/sunrice/comments/{$page->id}", guestComment())->assertSessionHasErrorsIn('comments', 'body');

    $draft = createEntry($this->articles, 'Draft', status: 'draft');
    post("/sunrice/comments/{$draft->id}", guestComment())->assertNotFound();

    $this->entry->update(['comments_closed' => true]);
    post("/sunrice/comments/{$this->entry->id}", guestComment())->assertSessionHasErrorsIn('comments', 'body');
    $this->entry->update(['comments_closed' => false]);

    config(['sunrice.comments.require_login' => true]);
    post("/sunrice/comments/{$this->entry->id}", guestComment())->assertSessionHasErrorsIn('comments', 'body');

    expect(Comment::query()->count())->toBe(0);
});

it('posts signed-in users as themselves, and moderators straight away', function () {
    $admin = actingAsSuperAdmin();
    post("/sunrice/comments/{$this->entry->id}", ['body' => 'From the team', 'author_name' => 'Someone else']);

    expect(Comment::query()->sole())->toMatchArray([
        'user_id' => $admin->id,
        'author_name' => 'Admin',
        'author_email' => 'admin@example.com',
        'status' => Comment::APPROVED,
    ]);
    Mail::assertNothingQueued();
});

it('replies only to approved comments of the same entry', function () {
    $parent = Comment::factory()->create(['entry_id' => $this->entry->id]);
    $pending = Comment::factory()->pending()->create(['entry_id' => $this->entry->id]);
    $elsewhere = Comment::factory()->create(['entry_id' => createEntry($this->articles, 'Other')->id]);

    post("/sunrice/comments/{$this->entry->id}", guestComment(['parent_id' => $parent->id]))->assertSessionHasNoErrors();
    expect(Comment::query()->latest('id')->first()->parent_id)->toBe($parent->id);

    post("/sunrice/comments/{$this->entry->id}", guestComment(['parent_id' => $pending->id]))->assertSessionHasErrorsIn('comments', 'parent_id');
    post("/sunrice/comments/{$this->entry->id}", guestComment(['parent_id' => $elsewhere->id]))->assertSessionHasErrorsIn('comments', 'parent_id');
});

it('rate limits comments per visitor', function () {
    config(['sunrice.comments.rate_limit' => ['attempts' => 2, 'per_minutes' => 1]]);

    post("/sunrice/comments/{$this->entry->id}", guestComment());
    post("/sunrice/comments/{$this->entry->id}", guestComment(['body' => 'Second']));
    post("/sunrice/comments/{$this->entry->id}", guestComment(['body' => 'Third']))->assertStatus(429);
});

it('asks for the captcha when the settings say so', function () {
    config(['sunrice.forms.captcha' => ['provider' => 'turnstile', 'site_key' => 'site-123', 'secret_key' => 'secret-456']]);
    config(['sunrice.comments.captcha' => true]);
    Http::fake(['challenges.cloudflare.com/*' => Http::sequence()->push(['success' => false])->push(['success' => true])]);

    // No token, then one the provider rejects, then one it confirms.
    post("/sunrice/comments/{$this->entry->id}", guestComment())->assertSessionHasErrorsIn('comments', '_captcha');
    post("/sunrice/comments/{$this->entry->id}", guestComment(['cf-turnstile-response' => 'bad']))->assertSessionHasErrorsIn('comments', '_captcha');
    expect(Comment::query()->count())->toBe(0);

    post("/sunrice/comments/{$this->entry->id}", guestComment(['cf-turnstile-response' => 'ok']))->assertSessionHasNoErrors();
    expect(Comment::query()->count())->toBe(1);
});

it('emails the moderators about new comments', function () {
    app(SyncPermissions::class)->handle();
    $editors = Role::findOrCreate('Editor', 'web');
    $editors->givePermissionTo('sunrice.comments.moderate');
    $editor = User::query()->create(['name' => 'Ed', 'email' => 'ed@example.com', 'password' => 'x']);
    $editor->assignRole($editors);
    User::query()->create(['name' => 'Nobody', 'email' => 'nobody@example.com', 'password' => 'x']);
    config(['sunrice.comments.notify_emails' => ['team@example.com']]);

    expect(app(CommentNotifier::class)->moderatorEmails())->toEqualCanonicalizing(['ed@example.com', 'team@example.com']);

    post("/sunrice/comments/{$this->entry->id}", guestComment());
    Mail::assertQueued(NewCommentNotification::class, fn (NewCommentNotification $mail) => $mail->hasTo('ed@example.com')
        && $mail->hasTo('team@example.com') && ! $mail->hasTo('nobody@example.com')
        && str_contains($mail->render(), 'Great article!'));

    // Only the ticked roles.
    $other = Role::findOrCreate('Support', 'web');
    $support = User::query()->create(['name' => 'Sue', 'email' => 'sue@example.com', 'password' => 'x']);
    $support->assignRole($other);
    config(['sunrice.comments.notify_roles' => ['Support'], 'sunrice.comments.notify_emails' => []]);
    expect(app(CommentNotifier::class)->moderatorEmails())->toBe(['sue@example.com']);

    config(['sunrice.comments.notify' => false]);
    Mail::fake();
    post("/sunrice/comments/{$this->entry->id}", guestComment(['body' => 'Quiet']));
    Mail::assertNotQueued(NewCommentNotification::class);
});

it('emails a commenter about an approved reply, with a link to stop', function () {
    config(['sunrice.comments.moderation' => 'none']);
    $parent = Comment::factory()->create(['entry_id' => $this->entry->id, 'author_email' => 'ada@example.com', 'notify_replies' => true, 'locale' => 'en']);

    // Replying to yourself sends nothing.
    app(PostComment::class)->handle($this->entry, guestComment(['parent_id' => $parent->id]));
    Mail::assertNotQueued(CommentReplyNotification::class);

    app(PostComment::class)->handle($this->entry, ['author_name' => 'Bob', 'author_email' => 'bob@example.com', 'body' => 'I agree', 'parent_id' => $parent->id]);
    Mail::assertQueued(CommentReplyNotification::class, function (CommentReplyNotification $mail) {
        $text = $mail->render();

        return $mail->hasTo('ada@example.com')
            && str_contains($text, 'Bob replied to your comment')
            && str_contains($text, 'I agree')
            && str_contains($text, '/sunrice/comments/unsubscribe/');
    });

    get(URL::signedRoute('sunrice.frontend.comments.unsubscribe', ['comment' => $parent->id]))->assertOk();
    expect($parent->fresh()->notify_replies)->toBeFalse();
    get("/sunrice/comments/unsubscribe/{$parent->id}")->assertForbidden();
});

it('only keeps the reply box when reply emails are allowed', function () {
    config(['sunrice.comments.reply_notifications' => false]);
    post("/sunrice/comments/{$this->entry->id}", guestComment(['notify_replies' => '1']));

    expect(Comment::query()->sole()->notify_replies)->toBeFalse();
    expect(Blade::render('<x-sunrice::comments :entry="$entry" />', ['entry' => $this->entry]))->not->toContain('name="notify_replies"');
});

it('shows the approved thread with replies and a form', function () {
    $first = Comment::factory()->create(['entry_id' => $this->entry->id, 'author_name' => 'Ada', 'body' => "Line one\nSee https://example.com/x <b>bold</b>"]);
    Comment::factory()->create(['entry_id' => $this->entry->id, 'parent_id' => $first->id, 'author_name' => 'Bob', 'body' => 'A reply']);
    Comment::factory()->pending()->create(['entry_id' => $this->entry->id, 'body' => 'Not yet']);
    Comment::factory()->spam()->create(['entry_id' => $this->entry->id, 'body' => 'Buy now']);

    $html = Blade::render('<x-sunrice::comments :entry="$entry" />', ['entry' => $this->entry]);

    // Outside a request: the app's own language, English.
    expect($html)->toContain('2 comments')
        ->toContain('id="comment-'.$first->id.'"')
        ->toContain('Line one<br>')
        ->toContain('<a href="https://example.com/x" rel="nofollow ugc noopener" target="_blank">https://example.com/x</a>')
        ->toContain('&lt;b&gt;bold&lt;/b&gt;')
        ->toContain('class="sunrice-comment-replies"')
        ->toContain('A reply')
        ->toContain('id="comment-form"')
        ->toContain('name="author_email"')
        ->not->toContain('Not yet')
        ->not->toContain('Buy now');

    // The page itself, through the default template.
    get('/articles/hello')->assertOk()->assertSee('A reply');
});

it('opens the reply form under the comment being answered', function () {
    $first = Comment::factory()->create(['entry_id' => $this->entry->id, 'author_name' => 'Ada']);
    $this->get('/articles/hello?reply_to='.$first->id)
        ->assertOk()
        ->assertSee('name="parent_id" value="'.$first->id.'"', false)
        ->assertSee('Membalas Ada.');
});

it('shows nothing where comments are off, and no form when closed', function () {
    $page = createEntry(createCollection('pages'), 'About');
    expect(trim(Blade::render('<x-sunrice::comments :entry="$entry" />', ['entry' => $page])))->toBe('');

    Comment::factory()->create(['entry_id' => $this->entry->id, 'body' => 'Still here']);
    $this->entry->update(['comments_closed' => true]);
    $html = Blade::render('<x-sunrice::comments :entry="$entry" />', ['entry' => $this->entry->fresh()]);
    expect($html)->toContain('Still here')->toContain('Comments are closed.')->not->toContain('id="comment-form"');
});

it('lines up replies below the deepest level', function () {
    $make = fn (?Comment $parent, string $body) => Comment::factory()->create(['entry_id' => $this->entry->id, 'parent_id' => $parent?->id, 'body' => $body]);
    $a = $make(null, 'a');
    $b = $make($a, 'b');
    $c = $make($b, 'c');
    $make($c, 'd');
    $make($a, 'e');

    $tree = Comments::tree($this->entry->comments()->orderBy('id')->get()->all(), 2);
    $bodies = fn (array $nodes) => array_map(fn (array $n) => $n['comment']->body, $nodes);

    expect($bodies($tree))->toBe(['a'])
        // Level 2 is the last: b's descendants follow it there, in order.
        ->and($bodies($tree[0]['replies']))->toBe(['b', 'c', 'd', 'e'])
        ->and($tree[0]['replies'][0]['replies'])->toBe([]);
});
