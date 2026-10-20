<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Admin\Panel;
use Sunrice\Cms\Actions\Entries\RestoreRevision;
use Sunrice\Cms\Models\Revision;

#[Description('An entry\'s published versions in one language (one is kept each time it\'s published). "list" (the default): newest first, with when, who and the title. "show": one revision\'s title, slug and fields. "restore": copy a revision into the draft (replacing the draft); the site changes once it\'s published again (cms_publish_entry).')]
final class EntryRevisions extends CmsTool
{
    protected string $name = 'cms_entry_revisions';

    public function handle(Request $request): Response
    {
        /** @var array{action?: string|null, id?: int|null, locale?: string|null, revision_id?: int|null} $args */
        $args = $request->validate([
            'action' => ['nullable', 'string', 'in:list,show,restore'],
            'id' => ['nullable', 'required_without:revision_id', 'integer'],
            'locale' => ['nullable', 'string', 'max:20'],
            'revision_id' => ['nullable', 'required_if:action,show,restore', 'integer'],
        ]);
        $action = $args['action'] ?? 'list';
        if (! $this->may('view')) {
            return $this->denied('view entries');
        }

        if ($action === 'list') {
            $entry = $this->findEntry($request, withTrashed: true);
            if ($entry instanceof Response) {
                return $entry;
            }
            if (! $this->may('view', $entry->collection)) {
                return $this->denied('view entries of '.$entry->collection->title);
            }
            $translation = $this->findTranslation($request, $entry);
            if ($translation instanceof Response) {
                return $translation;
            }
            $revisions = $translation->revisions()->limit(50)->get();
            $names = self::names(array_values($revisions->pluck('user_id')->filter()->unique()->all()));

            return $this->json(['id' => $entry->id, 'locale' => $translation->locale, 'revisions' => $revisions->map(fn (Revision $r): array => [
                'revision_id' => $r->id,
                'published_at' => $r->created_at?->toIso8601String(),
                'by' => $r->user_id === null ? null : ($names[$r->user_id] ?? null),
                'title' => $r->title,
            ])->all()]);
        }

        $revision = Revision::query()->with('translation.entry.collection', 'translation.entry.translations')->find($args['revision_id'] ?? 0);
        $translation = $revision?->translation;
        $entry = $translation?->entry;
        if ($revision === null || $translation === null || $entry === null || $entry->collection->trashed() || (isset($args['id']) && $args['id'] !== $entry->id)) {
            return Response::error('No such revision. "list" lists an entry\'s revisions.');
        }
        if ($action === 'show') {
            if (! $this->may('view', $entry->collection)) {
                return $this->denied('view entries of '.$entry->collection->title);
            }

            return $this->json(['revision_id' => $revision->id, 'id' => $entry->id, 'locale' => $translation->locale, 'published_at' => $revision->created_at?->toIso8601String(),
                'title' => $revision->title, 'slug' => $revision->slug, 'data' => $revision->data]);
        }
        if (! $this->may('update', $entry->collection, $entry, $translation->locale)) {
            return $this->denied('edit this entry'.($translation->isMain() ? '' : ' in this language'));
        }
        app(RestoreRevision::class)->handle($revision);
        $translation->refresh();

        return $this->json(['restored' => true, ...self::describe($translation)]);
    }

    /**
     * Users' names by id, in one query.
     *
     * @param  list<mixed>  $ids
     * @return array<int|string, string>
     */
    private static function names(array $ids): array
    {
        if ($ids === []) {
            return [];
        }
        $names = [];
        foreach (app(Panel::class)->getUserModel()::query()->whereKey($ids)->get() as $user) {
            $key = $user->getKey();
            $name = $user->getAttribute('name');
            if (is_scalar($key) && is_string($name)) {
                $names[is_int($key) ? $key : (string) $key] = $name;
            }
        }

        return $names;
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'action' => $schema->string()->enum(['list', 'show', 'restore']),
            'id' => $schema->integer()->description('The entry (list).'),
            'locale' => $schema->string()->description('list: the language; the main one when left out.'),
            'revision_id' => $schema->integer()->description('show, restore.'),
        ];
    }
}
