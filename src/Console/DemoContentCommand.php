<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Sunrice\Cms\Actions\Structure\PurgeDeleted;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Models\TermTranslation;
use Sunrice\Cms\Support\Locales;
use Sunrice\Cms\Support\SiteCache;

/**
 * sunrice:demo-content — fills a demo collection of its own with fake,
 * published articles (and demo topics), to see how the site does with a
 * lot of content; --remove deletes it all again. Demo collections and
 * taxonomies are the ones with the demo blueprints; nothing else is touched.
 *
 * @internal
 */
final class DemoContentCommand extends Command
{
    public const BLUEPRINT = 'sunrice_demo';

    public const TOPICS_BLUEPRINT = 'sunrice_demo_topic';

    private const TOPICS = 10;

    private const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

    protected $signature = 'sunrice:demo-content
        {count=1000 : How many articles to add}
        {--collection=demo : The demo collection\'s handle (its pages are at /<handle>/…)}
        {--remove : Delete the demo collection, its topics and every demo article}
        {--force : Don\'t ask before removing}';

    protected $description = 'Add (or remove) fake articles in a demo collection, to try the site with a lot of content';

    public function handle(PurgeDeleted $purge, SiteCache $cache): int
    {
        $handle = Str::slug((string) $this->option('collection'), '_');
        if ($handle === '' || ! preg_match('/^[a-z]/', $handle)) {
            $this->components->error('Give the collection a handle starting with a letter, e.g. --collection=demo.');

            return self::FAILURE;
        }
        $collection = Collection::withTrashed()->where('handle', $handle)->first();
        $taxonomy = Taxonomy::withTrashed()->where('handle', "{$handle}_topics")->first();
        if (($collection !== null && $collection->blueprint !== self::BLUEPRINT) || ($taxonomy !== null && $taxonomy->blueprint !== self::TOPICS_BLUEPRINT)) {
            $this->components->error("\"{$handle}\" is real content, not demo content. Choose another handle with --collection=….");

            return self::FAILURE;
        }
        if ($this->option('remove')) {
            return $this->remove($purge, $collection, $taxonomy);
        }

        $count = max(1, (int) $this->argument('count'));
        [$collection, $topics] = $this->structure($collection, $taxonomy, $handle);
        $start = Entry::withTrashed()->where('collection_id', $collection->id)->count();
        $locale = Locales::default();
        $bar = $this->output->createProgressBar($count);
        $started = microtime(true);
        foreach (array_chunk(range($start + 1, $start + $count), 200) as $chunk) {
            DB::transaction(function () use ($chunk, $collection, $topics, $locale, $bar): void {
                foreach ($chunk as $i) {
                    $entry = Entry::query()->create(['collection_id' => $collection->id]);
                    $data = [
                        'excerpt' => "A short summary of demo article {$i}.",
                        'body' => '<p>'.implode('</p><p>', array_fill(0, 4, "Demo article {$i}. ".self::LOREM)).'</p>',
                        'price' => ($i % 50) * 10 + 9,
                    ];
                    EntryTranslation::query()->create([
                        'entry_id' => $entry->id, 'collection_id' => $collection->id, 'locale' => $locale,
                        'status' => EntryTranslation::PUBLISHED, 'published_at' => now()->subMinutes($i),
                        'title' => "Demo article {$i}", 'slug' => "demo-article-{$i}", 'data' => $data,
                        'draft_title' => "Demo article {$i}", 'draft_slug' => "demo-article-{$i}", 'draft_data' => $data,
                    ]);
                    $entry->terms()->attach($topics[$i % count($topics)]);
                    $bar->advance();
                }
            });
        }
        $bar->finish();
        $this->newLine(2);
        $cache->changed('demo content');

        $total = $start + $count;
        $this->components->info(sprintf('Added %d demo articles in %.1fs (%d in all).', $count, microtime(true) - $started, $total));
        $this->line('  Pages to try (or time them: curl -w "%{time_total}\n" -o /dev/null -s <address>):');
        foreach ([
            "/{$handle}" => 'listing page',
            "/{$handle}?page=".max(1, intdiv($total, 12)) => 'last listing page',
            "/{$handle}/demo-article-".max(1, intdiv($total, 2)) => 'an article',
            "/{$handle}-topics/topic-1" => 'a topic',
            '/search?q=demo+article+'.max(1, intdiv($total, 3)) => 'search',
        ] as $path => $label) {
            $this->line(sprintf('  %-18s %s', $label, url($path)));
        }
        $this->line("  Remove it all with <comment>php artisan sunrice:demo-content --remove --collection={$handle}</comment>.");

        return self::SUCCESS;
    }

    /** @return array{0: Collection, 1: list<int>} the collection and its topics' ids */
    private function structure(?Collection $collection, ?Taxonomy $taxonomy, string $handle): array
    {
        Blueprint::query()->firstOrCreate(['handle' => self::BLUEPRINT], ['title' => 'Demo article', 'fields' => [
            ['handle' => 'excerpt', 'type' => 'textarea', 'label' => 'Excerpt'],
            ['handle' => 'body', 'type' => 'rich_text', 'label' => 'Body'],
            ['handle' => 'price', 'type' => 'number', 'label' => 'Price'],
        ]]);
        Blueprint::query()->firstOrCreate(['handle' => self::TOPICS_BLUEPRINT], ['title' => 'Demo topic', 'fields' => []]);
        $collection ??= Collection::query()->create([
            'handle' => $handle, 'title' => 'Demo articles', 'blueprint' => self::BLUEPRINT, 'dated' => true,
            'route' => "/{$handle}/{slug}", 'listing_route' => "/{$handle}", 'per_page' => 12,
        ]);
        $taxonomy ??= Taxonomy::query()->create(['handle' => "{$handle}_topics", 'title' => 'Demo topics', 'blueprint' => self::TOPICS_BLUEPRINT, 'route' => '/'.str_replace('_', '-', $handle).'-topics/{slug}']);
        $collection->trashed() && $collection->restore();
        $taxonomy->trashed() && $taxonomy->restore();
        $collection->taxonomies()->syncWithoutDetaching([$taxonomy->id]);

        $topics = Term::query()->where('taxonomy_id', $taxonomy->id)->orderBy('id')->get(['id'])->map(fn (Term $term): int => $term->id)->all();
        for ($i = count($topics) + 1; $i <= self::TOPICS; $i++) {
            $term = Term::query()->create(['taxonomy_id' => $taxonomy->id, 'sort_order' => $i]);
            TermTranslation::query()->create(['term_id' => $term->id, 'taxonomy_id' => $taxonomy->id, 'locale' => Locales::default(), 'title' => "Topic {$i}", 'slug' => "topic-{$i}"]);
            $topics[] = $term->id;
        }

        return [$collection, array_values($topics)];
    }

    private function remove(PurgeDeleted $purge, ?Collection $collection, ?Taxonomy $taxonomy): int
    {
        if ($collection === null && $taxonomy === null) {
            $this->components->info('There is no demo content to remove.');

            return self::SUCCESS;
        }
        if (! $this->option('force') && ! $this->confirm('Delete the demo collection, its topics and every demo article for good?', false)) {
            $this->components->warn('Nothing deleted.');

            return self::FAILURE;
        }
        $entries = 0;
        $terms = 0;
        if ($collection !== null) {
            $collection->trashed() || $collection->delete();
            $entries = $purge->collection($collection);
        }
        if ($taxonomy !== null) {
            $taxonomy->trashed() || $taxonomy->delete();
            $terms = $purge->taxonomy($taxonomy);
        }
        $this->components->info("Removed {$entries} demo articles and {$terms} demo topics.");

        return self::SUCCESS;
    }
}
