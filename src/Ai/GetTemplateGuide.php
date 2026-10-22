<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Support\Templates;

#[IsReadOnly]
#[Description('Read this before creating or changing the site\'s templates: how a page picks its Blade view, what each kind of page gets, how to read fields, query entries, show menus, globals, forms and SEO, the rules to keep; which view every collection and taxonomy uses now, and the template files there are. Whether you may write them: "can_write".')]
final class GetTemplateGuide extends CmsTool
{
    protected string $name = 'cms_get_template_guide';

    public const GUIDE = <<<'MD'
# Templates

The site's templates are Blade views in `resources/views/cms/` (view names `cms.…`: `pages/landing.blade.php` is `cms.pages.landing`). The CMS's plain fallbacks are `sunrice-cms::entry`, `::listing`, `::term` and `::search`: read them with cms_read_template (source "default") for complete, working examples.

## Which view a page uses (the first that exists)

- Entry: the entry's own template (its Page settings) → the collection's `template` → `cms.{collection}` → `cms.entry` → `sunrice-cms::entry`.
- Listing page: `cms.{collection}-listing` → `cms.listing` → `sunrice-cms::listing`.
- Term page: the term's own template → the taxonomy's `template` → `cms.taxonomy-{taxonomy}` → `cms.term` → `sunrice-cms::term`.
- Taxonomy index page (its terms): in a collection `cms.{collection}.{taxonomy}-index` → `cms.taxonomy-{taxonomy}-index` → `cms.taxonomy-index` → `sunrice-cms::taxonomy-index`.
- Search page: `cms.search` → `sunrice-cms::search`. The homepage (Settings → Site) is an entry.

So: one design for every entry of a collection: `{collection}.blade.php`; one page of its own: `pages/landing.blade.php`, then set the entry's template to `cms.pages.landing`. Own templates must start with `cms.`.

## What views get

- Entries: `$entry` (the EntryTranslation: `->title`, `->url()`, `->published_at`, `->entry->collection`), `$title`, `$values` (fields by handle, ready for templates), `$richText` (handles of rich text fields), `$collection`, `$locale`, `$preview`.
- Listing pages: `$collection`, `$entries` (a paginator: `{{ $entries->links() }}`), `$values`, `$richText`, `$title`, `$locale`, `$url`.
- Term pages: `$term`, `$taxonomy`, `$entries` (paginator), `$values`, `$richText`, `$title`, `$locale`.
- Taxonomy index pages: `$taxonomy`, `$collection` (null on the shared one), `$terms` (each `->title($locale)`, `->url($locale)`, `->entries_count`), `$values`, `$richText`, `$title`, `$locale`, `$url`.
- Search: `$query`, `$results` (paginator), `$title`, `$locale`.

## In the layout

`<x-sunrice-cms::seo />` in `<head>` (title, description, canonical, hreflang, share tags, structured data); `<x-sunrice-cms::code place="head|body-start|body-end" />` for the site code; `{{ Cms::bodyClass() }}` on `<body>`; `Cms::localeUrls()` for a language switcher; `Cms::page()` for what's shown. Share a layout with `@extends('cms.layouts.site')` and `@section('content')`, and parts with `@include('cms.partials.card', ['entry' => $post])`.

## Data

- Entries: `Cms::entries('blog')->latest()->limit(3)->get()`, `->whereTerm('topics', 'news')`, `->where('featured', true)`, `->ordered()`, `->paginate(10)`, or `<x-sunrice-cms::entries collection="blog" :limit="3">` with `$component->entries`. Each result: `$post->title`, `$post->url()`, `$post->values()`.
- Terms: `<x-sunrice-cms::terms taxonomy="categories" hide-empty tree>` with `$component->terms`.
- Menus: `@foreach (Cms::menu('main') as $item)` → `$item['label']`, `['url']`, `['new_tab']`, `['active']`, `['active_trail']`, `['children']`.
- Globals: `Cms::global('contact')['phone'] ?? ''`. Forms: `<x-sunrice-cms::form handle="contact" />`. Comments: `<x-sunrice-cms::comments :entry="$entry" />`. Search box: `<x-sunrice-cms::search>`.
- read_docs "cms/site", "cms/fields", "cms/menus", "cms/forms" have the details.

## Rules

- Escape with `{{ }}`. Only rich text fields are printed as is (`{!! $values['body'] !!}`): they're cleaned when saved. Never print anything else unescaped.
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
            'can_write' => $writable = Templates::writable($this->user()),
            // Why not, since cms_write_template isn't listed then.
            'write_note' => $writable ? null : 'cms_write_template is only for super admins, on sites that allow it (sunrice-cms.ai.templates, SUNRICE_AI_TEMPLATES=true): templates run code on the server. Suggest the change to a developer instead.',
        ]);
    }
}
