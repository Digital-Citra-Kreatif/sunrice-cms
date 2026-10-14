# Machine translation

`php artisan sunrice:translate` translates your site with an LLM:

- **Content** in the database: entries, taxonomy terms, globals
  (including template parts) and menu labels.
- **Interface text** in your Laravel language files: `lang/{locale}/*.php`
  (including subfolders) and `lang/{locale}.json`.

**Not covered by the command:** listing page content and collection or
taxonomy names. Translate those in the admin, or ask an
[AI agent](ai-agents.md#translating-content).

## Setup

Add one API key to `.env`. Gemini is the default because it is fast,
cheap and good at translation.

```dotenv
# Google AI Studio key (default driver)
GEMINI_API_KEY=your-key

# …or use OpenRouter instead (any model it hosts)
SUNRICE_TRANSLATE_DRIVER=openrouter
OPENROUTER_API_KEY=your-key

# Optional: a different model than the driver default
SUNRICE_TRANSLATE_MODEL=gemini-3.5-flash-lite
```

| Driver | Default model |
| --- | --- |
| `gemini` | `gemini-3.5-flash-lite` |
| `openrouter` | `google/gemini-3.5-flash-lite` |

The languages come from `sunrice.locales`: the main language is the source
and every other available language is a target.

## Usage

```bash
php artisan sunrice:translate                         # everything, into every other language
php artisan sunrice:translate --to=en                  # one target language
php artisan sunrice:translate --only=entries --collection=articles
php artisan sunrice:translate --only=lang              # only the Laravel language files
php artisan sunrice:translate --dry-run                # count strings, no API calls, no writes
php artisan sunrice:translate --force                  # re-translate everything (asks to confirm)
php artisan sunrice:translate --driver=openrouter --model=anthropic/claude-haiku-4.5
```

`--only` accepts `entries`, `terms`, `globals`, `menus` and `lang`, and can
be repeated. The command exits with a failure code if any string could not
be translated, so it is safe to use in scripts.

## What gets translated

- **Fields:** text, textarea and rich text fields, including those inside
  groups, repeaters and flexible content blocks, plus the entry title and
  the SEO title and description. Fields switched off as **Translatable**
  in the blueprint (e.g. product codes) are left alone.
- **Everything else stays shared** with the main language (images,
  toggles, dates, the rows and blocks themselves): only the translated text
  is saved, laid over the main layout. See
  [Shared layout, translated text](multilingual.md#shared-layout-translated-text).
- **Rich text** returned by the model is sanitized like editor input.
- **Placeholders** such as `:name`, `{count}` and Laravel pluralisation are
  kept as they are.

## Existing translations

By default only missing translations are filled in, per field: a field that
already has its own translation is skipped. A value identical to the source
text counts as untranslated (untranslated text shows the main language's). Use `--force` to translate every field again.

## Review before publishing

- **Entries** are written to the translation's **draft** and are never
  marked Ready. Live pages don't change: editors review the draft in the
  admin, then publish and mark the translation Ready. New translations get
  a slug made from the translated title.
- **Terms** have no draft: a new term translation is saved with **Ready**
  off, so the site keeps showing the main language until an editor checks
  it and switches Ready on in the term editor. A term translation that
  already exists keeps its Ready state.
- **Globals, menu labels and language files** have no draft step and are
  written directly. Run with `--dry-run` first to see what will change.
