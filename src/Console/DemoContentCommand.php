<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use Sunrice\Cms\Actions\Blueprints\DeleteBlueprint;
use Sunrice\Cms\Actions\Collections\DeleteCollection;
use Sunrice\Cms\Actions\Collections\PurgeDeleted;
use Sunrice\Cms\Actions\Fieldsets\DeleteFieldset;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Fieldset;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\Redirect;
use Sunrice\Cms\Models\Submission;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Structure\StructureImporter;
use Sunrice\Cms\Structure\StructureImportFailed;

/**
 * sunrice:demo-content: a small demo site to try the CMS on, made with
 * StructureImporter (so through the admin's actions): Pages and a Blog
 * whose posts have flexible sections, nested Topics, a dozen entries in
 * the site's languages (English and Indonesian texts), a main menu, a
 * global set, a contact form and redirects. Running it again adds only
 * what's missing; --fresh deletes the demo's collections, taxonomy, menu,
 * global set, form, redirects, blueprints and fieldsets (by handle) first.
 *
 * @internal
 */
final class DemoContentCommand extends Command
{
    public const COLLECTIONS = ['pages', 'blog'];

    public const BLUEPRINTS = ['page', 'post', 'topic', 'site_info', 'contact_form'];

    public const FIELDSETS = ['text_block', 'quote_block'];

    public const REDIRECTS = ['/home', '/news'];

    private const POSTS = [
        ['hello-world', 'Hello, world', 'Halo, dunia', 'news'],
        ['our-new-office', 'Our new office', 'Kantor baru kami', 'local'],
        ['getting-started', 'Getting started', 'Memulai', 'guides'],
        ['writing-good-titles', 'Writing good titles', 'Menulis judul yang baik', 'tutorials'],
        ['spring-update', 'Spring update', 'Kabar musim semi', 'news'],
        ['meet-the-team', 'Meet the team', 'Kenalan dengan tim', 'local'],
        ['five-quick-tips', 'Five quick tips', 'Lima tips singkat', 'tutorials'],
        ['whats-next', 'What\'s next', 'Selanjutnya', 'guides'],
    ];

    protected $signature = 'sunrice:demo-content {--fresh : Delete the demo\'s structure and content first}';

    protected $description = 'Fill the site with a small demo: pages, a blog, topics, a menu, globals, a contact form and redirects';

    public function handle(StructureImporter $importer): int
    {
        if ($this->option('fresh')) {
            $this->wipe();
        }
        try {
            $structure = $importer->import($this->structure());
            $content = $importer->import(['entries' => $this->entries(), 'menus' => $this->menus()]);
        } catch (StructureImportFailed $e) {
            $this->components->error($e->getMessage().' Run with --fresh to start over.');

            return self::FAILURE;
        }
        $created = count($structure->items('created')) + count($content->items('created'));
        $this->components->info($created === 0 ? 'The demo is already there.' : "Added {$created} demo items: see /admin and the site's home page.");

        return self::SUCCESS;
    }

    /** Deletes what the demo makes, by handle. */
    private function wipe(): void
    {
        $purge = app(PurgeDeleted::class);
        foreach (Collection::withTrashed()->whereIn('handle', self::COLLECTIONS)->get() as $collection) {
            if (! $collection->trashed()) {
                app(DeleteCollection::class)->handle($collection);
            }
            $purge->collection($collection);
        }
        foreach (Taxonomy::withTrashed()->where('handle', 'topics')->get() as $taxonomy) {
            if (! $taxonomy->trashed()) {
                $taxonomy->delete();
            }
            $purge->taxonomy($taxonomy);
        }
        foreach (Menu::query()->where('handle', 'main')->get() as $menu) {
            $menu->items()->delete();
            $menu->delete();
        }
        foreach (GlobalSet::query()->where('handle', 'site')->get() as $set) {
            $set->values()->delete();
            $set->delete();
        }
        foreach (Form::query()->where('handle', 'contact')->get() as $form) {
            Submission::query()->where('form_id', $form->id)->get()->each(fn (Submission $submission) => $submission->delete());
            $form->delete();
        }
        Redirect::query()->whereIn('from_path', self::REDIRECTS)->delete();
        foreach (Blueprint::query()->whereIn('handle', self::BLUEPRINTS)->get() as $blueprint) {
            app(DeleteBlueprint::class)->handle($blueprint);
        }
        foreach (Fieldset::query()->whereIn('handle', self::FIELDSETS)->get() as $fieldset) {
            app(DeleteFieldset::class)->handle($fieldset);
        }
    }

    /** @return array<string, mixed> */
    private function structure(): array
    {
        $field = fn (string $handle, string $type, array $config = [], array $extra = []): array => ['handle' => $handle, 'type' => $type, 'config' => $config, ...$extra];

        return [
            'fieldsets' => [
                ['handle' => 'text_block', 'title' => 'Text', 'fields' => [$field('body', 'rich_text')]],
                ['handle' => 'quote_block', 'title' => 'Quote', 'fields' => [$field('quote', 'textarea', [], ['required' => true]), $field('author', 'text')]],
            ],
            'blueprints' => [
                ['handle' => 'page', 'title' => 'Page', 'fields' => [$field('intro', 'textarea'), $field('body', 'rich_text')]],
                ['handle' => 'post', 'title' => 'Blog post', 'fields' => [
                    $field('intro', 'textarea'),
                    $field('sections', 'flexible', ['blocks' => self::FIELDSETS]),
                    $field('related', 'entries', ['collections' => ['blog'], 'multiple' => true, 'max' => 3], ['translatable' => false]),
                ]],
                ['handle' => 'topic', 'title' => 'Topic', 'fields' => [$field('description', 'textarea')]],
                ['handle' => 'site_info', 'title' => 'Site info', 'fields' => [$field('tagline', 'text'), $field('email', 'text', [], ['validation' => ['email'], 'translatable' => false])]],
                ['handle' => 'contact_form', 'title' => 'Contact form', 'fields' => [
                    $field('name', 'text', [], ['required' => true]),
                    $field('email', 'text', [], ['required' => true, 'validation' => ['email']]),
                    $field('message', 'textarea', [], ['required' => true]),
                ]],
            ],
            'collections' => [
                ['handle' => 'pages', 'title' => 'Pages', 'blueprint' => 'page', 'hierarchical' => true, 'ordered' => true, 'route' => '/{slug}'],
                ['handle' => 'blog', 'title' => 'Blog', 'blueprint' => 'post', 'dated' => true, 'route' => '/blog/{slug}', 'listing_route' => '/blog', 'listing_blueprint' => 'page', 'per_page' => 5,
                    'listings' => ['en' => ['intro' => 'News, guides and tutorials.']]],
            ],
            'taxonomies' => [
                ['handle' => 'topics', 'title' => 'Topics', 'hierarchical' => true, 'route' => '/topics/{slug}', 'blueprint' => 'topic', 'collections' => ['blog']],
            ],
            'terms' => [
                $this->term('news', 'News', 'Berita', null),
                $this->term('local', 'Local', 'Lokal', 'news'),
                $this->term('guides', 'Guides', 'Panduan', null),
                $this->term('tutorials', 'Tutorials', 'Tutorial', 'guides'),
            ],
            'globals' => [
                ['handle' => 'site', 'title' => 'Site info', 'blueprint' => 'site_info', 'values' => [
                    'en' => ['tagline' => 'A small demo site', 'email' => 'hello@example.com'],
                    'id' => ['tagline' => 'Situs demo kecil'],
                ]],
            ],
            'forms' => [
                ['handle' => 'contact', 'title' => 'Contact', 'blueprint' => 'contact_form', 'message' => 'Thank you, we got your message.'],
            ],
            'redirects' => [
                ['from' => '/home', 'to' => '/', 'status' => 301],
                ['from' => '/news', 'to' => '/blog', 'status' => 301],
            ],
        ];
    }

    /** @return array<string, mixed> */
    private function term(string $slug, string $en, string $id, ?string $parent): array
    {
        return ['taxonomy' => 'topics', 'slug' => $slug, 'parent' => $parent, 'translations' => [
            'en' => ['title' => $en, 'slug' => $slug, 'data' => ['description' => "Everything about {$en}."]],
            'id' => ['title' => $id, 'slug' => $slug, 'data' => ['description' => "Semua tentang {$id}."]],
        ]];
    }

    /**
     * The pages and posts, the posts with a topic each.
     *
     * @return list<array<string, mixed>>
     */
    private function entries(): array
    {
        $page = fn (string $slug, string $en, string $id, ?string $parent = null): array => [
            'collection' => 'pages', 'slug' => $slug, 'parent' => $parent, 'translations' => [
                'en' => ['title' => $en, 'slug' => $slug, 'published' => true, 'data' => ['intro' => "{$en}: a demo page.", 'body' => "<p>This is the {$en} page of the demo site.</p>"]],
                'id' => ['title' => $id, 'slug' => $slug, 'published' => true, 'data' => ['intro' => "{$id}: halaman demo.", 'body' => "<p>Ini halaman {$id} dari situs demo.</p>"]],
            ],
        ];
        $entries = [
            $page('home', 'Home', 'Beranda'),
            $page('about', 'About us', 'Tentang kami'),
            $page('team', 'Our team', 'Tim kami', 'about'),
            $page('contact', 'Contact', 'Kontak'),
        ];
        foreach (self::POSTS as $i => [$slug, $en, $id, $topic]) {
            $sections = fn (string $text, string $quote): array => [
                ['type' => 'text_block', 'values' => ['body' => "<p>{$text}</p>"]],
                ['type' => 'quote_block', 'values' => ['quote' => $quote, 'author' => 'Rina']],
            ];
            $entries[] = ['collection' => 'blog', 'slug' => $slug, 'terms' => ['topics' => [$topic]], 'translations' => [
                'en' => ['title' => $en, 'slug' => $slug, 'published' => $i < 7, 'data' => [
                    'intro' => "{$en}, in a few words.", 'sections' => $sections("The story of {$en}.", 'Small steps, every day.'),
                ]],
                'id' => ['title' => $id, 'slug' => $slug, 'published' => $i < 7, 'data' => [
                    'intro' => "{$id}, singkatnya.", 'sections' => $sections("Kisah tentang {$id}.", 'Langkah kecil, setiap hari.'),
                ]],
            ]];
        }

        return $entries;
    }

    /** @return list<array<string, mixed>> */
    private function menus(): array
    {
        return [['handle' => 'main', 'title' => 'Main menu', 'items' => [
            ['entry' => 'pages/home', 'labels' => [], 'children' => []],
            ['entry' => 'pages/about', 'labels' => [], 'children' => [['entry' => 'pages/team', 'labels' => []]]],
            ['collection' => 'blog', 'labels' => ['en' => 'Blog', 'id' => 'Blog'], 'children' => [
                ['term' => 'topics/news', 'labels' => []],
                ['term' => 'topics/guides', 'labels' => []],
            ]],
            ['entry' => 'pages/contact', 'labels' => []],
        ]]];
    }
}
