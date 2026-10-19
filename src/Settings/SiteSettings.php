<?php

declare(strict_types=1);

namespace Sunrice\Cms\Settings;

use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\MediaPicker;
use Sunrice\Admin\Resources\Forms\Section;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\Textarea;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Settings\Settings;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Locales;

/**
 * Settings → Site, guarded by cms.settings.site: the homepage, and what
 * search results and shared links show when a page doesn't say (see Seo).
 *
 *     Cms::site()->name()
 *
 * @api
 */
final class SiteSettings extends Settings
{
    /** The entry shown at / (and /{locale}), by id; null: none. */
    public ?int $homepage = null;

    /** Empty: the app's name (app.name). */
    public string $name = '';

    /** For pages without a description of their own. */
    public string $description = '';

    /** Between a page's title and the site's name: "About | Acme". */
    public string $separator = '|';

    public bool $appendName = true;

    /** A share image (media id) for pages without one. */
    public ?int $image = null;

    /** The site's X (Twitter) account, "@acme", for share cards. */
    public string $twitter = '';

    /** Ask search engines to stay away from the whole site (also config sunrice-cms.seo.noindex). */
    public bool $noindex = false;

    /** Tell search engines what pages are, in schema.org structured data (JSON-LD). */
    public bool $structuredData = true;

    /** Who publishes the site: Organization or Person. */
    public string $publisher = 'Organization';

    /** The organization's logo (media id), for structured data. */
    public ?int $logo = null;

    public static function key(): string
    {
        return 'site';
    }

    public static function description(): string
    {
        return 'The homepage, and what search results and shared links show.';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Select::make('homepage')->label('Homepage')->options(self::homepages())
                ->help('The entry shown at the site\'s address (/), in each language it\'s published in. Its own address redirects there.'),
            Section::make('Search and sharing')->description('For pages that don\'t set their own in their SEO card.')->columns(2)->schema([
                TextInput::make('name')->label('Site name')->maxLength(100)->placeholder(self::appName()),
                TextInput::make('twitter')->label('X (Twitter) account')->maxLength(16)->placeholder('@acme')->rules(['regex:/^@?[A-Za-z0-9_]{1,15}$/']),
                Textarea::make('description')->label('Description')->rows(2)->maxLength(500)->span(2),
                TextInput::make('separator')->label('Title separator')->maxLength(5)->help('Between a page\'s title and the site name.'),
                Toggle::make('appendName')->label('Add the site name to titles')->help('"About | Acme" in search results and tabs.'),
                MediaPicker::make('image')->label('Share image')->images()->span(2),
                Toggle::make('noindex')->label('Hide the whole site from search engines')->span(2)
                    ->help('For a site still being built. Every page asks not to be indexed and the sitemap is empty.'),
            ]),
            Section::make('Structured data')->description('What search engines are told pages are (schema.org), for richer results: articles, breadcrumbs, the site\'s search box.')->columns(2)->schema([
                Toggle::make('structuredData')->label('Add structured data to pages')->span(2),
                Select::make('publisher')->label('Published by')->options(['Organization' => 'An organization', 'Person' => 'A person']),
                MediaPicker::make('logo')->label('Logo')->images()->help('The organization\'s logo: square or wide, at least 112 pixels.'),
            ]),
        ]);
    }

    /** The site's name: as set, else the app's. */
    public function name(): string
    {
        $name = trim($this->name);

        return $name !== '' ? $name : self::appName();
    }

    private static function appName(): string
    {
        $name = config('app.name');

        return is_string($name) ? $name : '';
    }

    /** Whether the whole site asks not to be indexed (here, or SUNRICE_NOINDEX for staging). */
    public function hidden(): bool
    {
        return $this->noindex || filter_var(config('sunrice-cms.seo.noindex', false), FILTER_VALIDATE_BOOL);
    }

    /** "About" → "About | Acme", unless titles don't get the name or it's the name already. */
    public function title(string $title): string
    {
        $name = $this->name();
        if (! $this->appendName || $title === '' || $title === $name) {
            return $title !== '' ? $title : $name;
        }
        $separator = trim($this->separator);

        return $title.' '.($separator !== '' ? $separator.' ' : '').$name;
    }

    /** The "@account" for twitter:site, or null. */
    public function twitterHandle(): ?string
    {
        $handle = ltrim(trim($this->twitter), '@');

        return $handle !== '' ? '@'.$handle : null;
    }

    /** @return array<int|string, string> entries with pages, by id: "Pages: About" */
    private static function homepages(): array
    {
        $routed = Collection::query()->whereNotNull('route')->get()->keyBy('id');

        $options = [];
        $translations = EntryTranslation::query()->where('locale', Locales::default())->whereIn('collection_id', $routed->keys())
            ->whereHas('entry', fn ($q) => $q->withoutTrashed())->orderBy('draft_title')->limit(500)->get();
        foreach ($translations as $t) {
            $options[(string) $t->entry_id] = ($routed->get($t->collection_id)->title ?? '').': '.$t->draft_title;
        }

        return $options;
    }
}
