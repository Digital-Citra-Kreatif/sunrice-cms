<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Validation\ValidationException;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Entries\CreateEntry;
use Sunrice\Cms\Actions\Entries\PublishEntry;
use Sunrice\Cms\Actions\Entries\SaveDraft;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Support\Seo;

#[Description('Create an entry (give "collection", no "id") as a draft in the main language, or change an entry\'s draft in a language (give "id", and "locale" for another than the main one). Only what you send changes; "data" holds field values by handle (cms_get_entry shows the fields). Validated like the editor. The site shows changes once published: send "publish": true, or use cms_publish_entry.')]
final class SaveEntry extends CmsTool
{
    protected string $name = 'cms_save_entry';

    public function handle(Request $request): Response
    {
        $input = array_intersect_key($request->all(), array_flip(['title', 'slug', 'data', 'seo']));
        if (array_key_exists('data', $input) && ! is_array($input['data'])) {
            return Response::error('Send "data" as an object of field handle => value.');
        }
        $publishing = $request->get('publish') === true;
        if ($publishing && ! $this->can('cms.entries.publish')) {
            return $this->denied('publish entries');
        }

        try {
            if ($request->get('id') === null) {
                if (! $this->can('cms.entries.create')) {
                    return $this->denied('create entries');
                }
                $handle = $request->get('collection');
                $collection = is_string($handle) ? Collection::query()->where('handle', $handle)->first() : null;
                if ($collection === null) {
                    return Response::error('Give the "collection" to create the entry in (cms_list_entries lists them), or an "id" to change one.');
                }
                $translation = app(CreateEntry::class)->handle($collection, $input);
            } else {
                if (! $this->can('cms.entries.update')) {
                    return $this->denied('edit entries');
                }
                $entry = $this->findEntry($request);
                if ($entry instanceof Response) {
                    return $entry;
                }
                $translation = $this->findTranslation($request, $entry);
                if ($translation instanceof Response) {
                    return $translation;
                }
                $translation = app(SaveDraft::class)->handle($translation, $input);
            }
            if ($publishing) {
                $translation = app(PublishEntry::class)->handle($translation);
            }
        } catch (ValidationException $e) {
            return self::invalid($e);
        }
        $translation->unsetRelation('entry');

        return $this->json(['saved' => true, ...self::describe($translation)]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'id' => $schema->integer()->description('The entry to change; leave out to create one.'),
            'collection' => $schema->string()->description('To create: the collection\'s handle.'),
            'locale' => $schema->string()->description('The language to change; the main one when left out.'),
            'title' => $schema->string(),
            'slug' => $schema->string()->description('Made from the title when left empty.'),
            'data' => $schema->object()->description('Field handle => value; fields left out keep their values.'),
            Seo::KEY => $schema->object()->description('title, description, image (a media id), noindex.'),
            'publish' => $schema->boolean()->description('Publish it now as well.'),
        ];
    }
}
