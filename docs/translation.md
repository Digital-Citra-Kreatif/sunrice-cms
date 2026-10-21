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

- **Entries**: the title, text, textarea and rich text fields and the texts of link fields (not where they go) that are translated (not [shared](collections.md#languages)), inside groups, repeater rows and flexible blocks too (matched to the source's by id), and the SEO title and description. A missing translation is added first (as **Adding a language** does); a slug still the source's is made from the translated title. Saved through `SaveDraft`, so it's validated and rich text is cleaned like an editor's.
- **Terms**: the title, fields and SEO description, saved as they are (`SaveTerm`, `SaveTermContent`).
- **Globals**: their translated fields (`SaveGlobals`).
- **Menus**: link labels.
- **Language files**, only when asked for with `--only=lang`: the app's own Laravel translations, `lang/<from>/*.php` (subfolders too) and `lang/<from>.json`, written to `lang/<to>/…` and `lang/<to>.json`. Keys already translated are kept (unless `--force`), and keys only the target has stay.

A text counts as translated when it's there, not empty, and not the source's text any more (a new translation starts as a copy of the main language). `--force` translates everything again.

HTML never reaches the model: tags are swapped for numbered placeholders (`⟦0⟧`) on the way out and put back on the way in, and a text that comes back without its placeholders, once each, isn't used.

## From the command line

```bash
php artisan sunrice:translate --dry-run                 # count what would be sent, sending nothing
php artisan sunrice:translate                           # from the main language into all the others
php artisan sunrice:translate --to=id --to=fr --from=en
php artisan sunrice:translate --only=entries --collection=blog
php artisan sunrice:translate --only=terms --only=globals --only=menus
php artisan sunrice:translate --only=lang                # the app's lang/ files
php artisan sunrice:translate --force                   # translate again what is translated
```

It reports each item and the totals, and fails (exit code 1) when something couldn't be translated.

## In the editor

In another language than the main one, **Translate from English** (the main language's name) fills in that language's draft with what isn't translated yet (`POST /admin/cms/entries/{translation}/translate`, route `sunrice.admin.cms.entries.translate`, for those who may edit that translation: `cms.entries.update` or `cms.entries.translate`). Save your changes first; someone else's newer save is never overwritten.

AI agents: `cms_translate_entry` with `"machine": true` adds the language if needed and translates it the same way.

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
$content->stats()->translated;
```

- `Translator` is the interface: `translate(array $strings, string $from, string $to, ?string $context = null): array`, keys kept, a missing key meaning not translated. `GeminiTranslator` and `OpenRouterTranslator` implement it on Laravel's HTTP client. Bind your own `Translator` in the container to use another service: `TranslatorFactory` then makes it, and the button shows.
- `TranslatorFactory::configured()` and `make()` (which throws a `RuntimeException` when nothing is set up).
- `TranslatableStrings::collect($schema, $data)` lists the texts to translate in field data, by dot path; `pairs()` lines a translation's texts up with the source's.
