# Content modeling

## Collections

A **collection** is a content type (`pages`, `articles`, `products`).
Settings:

- `route` — public URL of entries. Type a prefix (`blog` → `/blog/{slug}`),
  a full pattern (`/news/{slug}`) or `/` for the site root; empty follows
  the handle (`/{handle}/{slug}`). Each collection needs its own. The
  pattern can also name an Entries field (see
  [Related entries in URLs](#related-entries-in-urls)).
- `icon` — sidebar icon in the admin.
- `archive_route` — archive URL when `has_archive` is on.
- `has_single`, `has_archive` — toggle detail/archive pages.
- `comments` — visitors can comment on entries (see [Comments](comments.md)).
- `hierarchical` — entries can have a parent entry (see
  [Parent pages](#parent-pages)).
- `translatable`, `sluggable`, `dated`, `archivable`.
- `per_page` — archive pagination size.
- `template` — default Blade view for singles.
- `taxonomies` — attached taxonomy ids.

## Blueprints and fieldsets

**Blueprints** define the editable fields of a collection, taxonomy,
global or template part. **Fieldsets** are reusable groups of fields
included inside blueprints via a `fieldset` field.

Changing an entry's blueprint never deletes stored data — fields absent
from the active blueprint are hidden, not erased.

## Field types

`text`, `textarea`, `rich_text`, `number`, `toggle`, `select`, `date`,
`link`, `asset`, `entries`, `terms`, `group`, `repeater`, `flexible`,
`fieldset`, `file` (forms only).

Each field: `handle`, `type`, `label`, `required`, `instructions`,
`conditions` (`{field, operator, value}`), `validation` (extra Laravel
rules), `translatable` (see [multilingual](multilingual.md#which-fields-are-translatable)),
`config` (per-type options).

Repeater rows and flexible blocks each get an optional key and a Show
switch in the editor; templates read keyed items with `->byKey('key')`.

## Entries

- Whole-entity translations: each locale has its own `EntryTranslation`
  (title, slug, data, seo, ready flag, draft/live payloads).
- Drafts edit the `draft` column; publishing copies it to the live
  payload and creates a revision.
- `Draft`/`Ready` per translation controls which locales can be
  requested publicly.
- Slugs are unique per `(collection, locale)` including trashed rows;
  rename + publish leaves a `301` redirect on the old slug.

## Two people editing the same thing

Editors take turns, like WordPress. Whoever opens an entry language, a
term or a global set first holds it; the open page renews the hold every
15 seconds, and it lapses 2 minutes after the page closes.

- Someone else who opens it sees who is editing and since when, and can
  **Go back**, **View only** (everything is read-only), or **Take over**
  (after confirming).
- On a take over, the first editor is told within a few seconds and sent
  back to the list. Their unsaved changes are not lost: they're kept
  aside, and the editor page shows them with **Load into the form** or
  **Discard**. Nothing is written into the draft until someone saves.
- Each language of an entry (and of a global set) is held separately, so
  translators can work side by side.
- The same person in two tabs is never locked out by themselves.
- Saves also check the version: if what you opened was saved by someone
  else since (say, from a tab that never held the lock), the save is
  refused and you choose **Reload** or **Overwrite with mine**.

Holds live in the cache store (`sunrice.cache.store`), so every server
must share it.

## Which URL wins

Every collection's entry URL (`route`) and listing URL (`archive_route`),
and every taxonomy's term URL, is a pattern. For each request Sunrice tries
them in this order and stops at the **first pattern that matches**:

1. **Fixed URLs** (no `{slug}`): collection listing pages such as `/blog`
   or `/products`.
2. **Patterns with `{slug}`**, the most specific first: the one with more
   fixed characters wins, so `/blog/category/{slug}` comes before
   `/blog/{slug}`, which comes before `/{slug}`.
3. On a tie (same fixed text), collections before taxonomies, then in the
   order they were created.

The first match is final: when no entry or term has that slug, the page
is a 404 (or a [redirect](#entries) from an old slug). Sunrice doesn't try
the next pattern.

What that means in practice:

| Set up | Visiting | Shows |
| --- | --- | --- |
| Pages at `/{slug}` with a page whose slug is `blog`, and Articles' listing at `/blog` | `/blog` | The Articles listing. The page can't be reached: rename its slug. |
| Pages at `/{slug}` and Articles at `/blog/{slug}` | `/blog/hello` | The article. `/hello` is a page. |
| Pages at `/{slug}` and a taxonomy's terms at `/{slug}` | `/news` | Only pages are looked up (collections first); give the terms a prefix such as `/topic/{slug}`. |
| Two collections at the same pattern | — | Not allowed: saving the second collection is refused. |

Slugs only have to be unique within a collection and language, so give
listing pages and root-level pages different names, and keep root-level
patterns (`/` or `/{slug}`) to one collection. Fixed URLs in your own
Laravel routes (`routes/web.php`) win over all of these.

## Parent pages

Turn on **Hierarchical** for a collection (Structure → Collections →
Pages & URLs) and each entry gets a **Parent** picker in the editor. A
child's URL starts with its parents' slugs: with the route `/{slug}`,
*Team* under *About* lives at `/about/team`, and *Leaders* under *Team* at
`/about/team/leaders` (up to 10 levels).

- Each language uses its own slugs for the whole path (falling back to the
  main language's, as for single slugs).
- Moving an entry to another parent, or renaming a parent's slug, changes
  the URLs below it; the old addresses redirect (`301`) to the new ones.
- Slugs stay unique per collection and language, so a page is always
  found by its own slug.
- Deleting an entry for good moves its children to the top level.

In templates, `$entry->parent`, `$entry->ancestors()` (top-down, for
breadcrumbs) and `sunrice_entries('pages')->childrenOf($entry)->get()`
(sub-navigation; `childrenOf(null)` for top-level pages).

## Related entries in URLs

A collection's URL can include the slug of an entry it links to. For
*Units* that each belong to a *Project*:

1. Give the Units blueprint an **Entries** field `project`, limited to the
   `projects` collection, with a maximum of 1.
2. Set the Units route to `/projects/{project}/{slug}`.

A unit whose `project` field links to *Tower A* now lives at
`/projects/tower-a/unit-1`. On the project's page, list its units with
`sunrice_entries('units')->whereEntry('project', $entry)->get()`.

- Any `{name}` besides `{slug}` must be an Entries field of the
  collection's blueprint; saving the collection checks this. When the
  field links to several entries, the first one is used.
- A unit is found by its own slug (unique per collection and language),
  so a URL with the wrong or an old project slug redirects (`301`) to the
  unit's address. Renaming a project or moving a unit to another one
  keeps old links working.
- Each language uses the linked entry's slug in that language, falling
  back to the main language's.
- A unit that links to no project uses `-` for that segment:
  `/projects/-/unit-1`. Make the field required to avoid this.
- Keep a fixed prefix (`/projects/...`): a pattern that starts with
  `{project}` competes with root-level pages and language prefixes.

## Taxonomies

Hierarchical (optional) terms with per-locale `name` + `slug`; terms can
have their own blueprint. `EntryQuery::whereTerm()` optionally includes
child terms.

Attach a taxonomy to collections from either side: the taxonomy form's
**Collections** list or the collection form's **Taxonomies** list (one
taxonomy can serve several collections).

With **Term archive pages** (`has_archive`) on, each term gets a page
listing its entries:

- by default one page per attached collection, at
  `/{collection}/{taxonomy}/{slug}` (e.g. `/blog/category/news`), listing
  only that collection's entries;
- with a `route` (a prefix like `topics` or a pattern like
  `/topics/{slug}`), one page per term across all collections;
- attached to no collection: `/{taxonomy}/{slug}`.

In templates, `$term->url` links to the first collection's page and
`$term->urlIn($collection)` to a specific one.

## Menus

Menus contain nested items of type `entry`, `collection`, `term` or
`url`, with per-locale `labels`. `Sunrice::menu('main')` resolves item
URLs and drops unpublished targets.

## Globals and template parts

`globals` (group `global`) hold site-wide values; `template_parts`
(group `template_part`) hold header/footer-type blocks. Both read via
`Sunrice::global('handle')` / `sunrice_global('handle')`, honoring the
whole-entity fallback.

## Deleting collections and taxonomies

Deleting a collection or taxonomy in the admin doesn't erase its content.
Its entries (or terms) stay in the database but disappear from the admin,
the site, menus, sitemaps and queries.

- **Bring them back:** create a collection (or taxonomy) with the same
  handle. The old one is restored with all its entries or terms, and roles
  keep their permissions for it.
- **Erase them for good:** list what's kept, then purge it on the server:

```bash
php artisan sunrice:orphans                         # list
php artisan sunrice:orphans --purge                 # delete everything listed (asks first)
php artisan sunrice:orphans --purge --handle=news   # only the "news" collection
```

While a deleted collection keeps its handle, no other collection can be
renamed to it. In code, `Entry::withoutGlobalScope(HiddenWithParent::class)`
(and the same on `EntryTranslation`, `Term`, `TermTranslation`) includes
the hidden rows.

## Changing handles

Handles are how templates, code and URLs find a collection, taxonomy,
blueprint or fieldset: template folders (`sunrice/{handle}/…`),
`sunrice_entries('{handle}')`, `whereTerm('{handle}', …)`, fieldset imports
and default URLs. Renaming one doesn't update any of those, so the admin
warns before you save a new handle. Only rename when you'll update every
reference too.


## Importing structure

A package or starter kit can create the collections, blueprints,
taxonomies and other structure it needs from a definition, instead of
asking people to click them together:

```php
use Sunrice\Facades\Sunrice;

$report = Sunrice::importStructure([
    'fieldsets' => [
        ['handle' => 'specs', 'title' => 'Specs', 'fields' => [/* field definitions */]],
    ],
    'blueprints' => [
        ['handle' => 'product', 'title' => 'Product', 'fields' => [/* … */]],
        ['handle' => 'brand', 'title' => 'Brand', 'fields' => [/* … */]],
    ],
    'taxonomies' => [
        ['handle' => 'brands', 'title' => 'Brands', 'blueprint' => 'brand',
         'settings' => ['has_archive' => true, 'route' => '/brands/{slug}']],
    ],
    'collections' => [
        ['handle' => 'products', 'title' => 'Products', 'blueprint' => 'product',
         'taxonomies' => ['brands'], 'archive_blueprint' => null,
         'settings' => ['route' => '/products/{slug}', 'has_archive' => true, 'archive_route' => '/products']],
    ],
    'globals' => [['handle' => 'store', 'title' => 'Store', 'blueprint' => 'store', 'group' => 'global']],
    'forms' => [['handle' => 'product_inquiry', 'title' => 'Product inquiry', 'fields' => [/* … */], 'settings' => [/* … */]]],
    'entries' => [['collection' => 'pages', 'slug' => 'terms', 'title' => 'Terms & Conditions', 'data' => [/* … */]]],
    'menus' => [['handle' => 'shop', 'title' => 'Shop', 'items' => [
        ['type' => 'collection', 'target' => 'products', 'labels' => ['id' => 'Toko'], 'children' => [
            ['type' => 'entry', 'target' => 'pages/terms'],
        ]],
        ['type' => 'url', 'url' => '/cart'],
    ]]],
]);
```

From the command line, with a `.php` file returning that array or a
`.json` file:

```bash
php artisan sunrice:import-structure database/structure.php --dry-run
php artisan sunrice:import-structure database/structure.php
php artisan sunrice:import-structure database/structure.php --force
```

- Items are matched by handle (entries by collection and slug in the main
  language) and saved through the same actions as the admin, so the same
  validation applies. Blueprints, taxonomies and collections refer to each
  other by handle. Every section is optional.
- Handles of collections, taxonomies, globals, forms and menus are
  lowercase letters, digits and `_`.
- **Run it again safely.** An item that exists and matches is left alone
  (`unchanged`). One that exists but differs — an admin edited it, or the
  definition changed — is reported (`changed`, with the fields that
  differ) and kept as it is; `force` overwrites it (`updated`). Settings
  the definition doesn't name are kept either way.
- Entries are created as drafts and menus with their items; existing ones
  are never changed.
- A dry run reports what would happen and saves nothing. An invalid item
  stops the import with its name (`collections.products: …`) and nothing
  is saved.
- Permissions for new collections, taxonomies and forms are created
  (`sunrice:sync-permissions` isn't needed).
- The report (`Sunrice\Structure\ImportReport`) lists each item with its
  type, handle, result and differences: `$report->items('changed')`,
  `$report->status('collection', 'products')`, `$report->toArray()`.
