# Translations

If your site is available in more than one language, each entry, term, global and menu item can have a version in every language. This page explains how languages work on the site and how to translate content in the admin.

## Languages on the site

Every site has one **main language**. All content is written in the main language first; the other languages are translations of it.

- Pages in the main language have plain web addresses, such as `/about`.
- Other languages get their language code in front, such as `/en/about`.
- The list of languages and the main language are managed under **Settings → General**, in the **Languages** card (see [Settings](settings.md)).

### What visitors see when a translation is missing

A visitor who opens a page in a language that isn't translated yet (or not marked ready) is never shown an error. They get the whole main-language version of that page instead. A translation only appears on the site once it is **Ready** and the entry itself is published.

> [!TECHNICAL]
> The fallback page is served at the language-prefixed address, with its canonical URL pointing at the main-language page and no `hreflang` alternate. This behaviour isn't configurable. See [Whole-entity fallback](docs:multilingual.md#whole-entity-fallback).

## Translating an entry

When the site has more than one language, the entry editor shows **language tabs** (for example **ID** and **EN**) above the fields. Each language is saved separately.

1. Open the entry and click the tab of the language you want to translate.
2. The fields start with the main-language text. Replace it with your translation. A note at the top reminds you that only text is translated here.
3. Translate the **Title**. Leave **Slug** empty to have it made from the translated title, or type your own.
4. Click **Save draft**.
5. When the translation is finished, click **Publish** while that language's tab is open. This makes the translation live and marks it **Ready**.

The **Status** card shows **Translation: Draft** or **Translation: Ready** for the language you are viewing. Small dots on the tabs help you see the state at a glance: an amber dot means the language has a draft that isn't published yet, a green dot means the translation is ready.

> [!NOTE]
> Switching tabs with unsaved changes asks you to confirm, because the changes in the current language would be lost. Save first.

### Shared fields

Not everything is translated. Images, switches, numbers, dates and the arrangement of rows and blocks belong to the main language and are the same in every language. In another language these fields are read-only and marked **Shared with** followed by the main language's code. You can't add, remove, reorder or hide rows and blocks there; only their text.

This means:

- Changing an image or the order of blocks in the main language changes every language at once.
- Text you leave unchanged in a translation keeps following the main language.

> [!TECHNICAL]
> Whether a field is translated is set by its **Translatable** switch in the blueprint. Text, textarea, rich text and link fields are translatable by default. See [Which fields are translatable](docs:multilingual.md#which-fields-are-translatable).

### Draft and Ready

A translation is either **Draft** (not shown on the site) or **Ready** (shown, once published). Besides publishing, you can change this from the **More actions** menu (**⋯**):

- **Mark ready** / **Unmark ready**: toggles the Ready state.
- **Return to draft**: takes a ready translation off the site again. Visitors then see the main language for that page until it is ready again.

To take the entry off the site in every language, use **Unpublish** (see [Entries](entries.md#publishing-and-scheduling)).

### The Outdated badge

When the main language is published again after a translation was finished, the translation shows an **Outdated translation** badge. The main text may have changed, so compare the two and update the translation. Publishing the translation again clears the badge.

## Translated slugs and web addresses

Each language has its own slug, so an English page can live at `/en/about-us` while the main page is at `/about`. Parent pages use each language's own slugs for the whole address. When you change a published slug and publish again, the old address automatically redirects to the new one.

## Who can translate

Some roles may only translate. People with such a role can edit the other languages but not the main one; on the main-language tab they see *You can translate this entry. Switch to another language to edit it.*

Two people can work on different languages of the same entry at the same time: each language is locked separately (see [Entries](entries.md#when-two-people-edit-the-same-entry)).

## Machine translation

There is no translate button in the admin, but your developer can translate the site automatically with an AI service. Machine-translated entries arrive as **drafts**: the live site doesn't change until an editor checks each translation and publishes it. Term translations arrive with **Ready** switched off. Globals and menu labels are written directly. AI assistants connected to the site can also translate (see [AI access](ai-access.md)).

> [!TECHNICAL]
> Run `php artisan sunrice:translate` (try `--dry-run` first) after adding `GEMINI_API_KEY` or an OpenRouter key to `.env`. See [Machine translation](docs:translation.md).

## Translating terms, globals and menus

- **Terms**: the term editor has the same language tabs. Leave a translation's title empty to show the main language. A **Ready** switch decides whether the translation appears on the site. See [Taxonomies](taxonomies.md).
- **Globals**: open the global set and switch to the language tab; a green dot marks languages that have a translation. Text nobody translated shows the main language. Globals have no Ready step. See [Globals](globals.md).
- **Menus**: each menu item has a **Label** box for every language. A language left empty falls back to the main language; for links to entries or terms, an empty label uses the linked title. See [Menus](menus.md).
