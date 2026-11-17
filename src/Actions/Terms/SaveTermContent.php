<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Terms;

use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Actions\Entries\SaveEntrySettings;
use Sunrice\Cms\Events\TermSaved;
use Sunrice\Cms\Events\TermSaving;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\LanguageValues;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\References;
use Sunrice\Cms\Support\Seo;
use Sunrice\Cms\Support\Versioned;

/**
 * A term's page content in a language: its taxonomy's fields and its
 * SEO, and the term's own template (for every language). With `title`
 * (and `slug`), the term is renamed in that language first, or translated
 * into it when it wasn't (SaveTerm), and with `parent_id` moved under
 * another term (null: the top level), so the term editor edits all of it;
 * without a title, the term must be translated into the language already.
 * Fields left out keep their values. Listeners of TermSaving may change
 * the title, slug and fields or refuse; TermSaved follows, once.
 *
 * @api
 */
final class SaveTermContent
{
    public function __construct(private readonly ActivityLog $activity) {}

    /**
     * @param  array{data?: mixed, seo?: mixed, template?: mixed, version?: mixed, title?: mixed, slug?: mixed, parent_id?: mixed}  $input  version: the one the editor opened; a save over someone else's newer one is refused
     *
     * @throws ValidationException
     */
    public function handle(Term $term, array $input, ?string $locale = null): TermTranslation
    {
        $locale ??= Locales::default();
        $saved = $this->save($term, $input, $locale, true);
        TermSaved::dispatch($term, $locale, false);

        return $saved;
    }

    /**
     * As handle(), without the events unless `$saving` (CreateTerm fires
     * them once for the whole save).
     *
     * @internal
     *
     * @param  array{data?: mixed, seo?: mixed, template?: mixed, version?: mixed, title?: mixed, slug?: mixed, parent_id?: mixed}  $input
     *
     * @throws ValidationException
     */
    public function save(Term $term, array $input, string $locale, bool $saving = false): TermTranslation
    {
        return DB::transaction(function () use ($term, $input, $locale, $saving): TermTranslation {
            $translation = $term->translations()->where('locale', $locale)->first();
            if ($saving) {
                $input = self::saving($term, $translation, $input, $locale);
            }
            $parent = array_key_exists('parent_id', $input) && is_numeric($input['parent_id']) ? (int) $input['parent_id'] : null;
            $moved = array_key_exists('parent_id', $input) && $parent !== $term->parent_id;
            if (array_key_exists('title', $input)) {
                $slug = is_string($input['slug'] ?? null) && trim($input['slug']) !== '' ? trim($input['slug']) : $translation?->slug;
                if ($translation === null || $translation->title !== $input['title'] || $translation->slug !== $slug || $moved) {
                    app(SaveTerm::class)->save($term->taxonomy, ['title' => $input['title'], 'slug' => $slug, 'locale' => $locale, 'version' => $input['version'] ?? null]
                        + ($moved ? ['parent_id' => $parent] : []), $term);
                    $renamed = $term->translations()->where('locale', $locale)->firstOrFail();
                    // Its version was just checked and counted up: the content goes on from there.
                    $input['version'] = $translation === null || ($input['version'] ?? null) === null ? null : $renamed->version;
                    $translation = $renamed;
                }
            }
            if ($translation === null) {
                throw ValidationException::withMessages(['title' => __('Give the term a title in this language.')]);
            }

            return $this->content($term, $translation, $input, $locale);
        });
    }

    /**
     * TermSaving: listeners may change the title, slug and fields, or
     * refuse. What they leave is validated as what was sent would be.
     *
     * @param  array{data?: mixed, seo?: mixed, template?: mixed, version?: mixed, title?: mixed, slug?: mixed, parent_id?: mixed}  $input
     * @return array{data?: mixed, seo?: mixed, template?: mixed, version?: mixed, title?: mixed, slug?: mixed, parent_id?: mixed}
     *
     * @throws ValidationException
     */
    private static function saving(Term $term, ?TermTranslation $translation, array $input, string $locale): array
    {
        $title = array_key_exists('title', $input) ? $input['title'] : $translation?->title;
        $slug = array_key_exists('slug', $input) ? $input['slug'] : $translation?->slug;
        $data = array_replace($translation->data ?? [], is_array($input['data'] ?? null) ? $input['data'] : []);
        event($saving = new TermSaving($term->taxonomy, $locale, $term, $title, $slug, $data));
        // A new name in this language: given, or a listener's.
        if (array_key_exists('title', $input) || $saving->title !== $title || $saving->slug !== $slug) {
            $input['title'] = $saving->title;
            $input['slug'] = $saving->slug;
        }
        if ($saving->data !== null) {
            $input['data'] = $saving->data;
        }

        return $input;
    }

    /**
     * @param  array<string, mixed>  $input
     *
     * @throws ValidationException
     */
    private function content(Term $term, TermTranslation $translation, array $input, string $locale): TermTranslation
    {
        $expected = Versioned::expected($input['version'] ?? null);
        // Not in the main language yet (named in another first): nothing to share, all its fields are its own.
        $main = $locale === Locales::default() ? null : $term->translations()->where('locale', Locales::default())->first();
        $main = $main === null ? null : ($main->data ?? []);
        ['before' => $before, 'data' => $data] = LanguageValues::save($term->taxonomy->schema(), $translation->data ?? [], $input['data'] ?? null, $main);
        if (array_key_exists(Seo::KEY, $input)) {
            $data[Seo::KEY] = Seo::validate($input[Seo::KEY]);
        }
        $changed = array_keys(array_filter($data, fn (mixed $v, int|string $k): bool => ! array_key_exists($k, $before) || $before[$k] != $v, ARRAY_FILTER_USE_BOTH));
        $template = $term->template;
        if (array_key_exists('template', $input)) {
            $template = SaveEntrySettings::template($input['template'], 'cms.topic');
        }

        // Only if nobody saved in between: the version check and the write are one statement.
        Versioned::update($translation, $expected, ['data' => json_encode($data, JSON_THROW_ON_ERROR)]);
        // A query update fires no model events.
        References::term($translation);
        if ($term->template !== $template) {
            $term->forceFill(['template' => $template])->save();
            $changed[] = 'template';
        }
        $this->activity->updated('term', $term, $term->title($locale), array_map(strval(...), $changed));

        return $translation;
    }
}
