<?php

declare(strict_types=1);

namespace Sunrice\Cms\Templates;

use Illuminate\Support\Facades\View;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\Fieldsets;
use Sunrice\Cms\Fields\Schema;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Support\SiteRecords;

/**
 * Writes a page's Blade template from its blueprints (sunrice:make-templates):
 * the page's own header, its fields, each printed for its type
 * (FieldSnippet), and for listing and term pages their entries as cards
 * with pagination, for index pages their terms (as a tree in a
 * hierarchical taxonomy). Every page extends the site's layout
 * (`cms.layout`, the starter templates' one) and fills its `content`.
 *
 * plan() adds the shared files the pages need: each kind of flexible
 * block's view (cms/blocks/{fieldset}), the term tree partial, and the
 * starter layout (with its menu partial) when the site has none yet.
 *
 * @internal
 */
final class TemplateWriter
{
    private const STUBS = __DIR__.'/../../stubs/templates/';

    /** Field handles read as a card's excerpt, the first that's text, in this order; else the first textarea. */
    private const EXCERPTS = ['excerpt', 'summary', 'intro', 'description', 'lead'];

    public function __construct(private readonly FieldSnippet $snippet, private readonly Fieldsets $fieldsets) {}

    /**
     * The files to write for these pages: theirs, then the shared ones
     * they need (`shared`: never overwritten, other pages use them too).
     *
     * @param  list<TemplatePage>  $pages
     * @return list<array{path: string, name: string, source: string, shared: bool}>
     */
    public function plan(array $pages): array
    {
        $files = [];
        $shared = [];
        $blocks = [];
        foreach ($pages as $page) {
            $files[] = ['path' => $page->path, 'name' => $this->title($page).': '.$page->name(), 'source' => $this->source($page), 'shared' => false];
            array_push($blocks, ...$this->snippet->takeBlocks());
            if ($page->kind === TemplatePage::INDEX && $page->taxonomy?->hierarchical) {
                $shared['partials/term-tree.blade.php'] = ['name' => 'Terms as a tree (index pages)', 'source' => $this->termTree()];
            }
        }
        // Each kind of block's view, and those of the blocks inside its blocks.
        $done = [];
        while (($handle = array_shift($blocks)) !== null) {
            if (isset($done[$handle]) || preg_match('/^[a-z][a-z0-9_]*$/', $handle) !== 1) {
                continue;
            }
            $done[$handle] = true;
            $fields = $this->fieldsets->fields($handle);
            if ($fields === null) {
                continue;
            }
            $shared["blocks/{$handle}.blade.php"] = ['name' => 'Block: '.FieldSnippet::plain($this->fieldsets->title($handle)), 'source' => $this->block($handle, Schema::make($fields)->fields())];
            array_push($blocks, ...$this->snippet->takeBlocks());
        }
        if ($pages !== [] && ! View::exists('cms.layout')) {
            // The pages extend it: the starter templates' one, and the menu partial it includes.
            $shared['layout.blade.php'] = ['name' => 'Layout (the starter templates\' one)', 'source' => (string) file_get_contents(self::STUBS.'layout.blade.php')];
            $shared['partials/menu.blade.php'] = ['name' => 'Menu partial (the layout\'s)', 'source' => (string) file_get_contents(self::STUBS.'partials/menu.blade.php')];
        }
        foreach ($shared as $path => $file) {
            $files[] = ['path' => $path, 'name' => $file['name'], 'source' => $file['source'], 'shared' => true];
        }

        return $files;
    }

    /** A page's template. */
    public function source(TemplatePage $page): string
    {
        return match ($page->kind) {
            TemplatePage::ENTRY => $this->entry($page),
            TemplatePage::LISTING => $this->listing($page),
            TemplatePage::TERM => $this->term($page),
            default => $this->index($page),
        };
    }

    private function entry(TemplatePage $page): string
    {
        $collection = $page->collection ?? throw new \LogicException('An entry page belongs to a collection.');
        $blueprints = $this->blueprints($collection);
        $header = ['<h1>{{ $title }}</h1>'];
        if ($collection->dated) {
            $header[] = "@if (\$entry->published_at)\n    <p class=\"muted\"><time datetime=\"{{ \$entry->published_at->toAtomString() }}\">{{ \$entry->published_at->translatedFormat('j F Y') }}</time></p>\n@endif";
        }
        foreach ($collection->taxonomies->sortBy('title') as $taxonomy) {
            $t = $taxonomy->handle;
            $header[] = "@php(\$entryTerms = \$entry->termsOf('{$t}'))\n@if (\$entryTerms->isNotEmpty())\n"
                ."    <p class=\"terms terms-{$t}\"><span class=\"field-label\">{{ __(".FieldSnippet::export(FieldSnippet::plain($taxonomy->title)).") }}:</span>\n"
                ."        @foreach (\$entryTerms as \$term)\n"
                ."            @if (\$term->url())<a href=\"{{ \$term->url() }}\">{{ \$term->title() }}</a>@else{{ \$term->title() }}@endif @unless (\$loop->last), @endunless\n"
                ."        @endforeach\n    </p>\n@endif";
        }

        if (count($blueprints) > 1) {
            // Several blueprints: each one's fields, chosen by the entry's (Entry::blueprintHandle()).
            $cases = [];
            foreach ($blueprints as $i => [$handle, $title, $schema]) {
                $fields = FieldSnippet::indent($this->snippet->fields($schema->fields(), '$values'), 4);
                $cases[] = ($i === 0 ? "@default\n    {{-- The collection's own blueprint: \"".FieldSnippet::comment($title)."\" ({$handle}). --}}" : "@case('{$handle}')\n    {{-- \"".FieldSnippet::comment($title).'". --}}')
                    ."\n".($fields === '' ? '    {{-- No fields. --}}' : $fields)."\n    @break";
            }
            // @default last: Blade's @switch takes cases in order.
            $cases[] = array_shift($cases);
            $body = "{{-- Its entries use one of several blueprints: the fields of the entry's. --}}\n@switch(\$entry->entry->blueprintHandle())\n".FieldSnippet::indent(implode("\n", $cases), 4)."\n@endswitch";
        } else {
            $body = $blueprints === [] ? '' : $this->snippet->fields($blueprints[0][2]->fields(), '$values');
        }

        return $this->head($page, $blueprints, '$page, $entry (the EntryTranslation), $collection, $title, $values (its fields), $richText, $code, $locale, $preview, $draft, $fallback and $contentLocale.')
            ."@extends('cms.layout')\n\n@section('content')\n"
            ."    <article class=\"entry\"{{ cms_page()?->langAttribute() }}>\n"
            ."        <header class=\"entry-header\">\n".FieldSnippet::indent(implode("\n", $header), 12)."\n        </header>\n"
            .($body === '' ? '' : "\n".FieldSnippet::indent($body, 8)."\n")
            ."    </article>\n\n"
            ."    @unless (\$preview)\n        <x-sunrice-cms::comments :entry=\"\$entry\" />\n    @endunless\n"
            ."@endsection\n";
    }

    private function listing(TemplatePage $page): string
    {
        $collection = $page->collection ?? throw new \LogicException('A listing page belongs to a collection.');
        $blueprint = SiteRecords::blueprint($collection->listing_blueprint);
        $own = $blueprint === null ? [] : [[$blueprint->handle, $blueprint->title, $collection->listingSchema()]];
        $fields = $own === [] ? '' : $this->snippet->fields($own[0][2]->fields(), '$values');

        return $this->head($page, $own, '$page, $collection, $title, $entries (a paginator of EntryTranslations), $values and $richText (the listing page\'s own fields), $code, $locale and $url.', $this->blueprints($collection))
            ."@extends('cms.layout')\n\n@section('content')\n"
            ."    <header class=\"page-header\">\n        <h1>{{ \$title }}</h1>\n"
            .($fields === '' ? '' : FieldSnippet::indent($fields, 8)."\n")
            ."    </header>\n\n"
            .FieldSnippet::indent($this->entries(array_map(fn (array $b): Schema => $b[2], $this->blueprints($collection))), 4)."\n"
            ."@endsection\n";
    }

    private function term(TemplatePage $page): string
    {
        $taxonomy = $page->taxonomy ?? throw new \LogicException('A term page belongs to a taxonomy.');
        $blueprint = SiteRecords::blueprint($taxonomy->blueprint);
        $own = [[$blueprint->handle ?? '', $blueprint->title ?? 'Description (no blueprint)', $taxonomy->schema()]];
        $fields = $this->snippet->fields($taxonomy->schema()->fields(), '$values');
        // The entries listed: the collection's on its term pages, else those of every collection it groups.
        $collections = $page->collection !== null ? [$page->collection] : $taxonomy->collections()->orderBy('title')->get()->all();
        $schemas = [];
        foreach ($collections as $collection) {
            foreach ($this->blueprints($collection) as $b) {
                $schemas[] = $b[2];
            }
        }

        return $this->head($page, $blueprint === null ? [] : $own, '$page, $term (the TermTranslation), $taxonomy, $collection (null on the shared page), $title, $entries (a paginator of the live entries with the term), $values and $richText (the term\'s fields), $code, $locale, $fallback and $contentLocale.')
            ."@extends('cms.layout')\n\n@section('content')\n"
            ."    <header class=\"page-header\">\n"
            ."        <p class=\"eyebrow\">{{ \$taxonomy->titleIn(\$locale) }}</p>\n"
            ."        <div{{ cms_page()?->langAttribute() }}>\n            <h1>{{ \$title }}</h1>\n"
            .($fields === '' ? '' : FieldSnippet::indent($fields, 12)."\n")
            ."        </div>\n    </header>\n\n"
            .FieldSnippet::indent($this->entries($schemas), 4)."\n"
            ."@endsection\n";
    }

    private function index(TemplatePage $page): string
    {
        $taxonomy = $page->taxonomy ?? throw new \LogicException('An index page belongs to a taxonomy.');
        $blueprint = SiteRecords::blueprint($taxonomy->index_blueprint);
        $own = $blueprint === null ? [] : [[$blueprint->handle, $blueprint->title, $taxonomy->indexSchema()]];
        $fields = $own === [] ? '' : $this->snippet->fields($own[0][2]->fields(), '$values');
        $terms = $taxonomy->hierarchical
            ? "{{-- A hierarchical taxonomy: each term with the terms under it (cms/partials/term-tree.blade.php). --}}\n@include('cms.partials.term-tree', ['parent' => 0])"
            : "<ul class=\"terms\">\n    @foreach (\$terms as \$term)\n        @php(\$termUrl = \$term->url(\$locale))\n        <li>\n"
                ."            @if (\$termUrl !== null)<a href=\"{{ \$termUrl }}\">{{ \$term->title(\$locale) }}</a>@else{{ \$term->title(\$locale) }}@endif\n"
                ."            <span class=\"muted\">({{ \$term->entries_count }})</span>\n        </li>\n    @endforeach\n</ul>";

        return $this->head($page, $own, '$page, $taxonomy, $collection (null on the shared page), $title, $terms (with entries_count), $values and $richText (the index page\'s own fields), $code, $locale and $url.')
            ."@extends('cms.layout')\n\n@section('content')\n"
            ."    <header class=\"page-header\">\n"
            ."        @if (\$collection !== null)\n            <p class=\"eyebrow\">{{ \$collection->titleIn(\$locale) }}</p>\n        @endif\n"
            ."        <h1>{{ \$title }}</h1>\n"
            .($fields === '' ? '' : FieldSnippet::indent($fields, 8)."\n")
            ."    </header>\n\n"
            ."    @if (\$terms->isEmpty())\n        <p class=\"muted\">{{ __('Nothing here yet.') }}</p>\n    @else\n"
            .FieldSnippet::indent($terms, 8)."\n    @endif\n"
            ."@endsection\n";
    }

    /**
     * A list's entries as cards (title, link, date; an image and an
     * excerpt when their blueprints have them), then its pages' links.
     *
     * @param  list<Schema>  $schemas  the blueprints the entries may have
     */
    private function entries(array $schemas): string
    {
        $image = null;
        $excerpt = null;
        $textareas = [];
        foreach ($schemas as $schema) {
            foreach ($schema->fields() as $field) {
                $type = $this->snippet->typeOf($field);
                $image ??= $type === 'media' ? $field->handle : null;
                if ($type === 'textarea') {
                    $textareas[] = $field->handle;
                }
                if (in_array($type, ['text', 'textarea'], true) && in_array($field->handle, self::EXCERPTS, true)
                    && ($excerpt === null || array_search($field->handle, self::EXCERPTS, true) < array_search($excerpt, self::EXCERPTS, true))) {
                    $excerpt = $field->handle;
                }
            }
        }
        $excerpt ??= $textareas[0] ?? null;

        $card = ['@php($itemUrl = $item->url())'];
        if ($image !== null || $excerpt !== null) {
            $card[] = '@php($fields = $item->values())';
        }
        $card[] = '<li class="card">';
        if ($image !== null) {
            // Beside its linked title, the picture is decorative (alt="").
            $card[] = "    @php(\$image = \$fields['{$image}'] ?? null)\n    @php(\$image = \$image instanceof \\Illuminate\\Support\\Collection ? \$image->first() : \$image)\n"
                ."    @if (\$image instanceof \\Sunrice\\Admin\\Media\\Media && \$image->isImage())\n"
                ."        <img src=\"{{ \$image->url('medium') }}\"@if (\$image->width && \$image->height) width=\"{{ \$image->width }}\" height=\"{{ \$image->height }}\"@endif alt=\"\" loading=\"lazy\">\n    @endif";
        }
        $card[] = '    <h2 class="card-title">@if ($itemUrl)<a href="{{ $itemUrl }}">{{ $item->title }}</a>@else{{ $item->title }}@endif</h2>';
        $card[] = "    @if (\$item->entry->collection->dated && \$item->published_at)\n        <p class=\"muted\"><time datetime=\"{{ \$item->published_at->toAtomString() }}\">{{ \$item->published_at->translatedFormat('j F Y') }}</time></p>\n    @endif";
        if ($excerpt !== null) {
            $card[] = "    @if (is_string(\$fields['{$excerpt}'] ?? null) && \$fields['{$excerpt}'] !== '')\n        <p>{{ \$fields['{$excerpt}'] }}</p>\n    @endif";
        }
        $card[] = '</li>';

        return "@if (\$entries->isEmpty())\n    <p class=\"muted\">{{ __('Nothing here yet.') }}</p>\n@else\n"
            ."    <ul class=\"cards\">\n        @foreach (\$entries as \$item)\n".FieldSnippet::indent(implode("\n", $card), 12)."\n        @endforeach\n    </ul>\n\n"
            ."    @if (\$entries->hasPages())\n"
            ."        <nav class=\"pagination\" aria-label=\"{{ __('Pages') }}\">\n"
            ."            @if (\$entries->previousPageUrl())\n                <a href=\"{{ \$entries->previousPageUrl() }}\" rel=\"prev\">{{ __('Previous') }}</a>\n            @endif\n"
            ."            <span>{{ __('Page :page of :pages', ['page' => \$entries->currentPage(), 'pages' => \$entries->lastPage()]) }}</span>\n"
            ."            @if (\$entries->nextPageUrl())\n                <a href=\"{{ \$entries->nextPageUrl() }}\" rel=\"next\">{{ __('Next') }}</a>\n            @endif\n"
            ."        </nav>\n    @endif\n@endif";
    }

    /**
     * A kind of block's view: it gets $block (->type, ->key, $block['handle']).
     *
     * @param  list<Field>  $fields
     */
    private function block(string $handle, array $fields): string
    {
        $body = $this->snippet->fields($fields, '$block');

        return "{{--\n    A \"".FieldSnippet::comment($this->fieldsets->title($handle))."\" block (the fieldset {$handle}), in a flexible field: written by\n"
            ."    php artisan sunrice:make-templates from the fieldset's fields. Edit it freely: the command never changes it.\n"
            ."    Gets \$block: \$block->type, \$block->key, its fields by handle (\$block['heading']).\n--}}\n"
            .($body === '' ? "{{-- No fields. --}}\n" : $body."\n");
    }

    private function termTree(): string
    {
        return "{{--\n    A hierarchical taxonomy's terms, each with those under it (index pages: written by php artisan\n"
            ."    sunrice:make-templates; edit it freely, the command never changes it). A term whose parent isn't listed (a\n"
            ."    collection's index page lists only the terms its entries have) starts a branch of its own.\n"
            ."    @include('cms.partials.term-tree', ['parent' => 0]) with \$terms and \$locale.\n--}}\n"
            ."@php(\$termIds ??= \$terms->pluck('id', 'id'))\n"
            ."@php(\$children ??= \$terms->groupBy(fn (\$term) => isset(\$termIds[\$term->parent_id]) ? \$term->parent_id : 0))\n"
            ."<ul class=\"terms\">\n"
            ."    @foreach (\$children[\$parent] ?? [] as \$term)\n"
            ."        @php(\$termUrl = \$term->url(\$locale))\n"
            ."        <li>\n"
            ."            @if (\$termUrl !== null)<a href=\"{{ \$termUrl }}\">{{ \$term->title(\$locale) }}</a>@else{{ \$term->title(\$locale) }}@endif\n"
            ."            <span class=\"muted\">({{ \$term->entries_count }})</span>\n"
            ."            @if (isset(\$children[\$term->id]))\n"
            ."                @include('cms.partials.term-tree', ['parent' => \$term->id, 'termIds' => \$termIds, 'children' => \$children])\n"
            ."            @endif\n"
            ."        </li>\n"
            ."    @endforeach\n"
            ."</ul>\n";
    }

    /**
     * The header comment: the page, its blueprints, what it gets.
     *
     * @param  list<array{string, string, Schema}>  $blueprints
     * @param  list<array{string, string, Schema}>  $entries  the blueprints of the entries it lists
     */
    private function head(TemplatePage $page, array $blueprints, string $gets, array $entries = []): string
    {
        $from = $blueprints === [] ? 'no blueprint' : (count($blueprints) === 1 ? 'the blueprint ' : 'the blueprints ')
            .implode(', ', array_map(fn (array $b): string => '"'.FieldSnippet::comment($b[1]).'" ('.$b[0].')', $blueprints));
        $listed = $entries === [] ? '' : '; its cards from '.implode(', ', array_map(fn (array $b): string => '"'.FieldSnippet::comment($b[1]).'"', $entries));

        return "{{--\n"
            .'    '.FieldSnippet::comment($this->title($page).': '.$page->label())."\n"
            ."    Written by php artisan sunrice:make-templates from {$from}{$listed}.\n"
            ."    Edit it freely: the command never overwrites it (unless --force). Fields print only when filled in.\n"
            .'    Gets '.$gets."\n"
            ."--}}\n";
    }

    private function title(TemplatePage $page): string
    {
        return FieldSnippet::plain($page->collection !== null ? $page->collection->title : ($page->taxonomy instanceof Taxonomy ? $page->taxonomy->title : ''));
    }

    /**
     * A collection's entries' blueprints: its own first, then the others
     * it allows; each [handle, title, fields].
     *
     * @return list<array{string, string, Schema}>
     */
    private function blueprints(Collection $collection): array
    {
        $blueprints = [];
        foreach ($collection->allowedBlueprints() as $handle) {
            $blueprint = SiteRecords::blueprint($handle);
            if ($blueprint !== null) {
                $blueprints[] = [$handle, $blueprint->title, $collection->schemaFor($handle)];
            }
        }

        return $blueprints;
    }
}
