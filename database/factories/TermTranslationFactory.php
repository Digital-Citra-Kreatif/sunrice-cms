<?php

declare(strict_types=1);

namespace Sunrice\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\Term;
use Sunrice\Models\TermTranslation;
use Sunrice\Support\Locales;

/** @extends Factory<TermTranslation> */
class TermTranslationFactory extends Factory
{
    protected $model = TermTranslation::class;

    public function definition(): array
    {
        $name = fake()->unique()->words(2, true);

        return [
            'term_id' => Term::factory(),
            'taxonomy_id' => fn (array $attrs) => Term::find($attrs['term_id'])->taxonomy_id ?? Taxonomy::factory(),
            'locale' => Locales::main(),
            'name' => $name,
            'slug' => Str::slug($name),
            'data' => [],
            'is_ready' => true,
        ];
    }
}
