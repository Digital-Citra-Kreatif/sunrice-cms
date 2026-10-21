# Globals

**Global sets** hold values the whole site uses: contact details, social links, footer text, an announcement bar. Each set has a blueprint for its fields and values in each language. There are no drafts: saved values are live.

## Setting up

Under **Structure → Global sets** (permissions `cms.global-sets.view`, `.create`, `.update`, `.delete`): a title, a handle that templates use and that can't change later, and a blueprint. Changing the blueprint keeps the values already saved.

## Editing

Under **Content → Globals** (`cms.globals.view` to see, `cms.globals.update` to save): each set's fields, in each language. Fields the blueprint shares across languages are edited in the main language and shown read-only in the others, as for entries. Until a set is saved, its fields have their defaults. In another language, a translated field without a value there (the set never saved in it, or the field left empty) shows the main language's, on the site and in the editor, which says so (`GlobalSet::data()`). One person edits a set in a language at a time ([edit locks](../../admin/docs/locks.md)).

In code, `SaveGlobals` saves a set's values in a language: `app(SaveGlobals::class)->handle($set, ['phone' => '…'], 'id')`. Fields left out keep their values. Pass the `version` the editor opened as the fourth argument (`GlobalValue::$version`, counted up on each save): if someone saved since, the save is refused with an error on `version` instead of overwriting their work, and the editor offers **Load theirs** or **Save mine anyway**, as for entries.

## Reading them

```php
use Sunrice\Cms\Globals;

$contact = app(Globals::class)->get('contact');         // the current language (as Cms::global('contact'))
$contact = app(Globals::class)->get('contact', 'id');   // Indonesian, shared fields (and those without an Indonesian value) from the main language
$contact['phone'];
```

The current language is the app's locale when it's one of the site's languages (the CMS sets it from the address on its pages), else the main one.

Values come as templates get them (media as `Media` models, dates as Carbon…). All global sets load in one query the first time one is read in a request; an unknown handle gives an empty array.
