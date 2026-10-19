<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use DateTimeImmutable;
use Exception;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Validation\ValidationException;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Sunrice\Cms\Actions\Entries\PublishEntry as Publish;

#[Description('Publish an entry\'s draft in a language (the main one unless "locale" is given): now, keeping its first date, or on "published_at" (scheduled). Ask the user first.')]
final class PublishEntry extends CmsTool
{
    protected string $name = 'cms_publish_entry';

    public function handle(Request $request): Response
    {
        if (! $this->may('publish')) {
            return $this->denied('publish entries');
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
            return $this->denied('publish entries of '.$entry->collection->title);
        }
        $at = $request->get('published_at');
        try {
            $at = is_string($at) && $at !== '' ? new DateTimeImmutable($at) : null;
        } catch (Exception) {
            return Response::error('"published_at" must be a date and time, like 2026-11-01T09:00:00+07:00.');
        }
        try {
            $translation = app(Publish::class)->handle($translation, $at);
        } catch (ValidationException $e) {
            return self::invalid($e);
        }

        return $this->json(['published' => true, ...self::describe($translation)]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'id' => $schema->integer()->required(),
            'locale' => $schema->string(),
            'published_at' => $schema->string()->description('ISO 8601; a future date schedules it.'),
        ];
    }
}
