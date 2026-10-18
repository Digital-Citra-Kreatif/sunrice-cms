# Structure: collections, blueprints and fieldsets

This page is for site managers who decide what kinds of content the site has and which fields editors fill in. You set this up once and adjust it as the site grows; editors then work within it. Everything here lives in the sidebar under **Manage**: **Collections**, **Blueprints**, **Fieldsets** and **Taxonomies**.

## The building blocks

- A **collection** is a type of content, such as *Pages*, *Articles* or *Products*. Each entry belongs to one collection.
- A **blueprint** is the list of fields an entry (or term, or global set) has: a summary, an image, a price, a gallery…
- A **fieldset** is a reusable group of fields that several blueprints can include, such as an *Address* or a *Call to action*.
- A **taxonomy** groups entries by topic; see [Taxonomies](taxonomies.md).
- A **listing page** is a collection's overview page, such as `/blog`, that lists its entries.

Create blueprints first, then the collections that use them.

## Collections

Go to **Manage → Collections**. The list shows each collection's **Title**, **Handle**, **Blueprint**, **Taxonomies** and number of **Entries**. Click **New collection** to create one, or a title to edit it; click **Save** when done.

### Basics

- **Title**: the name in the sidebar. On multilingual sites you can give a title per language.
- **Handle**: the internal name, filled in from the title.
- **Sidebar icon**: the icon shown next to it in the sidebar.
- **Blueprint**: the fields its entries have.
- **Taxonomies**: tick the taxonomies its entries can use, and choose **Many terms** or **One term** per entry.

### Order

Choose how entries are listed on the site and in the admin: **Manual (drag and drop)**, **Published date**, **Created date**, **Last updated** or **Title**, and a direction. With **Manual**, editors drag entries into order on the entries list.

### Pages & URLs

- **Translatable (entries can have a version in each language)**.
- **Each entry has its own page**: turn it off for content that only appears inside other pages, such as team members or FAQs. Such entries have no address, and menus can't link to them.
- **Entry URL**: the address pattern. Leave it empty for `/handle/slug`, type a prefix such as `blog`, a pattern such as `/news/{slug}`, or `/` for the site root. Each collection needs its own.
- **Hierarchical (entries can have a parent entry)**: entries get a **Parent** picker, and a child's address starts with its parent's (`/about/team`).
- **Allow comments**: visitors can comment on each entry; see [Comments](comments.md).
- **Has an archive/listing page**: gives the collection an overview page, with its **Archive/listing URL**, **Entries per page** and an optional **Archive/listing blueprint** for extra fields such as a hero image.

The **SEO defaults** card fills in search-result details that entries leave empty; see [SEO](seo.md).

> [!TECHNICAL]
> **Entry template** and **Archive/listing template** name the Blade views that render the pages (defaults `sunrice.{handle}.show` / `sunrice.show` and `sunrice.{handle}.index` / `sunrice.index`). A URL can also include a related entry, such as `/projects/{project}/{slug}`. When two patterns could match the same address, see [Which URL wins](docs:content-modeling.md#which-url-wins) and [Parent pages](docs:content-modeling.md#parent-pages).

## Listing pages

With **Has an archive/listing page** on, the collection's entries list has an **Archive/listing page** button. There you edit, per language, the **Heading & intro** (**Heading**, **Intro**), any extra fields in **Content**, and **SEO**, then click **Save archive/listing page**. **View** opens the page on the site.

## Blueprints

Go to **Manage → Blueprints**. The list shows how many **Fields** each has and what it is **Used by**. Click **New blueprint**, type a **Title**, add fields, and click **Save blueprint**.

### Add and set up fields

1. Open **Add field** and pick a type. The field appears at the bottom.
2. Click it to open it and fill in **Handle** (internal name), **Label** (what editors see) and optional **Instructions** (a hint under the field).
3. Tick **Required** if the entry can't be saved without it.
4. Use the **Translatable** switch: on means the value differs per language ("differs per language"); off means one value for all languages ("shared by all languages"). Text fields are translatable by default; images, numbers and toggles are shared. The setting applies wherever the blueprint is used.
5. Fill in the type's **Settings**, if any.
6. Drag fields by their grip to reorder them; the bin icon removes one.

### Field types

- **text**, **textarea**, **rich text** (formatted text with headings, links, lists).
- **number**, **toggle** (yes/no), **select** (a list of options), **date** (optionally with time).
- **link** (to an entry or any address), **asset** (images and files from Assets), **entries** (links to other entries), **terms** (terms of one taxonomy).
- **group** (a few fields kept together), **repeater** (rows the editor adds as needed, such as opening hours), **flexible** (content blocks the editor stacks freely, each block type being a fieldset).
- **fieldset** (includes a fieldset's fields here).
- **file** is meant for [forms](forms.md).

## Fieldsets

Go to **Manage → Fieldsets**, click **New fieldset**, add fields the same way as in a blueprint, and click **Save fieldset**. Then include it in a blueprint with a **fieldset** field (**Fieldset to include**), or allow it as a block type in a **flexible** field. Changing a fieldset updates every blueprint that uses it.

## Taxonomies

Go to **Manage → Taxonomies** and click **New taxonomy**. Set the **Title**, an optional **Blueprint** for extra term fields, **Hierarchical (terms have parents)**, and tick the **Collections** that use it. Under **Term pages**, tick **Term archive/listing pages** to give each term a page, with its **Term page URL** and **Entries per page**. Click **Save**.

## Changing structure safely

- **Removing a field** hides its content but keeps it in the database. Add a field with the same handle again to bring it back.
- **Renaming a handle** of a collection, taxonomy, blueprint, fieldset or field can break templates and addresses; the admin warns you before saving. Only do it together with your developer.
- **A blueprint or fieldset in use** can't be deleted. Move its users to another one first.
- **Deleting a collection or taxonomy** hides its entries or terms from the admin and the site but keeps them. Create one with the same handle to bring them back.
- **Changing an Entry URL** changes the address of every entry in the collection, so existing links and search results may point to old addresses.

> [!WARNING]
> When you can, try structural changes on a copy of the site first.

> [!TECHNICAL]
> Moving content to a renamed field: `php artisan sunrice:rename-field {blueprint} {from} {to}`. Erasing hidden content of deleted collections and taxonomies: `php artisan sunrice:orphans --purge`. See [Changing handles](docs:content-modeling.md#changing-handles), [Deleting collections and taxonomies](docs:content-modeling.md#deleting-collections-and-taxonomies) and [Artisan commands](docs:commands.md#content).
