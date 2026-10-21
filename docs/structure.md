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

The admin shows them as **Used by**, in the entry editor's sidebar and on a term's page. Moving a used entry or term to the trash names where it's used in the confirmation. Deleting one for good is refused unless forced, since those fields would then show nothing:

```php
app(ForceDeleteEntry::class)->handle($entry, force: true);
app(DeleteTerm::class)->handle($term, force: true);
```

The editors ask first and then force; bulk deletes skip entries in use. An entry that only points at itself doesn't count.

References are rebuilt from what is stored with `php artisan sunrice:references` (`--dry-run` only counts): every entry translation (draft and live, in the trash too), term translation and global value, in chunks, as a save would record them, with the media library's usages of entries and global sets too. Run it after changing content in the database directly or importing it some other way. Migrating does it once for content saved before references were recorded (migration `000022` runs it after `000019`), so `php artisan migrate` fills them in on an existing site. In code:

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
- terms' pages, global sets' values, listing pages and form submissions;
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
        "listing_route": "/blog", "listing_blueprint": "page", "per_page": 10, "listings": {"en": {"intro": "News"}}, ...}],
    "taxonomies": [{"handle": "topics", "title": "Topics", "hierarchical": true, "collections": ["blog"], ...}],
    "globals": [{"handle": "site", "title": "Site", "blueprint": "site_info", "values": {"en": {...}}}],
    "forms": [{"handle": "contact", "title": "Contact", "blueprint": "contact_form", "notify": ["team@example.com"], ...}],
    "menus": [{"handle": "main", "title": "Main", "items": [
        {"entry": "pages/about", "labels": {}, "new_tab": false, "children": []},
        {"term": "topics/news"}, {"collection": "blog", "labels": {"en": "Blog"}}, {"url": "https://example.com", "labels": {"en": "Shop"}}
    ]}],
    "redirects": [{"from": "/old", "to": "/new", "status": 301}],
    "terms": [{"taxonomy": "topics", "slug": "local", "parent": "news", "translations": {"en": {"title": "Local", "slug": "local", "data": {...}}}}],
    "entries": [{"collection": "pages", "slug": "team", "parent": "about", "template": null,
        "translations": {"en": {"title": "Team", "slug": "team", "data": {...}, "published": true}}}]
}
```

Every setting of a collection, taxonomy, global set and form is in the file, "SEO from fields" (`seo_title_field`, `seo_description_field`, `seo_image_field`) and a form's `notify_roles` included (`StructureImporter::COLLECTION`, `TAXONOMY`, `GLOBAL_SET` and `FORM` list them).

Menu links point at entries and terms by collection or taxonomy and slug in the main language (`"entry": "pages/about"`), those in the trash included, so they're found on another site by slug; links whose entry or term was deleted for good are left out. A structure file written before the pages existed has no links to them, and importing it leaves a menu's links to them alone.

`terms`, `entries` and the globals' `values` come with `--entries` (entries as their drafts, and whether each language is published). Ids inside field values (media, entries, terms) are written as they are, so they mean the same only on the same site or one filled in the same order.

Importing goes through the same actions and checks as the admin: field definitions through `DefinitionValidator`, collections through `SaveCollection`, listing pages through `SaveListing`, entries through `CreateEntry`, `SaveDraft` and `PublishEntry`, menus through `SaveMenu`. Each item is created, or updated when its handle exists:

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

## Leftovers

Deleting a collection or a taxonomy keeps its entries or terms out of sight, and its handle taken, so it can be brought back. Their lists (Structure → Collections, Structure → Taxonomies) have a **Trash** with **Restore** (`cms.collections.delete`, `cms.taxonomies.delete`; `CollectionResource::restoreRecord()`), refused when another one took its address meanwhile (`Actions\Collections\RestoreDeleted`).

`sunrice:orphans` lists what's left over:

- deleted collections and taxonomies, with how many entries or terms each keeps;
- media whose file is missing from its disk;
- fields pointing at entries or terms that no longer exist.

`sunrice:orphans --purge` deletes the deleted collections and taxonomies for good, with their entries (and those entries' languages, revisions and comments) and terms, freeing their handles; it asks first unless `--force`. In code, `Actions\Collections\PurgeDeleted`:

```php
app(PurgeDeleted::class)->collection($collection);  // the entries deleted; it must be deleted first
app(PurgeDeleted::class)->taxonomy($taxonomy);      // the terms deleted
```

## Demo content

`sunrice:demo-content` fills a site with a small demo through `StructureImporter`: Pages (nested, in manual order) and a Blog whose posts have flexible sections (text and quote blocks), nested Topics with term pages, twelve entries in English and Indonesian (the workbench's languages; others the site doesn't have are skipped), a main menu, a global set, a contact form and two redirects. Running it again adds only what's missing; `--fresh` first deletes the demo's collections, taxonomy, menu, global set, form, redirects, blueprints and fieldsets (by their handles: `pages`, `blog`, `topics`, `main`, `site`, `contact` …), so use it on a demo or workbench site. The workbench's seeder runs it (`composer serve`).
