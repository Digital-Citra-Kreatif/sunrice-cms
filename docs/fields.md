# Fields, blueprints and fieldsets

A **blueprint** lists the fields editors fill in for one kind of content: the entries of a collection, a taxonomy's terms, a global set or a form. A **fieldset** is a group of fields used in several places: blueprints include it, and flexible fields use fieldsets as their kinds of block.

Both are stored in the database (`sunrice_blueprints`, `sunrice_fieldsets`) and built in the admin under **Structure → Blueprints** and **Structure → Fieldsets**, for people with their permissions: `cms.blueprints.view`, `.create`, `.update` and `.delete` for blueprints, and `cms.fieldsets.view`, `.create`, `.update` and `.delete` for fieldsets. The builder adds, edits, drags into order and removes fields (each nested group or repeater's fields among themselves), nests groups and repeaters, and shows each type's settings. Changing a blueprint never deletes data: content keeps values under handles the blueprint no longer has, and they come back when the field does. A blueprint can't be deleted while a collection (for its entries, as one of its other blueprints, or for its listing page), an entry that chose it, a taxonomy, a global set or a form uses it, counting collections, taxonomies and entries in the trash (restoring one needs its blueprint): the error names them, and Structure → Blueprints lists the collections using each one. The blueprint pickers offer what fits: a blueprint used for content (a collection's entries or listing page, a taxonomy's terms) isn't offered to global sets and forms, one a form uses isn't offered to content or global sets, and so on; unused blueprints are offered everywhere. A blueprint's handle can be changed on its edit form: `Actions\Blueprints\RenameBlueprint` changes it everywhere it's named (collections, deleted ones too, taxonomies, global sets, forms and entries that picked it). A fieldset's handle can't change: flexible blocks store it with every block.

Links to a blueprint follow one rule (`Sunrice\Cms\Admin\BlueprintLinks`), for those with `cms.blueprints.update`, to `sunrice.admin.cms.blueprints.edit`. Pages editing content that has a blueprint put **Edit blueprint** in their ⋮ menu: the entry editor (`blueprintUrl`), the entries list (one each by title when the collection allows several: "Edit blueprint: Property"), the terms list (`taxonomy.blueprint`), and the term editor, a global set's values, a collection's listing page, a taxonomy's index pages and a form's submissions (a `blueprint` prop, null without the permission or a blueprint). The settings forms where one is chosen (a collection's Blueprint and Listing page blueprint, a taxonomy's Blueprint and Index page blueprint, a global set's and a form's Blueprint) show **Edit blueprint →** under the choice, following it as it changes (a `Link` with `{field}` in its address), and **New blueprint →** while none is chosen, for those with `cms.blueprints.create`; a collection's Other blueprints show "Edit blueprint: Review →" under each one ticked.

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
| `translatable` | Whether the value differs per language; `null` follows the type (text does, numbers don't). The builder's *Translatable* switch starts at the type's default and stores only a different choice. |
| `validation` | Extra Laravel rules from an allowed list (`min:3`, `regex:/…/`, `email`…; see `DefinitionValidator::RULES`). Rules that read the database aren't allowed. |
| `config` | The type's settings. |
| `fields` | The fields of a group or a repeater. Groups and repeaters nest up to five levels. |
| `condition` | When it shows ([below](#showing-a-field-only-sometimes)). |
| `width` | How much of the row it takes in the editor, in percent: `25`, `33`, `50`, `66`, `75` or `100` (`Field::WIDTHS`); stored only when not 100 ([below](#field-width)). |
| `instructions` | The helper text, under the input in the editor (simple Markdown: links, bold, italic, code); forms on the website show it as help ([below](#how-a-field-presents-itself)). |
| `hint`, `hint_tooltip` | A short note at the right of the label (up to 100 characters) and a longer one behind an ⓘ beside it (up to 500); each stored only when not empty ([below](#how-a-field-presents-itself)). |
| `translations` | What visitors read in other languages, by language code: `label`, `instructions` and a select's `options` (value => label), as [forms](forms.md) show them (**In other languages** in the builder). `{"id": {"label": "Jenis properti", "options": {"house": "Rumah"}}}` |

`DefinitionValidator` checks definitions before they are saved, and the `SaveBlueprint` and `SaveFieldset` actions use it.

## Field types

| Type | Stores | Templates get | Settings |
| --- | --- | --- | --- |
| `text` | a string | the string | `max` (≤ 255; none: values up to 65535 characters pass, so longer data saved before isn't refused), `placeholder`, `prefix`, `suffix`, `default` |
| `textarea` | a string | the string | `rows`, `max`, `placeholder` |
| `rich_text` | HTML, cleaned on save | the HTML, its media library images given `srcset`, `sizes`, dimensions and lazy loading ([rich text images](site.md#what-templates-get)) | |
| `code` | a string, as typed (never cleaned) | the string | `language` (`html`, `css`, `javascript`, `json`, `plain`: what the editor highlights; `plain` by default), `max`, `placeholder`. Shared by all languages unless `translatable` ([below](#code-fields)) |
| `number` | a number | the number | `min`, `max`, `step` (1 for whole numbers), `default`, `placeholder`, `prefix`, `suffix` |
| `toggle` | true or false | the boolean | `default`; a required toggle must be on (a form's consent box: `accepted`) |
| `select` | a value, or a list with `multiple` | the same | `options` (`[{value, label}]`), `multiple`, `default` |
| `date` | `2026-10-19`, or `2026-10-19T14:30:00` with `time` | a Carbon | `time`; `future` (*Today or later only*: earlier days are refused with `sunrice-cms::site.forms.today_or_later`, "The Preferred date must be today or a later date.", and a form's date input gets `min`) |
| `link` | `{type: url, url, label, new_tab}` or `{type: entry, entry_id, label, new_tab}` | `{type, url, label, title, new_tab}`, or null | `collections` (entry links; none: any), `placeholder` (in the address input) |
| `media` | a media id, or a list with `multiple` | a `Media` model, or a collection (`$image->altIn()` and `captionIn()`: its alt text and caption in the page's language, set per language in the media library; see [media](../../admin/docs/media.md)) | `multiple`, `max`, `types` (image, video, audio, document) |
| `group` | an object of its fields | an array | (its `fields`) |
| `repeater` | a list of rows of its fields | `Items` of arrays | `min`, `max` (its `fields`) |
| `flexible` | a list of blocks | `Items` of `Block` | `blocks` (fieldset handles, offered in this order: the builder keeps the order they're ticked in), `max` |
| `fieldset` | — | — | `fieldset`: includes that fieldset's fields in its place |
| `terms` | a term id, or a list with `multiple` | one `Term` (or null), or with `multiple` a collection of them | `taxonomy`, `multiple`, `max`. A custom link to terms ("Featured topic"): not the entry's terms, which come from its collection's taxonomies (see [taxonomies](taxonomies.md#terms-fields)) |
| `entries` | an entry id (`null` or `[]` clears it), or a list with `multiple` | one `EntryTranslation` (or null), or with `multiple` a collection of them | `collections`, `multiple`, `max` |

Rich text keeps only the formatting the editor produces: no scripts, styles or event handlers, and links only to web, mail and phone addresses or paths on the site. Links are checked the same way when saved and again when shown, so a link can never run script.

### Rich text links

A link in rich text has its own menu in the editor, like an image's: it opens when the cursor is in the link (clicking a link puts it there) or from the toolbar's **Link** for the selection. It's laid out as a [Link field](#field-types) is: **Link to** (the kind) and where it goes, the link's text (when it's one run of plain text; changing it keeps the link), **Open in a new tab** (ticked on a new address link, not on the other kinds; existing links keep theirs), and the `rel` choices `nofollow` (search engines don't follow it or count it as an endorsement), `sponsored` (paid, an advert) and `ugc` (in what visitors wrote). Every link is stored with `rel="noopener noreferrer"` after them, whatever was chosen, so a page a link opens can't reach the site's (`rel="nofollow noopener noreferrer"`); any other `rel` token is dropped when it's saved.

Where it goes is one of the menu builder's kinds: **Link** (an address), **Entry**, **Term** (of a taxonomy with term pages) or **Listing** (a collection's listing page). The other three search titles (in the main language, among what the editor may view: entries of the collections they may view, terms of the taxonomies they may view, listing pages of those collections). The chosen item is stored with its current address and what it is:

```html
<a href="/about" data-link="entry:12">about us</a>
<a href="/topics/coffee" data-link="term:5">coffee</a>
<a href="/news" data-link="listing:3">the news</a>
```

When pages show the text, such a link gets the current address of what it points at in the page's language, as a Link field's entry links do (below): an entry's translation in that language, else its main language's (at that language's address with the fallback on); a term's page; the collection's listing page. A new slug or a translation needs no edit. When it isn't there any more (missing, in the trash, an entry not live — a preview's draft included — or no page), the link is dropped and its text kept. `data-link` itself is never printed. What every link of a text points at is read at once, one query per kind; linked entries and terms count as the text's references (Used by, and loaded with a list's other references). Links with another plugin's `data-link` are printed as stored. Structure files (`sunrice:export-structure --entries`, starters made from a site) carry them by key, as other references (`data-link="entry:pages/about"`, `"term:topics/coffee"`, `"listing:news"`); an import gives them this site's ids, and one whose target isn't on the site keeps its address without `data-link` (named in the report). The panel's side (the sources, the sanitiser rule) is in its [rich text link sources](../../admin/docs/panel.md#rich-text-link-sources).

### Code fields

A `code` field is edited in the panel's code editor (line numbers, highlighting for its `language`, bracket matching, indentation; Tab indents, Esc then Tab moves on), for code an editor pastes or writes: an embed, a snippet a tutorial shows, a bit of JSON. Templates get the text as typed, a string, and **nothing cleans it**. Printed with `{{ }}` it's escaped, shown as text. To show it as code, use the code block component, which prints it escaped in `<pre><code class="language-html">`:

```blade
<x-sunrice-cms::code-block :value="$values['snippet']" language="html" class="example" />
{{-- <pre class="example"><code class="language-html">&lt;iframe src=&quot;…&quot;&gt;&lt;/iframe&gt;</code></pre> --}}
```

It prints nothing when the field is empty; other attributes go on the `<pre>`. Pages get `$code`, their code fields' handles and languages, and the starter templates' `cms.partials.fields` shows those fields this way. No highlighting is shipped for the site: add Prism or highlight.js (and its theme) to your layout if you want it, both read the `language-…` class.

Printing it unescaped, `{!! $values['snippet'] !!}`, **runs it**: HTML and scripts go on the page for every visitor. Do that only for code its editors are trusted to run on the site (as with Settings → [Site code](site.md#site-code)), never for a field anyone else can fill in; the CMS never prints a code field unescaped by itself.

A code field is shared by all languages unless its definition says `translatable` (code rarely differs per language). Even then it's never machine-translated: a new translation starts with the main language's code, to change by hand ([machine translation](translation.md)).

A link goes to an address or to an entry. An entry link follows the entry: its `url` and `title` are the entry's in the page's language (its main language's page when it isn't translated), so a new slug or a translation needs no edit; the `url` is null while the entry isn't live (a preview gets its draft title, still without a URL). The linked entry must exist, outside the trash, in the chosen `collections`. Links saved before entry links existed (`{url, label, new_tab}`) are addresses.

```blade
@if ($cta = $values['cta'])
    @if ($cta['url'])<a href="{{ $cta['url'] }}" @if ($cta['new_tab']) target="_blank" rel="noopener" @endif>{{ $cta['label'] ?? $cta['title'] ?? $cta['url'] }}</a>@endif
@endif
```

Linked entries must exist in the chosen collections and not be in the trash. Templates get each one in the page's language (else its main one), published ones only (drafts too in a preview), in the order chosen, loaded once per request. In the editor, the picker lists the most recently edited entries when it gets focus, and searches titles as one types (`GET cms/entries/picker`). It offers the entries of collections the user may view and, when they may create or edit entries of a collection whose entries fields link to another collection they can't view (an author of the journal choosing an agent), that collection's live entries, by their live titles; collections they can't pick from are named instead of showing "No entries match." (the response's `unavailable`).

Media must exist, not be in the trash and be of the allowed kinds. Templates get the files in one query, however many fields and rows refer to them.

### Repeaters and flexible blocks

In the editor, rows and blocks are dragged into order by their handle (or with the keyboard), and a top-level group field is a card of its own that folds away. Every repeater row gets a stable `_id`, an optional `_key` and a `_hidden` switch; every flexible block is stored as `{id, type, key, hidden, values}`, where `type` is a fieldset's handle. Templates get `Items` (a Laravel collection) without the hidden ones, and can pick out a keyed one:

```blade
@foreach ($entry->get('sections') as $block)
    @include('blocks.'.$block->type, ['block' => $block])
@endforeach

{{ $entry->get('features')->byKey('pricing')['title'] }}
```

A block's values are readable as properties (`$block->heading`) or keys (`$block['heading']`). A new row or block starts with its fields' defaults (a select's or toggle's `default`; the editor gets them as the repeater's `defaults` and each kind of block's `defaults`). An error inside a row or block names the field by its label ("The Unit price field is required.") and shows under its input there (`data.sections.2.values.rows.1.price`). A block whose fieldset was deleted keeps its values; it can't be deleted while used. A fieldset may use itself (or one that uses it) as a kind of block, for sections within sections: the editor offers blocks within blocks `Schema::MAX_DEPTH` (5) levels deep, and stored content nests as deep as it goes.

### Fieldsets

A `fieldset` field puts the fieldset's fields in its own place, at its level and with their own handles: they count as the blueprint's own, and the include's own handle, label and settings aren't used (the builder shows only which fieldset). To keep them under a name of their own (`primary_contact.phone`), put the include in a Group with that handle; a clash says so. A fieldset can include other fieldsets, but never itself (directly or through another). An include whose fieldset is gone stays in the blueprint and keeps its data. A fieldset can't be deleted while a blueprint or another fieldset includes it or uses it as a kind of block. Its edit page says who uses it and where, each linking to its page: 'Used by: the blueprint "Post" — a block in its "More" field; the fieldset "Hero" — included as "Intro".', naming each field by its label (or handle) with the fields above it ("Sections › Columns"); Structure → Fieldsets lists their names. In code: `DeleteFieldset::uses($fieldset)` (each user's `kind`, `handle`, `title` and `uses`, each a `field` and `how`, `include` or `block`), `DeleteFieldset::usedBy($fieldset)` (the same in words, as the refusal says them) and `DefinitionValidator::fieldsetUses($fields)` (each `fieldset`, `path` and `how` in a list of fields).

## Field width

Fields can sit side by side in the editor, like ACF's wrapper width: a field's `width` is how much of the row it takes, in percent, one of `25`, `33`, `50`, `66`, `75` and `100` (the default). The builder's **Width** (under Basics) sets it, and a field's row there shows it (**50%**) when it isn't 100. In a definition:

```php
app(SaveBlueprint::class)->handle(['handle' => 'property', 'title' => 'Property', 'fields' => [
    ['handle' => 'price', 'type' => 'number', 'width' => 50],
    ['handle' => 'area', 'type' => 'number', 'width' => 50],
    ['handle' => 'city', 'type' => 'text', 'width' => 66],
    ['handle' => 'postcode', 'type' => 'text', 'width' => 33],
    ['handle' => 'agent', 'type' => 'group', 'fields' => [
        ['handle' => 'name', 'type' => 'text', 'width' => 50],
        ['handle' => 'phone', 'type' => 'text', 'width' => 50],
    ]],
]]);
```

`width` sits beside `label` and `required`, not in `config`. Any other value is refused ("The width must be one of 25, 33, 50, 66, 75, 100 (percent of the row)."); 100 isn't stored, so definitions without it stay as they are. A fieldset include has none: the fieldset's own fields keep theirs. Read it as `$field->width` (an int, 100 when not set).

The editor lays each level's fields on a 12-column grid (`resources/js/lib/width.ts`: 25 → 3 columns, 33 → 4, 50 → 6, 66 → 8, 75 → 9), so 50 + 50, 33 + 66 and four at 25 fill a row with the gap between them; a field that doesn't fit wraps to the next row, and labels of fields side by side line up at the top, each one's help and error under it. Every level does it: the top level (where a top-level group's card takes its width too), groups, repeater rows and flexible blocks, in entries, terms, global sets, listing pages and taxonomy index pages. The grid is a container query: where the fields' area is narrower than 32rem (a phone, a narrow column) every field is full width. Width is for the admin's editor only: forms on the website are laid out by their template.

## How a field presents itself

In the editor a field shows, like a Filament form field:

1. its **label** (and a red `*` when it's required), with its **hint** at the right of the label in small grey text and, when it has a **hint tooltip**, an ⓘ after the hint (or alone) that shows the tooltip on hover or focus. A hint too long for a narrow field (one at 25%) is cut short with "…" and reads whole on hover;
2. the **input**, with the type's **placeholder** in it while it's empty (`text`, `textarea`, `code`, `number`, and a `link`'s address) and, on `text` and `number`, a **prefix** and **suffix** attached to it as one box (`Rp` 150000, 120 `m²`, `https://` example.com);
3. the **helper text** (the field's `instructions`) under the input, then the field's error under that. A group, repeater or flexible field has no one input to be under: its helper text sits under its label (a top-level group's under its card's heading), and its hint in its card's header.

```php
app(SaveBlueprint::class)->handle(['handle' => 'property', 'title' => 'Property', 'fields' => [
    ['handle' => 'price', 'type' => 'number', 'required' => true, 'width' => 50,
        'hint' => 'Before tax', 'hint_tooltip' => 'What buyers pay, without VAT. Whole rupiah.',
        'instructions' => 'See the [price guide](https://example.com/prices). **Round** to the nearest thousand.',
        'config' => ['prefix' => 'Rp', 'placeholder' => '150000', 'step' => 1]],
    ['handle' => 'area', 'type' => 'number', 'width' => 50, 'config' => ['suffix' => 'm²']],
    ['handle' => 'website', 'type' => 'text', 'config' => ['prefix' => 'https://', 'placeholder' => 'example.com']],
    ['handle' => 'summary', 'type' => 'textarea', 'config' => ['placeholder' => 'Two or three sentences for lists']],
]]);
```

`hint` (up to 100 characters, `Field::HINT_MAX`) and `hint_tooltip` (up to 500, `Field::HINT_TOOLTIP_MAX`) sit beside `instructions`, not in `config`, and are stored only when not empty; read them as `$field->hint` and `$field->hintTooltip`. A fieldset include has none (its fields keep their own). `placeholder` (up to 255 characters), `prefix` and `suffix` (up to 20) are the types' settings, in `config`, under **Appearance** in the builder. They are display only: a price saved as `150000` is stored as `150000`, not `Rp 150000`, so templates add them where they want them: `$field->configString('prefix')` (null when there's none), for example, in an entry's template, `@php($price = $entry->entry->schema()->field('price'))` and then `{{ $price?->configString('prefix') }} {{ number_format($entry->price) }}`. A [type built on another](#built-on-a-built-in-type) can preset them (`preset()` returning `['suffix' => 'kg']`).

The helper text takes simple inline Markdown: `[text](https://…)` links, `**bold**`, `*italic*` and `` `code` ``. The editor escapes everything else, so HTML shows as text; links go to `http(s)`, `mailto:` and `tel:` addresses, paths on the site (`/about`) and anchors (`#prices`) only — anything else (`javascript:`, `data:`, `//elsewhere`) keeps only its words — and open in a new tab with `rel="noopener noreferrer"` (`resources/js/lib/inline-markdown.ts`). Forms on the website show `instructionsIn()` as plain, escaped text. The hint, tooltip, prefix, suffix and placeholder are for the admin's editor; the website's forms are laid out by their template.

## Showing a field only sometimes

A field can show only when other fields on its level are so: in the
blueprint builder, under **Visibility**, **Add condition** → *Only when Layout*
*is* *Video*. The value input fits the other field: a select's own options,
*switched on* / *switched off* for a toggle, a term or an entry picker,
else text. With two conditions or more, choose whether **All of these** or
**Any of these** must be true. The other field must have a value of its
own: a fieldset include can't be one (its fields can). In the definition,
one rule:

```php
['handle' => 'video_url', 'type' => 'text', 'required' => true,
    'condition' => ['field' => 'layout', 'operator' => 'equals', 'value' => 'video']],
```

or several, with `match` `all` (the default) or `any`:

```php
['handle' => 'video_url', 'type' => 'text',
    'condition' => ['match' => 'any', 'rules' => [
        ['field' => 'layout', 'operator' => 'equals', 'value' => 'video'],
        ['field' => 'featured', 'operator' => 'equals', 'value' => true],
    ]]],
```

The builder saves a single condition in the first form, so definitions
written before several existed stay as they are. Operators: `equals` and
`not_equals` (with a value; a list field matches when one of its values
does, a toggle with `true` or `false`, a terms or entries field with an
id), `filled` and `empty`. Inside groups, repeater rows and blocks, the
other fields are siblings there. A hidden field (and everything in it)
isn't required, and keeps what it had, still checked against its other
rules; templates still get its value. `Field::isShownWith()` tells whether
it shows; `conditionRules()` and `conditionMatch()` read the condition in
either form.

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

`rules()` takes the input because a flexible field's rules depend on which blocks were sent. `translationRules()` is the same for another language than the main one (shared fields inside groups, rows and blocks aren't required there). `$schema->fieldAt('sections.2.values.rows.0.price', $data)` gives the field a validation key names, through rows and blocks (a block's kind read from the data).

A field's words for visitors, in a language (default: the page's), with its `translations`: `$field->labelIn('id')`, `$field->instructionsIn('id')`, `$field->options('id')` (a select's `[['value' => …, 'label' => …], …]`) and `$field->optionLabel($value, 'id')`, which turns a select's stored value into what it reads as (`under_offer` → "Dalam penawaran", else the option's label, else the value; null for a value that isn't an option):

```blade
@php($status = $entry->entry->schema()->field('property_status'))
<span class="badge">{{ $status?->optionLabel($values['property_status']) }}</span>
```

A `HydrationContext` remembers the media, entries and terms it loads, so hydrating many values with one context costs one query per kind: `$context->preload($schema->references($data))` loads everything a set of data points at up front. An entry's `values()` loads what all its fields point at together first (one query per kind, not per field), and `$context->share($translations)` makes a list of entries hydrate together: the first `values()` of any of them loads what all of them point at, and `$translation->hydrateWith($context)` makes `values()` use a context when given none. The entries a context loads for an entries field share it too, so `$values['agent']->values()` on every card costs nothing more either: each level of links costs one query per kind.

`Cms::entries()`, the `$entries` of listing and term pages, `$results` on the search page and the entry page's `$values` all do this. For entries you load yourself:

```php
$cards = EntryTranslation::query()->live()->whereIn('entry_id', $ids)->with('entry.collection')->get();
(new HydrationContext(app()->getLocale()))->share($cards);
foreach ($cards as $card) { $card->values(); } // no queries in the loop
```

The same values as plain arrays, for a script on the page or a JSON route: `$card->toData(['image', 'price'])` and `Cms::toData($cards, [...])` ([Data for JavaScript](site.md#data-for-javascript)).

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
