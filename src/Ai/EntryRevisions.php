<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Entries\RestoreRevision;
use Sunrice\Cms\Models\Revision;

#[Description('An entry\'s published versions in a language, newest first (id, title, when, by whom). With "restore": a revision id, that version becomes the draft again (publish it to put it live). Ask the user before restoring.')]
final class EntryRevisions extends CmsTool
{
    protected string $name = 'cms_entry_revisions';

    public function handle(Request $request): Response
    {
        $entry = $this->findEntry($request);
        if ($entry instanceof Response) {
            return $entry;
        }
        $translation = $this->findTranslation($request, $entry);
        if ($translation instanceof Response) {
            return $translation;
        }
        $restore = $request->get('restore');
        if ($restore !== null) {
            if (! $this->may('update', $entry->collection, $entry, $translation->locale)) {
                return $this->denied('edit this entry');
            }
            $revision = $translation->revisions()->whereKey(is_numeric($restore) ? (int) $restore : 0)->first();
            if (! $revision instanceof Revision) {
                return Response::error('No such revision of this entry.');
            }
            app(RestoreRevision::class)->handle($revision);

            return $this->json(['restored' => true, ...self::describe($translation->fresh() ?? $translation)]);
        }
        if (! $this->may('view', $entry->collection, $entry)) {
            return $this->denied('see this entry');
        }

        return $this->json($translation->revisions()->limit(30)->get()->map(fn (Revision $revision): array => [
            'id' => $revision->id, 'title' => $revision->title, 'published' => $revision->created_at?->toIso8601String(), 'by' => $revision->user_id,
        ])->all());
    }

    public function schema(JsonSchema $schema): array
    {
        return ['id' => $schema->integer()->required(), 'locale' => $schema->string(), 'restore' => $schema->integer()];
    }
}
