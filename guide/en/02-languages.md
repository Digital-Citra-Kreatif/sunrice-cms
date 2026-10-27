# Languages

A website can be in several languages. Each entry then has a version per language (a **translation**), with its own title, slug, fields, draft and publish state. The languages themselves are set in **Settings → Languages** (see [The website's settings](guide:website/settings#languages)); the first one is the **main language**.

On the website, the main language has plain addresses (`/about`) and the others start with their code (`/id/about`). A collection's or taxonomy's fixed part of the address can be translated too, under Structure (`/id/buku/…` for `/books/…`: see [Structure](guide:website/structure)).

## The language tabs

When the site has more than one language, the entry editor shows a tab for each above the fields, named by its code (**EN**, **ID**): hover over one for its name and whether it's the main language. Wherever the panel lets you choose which language you're editing (entries, terms, globals, listing and index pages, Content → Translations, a file's alternative text, a field's words in other languages), it's the same row of tabs.

- Click a tab (or move to it with the arrow keys and press Enter) to edit that translation. If you have unsaved changes, the panel asks first.
- A green dot means the translation is live; an amber dot means it's **Outdated** (see below). Point at a tab to read its status (*Draft*, *Scheduled*, *Live*).
- A muted tab with a dashed outline and a **+** has no translation yet. Click it to add one: it starts as a draft copied from the main language, ready to translate. Translators can add languages too, not only those who create entries.
- **Remove this language**, at the end of the row, deletes the translation you're on, with its revisions. The main language can't be removed: move the whole entry to the trash instead.

A translation marked **Outdated** (the amber dot) was saved before the latest change to the main language: its text may no longer match. The entry's **Status** card says so too.

Each translation is saved, published, scheduled and unpublished on its own. Publishing the English version doesn't publish the Indonesian one.

A translation published for the first time takes the date of the main language's (so a translated article keeps its date), unless you pick another.

## Translated and shared fields

Some fields are **translated**: each language has its own (titles, text, rich text, links). Others are **shared**: one value for every language (a price, a date, a photo, a yes/no switch). The blueprint decides which.

Shared fields are edited in the main language. In the other languages they're shown greyed out with the main language's value, each with a note under it: *Not translatable: edit it in …* (a group shared as a whole has the note once, under its heading). Change the price once, in the main language, and it's the price everywhere.

Inside groups, repeater rows and flexible blocks, the same goes row by row: the text is per language, and shared values come from the matching row in the main language. Globals, listing pages, index pages and terms work the same way.

## Translating with a machine

If your developer has set up machine translation, the editor of a translation has **Translate from …** in its **⋯** menu. It fills in what isn't translated yet, from the main language, into the draft. Save your own changes first (the button waits until you do), then read the result, correct it, and publish when it's right. On a page that's already live, visitors keep seeing the live version until you publish: the translation shows **Changes pending**. The entry's terms (the **Taxonomies** card) stay as they are, and if someone else saved this translation meanwhile, their save is kept and nothing is translated. If the service doesn't give some texts back, an error says how many: those stay as they were, the rest are in the draft. Without it, a greyed-out **Translate from …** button shows instead: ask your developer to set it up.

## Pages not translated yet

When an entry has no live translation in a language, visitors to that language usually see the main language's content at that language's address, so menus and links keep working and nobody lands on a missing page. Once you publish the translation, it takes over. (It can be switched off in **Settings → Site** → **Show untranslated pages in the main language**, in which case such pages don't exist in that language.)

## The entries list and languages

The list's **Language** menu shows the titles and statuses of one language. Entries without a translation in that language aren't listed there; switch to the main language to find them. With the **Status** column, each entry also shows a small badge per other language: the language code alone when that translation is published and current, else with a word beside it (**draft**, **scheduled**, **outdated** in amber, or **missing** with a dashed border).

## Keeping translations up to date

When the main language changes, the other languages don't change with it, apart from the shared fields. Instead, they're marked **Outdated** (an amber dot on its language tab, and in the list's language badges) until someone saves them again. Open each outdated translation, compare it with the main language, bring it up to date, and save or publish it: the mark goes away.

## Other content in several languages

- **Terms**: each term has a title and slug per language (see [Terms](guide:website/terms)).
- **Globals**: each set's values per language (see [Globals](guide:website/globals)).
- **Menus**: a label per language for each link (see [Menus](guide:website/menus)).
- **Comments** keep the language they were written in, and all languages of an entry share one thread.

## Forms, menus and listing titles

**Content → Translations** gathers the site's own texts that aren't entries, in another language, grouped by where visitors see them: **Listing page titles** (collections with a listing page), **Term page titles** (taxonomies with term pages), **Forms: …** (each form's thank-you message and its fields' labels, help and choices), **Menus: …** (the link labels) and the **Site description**. Each row shows the text in the main language (with **View** to open the page it's on, when there is one) next to a box for the translation; leave a box empty to show the main language's text. The bar at the top, which stays in view, has the language tabs (with more than one language to translate into), says how many texts are translated ("12 of 30 translated into Bahasa Indonesia"), has **Only untranslated** to hide the rest, and **Save**. Two items with the same title are told apart by their handle. Translators can use it without being able to change the structure or the settings.

> [!TECHNICAL]
> Machine translation is set up with `sunrice-cms.translation`; whole collections, terms, globals, menus, listing and index pages and the texts of **Content → Translations** can be translated with `php artisan sunrice:translate`, and the main language changed with `php artisan sunrice:switch-main-language`. See [Machine translation](docs:cms/translation) and [Collections and entries](docs:cms/collections#languages).
