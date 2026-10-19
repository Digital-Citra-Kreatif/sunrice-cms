<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Entries\RestoreEntry;
use Sunrice\Cms\Actions\Entries\TrashEntry as Trash;

#[Description('Move an entry, in every language, to the trash: it comes off the site. "restore": true takes it out of the trash. Ask the user first.')]
final class TrashEntry extends CmsTool
{
    protected string $name = 'cms_trash_entry';

    public function handle(Request $request): Response
    {
        if (! $this->may('delete') && ! $this->can('cms.entries.delete-own')) {
            return $this->denied('trash entries');
        }
        $entry = $this->findEntry($request, withTrashed: true);
        if ($entry instanceof Response) {
            return $entry;
        }
        if (! $this->may('delete', $entry->collection, $entry)) {
            return $this->denied('trash this entry');
        }
        $restore = $request->get('restore') === true;
        if ($restore !== $entry->trashed()) {
            return Response::error($restore ? 'The entry isn\'t in the trash.' : 'The entry is in the trash already.');
        }
        $restore ? app(RestoreEntry::class)->handle($entry) : app(Trash::class)->handle($entry);

        return $this->json([$restore ? 'restored' : 'trashed' => true, 'id' => $entry->id]);
    }

    public function schema(JsonSchema $schema): array
    {
        return ['id' => $schema->integer()->required(), 'restore' => $schema->boolean()];
    }
}
