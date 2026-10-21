<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Entries;

use Illuminate\Validation\ValidationException;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Translation\ContentTranslator;
use Sunrice\Cms\Translation\TranslationStats;
use Sunrice\Cms\Translation\TranslatorFactory;

/**
 * Machine-translates what another language of an entry hasn't translated
 * yet from the main language, into its draft (ContentTranslator), with
 * the configured translator. The editor's "Translate from …" button and
 * the cms_translate_entry tool use it.
 *
 * @api
 */
final class MachineTranslateEntry
{
    public function __construct(private readonly TranslatorFactory $translators) {}

    /**
     * @param  int|string|null  $version  the one the editor opened: refused when someone saved since
     *
     * @throws ValidationException when it's the main language, or someone saved since
     * @throws \RuntimeException when machine translation isn't set up
     */
    public function handle(EntryTranslation $translation, int|string|null $version = null): TranslationStats
    {
        $main = $translation->entry->mainTranslation();
        if ($main === null || $main->is($translation)) {
            throw ValidationException::withMessages(['locale' => __('This is the main language: there\'s nothing to translate it from.')]);
        }
        if ($version !== null && (string) $version !== (string) $translation->version) {
            throw ValidationException::withMessages(['version' => __('Someone else saved this entry after you opened it. Reload to see their changes.')]);
        }
        $translator = new ContentTranslator($this->translators->make(), $main->locale, $translation->locale);
        $translator->entry($translation->entry);
        $translation->entry->unsetRelation('translations');

        return $translator->stats();
    }
}
