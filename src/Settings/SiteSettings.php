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

    /** The description in the other languages, one per line: "id: Rumah premium di Jakarta dan Bali". */
    public string $descriptions = '';

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

    /** The publisher's name in structured data; empty: the site name. */
    public string $publisherName = '';

    /** A more specific schema.org type for an organization: "RealEstateAgent", "Restaurant"; empty: Organization. */
    public string $publisherType = '';

    public string $telephone = '';

    /** The publisher's postal address, as text (lines become ", "). */
    public string $address = '';

    /** The publisher's profiles elsewhere (schema.org sameAs), one URL per line. */
    public string $sameAs = '';

    /** The description for a page in a language: its line in `descriptions`, else `description`. */
    public function descriptionIn(?string $locale = null): string
    {
        $locale ??= Locales::current();
        if ($locale !== Locales::default()) {
            foreach (preg_split('/\R/', $this->descriptions) ?: [] as $line) {
                [$code, $text] = array_pad(array_map(trim(...), explode(':', $line, 2)), 2, '');
                if ($code === $locale && $text !== '') {
                    return $text;
                }
            }
        }

        return $this->description;
    }

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
            Select::make('homepage')->label('Homepage')->options(fn (): array => self::homepages())->searchable()
                ->help('The live page shown at the site\'s address (/), in each language it\'s published in. Its own address redirects there. Editors with "Choose the homepage" set it from the page\'s editor.'),
            Section::make('Search and sharing')->description('For pages that don\'t set their own in their SEO card.')->columns(2)->schema([
                TextInput::make('name')->label('Site name')->maxLength(100)->placeholder(self::appName()),
                TextInput::make('twitter')->label('X (Twitter) account')->maxLength(16)->placeholder('@acme')->rules(['regex:/^@?[A-Za-z0-9_]{1,15}$/']),
                Textarea::make('description')->label('Description')->rows(2)->maxLength(500)->span(2),
                ...(count(Locales::all()) > 1 ? [Textarea::make('descriptions')->label('Description in other languages')->rows(2)->maxLength(3000)->span(2)
                    ->placeholder(implode("\n", array_map(fn (string $code): string => "{$code}: …", array_slice(Locales::all(), 1))))
                    ->help('One per line, with the language\'s code: "id: Rumah premium di Jakarta dan Bali". A language left out uses the description above.')] : []),
                TextInput::make('separator')->label('Title separator')->maxLength(5)->help('Between a page\'s title and the site name.'),
                Toggle::make('appendName')->label('Add the site name to titles')->help(self::titleExample()),
                MediaPicker::make('image')->label('Share image')->images()->span(2),
                Toggle::make('noindex')->label('Hide the whole site from search engines')->span(2)
                    ->help('For a site still being built. Every page asks not to be indexed and the sitemap is empty.'),
            ]),
            Section::make('Structured data')->description('What search engines are told pages are (schema.org), for richer results: articles, breadcrumbs, the site\'s search box.')->columns(2)->schema([
                Toggle::make('structuredData')->label('Add structured data to pages')->span(2),
                Select::make('publisher')->label('Published by')->options(['Organization' => 'An organization', 'Person' => 'A person']),
                MediaPicker::make('logo')->label('Logo')->images()->help('The organization\'s logo: square or wide, at least 112 pixels.'),
                TextInput::make('publisherName')->label('Name')->maxLength(150)->placeholder(self::appName())
                    ->help('Empty: the site name.'),
                TextInput::make('publisherType')->label('Kind of organization')->maxLength(60)->placeholder('Organization')
                    ->rules(['regex:/^[A-Z][A-Za-z]{2,59}$/'])
                    ->help('A schema.org type, written as one word: LocalBusiness, RealEstateAgent, Restaurant, Store… Not for a person.'),
                TextInput::make('telephone')->label('Phone')->maxLength(40)->placeholder('+62 21 555 0100'),
                Textarea::make('address')->label('Address')->rows(2)->maxLength(300),
                Textarea::make('sameAs')->label('Profiles elsewhere')->rows(3)->maxLength(2000)->span(2)
                    ->rules([fn (string $attribute, mixed $value, \Closure $fail) => self::checkProfiles($value, $fail)])
                    ->help('One address per line: the publisher\'s pages on Instagram, LinkedIn, Wikipedia…'),
            ]),
        ]);
    }

    /** The Add the site name to titles help, with the saved separator and name: "About | Lumina Estates" in search results and tabs. */
    private static function titleExample(): string
    {
        $site = app(self::class);
        $separator = trim($site->separator) !== '' ? trim($site->separator) : '|';

        return "\"About {$separator} {$site->name()}\" in search results and browser tabs.";
    }

    /** @return list<string> the profile addresses (sameAs), one per line */
    public function profiles(): array
    {
        return array_values(array_filter(array_map(trim(...), preg_split('/\R/', $this->sameAs) ?: []), fn (string $line) => $line !== ''));
    }

    /** @param \Closure(string): mixed $fail */
    public static function checkProfiles(mixed $value, \Closure $fail): void
    {
        foreach (preg_split('/\R/', is_string($value) ? $value : '') ?: [] as $line) {
            $line = trim($line);
            if ($line !== '' && (filter_var($line, FILTER_VALIDATE_URL) === false || preg_match('#^https?://#i', $line) !== 1)) {
                $fail("\"{$line}\" isn't a web address (https://…).");

                return;
            }
        }
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

    /**
     * Live pages, by id: "Pages: About", by collection and title; and the
     * homepage as set, when it isn't one (marked), so the rest still saves.
     *
     * @return array<int|string, string>
     */
    private static function homepages(): array
    {
        $routed = Collection::query()->whereNotNull('route')->orderBy('title')->get()->keyBy('id');
        $current = (new self)->homepage;

        $options = [];
        $translations = EntryTranslation::query()->where('locale', Locales::default())->whereIn('collection_id', $routed->keys())
            ->where(fn ($q) => $q->where(fn ($live) => $live->where('status', EntryTranslation::PUBLISHED)->where('published_at', '<=', now()))
                ->when($current !== null, fn ($q) => $q->orWhere('entry_id', $current)))
            ->whereHas('entry', fn ($q) => $q->withoutTrashed())->orderBy('draft_title')->limit(1000)->get()
            ->sortBy(fn (EntryTranslation $t): string => ($routed->get($t->collection_id)->title ?? '')."\0".mb_strtolower($t->title ?? $t->draft_title));
        foreach ($translations as $t) {
            $live = $t->isLive();
            $options[(string) $t->entry_id] = ($routed->get($t->collection_id)->title ?? '').': '.($live ? ($t->title ?? $t->draft_title) : $t->draft_title.' (not live)');
        }

        return $options;
    }
}
