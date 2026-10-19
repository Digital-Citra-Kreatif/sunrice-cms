<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Database\Eloquent\Builder;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Locales;

#[IsReadOnly]
#[Description('Without "collection": the collections (handle, title, URL pattern, number of entries). With one: its entries in the main language (id, title, slug, status, date, URL, status in each language), searched by title, newest or alphabetical first, 25 a page. "trashed": the trash instead.')]
final class ListEntries extends CmsTool
{
    protected string $name = 'cms_list_entries';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.entries.view')) {
            return $this->denied('view entries');
        }
        $handle = $request->get('collection');
        if (! is_string($handle) || $handle === '') {
            return $this->json(['collections' => Collection::query()->withCount('entries')->orderBy('title')->get()->map(fn (Collection $c): array => [
                'handle' => $c->handle, 'title' => $c->title, 'route' => $c->route, 'dated' => $c->dated, 'blueprint' => $c->blueprint, 'entries' => $c->entries_count,
            ])->all(), 'languages' => Locales::all()]);
        }
        $collection = Collection::query()->where('handle', $handle)->first();
        if ($collection === null) {
            return Response::error('No such collection. Leave out "collection" to list them.');
        }
        $search = $request->get('search');
        $search = is_string($search) ? trim($search) : '';
        $page = $request->get('page');
        $trashed = $request->get('trashed') === true;

        $entries = EntryTranslation::query()
            ->with('entry.translations', 'entry.collection')
            ->where('collection_id', $collection->id)
            ->where('locale', Locales::default())
            ->whereHas('entry', fn (Builder $query) => $trashed ? $query->onlyTrashed() : $query->withoutTrashed())
            ->when($search !== '', fn (Builder $query) => $query->whereLike('draft_title', '%'.addcslashes($search, '%_\\').'%'))
            ->orderBy($collection->dated ? 'published_at' : 'draft_title', $collection->dated ? 'desc' : 'asc')
            ->orderByDesc('id')
            ->paginate(25, ['*'], 'page', is_int($page) ? max(1, $page) : 1);

        return $this->json([
            'collection' => $collection->handle,
            'entries' => array_map(self::describe(...), $entries->items()),
            'total' => $entries->total(),
            'page' => $entries->currentPage(),
            'last_page' => $entries->lastPage(),
        ]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'collection' => $schema->string()->description('A collection handle.'),
            'search' => $schema->string()->description('Part of a title.'),
            'trashed' => $schema->boolean(),
            'page' => $schema->integer(),
        ];
    }
}
