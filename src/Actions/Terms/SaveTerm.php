<?php

declare(strict_types=1);

namespace Sunrice\Cms\Actions\Terms;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Validator as ValidatorInstance;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Cms\Actions\Entries\EntryInput;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\Versioned;

/**
 * Creates a term or changes one, in one language. Input: title, slug
 * (made from the title when empty; unique in the taxonomy and language),
 * locale (the main one when left out) and parent_id (a term of the same
 * taxonomy, if it's hierarchical; never the term itself or one under it)
 * and version (the one the editor opened: a save over someone else's
 * newer one is refused).
 *
 * @api
 */
final class SaveTerm
{
    public function __construct(private readonly ActivityLog $activity) {}

    /**
     * @param  array<mixed>  $input
     *
     * @throws ValidationException
     */
    public function handle(Taxonomy $taxonomy, array $input, ?Term $term = null): Term
    {
        $term ??= new Term(['taxonomy_id' => $taxonomy->id]);
        $locale = $input['locale'] ?? Locales::default();
        $existing = $term->exists && is_string($locale) ? $term->translations()->where('locale', $locale)->first() : null;

        $validator = Validator::make($input, [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:200', 'regex:'.EntryInput::SLUG],
            'locale' => ['sometimes', 'string', function (string $attribute, mixed $value, \Closure $fail): void {
                if (! is_string($value) || ! Locales::has($value)) {
                    $fail(__('Choose one of the site\'s languages.'));
                }
            }],
            'parent_id' => ['nullable', 'integer'],
        ], ['slug.regex' => __('Use lowercase letters, digits and dashes (about-us).')]);
        $validator->after(function (ValidatorInstance $validator) use ($input, $taxonomy, $term, $locale, $existing): void {
            $slug = $input['slug'] ?? null;
            if (is_string($slug) && $slug !== '' && is_string($locale) && self::taken($taxonomy, $locale, $slug, $existing?->id)) {
                $validator->errors()->add('slug', __('Another term already uses ":slug".', ['slug' => $slug]));
            }
            $parent = $input['parent_id'] ?? null;
            if (is_numeric($parent)) {
                if (! $taxonomy->hierarchical) {
                    $validator->errors()->add('parent_id', __('This taxonomy\'s terms have no parents.'));
                } elseif (! Term::query()->whereKey($parent)->where('taxonomy_id', $taxonomy->id)->exists()) {
                    $validator->errors()->add('parent_id', __('Choose a term of this taxonomy.'));
                } elseif ($term->exists && in_array((int) $parent, [$term->id, ...self::descendants($term)], true)) {
                    $validator->errors()->add('parent_id', 'A term can\'t go under itself or a term under it.');
                }
            }
        });
        /** @var array{title: string, slug?: string|null, parent_id?: int|null} $validated */
        $validated = $validator->validate();
        /** @var string $locale */
        $title = trim($validated['title']);
        $slug = ($validated['slug'] ?? null) ?: self::uniqueSlug($taxonomy, $locale, $title, $existing?->id);

        $creating = ! $term->exists;
        $expected = Versioned::expected($input['version'] ?? null);
        DB::transaction(function () use ($term, $taxonomy, $validated, $locale, $title, $slug, $existing, $expected, $input): void {
            if ($existing !== null) {
                // Only if nobody saved in between: the version check and the write are one statement.
                Versioned::update($existing, $expected, ['title' => $title, 'slug' => $slug]);
            }
            if (array_key_exists('parent_id', $input)) {
                $term->parent_id = $validated['parent_id'] ?? null;
            }
            if (! $term->exists) {
                $last = Term::query()->where('taxonomy_id', $taxonomy->id)->max('sort_order');
                $term->sort_order = is_numeric($last) ? (int) $last + 1 : 0;
            }
            $term->save();
            if ($existing === null) {
                (new TermTranslation(['term_id' => $term->id, 'taxonomy_id' => $taxonomy->id, 'locale' => $locale]))
                    ->fill(['title' => $title, 'slug' => $slug])->save();
            }
        });
        $term->unsetRelation('translations');
        $this->activity->record($creating ? 'created' : 'updated', 'term', $term, $title, ['taxonomy' => $taxonomy->handle, 'locale' => $locale]);

        return $term;
    }

    /** @return list<int> */
    private static function descendants(Term $term): array
    {
        $ids = [];
        $level = [$term->id];
        // Bounded: a corrupt loop can't run forever.
        for ($depth = 0; $level !== [] && $depth < 50; $depth++) {
            $level = Term::query()->whereIn('parent_id', $level)->get(['id'])->map(fn (Term $child): int => $child->id)->all();
            array_push($ids, ...$level);
        }

        return $ids;
    }

    private static function taken(Taxonomy $taxonomy, string $locale, string $slug, ?int $except): bool
    {
        return TermTranslation::query()->where('taxonomy_id', $taxonomy->id)->where('locale', $locale)->where('slug', $slug)
            ->when($except !== null, fn ($query) => $query->whereKeyNot($except))->exists();
    }

    private static function uniqueSlug(Taxonomy $taxonomy, string $locale, string $title, ?int $except): string
    {
        $base = trim(Str::limit(Str::slug($title), 190, ''), '-') ?: 'term';
        $slug = $base;
        for ($i = 2; self::taken($taxonomy, $locale, $slug, $except); $i++) {
            $slug = "{$base}-{$i}";
        }

        return $slug;
    }
}
