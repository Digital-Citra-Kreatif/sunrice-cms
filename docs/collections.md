# Collections and entries

A **collection** is a kind of content: pages, articles, products. Its entries are filled in with the fields of its [blueprint](fields.md). An **entry** has one **translation** per language, each with its own title, slug, fields, draft and publish state.

## Collections

Manage them in the admin under **Structure → Collections** (permissions `cms.collections.view`, `.create`, `.update`, `.delete`) or with the actions below. A collection has:

| | |
| --- | --- |
| `handle` | Lowercase letters, digits and underscores, starting with a letter. It can be changed on the edit form (with a warning): roles keep their permissions for the collection (see [renaming](#renaming-a-handle)), but templates and code that name it need the new one. A deleted collection's handle stays taken. |
| `title` | The name editors see, and visitors in the main language. **Title in …** (`translations`, `{"id": {"title": "Properti"}}`) is what visitors read in each other language: the listing page's `$title` and SEO title, breadcrumbs (structured data) and menu links; `$collection->titleIn($locale)` gives it (else the title). |
| `blueprint` | A blueprint's handle, or none. Changing it keeps entries' data: values of fields the new blueprint lacks stay stored, out of sight, and come back with the field. A blueprint can't be deleted while a collection uses it. |
| `blueprints` | More blueprints its entries may use instead of its own (**Other blueprints**); see [per-entry blueprints](#per-entry-blueprints). |
| `dated` | Entries show a date and list newest first. |
| `route` | The entries' URL, like `/blog/{slug}` or `/projects/{project}/{slug}`; none: no pages. See [the site](site.md). |
| `template` | The Blade view entries render with; none: `cms.{handle}`, then `cms.entry`. |
| `listing_route` | The URL of a page listing the entries, like `/blog`; none: no listing page. See [the site](site.md#listing-pages). |
| `listing_blueprint`, `per_page` | The listing page's own fields (an intro…), edited from the entries list, and how many entries it shows per page (10). `SaveListing` saves the fields (and the listing page's own SEO, `$seo`) per language and, given the `version` the editor opened (`CollectionListing::$version`), refuses a save over someone else's newer one. |
| `ordered` | **Manual order**: editors put entries in order in the list (**Reorder**, then drag; a hierarchical collection shows its tree, and an entry moves among its siblings with its children), instead of by date or title. |
| `hierarchical` | Entries may have a **parent** entry, like pages under pages, for breadcrumbs and sub-menus. URLs stay flat: *Team* under *About* is still `/team`. |
| `seo_title_field`, `seo_description_field`, `seo_image_field` | Chosen in **Settings → SEO**, from the fields of its own blueprints: a text field for the SEO title, a text or textarea field for the description and a media field for the share image, used where an entry's SEO card is empty. See [SEO](site.md#seo). |

```php
use Sunrice\Cms\Actions\Collections\SaveCollection;

$articles = app(SaveCollection::class)->handle(['handle' => 'articles', 'title' => 'Articles', 'blueprint' => 'article', 'dated' => true]);
```

Deleting a collection (`DeleteCollection`) doesn't erase its entries: they leave the admin and the site. The list's **Trash** (`?status=trashed`) shows deleted collections with **Restore**, and `sunrice:orphans --purge` deletes them for good, freeing their handles ([leftovers](structure.md#leftovers)). To rename a field without losing its values, use `sunrice:rename-field` ([renaming a field](structure.md#renaming-a-field)).

### Per-entry blueprints

A collection may offer more than one blueprint: its own, plus those ticked under **Other blueprints** (`Collection::$blueprints`, a list of handles). An entry then picks one in its **Page settings** (the **Blueprint** select, shown only when there's a choice), for every language at once:

```php
use Sunrice\Cms\Actions\Entries\ChangeBlueprint;

app(ChangeBlueprint::class)->handle($entry, 'landing');   // null (or the collection's own) for the collection's
```

- `Entry::$blueprint` holds the choice (null: the collection's). A handle the collection no longer offers is ignored: the entry has the collection's fields again. `Entry::blueprintHandle()` says which one applies.
- **No value is moved or dropped.** Fields both blueprints have keep their values; the others stay stored, out of sight, and come back if the entry switches back.
- Every translation's version counts up, so an editor opened on the old fields can't save over the change (the editor reloads after the switch). The change is logged.
- Choosing needs the right to edit the entry itself (`cms.entries.update`, or `update-own` for one's own), not only `translate`.
- **`Entry::schema()`** is the entry's fields. Use it, not `$entry->collection->schema()`, for anything about one entry: the editor, validation, `values()`, shared fields, search text, references, media usage, term syncing, machine translation, duplicates and switching the main language all do. `Entry::usingBlueprint($handle)` is the entries a blueprint fills (theirs or their collection's), as `RenameFieldHandle` uses it; structure export and import carry a collection's `blueprints` and an entry's `blueprint`. `Collection::schemaFor($handle)` and `Collection::allSchemas()` (every blueprint it offers: field queries such as `whereField()` and sorting look through all of them) load each blueprint once. The entries list offers field columns from every blueprint offered, and the CSV export has a column per field of each; every entry fills its own.

## Editing entries

Editors write entries under **Content → Entries**: a list per collection (see [the entries list](#the-entries-list)) and the editor, with the blueprint's fields, the entry's status and its revisions. What each person may do follows their permissions:

| Permission | |
| --- | --- |
| `cms.entries.view` | See the lists and open entries. |
| `cms.entries.create` | Create and duplicate entries. |
| `cms.entries.update` | Save drafts and restore revisions. |
| `cms.entries.publish` | Publish (now or on a date) and unpublish, also several at once. |
| `cms.entries.delete` | Move entries to the trash, restore them and delete them for good, also several at once. |
| `cms.entries.export` | Download a collection's entries as CSV (with `view`). |
| `cms.entries.update-own`, `.delete-own` | The same, for entries they created, in collections they may view. |
| `cms.entries.translate` | Save drafts of entries' other languages (not the main one), in collections they may view: to keep a translator to some collections, give them those collections' **View** (`cms.entries.{collection}.view`) instead of `cms.entries.view`. Not what every language shares: Page settings (parent, template, blueprint, comments) and the order of entries need `cms.entries.update` (or `update-own`). |
| `cms.homepage` | Make a live page the site's homepage from its editor (`SetHomepage`); Settings → Site (`cms.settings.site`) sets it too. |
| `cms.entries.view-drafts` | While signed in, see on the site that a live page has unpublished changes, and open them (`?draft`), in collections they may view. See [draft viewing](site.md#drafts-on-the-site). |

Each of the first six also comes for one collection: `cms.entries.blog.publish` publishes only in Blog. They're created with the collection (and deleted with it), renamed with its handle, and the role editor shows them under "Entries: Blog". The same goes for terms (`cms.terms.{taxonomy}.manage`) and form submissions (`cms.submissions.{form}.view`, `.export`, `.delete`). People see only the collections, taxonomies and forms they may work in. `update-own` and `delete-own` have no per-collection version because they need none: they apply in the collections a person may view, so an author for the Journal alone is `cms.entries.journal.view`, `cms.entries.journal.create`, `cms.entries.update-own` and `cms.entries.delete-own` (the built-in `author` role has the global `view` and `create`: take those away and give the collection's instead). In code: `Sunrice\Cms\Support\Access::entries($user, 'publish', $collection, $entry, $locale)`.

### Renaming a handle

Scoped permissions are named after handles, so when a collection's, taxonomy's or form's handle changes on its edit form, its stored permissions are renamed in place (`cms.entries.blog.view` becomes `cms.entries.journal.view`, through `ScopedPermissions::renamed()` and the panel's `RenamePermissions`): every role and person keeps what they were given. What the CMS can't rename for you is shown as a warning under the field: Blade views named after the handle (`cms.{handle}`, `cms.taxonomy-{handle}`), `Cms::entries('…')`, `whereTerm('…')`, `<x-sunrice-cms::form handle="…" />`, and entries fields limited to a collection. `SaveCollection` still refuses a new handle; rename through the admin.

`sunrice:roles` creates `editor` (all content), `author` (writes entries and edits and trashes their own, publishes nothing, sees drafts on the site) and `translator` (writes the other languages): see [default roles](../../admin/docs/permissions.md#default-roles).

In the editor:

- **Ctrl/Cmd+S** saves the draft, and leaving the page with unsaved changes asks first.
- **Page settings**: the parent (in hierarchical collections; never the entry itself or one below it, at most 10 deep; also chosen when creating, `CreateEntry`'s `parent_id`), a Blade view for this entry alone and whether it takes comments (`SaveEntrySettings`), for every language, saved with the draft (the editor's `PUT` sends `parent_id`, `template` and `comments_closed` with the fields, all or nothing); and, when the collection offers more than one, its blueprint (`ChangeBlueprint`), changed on its own. Deleting an entry for good moves its children up to its parent.
- **Duplicate** copies every language's draft as a new draft entry ("Hello (copy)", slug `hello-copy`).
- Only one person edits an entry in a language at a time: others are told who's editing and can view it or take over (see [edit locks](../../admin/docs/locks.md)).
- When someone else saved since you opened the page, saving says so: **Load theirs**, or **Save mine anyway** over their version.
- Group fields, **Search and sharing** and the sidebar's cards (status, page settings, comments, revisions) fold away; each remembers being open or closed in the browser, and opens by itself when a field inside has an error.
- Repeater rows, flexible blocks and an entries field's chosen entries are dragged into order by their handle (or with the keyboard: focus the handle, space, arrows, space).
- **Comments** (when the collection takes comments and the person has `cms.comments.view`): the counts by status and the latest five, with **Approve**, **Spam** and **Reply** for those with `cms.comments.moderate`, and a link to the [comments page](comments.md) showing only this entry's (`?entry=`).
- The revisions and comments load just after the page shows (Inertia's deferred props), and a terms field's terms load when it shows (`cms/terms/picker`), so a large entry opens fast.

**Reordering** in code: `ReorderEntries::handle($collection, $ids, $parentId)` puts one level of an ordered collection's entries (those under `$parentId` in a hierarchical one, null for the top level; else all of them) in the order given, the rest of the level after them as they were; the level is numbered again in one transaction, and the change is logged (`reordered`) and clears the site's cache. It returns whether the order changed: given the order the level already has, nothing is written or logged. Its route is `POST cms/entries/reorder` (`collection`, `ids`, `parent_id`), behind `cms.entries.update` for that collection. `MoveEntry` still moves one entry a place up or down.

Media fields use the media library's picker, which needs `sunrice.media.view` (and `.upload` to upload from it).

Rich text fields have a formatting toolbar: headings, bold, italic, underline, strikethrough, code, lists, quotes, dividers, links (web addresses, paths on the site, mailto: and tel:; others are refused) and images from the media library, which keep their library id. The server cleans the HTML again when saving.

## The entries list

Each collection's list (`EntryController::index`, built by `Sunrice\Cms\Admin\EntryList`) shows the entries of one language, 25 to a page, and keeps everything it shows in the address, so a list can be bookmarked or shared:

| Parameter | |
| --- | --- |
| `search` | Titles and slugs containing the text (any case); `#12` finds the entry with id 12. |
| `status` | `draft`, `published`, `scheduled` (published with a date to come) or `trashed` (the trash). None: everything but the trash. |
| `author` | Entries a user created (the filter offers everyone who wrote in the collection). |
| `terms[topics]` | Entries with that term (id) of a taxonomy attached to the collection, one per taxonomy. |
| `locale` | The language listed (its titles, slugs and statuses); the main one by default. Entries without that language aren't listed. |
| `sort` | `title`, `slug`, `status`, `published_at`, `updated_at`, `created_at`, `author` or `field.{handle}`, with `-` first for descending. None: the collection's order (manual, newest first when dated, else by title). |
| `per_page` | 10, 25, 50 or 100. |

Besides the title, the **Columns** menu shows the slug, the status (with a badge per other language), the author, the dates, and **field columns**: the blueprint's top-level text, textarea, number, date, select, toggle and entries fields (custom fields built on them too), shown as short text (select labels, Yes/No, linked entries' titles). Field columns sort by the draft's value (shared fields: the main language's), numbers and dates as such; entries fields and multiple selects don't sort. The chosen columns and page size are kept per person ([preferences](../../admin/docs/preferences.md), key `table.cms.entries.{collection}`); a `per_page` in the address wins.

**Go to** links to what an editor tends to need next, where they may go: the listing page (edit and view), the collection's taxonomies' terms (`cms.terms.*`), the collection's settings (`cms.collections.update`) and its blueprint (`cms.blueprints.manage`). In a collection with manual order, Move up and Move down appear while the list is in that order, unfiltered.

Tick entries to publish, unpublish or trash them together (in the trash: restore or delete for good); entries one may not act on, or that can't be published as they are, are skipped and counted. **Export CSV** (`cms.entries.export`) downloads the list as it is filtered, searched, sorted and in its language (every page): the ID, title, slug, status, publish date, URL, last change and author, and a column per top-level field of every blueprint the collection offers (field columns as the list shows them; links as their address, an entry link's as the site has it in the list's language; rich text as plain text; a field whose label is a column's or another field's is headed "Label (field)"; each entry fills its own blueprint's); it's an `exported` security event.

## Languages

The languages content is written in are set in **Settings → Languages** (`Sunrice\Cms\Settings\LocaleSettings`, permission `cms.settings.locales`): a row per language, its code and its name, the main one first (with **Add a language**, which suggests common ones, and arrows to reorder). They're kept as lines, so in code and over the AI tools it's the same text:

```
en: English
id: Bahasa Indonesia | indonesia
```

The part after `|` is the language's **address**, what its pages' addresses start with: left out, the main language is at the plain addresses (`/about`) and the others under their code (`/id/tentang`). Any of them can have its own, the main one too (`en: English | en` puts it at `/en/about`); each must be different. When every language has one, a plain address (`/about`) redirects to the main language's (`/en/about`). Without Settings, config `sunrice-cms.locale_prefixes` sets them. In code: `Locales::prefix('id')` (`/indonesia`), `Locales::segments()` and `Locales::split($path)`.

Until they're saved there, `config/sunrice-cms.php` decides: `locales` (or `SUNRICE_LOCALES=id,en`), the first being the main one, and `locale_names` (`['id' => 'Bahasa Indonesia']`; others are named in English when PHP's intl extension is installed, else by their code). Without either, it's the app's locale. The main language's addresses are plain (`/about`), the others' start with their code (`/id/about`).

Codes are as Laravel's `app.locale` uses them (`en`, `id`, `pt_BR`). The settings refuse an empty list, codes listed twice, and changing or dropping the main language while content is written in it: [switch it](#switching-the-main-language) instead. Dropping another language hides its content without deleting it.

```php
use Sunrice\Cms\Support\Locales;

Locales::all();        // ['en', 'id']
Locales::default();    // 'en', the main one
Locales::names();      // ['en' => 'English', 'id' => 'Bahasa Indonesia']
Locales::name('id');   // 'Bahasa Indonesia'
Locales::prefix('id'); // '/id' ('' for the main one)
Locales::current();    // the page's language
```

The editor's language bar and the entries list name each language as set.

Each language of an entry is a translation of its own: its own title, slug, draft, status, publish date and revisions. With more than one language, the editor shows a bar of them:

- **Adding a language** (`cms.entries.create`, or `CreateTranslation`) makes a draft copied from the main translation, to translate and publish on its own.
- **Removing one** (`cms.entries.delete`, or `DeleteTranslation`) deletes that translation and its revisions. The main translation can't be removed: trash the entry instead.
- **Outdated** shows on a language (in the bar, in the list's language badges, and to AI tools as `outdated` and `outdated_languages`) when the main translation changed after it was translated: each translation keeps the main one's `version` from when it was created, saved or published (`main_version`), and `$translation->isOutdated()` compares. Saving or publishing the translation clears it.

Fields are **translated** or **shared**. A field's *Per language* setting in the blueprint decides; left to the type, text fields (text, textarea, rich text, links, groups, repeaters, flexible) are translated and the others (numbers, toggles, selects, dates, media) shared. Shared fields belong to the main translation: other languages show its values, read-only, and templates get them from it (`$translation->values()`). A price changed in the main language is the price in every language. Other languages store only their translated fields (`CreateTranslation` and `SaveDraft` leave the shared ones out; `$translation->ownData()`), and `$translation->completeData()` gives the stored fields with the main translation's shared ones, live or in the draft, which site search text and revisions follow.

Shared fields inside a translated group, repeater or flexible block are shared too, row by row: another language's rows and blocks have their own text, and take the shared values (a dish's price, a quote's rating) from the main language's row or block with the same id (`_id` for rows, `id` for blocks; a group's by its handle). The editor shows them read-only with the main language's values. A row or block only that language has (added after it was copied) keeps its own. `Schema::withShared($data, $main)` and `withoutShared()` do the matching; `completeData()` and `ownData()` use them.

## Switching the main language

Once there's content, the main language is changed from Settings → Languages (the **Main language** card's buttons, `POST admin/cms/languages/{locale}/main`, `sunrice.admin.cms.languages.main`, behind `cms.settings.locales`; it refuses while entries or terms lack the new language) or with a command, which can also copy what's missing; either moves what's stored so nothing is lost:

```bash
php artisan sunrice:switch-main-language id --dry-run       # what would change
php artisan sunrice:switch-main-language id --copy-missing  # back up the database first
```

- **Entries** (live and draft), **terms**, **globals** and **listing pages**: the shared values move from the old main language to the new one, which holds them from then on (in rows and blocks too); the old main language keeps only its text, and every language shows what it showed before.
- Entries and terms without a translation in the new main language stop the switch, unless `--copy-missing`, which gives them a copy of the old main language's (published as it was).
- **Menu labels** the new main language left empty take the old one's.
- **Addresses**: the new main language's lose their prefix (`/id/about` → `/about`, and `/id/…` redirects there) and the old one's get it (`/about` → `/en/about`). Redirects are rewritten to match, and the old main language's pages and terms redirect (301) from their old addresses, where the new main language has no page of its own, without chains.
- **Settings → Languages** lists the new main language first. The command reports what it moved.

In code: `Sunrice\Cms\Actions\Settings\SwitchMainLanguage`, `report($to)` (counts, changing nothing) and `handle($to, copyMissing: true)`, which throws a `ValidationException` for a language that isn't a content language or is the main one already, or for content left without it.

## Drafts and publishing

Editors work on the **draft**; the site shows the **live** version, which only changes on publish.

```php
use Sunrice\Cms\Actions\Entries\{CreateEntry, SaveDraft, PublishEntry, UnpublishEntry};

$translation = app(CreateEntry::class)->handle($articles, ['title' => 'Hello world', 'data' => ['intro' => 'Hi']]);
app(SaveDraft::class)->handle($translation, ['data' => ['intro' => 'Hello'], 'version' => $translation->version]);
app(PublishEntry::class)->handle($translation);                      // live now
app(PublishEntry::class)->handle($translation, now()->addWeek());   // live from next week
app(UnpublishEntry::class)->handle($translation);
```

- `CreateEntry` takes `title`, `slug`, `data`, `locale` (the main language when left out) and `parent_id` (in a hierarchical collection), makes a draft and records the signed-in user as the author. Fields left out get their defaults.
- `SaveDraft` takes any of `title`, `slug`, `data` and `version`; fields left out of `data` keep their values. Pass the `version` the editor opened: if someone saved since, the save is refused instead of overwriting their work.
- Both validate the title, the slug and the blueprint's fields, and ignore handles the blueprint doesn't have. The slug check and the write run in one transaction (`EntryInput::write()`), locking the translations the check looks at where the database can; a slug another save took in between is refused with a validation error on `slug`, never a database error.
- `PublishEntry` checks the draft again (the blueprint may have changed), copies it to the live version, counts the `version` up (an editor opened before the publish can't save over it unknowingly) and keeps a revision. The entry is live from its date: the date you pass, which may be in the future; else the original date when published again (now, for one that was scheduled for later and unpublished); else, for another language first published, the main translation's date when that's published (a translated article keeps the article's date); else now.
- `UnpublishEntry` takes it off the site; publishing again keeps its date.
- `ChangePublishDate::handle($translation, $date)` moves a published translation's date and leaves the draft alone: a past date keeps it live with that date, a date to come schedules it (fires `EntryUnpublished` when it leaves the site, `EntryPublished` when it goes live). In the editor of a dated collection it's the Status card's **Date** (`POST cms/entries/{entry}/date`, `published_at` and `locale`, behind `cms.entries.publish`).
- `RequestReview` is **Submit for review** in the editor, offered to those who may edit an entry but not publish it (the default `author` role): it records when and by whom on the translation (`review_requested_at`, `review_requested_by`), emails everyone who may publish in the collection (`cms.entries.publish` or `cms.entries.{collection}.publish`; not the requester), logs `review requested`, and refuses an entry in the trash or one whose draft the site already shows. The editor shows **Waiting for review**, and the dashboard's `cms.review` widget lists the waiting drafts to those who may publish them. Publishing clears the request (route `POST admin/cms/entries/{entry}/review`, `sunrice.admin.cms.entries.review`, behind `update`).
- Each fires an event (`EntryPublished`, `EntryUnpublished`, `EntryTrashed`, `EntryRestored`, `EntryDeleted`); one published for a later date is announced again when its time comes. See [Caching, events and scheduled publishing](caching.md).

| On the translation | |
| --- | --- |
| `title`, `slug`, `data` | The live version; null until first published. |
| `draft_title`, `draft_slug`, `draft_data` | The draft. |
| `status` | `draft` or `published`. |
| `published_at` | When it is (or goes) live. |
| `isPublished()`, `isLive()` | Published; published with its date reached. |
| `hasUnpublishedChanges()` | The draft differs from the live version. |
| `values($context)` | The fields as templates get them (see [fields](fields.md#using-fields-in-code)); the draft's for a preview context. |

`EntryTranslation::query()->live()` finds translations that are published, past their date, and whose entry and collection aren't deleted.

## Slugs

A slug is lowercase letters, digits and dashes. Left empty, it's made from the title (`hello-world`, then `hello-world-2`). Slugs are unique per collection and language, counting drafts and trashed entries, so restoring an entry never clashes.

## Revisions

Every publish keeps a `Revision` (title, slug, fields and who published it); the latest 50 per translation are kept (`revisions.keep`). `RestoreRevision` loads one into the draft, to publish when ready. If another entry took its slug since, the draft keeps its current slug. In the editor, **Undo the restore** puts the replaced draft back, until the session ends (`PutBackDraft`). The **Revisions** card shows the latest 20, each with who published it and the fields it changed from the one before, and **Compare** shows where a revision and the saved draft differ, field by field as text (`GET cms/revisions/{revision}/compare`, `sunrice.admin.cms.entries.revisions.compare`, for those who may view the entry).

## Trash

`TrashEntry` takes an entry, in all its languages, off the site and out of lists; `RestoreEntry` brings it back as it was. `ForceDeleteEntry` deletes a trashed entry for good, with its languages, revisions and terms; one that other content points at is refused unless `force` is passed (see [references](structure.md#references)). `DuplicateEntry` and `BulkEntries` are the list's and editor's other actions.

## References

Every save records which entries and terms an entry's fields point at, and the editor's sidebar lists what points at this one under **Used by**; trashing a used entry says where it's used, and `ForceDeleteEntry` refuses it unless `force` is passed. See [references](structure.md#references).

Every action is written to the [activity log](../../admin/docs/activity.md): created, duplicated, updated (with the fields that changed), published, unpublished, reverted, trashed, restored and deleted.

## The dashboard

The CMS adds these widgets to the panel's [dashboard](../../admin/docs/panel.md#dashboard-widgets), each showing only what the user may see (per collection and per form, as `Support\Access` decides):

| Widget | Shows | Who sees it |
| --- | --- | --- |
| `cms.collections` (Content) | Each collection's entries in the main language: live, drafts and scheduled, linking to its list. | Users who may view some collection's entries. |
| `cms.setup` (Getting the site ready) | What's left to set up a new site: the first entries, the homepage, menus without links; gone once done. | `cms.settings.site` |
| `cms.review` (Waiting for review) | Drafts sent for review (**Submit for review**), oldest first, with who sent them and how many wait. | Users who may publish in some collection; each sees the collections they may publish in. |
| `cms.recent-edits` (Recently edited entries) | The last eight entry translations edited, any language, with their status. | Users who may view some collection's entries. |
| `cms.comments` (Comments waiting) | How many comments wait for moderation, and the latest five. | `cms.comments.view` |
| `cms.scheduled` (Coming up) | The next eight entries scheduled to go live. | Users who may view some collection's entries. |
| `cms.submissions` (Latest submissions) | The last eight submissions of the forms the user may read, each summed up by its first text field. | `cms.submissions.view`, or a form's own. |

Each reads its data in one query (the comments widget a second one for signed-in commenters' names, the review widget a count and the requesters' names), after the page has painted. Entries in the trash and deleted collections are left out.
