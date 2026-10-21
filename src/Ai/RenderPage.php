<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Auth\SessionGuard;
use Illuminate\Contracts\Http\Kernel;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Http\Request as HttpRequest;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Admin\Panel;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Throwable;

#[IsReadOnly]
#[Description('Render a page of the site ("/", "/blog/hello", "/id/about") as a signed-out visitor sees it: the HTTP status, where it redirects, the error a template threw, and the HTML (the first 60,000 characters unless "max_length" says). Use it to check pages and templates after changing them. The panel\'s pages can\'t be rendered.')]
final class RenderPage extends CmsTool
{
    protected string $name = 'cms_render_page';

    public function handle(Request $request): Response
    {
        if (! $this->can(Panel::ACCESS)) {
            return $this->denied('open the panel');
        }
        /** @var array{path: string, max_length?: int|null} $args */
        $args = $request->validate([
            'path' => ['required', 'string', 'max:2000', 'regex:#^/(?!/)#'],
            'max_length' => ['nullable', 'integer', 'min:1000', 'max:500000'],
        ]);
        $path = self::normalize((string) parse_url($args['path'], PHP_URL_PATH));
        $panel = app(Panel::class);
        $mcp = config('sunrice-admin.ai.path', 'mcp');
        // Not the panel, nor developer tools (/_inertia/devtools, /_debugbar, Telescope…), which may be open in `local`.
        $private = ['/'.trim($panel->getPath(), '/'), '/'.trim(is_string($mcp) ? $mcp : 'mcp', '/'), '/telescope', '/horizon', '/pulse'];
        foreach ($private as $prefix) {
            if (strcasecmp($path, $prefix) === 0 || str_starts_with(strtolower($path), strtolower($prefix).'/') || str_starts_with($path, '/_')) {
                return Response::error('Only the site\'s public pages can be rendered, not the panel\'s or developer tools.');
            }
        }

        // As a signed-out visitor; everything is put back afterwards.
        $guard = auth($panel->getGuard());
        $user = $guard->user();
        $original = app('request');
        try {
            if ($guard instanceof SessionGuard) {
                $guard->forgetUser();
            }
            // On APP_URL, so links and canonical URLs come out as the site's, not http://localhost.
            $root = config('app.url');
            $response = app(Kernel::class)->handle(HttpRequest::create((is_string($root) ? rtrim($root, '/') : '').$args['path'], 'GET'));
        } catch (Throwable $e) {
            return Response::error('Rendering failed: '.self::message($e));
        } finally {
            app()->instance('request', $original);
            if ($user !== null) {
                $guard->setUser($user);
            }
        }

        $html = (string) $response->getContent();
        $max = $args['max_length'] ?? 60000;
        $exception = data_get($response, 'exception');

        return $this->json([
            'status' => $response->getStatusCode(),
            'redirect' => $response->headers->get('Location'),
            // What a template threw; not for answers like 404, which the status already says.
            'error' => $exception instanceof Throwable && ! $exception instanceof HttpExceptionInterface ? self::message($exception) : null,
            'length' => strlen($html),
            'html' => mb_substr($html, 0, $max),
            'truncated' => mb_strlen($html) > $max,
        ]);
    }

    /**
     * The path as routing will read it, to check: percent-encoding decoded
     * ("/%61dmin" is "/admin"; again until nothing changes), backslashes
     * and repeated slashes as one slash, "." and ".." resolved.
     */
    private static function normalize(string $path): string
    {
        for ($i = 0; $i < 5 && ($decoded = rawurldecode($path)) !== $path; $i++) {
            $path = $decoded;
        }
        $segments = [];
        foreach (explode('/', str_replace('\\', '/', $path)) as $segment) {
            $segment = trim($segment);
            if ($segment === '..') {
                array_pop($segments);
            } elseif ($segment !== '' && $segment !== '.') {
                $segments[] = $segment;
            }
        }

        return '/'.implode('/', $segments);
    }

    /** The message, without the app's path (a template error names its view relative to the app). */
    private static function message(Throwable $e): string
    {
        $message = str_replace(base_path().'/', '', $e->getMessage());

        return $message !== '' ? $message : class_basename($e);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'path' => $schema->string()->description('A path starting with "/".')->required(),
            'max_length' => $schema->integer()->description('Characters of HTML to return (default 60000).'),
        ];
    }
}
