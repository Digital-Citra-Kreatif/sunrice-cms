<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Terms;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Actions\Entries\EntryInput;
use Sunrice\Cms\Actions\Entries\SaveEntrySettings;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Seo;

/**
 * A term's page content in a language: its taxonomy's fields and its
 * SEO, and the term's own template (for every language). The term must be
 * translated into the language first (SaveTerm). Fields left out keep
 * their values.
 *
 * @api
 */
final class SaveTermContent
{
    public function __construct(private readonly ActivityLog $activity) {}

    /**
     * @param  array{data?: mixed, seo?: mixed, template?: mixed}  $input
     *
     * @throws ValidationException
     */
    public function handle(Term $term, array $input, ?string $locale = null): TermTranslation
    {
        $locale ??= Locales::default();
        $translation = $term->translations()->where('locale', $locale)->first();
        if ($translation === null) {
            throw ValidationException::withMessages(['locale' => 'Give the term a title in this language first.']);
        }
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

        if (array_key_exists('template', $input)) {
            $template = SaveEntrySettings::template($input['template'], 'cms.topic');
            if ($term->template !== $template) {
                $term->forceFill(['template' => $template])->save();
                $changed[] = 'template';
            }
        }
        /** @var array<string, mixed> $data */
        $translation->data = $data;
        $translation->save();
        $this->activity->updated('term', $term, $term->title($locale), array_map(strval(...), $changed));

        return $translation;
    }
}
