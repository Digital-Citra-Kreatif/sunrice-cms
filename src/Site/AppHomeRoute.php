<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Routing\Route;
use Illuminate\Routing\Router;
use Sunrice\Admin\Console\InstallOutput;
use Sunrice\Cms\Actions\Install\RemoveWelcomeRoute;

/**
 * An app's own `/` route (Laravel's welcome page, say) is loaded after the
 * CMS's and replaces it, so the homepage chosen in Settings → Site never
 * shows. found() says whether that's so (a lookup in the router, no
 * request); the install step (`sunrice:install`, the "cms.home-route"
 * step) offers to take Laravel's stock welcome route out of
 * `routes/web.php`, and only explains any other.
 *
 * @internal
 */
final class AppHomeRoute
{
    private string $routesFile;

    public function __construct(private Router $router, ?string $routesFile = null)
    {
        $this->routesFile = $routesFile ?? base_path('routes/web.php');
    }

    /** The app's route that answers `GET /` instead of the CMS's homepage, if any. */
    public function found(): ?Route
    {
        if (config('sunrice-cms.site.enabled', true) !== true) {
            return null;
        }
        $get = $this->router->getRoutes()->getRoutesByMethod()['GET'] ?? [];
        $route = is_array($get) ? $get['/'] ?? null : null;

        return $route instanceof Route && $route->getName() !== 'sunrice.cms.home' ? $route : null;
    }

    /** The install step. */
    public function install(InstallOutput $output): void
    {
        if ($this->found() === null) {
            return;
        }
        $file = $this->routesFile;
        $shown = str_starts_with($file, base_path().DIRECTORY_SEPARATOR) ? substr($file, strlen(base_path()) + 1) : $file;
        $remove = app(RemoveWelcomeRoute::class);
        $code = is_file($file) ? file_get_contents($file) : false;
        $welcome = $code === false ? null : $remove->find($code);
        if ($welcome === null) {
            $output->warn("Your app's own / route answers the site's address: the app's routes win over the CMS's, so the homepage chosen in Settings → Site doesn't show. Remove that route if the site should have it.");

            return;
        }
        $output->warn("{$shown} has Laravel's welcome route, which hides the site's homepage: the app's routes win over the CMS's.");
        if ($output->confirm("Remove it from {$shown}?", true) && $remove->handle($file)) {
            $output->detail('Welcome route removed', $shown);

            return;
        }
        $output->line("  Remove these lines from {$shown}, so the homepage chosen in Settings → Site shows at /:");
        foreach (explode("\n", $welcome) as $line) {
            $output->line('    '.rtrim($line));
        }
        $output->line();
    }
}
