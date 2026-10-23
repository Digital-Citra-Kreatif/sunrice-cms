# Structure tooling

The structure of a site is its fieldsets, blueprints, collections, taxonomies, global sets, forms, menus and redirects. These tools change it safely, carry it from one site to another, clean up what's left over and fill a site with a demo. The commands are listed in [commands](commands.md).

## References

Content points at other content through its fields: an entries field holds entry ids, a terms field term ids, at any depth (groups, repeaters, flexible blocks). Every save records where, in `sunrice_references` (`Models\ContentReference`): an entry's draft save and publish, a term's page and a global set's values, per language, with one delete and one insert per save.

```php
$entry->referencedBy();   // Collection of ContentReference
$term->referencedBy();

foreach ($entry->referencedBy() as $reference) {
    $reference->source_type;  // ContentReference::ENTRY, TERM or GLOBAL
    $reference->source_id;    // the entry's, term's or global set's id
    $reference->locale;       // the source's language
    $reference->field;        // where: "related", "sections.2.values.target"
}
```

The admin shows them as **Used by**, in the entry editor's sidebar and on a term's page, each with the field by its label in the source's blueprint ("Blocks › Homes shown"; a field no longer there by its handle in words). Moving a used entry or term to the trash names where it's used in the confirmation. Deleting one permanently is refused unless forced, since those fields would then show nothing:

```php
app(ForceDeleteEntry::class)->handle($entry, force: true);
app(DeleteTerm::class)->handle($term, force: true);
```

The editors ask first and then force; bulk deletes skip entries in use. An entry that only points at itself doesn't count.

References are rebuilt from what is stored with `php artisan sunrice:references` (`--dry-run` only counts): every entry translation (draft and live, in the trash too), term translation and global value, in chunks, as a save would record them, with the media library's usages of entries and global sets too. Run it after changing content in the database directly or importing it some other way. In code:

```php
use Sunrice\Cms\Actions\References\RebuildReferences;

$counts = app(RebuildReferences::class)->handle(dryRun: false, media: true);
// ['entries' => 120, 'terms' => 14, 'globals' => 2, 'references' => 310]
```

Media files are tracked by the panel's `MediaUsages` instead ([media](../../admin/docs/media.md)).

## Renaming a field

A field's handle is the key its values are stored under, so renaming it in the builder would leave the stored values behind (and templates reading the old handle get nothing). The builder warns under a saved field's handle once it's changed, until the blueprint is saved. Rename it with the command instead:

```bash
php artisan sunrice:rename-field page subtitle tagline           # a blueprint's field
php artisan sunrice:rename-field page hero.title heading         # inside a group or repeater
php artisan sunrice:rename-field fieldset:cta label text         # a fieldset's (fieldset: or blueprint: when both have the handle)
php artisan sunrice:rename-field page subtitle tagline --dry-run # only count what would change
```

It renames the field in the definition and moves the values stored under the old handle, in place, in everything filled in with it:

- entries' drafts, live versions and revisions, in every language;
- terms' pages, global sets' values, listing pages, taxonomy index pages and form submissions;
- a fieldset's fields wherever the fieldset is included or used as a kind of flexible block, in every blueprint that reaches it.

References and search text are rebuilt for what changed, and the records' versions count up, so an editor who had one open is asked to reload before saving. The new handle must be a valid one (lowercase letters, digits and underscores), not taken on that level (for a fieldset's field, also not in any blueprint or fieldset that includes the fieldset, through other includes too, at the level its fields land on; the refusal names it) and, at the top level, not one content keeps for itself (`title`, `slug`…). In code:

```php
use Sunrice\Cms\Actions\Blueprints\RenameFieldHandle;

$counts = app(RenameFieldHandle::class)->handle($blueprint, 'hero.title', 'heading', dryRun: false);
// ['entries' => 12, 'revisions' => 30, 'terms' => 0, 'globals' => 0, 'listings' => 0, 'submissions' => 0]
```

It throws a `ValidationException` (on `from` or `to`) when the field isn't there or the handle can't be used.

## Exporting and importing structure

```bash
php artisan sunrice:export-structure structure.json             # the structure
php artisan sunrice:export-structure starter.json --entries     # with terms, entries and global values
php artisan sunrice:export-structure site.json --entries --settings   # and Settings → Site
php artisan sunrice:import-structure structure.json --dry-run   # what would change
php artisan sunrice:import-structure structure.json             # do it
php artisan sunrice:import-structure structure.json --force     # also when fields would be removed
```

The file is JSON with a section per kind, each item by handle, and records pointing at each other by handle and slug, never by id:

```json
{
    "sunrice": 1,
    "fieldsets": [{"handle": "cta", "title": "Call to action", "fields": [...]}],
    "blueprints": [{"handle": "page", "title": "Page", "fields": [...]}],
    "collections": [{"handle": "blog", "title": "Blog", "blueprint": "post", "dated": true, "route": "/blog/{slug}",
        "listing_route": "/blog", "listing_blueprint": "page", "per_page": 10, "listings": {"en": {"intro": "News"}},
        "routes": {"id": {"route": "/artikel/{slug}", "listing_route": "/artikel"}}, ...}],
    "taxonomies": [{"handle": "topics", "title": "Topics", "hierarchical": true, "index_route": "/topics", "index_blueprint": "page", "listings": {"en": {"intro": "Every topic"}},
        "collections": ["blog"], "collection_pages": {"blog": {"pages": true, "route": "/blog/topics/{slug}", "index": true, "listings": {"en": {"intro": "Topics on the blog"}}}},
        "routes": {"id": {"route": "/topik/{slug}", "index_route": "/topik"}}, ...}],
    "globals": [{"handle": "site", "title": "Site", "blueprint": "site_info", "values": {"en": {...}}}],
    "forms": [{"handle": "contact", "title": "Contact", "blueprint": "contact_form", "notify": ["team@example.com"], ...}],
    "menus": [{"handle": "main", "title": "Main", "items": [
        {"entry": "pages/about", "labels": {}, "new_tab": false, "children": []},
        {"term": "topics/news"}, {"collection": "blog", "labels": {"en": "Blog"}}, {"index": "topics", "collection": "blog"}, {"url": "https://example.com", "labels": {"en": "Shop"}}
    ]}],
    "redirects": [{"from": "/old", "to": "/new", "status": 301}, {"from": "/listings", "to": "/properties", "status": 301, "every_language": true},
        {"from": "/blog/*", "to": "/journal/*", "status": 301}],
    "terms": [{"taxonomy": "topics", "slug": "local", "parent": "news", "translations": {"en": {"title": "Local", "slug": "local", "data": {...}}}}],
    "entries": [{"collection": "pages", "slug": "team", "parent": "about", "template": null,
        "translations": {"en": {"title": "Team", "slug": "team", "data": {...}, "published": true,
            "draft": {"title": "Our team", "slug": "team", "data": {...}}}}}],
    "settings": {"site": {"name": "Acme", "description": "Homes in Bali.", "homepage": {"entry": "pages/home"}, "logo": {"media": "media/2026/10/x7…-logo.png"}, ...}}
}
```

Every setting of a collection, taxonomy, global set and form is in the file, "SEO from fields" (`seo_title_field`, `seo_description_field`, `seo_image_field`) and a form's `notify_roles` included (`StructureImporter::COLLECTION`, `TAXONOMY`, `GLOBAL_SET` and `FORM` list them), and the other languages' own URL patterns (`routes`, only when there are some; [translated URLs](site.md#translated-urls)), checked on import like the admin checks them. A taxonomy's `collection_pages` holds each attached collection's [term pages](taxonomies.md#term-pages-and-fields) (`pages`, and its own `route` and `routes` when it has some) and [index page](taxonomies.md#index-pages) (`index`, its own `index_route` and `index_routes` when it has some, and its fields per language, `listings`, like a collection's listing page); a collection it doesn't name keeps its own (new ones get them), and an entry without `index` (a file written before index pages) leaves the index page as it is. The taxonomy's own `listings` are its shared index page's fields; both are imported after entries, for the pages that are on, through `SaveIndexPage`, and index page URLs are checked against listing pages' and other index pages'. The patterns a language had before (`previous_routes`, `StructureImporter::NOT_CARRIED`) are the site's own history and stay out: an import that changes a pattern keeps the site's old one to redirect from.

Menu links point at entries and terms by collection or taxonomy and slug in the main language (`"entry": "pages/about"`; a term's page in a collection, or a taxonomy's index page, names the collection too: `{"index": "topics", "collection": "blog"}`), those in the trash included, so they're found on another site by slug; links whose entry or term was permanently deleted are left out. A structure file written before the pages existed has no links to them, and importing it leaves a menu's links to them alone.

Listing pages' fields and SEO card are always in the file, with files and links written as below; importing one finds them on the site and saves its SEO card as SEO.

`terms`, `entries` and the globals' `values` come with `--entries`. Each language of an entry is what the site shows: a published one its live title, slug and fields, `"published": true` and its `published_at` (a post's date, or the one it's scheduled for, which importing keeps; without one, it's published now), and, when it has changes not published yet, those as its `draft`; one never published (or unpublished) is its draft, `"published": false`. Importing publishes the live version and then saves the `draft` as the draft (`SaveDraft`), so changes an editor hasn't published stay unpublished on the other site too. (Files written before had the draft as the content, so importing one published those changes; a file without `draft` still imports as before.) What field values point at is written so another site finds it, at any depth (groups, repeater rows, flexible blocks, link fields, the SEO card's image): a linked entry as `{"entry": "agents/ayu-pratiwi"}` (its collection and its slug in the main language), a term as `{"term": "locations/canggu"}`, a media file as `{"media": "media/2026/10/x7…-pool.jpg"}` (its path in the library). The file also names the site's languages (`"locales": ["en", "id"]`).

`settings` comes with `--settings` (`export(settings: true)`): Settings → Site's values that describe the site (`StructureImporter::SITE_SETTINGS`: the homepage, name, descriptions, title separator, share image, X account, structured data and the publisher's details and logo), the homepage and images written as above. Not `noindex`, which is where a site runs (a staging copy would hide the new one), nor the other settings (languages, comments, cache, code, mail, branding), which are the app's own or hold addresses and keys. Importing sets each value this site still has as the default, after the entries and files it points at, through `SaveSettings`, checked as the admin checks them; values the site set itself are kept, and the report's `settings` line says which ("Keeps this site's own: name.").

On import these become the site's ids again: entries and terms by slug, files by path, else a file of the same name in the library. Entries that link to others in the file are imported after them; links in a loop (two entries that point at each other) are filled in once both exist. What can't be found here is **left empty**, and the entry's or term's line says so ("Left empty (not on this site): media media/2026/10/x7…-pool.jpg."), in a dry run too; a required field left empty stops the import with that field's message. Plain ids, as files from before have them, are kept as they are, so such a file still imports on the site it came from.

Importing goes through the same actions and checks as the admin: field definitions through `DefinitionValidator`, collections through `SaveCollection`, listing pages through `SaveListing`, entries through `CreateEntry`, `SaveDraft` and `PublishEntry`, menus through `SaveMenu`. Each item is created, or updated when its handle exists:

- a file with texts in a language the site doesn't have (listing pages, titles and labels in other languages, URL patterns, menus' labels, entries' and terms' translations) stops **before anything is imported**: "It has texts in Bahasa Indonesia (id), which isn't one of this site's languages (en). Add it in Settings → Languages or set SUNRICE_LOCALES=en,id, then import again." `--skip-other-languages` (`import(..., skipOtherLanguages: true)`) imports the rest and leaves those texts out, and the report says which languages it left out;
- an update of a fieldset or blueprint that would remove fields is **refused** (its line says which) unless `--force`: rename fields with `sunrice:rename-field` first, so their values move along;
- content is only added: an entry or term that exists (by its slug in the main language) and global values already saved are left alone, and a menu link to an entry or term that isn't there is left out (and noted);
- menus' links are content too: a menu that isn't there is created with the file's links, but a menu that exists keeps its links (those editors added, moved or relabelled included): only the file's links it doesn't have yet (the same entry, term, listing page with the same filters, or address) are added, each after the link it follows in the file, and its line notes "Adds a link to pages/about." `--replace-menus` (`import(..., replaceMenus: true)`) makes existing menus' links the file's instead, and notes each link it removes ("Removes the link to pages/about."): try it with `--dry-run` first;
- any invalid item stops the import, and nothing at all is saved; a dry run saves nothing either.

Running the same file again changes nothing. In code:

```php
use Sunrice\Cms\Structure\{ImportReport, StructureExporter, StructureImporter, StructureImportFailed};

$structure = app(StructureExporter::class)->export(content: false);
$report = app(StructureImporter::class)->import($structure, dryRun: true, force: false, replaceMenus: false);

$report->items();                        // [['type' => 'blueprint', 'handle' => 'page', 'status' => 'updated', 'notes' => []], ...]
$report->status('collection', 'blog');   // ImportReport::CREATED, UPDATED, UNCHANGED or REFUSED
$report->counts();
```

`import()` throws `StructureImportFailed` (with `$item` and `$errors`) for an invalid item.

A dry run can check content that points at files you'll upload before the real import (a starter's, say): `import($structure, dryRun: true, mediaToCome: ['hero.jpg' => '/path/to/hero.jpg'])` counts each file (by name, with its kind read from the local file) as in the media library, so a required image field set to `{"media": "hero.jpg"}` passes. They stand in for the check only and are rolled back with it; a real import with `mediaToCome` throws `InvalidArgumentException`: upload the files first.

## Leftovers

Deleting a collection or a taxonomy keeps its entries or terms out of sight, and its handle taken, so it can be brought back. Their lists (Structure → Collections, Structure → Taxonomies) have a **Trash** with **Restore** (`cms.collections.delete`, `cms.taxonomies.delete`; `CollectionResource::restoreRecord()`), refused when another one took its address meanwhile (`Actions\Collections\RestoreDeleted`), and **Permanently delete**, which deletes it with its entries or terms and frees its handle (`forceDeleteRecord()`, through `PurgeDeleted`).

`sunrice:orphans` lists what's left over:

- deleted collections and taxonomies, with how many entries or terms each keeps;
- media whose file is missing from its disk;
- fields pointing at entries or terms that no longer exist.

`sunrice:orphans --purge` deletes the deleted collections and taxonomies permanently, with their entries (and those entries' languages, revisions and comments) and terms, freeing their handles; it asks first unless `--force` (without a prompt to answer, `--no-interaction`, it deletes nothing and says to add `--force`). In code, `Actions\Collections\PurgeDeleted`:

```php
app(PurgeDeleted::class)->collection($collection);  // the entries deleted; it must be deleted first
app(PurgeDeleted::class)->taxonomy($taxonomy);      // the terms deleted
```

## Demo content

`sunrice:demo-content` fills a site with a small demo through `StructureImporter`: Pages (nested, in manual order) and a Blog whose posts have flexible sections (text and quote blocks), nested Topics with term pages, twelve entries in English and Indonesian (the workbench's languages; others the site doesn't have are skipped), a main menu, a global set, a contact form and two redirects. Running it again adds only what's missing; `--fresh` first deletes the demo's collections, taxonomy, menu, global set, form, redirects, blueprints and fieldsets (by their handles: `pages`, `blog`, `topics`, `main`, `site`, `contact` …), so use it on a demo or workbench site. The workbench's seeder runs it (`composer serve`).
