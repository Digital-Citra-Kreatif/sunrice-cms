<?php

declare(strict_types=1);

namespace Sunrice\Cms\Console;

use Illuminate\Console\Command;
use Sunrice\Cms\Actions\Blueprints\DeleteBlueprint;
use Sunrice\Cms\Actions\Collections\DeleteCollection;
use Sunrice\Cms\Actions\Collections\PurgeDeleted;
use Sunrice\Cms\Actions\Entries\ForceDeleteEntry;
use Sunrice\Cms\Actions\Fieldsets\DeleteFieldset;
use Sunrice\Cms\Models\Blueprint;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Fieldset;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\GlobalSet;
use Sunrice\Cms\Models\Menu;
use Sunrice\Cms\Models\Redirect;
use Sunrice\Cms\Models\Submission;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Site\RouteConflicts;
use Sunrice\Cms\Structure\StructureImporter;
use Sunrice\Cms\Structure\StructureImportFailed;
use Sunrice\Cms\Support\Locales;

/**
 * sunrice:demo-content: a small demo site to try the CMS on, made with
 * StructureImporter (so through the admin's actions): Pages and a Blog
 * whose posts have flexible sections, nested Topics, a dozen entries with
 * English and Indonesian texts, a main menu, a global set, a contact form
 * and redirects. Texts in a language the site doesn't have are left out;
 * a site with neither English nor Indonesian is refused.
 *
 * On a site with the installer's Posts collection (ScaffoldCollections)
 * and no demo Blog, the posts go into Posts instead, written in its "post"
 * blueprint's fields (excerpt, and the sections as the rich text body),
 * and the Topics and the menu's Blog link go with them. Anything else at
 * the demo's addresses (/{slug}, /blog/{slug}, /blog, /topics/{slug}) is
 * named, and nothing is saved.
 *
 * Running it again adds only what's missing; --fresh deletes the demo's
 * collections, taxonomy, menu, global set, form, redirects, blueprints
 * and fieldsets (by handle; blueprints still in use are kept) and its
 * posts in Posts first. It's all one import: when it fails, nothing is saved.
 *
 * @internal
 */
final class DemoContentCommand extends Command
{
    public const COLLECTIONS = ['pages', 'blog'];

    public const BLUEPRINTS = ['page', 'post', 'topic', 'site_info', 'contact_form'];

    public const FIELDSETS = ['text_block', 'quote_block'];

    public const REDIRECTS = ['/home', '/news'];

    /** The languages the demo has texts in. */
    public const LOCALES = ['en', 'id'];

    /** The installer's collection the posts go into when the site has it (ScaffoldCollections::POSTS). */
    public const POSTS_COLLECTION = 'posts';

    /** The demo's addresses, by handle: the collections' entry and listing pages, the taxonomy's term pages. */
    private const ROUTES = [
        'pages' => ['route' => '/{slug}'],
        'blog' => ['route' => '/blog/{slug}', 'listing_route' => '/blog'],
        'topics' => ['route' => '/topics/{slug}'],
    ];

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
        if (array_intersect(Locales::all(), self::LOCALES) === []) {
            $this->components->error('The demo has English and Indonesian texts; add en or id to the site\'s languages (Settings → Languages or SUNRICE_LOCALES), then run it again.');

            return self::FAILURE;
        }
        if ($this->option('fresh')) {
            $this->wipe();
        }
        $posts = self::intoPosts();
        $clash = $this->inTheWay($posts);
        if ($clash !== null) {
            $this->components->error($clash);

            return self::FAILURE;
        }
        try {
            $report = $importer->import([
                ...$this->structure($posts),
                'entries' => $this->entries($posts),
                'menus' => $this->menus($posts),
            ], skipOtherLanguages: true);
        } catch (StructureImportFailed $e) {
            // What's left is the demo's own items, changed since: --fresh deletes them.
            $this->components->error($e->getMessage().' Run with --fresh to start over.');

            return self::FAILURE;
        }
        $created = count($report->items('created'));
        $this->components->info($created === 0 ? 'The demo is already there.' : "Added {$created} demo items".($posts ? ', the posts in Posts' : '').": see /admin and the site's home page.");

        return self::SUCCESS;
    }

    /**
     * Whether the posts go into the installer's Posts: the site has it,
     * with "excerpt" and rich text "body" fields, and no demo Blog.
     */
    private static function intoPosts(): bool
    {
        if (Collection::withTrashed()->where('handle', 'blog')->exists()) {
            return false;
        }
        $posts = Collection::query()->where('handle', self::POSTS_COLLECTION)->first();
        $blueprint = $posts === null ? null : Blueprint::query()->where('handle', $posts->blueprint)->first();
        $types = [];
        foreach ($blueprint?->fields() ?? [] as $field) {
            $types[$field->handle] = $field->type;
        }

        return in_array($types['excerpt'] ?? null, ['text', 'textarea'], true) && ($types['body'] ?? null) === 'rich_text';
    }

    /**
     * What else has an address the demo's new collections or taxonomy
     * would take, in any of the site's languages, as a message; null when
     * nothing is in the way. Those the site has by the demo's handles are
     * used as they are.
     */
    private function inTheWay(bool $posts): ?string
    {
        foreach (self::ROUTES as $handle => $routes) {
            $taxonomy = $handle === 'topics';
            if (($posts && $handle === 'blog') || ($taxonomy ? Taxonomy::withTrashed() : Collection::withTrashed())->where('handle', $handle)->exists()) {
                continue;
            }
            $record = $taxonomy ? new Taxonomy : new Collection;
            $record->forceFill(['handle' => $handle, 'title' => ucfirst($handle), ...$routes]);
            foreach (Locales::all() as $locale) {
                foreach (array_keys($routes) as $attribute) {
                    $pattern = $record->routeIn($locale, $attribute);
                    $other = $pattern === null ? null : RouteConflicts::find($record, $attribute, $locale, $pattern);
                    if ($other !== null) {
                        $what = $taxonomy ? 'Topics taxonomy' : ucfirst($handle).' collection';

                        return "Can't add the demo: \"{$other}\" has the address {$pattern} in {$locale} already, which the demo's {$what} needs (".implode(', ', $routes)
                            .'). Move or delete it, then run the command again.';
                    }
                }
            }
        }

        return null;
    }

    /** Deletes what the demo makes, by handle (blueprints something else still uses are kept), and its posts in Posts. */
    private function wipe(): void
    {
        $purge = app(PurgeDeleted::class);
        foreach (Collection::withTrashed()->whereIn('handle', self::COLLECTIONS)->get() as $collection) {
            if (! $collection->trashed()) {
                app(DeleteCollection::class)->handle($collection);
            }
            $purge->collection($collection);
        }
        $posts = Collection::query()->where('handle', self::POSTS_COLLECTION)->first();
        if ($posts !== null) {
            $ids = EntryTranslation::query()->where('collection_id', $posts->id)
                ->where(fn ($q) => $q->whereIn('slug', array_column(self::POSTS, 0))->orWhereIn('draft_slug', array_column(self::POSTS, 0)))
                ->pluck('entry_id')->unique()->all();
            foreach (Entry::withTrashed()->whereIn('id', $ids)->get() as $entry) {
                $entry->setRelation('collection', $posts);
                if (! $entry->trashed()) {
                    $entry->delete();
                }
                app(ForceDeleteEntry::class)->handle($entry, force: true);
            }
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
        $delete = app(DeleteBlueprint::class);
        foreach (Blueprint::query()->whereIn('handle', self::BLUEPRINTS)->get() as $blueprint) {
            // The installer's "post", say, while its Posts use it.
            if ($delete->usedBy($blueprint) === []) {
                $delete->handle($blueprint);
            }
        }
        foreach (Fieldset::query()->whereIn('handle', self::FIELDSETS)->get() as $fieldset) {
            app(DeleteFieldset::class)->handle($fieldset);
        }
    }

    /**
     * The demo's structure; with $posts, without the Blog, its "post"
     * blueprint and the fieldsets of its sections, the Topics on Posts.
     *
     * @return array<string, mixed>
     */
    private function structure(bool $posts): array
    {
        $field = fn (string $handle, string $type, array $config = [], array $extra = []): array => ['handle' => $handle, 'type' => $type, 'config' => $config, ...$extra];
        // The form's thank-you message in the site's main language, translated into the other.
        [$main, $other] = Locales::default() === 'id' ? ['id', 'en'] : ['en', 'id'];
        $thanks = ['en' => 'Thank you, we got your message.', 'id' => 'Terima kasih, pesan Anda sudah kami terima.'];

        return [
            'fieldsets' => $posts ? [] : [
                ['handle' => 'text_block', 'title' => 'Text', 'fields' => [$field('body', 'rich_text')]],
                ['handle' => 'quote_block', 'title' => 'Quote', 'fields' => [$field('quote', 'textarea', [], ['required' => true]), $field('author', 'text')]],
            ],
            'blueprints' => [
                ['handle' => 'page', 'title' => 'Page', 'fields' => [$field('intro', 'textarea'), $field('body', 'rich_text')]],
                ...($posts ? [] : [['handle' => 'post', 'title' => 'Blog post', 'fields' => [
                    $field('intro', 'textarea'),
                    $field('sections', 'flexible', ['blocks' => self::FIELDSETS]),
                    $field('related', 'entries', ['collections' => ['blog'], 'multiple' => true, 'max' => 3], ['translatable' => false]),
                ]]]),
                ['handle' => 'topic', 'title' => 'Topic', 'fields' => [$field('description', 'textarea')]],
                ['handle' => 'site_info', 'title' => 'Site info', 'fields' => [$field('tagline', 'text'), $field('email', 'text', [], ['validation' => ['email'], 'translatable' => false])]],
                ['handle' => 'contact_form', 'title' => 'Contact form', 'fields' => [
                    $field('name', 'text', [], ['required' => true]),
                    $field('email', 'text', [], ['required' => true, 'validation' => ['email']]),
                    $field('message', 'textarea', [], ['required' => true]),
                ]],
            ],
            'collections' => [
                ['handle' => 'pages', 'title' => 'Pages', 'blueprint' => 'page', 'hierarchical' => true, 'ordered' => true, ...self::ROUTES['pages']],
                ...($posts ? [] : [['handle' => 'blog', 'title' => 'Blog', 'blueprint' => 'post', 'dated' => true, ...self::ROUTES['blog'], 'listing_blueprint' => 'page', 'per_page' => 5,
                    'listings' => ['en' => ['intro' => 'News, guides and tutorials.'], 'id' => ['intro' => 'Berita, panduan dan tutorial.']]]]),
            ],
            'taxonomies' => [
                ['handle' => 'topics', 'title' => 'Topics', 'hierarchical' => true, ...self::ROUTES['topics'], 'blueprint' => 'topic', 'collections' => [$posts ? self::POSTS_COLLECTION : 'blog']],
            ],
            'terms' => [
                $this->term('news', 'News', 'Berita', null),
                $this->term('local', 'Local', 'Lokal', 'news'),
                $this->term('guides', 'Guides', 'Panduan', null),
                $this->term('tutorials', 'Tutorials', 'Tutorial', 'guides'),
            ],
            'globals' => [
                // The email isn't translated: each language has it, for a site whose main language is either.
                ['handle' => 'site', 'title' => 'Site info', 'blueprint' => 'site_info', 'values' => [
                    'en' => ['tagline' => 'A small demo site', 'email' => 'hello@example.com'],
                    'id' => ['tagline' => 'Situs demo kecil', 'email' => 'hello@example.com'],
                ]],
            ],
            'forms' => [
                ['handle' => 'contact', 'title' => 'Contact', 'blueprint' => 'contact_form', 'message' => $thanks[$main], 'translations' => [$other => ['message' => $thanks[$other]]]],
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
     * The pages and posts, the posts with a topic each: in the Blog with
     * flexible sections, or with $posts in Posts, in its "post"
     * blueprint's fields (the intro as the excerpt, the sections' text and
     * quote as the body).
     *
     * @return list<array<string, mixed>>
     */
    private function entries(bool $posts): array
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
        $data = fn (string $intro, string $text, string $quote): array => $posts
            ? ['excerpt' => $intro, 'body' => '<p>'.e($text).'</p><blockquote><p>'.e($quote).'</p><p>Rina</p></blockquote>']
            : ['intro' => $intro, 'sections' => [
                ['type' => 'text_block', 'values' => ['body' => '<p>'.e($text).'</p>']],
                ['type' => 'quote_block', 'values' => ['quote' => $quote, 'author' => 'Rina']],
            ]];
        foreach (self::POSTS as $i => [$slug, $en, $id, $topic]) {
            $entries[] = ['collection' => $posts ? self::POSTS_COLLECTION : 'blog', 'slug' => $slug, 'terms' => ['topics' => [$topic]], 'translations' => [
                'en' => ['title' => $en, 'slug' => $slug, 'published' => $i < 7, 'data' => $data("{$en}, in a few words.", "The story of {$en}.", 'Small steps, every day.')],
                'id' => ['title' => $id, 'slug' => $slug, 'published' => $i < 7, 'data' => $data("{$id}, singkatnya.", "Kisah tentang {$id}.", 'Langkah kecil, setiap hari.')],
            ]];
        }

        return $entries;
    }

    /** @return list<array<string, mixed>> */
    private function menus(bool $posts): array
    {
        return [['handle' => 'main', 'title' => 'Main menu', 'items' => [
            ['entry' => 'pages/home', 'labels' => [], 'children' => []],
            ['entry' => 'pages/about', 'labels' => [], 'children' => [['entry' => 'pages/team', 'labels' => []]]],
            // The posts' listing page (/blog), with two of their topics.
            ['collection' => $posts ? self::POSTS_COLLECTION : 'blog', 'labels' => ['en' => 'Blog', 'id' => 'Blog'], 'children' => [
                ['term' => 'topics/news', 'labels' => []],
                ['term' => 'topics/guides', 'labels' => []],
            ]],
            ['entry' => 'pages/contact', 'labels' => []],
        ]]];
    }
}
