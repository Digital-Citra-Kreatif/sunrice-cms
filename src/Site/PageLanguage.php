<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Sunrice\Cms\Support\Locales;

/**
 * One language of the page shown, for a language switcher
 * (`<x-sunrice-cms::language-switcher>`'s `$component->languages`):
 * its code ("pt_BR"), its tag for `lang` and `hreflang` ("pt-BR"), its
 * own name ("Português (Brasil)"), its direction (`dir`, 'ltr' or
 * 'rtl', Locales::dir()), the page's address in it, whether
 * it's the language shown (`current`), whether that page is the main
 * language's standing in for an untranslated one (`fallback`), and
 * whether the page isn't in it at all so the address is that
 * language's homepage (`home`).
 *
 * @api
 */
final readonly class PageLanguage
{
    public string $tag;

    /** @var 'ltr'|'rtl' */
    public string $dir;

    public function __construct(
        public string $code,
        public string $name,
        public string $url,
        public bool $current = false,
        public bool $fallback = false,
        public bool $home = false,
    ) {
        $this->tag = str_replace('_', '-', $code);
        $this->dir = Locales::dir($code);
    }
}
