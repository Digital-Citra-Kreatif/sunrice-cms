<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Closure;

/**
 * The site's template and body class hooks, registered with
 * Cms::resolveTemplateUsing() and Cms::bodyClassUsing() (usually in a
 * service provider's boot()), kept for the life of the app.
 *
 * @internal
 */
final class SiteHooks
{
    /** @var list<Closure(Page): ?string> */
    private array $templates = [];

    /** @var list<Closure(Page): list<string>> */
    private array $bodyClasses = [];

    /** @param Closure(Page): ?string $hook */
    public function resolveTemplateUsing(Closure $hook): void
    {
        $this->templates[] = $hook;
    }

    /** @param Closure(Page): list<string> $hook */
    public function bodyClassUsing(Closure $hook): void
    {
        $this->bodyClasses[] = $hook;
    }

    /** The page with the view the hooks chose, in the order registered: each sees the one before's choice; null keeps it. */
    public function template(Page $page): Page
    {
        foreach ($this->templates as $hook) {
            $view = $hook($page);
            if (is_string($view) && $view !== '' && $view !== $page->view) {
                $page = $page->withView($view);
            }
        }

        return $page;
    }

    /** @return list<string> the hooks' classes for a page */
    public function bodyClasses(Page $page): array
    {
        $classes = [];
        foreach ($this->bodyClasses as $hook) {
            array_push($classes, ...$hook($page));
        }

        return $classes;
    }
}
