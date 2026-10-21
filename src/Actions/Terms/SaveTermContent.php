<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Terms;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Actions\Entries\EntryInput;
use Sunrice\Cms\Actions\Entries\SaveEntrySettings;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\References;
use Sunrice\Cms\Support\Seo;
use Sunrice\Cms\Support\Versioned;

/**
 * A term's page content in a language: its taxonomy's fields and its
 * SEO, and the term's own template (for every language). With `title`
 * (and `slug`), the term is renamed in that language first, or translated
 * into it when it wasn't (SaveTerm), so the term's page edits all of it;
 * without, the term must be translated into the language already. Fields
 * left out keep their values.
 *
 * @api
 */
final class SaveTermContent
{
    public function __construct(private readonly ActivityLog $activity) {}

    /**
     * @param  array{data?: mixed, seo?: mixed, template?: mixed, version?: mixed, title?: mixed, slug?: mixed}  $input  version: the one the editor opened; a save over someone else's newer one is refused
     *
     * @throws ValidationException
     */
    public function handle(Term $term, array $input, ?string $locale = null): TermTranslation
    {
        $locale ??= Locales::default();

        return DB::transaction(function () use ($term, $input, $locale): TermTranslation {
            $translation = $term->translations()->where('locale', $locale)->first();
            if (array_key_exists('title', $input)) {
                $slug = is_string($input['slug'] ?? null) && trim($input['slug']) !== '' ? trim($input['slug']) : $translation?->slug;
                if ($translation === null || $translation->title !== $input['title'] || $translation->slug !== $slug) {
                    app(SaveTerm::class)->handle($term->taxonomy, ['title' => $input['title'], 'slug' => $slug, 'locale' => $locale, 'version' => $input['version'] ?? null], $term);
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
     * @param  array<string, mixed>  $input
     *
     * @throws ValidationException
     */
    private function content(Term $term, TermTranslation $translation, array $input, string $locale): TermTranslation
    {
        $expected = Versioned::expected($input['version'] ?? null);
        $schema = $term->taxonomy->schema();
        if ($locale !== Locales::default()) {
            $schema = $schema->except($schema->shared());
        }
        $before = array_replace($schema->defaults(), $translation->data ?? []);
        $merged = EntryInput::merge($schema, $before, $input['data'] ?? null);
        $rules = $schema->rules($merged);
        Validator::make(['data' => $merged], $rules, [], EntryInput::attributes($schema, array_keys($rules)))->validate();
        $data = $schema->normalize($merged);
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
