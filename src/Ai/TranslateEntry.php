<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Validation\ValidationException;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Entries\CreateTranslation;

#[Description('Add a language to an entry: a draft copied from the main language. Then translate it with cms_save_entry (with "locale") and publish it.')]
final class TranslateEntry extends CmsTool
{
    protected string $name = 'cms_translate_entry';

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.entries.create')) {
            return $this->denied('add translations');
        }
        $entry = $this->findEntry($request);
        if ($entry instanceof Response) {
            return $entry;
        }
        $locale = $request->get('locale');
        try {
            $translation = app(CreateTranslation::class)->handle($entry, is_string($locale) ? $locale : '');
        } catch (ValidationException $e) {
            return self::invalid($e);
        }
        $entry->load('translations');

        return $this->json(['added' => true, ...self::describe($translation)]);
    }

    public function schema(JsonSchema $schema): array
    {
        return ['id' => $schema->integer()->required(), 'locale' => $schema->string()->required()];
    }
}
