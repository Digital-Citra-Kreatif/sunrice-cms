# Multilingual content

Configure locales in `sunrice.locales`: `main`, `available`, `names`.

## URLs

- Main-locale content lives at the unprefixed route: `/articles/hello`.
- Other locales get a prefix from `SetFrontendLocale`: `/en/articles/hello`.
- `<x-sunrice::seo>` emits `hreflang` alternates for main + every `Ready`
  translation, plus `x-default` pointing at main.

## Whole-entity fallback

When the requested locale has no Ready translation, the whole main-locale
translation is served at the locale-prefixed URL, with `isFallback = true`
(canonical points at the main URL, no hreflang emitted). A missing or Draft
translation never produces a 404; the page follows the main entry's
publication status. This is not configurable.

A translation that exists but is not `Ready` is **not** served publicly,
and its slug is not routable: fallback pages use the main-language slug.

Terms work the same way: a term page, link or name in another language
uses that language's translation once it is Ready, otherwise the
main-language one. Globals have no Ready step: text nobody translated
shows the main language's.

## What is stored where

| | Shared (one row) | Per language |
| --- | --- | --- |
| Entries | `sunrice_entries` (status, dates, template, order) | `sunrice_entry_translations`: title, slug, SEO, Ready, draft, translated field text |
| Terms | `sunrice_terms` (parent, order, template) | `sunrice_term_translations`: name, slug, SEO, Ready, translated field text |
| Globals | `sunrice_globals` (handle, blueprint) | `sunrice_global_values`: translated field text |
| Listing pages | | `archive_data` per language: heading, intro, SEO, translated field text |
| Menu labels, collection/taxonomy titles | | JSON `{locale: text}` maps (empty falls back to the main language) |

Which terms an entry has (the attached taxonomies) is the same in every
language.

## Shared layout, translated text

Entries, terms, globals and listing pages all store their fields the same
way. The main language owns the **layout**: which repeater rows and
flexible blocks exist, their order, their keys and Show/Hide state, and
every field that isn't translatable (images, toggles, numbers, dates…).
A translation stores **only its translated text**, keyed by row/block id,
and is always rendered inside the current main-language layout. So:

- Adding, removing, reordering or hiding a block in the main language
  changes every language at once — nobody re-copies keys or rows.
- Swapping an image in the main language updates every language.
- Text a translator hasn't changed keeps following the main language.

### Which fields are translatable

Each field has a **Translatable** switch in the blueprint/fieldset builder
(`translatable: true|false` in the definition). Unset, it follows the field
type: `text`, `textarea`, `rich_text` and `link` are translatable;
everything else is shared. The same switch applies wherever the blueprint
is used: entries, terms, globals and listing pages. (Global sets have no
set-wide translatable switch: a phone number or code in a text field
stays shared once you switch that field off.) `group`, `repeater` and `flexible` are
containers: their children decide, and switching a container off shares
the whole thing.

When editing a secondary language the admin shows shared fields read-only
("Shared with ID"), and rows/blocks can't be added, removed, reordered or
hidden — only their text is editable.

### Keys and Show/Hide on rows and blocks

Every repeater row and flexible block has an optional **key** and a
**Show** switch. Hidden items are left out on the site (the editor still
shows them). Keys let templates fetch an item directly instead of looping:

```blade
@php($hero = $entry->get('sections')->byKey('hero'))
@if ($hero)
    <h1>{{ $hero->heading }}</h1>
@endif

{{ $entry->get('features')->byKey('pricing')['title'] ?? '' }}
```

### Storage format

Rows are stored with `_id`, `_key` and `_hidden`; blocks with `id`, `key`
and `hidden`. A secondary translation's `data` looks like:

```json
{
  "headline": "Hello",
  "features": {"01J9…": {"title": "Fast"}},
  "sections": {"01J9…": {"values": {"heading": "Welcome"}}}
}
```

Translations saved by earlier versions (a full copy of the data, for
entries, terms and globals) are still read correctly, matched by
position. Run `php artisan sunrice:upgrade-translations` once to give
existing rows ids and trim them to their translated text; it is safe to
run again.

## Draft / Ready per translation

Each entry translation has `is_ready` (Draft/Ready). Ready translations
are publishable; publish copies the `draft` payload to the live columns
and records a `Revision`. `sunrice.revisions.keep` caps revisions per
translation.

Term translations have `is_ready` too (the **Ready** switch in the term
editor), without drafts. A translation typed in the admin or saved by an
agent is Ready unless you switch it off; one made by
`sunrice:translate` waits for an editor to switch it on.

## Changing the main language

The Settings page locks the main language once content exists: the main
language holds each entry's full field data and the unprefixed URLs, so
switching needs a conversion. Run it on the server:

```bash
# 1. Back up the database, then see what would change and what's missing
php artisan sunrice:switch-main-language en --dry-run

# 2. Translate what it lists, or copy the current text into those items
php artisan sunrice:switch-main-language en --copy-missing

# 3. Or, with everything translated
php artisan sunrice:switch-main-language en
```

What it does (in one transaction):

- **Entries:** the new main language gets the full data (its translation
  laid over the old main data); the old main keeps only its translated
  text. Drafts and revisions are converted the same way, and both
  languages stay published. Entries of non-translatable collections are
  relabeled to the new language.
- **Terms, globals:** converted like entries. Terms with no version in
  the new language need `--copy-missing`; globals without one keep
  showing the old main values.
- **Listing pages, collection/taxonomy titles, menu labels:** swapped so
  every language shows what it showed before.
- **URLs:** new-main pages become unprefixed and `/{new}/…` redirects to
  them (301); old-main pages move to `/{old}/…`, and their old
  unprefixed URLs redirect there. Recorded slug-change redirects move
  with them.

Options: `--dry-run` (report only), `--copy-missing`, `--force` (no
confirmation). If routes or config are cached, run `php artisan optimize`
afterwards.

## Interface text

Words the site itself prints (buttons, "Previous" / "Next", form errors,
the draft banner…) come from translation files:

- Sunrice's own lines: `__('sunrice::frontend.*')`, shipped in English and
  Indonesian. Change them or add a language with
  `php artisan vendor:publish --tag=sunrice-translations`.
- Laravel's own lines (pagination, validation messages, login errors):
  Laravel ships these in English only. Sunrice adds Indonesian for
  `pagination`, `validation`, `auth` and `passwords` and the pagination
  view's words ("Showing … of … results"). A file you publish yourself
  (`lang/id/validation.php`, `lang/id.json`) always wins; get every
  language with `php artisan lang:publish` or the `laravel-lang/lang`
  package.
- A line missing in the visitor's language and in the fallback language
  shows in English rather than as its key (e.g. `pagination.previous`).
