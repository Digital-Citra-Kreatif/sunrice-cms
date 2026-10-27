<?php

declare(strict_types=1);

namespace Sunrice\Cms\Admin;

use Closure;
use Illuminate\Contracts\Auth\Access\Authorizable;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * Links plugins add to an entry's ⋮ menu in the editor, registered with
 * Cms::entryLinksUsing() (in a plugin's boot()), kept for the life of
 * the app.
 *
 * @internal
 */
final class EntryLinks
{
    /** @var list<Closure(EntryTranslation, Authorizable): iterable<array{label?: mixed, href?: mixed}>> */
    private array $hooks = [];

    /** @param Closure(EntryTranslation, Authorizable): iterable<array{label?: mixed, href?: mixed}> $hook */
    public function add(Closure $hook): void
    {
        $this->hooks[] = $hook;
    }

    /**
     * Every hook's links for an entry in one language, for whoever is
     * signed in. A link needs a label and an address on the site (a path,
     * or http(s)://); anything else is left out.
     *
     * @return list<array{label: string, href: string}>
     */
    public function for(EntryTranslation $translation, ?Authorizable $user): array
    {
        if ($user === null) {
            return [];
        }
        $links = [];
        foreach ($this->hooks as $hook) {
            foreach ($hook($translation, $user) as $link) {
                $label = $link['label'] ?? null;
                $href = $link['href'] ?? null;
                if (is_string($label) && trim($label) !== '' && is_string($href) && preg_match('#^(/(?![/\\\\])|https?://)#i', $href) === 1) {
                    $links[] = ['label' => $label, 'href' => $href];
                }
            }
        }

        return $links;
    }
}
