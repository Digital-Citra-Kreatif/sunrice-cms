<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Validation\ValidationException;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use RuntimeException;
use Sunrice\Cms\Actions\Entries\CreateTranslation;
use Sunrice\Cms\Actions\Entries\MachineTranslateEntry;
use Sunrice\Cms\Translation\TranslatorFactory;

#[Description('Add a language to an entry: a draft copied from the main language. Then translate it with cms_save_entry (with "locale") and publish it. With "machine": true, the site\'s translation service fills in what isn\'t translated yet (also for a language the entry has already), into the draft.')]
final class TranslateEntry extends CmsTool
{
    protected string $name = 'cms_translate_entry';

    public function handle(Request $request): Response
    {
        $entry = $this->findEntry($request);
        if ($entry instanceof Response) {
            return $entry;
        }
        $locale = $request->get('locale');
        $locale = is_string($locale) ? $locale : '';
        // Those who may create its collection's entries, or edit it in that language (translators).
        if (! $this->may('add-translation', $entry->collection, $entry, $locale)) {
            return $this->denied('add translations to entries of '.$entry->collection->title);
        }
        $machine = $request->get('machine') === true;
        if ($machine && ! app(TranslatorFactory::class)->configured()) {
            return Response::error('Machine translation isn\'t set up on this site: translate the text yourself with cms_save_entry.');
        }
        $entry->loadMissing('translations');
        $translation = $machine ? $entry->translation($locale) : null;
        try {
            $added = $translation === null;
            $translation ??= app(CreateTranslation::class)->handle($entry, $locale);
            if ($machine) {
                if (! $this->may('update', $entry->collection, $entry, $locale)) {
                    return $this->denied('edit this translation');
                }
                $stats = app(MachineTranslateEntry::class)->handle($translation);
                if ($stats->errors !== []) {
                    return Response::error('Not translated: '.implode(' ', $stats->errors));
                }
            }
        } catch (ValidationException $e) {
            return self::invalid($e);
        } catch (RuntimeException $e) {
            return Response::error('The translation service failed: '.$e->getMessage());
        }
        $entry->load('translations');

        return $this->json(['added' => $added, ...(isset($stats) ? ['machine_translated' => $stats->translated] : []), ...self::describe($translation->fresh() ?? $translation)]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'id' => $schema->integer()->required(),
            'locale' => $schema->string()->required(),
            'machine' => $schema->boolean()->description('Fill in the translation with the site\'s translation service (drafts only; check it, then publish).'),
        ];
    }
}
