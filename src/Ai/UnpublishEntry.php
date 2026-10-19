<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Entries\UnpublishEntry as Unpublish;

#[Description('Take an entry off the site in a language (the main one unless "locale" is given); its draft is kept. Ask the user first.')]
final class UnpublishEntry extends CmsTool
{
    protected string $name = 'cms_unpublish_entry';

    public function handle(Request $request): Response
    {
        if (! $this->may('publish')) {
            return $this->denied('unpublish entries');
        }
        $entry = $this->findEntry($request);
        if ($entry instanceof Response) {
            return $entry;
        }
        $translation = $this->findTranslation($request, $entry);
        if ($translation instanceof Response) {
            return $translation;
        }
        if (! $this->may('publish', $entry->collection)) {
            return $this->denied('unpublish entries of '.$entry->collection->title);
        }

        return $this->json(['unpublished' => true, ...self::describe(app(Unpublish::class)->handle($translation))]);
    }

    public function schema(JsonSchema $schema): array
    {
        return ['id' => $schema->integer()->required(), 'locale' => $schema->string()];
    }
}
