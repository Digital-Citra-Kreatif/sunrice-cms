<?php

declare(strict_types=1);

use Sunrice\Models\Asset;
use Sunrice\Models\Entry;
use Sunrice\Models\Revision;
use Workbench\App\Models\User;

use function Pest\Laravel\delete;
use function Pest\Laravel\get;

beforeEach(function () {
    $this->admin = actingAsSuperAdmin();
    $this->pages = createCollection('pages');
    $this->leaver = User::query()->create(['name' => 'Leaver', 'email' => 'leaver@example.com', 'password' => bcrypt('password')]);
    $this->heir = User::query()->create(['name' => 'Heir', 'email' => 'heir@example.com', 'password' => bcrypt('password')]);

    $this->entry = createEntry($this->pages, 'Their post');
    $this->entry->update(['author_id' => $this->leaver->id]);
    $this->asset = Asset::factory()->create(['uploaded_by' => $this->leaver->id]);
    Revision::create(['entry_translation_id' => $this->entry->mainTranslation()->id, 'user_id' => $this->leaver->id, 'content' => []]);
});

it('moves the content to another user', function () {
    delete("/cms/users/{$this->leaver->id}", ['content' => 'reassign', 'reassign_to' => $this->heir->id])
        ->assertSessionHasNoErrors()->assertRedirect();

    expect(User::query()->find($this->leaver->id))->toBeNull()
        ->and($this->entry->fresh()->author_id)->toBe($this->heir->id)
        ->and($this->asset->fresh()->uploaded_by)->toBe($this->heir->id)
        ->and(Revision::query()->whereNotNull('user_id')->where('user_id', $this->leaver->id)->exists())->toBeFalse();
});

it('keeps the content without an author', function () {
    delete("/cms/users/{$this->leaver->id}", ['content' => 'keep'])->assertSessionHasNoErrors();

    expect($this->entry->fresh()->author_id)->toBeNull()
        ->and($this->entry->fresh()->trashed())->toBeFalse()
        ->and($this->asset->fresh()->uploaded_by)->toBeNull();
});

it('moves their entries to the trash but keeps their files', function () {
    delete("/cms/users/{$this->leaver->id}", ['content' => 'delete'])->assertSessionHasNoErrors();

    $entry = Entry::withTrashed()->find($this->entry->id);
    expect($entry->trashed())->toBeTrue()
        ->and($entry->author_id)->toBeNull()
        ->and(Asset::query()->find($this->asset->id))->not->toBeNull();
});

it('requires someone to receive reassigned content', function () {
    delete("/cms/users/{$this->leaver->id}", ['content' => 'reassign'])->assertSessionHasErrors('reassign_to');

    expect(User::query()->find($this->leaver->id))->not->toBeNull();
});

it('reports what each user created on the users page', function () {
    get('/cms/users')->assertInertia(fn ($page) => $page
        ->where('rows.data', fn ($users) => collect($users)->firstWhere('email', 'leaver@example.com')['content'] === ['entries' => 1, 'assets' => 1]));
});
