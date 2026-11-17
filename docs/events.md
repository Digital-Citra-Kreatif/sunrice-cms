# Events and hooks

Sunrice tells your code what happens to content with Laravel events, and lets it change or stop a save before it happens. Every event comes from the action that does the work (`Sunrice\Cms\Actions\…`), so it fires the same way whether an editor saved in the panel, an AI agent used a tool, a machine translation ran or a structure import wrote the content. This page lists them all, then the other hooks: the places your code changes how Sunrice behaves without an event.

The panel's own events (media, settings, the activity log, security, signing in) are on the panel's [Events and hooks](../../admin/docs/events.md) page.

## Two kinds of events

**"Before" events** (`EntrySaving`, `EntryPublishing`, `EntryDeleting`, `TermSaving`, `TermDeleting`, `FormSubmitting`, `CommentPosting`, and the panel's `MediaDeleting`) fire before anything is written. A listener may:

- **change what's saved**: their payload (`$event->data`, the fields by handle, and `$event->title`, `$event->slug`, a comment's `$event->body` and `$event->status`) is public and mutable. What listeners leave is then **validated and normalised by the same rules** as what the editor sent, so a listener can't store a value the field refuses or a field the blueprint doesn't have.
- **stop the operation** by throwing `Illuminate\Validation\ValidationException`. Nothing is written and no "after" event fires. The editor sees its message exactly like a validation error: on the field in the form (key it `data.<handle>`, the way the CMS keys field errors), or at the top for another key; an AI agent gets it as the tool's error ("Not saved: …"); a visitor sees it on the form or the comment form.

**"After" events** fire once the database transaction they're part of **commits**, never for one rolled back (Laravel's `ShouldDispatchAfterCommit`). A save made inside your own `DB::transaction()` fires them when that commits; a structure import's dry run fires none. They're for notifying: webhooks, syncing, mail, Slack.

Every event (the existing ones too) carries who did it:

- `$event->user`: the signed-in user (`?Authenticatable`), on the panel's guard. An AI agent acts as its token's user, and a signed-in visitor as themselves. Null for a guest visitor, the console and the scheduler.
- `$event->source`: where it came from: `"admin"` (the panel's screens), `"ai"` (an AI agent, over MCP), `"system"` (the console, the queue or the scheduler: `sunrice:import-structure`, starter installs, `sunrice:demo-content` and `sunrice:translate` too), or `"site"` (a visitor's form submission or comment). It's what the [activity log](../../admin/docs/activity.md) records as the source (`app(ActivityLog::class)->currentSource()`).

Both are read when the event is made, so a queued listener gets them too.

Each event fires **once per operation**: once for a save however many fields changed, once for the term editor's save of a name and fields together. Housekeeping writes fire nothing: renaming a field handle, changing an entry's blueprint, moving or reordering entries, rebuilding references, the page cache.

## The events

All are in `Sunrice\Cms\Events` and marked `@api`. "Can stop" means a listener can change the data and refuse with a `ValidationException`.

### Entries

| Event | When | Properties | Can stop |
| --- | --- | --- | --- |
| `EntrySaving` | Before a draft is saved in a language: a new entry (`CreateEntry`) or a change (`SaveDraft`). Fires even when nothing turns out to have changed. Inside the save's transaction for a change: keep it quick. | `collection`, `locale`, `translation` (null for a new entry); mutable `title`, `slug`, `data` (the fields this language edits: the stored values with what was sent over them) | Yes |
| `EntryCreated` | A new entry was made: by `CreateEntry`, or as a copy (`DuplicateEntry`). | `translation` (the language it was made in; a copy's first), `copiedFrom` (the original, for a copy) | |
| `EntrySaved` | A draft was saved: a new entry, or a change (not when nothing changed). The site shows it once published. | `translation`, `created`, `changed` (`"title"`, `"slug"`, field handles, `"terms"`) | |
| `EntryTranslationCreated` | A language was added to an entry (`CreateTranslation`), copied from the main one. | `translation` | |
| `EntryPublishing` | Before a draft is published (`PublishEntry`), after the CMS's own checks. Inside the publish's transaction, with the row locked: keep it quick. Not fired again when a scheduled entry's time comes. | `translation`, `publishAt` (null: its own date, or now); mutable `title`, `slug`, `data` (published, and kept as the draft) | Yes |
| `EntryPublished` | A language was published: live now, or at its future date, when it fires again with `scheduled` true (from `sunrice:publish-scheduled`, see [Scheduled publishing](caching.md#scheduled-publishing)). | `translation`, `scheduled` | |
| `EntryUnpublished` | A language was taken off the site. | `translation` | |
| `EntryDeleting` | Before an entry goes to the trash (`TrashEntry`, `permanent` false) or is deleted for good (`ForceDeleteEntry`, `permanent` true). In a bulk action, a refused entry is skipped. | `entry`, `permanent` | Yes |
| `EntryTrashed`, `EntryRestored` | An entry went to the trash, or came back. | `entry` | |
| `EntryDeleted` | An entry was deleted for good (the model still holds its attributes). | `entry` | |

Restoring a revision, discarding changes, putting back a draft and changing an entry's settings, template or terms alone fire no `EntrySaving`/`EntrySaved`.

### Terms, menus and globals

| Event | When | Properties | Can stop |
| --- | --- | --- | --- |
| `TermSaving` | Before a term is created (`term` null) or changed in a language, once per save: its name (`SaveTerm`), its page's fields (`SaveTermContent`) or both (`CreateTerm`, the term editor). | `taxonomy`, `locale`, `term`; mutable `title`, `slug`, `data` (null when the save doesn't include the fields: leave it null then) | Yes |
| `TermSaved` | A term was created or changed in a language: its name, parent, fields or template. | `term`, `locale`, `created` | |
| `TermDeleting` | Before a term goes to the trash with the terms under it (`TrashTerm`) or is deleted for good (`DeleteTerm`). | `term`, `permanent` | Yes |
| `TermDeleted` | A term went to the trash, or was deleted for good. | `term`, `permanent` | |
| `MenuSaved` | A menu's links were saved (`SaveMenu`) or reordered (`ReorderMenuItems`). | `menu` | |
| `GlobalsSaved` | A global set's values were saved in a language (`SaveGlobals`); they're live at once. | `set`, `values` (the `GlobalValue`), `locale`, `changed` | |

### Forms and comments

| Event | When | Properties | Can stop |
| --- | --- | --- | --- |
| `FormSubmitting` | A visitor sent a form, before it's checked and kept (`SubmitForm`). | `form`, `locale`; mutable `data` (the form's fields by handle, as sent; files as `UploadedFile`; only the form's fields are kept) | Yes: key errors by field handle (`email` or `data.email`) to show them by the field |
| `FormSubmitted` | The submission was kept and the form's emails queued. | `submission` (`->form`, `->data`) | |
| `CommentPosting` | A visitor's comment, once their input passed the checks, before it's kept (`PostComment`). | `entry`, `parent` (the comment it answers), `authorName`, `authorEmail` (a guest's), `locale`; mutable `body` and `status` (`Comment::APPROVED`, `PENDING` or `SPAM`: what Settings → Comments decided) | Yes: under `body` |
| `CommentPosted` | A comment was kept: a visitor's (`source` "site"; `$comment->status` says whether it's approved or held) or a moderator's reply from the admin (`ReplyToComment`). | `comment` | |
| `CommentStatusChanged` | A moderator approved a comment, held it again or marked it spam (`SetCommentStatus`; also when replying approves a held one). | `comment`, `previous` | |

A spam comment (`CommentPosting` set it) doesn't email the moderators.

### The site

| Event | When | Properties |
| --- | --- | --- |
| `ContentChanged` | Anything the site shows changed, once the site's cache is cleared for it: an entry going live or off, terms, menus, global sets, collections, taxonomies, blueprints, fieldsets, redirects, forms, media files, Settings → Site and Site code. Saving a draft isn't a change, and neither is a comment, except an approved one appearing, changing or going while whole pages are kept. It may fire several times for one save (once per record). | `what` (like `"menu 3"`) |

See [Caching](caching.md) for what the cache keeps and how a change clears it.

### Imports, the console and AI agents

The events fire for every way content is written, because they come from the actions:

- **AI agents** (the CMS's tools over MCP): every event, with `source` "ai" and the token's user. A refusal reaches the agent as the tool's error.
- **Structure imports, starter installs and demo content** run from the console through the same actions: every event fires, with `source` "system" and no user, the after events once the whole import commits (a dry run fires none of them, its before events do). An imported entry may fire `EntrySaving` more than once (it's created, then its other languages and links filled in). A listener that refuses would stop the import, so let imports through: `if ($event->source === 'system') return;`.
- **Machine translation** saves through `SaveDraft`, `SaveTermContent` and `SaveGlobals`: their events fire, with the user who asked (or "system" from `sunrice:translate`).
- **Scheduled publishing**: `EntryPublished` fires with `scheduled` true when the time comes; `EntryPublishing` fired when it was published.

## Listening

In a service provider's `boot()`, with a closure:

```php
use Illuminate\Support\Facades\Event;
use Sunrice\Cms\Events\EntryPublished;

Event::listen(function (EntryPublished $event): void {
    logger()->info("Published {$event->translation->title} ({$event->translation->locale})", ['by' => $event->user?->getAuthIdentifier()]);
});
```

or a listener class (Laravel discovers those in `app/Listeners` by their `handle()` type). Anything slow (an HTTP call, mail) belongs in a **queued listener**: it runs after the response, and a failure there doesn't undo the save:

```php
namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Http;
use Sunrice\Cms\Events\EntryPublished;

final class SendPublishWebhook implements ShouldQueue
{
    public int $tries = 5;

    public function handle(EntryPublished $event): void
    {
        $translation = $event->translation;
        Http::timeout(10)->post('https://hooks.example.com/published', [
            'entry' => $translation->entry_id,
            'locale' => $translation->locale,
            'title' => $translation->title,
            'scheduled' => $event->scheduled,
            'by' => $event->source,
        ])->throw();
    }
}
```

The queue needs a worker (see [the queue worker](../../admin/docs/mail.md#the-queue-worker)). A listener of a before event runs in the request, inside the save's transaction for an entry: keep it to checks and quick changes. A listener that throws anything else than a `ValidationException` fails the save with an error, so catch what you don't mean to stop it.

## Examples

**Refuse publishing posts without an image**, on the field:

```php
use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Events\EntryPublishing;

Event::listen(function (EntryPublishing $event): void {
    if ($event->translation->entry->collection->handle === 'posts' && empty($event->data['image'])) {
        throw ValidationException::withMessages(['data.image' => __('Add an image before publishing.')]);
    }
});
```

**Fill a field before saving**, here a summary from the body when it's empty (the field's rules still apply: keep within its length):

```php
use Illuminate\Support\Str;
use Sunrice\Cms\Events\EntrySaving;

Event::listen(function (EntrySaving $event): void {
    if ($event->collection->handle === 'posts' && blank($event->data['summary'] ?? null) && is_string($event->data['body'] ?? null)) {
        $event->data['summary'] = Str::limit(strip_tags($event->data['body']), 150);
    }
});
```

**Sync form submissions to a CRM** (queued):

```php
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Http;
use Sunrice\Cms\Events\FormSubmitted;

final class SyncToCrm implements ShouldQueue
{
    public function handle(FormSubmitted $event): void
    {
        if ($event->submission->form->handle !== 'contact') {
            return;
        }
        Http::withToken(config('services.crm.token'))->post('https://crm.example.com/api/leads', [
            'email' => $event->submission->data['email'] ?? null,
            'message' => $event->submission->data['message'] ?? null,
            'language' => $event->submission->locale,
        ])->throw();
    }
}
```

**Turn away a form submission**, shown by the field:

```php
use Sunrice\Cms\Events\FormSubmitting;

Event::listen(function (FormSubmitting $event): void {
    if ($event->form->handle === 'quote' && str_ends_with((string) ($event->data['email'] ?? ''), '@gmail.com')) {
        throw ValidationException::withMessages(['email' => __('Use your company email.')]);
    }
});
```

**A spam filter for comments**, and **Slack on a new comment** (queued, with Laravel's Slack notification channel or a webhook):

```php
use Sunrice\Cms\Events\CommentPosted;
use Sunrice\Cms\Events\CommentPosting;
use Sunrice\Cms\Models\Comment;

Event::listen(function (CommentPosting $event): void {
    if (app(SpamChecker::class)->isSpam($event->body, $event->authorEmail)) {
        $event->status = Comment::SPAM; // kept, out of sight, no email to moderators
    }
});

final class TellSlackAboutComment implements ShouldQueue
{
    public function handle(CommentPosted $event): void
    {
        if ($event->source !== 'site') {
            return; // a moderator's own reply
        }
        Http::post(config('services.slack.comments_webhook'), [
            'text' => "New comment ({$event->comment->status}) by {$event->comment->authorName()} on \"{$event->comment->entry->mainTranslation()?->title}\"",
        ]);
    }
}
```

**Purge a CDN when the site changes**: listen to `ContentChanged` from a queued listener (see [CDNs and reverse proxies](caching.md#cdns-and-reverse-proxies)).

## Other hooks

Not every extension point is an event. These change how Sunrice behaves; register them in a service provider's `boot()` (a plugin's in its `boot()`):

| Hook | What it changes | Docs |
| --- | --- | --- |
| `Cms::resolveTemplateUsing(Closure(Page): ?string)` | The view a CMS page renders. | [Hooks](site.md#hooks) |
| `Cms::bodyClassUsing(Closure(Page): array)` | Body classes (`@bodyClass`). | [Hooks](site.md#hooks) |
| `Cms::entryLinksUsing(Closure(EntryTranslation, Authorizable): array)` | Links in the ⋮ menu of an entry's page in the panel. | [Links from plugins](collections.md#links-from-plugins) |
| `PageCache::lifetimeUsing(Closure(Request, ?Page): ?int)` | How long a whole page is kept. | [Whole pages](caching.md#whole-pages) |
| Your own field types | New field types made from built-in ones (PHP only). | [Your own field types](fields.md#your-own-field-types) |
| A `Translator` bound in the container | Another machine translation service. | [Machine translation](translation.md#in-code) |
| `$panel->navigationUsing()`, `permissionsUsing()`, `mailBrandUsing()` | The panel's navigation and permissions from data, the logo in emails. | [The panel's hooks](../../admin/docs/events.md#other-hooks) |
| Plugins | Resources, pages, settings sections, dashboard widgets, AI tools, health checks, activity log subjects. | [Writing a plugin](../../admin/docs/panel.md#writing-a-plugin) |
