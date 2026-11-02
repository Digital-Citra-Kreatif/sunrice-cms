<?php

declare(strict_types=1);

namespace Sunrice\Cms\Settings;

use Illuminate\Support\Facades\Storage;
use Sunrice\Admin\Media\Media;
use Sunrice\Admin\Resources\Forms\Form;
use Sunrice\Admin\Resources\Forms\ListInput;
use Sunrice\Admin\Resources\Forms\MediaPicker;
use Sunrice\Admin\Resources\Forms\Pairs;
use Sunrice\Admin\Resources\Forms\Section;
use Sunrice\Admin\Resources\Forms\Select;
use Sunrice\Admin\Resources\Forms\Textarea;
use Sunrice\Admin\Resources\Forms\TextInput;
use Sunrice\Admin\Resources\Forms\Toggle;
use Sunrice\Admin\Settings\Settings;
use Sunrice\Admin\Support\AppUrl;
use Sunrice\Cms\Actions\Settings\MakeSiteImages;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Site\Site;
use Sunrice\Cms\Support\Locales;

/**
 * Settings → Site, guarded by cms.settings.site: the homepage, the site's
 * icon and logo, and what search results and shared links show when a
 * page doesn't say (see Seo). Settings → SEO edits the search and sharing
 * settings and the structured data ones (structuredDataForm()), stored
 * here too.
 *
 *     Cms::site()->name()
 *     Cms::site()->logoImage()   // the logo (Media), or null
 *     Cms::site()->iconUrl(192)  // the icon as a 192 pixel PNG, or null
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

    /**
     * Pages not translated into a language show the main language's there
     * (unless config sunrice-cms.site.fallback, SUNRICE_FALLBACK, forces
     * it): read it with Site::fallback().
     */
    public bool $fallback = true;

    /** Ask search engines to stay away from the whole site (also config sunrice-cms.seo.noindex). */
    public bool $noindex = false;

    /** Tell search engines what pages are, in schema.org structured data (JSON-LD). */
    public bool $structuredData = true;

    /** Who publishes the site: Organization or Person. */
    public string $publisher = 'Organization';

    /**
     * The site's logo (media id): for templates (logoImage()), emails (a
     * PNG made when it's saved, emailLogo()) and structured data.
     */
    public ?int $logo = null;

    /**
     * The site icon (media id, a square image): browser tabs, bookmarks and
     * home screens. Its PNG sizes are made when it's saved (iconLinks(),
     * iconUrl()).
     */
    public ?int $icon = null;

    /** The publisher's name in structured data; empty: the site name. */
    public string $publisherName = '';

    /** A more specific schema.org type for an organization: "RealEstateAgent", "Restaurant"; empty: Organization. */
    public string $publisherType = '';

    public string $telephone = '';

    /** The publisher's postal address, as text (lines become ", "). */
    public string $address = '';

    /** The publisher's profiles elsewhere (schema.org sameAs), one URL per line. */
    public string $sameAs = '';

    /**
     * Common schema.org Organization types offered for the publisher, by
     * group; any other schema.org type can be typed in (Other…).
     */
    public const ORGANIZATION_TYPES = [
        'Organizations' => [
            'Organization' => 'Organization', 'Corporation' => 'Corporation', 'NGO' => 'NGO (non-profit)',
            'EducationalOrganization' => 'Educational organization', 'GovernmentOrganization' => 'Government organization',
            'MedicalOrganization' => 'Medical organization', 'NewsMediaOrganization' => 'News media', 'OnlineBusiness' => 'Online business',
            'SportsOrganization' => 'Sports organization', 'PerformingGroup' => 'Performing group',
        ],
        'Local businesses' => [
            'LocalBusiness' => 'Local business', 'RealEstateAgent' => 'Real estate agent', 'Restaurant' => 'Restaurant',
            'CafeOrCoffeeShop' => 'Café or coffee shop', 'BarOrPub' => 'Bar or pub', 'Bakery' => 'Bakery', 'Store' => 'Store',
            'Hotel' => 'Hotel', 'LodgingBusiness' => 'Lodging', 'TravelAgency' => 'Travel agency', 'BeautySalon' => 'Beauty salon',
            'HealthClub' => 'Gym or health club', 'MedicalClinic' => 'Medical clinic', 'Dentist' => 'Dentist', 'Pharmacy' => 'Pharmacy',
            'LegalService' => 'Law firm or legal service', 'AccountingService' => 'Accounting service', 'FinancialService' => 'Financial service',
            'InsuranceAgency' => 'Insurance agency', 'AutoRepair' => 'Car repair', 'HomeAndConstructionBusiness' => 'Home and construction',
            'ChildCare' => 'Child care', 'EmploymentAgency' => 'Employment agency',
        ],
    ];

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
        return 'The homepage, and the site\'s name, description, icon and logo.';
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Select::make('homepage')->label('Homepage')->options(fn (): array => self::homepages())->searchable()
                ->help('The live page shown at / in each language it\'s published in. Its own address redirects there. Editors with "Choose the homepage" set it from the page\'s editor.'),
            Section::make('The site')->description('Its name and what it\'s about, for search results and shared links of pages that don\'t say their own.')->columns(2)->schema([
                TextInput::make('name')->label('Site name')->maxLength(100)->placeholder(self::appName())->span(2),
                Textarea::make('description')->label('Description')->rows(2)->maxLength(500)->span(2),
                // One input per other language, kept as "id: …" lines.
                ...(count(Locales::all()) > 1 ? [Pairs::make('descriptions')->label('Description in other languages')->maxLength(3000)->span(2)
                    ->fixed(array_slice(Locales::names(), 1, null, true))
                    ->help('What pages in each language say about the site. Empty: the description above.')] : []),
            ]),
            Section::make('Icon and logo')->columns(2)->schema([
                MediaPicker::make('icon')->label('Site icon')->images()
                    ->help('Square, at least 512 × 512 pixels; shown in browser tabs, bookmarks and on phones\' home screens. PNG or JPEG; an SVG or ICO is used as it is.'),
                MediaPicker::make('logo')->label('Logo')->images()
                    ->help('Shown on the site (where its templates show it), at the top of the emails it sends and to search engines. Square or wide; emails show a PNG made from it (not from an SVG).'),
            ]),
            // Only matters with other languages; SUNRICE_FALLBACK, when set, decides instead.
            ...(count(Locales::all()) > 1 ? [Section::make('Languages')->schema([
                Toggle::make('fallback')->label('Show untranslated pages in the main language')->disabled(Site::fallbackForced() !== null)
                    ->help('A page not translated into a language shows its main language\'s content at that language\'s address (/id/about), with the main page as its canonical address, so links and the language switcher keep working. Off: those pages are not found (404) and lists show only what\'s translated.')
                    ->developerHelp(Site::fallbackForced() !== null ? 'Set by SUNRICE_FALLBACK in the app\'s config.' : null),
            ])] : []),
        ]);
    }

    /**
     * Settings → SEO's Structured data card: who publishes the site, for
     * schema.org (JSON-LD). These properties are SiteSettings', saved
     * with Settings → SEO (SaveSeoSettings), not on Settings → Site's form.
     */
    public static function structuredDataForm(Form $form): Form
    {
        return $form->schema([
            Section::make('Structured data')->description('What search engines are told pages are (schema.org), for richer results: articles, breadcrumbs, the site\'s search box. An organization\'s logo is the site\'s, set in Settings → Site.')->columns(2)->schema([
                Toggle::make('structuredData')->label('Add structured data to pages')->span(2),
                Select::make('publisher')->label('Published by')->options(['Organization' => 'An organization', 'Person' => 'A person']),
                TextInput::make('publisherName')->label('Name')->maxLength(150)->placeholder(self::appName())
                    ->help('Empty: the site name.'),
                Select::make('publisherType')->label('Organization type')->options(self::ORGANIZATION_TYPES)->searchable()
                    ->placeholder('Organization')
                    ->other('Other…', ['max:60', 'regex:/^[A-Z][A-Za-z]{2,59}$/'], 'Brewery')
                    ->help('What search engines are told the organization is. Other…: any schema.org type, written as one word.'),
                TextInput::make('telephone')->label('Phone')->maxLength(40)->placeholder('+62 21 555 0100'),
                Textarea::make('address')->label('Address')->rows(2)->maxLength(300),
                ListInput::make('sameAs')->label('Profiles elsewhere')->urls(httpsOnly: true)->networks()->addLabel('Add profile')
                    ->max(20)->maxLength(2000)->span(2)
                    ->help('The publisher\'s pages on other sites: Instagram, LinkedIn, Wikipedia…'),
            ]),
        ]);
    }

    /**
     * The site icon's tags for the page's <head>, as <x-sunrice-cms::seo>
     * prints them: PNGs of 32 and 16 pixels and the 180 pixel
     * apple-touch-icon (an SVG or ICO as it is). None without an icon.
     *
     * @return list<array{rel: string, type: string|null, sizes: string|null, href: string}>
     */
    public function iconLinks(): array
    {
        $made = (new SiteImages)->icon;
        if ($this->icon === null || ($made['media'] ?? null) !== $this->icon) {
            return [];
        }
        $links = [];
        if (($any = self::madeUrl($made, 'any')) !== null) {
            $type = is_string($made['type'] ?? null) ? $made['type'] : null;
            $links[] = ['rel' => 'icon', 'type' => $type, 'sizes' => $type === 'image/svg+xml' ? 'any' : null, 'href' => $any];
        }
        foreach ([32, 16] as $size) {
            if (($url = self::madeUrl($made, (string) $size)) !== null) {
                $links[] = ['rel' => 'icon', 'type' => 'image/png', 'sizes' => "{$size}x{$size}", 'href' => $url];
            }
        }
        if (($url = self::madeUrl($made, (string) MakeSiteImages::APPLE_TOUCH)) !== null) {
            $links[] = ['rel' => 'apple-touch-icon', 'type' => null, 'sizes' => '180x180', 'href' => $url];
        }

        return $links;
    }

    /**
     * The site icon as a square PNG: 16, 32, 180 (on an opaque background),
     * 192 or 512 pixels; null without an icon, for an SVG or ICO icon, or
     * another size. A new icon has new URLs.
     */
    public function iconUrl(int $size = 512): ?string
    {
        $made = (new SiteImages)->icon;

        return $this->icon !== null && ($made['media'] ?? null) === $this->icon ? self::madeUrl($made, (string) $size) : null;
    }

    /**
     * The site's logo, a media file (url(), srcset(), width, height,
     * altIn()), or null without one (or when it's no longer an image in
     * the library). Runs one query. In a template, show it named by the
     * site's name (alt="{{ Cms::site()->name() }}"), else the name: the
     * CMS's starter layout does.
     */
    public function logoImage(): ?Media
    {
        $media = $this->logo === null ? null : Media::query()->find($this->logo);

        return $media instanceof Media && $media->isImage() ? $media : null;
    }

    /**
     * The logo's PNG for emails: its absolute URL and pixel size (twice
     * the size it's shown at), or null without a logo or when none could
     * be made (an SVG without Imagick). The panel's emails show it (the
     * CMS gives it to Panel::mailBrandUsing()).
     *
     * @return array{url: string, width: int, height: int}|null
     */
    public function emailLogo(): ?array
    {
        $made = (new SiteImages)->logo;
        $disk = $made['disk'] ?? null;
        $path = $made['path'] ?? null;
        $width = $made['width'] ?? null;
        $height = $made['height'] ?? null;
        if ($this->logo === null || ($made['media'] ?? null) !== $this->logo || ! is_string($disk) || ! is_string($path) || ! is_int($width) || ! is_int($height)) {
            return null;
        }

        return ['url' => AppUrl::url(url(Storage::disk($disk)->url($path))), 'width' => $width, 'height' => $height];
    }

    /** @param array<string, mixed> $made a SiteImages entry */
    private static function madeUrl(array $made, string $size): ?string
    {
        $disk = $made['disk'] ?? null;
        $path = is_array($made['files'] ?? null) ? ($made['files'][$size] ?? null) : null;

        return is_string($disk) && is_string($path) ? Storage::disk($disk)->url($path) : null;
    }

    /** @return list<string> the profile addresses (sameAs), one per line */
    public function profiles(): array
    {
        return ListInput::items($this->sameAs);
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
        return $this->noindex || self::noindexByConfig();
    }

    /** Whether config sunrice-cms.seo.noindex (SUNRICE_NOINDEX, for staging) hides the site, whatever the setting says. */
    public static function noindexByConfig(): bool
    {
        return filter_var(config('sunrice-cms.seo.noindex', false), FILTER_VALIDATE_BOOL);
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
            // Only what the options show: not the pages' fields, which can be large.
            ->whereHas('entry', fn ($q) => $q->withoutTrashed())->orderBy('draft_title')->limit(1000)
            ->get(['id', 'entry_id', 'collection_id', 'locale', 'status', 'title', 'draft_title', 'published_at'])
            ->sortBy(fn (EntryTranslation $t): string => ($routed->get($t->collection_id)->title ?? '')."\0".mb_strtolower($t->title ?? $t->draft_title));
        foreach ($translations as $t) {
            $live = $t->isLive();
            $options[(string) $t->entry_id] = ($routed->get($t->collection_id)->title ?? '').': '.($live ? ($t->title ?? $t->draft_title) : $t->draft_title.' (not live)');
        }

        return $options;
    }
}
