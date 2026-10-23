<?php

declare(strict_types=1);

namespace Sunrice\Cms\View\Components;

use Illuminate\Contracts\View\View;
use Illuminate\View\Component;
use InvalidArgumentException;
use Sunrice\Cms\Site\Page;
use Sunrice\Cms\Site\PageLanguage;
use Sunrice\Cms\Support\Locales;

/**
 * Links to the page shown in each language, in the order of the site's
 * languages, from Page::localeLinks() (no queries of its own):
 *
 *     <x-sunrice-cms::language-switcher class="language-switcher" />
 *     <x-sunrice-cms::language-switcher variant="dropdown" labels="code" missing="hide" />
 *
 * A `<nav>` (labelled with the site's words, `sunrice-cms::site.languages.label`)
 * with a list: each language's own name, linked with `hreflang` and
 * `lang`; the current one isn't a link but `aria-current="true"`.
 * `variant="dropdown"`: the same links in a `<details>` disclosure, no
 * script (works under a strict Content-Security-Policy). `labels="code"`:
 * "EN", "ID" (the name stays the link's accessible name and title).
 * Untranslated pages: a language the main language's page stands in for
 * links to it, with `data-fallback` (`fallback-note`: a visually hidden
 * "(not translated yet)" too); a language the page isn't in at all (the
 * fallback off) links to its homepage (`missing="home"`, `data-home`)
 * or is left out (`missing="hide"`). Renders nothing with fewer than two
 * languages to show, so nothing on the app's own pages or on a site with
 * one language. With a slot, the markup is yours: `$component->languages`
 * (a list of PageLanguage: code, tag, name, url, current, fallback, home).
 *
 * @api
 */
final class LanguageSwitcher extends Component
{
    /** @var list<PageLanguage> */
    public array $languages = [];

    /**
     * @param  'list'|'dropdown'|string  $variant
     * @param  'name'|'code'|string  $labels
     * @param  'home'|'hide'|string  $missing
     */
    public function __construct(
        public string $variant = 'list',
        public string $labels = 'name',
        public string $missing = 'home',
        public bool $fallbackNote = false,
        public ?string $label = null,
    ) {
        foreach (['variant' => [$variant, ['list', 'dropdown']], 'labels' => [$labels, ['name', 'code']], 'missing' => [$missing, ['home', 'hide']]] as $prop => [$value, $allowed]) {
            if (! in_array($value, $allowed, true)) {
                throw new InvalidArgumentException("<x-sunrice-cms::language-switcher> {$prop}=\"{$value}\": use ".implode(' or ', $allowed).'.');
            }
        }
        $this->languages = self::languagesOf(Page::current(), $missing === 'home');
    }

    /**
     * The page's languages; a language it isn't in links to its homepage
     * when $home, else is left out. None outside the CMS's pages.
     *
     * @return list<PageLanguage>
     */
    public static function languagesOf(?Page $page, bool $home = true): array
    {
        $codes = Locales::all();
        if ($page === null || count($codes) < 2) {
            return [];
        }
        $links = $page->localeLinks();
        if ($links === []) {
            return [];
        }
        $languages = [];
        foreach ($codes as $code) {
            $current = $code === $page->locale;
            $link = $links[$code] ?? null;
            if ($link !== null) {
                $languages[] = new PageLanguage($code, Locales::nativeName($code), $link['url'], $current, $link['fallback']);
            } elseif ($current) {
                // Not live in its own language (a preview): still the one shown.
                $languages[] = new PageLanguage($code, Locales::nativeName($code), request()->fullUrl(), true, $page->fallback);
            } elseif ($home) {
                $languages[] = new PageLanguage($code, Locales::nativeName($code), url(Locales::prefix($code) ?: '/'), home: true);
            }
        }

        return $languages;
    }

    public function shouldRender(): bool
    {
        return count($this->languages) > 1;
    }

    /** The language shown. */
    public function current(): ?PageLanguage
    {
        foreach ($this->languages as $language) {
            if ($language->current) {
                return $language;
            }
        }

        return null;
    }

    /** What a language's link shows: its own name, or its code ("EN"). */
    public function text(PageLanguage $language): string
    {
        return $this->labels === 'code' ? mb_strtoupper($language->tag) : $language->name;
    }

    public function render(): View
    {
        return view('sunrice-cms::components.language-switcher');
    }
}
