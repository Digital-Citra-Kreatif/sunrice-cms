# Machine translation

The CMS can translate content into its other [languages](collections.md#languages) with a language model: Google's Gemini, or any model on OpenRouter. It fills in only what isn't translated yet, and entries are translated into their **drafts**, never published: editors check them, then publish.

## Setting it up

In `.env`:

```dotenv
SUNRICE_TRANSLATE_DRIVER=gemini          # or openrouter
SUNRICE_GEMINI_KEY=…                     # https://aistudio.google.com/apikey
# SUNRICE_OPENROUTER_KEY=…               # https://openrouter.ai/keys
# SUNRICE_TRANSLATE_MODEL=gemini-2.5-pro  # default: gemini-2.5-flash, or google/gemini-2.5-flash on OpenRouter
```

The rest is in `config/sunrice-cms.php` under `translation`: `batch_size` (texts per request, 40) and `timeout` (seconds per request, 120). Requests the service answers with a server error, or that don't reach it, are tried again (three tries); a refusal (a wrong key) isn't. Without a driver, there's no machine translation: the editor's **Translate from …** button shows switched off in other languages, saying it needs setting up.

## What is translated

- **Entries**: the title, text, textarea and rich text fields and the texts of link fields (not where they go) that are translated (not [shared](collections.md#languages)), custom field types built on them too, inside groups, repeater rows and flexible blocks (matched to the source's by id), and the SEO title and description. A missing translation is added first (as **Adding a language** does); a slug still the source's is made from the translated title. Saved through `SaveDraft` into the **draft** (a live translation stays live, now with unpublished changes; its version counts up and it's no longer outdated), so it's validated and rich text is cleaned like an editor's. Collections that aren't translatable are left out.
- **Not sent, never changed**: numbers, dates, choices, toggles, media, related entries and terms fields (ids), shared fields, and the entry's own terms (the editor's **Taxonomies** card, every language's). How a field presents itself in the editor (label, hint, hint tooltip, helper text, placeholder, prefix, suffix, width) is the blueprint's, not the entry's: it isn't translated here (forms' visitor-facing labels are, under **Site texts**).
- **Terms**: the title, fields and SEO title and description (`SaveTermContent`). A slug of its own stays; one still the source's is made from the translated title.
- **Globals**: their translated fields (`SaveGlobals`).
- **Menus**: link labels (those with a label of their own; a link without one shows its page's title).
- **Listing and index pages** (`pages`): a collection's listing page and a taxonomy's index pages (the shared one, and each collection's) that are on: their translated fields and SEO title and description (`SaveListing`, `SaveIndexPage`).
- **Site texts** (`texts`), what **Content → Translations** lists apart from menu labels: the site's description, collections' and taxonomies' titles (`translations`), forms' thank-you messages, and their fields' labels, helper texts and choices (`SaveVisitorTranslations`). From the main language only (they are the main language's). URL patterns (a collection's or taxonomy's routes) are addresses, never machine-translated: give them per language under Structure.
- **Language files**, only when asked for with `--only=lang`: the app's own Laravel translations, `lang/<from>/*.php` (subfolders and nested keys too, like a starter's `lang/en/site.php`) and `lang/<from>.json`, written to `lang/<to>/…` and `lang/<to>.json`. Keys already translated are kept (unless `--force`), and keys only the target has stay. Placeholders (`:count`, `:Name`) must come back as they were, or the text isn't used; each choice of a pluralised text (`{0} No posts|{1} One post|[2,*] :count posts`) is translated on its own and joined back with its count.

Each save checks the version it read: someone who saved the same entry, term, page or set while it was being translated keeps their save, and that item is reported as failed.

A text counts as translated when it's there, not empty, and not the source's text any more (a new translation starts as a copy of the main language). `--force` translates everything again.

HTML never reaches the model: tags are swapped for numbered placeholders (`⟦0⟧`) on the way out and put back on the way in, and a text that comes back without its placeholders, once each, isn't used.

## From the command line

```bash
php artisan sunrice:translate --dry-run                 # count what would be sent, sending nothing
php artisan sunrice:translate                           # from the main language into all the others
php artisan sunrice:translate --to=id --to=fr --from=en
php artisan sunrice:translate --only=entries --collection=blog
php artisan sunrice:translate --only=terms --only=globals --only=menus
php artisan sunrice:translate --only=pages,texts         # listing and index pages; Content → Translations' texts
php artisan sunrice:translate --only=lang                # the app's lang/ files
php artisan sunrice:translate --force                   # translate again what is translated
```

| Option | |
| --- | --- |
| `--to=*` | The languages to translate into (default: all of Settings → Languages but the source, a language added there later too). |
| `--from=` | The language to translate from (default: the main one). |
| `--only=*` | `entries`, `terms`, `globals`, `menus`, `pages`, `texts`, `lang`; repeated or comma-separated. Default: all but `lang`. |
| `--collection=*` | Only the entries of these collections (handles). |
| `--force` | Translate again what is translated already. |
| `--dry-run` | Count the texts that would be sent (and those translated already), sending nothing. |

It reports each item and the totals, and fails (exit code 1) when something couldn't be translated.

## In the editor

In another language than the main one, **Translate from English** (the main language's name) fills in that language's draft with what isn't translated yet (`POST /admin/cms/entries/{entry}/translations/{locale}/translate` with the editor's `version`, route `sunrice.admin.cms.entries.translations.translate`, for those who may edit that translation: `cms.entries.update` or `cms.entries.translate`). Save your changes first (it waits while the form has unsaved edits); someone else's newer save is never overwritten. The entry's terms are left alone.

AI agents: `cms_translate_entry` with `"machine": true` adds the language if needed and translates it the same way, for agents that may edit that translation.

## In code

```php
use Sunrice\Cms\Actions\Entries\MachineTranslateEntry;
use Sunrice\Cms\Translation\{ContentTranslator, TranslatorFactory};

app(MachineTranslateEntry::class)->handle($translation);   // one entry's language, from the main one

$content = new ContentTranslator(app(TranslatorFactory::class)->make(), from: 'en', to: 'id');
$content->entries(['blog']);
$content->terms();
$content->globals();
$content->menus();
$content->pages();     // listing and index pages
$content->texts();     // Content → Translations' texts, from the main language
$content->stats()->translated;
```

- `Translator` is the interface: `translate(array $strings, string $from, string $to, ?string $context = null): array`, keys kept, a missing key meaning not translated. `GeminiTranslator` and `OpenRouterTranslator` implement it on Laravel's HTTP client. Bind your own `Translator` in the container to use another service: `TranslatorFactory` then makes it, and the button shows.
- `TranslatorFactory::configured()` and `make()` (which throws a `RuntimeException` when nothing is set up).
- `TranslatableStrings::collect($schema, $data)` lists the texts to translate in field data, by dot path; `pairs()` lines a translation's texts up with the source's.
