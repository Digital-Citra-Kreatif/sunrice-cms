# Structure

**Structure** is where site managers decide what content the website has and how it's organised. Editors rarely need it. Changes here affect everyone's work, so plan them with your team, and with your developer when a change needs a new design (a template).

## Setting up a new site, in order

Some settings point at other things, so they can only be chosen once those exist. Building a site from nothing, this order saves you failed saves:

1. **Fieldsets** of plain fields (an address, a call to action), and **blueprints** with plain fields only (text, media, dates…): nothing that points at a collection or a taxonomy yet.
2. **Taxonomies** (*Topics*, *Locations*), without their collections for now.
3. **Collections**, each with its blueprint.
4. Back to the **blueprints** (and fieldsets): add the **Entries** fields, which link to collections, and the **Terms** fields, which link to taxonomies.
5. Back to the **taxonomies**: tick the **Collections** whose entries they group.
6. **Global sets**, **menu settings** and **forms**; then the content, and the homepage in Settings → Site.

On the dashboard, **Getting the site ready** lists what's still missing.

### Handles

A **handle** (of a field, a collection, a taxonomy…) is how templates name it: lowercase letters, digits and underscores, starting with a letter. `contact_person` works; `contact-person` (a hyphen) and `ContactPerson` don't. The panel makes one from the title or label as you type.

Every entry has these already, so no field may use them as its handle: `id`, `title`, `slug`, `url`, `status`, `locale`, `published_at`, `created_at`, `updated_at`, `parent`, `children`, `collection`, `blueprint`, `data`, `seo`, `author`.

A **Fieldset** field puts the fieldset's fields where it sits, as if they were the blueprint's own: their handles count as the blueprint's (two fields can't share one), and the Fieldset field's own handle isn't used by anything.

## Collections

A **collection** is a kind of content: *Pages*, *Blog*, *Products*, *Events*. **Structure → Collections** lists them; **New collection** adds one.

| Setting | |
| --- | --- |
| **Title** | The name editors see, and visitors in the main language. |
| **Title in …** | On a multilingual site, one per other language: what visitors read there (the listing page's heading, breadcrumbs, menus). Empty: the title. |
| **Handle** | A short code used by templates, like `articles`: lowercase letters, digits and underscores. It can be changed later: roles keep their permissions, but the form warns you about templates and code that name it, which your developer must update. |
| **Blueprint** | The fields its entries have (see below). Changing it keeps what entries already hold. |
| **Other blueprints** | More blueprints an entry may switch to, in its Page settings (a landing page among pages, for example). |
| **Translatable** | Entries can have a version in each language. Off: they're in the main language only (useful for things that don't change per language). |
| **Dated entries** | Entries show a date and list newest first, like articles. |
| **Manual order** | Editors put entries in order (**Reorder** above the entries list, or the **Move up** and **Move down** arrows) instead of by date or title. |
| **Hierarchical** | Entries may sit under a parent entry, like pages under pages (for breadcrumbs and sub-menus; addresses stay the same). |
| **Each entry has its own page** | Off: entries have no address, like FAQs or team members a template shows. |
| **Entry URL** | Where entries are on the website, with `{slug}` for each entry's slug: `/blog/{slug}`, or `/{slug}` for pages at the top. Empty: `/{handle}/{slug}`. |
| **Template** | The design entries use, if your developer made one for it. |
| **Has a listing page**, **Listing page URL**, **Listing page fields**, **Entries per page** | A page listing the entries (like `/blog`; empty: `/{handle}`), its own fields (an introduction), and how many entries it shows per page. |
| **Allow comments** | Visitors may comment on its entries (it needs a URL). |
| **Structured data type** | What search engines are told its entries are (an article, a web page, a real estate listing, or a person, place or product the page is about…). |

Deleting a collection doesn't delete its entries: they leave the panel and the website. The list's **Trash** shows deleted collections, with **Restore** to bring one back. Deleting them for good, with their entries, is for a developer (`sunrice:orphans --purge`), so a slip in the panel can always be undone.

Each collection gets its own permissions (view, create, edit, publish, delete and export its entries), so a role can be limited to the *Blog*, for example. See [Users and roles](guide:panel/users-roles).

## Blueprints and fieldsets

A **blueprint** is a list of fields: what editors fill in for a collection's entries, a taxonomy's terms, a global set or a form. A **fieldset** is a group of fields used in several blueprints (an address, a call to action). Edit them under **Structure → Blueprints** and **Fieldsets**.

To add a field, choose its type, then set:

- **Label**: what editors see. The **Handle** (how templates read the field) is made from it; renaming a handle later hides values saved under the old one, so ask your developer to rename fields safely. A blueprint's top-level fields can't use the handles the content keeps for itself, and the builder says so as you type: `id`, `title`, `slug`, `url`, `status`, `locale`, `published_at`, `created_at`, `updated_at`, `parent`, `children`, `collection`, `blueprint`, `data`, `seo`, `author`.
- **Instructions**: a hint shown under the field.
- **Required**: the entry can't be saved or published without it.
- **Translatable**: on, each language gets its own value; off, one value is shared by every language. It starts as the type suggests (on for text, off for numbers, dates, switches and media). In the field's row, a **Shared** marker shows the fields that aren't translated.
- **In other languages** (on a site with several languages): the label, instructions and a choice list's options as visitors read them in each other language. Forms on the website show these, and their error messages name the field this way. Empty: as written above.
- **Visibility**: a field can show only sometimes. **Add condition** and pick another field, how to compare and the value (a choice list's own options, *switched on* or *switched off* for a toggle, a term or an entry): *Only when Layout is Video*. With two conditions or more, choose **All of these** or **Any of these**. A hidden field isn't required and keeps what it had.
- **Extra rules**: checks for developers, one per line (such as `email`).
- Each type's own settings: the choices of a select, the collections an entries field links to, the types a media field accepts, how many items at most…

The types: **Text**, **Textarea**, **Rich text**, **Number**, **Toggle**, **Select**, **Date**, **Link**, **Media**, **Entries**, **Terms**, **Group** (fields together), **Repeater** (rows of fields), **Flexible content** (blocks of different kinds), **Fieldset** (include a fieldset: its fields are added where it is, with their own handles; to keep them under one name, put it in a **Group**) and **File (forms)** (files visitors send with a form: one, or several with **Several files**).

Each field's row shows its type, label and handle, with **Duplicate** (a copy right below it, labelled "(copy)", with a handle of its own, saved with the blueprint) and **Remove** at its end. Drag the fields into order by their handle (the fields inside a group or repeater among themselves), then click **Save** (or **Create blueprint** for a new one). A blueprint still in use can't be deleted. Once a blueprint is used for entries or terms, a global set or a form, the other kinds of picker no longer offer it.

## Taxonomies

**Structure → Taxonomies**: a **Title** (and a **Title in …** each other language, for visitors on its term pages), a **Handle** (changeable later, as for collections), **Nested terms** (terms under other terms, like subcategories), the **Collections** whose entries it groups, a **Term pages URL** (like `/topics/{slug}`; empty: terms have no pages), **Term fields** (a blueprint for the terms' own fields), and a **Template**. Editors then add the terms under Taxonomies in the sidebar (see [Terms](guide:website/terms)). To let editors give entries terms, add a **Terms** field to the collection's blueprint: that's enough for the entries list to filter by the taxonomy too, without ticking the collection here.

## Global sets

**Content → Globals → New global set**: a **Title**, a **Handle** and a **Blueprint** for the set's fields (later, the set's **Settings**). Opening a set shows its values (see [Globals](guide:website/globals)).

## Menus

**Content → Menus → New menu**: a **Title** and a **Handle** (like `main` or `footer`) that templates use (later, the menu's **Settings**). Opening a menu shows its links (see [Menus](guide:website/menus)).

## Forms

**Structure → Forms**: a **Title**, a **Handle** (changeable later, as for collections), a **Blueprint** with the form's fields (visitors get the text, textarea, number, toggle, select, date and file ones), and:

- **Email to**: addresses that receive each submission, one per line; **Also email roles**: everyone with these roles too.
- **Thank-you message**: shown after sending (with one per other language on a multilingual site; empty there, the website's own thank-you in that language); or **After sending, go to** a page of your choice.
- **Sends per visitor a minute** and **Require a captcha**, against spam.

Your developer then puts the form on a page. What visitors send arrives under Content → Submissions (see [Form submissions](guide:website/submissions)).

## Redirects

**Structure → Redirects** lists the redirects made when entries changed address, and takes your own: **From** a path on the site (starting with `/`), **To** a path or a web address, **Moved for good (301)** or **For now (302)**. A live page always wins over a redirect from its address.

> [!TECHNICAL]
> Structure can be exported and imported between sites (`sunrice:export-structure`, `sunrice:import-structure`), and fields renamed safely (`sunrice:rename-field`). See [Structure tools](docs:cms/structure) and [Fields](docs:cms/fields).
