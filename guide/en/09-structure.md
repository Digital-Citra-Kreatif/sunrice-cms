# Structure

**Structure** is where site managers decide what content the website has and how it's organised. Editors rarely need it. Changes here affect everyone's work, so plan them with your team, and with your developer when a change needs a new design (a template).

## Setting up a new site, in order

Some settings point at other things, so they can only be chosen once those exist. Building a site from nothing, this order saves you failed saves:

1. **Fieldsets** of plain fields (an address, a call to action), and **blueprints** with plain fields only (text, media, dates…): nothing that points at a collection or a taxonomy yet.
2. **Taxonomies** (*Topics*, *Locations*), without their collections for now.
3. **Collections**, each with its blueprint.
4. Back to the **blueprints** (and fieldsets): add the **Entries** fields, which link to collections.
5. Back to the **taxonomies**: tick the **Collections** whose entries they group (or, on each collection, its **Taxonomies**): their entries get the terms in the editor's **Taxonomies** card.
6. **Global sets**, **menu settings** and **forms**; then the content, and the homepage in Settings → Site.

On the dashboard, **Getting the site ready** lists what's still missing.

### Handles

A **handle** (of a field, a collection, a taxonomy…) is how templates name it: lowercase letters, digits and underscores, starting with a letter. `contact_person` works; `contact-person` (a hyphen) and `ContactPerson` don't. The panel makes one from the title or label as you type. Under it, a line **For developers** shows how templates use it, with the handle you typed (like `<x-sunrice-cms::form handle="newsletter" />` for a form): pass it on to your developer.

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
| **Taxonomies** | The taxonomies whose terms its entries get, in the entry editor's **Taxonomies** card (*Topics*, *Tags* …), with **one term only** for each where an entry should have one at most. The same as ticking the collection on the taxonomy. |
| **Hierarchical** | Entries may sit under a parent entry, like pages under pages (for breadcrumbs and sub-menus; addresses stay the same). |
| **Each entry has its own page** | Off: entries have no address, like FAQs or team members a template shows. |
| **Entry URL** | Where entries are on the website, with `{slug}` for each entry's slug: `/blog/{slug}`, or `/{slug}` for pages at the top. Empty: `/{handle}/{slug}`. A new URL that would put an entry where a listing page or index page is (a page `books` at `/books`) is refused: the message names both. |
| **Entry URL in …** | With more than one language, each other language can have its own, under its prefix: `/buku/{slug}` for Indonesian gives `/id/buku/…` instead of `/id/books/…`. Empty (it shows the main URL in grey): the main URL under the language's prefix. |
| **Template** | The design entries use, if your developer made one for it. |
| **Has a listing page**, **Listing page URL**, **Listing page blueprint**, **Entries per page**, **Listing page template** | A page listing the entries (like `/blog`; empty: `/{handle}`), a blueprint giving it fields of its own (an introduction, a hero image; editors fill them in under the collection's entries → **Listing page**; **New blueprint →** or **Edit blueprint →** under it; *None* for no editable fields), how many entries it shows per page, and the design it uses, if your developer made one for it. **Listing page URL in …** gives each other language its own (like `/buku`, with **View on site** ↗ under it). A URL that an entry or term has already is refused, naming it. |
| **Allow comments** | Visitors may comment on its entries (it needs a URL). |
| **Structured data type** | What search engines are told its entries are (an article, a web page, a real estate listing, or a person, place or product the page is about…). |

When you give a language its own URL (or change it), its old addresses keep working: visitors and search engines are sent on to the new ones (`/id/books/halo` → `/id/buku/halo`). No two collections may share a URL in a language.

Once saved, the form's cards link where you'd go next: **View entries** (Entry pages), **View on site** ↗ and **Edit listing page** (Listing page: its fields, search details and template). A template setting offers **Automatic** (the design your developer made for that kind of page) and the templates there are, or **Other view…** for a name your developer gives you; the line under it says which file is used, and **Which file?** opens the list of template files tried, for your developer.

Deleting a collection doesn't delete its entries: they leave the panel and the website. The list's **Trash** shows deleted collections, with **Restore** to bring one back and **Permanently delete** to remove it for good, with all its entries, which frees its handle for a new collection. That can't be undone, so the panel asks first. Taxonomies work the same way, with their terms.

Each collection gets its own permissions (view, create, edit, publish, delete and export its entries), so a role can be limited to the *Blog*, for example. See [Users and roles](guide:panel/users-roles).

## Blueprints and fieldsets

A **blueprint** is a list of fields: what editors fill in for a collection's entries, a taxonomy's terms, a global set or a form. A **fieldset** is a group of fields used in several blueprints (an address, a call to action). Edit them under **Structure → Blueprints** and **Fieldsets**.

If your role may change blueprints, you don't need to look one up: wherever a blueprint is chosen (a collection's **Blueprint**, **Other blueprints** and **Listing page blueprint**, a taxonomy's **Blueprint** and **Index page blueprint**, a global set's or a form's **Blueprint**), **Edit blueprint →** under it opens the one chosen, and **New blueprint →** makes one while none is. Where content is edited (an entry, a term, a global set, a listing or index page, a form's submissions, and the entries and terms lists), the **⋮** menu has **Edit blueprint**.

To add a field, choose its type, then set (its settings are grouped as **Basics**, **Options**, **Limits and defaults**, **Appearance**, **Visibility** and **Advanced**):

- **Label**: what editors see. The **Handle** (how templates read the field) is made from it; renaming a handle later hides values saved under the old one, so ask your developer to rename fields safely. A blueprint's top-level fields can't use the handles the content keeps for itself, and the builder says so as you type: `id`, `title`, `slug`, `url`, `status`, `locale`, `published_at`, `created_at`, `updated_at`, `parent`, `children`, `collection`, `blueprint`, `data`, `seo`, `author`.
- **Helper text**: shown under the field (under a group's, repeater's or block list's heading). Simple Markdown works: `[text](https://…)` for a link (it opens in a new tab), `**bold**`, `*italic*` and `` `code` ``.
- **Hint** and **Hint tooltip**: a short note at the right of the field's label in small grey text (*Before tax*, *Max 160 characters*), and a longer explanation behind an ⓘ beside it, shown when you point at it or tab to it.
- **Required**: the entry can't be saved or published without it.
- **Translatable**: on, each language gets its own value; off, one value is shared by every language. It starts as the type suggests (on for text, off for numbers, dates, switches and media). In the field's row, a **Shared** marker shows the fields that aren't translated. Switching it off for a field that was translated doesn't lose the other languages' values: they're kept out of sight (every language shows the main language's value) and come back if you switch it on again.
- **Width**: how much of the row the field takes in the editor: 25%, 33%, 50%, 66%, 75% or 100% (the default). Fields side by side share a row (two at 50%, 33% and 66%, four at 25%) and wrap to the next row when they don't fit; in a narrow place (the editor on a phone) every field is full width. It works inside groups, repeater rows and blocks too, and a fieldset's fields keep the widths set in the fieldset. The field's row shows its width (**50%**) when it isn't 100%. Forms on the website are laid out by their template.
- **Appearance** (text, number, long text, code and link fields): the **Placeholder** shown in the empty input, and for text and numbers a **Prefix** and **Suffix** attached to the input (`Rp` before a price, `m²` after an area, `https://` before an address). They only change how the input looks: what's saved is what's typed.
- **In other languages** (on a site with several languages; **In …** with one other): the label, helper text and a choice list's options as visitors read them in each other language, a tab per language. Forms on the website show these, and their error messages name the field this way. Empty: as written above.
- **Visibility**: a field can show only sometimes. **Add condition** and pick another field, how to compare and the value (a choice list's own options, *switched on* or *switched off* for a toggle, a term or an entry): *Only when Layout is Video*. With two conditions or more, choose **All of these** or **Any of these**. A hidden field isn't required and keeps what it had.
- **Extra rules** (under **Advanced**): checks for developers, one per line (such as `email`).
- Each type's own settings: the choices of a select, the collections an entries field links to, the types a media field accepts… A **Several** switch (**Several terms**, **Several entries**, **Several files**, **Several choices**) lets editors pick more than one; while it's on, **At most** next to it limits how many (empty: no limit).

The types: **Text**, **Textarea**, **Rich text**, **Code** (code to show or embed, in an editor with line numbers and colours for its **Language**: HTML, CSS, JavaScript, JSON or plain text; Tab indents, and Esc then Tab moves to the next field. The website shows it as text unless its template is made to run it; it's never machine-translated), **Number**, **Toggle**, **Select**, **Date**, **Link**, **Media**, **Entries**, **Terms**, **Group** (fields together), **Repeater** (rows of fields), **Flexible content** (blocks of different kinds), **Fieldset** (include a fieldset: its fields are added where it is, with their own handles; to keep them under one name, put it in a **Group**) and **File (forms)** (files visitors send with a form: one, or several with **Several files**).

Each field's row shows its type, label and handle, with **Duplicate** (a copy right below it, labelled "(copy)", with a handle of its own, saved with the blueprint) and **Remove** at its end. Drag the fields into order by their handle (the fields inside a group or repeater among themselves), then click **Save** (or **Create blueprint** for a new one). A blueprint still in use can't be deleted. Once a blueprint is used for entries or terms, a global set or a form, the other kinds of picker no longer offer it.

## Taxonomies

**Structure → Taxonomies**, laid out like a collection's form. **General**: a **Title** (and a **Title in …** each other language, for visitors on its term pages), a **Handle** (changeable later, as for collections), a **Blueprint** (the fields its terms have) and **Nested terms** (terms under other terms, like subcategories). **Collections**: the collections whose entries it groups. Ticking one lets editors give its entries terms, in the entry editor's **Taxonomies** card, and its entries list filters by the taxonomy; blueprints don't change. Under each one ticked: **One term only** (each entry of that collection has one term at most), and that collection's own **Term pages** and **Index page** with their URLs (like `/books/tags/featured` and `/books/tags`). **Term pages**: **Shared term pages** (a page per term listing its entries from every collection), its **Shared term page URL** (like `/topics/{slug}`; empty: `/{handle}/{slug}`; one that would put a term where a listing or index page is, is refused) with a **… in …** each other language, and the **Term page template** for every term page (with **View terms**, its terms list): the default design, which a term's own **Template** overrides, and which a design your developer made for one collection's term pages comes before. **Index pages**: the **Shared index page** listing all its terms and its URL, then an **Index page blueprint** and an **Index page template** (fields and a design of their own for its index pages, the shared one and each collection's), with **View the index page** ↗ and **Edit index page**. Editors then add the terms under Taxonomies in the sidebar (see [Terms](guide:website/terms)). The card beside the form lists the collections the taxonomy groups. When you untick a collection, its entries keep their terms, out of sight, and get them back if you tick it again.

## Global sets

**Content → Globals → New global set**: a **Title**, a **Handle** and a **Blueprint** for the set's fields (later, the set's **Settings**). Opening a set shows its values (see [Globals](guide:website/globals)).

## Menus

**Content → Menus → New menu**: a **Title** and a **Handle** (like `main` or `footer`) that templates use (later, the menu's **Settings**). Opening a menu shows its links (see [Menus](guide:website/menus)).

## Forms

**Structure → Forms**: a **Title**, a **Handle** (changeable later, as for collections), a **Blueprint** with the form's fields (visitors get the text, textarea, number, toggle, select, date and file ones), and:

- **Email to**: addresses that receive each submission (**Add address** for each); **Also email roles**: everyone with these roles too.
- **Thank-you message**: shown after sending (with one per other language on a multilingual site; empty there, the website's own thank-you in that language); or **After sending, go to** a page of your choice.
- **Sends per visitor a minute** and **Require a captcha**, against spam.

Your developer then puts the form on a page. What visitors send arrives under Content → Submissions (see [Form submissions](guide:website/submissions)).

## Redirects

**Structure → Redirects** lists the redirects made when entries changed address, and takes your own: **From** a path on the site (starting with `/`), **To** a path or a web address, and the **Type**: **Permanent (301)** or **Temporary (302)**. On a site in several languages, turn on **In every language** to make it work from the same address in each language too: /listings → /properties then also sends /id/listings to /id/properties.

A live page always wins over a redirect from its address: a redirect from /contact does nothing while a published page is at /contact. Once you save such a redirect, a warning under **From** names the page (with a link to edit it, if you may) and says when the redirect will apply: once that page is unpublished, moved to the trash or given another slug. The same goes for the homepage, listing pages, term pages, taxonomy index pages and the search page, and for addresses your site's developers gave a page of their own ("Your app's own route … answers this address first"). In the list, the **Warning** column marks these redirects **Shadowed by a live page**. Drafts don't count: a redirect from the address of a page that isn't published yet works until it is.

**Wildcards** move a whole part of the site at once: end **From** with `/*` and it takes every address under it. Put a `*` in **To** for the rest of the address: `/blog/*` → `/journal/*` sends `/blog/2024/hello` to `/journal/2024/hello`; leave it out to send them all to one page (`/old-shop/*` → `/products`). The list's **Match** column says **Everything under it** for these. A redirect for one exact address wins over a wildcard, and a longer wildcard over a shorter one (`/blog/2024/*` before `/blog/*`). The form refuses a `*` anywhere but at the end of **From**, more than one `*` in **To**, and a **To** that **From** would take again (a loop).

> [!TECHNICAL]
> Structure can be exported and imported between sites (`sunrice:export-structure`, `sunrice:import-structure`), and fields renamed safely (`sunrice:rename-field`). See [Structure tools](docs:cms/structure) and [Fields](docs:cms/fields).
