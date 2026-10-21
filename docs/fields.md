# Fields, blueprints and fieldsets

A **blueprint** lists the fields editors fill in for one kind of content: the entries of a collection, a taxonomy's terms, a global set or a form. A **fieldset** is a group of fields used in several places: blueprints include it, and flexible fields use fieldsets as their kinds of block.

Both are stored in the database (`sunrice_blueprints`, `sunrice_fieldsets`) and built in the admin under **Structure → Blueprints** and **Structure → Fieldsets**, for people with the `cms.blueprints.manage` permission. The builder adds, edits, drags into order and removes fields (each nested group or repeater's fields among themselves), nests groups and repeaters, and shows each type's settings. Changing a blueprint never deletes data: content keeps values under handles the blueprint no longer has, and they come back when the field does. A blueprint can't be deleted while a collection (for its entries or its listing page), a taxonomy, a global set or a form uses it: the error names them. The blueprint pickers offer what fits: a blueprint used for content (a collection's entries or listing page, a taxonomy's terms) isn't offered to global sets and forms, one a form uses isn't offered to content or global sets, and so on; unused blueprints are offered everywhere. A blueprint's handle can be changed on its edit form: `Actions\Blueprints\RenameBlueprint` changes it everywhere it's named (collections, deleted ones too, taxonomies, global sets, forms and entries that picked it). A fieldset's handle can't change: flexible blocks store it with every block.

## Field definitions

Each field is stored as JSON and read as a `Sunrice\Cms\Fields\Field`:

```json
{"handle": "hero", "type": "group", "label": "Hero", "required": false,
 "instructions": "Shown at the top", "translatable": null, "validation": [],
 "config": {}, "fields": [{"handle": "heading", "type": "text"}]}
```

| Key | |
| --- | --- |
| `handle` | Lowercase letters, digits and underscores, starting with a letter; unique on its level (`Support\HandleRule`, whose error suggests the handle meant: `job-title` → try "job_title"; the builder turns what's typed into one as you type). A blueprint's top level can't use the handles content keeps for itself (`Blueprint::RESERVED`: `id`, `title`, `slug`, `url`, `status`, `locale`, `published_at`, `created_at`, `updated_at`, `parent`, `children`, `collection`, `blueprint`, `data`, `seo`, `author`); the builder warns as they're typed, as it does for a handle already taken on its level. |
| `type` | A registered field type (below). |
| `required` | The field must be filled in. |
| `translatable` | Whether the value differs per language; `null` lets the type decide (text does, numbers don't). |
| `validation` | Extra Laravel rules from an allowed list (`min:3`, `regex:/…/`, `email`…; see `DefinitionValidator::RULES`). Rules that read the database aren't allowed. |
| `config` | The type's settings. |
| `fields` | The fields of a group or a repeater. Groups and repeaters nest up to five levels. |

`DefinitionValidator` checks definitions before they are saved, and the `SaveBlueprint` and `SaveFieldset` actions use it.

## Field types

| Type | Stores | Templates get | Settings |
| --- | --- | --- | --- |
| `text` | a string | the string | `max` (≤ 255; none: values up to 65535 characters pass, so longer data saved before isn't refused), `placeholder`, `default` |
| `textarea` | a string | the string | `rows`, `max` |
| `rich_text` | HTML, cleaned on save | the HTML | |
| `number` | a number | the number | `min`, `max`, `step` (1 for whole numbers), `default` |
| `toggle` | true or false | the boolean | `default` |
| `select` | a value, or a list with `multiple` | the same | `options` (`[{value, label}]`), `multiple`, `default` |
| `date` | `2026-10-19`, or `2026-10-19T14:30:00` with `time` | a Carbon | `time` |
| `link` | `{type: url, url, label, new_tab}` or `{type: entry, entry_id, label, new_tab}` | `{type, url, label, title, new_tab}`, or null | `collections` (entry links; none: any) |
| `media` | a media id, or a list with `multiple` | a `Media` model, or a collection | `multiple`, `max`, `types` (image, video, audio, document) |
| `group` | an object of its fields | an array | (its `fields`) |
| `repeater` | a list of rows of its fields | `Items` of arrays | `min`, `max` (its `fields`) |
| `flexible` | a list of blocks | `Items` of `Block` | `blocks` (fieldset handles), `max` |
| `fieldset` | — | — | `fieldset`: includes that fieldset's fields in its place |
| `terms` | a term id, or a list with `multiple` | a `Term`, or a collection | `taxonomy`, `multiple`, `max` (see [taxonomies](taxonomies.md)) |
| `entries` | an entry id, or a list with `multiple` | the linked entries' `EntryTranslation`s | `collections`, `multiple`, `max` |

Rich text keeps only the formatting the editor produces: no scripts, styles or event handlers, and links only to web, mail and phone addresses or paths on the site. Links are checked the same way when saved and again when shown, so a link can never run script.

A link goes to an address or to an entry. An entry link follows the entry: its `url` and `title` are the entry's in the page's language (its main language's page when it isn't translated), so a new slug or a translation needs no edit; the `url` is null while the entry isn't live (a preview gets its draft title, still without a URL). The linked entry must exist, outside the trash, in the chosen `collections`. Links saved before entry links existed (`{url, label, new_tab}`) are addresses.

```blade
@if ($cta = $values['cta'])
    @if ($cta['url'])<a href="{{ $cta['url'] }}" @if ($cta['new_tab']) target="_blank" rel="noopener" @endif>{{ $cta['label'] ?? $cta['title'] ?? $cta['url'] }}</a>@endif
@endif
```

Linked entries must exist in the chosen collections and not be in the trash. Templates get each one in the page's language (else its main one), published ones only (drafts too in a preview), in the order chosen, loaded once per request. In the editor, editors search entries by title.

Media must exist, not be in the trash and be of the allowed kinds. Templates get the files in one query, however many fields and rows refer to them.

### Repeaters and flexible blocks

In the editor, rows and blocks are dragged into order by their handle (or with the keyboard), and a top-level group field is a card of its own that folds away. Every repeater row gets a stable `_id`, an optional `_key` and a `_hidden` switch; every flexible block is stored as `{id, type, key, hidden, values}`, where `type` is a fieldset's handle. Templates get `Items` (a Laravel collection) without the hidden ones, and can pick out a keyed one:

```blade
@foreach ($entry->get('sections') as $block)
    @include('blocks.'.$block->type, ['block' => $block])
@endforeach

{{ $entry->get('features')->byKey('pricing')['title'] }}
```

A block's values are readable as properties (`$block->heading`) or keys (`$block['heading']`). A block whose fieldset was deleted keeps its values; it can't be deleted while used. A fieldset may use itself (or one that uses it) as a kind of block, for sections within sections: the editor offers blocks within blocks `Schema::MAX_DEPTH` (5) levels deep, and stored content nests as deep as it goes.

### Fieldsets

A `fieldset` field puts the fieldset's fields in its own place, at its level and with their own handles: they count as the blueprint's own, and the include's own handle, label and settings aren't used (the builder shows only which fieldset). To keep them under a name of their own (`primary_contact.phone`), put the include in a Group with that handle; a clash says so. A fieldset can include other fieldsets, but never itself (directly or through another). An include whose fieldset is gone stays in the blueprint and keeps its data. A fieldset can't be deleted while a blueprint or another fieldset includes it or uses it as a kind of block.

## Showing a field only sometimes

A field can show only when another field on its level is so: in the
blueprint builder, **Show** → *When Layout* *is* `video`. In the
definition:

```php
['handle' => 'video_url', 'type' => 'text', 'required' => true,
    'condition' => ['field' => 'layout', 'operator' => 'equals', 'value' => 'video']],
```

Operators: `equals` and `not_equals` (with a value; a list field matches
when one of its values does, a toggle with `true` or `false`), `filled`
and `empty`. Inside groups, repeater rows and blocks, the other field is a
sibling there. A hidden field (and everything in it) isn't required, and
keeps what it had, still checked against its other rules; templates still
get its value. `Field::isShownWith()` tells whether it shows.

## Using fields in code

```php
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Fields\Schema;

$schema = $blueprint->schema();                              // fieldsets included
$validated = $request->validate($schema->rules($request->input('data', [])));
$data = $schema->normalize($validated['data']);              // what to store
$values = $schema->hydrate($data, new HydrationContext('en')); // what templates get
$schema->references($data);                                  // media it uses, as Reference objects
```

`rules()` takes the input because a flexible field's rules depend on which blocks were sent.

A `HydrationContext` remembers the media, entries and terms it loads, so hydrating many values with one context costs one query per kind: `$context->preload($schema->references($data))` loads everything a set of data points at up front. `Cms::entries()` does this for its whole result, and `$translation->hydrateWith($context)` makes `values()` use a context when given none.

## Your own field types

Register field types on the CMS plugin in your panel provider:

```php
$panel->plugin(CmsPlugin::make()->fieldTypes(RatingField::class, ColorField::class));
```

A plugin that requires the CMS registers its types in its own `register()`: `app(FieldTypes::class)->register(...)`. A type is registered once; registering a key twice is an error. Content whose type is no longer registered keeps its values as they are.

### Built on a built-in type

Most custom fields are a built-in input with presets. Extend `CustomField`:

```php
use Sunrice\Cms\Fields\CustomField;

final class RatingField extends CustomField
{
    public function type(): string { return 'rating'; }

    // Edited with the number input; stored and hydrated like a number.
    public function baseType(): string { return 'number'; }

    // Applied under the field's own settings.
    public function preset(): array { return ['min' => 1, 'max' => 5, 'step' => 1]; }

    // Added after the base type's rules.
    public function extraRules(): array { return ['integer']; }
}
```

### A new type

Extend `FieldType` and override what differs:

| Method | |
| --- | --- |
| `type()` | The key stored in definitions. |
| `label()` | The name in the builder's Add field list. |
| `rules($field)` | Rules for the value; `required`/`nullable` and the field's own rules are added around them. |
| `nestedRules($field, $key, $value)` | Rules for what is inside the value, by dot path under `$key`. |
| `defaultValue($field)` | The value of new content. |
| `normalize($value, $field)` | What to store, from validated input. |
| `hydrate($value, $field, $context)` | What templates get. `$context->locale`, `$context->preview`, `$context->media($id)`. |
| `references($value, $field)` | The records the value points at (`Reference` objects). |
| `translatableByDefault()` | Whether values differ per language unless the field says. |
| `sortCast()` | `'string'`, `'number'`, `'date'` or null: how values sort and compare in queries. |
| `hasChildren()` | Whether the field holds other fields. |
| `settings()` | The type's options in the builder, as fields, stored in `config`; errors name them by label. A multiple select setting with `config.empty` shows that text when it has no options (say what to create first). |
| `toAdmin($field, $schema)` | The definition sent to the editor. |
