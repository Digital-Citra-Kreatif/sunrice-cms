<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Collections\SaveListing as Save;
use Sunrice\Cms\Support\Locales;

#[Description('Change a collection\'s listing page fields in a language (the main one when left out): "data" holds field values by handle; fields left out keep their values. In other languages only translated fields are saved. Live as soon as it\'s saved: ask first. Send the "version" cms_get_listing gave, so a save over someone else\'s newer one is refused.')]
final class SaveListing extends CmsTool
{
    protected string $name = 'cms_save_listing';

    public function handle(Request $request): Response
    {
        /** @var array{collection: string, locale?: string|null, data: array<mixed>, version?: int|null} $args */
        $args = $request->validate([
            'collection' => ['required', 'string'],
            'locale' => ['nullable', 'string', 'max:20'],
            'data' => ['present', 'array'],
            'version' => ['nullable', 'integer'],
        ]);
        $collection = GetListing::listingOf($request);
        if ($collection instanceof Response) {
            return $collection;
        }
        if (! $this->may('update', $collection)) {
            return $this->denied('edit the listing page of '.$collection->title);
        }
        $locale = $args['locale'] ?? Locales::default();
        app(Save::class)->handle($collection, $args['data'], $locale, $args['version'] ?? null);
        $collection->load('listings');

        return $this->json(['saved' => true, ...GetListing::present($collection, $locale)]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'collection' => $schema->string()->required(),
            'locale' => $schema->string(),
            'data' => $schema->object()->description('Field handle => value.')->required(),
            'version' => $schema->integer()->description('From cms_get_listing.'),
        ];
    }
}
