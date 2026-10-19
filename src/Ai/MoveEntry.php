<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Validation\ValidationException;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Entries\MoveEntry as MoveEntryAction;

#[Description('Move an entry of a manually ordered collection one place "up" or "down" among its siblings.')]
final class MoveEntry extends CmsTool
{
    protected string $name = 'cms_move_entry';

    public function handle(Request $request): Response
    {
        $entry = $this->findEntry($request);
        if ($entry instanceof Response) {
            return $entry;
        }
        if (! $this->may('update', $entry->collection, $entry)) {
            return $this->denied('edit this entry');
        }
        $direction = $request->get('direction');
        if ($direction !== 'up' && $direction !== 'down') {
            return Response::error('Give "direction": up or down.');
        }
        try {
            app(MoveEntryAction::class)->handle($entry, $direction);
        } catch (ValidationException $e) {
            return self::invalid($e);
        }

        return $this->json(['moved' => $direction]);
    }

    public function schema(JsonSchema $schema): array
    {
        return ['id' => $schema->integer()->required(), 'direction' => $schema->string()->enum(['up', 'down'])->required()];
    }
}
