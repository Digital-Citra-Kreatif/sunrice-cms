<?php

declare(strict_types=1);

namespace Sunrice\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Sunrice\Models\Blueprint;
use Sunrice\Models\GlobalSet;

/** @extends Factory<GlobalSet> */
class GlobalSetFactory extends Factory
{
    protected $model = GlobalSet::class;

    public function definition(): array
    {
        return [
            'handle' => fake()->unique()->slug(2),
            'title' => fake()->words(2, true),
            'blueprint_id' => Blueprint::factory(),
            'group' => 'global',
        ];
    }
}
