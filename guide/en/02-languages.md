# Languages

A website can be in several languages. Each entry then has a version per language (a **translation**), with its own title, slug, fields, draft and publish state. The languages themselves are set in **Settings → Languages** (see [The website's settings](guide:website/settings#languages)); the first one is the **main language**.

On the website, the main language has plain addresses (`/about`) and the others start with their code (`/id/about`).

## The language bar

When the site has more than one language, the entry editor shows a bar of them above the fields. The main one says **(main)**, and each language shows its status (*Draft*, *Scheduled*, *Published*).

- Click a language to edit that translation.
- A language with a dashed outline and a **+** has no translation yet. Click it to add one: it starts as a draft copied from the main language, ready to translate.
- **Remove this language** deletes the translation you're on, with its revisions. The main language can't be removed: move the whole entry to the trash instead.

A translation marked **Outdated** was saved before the latest change to the main language: its text may no longer match. The entry's **Status** card says so too.

Each translation is saved, published, scheduled and unpublished on its own. Publishing the English version doesn't publish the Indonesian one.

## Translated and shared fields

Some fields are **translated**: each language has its own (titles, text, rich text, links). Others are **shared**: one value for every language (a price, a date, a photo, a yes/no switch). The blueprint decides which.

Shared fields are edited in the main language. In the other languages they're shown greyed out with the main language's value, and the note *Shared by all languages: edit it in …*. Change the price once, in the main language, and it's the price everywhere.

Inside groups, repeater rows and flexible blocks, the same goes row by row: the text is per language, and shared values come from the matching row in the main language.

## Translating with a machine

If your developer has set up machine translation, the editor of a translation has **Translate from …** in its **⋯** menu. It fills in what isn't translated yet, from the main language, into the draft. Save your own changes first (the button waits until you do), then read the result, correct it, and publish when it's right.

## Pages not translated yet

When an entry has no live translation in a language, visitors to that language usually see the main language's content at that language's address, so menus and links keep working and nobody lands on a missing page. Once you publish the translation, it takes over. (Your developer can switch this off, in which case such pages don't exist in that language.)

## The entries list and languages

The list's **Language** menu shows the titles and statuses of one language. Entries without a translation in that language aren't listed there; switch to the main language to find them. With the **Status** column, each entry also shows a small badge per other language; an outdated translation's badge is outlined in amber.

## Keeping translations up to date

When the main language changes, the other languages don't change with it, apart from the shared fields. Instead, they're marked **Outdated** (in the language bar and in the list's language badges) until someone saves them again. Open each outdated translation, compare it with the main language, bring it up to date, and save or publish it: the mark goes away.

## Other content in several languages

- **Terms**: each term has a title and slug per language (see [Terms](guide:website/terms)).
- **Globals**: each set's values per language (see [Globals](guide:website/globals)).
- **Menus**: a label per language for each link (see [Menus](guide:website/menus)).
- **Comments** keep the language they were written in, and all languages of an entry share one thread.

> [!TECHNICAL]
> Machine translation is set up with `sunrice-cms.translation`; whole collections can be translated with `php artisan sunrice:translate`, and the main language changed with `php artisan sunrice:switch-main-language`. See [Machine translation](docs:cms/translation) and [Collections and entries](docs:cms/collections#languages).
