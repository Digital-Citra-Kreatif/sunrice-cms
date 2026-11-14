# Building a site with Sunrice

A task-ordered guide for AI coding agents (and the people working with them) building or converting a website with the panel and the CMS. It says what to do, in which order, and where each thing lives; the reference pages it links to have every detail. Read it whole before starting: most mistakes come from building templates before the content model, or from hard-coding what editors should be able to change.

The one idea behind everything below: **a Sunrice site is a set of Blade templates that print content editors manage in the panel.** Anything a visitor reads (navigation, headings, texts, images, buttons, contact details, footer, meta tags) comes from the CMS, not from the template. The template decides only how it looks.

Agents find this page in three places: over MCP with `read_docs` (page `cms/building-a-site`), in the app's code at `vendor/sunrice/cms/docs/building-a-site.md`, which the Sunrice section of the app's `AGENTS.md` points to (`sunrice:install` offers to write it, `php artisan sunrice:agents` writes it at any time), and through [Laravel Boost](ai.md#for-coding-agents-in-the-apps-code)'s guidelines.

## How to work

There are two ways to work, and most jobs use both: content and structure through the panel's MCP tools on a running site, templates and CSS in the app's code.

### Through MCP on a running site

Connect to the panel's MCP endpoint ([AI access](../../admin/docs/ai.md#connecting-an-agent)): over HTTP with a token from **Administration → AI access**, or, for an agent on the server itself, over stdio with `php artisan mcp:start sunrice` (as the user in `sunrice-admin.ai.local_user`, `SUNRICE_AI_USER`). Every tool works as that user, with that user's permissions, and is logged as **AI agent**.

| Step | Tools |
| --- | --- |
| Orientation | `get_panel_info` (who you are, what you may do, the resources and settings sections), `read_docs` (these pages: `cms/building-a-site`, `cms/site`, `cms/fields` …; no page lists them) |
| Languages and settings | `get_settings` and `update_settings` with the sections `site`, `locales` (Settings → Languages: `languages`, one `code: Name` per line), `seo`, `code`, `comments`, `cache` |
| Fields | `cms_field_types` (types and their settings), `cms_get_blueprint`, `cms_save_blueprint` (a blueprint or, with `"kind": "fieldset"`, a fieldset, saved whole) |
| Collections, taxonomies, global sets, menus, forms, redirects | resources: `list_records`, `get_record` (without an id: the create form's fields), `save_record` with `resource` `collections`, `taxonomies`, `globals`, `menus`, `forms`, `redirects` |
| Content | `cms_list_entries`, `cms_get_entry` (with a collection instead of an id: a new entry's fields), `cms_save_entry` (a draft; `"publish": true` to publish too), `cms_publish_entry`, `cms_translate_entry`, `cms_list_terms`, `cms_save_term`, `cms_reorder` |
| Site-wide values and pages | `cms_get_globals`, `cms_save_globals`; `cms_get_menu`, `cms_save_menu`; `cms_get_listing`, `cms_save_listing` (a listing page's or index page's own fields and SEO); `cms_manage_entry` with `set_homepage` |
| Media | `list_media`, `upload_media` (from a public URL or base64, with alt text), `update_media` |
| Templates | `cms_get_template_guide` (which view each page uses now, the files there are, whether you may write them), `cms_read_template`, `cms_write_template` (only for super admins, and only with `sunrice-cms.ai.templates` on) |
| Checking | `cms_render_page` (a page as a signed-out visitor sees it: status, HTML, a template's error), `cms_seo_audit`, `read_error_log` |

The full list, with the permission each needs, is in [AI tools for content](ai.md) and [the panel's tools](../../admin/docs/ai.md#the-panels-tools). Globals, menus, listing pages and index pages are live as soon as they're saved, and entries go live when published: ask the person before publishing or changing what's live on a site people already visit.

### In the app's code

| What | How |
| --- | --- |
| Templates, layout, partials | Blade files in `resources/views/cms/` ([Templates](#templates)). |
| A first set of templates | `php artisan vendor:publish --tag=sunrice-cms-templates` (a layout, entry, listing, term, index and search templates, partials, error pages and `public/cms/site.css`), or `php artisan sunrice:make-templates --all` (templates written from each collection's and taxonomy's blueprints). See [starter templates](site.md#starter-templates) and [templates from the blueprints](site.md#templates-from-the-blueprints). |
| Structure (and sample content) as a file | `php artisan sunrice:export-structure site.json --entries --settings` and `php artisan sunrice:import-structure site.json [--dry-run]`: blueprints, fieldsets, collections, taxonomies, global sets, forms, menus, redirects, entries, terms and Settings → Site in one JSON file, imported through the same actions and checks as the admin ([exporting and importing](structure.md#exporting-and-importing-structure)). |
| Pages and Posts to start with | `php artisan sunrice:scaffold-collections` ([Pages and Posts](collections.md#pages-and-posts-to-start-with)). |
| A whole starter site | The starter kit: `php artisan sunrice:starter blog`; a starter's `site.json` is a structure file ([Starter sites](../../starter-kit/docs/starters.md)). |
| In PHP | The actions the admin uses, each with a `handle()`: `Actions\Blueprints\SaveBlueprint`, `Actions\Fieldsets\SaveFieldset`, `Actions\Collections\SaveCollection`, `Actions\Entries\CreateEntry`, `SaveDraft`, `PublishEntry`, `Actions\Globals\SaveGlobals`, `Actions\Menus\SaveMenu` (all under `Sunrice\Cms`). A seeder or a migration of content uses these, never the tables. |
| Every command | [Commands](commands.md). |

Never edit the CMS's tables directly, never edit `vendor/`, and don't put content in templates "for now": it's the hard-coding this guide is about undoing.

## Plan the content model first

Before writing a template, go through the design (or the static site you're converting) and decide where each thing on the page lives. This table covers nearly everything:

| On the page | Where it lives in Sunrice | In the template |
| --- | --- | --- |
| Navigation (header, footer links) | A **menu** (`main`, `footer`), links to entries, listing pages, terms or addresses, labelled per language ([Menus](menus.md)) | `@foreach (Cms::menu('main') as $item)` |
| Footer text, contact details, opening hours, social links, an announcement bar | A **global set** (`site_info`, `footer`) with a blueprint of its own ([Globals](globals.md)) | `Cms::global('site_info')['phone'] ?? ''` |
| A page's sections (hero, intro, features) | **Fields** of the page's blueprint: a group per section, a repeater for a list of similar items ([Fields](fields.md)) | `$values['hero']['heading']` |
| Sections that vary from page to page | A **flexible** field whose kinds of block are fieldsets, each with its own view `cms/blocks/{fieldset}.blade.php` | `@foreach ($values['sections'] as $block)` |
| Repeated items with their own pages: team, services, posts, projects, properties | A **collection** with a URL (`/team/{slug}`) and, for a page listing them, a listing page URL (`/team`) ([Collections](collections.md#collections)) | `$entries` on the listing page; `<x-sunrice-cms::entries>` or `Cms::entries()` elsewhere |
| Repeated items without pages of their own (logos, testimonials) | A repeater on the page, or a collection without a URL | `$values['logos']`, or `Cms::entries('testimonials')` |
| Categories, tags, topics | A **taxonomy** attached to the collection, with term pages and an index page if wanted ([Taxonomies](taxonomies.md)) | `$entry->termsOf('topics')`, `<x-sunrice-cms::terms>` |
| Images | **Media** fields (files in the panel's media library, alt text per language) | `$image->url('large')`, `$image->altIn()` |
| Buttons and calls to action | A **link** field (an entry, a term's page, a listing page or an address, with its text) | `<x-sunrice-cms::link :link="$values['cta']" />` |
| A contact or quote form | A **form** (Structure → Forms) with a blueprint of its fields ([Forms](forms.md)) | `<x-sunrice-cms::form handle="contact" />` |
| `<title>`, description, canonical, Open Graph, structured data | Each page's **Search and sharing** card, Settings → SEO and Settings → Site ([SEO](site.md#seo)) | `<x-sunrice-cms::seo />` in `<head>` |
| The site's name and logo, the favicon | Settings → Site ([site icon and logo](site.md#site-icon-and-logo)) | `Cms::site()->name()`, `Cms::site()->logoImage()`; the seo component prints the icon's tags |
| A language switch | Settings → Languages; each entry translated ([Languages](collections.md#languages)) | `<x-sunrice-cms::language-switcher />` |
| Fixed interface words ("Read more", "Search", "Previous") | The app's language files, the same keys in every language | `__('site.read_more')` |
| Analytics, chat widgets, verification tags | Settings → Site code ([Site code](site.md#site-code)) | `<x-sunrice-cms::code place="head" />` |
| The homepage | An entry (usually in Pages) chosen in Settings → Site ([The homepage](site.md#the-homepage)) | its template, like any entry's |
| A search box | The site search at `/search` ([Search](site.md#search)) | `<x-sunrice-cms::search>` |
| Filters on a listing ("for sale", price range) | `<x-sunrice-cms::entry-filter>` on the listing page ([Filtering entries](site.md#filtering-entries)) | its slot, or its own markup |

Decide the handles once and keep them: templates name collections, menus, global sets, forms and fields by handle, and field handles are stored with every entry (renaming one later takes `sunrice:rename-field`). Handles are lowercase letters, digits and underscores, starting with a letter. A blueprint's top level can't use `id`, `title`, `slug`, `url`, `status`, `locale`, `published_at`, `created_at`, `updated_at`, `parent`, `children`, `collection`, `blueprint`, `data`, `seo` or `author`: an entry has its title, slug and SEO already.

Rules of thumb:

- **One blueprint per kind of page.** Pages that look alike share a blueprint; a page that's truly different (the homepage, a landing page) gets its own blueprint, offered by its collection as one of its **Other blueprints** and chosen on the entry ([per-entry blueprints](collections.md#per-entry-blueprints)).
- **A list of things with their own page is a collection, not a repeater.** Services each with a page of their own: a collection. Three feature cards on the homepage: a repeater.
- **The entry's terms come from the collection's taxonomies**, not from a terms field. A terms field is only a custom link ("featured topic"); see [terms fields](taxonomies.md#terms-fields).
- **Fields for what changes, CSS for what doesn't.** A colour scheme or an icon set is the template's; the words and pictures in it are fields.

## Set up

Work through these in order: each step uses the one before.

### Languages

The content languages are Settings → Languages (`update_settings` section `locales`, or, until it's saved, config `sunrice-cms.locales` / `SUNRICE_LOCALES=en,id`), the first being the main one. The main language's pages are at plain addresses (`/about`), the others under their code (`/id/tentang`); each collection and taxonomy can have its own URL pattern per language ([translated URLs](site.md#translated-urls)).

- **Translated or shared fields.** Each field's *Translatable* switch decides; by default text, textarea, rich text, link, group, repeater and flexible fields are translated, and numbers, toggles, selects, dates and media shared (a price is the same in every language). Code fields are shared unless set otherwise. Shared fields are edited in the main language only ([Languages](collections.md#languages)).
- **Untranslated pages.** With **Settings → Site → Show untranslated pages in the main language** (on by default; `sunrice-cms.site.fallback` forces it), an entry not translated into a language shows its main-language content at that language's address; templates get `$fallback` and should mark the content's language with `cms_page()?->langAttribute()` ([untranslated pages](site.md#untranslated-pages)).
- **Right to left.** Arabic, Hebrew, Persian … get `dir="rtl"` from `cms_dir()` (config `sunrice-cms.rtl_locales`). Write CSS with logical properties (`margin-inline-start`, `text-align: start`) so it mirrors ([Right-to-left languages](site.md#right-to-left-languages)).
- **Machine translation.** With a driver in `sunrice-cms.translation`, `cms_translate_entry` with `"machine": true` and `php artisan sunrice:translate` fill in what isn't translated, into drafts ([Machine translation](translation.md)). `sunrice:translate --only=lang` translates the app's language files too.

### Fields: blueprints and fieldsets

A blueprint lists the fields of one kind of content; a fieldset is a group of fields reused by several blueprints, and the kinds of block of a flexible field ([Fields, blueprints and fieldsets](fields.md)). Make them with `cms_save_blueprint`, Structure → Blueprints, a structure file, or `SaveBlueprint`. A field definition:

```json
{"handle": "hero", "type": "group", "label": "Hero", "fields": [
    {"handle": "heading", "type": "text", "label": "Heading", "required": true},
    {"handle": "image", "type": "media", "label": "Image", "config": {"types": ["image"]}},
    {"handle": "cta", "type": "link", "label": "Button"}
]}
```

`cms_field_types` lists the types and their settings; [field definitions](fields.md#field-definitions) has every key (`required`, `translatable`, `validation`, `config`, `width`, `instructions`, `hint`, `condition`). Give fields labels and short instructions: editors read them. Nest groups and repeaters at most five levels.

### Collections

A collection is a kind of content ([Collections](collections.md#collections)). The settings that shape the site:

| Setting | |
| --- | --- |
| `route` | The entries' URL: `/{slug}` for pages at the root, `/blog/{slug}`, `/projects/{project}/{slug}` (a related entry's slug); none: no pages of their own. More specific patterns win; the app's own routes always come first ([URLs](site.md#urls)). |
| `listing_route`, `per_page`, `listing_blueprint` | A page listing the entries (`/blog`), how many per page, and that page's own fields (an intro, an image) ([Listing pages](site.md#listing-pages)). |
| `dated` | Entries have a date and list newest first (posts, news). |
| `ordered` | Manual order (editors drag entries into order): team, services. |
| `hierarchical` | Entries have a parent, for breadcrumbs and sub-menus; URLs stay flat. |
| `blueprint`, `blueprints` | Its fields, and the other blueprints its entries may choose. |
| `template`, `listing_template` | A view name for its entries or listing page, when the [file convention](#which-file-a-page-uses) isn't enough. |
| `schema_type` | Its structured data type (Article, Blog post, Product, Person …). |
| `comments` | Whether its entries take comments ([Comments](comments.md)). |

Don't set a listing page URL that an entry would also have (`/blog` as a listing and a page with slug `blog` at `/{slug}`): the CMS refuses clashes and says which.

### Taxonomies

A taxonomy is attached to the collections whose entries it groups ([Taxonomies](taxonomies.md)). For each, decide which pages it has: a term page per term **in each collection** (on by default for each collection attached, at `{listing}/{handle}/{slug}`, `/blog/topics/news`), **shared** term pages across collections (off by default), and **index pages** listing the terms (in a collection, `/blog/topics`, or shared). Switch off the pages your templates don't design for: a page with no template of its own renders with the CMS's plain one. Entries get their terms in the editor's Taxonomies card, `cms_save_entry`'s `"terms"`, or a structure file's `terms` ([giving entries terms](taxonomies.md#giving-entries-terms)).

### Global sets

A global set is a blueprint's fields with one value per language, no drafts ([Globals](globals.md)): contact details, social profiles, footer text. Make the set (`save_record` resource `globals`: title, handle, blueprint) and fill it in (`cms_save_globals`). An unknown handle gives `[]`, so templates still render while it's missing.

### Menus

Make the menu (`save_record` resource `menus`), then its links (`cms_save_menu` with `items`: `entry_id`, `collection_id` for a listing page, `term_id`, `taxonomy_id` for an index page, or `url`, each with `labels` per language and `children`). Link to the site's own pages by entry or listing, never by typing their address: links then follow slugs and translations, and pages that aren't live are left out ([Menus](menus.md)).

### Forms

A form's fields are a blueprint (`text`, `textarea`, `number`, `toggle`, `select`, `date` and `file` fields; a text field with the `email` rule is the reply address); the form (`save_record` resource `forms`) says who's emailed, the thank-you message and the send limit ([Forms](forms.md)). Submissions are kept in the panel.

### SEO

- **Settings → SEO** (`update_settings` section `seo` for structured data; the rest in Settings → SEO): the share image, whether titles get the site's name, the site's X account, structured data's publisher, and, for each collection and taxonomy, which fields fill in an empty SEO card (`seo_title_field`, `seo_description_field`, `seo_image_field`): map the excerpt and the main image, so every page has a description and a share image without editors filling in the card ([SEO](site.md#seo)).
- **Hide the whole site from search engines** while it's being built or on staging (Settings → SEO, or `SUNRICE_NOINDEX=true`), and switch it off at launch: the dashboard warns while it's on.
- **Each page's Search and sharing card** (`cms_save_entry` with `"seo"`: `title`, `description`, `image`, `noindex`), and listing and index pages' cards (`cms_save_listing` with `"seo"`).
- `/sitemap.xml` and the structured data are made by the CMS; `cms_seo_audit` lists what's missing ([structured data](site.md#structured-data)).

### Settings → Site, media sizes and the homepage

- **Settings → Site** (`update_settings` section `site`): the site's name (else `APP_NAME`), description, logo and site icon.
- **The homepage** is an entry: `cms_manage_entry` with `"action": "set_homepage"`, or Settings → Site. Until one is chosen, `/` is a 404. Laravel's own welcome route in `routes/web.php` hides it: `sunrice:install` offers to remove it.
- **Image sizes** are the panel's `sunrice-admin.media.image_sizes` (`thumbnail` 300 × 300 cropped, `medium` 800 wide, `large` 1600 wide by default). Add the sizes your design needs there (`'hero' => [2000, null, 'fit']`) and run `php artisan sunrice:media-sizes` for files uploaded before.

## Templates

### Which file a page uses

Pages render with Blade views in `resources/views/cms/`, the first that exists ([Templates](site.md#templates)):

| Page | File (most specific first) |
| --- | --- |
| One entry | `cms/collections/{collection}/{slug}.blade.php` (its main-language slug) |
| A collection's entries | `cms/collections/{collection}/show.blade.php`, then `cms/collections/show.blade.php` |
| A collection's listing page | `cms/collections/{collection}/index.blade.php`, then `cms/collections/index.blade.php` |
| A collection's term pages | `cms/collections/{collection}/{taxonomy}/show.blade.php` (or `{slug}`), then the shared ones below |
| A collection's index page of a taxonomy | `cms/collections/{collection}/{taxonomy}/index.blade.php`, then `cms/taxonomies/{taxonomy}/index.blade.php` |
| Shared term pages | `cms/taxonomies/{taxonomy}/{slug}.blade.php`, `cms/taxonomies/{taxonomy}/show.blade.php`, `cms/taxonomies/show.blade.php` |
| Shared index page | `cms/taxonomies/{taxonomy}/index.blade.php`, `cms/taxonomies/index.blade.php` |
| Search | `cms/search.blade.php` |

An entry's or term's own **Template** (its Page settings) and a collection's or taxonomy's `template`, `listing_template` and `index_template` are view names that come into this order too ([defaults and overrides](site.md#defaults-and-overrides)); they must be under `sunrice-cms.site.template_prefixes` (`cms.` and `pages.` by default), never a layout or partial. Without any file, the CMS's plain built-in view renders the page, so a site works before it has templates. `cms_get_template_guide` lists which view each page uses now.

The homepage is an entry: give it `cms/collections/pages/home.blade.php` (if its slug is `home`) or its own blueprint and template.

### The layout

One layout, `resources/views/cms/layout.blade.php`, that every page `@extends('cms.layout')`, filling `@section('content')` and adding to the head with `@push('head')`. It must have:

```blade
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ cms_dir() }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <x-sunrice-cms::seo :title="$seoTitle ?? null" />
    <link rel="stylesheet" href="{{ asset('site/site.css') }}">
    @stack('head')
    <x-sunrice-cms::code place="head" />
</head>
<body @bodyClass>
    <x-sunrice-cms::code place="body-start" />
    …header, @yield('content'), footer…
    <x-sunrice-cms::code place="body-end" />
</body>
</html>
```

- `<x-sunrice-cms::seo />` prints the `<title>`, description, robots, canonical, `hreflang`, Open Graph and X tags, the site icon and the structured data: never write those tags yourself. On your app's own pages (and error pages) pass a title: `@extends('cms.layout', ['seoTitle' => __('site.not_found')])`.
- `@bodyClass` prints `class="…"` naming the kind of page, collection, entry, template and language ([Layout helpers](site.md#layout-helpers)).
- The layout reads the page from `cms_page()`, never from `$entry` or `$term`: a page's `@foreach ($entries as $entry)` leaves those set to its last card.
- Parts go in partials (`cms/partials/menu.blade.php`, `card.blade.php`), included with `@include('cms.partials.card', ['item' => $post])`.

`php artisan vendor:publish --tag=sunrice-cms-templates` writes a complete layout to start from (with the logo, menus, language switcher, footer global and a skip link), and error pages in `resources/views/errors/` that use it.

### What every page gets

| Variable | Entry | Listing page | Term page | Index page | Search |
| --- | --- | --- | --- | --- | --- |
| `$page` (= `cms_page()`), `$title`, `$locale` | yes | yes | yes | yes | yes |
| `$entry` (an `EntryTranslation`) | yes | | | | |
| `$collection` | yes | yes | its collection, or null on a shared page | its collection, or null on a shared page | |
| `$values`, `$richText`, `$code` | the entry's fields | the listing page's fields | the term's fields | the index page's fields | |
| `$entries` (a paginator, queried when first used) | | yes | the term's entries | | |
| `$term` (a `TermTranslation`), `$taxonomy` | | | yes | `$taxonomy` | |
| `$terms` (with `entries_count`) | | | | yes | |
| `$url` | | yes | | yes | |
| `$preview`, `$draft` | yes | | | | |
| `$fallback`, `$contentLocale` | yes | | yes | | |
| `$query`, `$results` (a paginator) | | | | | yes |

The details of each are in [what templates get](site.md#what-templates-get): [entry pages](site.md#entry-pages-get), [listing pages](site.md#listing-pages-get), [term pages](site.md#term-pages-get), [index pages](site.md#taxonomy-index-pages-get), [search](site.md#the-search-page-gets).

An entry: `$entry->title`, `->url()`, `->published_at` (Carbon), `->terms` (all its terms) and `->termsOf('topics')`, `->entry->collection`, `->entry->parent` and `->entry->ancestors()` in a hierarchical collection. In a list, `$post->values()` gives an entry's fields (loaded for the whole list at once).

### What each field gives a template

`$values` holds the fields by handle, ready to print ([field types](fields.md#field-types)). **Any field may be missing or empty**: read with `$values['intro'] ?? null` and print inside `@if (filled(…))`.

| Type | Value | Print it |
| --- | --- | --- |
| `text` | a string | `{{ $values['subtitle'] }}` |
| `textarea` | a string with line breaks | `<p class="pre-line">{{ $values['intro'] }}</p>` with `white-space: pre-line` in CSS |
| `rich_text` | cleaned HTML; media library images get `srcset`, `sizes`, size and lazy loading | `<div class="prose">{!! $values['body'] !!}</div>`: the **only** field printed unescaped |
| `code` | a string, never cleaned | `<x-sunrice-cms::code-block :value="$values['snippet']" language="html" />` |
| `number` | int or float | `{{ number_format($values['price']) }}` (prefix and suffix are the editor's only) |
| `toggle` | bool | `@if ($values['featured'] ?? false)` |
| `select` | the stored value, or a list with `multiple` | the option's label: `$entry->entry->schema()->field('status')?->optionLabel($values['status'])` |
| `date` | a Carbon (or null) | `{{ $values['starts_at']?->translatedFormat('j F Y') }}` |
| `link` | `['url', 'label', 'title', 'new_tab', 'rel', 'type']`, or null; `url` null when its page isn't live | `<x-sunrice-cms::link :link="$values['cta']" class="button" />` |
| `media` | a `Sunrice\Admin\Media\Media`, or a collection of them with `multiple` | `<img src="{{ $image->url('large') }}" srcset="{{ $image->srcset() }}" alt="{{ $image->altIn() ?? '' }}" width="{{ $image->width }}" height="{{ $image->height }}">` |
| `entries` | an `EntryTranslation` (or null), or a collection with `multiple` | `<a href="{{ $agent->url() }}">{{ $agent->title }}</a>`, `$agent->values()` |
| `terms` | a `Term` (or null), or a collection with `multiple` | `<a href="{{ $term->url() }}">{{ $term->title() }}</a>` |
| `group` | an array of its fields | `$values['hero']['heading'] ?? null` |
| `repeater` | `Items` (a Laravel collection) of arrays, hidden rows left out | `@foreach ($values['features'] as $row) {{ $row['title'] }} @endforeach` |
| `flexible` | `Items` of `Block`s: `$block->type` (the fieldset's handle), `$block->key`, fields as `$block->heading` or `$block['heading']` | `@foreach ($values['sections'] as $block) @includeIf('cms.blocks.'.$block->type, ['block' => $block]) @endforeach` |

A media file also has `->captionIn()`, `->url('thumbnail')`, `->srcset('medium', 'large')`, `->isImage()`, `->width` and `->height`. Use `->url($size)` with the size that fits the place and `srcset()` for the browser to choose. For decorative images, `alt=""`.

The starter templates' `cms/partials/fields.blade.php` prints any blueprint's fields by type, and `cms/partials/blocks.blade.php` renders flexible blocks with `cms/blocks/{fieldset}.blade.php` when there is one: copy them rather than starting from nothing.

### Helpers

`Cms` is `Sunrice\Cms\Content` ([Helpers and the Cms facade](helpers.md)); each has a function form too.

| Helper | Gives |
| --- | --- |
| `Cms::entries('blog')` / `cms_entries()` | A query of live entries in the page's language: `->latest()`, `->oldest()`, `->alphabetical()`, `->ordered()`, `->orderBy('price', 'desc')`, `->where('featured', true)`, `->whereTerm('topics', 'news')`, `->childrenOf($entry->entry)`, `->except($entry)`, `->search($text)`, `->limit(3)`, then `->get()`, `->first()`, `->count()` or `->paginate(12)` ([querying entries](site.md#querying-entries)) |
| `Cms::menu('main')` / `cms_menu()` | The menu's links: `label`, `url`, `new_tab`, `active`, `active_trail`, `children`; `[]` when it doesn't exist |
| `Cms::global('site_info')` / `cms_global()` | The set's values, as fields come; `[]` when it doesn't exist |
| `Cms::page()` / `cms_page()` | The page shown (`type`, `entry`, `term`, `collection`, `home`, `fallback`, `langAttribute()`, `dirAttribute()`), null on your app's own pages |
| `Cms::site()` | Settings → Site: `name()`, `title('About')`, `logoImage()`, `iconUrl(192)` |
| `Cms::localeUrls()` / `cms_locale_urls()` | `[locale => url]` of the page shown, for a switcher of your own |
| `Cms::dir()` / `cms_dir()` | `'rtl'` or `'ltr'` for `<html dir>` |
| `Cms::bodyClass()` / `@bodyClass` | The body's classes |
| `Cms::toData($items, ['field'])` | Plain arrays of entries, terms or media for a script ([Data for JavaScript](site.md#data-for-javascript)) |
| `cms_nonce()` | The CSP nonce for inline `<script>` and `<style>` |

### Components

| Component | For |
| --- | --- |
| `<x-sunrice-cms::seo />` | The head's tags; `title`, `description`, `noindex`, `:schema` ([SEO](site.md#seo)) |
| `<x-sunrice-cms::code place="head" />` | Settings → Site code at `head`, `body-start`, `body-end` |
| `<x-sunrice-cms::language-switcher />` | Links to the page in its other languages (`variant="dropdown"`, `labels="code"`, or a slot with `$component->languages`); nothing on a site in one language |
| `<x-sunrice-cms::link :link="$values['cta']" />` | A link field's `<a>`, nothing when it has no address |
| `<x-sunrice-cms::entries collection="blog" :limit="3">` | A list of entries, your markup over `$component->entries` (`order`, `terms`, `where`, `except`, `paginate`) |
| `<x-sunrice-cms::terms taxonomy="topics" hide-empty>` | A taxonomy's terms with `entries_count`, over `$component->terms` |
| `<x-sunrice-cms::entry-filter collection="shop" :filters="[…]" />` | Filters, sorting and pages by the address |
| `<x-sunrice-cms::search>` | A search form (`$component->action`, `->name`, `->query`) or, with `results`, results |
| `<x-sunrice-cms::form handle="contact" />` | A form, its errors and thank-you message; a slot for your own markup ([your own markup](forms.md#your-own-markup)) |
| `<x-sunrice-cms::comments :entry="$entry" />` | An entry's comments and the comment form |
| `<x-sunrice-cms::code-block :value="…" language="html" />` | A code field shown as code |

Every attribute is in [Components](site.md#components).

## Converting a static site

Agents often get, or write first, a static site: HTML pages with the navigation, texts, images, contact details and meta tags typed in. Converting it to Sunrice means moving every one of those into the CMS and leaving the template only the markup. Step by step:

1. **Inventory.** List every page type (home, about, a service, the blog, a post, contact) and, on each, every block of content. Mark what repeats across pages (header, footer), what repeats inside a page (cards), and what's the same on every site (the CSS).
2. **Model it** with the [table above](#plan-the-content-model-first): collections, blueprints and fields per page type, global sets, menus, forms, taxonomies. Write it as a structure file (`site.json`) or make it with the MCP tools, then import or save it and check it in the panel.
3. **Split the HTML.** What every page shares becomes `cms/layout.blade.php` (doctype, head, header, footer); each page type becomes a template under `cms/collections/…`; repeated parts become partials. Remove every `<title>`, `<meta name="description">`, `<meta property="og:…">`, `<link rel="canonical">`, favicon link and JSON-LD script: `<x-sunrice-cms::seo />` prints them all.
4. **Replace each hard-coded thing** with where it now lives: navigation with `Cms::menu()`, footer and contact details with `Cms::global()`, headings and texts with `$values`, images with media fields, buttons with link fields, the contact form with `<x-sunrice-cms::form>`, the language links with the switcher, the interface words with `__()`. Links between the site's pages come from `->url()` and menus, never typed: `/about` becomes `/id/tentang` in Indonesian, and slugs change.
5. **Move the content in**: create the entries (`cms_save_entry`, or the structure file's `entries` with `--entries`), upload the images (`upload_media`, with alt text) and point the media fields at them, fill in the global sets and menus, choose the homepage.
6. **Assets.** Static CSS, JavaScript, fonts and decorative images (logos in the design, icons, background patterns) go in a folder of their own under `public/` (`public/site/site.css`), linked with `asset('site/site.css')`; or, when the app builds its front end, through the app's Vite with `@vite([…])` in the layout (the page cache follows Vite's manifest). Images editors should be able to change are media, not assets.
7. **Scripts and styles under CSP.** Inline `<script>` and `<style>` get `nonce="{{ cms_nonce() }}"` (empty while the site's Content-Security-Policy is off, so always add it). Inline event handlers (`onclick="…"`, `<select onchange>`) and `javascript:` links never run under the policy: attach events from a script with `addEventListener`, and data a script needs goes in `data-…` attributes or a `<script type="application/json">` with `@json` ([Content-Security-Policy](site.md#content-security-policy)).
8. **Words.** Every fixed word in the templates goes through `__()`. Put them in `lang/{locale}/site.php` with the same keys in every language (`__('site.read_more')`), as the Blog starter does; the CMS's own words (form buttons, pagination, comments) are `sunrice-cms::site.*`, overridden in `lang/vendor/sunrice-cms/{locale}/site.php` ([the site's words](site.md#the-sites-words)).
9. **Check** every page with the [final checklist](#final-checklist).

### A worked example

A small studio's landing page, as an agent might first write it:

```html
<!doctype html>
<html lang="en">
<head>
  <title>Acme Studio — Calm websites</title>
  <meta name="description" content="We design and build calm websites.">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <a href="/" class="logo">Acme Studio</a>
    <nav><a href="/">Home</a> <a href="/blog">Blog</a> <a href="/contact">Contact</a></nav>
  </header>
  <section class="hero">
    <h1>We build calm websites</h1>
    <p>Small sites that load fast and are easy to keep up to date.</p>
    <img src="img/hero.jpg" alt="Our studio">
    <a class="button" href="/contact">Get in touch</a>
  </section>
  <section class="services">
    <article><h2>Design</h2><p>Layouts and type that suit your brand.</p></article>
    <article><h2>Build</h2><p>Fast pages on a CMS you can edit.</p></article>
    <article><h2>Care</h2><p>Updates and help when you need it.</p></article>
  </section>
  <section class="news">
    <h2>From the blog</h2>
    <a href="/blog/hello">Hello</a> <a href="/blog/second">Our second post</a>
  </section>
  <footer>
    <p>Jl. Contoh 1, Denpasar · +62 361 000 000 · hello@example.com</p>
    <a href="https://instagram.com/example">Instagram</a>
    <p>© 2026 Acme Studio</p>
  </footer>
  <script>document.querySelector('.logo').onclick = () => {};</script>
</body>
</html>
```

**The model.** Navigation: the `main` menu. Footer: a global set `site_info` (address, phone, email, social links). Hero and services: fields of a `home` blueprint, which the Pages collection offers beside its `page` blueprint. Blog: a Posts collection with a listing page at `/blog`. The site's name: Settings → Site; the title and description: the home entry's SEO card and Settings → SEO. As a structure file, imported with `php artisan sunrice:import-structure site.json` (the same could be made with `cms_save_blueprint`, `save_record`, `cms_save_entry`, `cms_save_globals` and `cms_save_menu`):

```json site.json
{
    "sunrice": 1,
    "blueprints": [
        {"handle": "page", "title": "Page", "fields": [
            {"handle": "intro", "type": "textarea", "label": "Intro"},
            {"handle": "body", "type": "rich_text", "label": "Text"}
        ]},
        {"handle": "home", "title": "Home page", "fields": [
            {"handle": "hero", "type": "group", "label": "Hero", "fields": [
                {"handle": "heading", "type": "text", "label": "Heading", "required": true},
                {"handle": "text", "type": "textarea", "label": "Text"},
                {"handle": "image", "type": "media", "label": "Image", "config": {"types": ["image"]}},
                {"handle": "cta", "type": "link", "label": "Button"}
            ]},
            {"handle": "services", "type": "repeater", "label": "Services", "fields": [
                {"handle": "title", "type": "text", "label": "Title", "required": true},
                {"handle": "text", "type": "textarea", "label": "Text"}
            ]}
        ]},
        {"handle": "post", "title": "Post", "fields": [
            {"handle": "excerpt", "type": "textarea", "label": "Excerpt"},
            {"handle": "image", "type": "media", "label": "Image", "config": {"types": ["image"]}},
            {"handle": "body", "type": "rich_text", "label": "Text"}
        ]},
        {"handle": "site_info", "title": "Site info", "fields": [
            {"handle": "address", "type": "textarea", "label": "Address"},
            {"handle": "phone", "type": "text", "label": "Phone"},
            {"handle": "email", "type": "text", "label": "Email", "validation": ["email"]},
            {"handle": "social", "type": "repeater", "label": "Social profiles", "fields": [
                {"handle": "link", "type": "link", "label": "Profile"}
            ]}
        ]}
    ],
    "collections": [
        {"handle": "pages", "title": "Pages", "blueprint": "page", "blueprints": ["home"], "ordered": true, "hierarchical": true, "route": "/{slug}"},
        {"handle": "posts", "title": "Posts", "blueprint": "post", "dated": true, "route": "/blog/{slug}", "listing_route": "/blog", "per_page": 10,
            "seo_description_field": "excerpt", "seo_image_field": "image"}
    ],
    "globals": [
        {"handle": "site_info", "title": "Site info", "blueprint": "site_info", "values": {"en": {
            "address": "Jl. Contoh 1, Denpasar", "phone": "+62 361 000 000", "email": "hello@example.com",
            "social": [{"link": {"type": "url", "url": "https://instagram.com/example", "label": "Instagram", "new_tab": true}}]
        }}}
    ],
    "entries": [
        {"collection": "pages", "slug": "contact", "translations": {"en": {"title": "Contact", "slug": "contact", "published": true,
            "data": {"intro": "Tell us about your project."}}}},
        {"collection": "pages", "slug": "home", "blueprint": "home", "translations": {"en": {"title": "Home", "slug": "home", "published": true,
            "data": {
                "hero": {"heading": "We build calm websites", "text": "Small sites that load fast and are easy to keep up to date.",
                    "cta": {"type": "entry", "entry_id": {"entry": "pages/contact"}, "label": "Get in touch", "new_tab": false}},
                "services": [
                    {"title": "Design", "text": "Layouts and type that suit your brand."},
                    {"title": "Build", "text": "Fast pages on a CMS you can edit."},
                    {"title": "Care", "text": "Updates and help when you need it."}
                ],
                "seo": {"title": "Calm websites", "description": "We design and build calm websites."}
            }}}},
        {"collection": "posts", "slug": "hello", "translations": {"en": {"title": "Hello", "slug": "hello", "published": true,
            "published_at": "2026-10-01T09:00:00+00:00", "data": {"excerpt": "Why we started the studio."}}}}
    ],
    "menus": [
        {"handle": "main", "title": "Main", "items": [
            {"entry": "pages/home", "labels": {"en": "Home"}},
            {"collection": "posts", "labels": {"en": "Blog"}},
            {"entry": "pages/contact"}
        ]}
    ],
    "settings": {"site": {"name": "Acme Studio", "homepage": {"entry": "pages/home"}}}
}
```

In a structure file an entry, term or media file is named by its key (`{"entry": "pages/contact"}`, `{"media": "hero.jpg"}`), never by id, and an entry's SEO card is its data's `seo` ([exporting and importing](structure.md#exporting-and-importing-structure)). The hero image is uploaded to the media library and chosen in the editor (or `upload_media`, then `cms_save_entry` with the media id).

**The layout**, `resources/views/cms/layout.blade.php`: the menu, the global set and the site's name replace what was typed; `<x-sunrice-cms::seo />` replaces the title and description; the inline `onclick` is gone.

```blade resources/views/cms/layout.blade.php
@php($info = Cms::global('site_info'))
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ cms_dir() }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <x-sunrice-cms::seo :title="$seoTitle ?? null" />
    <link rel="stylesheet" href="{{ asset('site/site.css') }}">
    @stack('head')
    <x-sunrice-cms::code place="head" />
</head>
<body @bodyClass>
    <x-sunrice-cms::code place="body-start" />
    <header class="site-header" data-site-header>
        <a class="logo" href="{{ url(\Sunrice\Cms\Support\Locales::prefix(app()->getLocale()) ?: '/') }}">{{ Cms::site()->name() }}</a>
        @if (($menu = Cms::menu('main')) !== [])
            <nav aria-label="{{ __('site.menu') }}">
                @foreach ($menu as $item)
                    <a href="{{ $item['url'] }}" @if ($item['active']) aria-current="page" @endif @if ($item['new_tab']) target="_blank" rel="noopener" @endif>{{ $item['label'] }}</a>
                @endforeach
            </nav>
        @endif
        <x-sunrice-cms::language-switcher />
    </header>

    <main id="main">
        @yield('content')
    </main>

    <footer class="site-footer">
        @if (filled($info['address'] ?? null))
            <p class="pre-line">{{ $info['address'] }}</p>
        @endif
        @if (filled($info['phone'] ?? null))
            <a href="tel:{{ preg_replace('/[^+\d]/', '', $info['phone']) }}">{{ $info['phone'] }}</a>
        @endif
        @if (filled($info['email'] ?? null))
            <a href="mailto:{{ $info['email'] }}">{{ $info['email'] }}</a>
        @endif
        @foreach ($info['social'] ?? [] as $profile)
            <x-sunrice-cms::link :link="$profile['link']" />
        @endforeach
        <p>&copy; {{ now()->year }} {{ Cms::site()->name() }}</p>
    </footer>
    <script src="{{ asset('site/site.js') }}" defer></script>
    <x-sunrice-cms::code place="body-end" />
</body>
</html>
```

**The homepage**, `resources/views/cms/collections/pages/home.blade.php` (the Pages entry whose slug is `home`): the hero and services from its fields, the latest posts from the Posts collection.

```blade resources/views/cms/collections/pages/home.blade.php
@extends('cms.layout')

@section('content')
    @php($hero = $values['hero'] ?? [])
    <section class="hero">
        @if (filled($hero['heading'] ?? null))
            <h1>{{ $hero['heading'] }}</h1>
        @endif
        @if (filled($hero['text'] ?? null))
            <p>{{ $hero['text'] }}</p>
        @endif
        @if (($image = $hero['image'] ?? null) instanceof \Sunrice\Admin\Media\Media)
            <img src="{{ $image->url('large') }}" srcset="{{ $image->srcset() }}" sizes="100vw"
                alt="{{ $image->altIn() ?? '' }}" @if ($image->width) width="{{ $image->width }}" height="{{ $image->height }}" @endif>
        @endif
        <x-sunrice-cms::link :link="$hero['cta'] ?? null" class="button" />
    </section>

    @if (filled($values['services'] ?? null))
        <section class="services">
            @foreach ($values['services'] as $service)
                <article>
                    <h2>{{ $service['title'] ?? '' }}</h2>
                    @if (filled($service['text'] ?? null))
                        <p>{{ $service['text'] }}</p>
                    @endif
                </article>
            @endforeach
        </section>
    @endif

    <x-sunrice-cms::entries collection="posts" :limit="3">
        @if ($component->entries->isNotEmpty())
            <section class="news">
                <h2>{{ __('site.from_the_blog') }}</h2>
                @foreach ($component->entries as $post)
                    <article>
                        <a href="{{ $post->url() }}">{{ $post->title }}</a>
                        @if (filled($excerpt = $post->values()['excerpt'] ?? null))
                            <p>{{ $excerpt }}</p>
                        @endif
                    </article>
                @endforeach
            </section>
        @endif
    </x-sunrice-cms::entries>
@endsection
```

**The words**, `lang/en/site.php` (and the same keys in `lang/id/site.php` for an Indonesian site):

```php lang/en/site.php
<?php

declare(strict_types=1);

return [
    'menu' => 'Main',
    'from_the_blog' => 'From the blog',
    'not_found' => 'Page not found',
];
```

The rest: `public/site/site.css` (the static site's stylesheet, with `.pre-line { white-space: pre-line; }`), `public/site/site.js` (its script, events attached with `addEventListener`), and templates for the blog's listing page (`cms/collections/posts/index.blade.php`, over `$entries`) and posts (`cms/collections/posts/show.blade.php`), which `php artisan sunrice:make-templates --collection=posts` can write from the blueprint to start from. Editors now change every word, link, image, menu item and contact detail in the panel, in every language, and the template never changes for it.

## Rules

- **Escape everything** with `{{ }}`. Only rich text fields are printed with `{!! !!}` (they're cleaned when saved); never a text, a textarea, a code field or anything a visitor sent. Code fields are shown with `<x-sunrice-cms::code-block>`.
- **Every field can be empty**, every menu and global set missing, every image without alt text: `?? null`, `filled()`, `?->`, `@if`. A page must render on a fresh install with nothing filled in.
- **Alt text** comes from the media library: `alt="{{ $image->altIn() ?? '' }}"`. Upload images with alt text (`upload_media`, `update_media`); `alt=""` only for decoration.
- **Links from the CMS**: `$entry->url()`, `$term->url()`, `$collection->listingUrl()`, menus' `url`, `<x-sunrice-cms::link>`. Never build an address from a slug or a handle (`/blog/{{ $post->slug }}`): patterns, prefixes and translated slugs make it wrong.
- **No database in templates**: no models, `DB::`, Eloquent queries or `@php` doing work. Data comes from `$values`, `Cms::…` and the components; anything else is a component or a class of the app's, out of the template.
- **No queries in loops.** `Cms::entries()`, `$entries` and the components load what a list's fields point at once for the whole list; `$post->values()` in a loop costs nothing. A query inside a `@foreach` (another `Cms::entries()` per item) runs once per item: query once before the loop, or use `Cms::entries()->whereEntry()` / `whereTerm()`.
- **Layouts and partials read the page from `cms_page()`**, not from `$entry`, `$term` or `$title`, which a loop may have replaced.
- **Inline scripts and styles carry `nonce="{{ cms_nonce() }}"`**; no inline event handlers or `javascript:` links.
- **Fixed words through `__()`**, with the same keys in every language's file. Text arrows in words ("Next →") don't flip on right-to-left pages: use icons with CSS or put the arrow in the translation.
- **Mark the content's language** on pages that may show another language's content: `<article{{ cms_page()?->langAttribute() }}{{ cms_page()?->dirAttribute() }}>`.
- **Nothing personal in pages when the page cache is on** (`SUNRICE_PAGE_CACHE=true`): a kept page is served to every visitor. Forms are fine (each visitor gets their own token). Content changes clear kept pages by themselves, and so does a new Vite build; **changed templates, language files or code don't**: after deploying them, run `php artisan cache:clear` (or Settings → Cache → Clear page cache) ([Whole pages](caching.md#whole-pages), [Deploying](caching.md#deploying)).
- **Your routes win.** A route in `routes/web.php` comes before the CMS's pages at the same address, `/` included.
- **Templates only use the CMS and the app.** No view of a package other than the CMS's components; in a starter, nothing of the app's (`App\…`): see [writing a good starter](../../starter-kit/docs/starters.md#writing-a-good-starter).

## Final checklist

Before calling the site done:

- [ ] Every page type renders, in **every language**: an entry of each collection, each listing page (and its page 2), term and index pages that are switched on, the homepage, `/search?q=…`, and a 404 (`/no-such-page`): `cms_render_page` with each path, or a browser. No status but 200 (and 404 where meant), no template error, `read_error_log` empty.
- [ ] Every page shows in the layout, with the header and footer, the menu's current item marked, and the language switcher leading to the same page in the other language.
- [ ] Nothing a visitor reads is typed into a template but interface words in `lang/` files: search the templates for the static site's texts, addresses, phone numbers and `href="/`.
- [ ] `<head>` has one `<title>` and the tags from `<x-sunrice-cms::seo />` only; `cms_seo_audit` reports no missing titles, descriptions, share images or alt text that matter.
- [ ] `/sitemap.xml` lists the pages; nothing in it is a page you don't want indexed. Settings → SEO's *Hide the whole site from search engines* is off on the live site.
- [ ] The homepage is chosen in Settings → Site, and `routes/web.php` has no `/` route of its own.
- [ ] Empty fields, a deleted menu and a missing global set render nothing rather than an error (try a new entry with only a title).
- [ ] Phone width: the layout works at 360 px, images scale (`height: auto`), menus are reachable.
- [ ] With the site's CSP on in report-only mode (`SUNRICE_SITE_CSP_ENABLED=true`, `SUNRICE_SITE_CSP_REPORT_ONLY=true`), the browser's console shows no CSP violations or script errors.
- [ ] Editors can change it: open the panel as an editor and change a menu label, a global value, a hero heading and an image; the site shows each.
- [ ] After deploying templates with the page cache on, the kept pages were cleared.
