<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Validation\ValidationException;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Collections\SaveListing as SaveListingAction;

#[Description('Change a collection\'s listing page fields in a language (the main one unless "locale" is given): "data" holds only the fields to change. It is live at once: ask the user first.')]
final class SaveListing extends CmsTool
{
    protected string $name = 'cms_save_listing';

    public function handle(Request $request): Response
    {
        $collection = GetListing::listing($request);
        if ($collection instanceof Response) {
            return $collection;
        }
        if (! $this->may('update', $collection)) {
            return $this->denied('edit this collection');
        }
        $data = $request->get('data');
        if (! is_array($data)) {
            return Response::error('Send "data" as an object of field handle => value.');
        }
        $locale = $request->get('locale');
        try {
            $listing = app(SaveListingAction::class)->handle($collection, $data, is_string($locale) ? $locale : null);
        } catch (ValidationException $e) {
            return self::invalid($e);
        }

        return $this->json(['saved' => true, 'collection' => $collection->handle, 'locale' => $listing->locale]);
    }

    public function schema(JsonSchema $schema): array
    {
        return ['collection' => $schema->string()->required(), 'locale' => $schema->string(), 'data' => $schema->object()->required()];
    }
}
