<?php

declare(strict_types=1);

namespace Workbench\Database\Seeders;

use Closure;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Sunrice\Actions\Assets\CreateFolder;
use Sunrice\Actions\Assets\UpdateAssetMeta;
use Sunrice\Actions\Assets\UploadAsset;
use Sunrice\Actions\Collections\SaveListing;
use Sunrice\Actions\Comments\ModerateComment;
use Sunrice\Actions\Comments\PostComment;
use Sunrice\Actions\Entries\CreateEntry;
use Sunrice\Actions\Entries\EnsureTranslation;
use Sunrice\Actions\Entries\PublishTranslation;
use Sunrice\Actions\Entries\SaveDraft;
use Sunrice\Actions\Entries\SetEntryParent;
use Sunrice\Actions\Entries\SyncEntryTerms;
use Sunrice\Actions\Forms\SubmitForm;
use Sunrice\Actions\Globals\SaveGlobalValues;
use Sunrice\Actions\Settings\SaveSiteSettings;
use Sunrice\Actions\Structure\SaveCollection;
use Sunrice\Actions\Taxonomies\SaveTerm;
use Sunrice\Activity\ActivityLogger;
use Sunrice\Database\Seeders\RolesSeeder;
use Sunrice\Facades\Sunrice;
use Sunrice\Models\ActivityLog;
use Sunrice\Models\Asset;
use Sunrice\Models\AssetFolder;
use Sunrice\Models\Collection;
use Sunrice\Models\Comment;
use Sunrice\Models\Entry;
use Sunrice\Models\EntryTranslation;
use Sunrice\Models\Form;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\Taxonomy;
use Sunrice\Models\Term;
use Workbench\App\Models\User;

/**
 * Demo content for the user guide's screenshots: a small, tidy company
 * site ("Kopi Kita Studio", a fictional design studio in Jakarta) in
 * English with Indonesian translations.
 *
 * Everything goes through Sunrice's own actions while "signed in" as the
 * seeded people at dates spread over the past months, so revisions, the
 * activity log, the dashboard and permissions look like a site in use.
 *
 *     php vendor/bin/testbench workbench:build
 *     php vendor/bin/testbench db:seed --class='Workbench\Database\Seeders\GuideDemoSeeder'
 *
 * Run it once on a fresh workbench (it stops when the content exists).
 */
class GuideDemoSeeder extends Seeder
{
    protected Carbon $today;

    protected User $admin;

    protected User $sari;

    protected User $budi;

    protected User $maya;

    /** @var array<string, Asset> */
    protected array $assets = [];

    /** @var array<string, Term> */
    protected array $terms = [];

    /** @var array<string, Entry> */
    protected array $pages = [];

    /** @var array<string, Entry> */
    protected array $articles = [];

    public function run(): void
    {
        if (Collection::withTrashed()->where('handle', 'articles')->exists()) {
            $this->command?->warn('Guide demo content already exists. Rebuild the workbench first: php vendor/bin/testbench workbench:build');

            return;
        }

        $this->today = Carbon::now();
        $this->admin = User::query()->where('email', 'admin@example.com')->firstOrFail();
        // What the install wrote (the admin user and role) belongs before everything else.
        $installed = ActivityLog::query()->pluck('id')->all();

        try {
            $this->settings();
            $this->structure();
            $this->people();
            $this->media();
            $this->pagesAndTeam();
            $this->navigationAndGlobals();
            $this->taxonomyTerms();
            $this->publishedArticles();
            $this->comments();
            $this->submissions();
            $this->recentWork();
        } finally {
            Carbon::setTestNow();
            Auth::guard($this->guard())->forgetUser();
            app(ActivityLogger::class)->reset();
        }

        ActivityLog::query()->whereKey($installed)->update(['created_at' => Carbon::now()->subDays(171)->setTime(16, 45)]);

        $this->command?->info('Guide demo content seeded: log in at /cms as admin@example.com / password.');
    }

    // ---- Steps -------------------------------------------------------------

    protected function settings(): void
    {
        $this->act($this->admin, 170, '09:12', fn () => app(SaveSiteSettings::class)->handle($this->siteSettings()));
    }

    protected function structure(): void
    {
        $this->act($this->admin, 170, '09:40', fn () => Sunrice::importStructure([
            'fieldsets' => [
                ['handle' => 'hero', 'title' => 'Hero', 'fields' => [
                    ['handle' => 'heading', 'type' => 'text', 'label' => 'Heading', 'required' => true],
                    ['handle' => 'text', 'type' => 'textarea', 'label' => 'Text'],
                    ['handle' => 'image', 'type' => 'asset', 'label' => 'Image'],
                    ['handle' => 'button', 'type' => 'link', 'label' => 'Button'],
                ]],
                ['handle' => 'text_block', 'title' => 'Text block', 'fields' => [
                    ['handle' => 'heading', 'type' => 'text', 'label' => 'Heading'],
                    ['handle' => 'body', 'type' => 'rich_text', 'label' => 'Body'],
                ]],
                ['handle' => 'feature_list', 'title' => 'Feature list', 'fields' => [
                    ['handle' => 'heading', 'type' => 'text', 'label' => 'Heading'],
                    ['handle' => 'items', 'type' => 'repeater', 'label' => 'Items', 'config' => ['fields' => [
                        ['handle' => 'title', 'type' => 'text', 'label' => 'Title', 'required' => true],
                        ['handle' => 'description', 'type' => 'textarea', 'label' => 'Description'],
                    ]]],
                ]],
            ],
            'blueprints' => [
                ['handle' => 'page', 'title' => 'Page', 'fields' => [
                    ['handle' => 'intro', 'type' => 'textarea', 'label' => 'Intro', 'instructions' => 'One or two sentences under the page title.'],
                    ['handle' => 'sections', 'type' => 'flexible', 'label' => 'Sections', 'config' => ['fieldsets' => ['hero', 'text_block', 'feature_list']]],
                ]],
                ['handle' => 'article', 'title' => 'Article', 'fields' => [
                    ['handle' => 'summary', 'type' => 'textarea', 'label' => 'Summary', 'required' => true, 'instructions' => 'Shown on the blog page and in search results.'],
                    ['handle' => 'featured_image', 'type' => 'asset', 'label' => 'Featured image'],
                    ['handle' => 'body', 'type' => 'rich_text', 'label' => 'Body'],
                    ['handle' => 'reading_time', 'type' => 'number', 'label' => 'Reading time', 'instructions' => 'In minutes.', 'config' => ['min' => 1, 'max' => 60]],
                ]],
                ['handle' => 'team_member', 'title' => 'Team member', 'fields' => [
                    ['handle' => 'role', 'type' => 'text', 'label' => 'Role', 'required' => true],
                    ['handle' => 'photo', 'type' => 'asset', 'label' => 'Photo'],
                    ['handle' => 'bio', 'type' => 'textarea', 'label' => 'Short bio'],
                    ['handle' => 'email', 'type' => 'text', 'label' => 'Email', 'translatable' => false],
                ]],
                ['handle' => 'blog_listing', 'title' => 'Blog listing', 'fields' => [
                    ['handle' => 'subscribe_text', 'type' => 'textarea', 'label' => 'Newsletter text'],
                ]],
                ['handle' => 'category', 'title' => 'Category', 'fields' => [
                    ['handle' => 'description', 'type' => 'textarea', 'label' => 'Description'],
                ]],
                ['handle' => 'company', 'title' => 'Company', 'fields' => [
                    ['handle' => 'company_name', 'type' => 'text', 'label' => 'Company name', 'translatable' => false],
                    ['handle' => 'tagline', 'type' => 'text', 'label' => 'Tagline'],
                    ['handle' => 'email', 'type' => 'text', 'label' => 'Email', 'translatable' => false],
                    ['handle' => 'phone', 'type' => 'text', 'label' => 'Phone', 'translatable' => false],
                    ['handle' => 'address', 'type' => 'textarea', 'label' => 'Address', 'translatable' => false],
                    ['handle' => 'opening_hours', 'type' => 'text', 'label' => 'Opening hours'],
                    ['handle' => 'social', 'type' => 'repeater', 'label' => 'Social links', 'translatable' => false, 'config' => ['fields' => [
                        ['handle' => 'network', 'type' => 'select', 'label' => 'Network', 'config' => ['options' => [
                            ['value' => 'instagram', 'label' => 'Instagram'],
                            ['value' => 'linkedin', 'label' => 'LinkedIn'],
                            ['value' => 'behance', 'label' => 'Behance'],
                            ['value' => 'dribbble', 'label' => 'Dribbble'],
                        ]]],
                        ['handle' => 'url', 'type' => 'text', 'label' => 'URL'],
                    ]]],
                ]],
                ['handle' => 'footer', 'title' => 'Footer', 'fields' => [
                    ['handle' => 'note', 'type' => 'textarea', 'label' => 'Footer note'],
                    ['handle' => 'copyright', 'type' => 'text', 'label' => 'Copyright line'],
                    ['handle' => 'show_newsletter', 'type' => 'toggle', 'label' => 'Show newsletter sign-up'],
                ]],
            ],
            'taxonomies' => [
                ['handle' => 'categories', 'title' => 'Categories', 'blueprint' => 'category',
                    'settings' => ['has_archive' => true, 'route' => '/blog/category/{slug}', 'titles' => ['id' => 'Kategori']]],
                ['handle' => 'tags', 'title' => 'Tags',
                    'settings' => ['has_archive' => true, 'route' => '/blog/tag/{slug}', 'titles' => ['id' => 'Tag']]],
            ],
            'collections' => [
                ['handle' => 'pages', 'title' => 'Pages', 'blueprint' => 'page', 'settings' => [
                    'route' => '/{slug}', 'has_single' => true, 'hierarchical' => true, 'translatable' => true,
                    'sort' => 'manual', 'icon' => 'file-text', 'titles' => ['id' => 'Halaman'],
                ]],
                ['handle' => 'articles', 'title' => 'Articles', 'blueprint' => 'article', 'archive_blueprint' => 'blog_listing',
                    'taxonomies' => ['categories', 'tags'], 'settings' => [
                        'route' => '/blog/{slug}', 'has_single' => true, 'has_archive' => true, 'archive_route' => '/blog',
                        'comments' => true, 'translatable' => true, 'per_page' => 9, 'icon' => 'newspaper',
                        'titles' => ['id' => 'Artikel'],
                        'seo' => ['description_field' => 'summary', 'image_field' => 'featured_image'],
                    ]],
                ['handle' => 'team', 'title' => 'Team members', 'blueprint' => 'team_member', 'settings' => [
                    'has_single' => false, 'translatable' => true, 'sort' => 'manual', 'icon' => 'users',
                    'titles' => ['id' => 'Anggota tim'],
                ]],
            ],
            'globals' => [
                ['handle' => 'company', 'title' => 'Company', 'blueprint' => 'company', 'group' => 'global'],
                ['handle' => 'footer', 'title' => 'Footer', 'blueprint' => 'footer', 'group' => 'template_part'],
            ],
            'forms' => [
                ['handle' => 'contact', 'title' => 'Contact', 'fields' => [
                    ['handle' => 'name', 'type' => 'text', 'label' => 'Name', 'required' => true],
                    ['handle' => 'email', 'type' => 'text', 'label' => 'Email', 'required' => true, 'validation' => ['email']],
                    ['handle' => 'subject', 'type' => 'select', 'label' => 'Subject', 'required' => true, 'config' => ['options' => [
                        ['value' => 'project', 'label' => 'A new project'],
                        ['value' => 'question', 'label' => 'A general question'],
                        ['value' => 'careers', 'label' => 'Working at Kopi Kita'],
                        ['value' => 'press', 'label' => 'Press and speaking'],
                    ]]],
                    ['handle' => 'message', 'type' => 'textarea', 'label' => 'Message', 'required' => true],
                ], 'settings' => [
                    'success_message' => 'Thank you! We usually reply within one working day.',
                    'notify_emails' => 'hello@kopikita.studio',
                ]],
                ['handle' => 'newsletter', 'title' => 'Newsletter sign-up', 'fields' => [
                    ['handle' => 'email', 'type' => 'text', 'label' => 'Email', 'required' => true, 'validation' => ['email']],
                ], 'settings' => [
                    'success_message' => 'You are on the list. See you in your inbox!',
                ]],
            ],
        ]));

        // One category per article (a setting that needs the taxonomy's id).
        $this->act($this->admin, 170, '09:55', function (): void {
            $articles = Collection::query()->where('handle', 'articles')->firstOrFail();
            $categories = Taxonomy::query()->where('handle', 'categories')->firstOrFail();
            app(SaveCollection::class)->handle([
                'title' => $articles->title,
                'settings' => ['single_term_taxonomies' => [$categories->id]],
            ], $articles);
        });

        $this->act($this->admin, 170, '10:05', fn () => app(RolesSeeder::class)->run());
    }

    protected function people(): void
    {
        $this->act($this->admin, 169, '08:50', function (): void {
            $this->sari = $this->user('Sari Wijaya', 'sari@kopikita.studio', 'Editor');
            $this->budi = $this->user('Budi Santoso', 'budi@kopikita.studio', 'Author');
            $this->maya = $this->user('Maya Putri', 'maya@kopikita.studio', 'Translator');
        });
    }

    protected function media(): void
    {
        $this->act($this->admin, 168, '11:20', function (): void {
            $brand = app(CreateFolder::class)->handle('Brand');
            $this->upload('logo-mark', 'Logo mark', 'Kopi Kita Studio logo mark', $brand, ['#2f2a26', '#c8875a', '#f3e6d5'], 1200, 1200, 'mark');
            $this->upload('brand-pattern', 'Brand pattern', 'Warm abstract brand pattern', $brand, ['#f3e6d5', '#d9a679', '#7d4f37']);
            $this->upload('studio-share-image', 'Default share image', 'Soft caramel gradient with circles', $brand, ['#e9d8c4', '#b9774f', '#3e2c23']);
        });

        $this->act($this->sari, 166, '14:05', function (): void {
            $team = app(CreateFolder::class)->handle('Team');
            $this->upload('rina-hartono', 'Rina Hartono', 'Portrait of Rina Hartono', $team, ['#f6e7da', '#d08c60', '#5b3a29'], 900, 1100, 'portrait');
            $this->upload('adi-nugroho', 'Adi Nugroho', 'Portrait of Adi Nugroho', $team, ['#e3eee9', '#6f9f8c', '#2d4a40'], 900, 1100, 'portrait');
            $this->upload('dewi-lestari', 'Dewi Lestari', 'Portrait of Dewi Lestari', $team, ['#f1e4ef', '#b07aa1', '#4c2f45'], 900, 1100, 'portrait');
            $this->upload('fajar-pratama', 'Fajar Pratama', 'Portrait of Fajar Pratama', $team, ['#e2e8f3', '#6d86b5', '#26324d'], 900, 1100, 'portrait');
            app(CreateFolder::class)->handle('Blog');
        });
    }

    protected function pagesAndTeam(): void
    {
        $this->act($this->sari, 165, '10:30', function (): void {
            $this->pages['home'] = $this->entry('pages', 'Home', 'home', [
                'intro' => 'Kopi Kita Studio is a small design studio in Jakarta. We help local businesses look as good as the work they do.',
                'sections' => [
                    $this->block('hero', [
                        'heading' => 'Brands and websites with a warm heart',
                        'text' => 'Strategy, identity and digital design for cafés, makers and growing companies across Indonesia.',
                        'image' => $this->assets['brand-pattern']->id,
                        'button' => ['type' => 'url', 'url' => '/services', 'label' => 'See what we do'],
                    ]),
                    $this->block('feature_list', [
                        'heading' => 'What we are good at',
                        'items' => [
                            ['title' => 'Brand identity', 'description' => 'Names, logos, colour and type systems that feel like you.'],
                            ['title' => 'Websites', 'description' => 'Fast, accessible sites your team can update themselves.'],
                            ['title' => 'Packaging', 'description' => 'Labels and boxes that stand out on a crowded shelf.'],
                        ],
                    ]),
                ],
            ], $this->sari);
            $this->publish($this->pages['home']);

            $this->pages['about'] = $this->entry('pages', 'About', 'about', [
                'intro' => 'Founded in 2019 above a coffee shop in Kemang, we are now a team of four designers and one very patient developer.',
                'sections' => [
                    $this->block('text_block', [
                        'heading' => 'Our story',
                        'body' => '<p>Kopi Kita started as a side project: a logo for a friend\'s coffee cart. Word spread, more cafés asked, and the side project became a studio.</p><p>We still work the same way. We listen first, sketch a lot, and stay with our clients long after launch day.</p>',
                    ]),
                ],
            ], $this->sari);
            $this->publish($this->pages['about']);

            $this->pages['team'] = $this->entry('pages', 'Team', 'team', [
                'intro' => 'Meet the people behind the work.',
            ], $this->sari, $this->pages['about']);
            $this->publish($this->pages['team']);

            $this->pages['services'] = $this->entry('pages', 'Services', 'services', [
                'intro' => 'From a first logo to a full website, we offer a small set of services and do them well.',
                'sections' => [
                    $this->block('feature_list', [
                        'heading' => 'Services',
                        'items' => [
                            ['title' => 'Brand workshops', 'description' => 'A half-day session to find what makes your business different.'],
                            ['title' => 'Visual identity', 'description' => 'Logo, colours, typography and a short brand guide.'],
                            ['title' => 'Website design and build', 'description' => 'Designed in Figma, built on Sunrice CMS, handed over with training.'],
                            ['title' => 'Ongoing support', 'description' => 'A few hours a month for updates, campaigns and new pages.'],
                        ],
                    ]),
                ],
            ], $this->sari);
            $this->publish($this->pages['services']);

            $this->pages['contact'] = $this->entry('pages', 'Contact', 'contact', [
                'intro' => 'Tell us about your project, or drop by the studio for a coffee. We reply within one working day.',
            ], $this->sari);
            $this->publish($this->pages['contact']);

            $this->pages['privacy'] = $this->entry('pages', 'Privacy policy', 'privacy-policy', [
                'intro' => 'How we handle the information you send us.',
                'sections' => [
                    $this->block('text_block', [
                        'body' => '<p>We only use the details you send through our forms to reply to you. We never sell or share them, and we delete old messages after two years.</p>',
                    ]),
                ],
            ], $this->sari);
            $this->publish($this->pages['privacy']);
        });

        $this->act($this->sari, 165, '15:10', function (): void {
            $team = [
                ['Rina Hartono', 'Founder & Creative Director', 'rina-hartono', 'Rina has designed brands for more than forty cafés and still drinks too much of their coffee.', 'rina@kopikita.studio'],
                ['Adi Nugroho', 'Lead Designer', 'adi-nugroho', 'Adi loves type, grids and the moment a logo finally clicks.', 'adi@kopikita.studio'],
                ['Dewi Lestari', 'UX Researcher', 'dewi-lestari', 'Dewi talks to customers so our clients don\'t have to guess.', 'dewi@kopikita.studio'],
                ['Fajar Pratama', 'Web Developer', 'fajar-pratama', 'Fajar turns designs into fast, accessible websites.', 'fajar@kopikita.studio'],
            ];
            foreach ($team as [$name, $role, $slug, $bio, $email]) {
                $member = $this->entry('team', $name, $slug, [
                    'role' => $role, 'photo' => $this->assets[$slug]->id, 'bio' => $bio, 'email' => $email,
                ], $this->sari);
                $this->publish($member);
            }
        });

        $this->act($this->admin, 164, '09:30', fn () => app(SaveSiteSettings::class)->handle([
            ...$this->siteSettings(),
            'homepage_entry_id' => $this->pages['home']->id,
        ]));

        // Indonesian versions of the main pages.
        $this->act($this->maya, 160, '13:40', function (): void {
            $this->translate($this->pages['home'], 'Beranda', 'beranda', [
                'intro' => 'Kopi Kita Studio adalah studio desain kecil di Jakarta. Kami membantu bisnis lokal tampil sebaik karya mereka.',
            ], 'ready');
            $this->translate($this->pages['about'], 'Tentang kami', 'tentang-kami', [
                'intro' => 'Berdiri pada 2019 di atas sebuah kedai kopi di Kemang, kini kami adalah tim berisi empat desainer dan satu developer yang sangat sabar.',
            ], 'ready');
        });
        $this->act($this->sari, 159, '09:15', function (): void {
            $this->publishTranslation($this->pages['home'], 'id');
            $this->publishTranslation($this->pages['about'], 'id');
        });
    }

    protected function navigationAndGlobals(): void
    {
        $this->act($this->sari, 163, '10:00', fn () => Sunrice::importStructure(['menus' => [
            ['handle' => 'main', 'title' => 'Main menu', 'items' => [
                ['type' => 'entry', 'target' => 'pages/home', 'labels' => ['en' => 'Home', 'id' => 'Beranda']],
                ['type' => 'entry', 'target' => 'pages/about', 'labels' => ['en' => 'About', 'id' => 'Tentang kami'], 'children' => [
                    ['type' => 'entry', 'target' => 'pages/team', 'labels' => ['en' => 'Our team', 'id' => 'Tim kami']],
                ]],
                ['type' => 'entry', 'target' => 'pages/services', 'labels' => ['en' => 'Services', 'id' => 'Layanan']],
                ['type' => 'collection', 'target' => 'articles', 'labels' => ['en' => 'Blog', 'id' => 'Blog']],
                ['type' => 'entry', 'target' => 'pages/contact', 'labels' => ['en' => 'Contact', 'id' => 'Kontak']],
            ]],
            ['handle' => 'footer', 'title' => 'Footer links', 'items' => [
                ['type' => 'entry', 'target' => 'pages/privacy-policy', 'labels' => ['en' => 'Privacy policy', 'id' => 'Kebijakan privasi']],
                ['type' => 'url', 'url' => 'https://www.instagram.com/', 'labels' => ['en' => 'Instagram'], 'new_tab' => true],
                ['type' => 'url', 'url' => 'https://www.linkedin.com/', 'labels' => ['en' => 'LinkedIn'], 'new_tab' => true],
                ['type' => 'entry', 'target' => 'pages/contact', 'labels' => ['en' => 'Get in touch', 'id' => 'Hubungi kami']],
            ]],
        ]]));

        $this->act($this->sari, 163, '11:25', function (): void {
            app(SaveGlobalValues::class)->handle(GlobalSet::query()->where('handle', 'company')->firstOrFail(), ['values' => [
                'company_name' => 'Kopi Kita Studio',
                'tagline' => 'Brands and websites with a warm heart',
                'email' => 'hello@kopikita.studio',
                'phone' => '+62 21 7180 2244',
                'address' => "Jl. Kemang Raya No. 18, Lantai 2\nJakarta Selatan 12730\nIndonesia",
                'opening_hours' => 'Monday to Friday, 9:00–17:00',
                'social' => [
                    ['network' => 'instagram', 'url' => 'https://www.instagram.com/'],
                    ['network' => 'linkedin', 'url' => 'https://www.linkedin.com/'],
                    ['network' => 'behance', 'url' => 'https://www.behance.net/'],
                ],
            ]]);
            app(SaveGlobalValues::class)->handle(GlobalSet::query()->where('handle', 'footer')->firstOrFail(), ['values' => [
                'note' => 'Made with care (and a lot of coffee) in Jakarta.',
                'copyright' => '© Kopi Kita Studio. All rights reserved.',
                'show_newsletter' => true,
            ]]);
        });

        $this->act($this->maya, 160, '14:20', function (): void {
            $company = GlobalSet::query()->where('handle', 'company')->firstOrFail();
            app(SaveGlobalValues::class)->handle($company, ['locale' => 'id', 'values' => [
                'tagline' => 'Merek dan situs web yang hangat',
                'opening_hours' => 'Senin sampai Jumat, 09.00–17.00',
            ]]);
            app(SaveGlobalValues::class)->handle(GlobalSet::query()->where('handle', 'footer')->firstOrFail(), ['locale' => 'id', 'values' => [
                'note' => 'Dibuat dengan sepenuh hati (dan banyak kopi) di Jakarta.',
                'copyright' => '© Kopi Kita Studio. Hak cipta dilindungi.',
            ]]);
        });

        $this->act($this->sari, 158, '16:00', fn () => app(SaveListing::class)->handle(
            Collection::query()->where('handle', 'articles')->firstOrFail(),
            ['locale' => 'en', 'title' => 'Blog', 'intro' => 'Notes from the studio: guides, news and events.', 'data' => [
                'subscribe_text' => 'One email a month with our newest articles. No spam, ever.',
            ]],
        ));
    }

    protected function taxonomyTerms(): void
    {
        $this->act($this->sari, 162, '09:45', function (): void {
            $categories = Taxonomy::query()->where('handle', 'categories')->firstOrFail();
            foreach ([
                'news' => ['News', 'Berita', 'Studio news, new clients and launches.'],
                'guides' => ['Guides', 'Panduan', 'Practical advice on branding, design and the web.'],
                'events' => ['Events', 'Acara', 'Workshops, talks and open studio evenings.'],
            ] as $slug => [$en, $id, $description]) {
                $this->terms[$slug] = app(SaveTerm::class)->handle($categories, ['translations' => [
                    'en' => ['title' => $en, 'slug' => $slug, 'data' => ['description' => $description]],
                ]]);
            }

            $tags = Taxonomy::query()->where('handle', 'tags')->firstOrFail();
            foreach ([
                'branding' => 'Branding', 'ux-design' => 'UX design', 'typography' => 'Typography',
                'process' => 'Process', 'community' => 'Community', 'studio-life' => 'Studio life',
            ] as $slug => $name) {
                $this->terms[$slug] = app(SaveTerm::class)->handle($tags, ['translations' => ['en' => ['title' => $name, 'slug' => $slug]]]);
            }
        });

        $this->act($this->maya, 160, '15:05', function (): void {
            $categories = Taxonomy::query()->where('handle', 'categories')->firstOrFail();
            foreach (['news' => ['Berita', 'berita'], 'guides' => ['Panduan', 'panduan'], 'events' => ['Acara', 'acara']] as $key => [$name, $slug]) {
                $term = $this->terms[$key];
                $main = $term->mainTranslation();
                app(SaveTerm::class)->handle($categories, ['translations' => [
                    'en' => ['title' => $main->name, 'slug' => $main->slug, 'data' => $main->data],
                    'id' => ['title' => $name, 'slug' => $slug, 'data' => $main->data],
                ]], $term);
            }
        });
    }

    protected function publishedArticles(): void
    {
        foreach ($this->articleDefinitions() as $key => $article) {
            if (($article['state'] ?? 'published') !== 'published') {
                continue;
            }
            [$written, $published] = $article['days'];
            $author = $article['author'] === 'budi' ? $this->budi : $this->sari;

            $this->act($author, $written, '10:20', function () use ($key, $article, $author): void {
                $this->upload($key, $article['image_title'], $article['image_alt'], $this->folder('Blog'), $article['palette'], uploader: $author);
                $this->articles[$key] = $this->entry('articles', $article['title'], $article['slug'], [
                    'summary' => $article['summary'],
                    'featured_image' => $this->assets[$key]->id,
                    'body' => $article['body'],
                    'reading_time' => $article['minutes'],
                ], $author);
            });

            $this->act($this->sari, $published, '09:05', function () use ($key, $article): void {
                app(SyncEntryTerms::class)->handle($this->articles[$key], array_map(fn (string $t) => $this->terms[$t]->id, $article['terms']));
                $this->publish($this->articles[$key]);
            });

            if (isset($article['id'])) {
                [$state, $title, $slug, $summary] = $article['id'];
                $this->act($this->maya, $published - 2, '14:30', fn () => $this->translate($this->articles[$key], $title, $slug, ['summary' => $summary], $state === 'draft' ? 'draft' : 'ready'));
                if ($state === 'published') {
                    $this->act($this->sari, $published - 3, '09:40', fn () => $this->publishTranslation($this->articles[$key], 'id'));
                }
            }
        }
    }

    protected function comments(): void
    {
        $guest = fn (string $key, string $name, string $email, string $body, int $days, string $time, ?Comment $parent = null, string $locale = 'en'): Comment => $this->act(null, $days, $time, fn () => app(PostComment::class)->handle(
            $this->articles[$key],
            ['body' => $body, 'author_name' => $name, 'author_email' => $email, 'parent_id' => $parent?->id],
            null,
            ['ip' => '203.0.113.'.random_int(10, 200), 'user_agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15', 'locale' => $locale],
        ));
        $approve = fn (Comment $comment, int $days, string $time) => $this->act($this->sari, $days, $time, fn () => app(ModerateComment::class)->handle($comment, 'approve'));

        // A thread on the brand colours guide.
        $c1 = $guest('colours', 'Putu Ardana', 'putu.ardana@example.com', 'This is so useful. We are rebranding our guesthouse in Ubud and kept arguing about greens. The tip about testing colours on the actual signage material saved us a costly mistake!', 128, '20:14');
        $approve($c1, 127, '08:55');
        $this->act($this->sari, 127, '09:02', fn () => app(PostComment::class)->handle($this->articles['colours'], [
            'body' => 'Thank you, Putu! Greens are tricky outdoors: they shift a lot in direct sun. Share a photo when the new sign is up, we would love to see it.',
            'parent_id' => $c1->id,
        ], $this->sari));
        $c2 = $guest('colours', 'Laura Chen', 'laura.chen@example.com', 'Do you have a favourite tool for checking contrast? I usually just eyeball it, which I know is wrong.', 126, '11:37');
        $approve($c2, 126, '13:10');
        $c3 = $guest('colours', 'Hendra Gunawan', 'hendra.g@example.com', 'Not the author, but I use the contrast checker built into Figma. It shows the WCAG level right away.', 125, '16:48', $c2);
        $approve($c3, 125, '17:20');

        // Comments on the design sprint article, one in Indonesian.
        $c4 = $guest('sprint', 'Nadia Rahman', 'nadia@example.com', 'We tried your two-day format with our product team last week. Day two felt rushed, but the prototype we tested was miles better than our usual specs.', 72, '19:05');
        $approve($c4, 71, '09:30');
        $c5 = $guest('sprint', 'Agus Setiawan', 'agus.setiawan@example.com', 'Artikel yang bagus! Apakah ada template untuk jadwal sprint dua hari ini?', 70, '07:42', null, 'id');
        $approve($c5, 70, '10:15');

        // The award news.
        $c6 = $guest('award', 'Rizky Maulana', 'rizky.m@example.com', 'Congratulations to the whole team, well deserved. The Warung Senja identity is still my favourite.', 53, '12:26');
        $approve($c6, 53, '14:00');

        // Waiting for moderation, and one spam message.
        $guest('microcopy', 'Tomás Herrera', 'tomas.h@example.com', 'Great examples. Could you write a follow-up about error messages in forms? That is where we struggle most.', 1, '21:18');
        $guest('open-studio', 'Siti Aminah', 'siti.aminah@example.com', 'Sorry I missed it! Will there be another open studio evening before the end of the year?', 0, '08:03');
        $spam = $guest('award', 'Best SEO Deals', 'promo@cheap-links.example', 'Boost your website ranking fast!!! 10,000 backlinks for only $9. Visit our site now for the best deals.', 2, '03:41');
        $this->act($this->sari, 2, '08:45', fn () => app(ModerateComment::class)->handle($spam, 'spam'));
    }

    protected function submissions(): void
    {
        $contact = Form::query()->where('handle', 'contact')->firstOrFail();
        foreach ([
            [41, '10:12', 'Andi Prasetyo', 'andi@warungsenja.example', 'project', 'Hi! We are opening a second Warung Senja in Bandung in March and would like to refresh our menu design and signage. Could we set up a call next week?'],
            [29, '15:47', 'Claire Dubois', 'claire.dubois@example.com', 'press', 'I write for a design magazine in Singapore and would love to feature your work for local coffee brands. Is Rina available for a short interview?'],
            [17, '09:03', 'Yusuf Hakim', 'yusuf.hakim@example.com', 'careers', 'Are you looking for a junior designer? I graduated from ITB this year and attached a link to my portfolio in my email signature. Thank you!'],
            [9, '13:30', 'Melati Kusuma', 'melati@tokobatik.example', 'project', 'Our online batik shop needs a new website. We have around 300 products and want customers to be able to filter by region and pattern. What would a project like that cost?'],
            [4, '18:21', 'Ben Walker', 'ben.walker@example.com', 'question', 'Do you also do one-off workshops for small teams? We are five people and need help naming our new product.'],
            [1, '08:15', 'Lina Marlina', 'lina.marlina@example.com', 'project', 'Hello, we run a small bakery in Bogor and need a logo and packaging for our new cookie range. Our budget is limited but flexible.'],
        ] as [$days, $time, $name, $email, $subject, $message]) {
            $this->act(null, $days, $time, fn () => app(SubmitForm::class)->handle(
                $contact,
                ['name' => $name, 'email' => $email, 'subject' => $subject, 'message' => $message],
                ['ip' => '198.51.100.'.random_int(10, 200), 'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36', 'locale' => 'en'],
            ));
        }

        $newsletter = Form::query()->where('handle', 'newsletter')->firstOrFail();
        foreach ([[33, '07:55', 'dimas.a@example.com'], [12, '22:10', 'kartika.sari@example.com'], [3, '12:40', 'olivia.tan@example.com']] as [$days, $time, $email]) {
            $this->act(null, $days, $time, fn () => app(SubmitForm::class)->handle($newsletter, ['email' => $email], ['ip' => '192.0.2.'.random_int(10, 200), 'locale' => 'en']));
        }
    }

    /** The last few days: a draft, a scheduled article, unpublished edits and open translations. */
    protected function recentWork(): void
    {
        $definitions = $this->articleDefinitions();

        // Sari reworks the colour guide; the changes wait as a draft.
        $this->act($this->sari, 3, '15:35', function (): void {
            $translation = $this->articles['colours']->mainTranslation();
            app(SaveDraft::class)->handle($translation, [
                'title' => 'A practical guide to choosing brand colours (2026 update)',
                'slug' => $translation->slug,
                'data' => [
                    ...$translation->data,
                    'summary' => 'Updated with new examples from this year\'s projects: how to pick a palette that works on screens, signs and packaging alike.',
                ],
                'seo' => $translation->seo ?? [],
            ]);
        });

        // Budi starts an article; it isn't finished yet.
        $draft = $definitions['accessibility'];
        $this->act($this->budi, 2, '11:05', function () use ($draft): void {
            $this->upload('accessibility', $draft['image_title'], $draft['image_alt'], $this->folder('Blog'), $draft['palette'], uploader: $this->budi);
            $this->articles['accessibility'] = $this->entry('articles', $draft['title'], $draft['slug'], [
                'summary' => $draft['summary'],
                'featured_image' => $this->assets['accessibility']->id,
                'body' => $draft['body'],
                'reading_time' => $draft['minutes'],
            ], $this->budi);
            app(SyncEntryTerms::class)->handle($this->articles['accessibility'], [$this->terms['guides']->id, $this->terms['ux-design']->id]);
        });

        // Sari schedules next week's workshop announcement.
        $scheduled = $definitions['workshop'];
        $this->act($this->sari, 1, '16:20', function () use ($scheduled): void {
            $this->upload('workshop', $scheduled['image_title'], $scheduled['image_alt'], $this->folder('Blog'), $scheduled['palette']);
            $this->articles['workshop'] = $this->entry('articles', $scheduled['title'], $scheduled['slug'], [
                'summary' => $scheduled['summary'],
                'featured_image' => $this->assets['workshop']->id,
                'body' => $scheduled['body'],
                'reading_time' => $scheduled['minutes'],
            ], $this->sari);
            app(SyncEntryTerms::class)->handle($this->articles['workshop'], [$this->terms['events']->id, $this->terms['branding']->id, $this->terms['community']->id]);
            $this->publish($this->articles['workshop'], Carbon::now()->addDays(10)->setTime(9, 0));
        });
    }

    // ---- Content -----------------------------------------------------------

    /** @return array<string, array<string, mixed>> */
    protected function articleDefinitions(): array
    {
        return [
            'new-studio' => [
                'title' => 'We moved! Say hello to our new studio in Kemang',
                'slug' => 'new-studio-in-kemang',
                'summary' => 'After four years above a coffee shop we finally have room for a proper workshop table, a library and a very good espresso machine.',
                'body' => '<p>After four happy years above Kopi Tetangga, we have moved two streets down to a bright second-floor studio on Jl. Kemang Raya.</p><h2>Room to make things</h2><p>The new space has a long workshop table for client sessions, a small design library and a wall we are allowed to pin things to.</p><p>Drop by if you are in the neighbourhood. The coffee is on us.</p>',
                'minutes' => 3, 'author' => 'sari', 'days' => [152, 150], 'terms' => ['news', 'studio-life'],
                'palette' => ['#f4e9dc', '#d4a373', '#6b4226'], 'image_title' => 'New studio', 'image_alt' => 'Warm abstract shapes in caramel tones',
                'id' => ['published', 'Kami pindah! Sapa studio baru kami di Kemang', 'studio-baru-di-kemang', 'Setelah empat tahun di atas kedai kopi, akhirnya kami punya ruang untuk meja kerja besar, perpustakaan kecil, dan mesin espreso yang sangat baik.'],
            ],
            'colours' => [
                'title' => 'A practical guide to choosing brand colours',
                'slug' => 'choosing-brand-colours',
                'summary' => 'How to pick a palette that works on screens, signs and packaging alike, without falling for the colour of the year.',
                'body' => '<p>Colour is often the first thing people remember about a brand, and the first thing clients want to change.</p><h2>Start with where it will live</h2><p>A colour that glows on a phone can look muddy on recycled paper. Test every candidate on the real materials early: signage, cups, tote bags and screens.</p><h2>Fewer colours, used with confidence</h2><ul><li>One main colour people will recognise.</li><li>One or two supporting colours.</li><li>Neutrals for text and backgrounds.</li></ul><p>Finally, check contrast. Beautiful text that nobody can read helps no one.</p>',
                'minutes' => 6, 'author' => 'sari', 'days' => [133, 131], 'terms' => ['guides', 'branding', 'typography'],
                'palette' => ['#e7f0ec', '#7fb5a0', '#2f5d50'], 'image_title' => 'Brand colours', 'image_alt' => 'Soft green gradient with overlapping circles',
                'id' => ['published', 'Panduan praktis memilih warna merek', 'memilih-warna-merek', 'Cara memilih palet yang cocok untuk layar, papan nama, dan kemasan, tanpa terjebak tren warna tahunan.'],
            ],
            'design-week' => [
                'title' => 'Join us at Jakarta Design Week',
                'slug' => 'jakarta-design-week',
                'summary' => 'We are hosting a talk and a portfolio clinic at this year\'s Jakarta Design Week. Here is where to find us.',
                'body' => '<p>This year we are part of Jakarta Design Week for the first time, and we are bringing two things.</p><h2>The talk</h2><p>Rina will share what forty café brands taught us about designing for small businesses.</p><h2>Portfolio clinic</h2><p>Bring your portfolio, on paper or a laptop, and get twenty minutes of honest feedback from our designers.</p>',
                'minutes' => 2, 'author' => 'sari', 'days' => [114, 112], 'terms' => ['events', 'community'],
                'palette' => ['#fbeee6', '#e58f65', '#8c3b2a'], 'image_title' => 'Design week', 'image_alt' => 'Terracotta and peach abstract shapes',
                'id' => ['published', 'Temui kami di Jakarta Design Week', 'jakarta-design-week', 'Kami mengisi sesi bincang dan klinik portofolio di Jakarta Design Week tahun ini. Ini tempat untuk menemukan kami.'],
            ],
            'batik' => [
                'title' => 'Five lessons from redesigning a batik marketplace',
                'slug' => 'lessons-from-a-batik-marketplace',
                'summary' => 'What we learned helping an online batik shop with 300 products make browsing feel like a walk through a market.',
                'body' => '<p>When Toko Batik Nusantara asked us to redesign their shop, they had great products and a search box nobody used.</p><h2>1. Let people browse by story</h2><p>Customers wanted to explore by region and motif, not by SKU. We built the navigation around both.</p><h2>2. Photos sell, captions convince</h2><p>A two-line story about each pattern doubled the time people spent on product pages.</p><p>The other three lessons are about checkout, trust and shipping costs, and they surprised us too.</p>',
                'minutes' => 7, 'author' => 'budi', 'days' => [97, 95], 'terms' => ['guides', 'ux-design', 'process'],
                'palette' => ['#ece6f5', '#9b87c4', '#3c3163'], 'image_title' => 'Batik marketplace', 'image_alt' => 'Lavender and indigo gradient',
            ],
            'sprint' => [
                'title' => 'How we run a two-day design sprint',
                'slug' => 'two-day-design-sprint',
                'summary' => 'The classic sprint takes five days. Most small businesses can spare two. Here is our compressed version, step by step.',
                'body' => '<p>Design sprints are a great way to test an idea quickly, but five full days is a lot to ask from a small team.</p><h2>Day one: understand and sketch</h2><p>In the morning we map the problem with the client. In the afternoon everyone sketches, including the owner.</p><h2>Day two: prototype and test</h2><p>We build a clickable prototype before lunch and test it with five real customers in the afternoon.</p><blockquote><p>Five users find most of the problems. The sixth mostly confirms them.</p></blockquote>',
                'minutes' => 5, 'author' => 'budi', 'days' => [77, 75], 'terms' => ['guides', 'process', 'ux-design'],
                'palette' => ['#e6eef7', '#7aa2d6', '#28426b'], 'image_title' => 'Design sprint', 'image_alt' => 'Calm blue gradient with soft circles',
            ],
            'award' => [
                'title' => 'Our Warung Senja identity wins a Citra Pariwara award',
                'slug' => 'citra-pariwara-award',
                'summary' => 'The identity we designed for Warung Senja took silver in the brand identity category. A big thank you to the Senja team.',
                'body' => '<p>We are proud to share that our identity for Warung Senja won silver at this year\'s Citra Pariwara awards.</p><p>The project started with a single question from the owners: how do we look like a neighbourhood favourite, not a chain? The answer was hand-drawn lettering, a sunset palette and menus that read like a letter from a friend.</p><p>Thank you to the Senja family for trusting us, and to the jury for the kind words.</p>',
                'minutes' => 2, 'author' => 'sari', 'days' => [57, 55], 'terms' => ['news', 'branding'],
                'palette' => ['#fff1dc', '#f2b45a', '#9a5b13'], 'image_title' => 'Award', 'image_alt' => 'Golden sunset gradient',
                'id' => ['ready', 'Identitas Warung Senja raih penghargaan Citra Pariwara', 'penghargaan-citra-pariwara', 'Identitas yang kami rancang untuk Warung Senja meraih perak di kategori identitas merek.'],
            ],
            'microcopy' => [
                'title' => 'Writing microcopy that people actually read',
                'slug' => 'writing-microcopy',
                'summary' => 'Buttons, labels and error messages are the smallest words on a website and often the most important. A few rules we follow.',
                'body' => '<p>Microcopy is the small text that helps people do things: button labels, hints, empty states and error messages.</p><h2>Say what happens next</h2><p>"Send message" beats "Submit". "Save and continue" beats "OK".</p><h2>Write errors like a helpful friend</h2><p>Explain what went wrong and how to fix it, in plain words, right next to the field.</p><h2>Read it out loud</h2><p>If it sounds strange when you say it, it reads strange too.</p>',
                'minutes' => 4, 'author' => 'budi', 'days' => [37, 35], 'terms' => ['guides', 'ux-design'],
                'palette' => ['#f0f4e8', '#a3bd73', '#4b5e2a'], 'image_title' => 'Microcopy', 'image_alt' => 'Fresh sage gradient',
            ],
            'open-studio' => [
                'title' => 'Recap: our first open studio evening',
                'slug' => 'open-studio-recap',
                'summary' => 'Sixty guests, three short talks and a lot of kopi susu. Thank you to everyone who came by.',
                'body' => '<p>Last Friday we opened our doors for our first open studio evening, and far more of you came than we expected.</p><p>Adi showed the making of the Warung Senja lettering, Dewi ran a five-minute usability test with a volunteer from the audience, and Fajar answered every question about websites that loads fast on slow connections.</p><p>We will do it again soon. Sign up for the newsletter to hear first.</p>',
                'minutes' => 3, 'author' => 'sari', 'days' => [16, 14], 'terms' => ['events', 'community', 'studio-life'],
                'palette' => ['#fde8ec', '#e98aa0', '#7a2f43'], 'image_title' => 'Open studio', 'image_alt' => 'Rose and coral abstract shapes',
                'id' => ['draft', 'Rangkuman: malam studio terbuka pertama kami', 'rangkuman-studio-terbuka', 'Enam puluh tamu, tiga sesi singkat, dan banyak kopi susu.'],
            ],
            'accessibility' => [
                'state' => 'draft',
                'title' => 'An accessibility checklist for small business websites',
                'slug' => 'accessibility-checklist',
                'summary' => 'Ten checks you can do in an afternoon to make your website easier to use for everyone.',
                'body' => '<p>Accessibility is not only for large organisations. A few small changes help every visitor.</p><ul><li>Every image has a short description.</li><li>Text has enough contrast.</li><li>The site works with a keyboard alone.</li></ul><p>More checks coming soon.</p>',
                'minutes' => 5, 'author' => 'budi',
                'palette' => ['#e8f3f6', '#6fb3c6', '#1f5566'], 'image_title' => 'Accessibility', 'image_alt' => 'Teal gradient with circles',
            ],
            'workshop' => [
                'state' => 'scheduled',
                'title' => 'Workshop: brand basics for founders',
                'slug' => 'brand-basics-workshop',
                'summary' => 'A hands-on morning for founders who want to understand branding before hiring a designer. Limited to twelve seats.',
                'body' => '<p>Running a business leaves little time to think about your brand. This workshop gives you a morning to do exactly that.</p><h2>What you will do</h2><ul><li>Find the three words that describe your business.</li><li>Look at what your competitors do, and do differently.</li><li>Leave with a one-page brief you can give any designer.</li></ul><p>Coffee and pastries included.</p>',
                'minutes' => 2, 'author' => 'sari',
                'palette' => ['#f5ece3', '#c99b74', '#5e4232'], 'image_title' => 'Brand workshop', 'image_alt' => 'Latte-coloured gradient with shapes',
            ],
        ];
    }

    /** @return array<string, mixed> */
    protected function siteSettings(): array
    {
        return [
            'name' => 'Kopi Kita Studio',
            'description' => 'A small design studio in Jakarta making brands and websites for cafés, makers and growing companies.',
            'timezone' => 'Asia/Jakarta',
            'locales' => ['main' => 'en', 'available' => ['en', 'id'], 'names' => ['en' => 'English', 'id' => 'Bahasa Indonesia']],
            'comments' => ['moderation' => 'first_time', 'max_depth' => 3, 'rate_limit' => ['attempts' => 3, 'per_minutes' => 1]],
        ];
    }

    // ---- Helpers -----------------------------------------------------------

    /**
     * Run something as a person (null: a visitor or the system) at a time
     * some days ago, as its own "request" for the activity log.
     *
     * @template T
     *
     * @param  Closure(): T  $callback
     * @return T
     */
    protected function act(?User $user, int $daysAgo, string $time, Closure $callback): mixed
    {
        // Times are the site's local time (Settings → timezone).
        $today = $this->today->copy()->setTimezone(date_default_timezone_get());
        $at = $today->copy()->subDays($daysAgo)->setTimeFromTimeString($time);
        // Today's items stay in the past.
        Carbon::setTestNow($at->gt($today) ? $today->copy()->subMinutes(5) : $at);

        $guard = Auth::guard($this->guard());
        $user === null ? $guard->forgetUser() : $guard->setUser($user);
        app(ActivityLogger::class)->reset();

        try {
            return $callback();
        } finally {
            app(ActivityLogger::class)->reset();
        }
    }

    protected function guard(): string
    {
        return (string) config('sunrice.auth.guard', 'web');
    }

    protected function user(string $name, string $email, string $role): User
    {
        $user = User::query()->create(['name' => $name, 'email' => $email, 'password' => bcrypt('password'), 'email_verified_at' => now()]);
        $user->assignRole($role);

        return $user;
    }

    /** @param array<string, mixed> $data */
    protected function entry(string $collection, string $title, string $slug, array $data, User $author, ?Entry $parent = null): Entry
    {
        $entry = app(CreateEntry::class)->handle(
            Collection::query()->where('handle', $collection)->firstOrFail(),
            ['title' => $title, 'slug' => $slug, 'data' => $data],
            $author->id,
        );
        if ($parent !== null) {
            app(SetEntryParent::class)->handle($entry, $parent->id);
        }

        return $entry->refresh();
    }

    protected function publish(Entry $entry, ?Carbon $at = null): void
    {
        app(PublishTranslation::class)->handle($this->translation($entry, 'en'), $at);
    }

    protected function publishTranslation(Entry $entry, string $locale): void
    {
        app(PublishTranslation::class)->handle($this->translation($entry, $locale));
    }

    /**
     * Save a translation's draft: 'draft' (still being written) or
     * 'ready' (finished, waiting for an editor to publish).
     *
     * @param  array<string, mixed>  $translated
     */
    protected function translate(Entry $entry, string $title, string $slug, array $translated, string $state): void
    {
        $translation = EnsureTranslation::for($entry, 'id');
        $main = $this->translation($entry, 'en');
        app(SaveDraft::class)->handle($translation, [
            'title' => $title,
            'slug' => $slug,
            'data' => [...(array) $main->data, ...$translated],
            'seo' => [],
            'is_ready' => $state === 'ready',
        ]);
    }

    protected function translation(Entry $entry, string $locale): EntryTranslation
    {
        return EntryTranslation::query()->withoutGlobalScopes()
            ->where('entry_id', $entry->id)->where('locale', $locale)->firstOrFail();
    }

    /**
     * @param  array<string, mixed>  $values
     * @return array<string, mixed>
     */
    protected function block(string $type, array $values): array
    {
        return ['type' => $type, 'values' => $values];
    }

    protected function folder(string $name): AssetFolder
    {
        return AssetFolder::query()->where('name', $name)->firstOrFail();
    }

    /**
     * Upload a generated image: a soft gradient with blurred shapes, no text.
     *
     * @param  array{0: string, 1: string, 2: string}  $palette  light, mid, dark
     */
    protected function upload(string $key, string $title, string $alt, AssetFolder $folder, array $palette, int $width = 1600, int $height = 1000, string $style = 'landscape', ?User $uploader = null): Asset
    {
        $path = $this->image($key, $palette, $width, $height, $style);
        $file = new UploadedFile($path, $key.'.jpg', 'image/jpeg', null, true);
        $asset = app(UploadAsset::class)->handle($file, [
            'folder_id' => $folder->id,
            'title' => $title,
            'alt' => $alt,
            'uploaded_by' => ($uploader ?? Auth::guard($this->guard())->user())?->getAuthIdentifier(),
        ]);
        @unlink($path);

        if ($style === 'portrait') {
            app(UpdateAssetMeta::class)->handle($asset, ['caption' => 'Photo: Kopi Kita Studio']);
        }

        return $this->assets[$key] = $asset;
    }

    /**
     * Draws at a small size and scales up, which blurs the shapes into
     * soft light.
     *
     * @param  array{0: string, 1: string, 2: string}  $palette
     */
    protected function image(string $seed, array $palette, int $width, int $height, string $style): string
    {
        mt_srand(crc32($seed));
        $w = (int) round($width / 8);
        $h = (int) round($height / 8);
        $small = imagecreatetruecolor($w, $h);
        imagealphablending($small, true);
        [$light, $mid, $dark] = array_map(fn (string $hex) => sscanf($hex, '#%02x%02x%02x'), $palette);

        // Diagonal gradient from light to mid.
        for ($y = 0; $y < $h; $y++) {
            for ($x = 0; $x < $w; $x++) {
                $t = min(1, max(0, ($x / $w) * 0.55 + ($y / $h) * 0.45));
                $c = array_map(fn ($a, $b) => (int) round($a + ($b - $a) * $t * 0.7), $light, $mid);
                imagesetpixel($small, $x, $y, imagecolorallocate($small, $c[0], $c[1], $c[2]));
            }
        }

        // A few translucent circles.
        $shapes = $style === 'portrait' ? 3 : 5;
        for ($i = 0; $i < $shapes; $i++) {
            $color = $i % 2 === 0 ? $dark : $light;
            $alpha = $i % 2 === 0 ? mt_rand(70, 95) : mt_rand(40, 70);
            $size = (int) round(min($w, $h) * mt_rand(35, 80) / 100);
            imagefilledellipse($small, mt_rand(0, $w), mt_rand(0, $h), $size, $size, imagecolorallocatealpha($small, $color[0], $color[1], $color[2], $alpha));
        }
        if ($style === 'portrait') {
            // A head-and-shoulders silhouette, very soft.
            $c = imagecolorallocatealpha($small, $dark[0], $dark[1], $dark[2], 60);
            imagefilledellipse($small, (int) ($w / 2), (int) ($h * 0.42), (int) ($w * 0.36), (int) ($w * 0.42), $c);
            imagefilledellipse($small, (int) ($w / 2), (int) ($h * 1.02), (int) ($w * 0.9), (int) ($h * 0.62), $c);
        }
        if ($style === 'mark') {
            $c = imagecolorallocatealpha($small, $dark[0], $dark[1], $dark[2], 10);
            imagefilledellipse($small, (int) ($w / 2), (int) ($h / 2), (int) ($w * 0.55), (int) ($w * 0.55), $c);
            $c = imagecolorallocatealpha($small, $mid[0], $mid[1], $mid[2], 0);
            imagefilledellipse($small, (int) ($w * 0.58), (int) ($h * 0.42), (int) ($w * 0.22), (int) ($w * 0.22), $c);
        }

        for ($i = 0; $i < 2; $i++) {
            imagefilter($small, IMG_FILTER_GAUSSIAN_BLUR);
        }

        $image = imagescale($small, $width, $height, IMG_BICUBIC);
        $path = tempnam(sys_get_temp_dir(), 'guide-demo-').'.jpg';
        imagejpeg($image, $path, 86);
        imagedestroy($small);
        imagedestroy($image);

        return $path;
    }
}
