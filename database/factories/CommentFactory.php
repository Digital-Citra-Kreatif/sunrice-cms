<?php

declare(strict_types=1);

namespace Sunrice\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Sunrice\Models\Comment;
use Sunrice\Models\Entry;

/** @extends Factory<Comment> */
class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition(): array
    {
        return [
            'entry_id' => Entry::factory(),
            'author_name' => fake()->name(),
            'author_email' => fake()->safeEmail(),
            'body' => fake()->sentence(),
            'status' => Comment::APPROVED,
            'approved_at' => now(),
            'locale' => 'id',
        ];
    }

    public function pending(): static
    {
        return $this->state(['status' => Comment::PENDING, 'approved_at' => null]);
    }

    public function spam(): static
    {
        return $this->state(['status' => Comment::SPAM, 'approved_at' => null]);
    }
}
