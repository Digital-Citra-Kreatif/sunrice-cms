<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Settings\CodeSettings;
use Sunrice\Cms\Support\Templates;

#[IsReadOnly]
#[Description('Read this before creating or changing the site\'s templates: how a page picks its Blade view, what each kind of page gets, how to read fields, query entries, show menus, globals, forms and SEO, the rules to keep; which view every collection and taxonomy uses now, and the template files there are. Whether you may write them: "can_write".')]
final class GetTemplateGuide extends CmsTool
{
    protected string $name = 'cms_get_template_guide';

    public const GUIDE = <<<'MD'
# Templates

The site's templates are Blade views in `resources/views/cms/` (view names `cms.…`: `pages/landing.blade.php` is `cms.pages.landing`). The CMS's plain fallbacks are `sunrice-cms::entry`, `::listing`, `::term`, `::taxonomy-index` and `::search`: read them with cms_read_template (source "default") for complete, working examples.

## Which view a page uses (the first that exists)

```
resources/views/cms/
  collections/index.blade.php        any listing page
  collections/show.blade.php         any entry
  collections/{collection}/index     that collection's listing page
  collections/{collection}/show      its entries
  collections/{collection}/{slug}    only its entry with that slug
  collections/{collection}/{taxonomy}/index|show|{slug}   its index and term pages of a taxonomy
  taxonomies/index.blade.php         any taxonomy index page
  taxonomies/show.blade.php          any term page
  taxonomies/{taxonomy}/index|show|{slug}   that taxonomy's
```

- Entry: the entry's own template (its Page settings) → `cms.collections.{collection}.{slug}` → the collection's `template` → `cms.collections.{collection}.show` → `cms.collections.show` → `sunrice-cms::entry`.
- Listing page: the collection's `listing_template` → `cms.collections.{collection}.index` → `cms.collections.index` → `sunrice-cms::listing`.
- Term page: the term's own template → (on a collection's term page: `cms.collections.{collection}.{taxonomy}.{slug}` → `cms.collections.{collection}.{taxonomy}.show` →) `cms.taxonomies.{taxonomy}.{slug}` → the taxonomy's `template` → `cms.taxonomies.{taxonomy}.show` → `cms.taxonomies.show` → `sunrice-cms::term`.
- Taxonomy index page (its terms): the taxonomy's `index_template` → (in a collection: `cms.collections.{collection}.{taxonomy}.index` →) `cms.taxonomies.{taxonomy}.index` → `cms.taxonomies.index` → `sunrice-cms::taxonomy-index`.
- Search page: `cms.search` → `sunrice-cms::search`. The homepage (Settings → Site) is an entry.

`{slug}` is the main language's slug, so one file serves every language; slugs `index` and `show` never pick a file. Handles keep their underscores. So: one design for every entry of a collection: `collections/{collection}/show.blade.php`; one page of its own: `collections/pages/about.blade.php`, or any view such as `pages/landing.blade.php` set as the entry's template (`cms.pages.landing`). Own templates must start with `cms.`.

## What views get

- Every page: `$page` (what `Cms::page()` gives), `$title`, `$locale`.
- Entries: `$entry` (the EntryTranslation: `->title`, `->url()`, `->published_at`, `->entry->collection`), `$collection`, `$values` (fields by handle, ready for templates), `$richText` (handles of rich text fields), `$code` (code fields, handle => language), `$preview`, `$draft`, `$fallback`, `$contentLocale`.
- Listing pages: `$collection`, `$entries` (a paginator: `{{ $entries->links() }}`), `$values`, `$richText`, `$code`, `$url`.
- Term pages: `$term`, `$taxonomy`, `$collection` (null on the shared one), `$entries` (paginator), `$values`, `$richText`, `$code`, `$fallback`, `$contentLocale`.
- Taxonomy index pages: `$taxonomy`, `$collection` (null on the shared one), `$terms` (each `->title($locale)`, `->url($locale)`, `->entries_count`), `$values`, `$richText`, `$code`, `$url`.
- Search: `$query`, `$results` (paginator).

## In the layout

`<x-sunrice-cms::seo />` in `<head>` (title, description, canonical, hreflang, share tags, structured data); `<x-sunrice-cms::code place="head|body-start|body-end" />` for the site code (it prints nothing where the site code is switched off: "site_code"); `{{ Cms::bodyClass() }}` on `<body>`; `<x-sunrice-cms::language-switcher />` for a language switcher (`Cms::localeUrls()` for one of your own); `Cms::page()` for what's shown. Share a layout with `@extends('cms.layout')` and `@section('content')`, and parts with `@include('cms.partials.card', ['entry' => $post])`.

## Data

- Entries: `Cms::entries('blog')->latest()->limit(3)->get()`, `->whereTerm('topics', 'news')`, `->where('featured', true)`, `->ordered()`, `->paginate(10)`, or `<x-sunrice-cms::entries collection="blog" :limit="3">` with `$component->entries`. Each result: `$post->title`, `$post->url()`, `$post->values()`.
- Terms: `<x-sunrice-cms::terms taxonomy="categories" hide-empty tree>` with `$component->terms`. An entry's own terms: `$entry->terms`, or one taxonomy's `$entry->termsOf('categories')` (each `$term->title()`, `$term->url()`).
- Menus: `@foreach (Cms::menu('main') as $item)` → `$item['label']`, `['url']`, `['new_tab']`, `['active']`, `['active_trail']`, `['children']`.
- Globals: `Cms::global('contact')['phone'] ?? ''`. Forms: `<x-sunrice-cms::form handle="contact" />`. Comments: `<x-sunrice-cms::comments :entry="$entry" />`. Search box: `<x-sunrice-cms::search>`.
- read_docs "cms/site", "cms/fields", "cms/menus", "cms/forms" have the details.

## Rules

- Escape with `{{ }}`. Only rich text fields are printed as is (`{!! $values['body'] !!}`): they're cleaned when saved. Never print anything else unescaped.
- Code fields are plain strings, not cleaned: show them as code with `<x-sunrice-cms::code-block :value="$values['snippet']" language="html" />` (escaped, in `<pre><code>`), never with `{!! !!}`.
- Data only through the CMS (`Cms::…`, components, `$values`): no database queries or models, no `@php` beyond small formatting.
- Every field can be empty: `@if`, `?->`, `?? ''`.
- Images: a media field's value has `->url()` (and sizes, `->url('medium')`) and `->altIn()` (its alt text in the page's language): always `alt="{{ $image->altIn() }}"`.
- Links: `->url()` of entries and terms, menus' `url`; never build them from slugs.
- After writing, open the page with cms_render_page and fix what it reports.
MD;

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.blueprints.view')) {
            return $this->denied('work on the site\'s templates (Manage blueprints)');
        }

        return $this->json([
            'guide' => self::GUIDE,
            'current' => Templates::map(),
            'templates' => Templates::files(),
            // Not GLOB_BRACE: some PHP builds (musl, Alpine) don't have it.
            'defaults' => array_values(array_filter(['entry.blade.php', 'listing.blade.php', 'term.blade.php', 'taxonomy-index.blade.php', 'search.blade.php'], fn (string $file): bool => is_file(dirname(__DIR__, 2).'/resources/views/'.$file))),
            // Settings → Site code switched off (sunrice-cms.site.custom_code): the code component prints nothing.
            'site_code' => CodeSettings::available(),
            'can_write' => $writable = Templates::writable($this->user()),
            // Why not, since cms_write_template isn't listed then.
            'write_note' => $writable ? null : 'cms_write_template is only for super admins, on sites that allow it (sunrice-cms.ai.templates, SUNRICE_AI_TEMPLATES=true): templates run code on the server. Suggest the change to a developer instead.',
        ]);
    }
}
