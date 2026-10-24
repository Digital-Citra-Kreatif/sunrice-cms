<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Support\Templates;

#[IsReadOnly]
#[Description('Read a template: source "site" (the default) for the site\'s own in resources/views/cms ("pages/landing.blade.php"), or "default" for the CMS\'s plain fallbacks ("entry.blade.php", "listing.blade.php", "term.blade.php", "taxonomy-index.blade.php", "search.blade.php"). cms_get_template_guide lists them.')]
final class ReadTemplate extends CmsTool
{
    protected string $name = 'cms_read_template';

    private const DEFAULTS = ['entry.blade.php', 'listing.blade.php', 'term.blade.php', 'taxonomy-index.blade.php', 'search.blade.php'];

    public function handle(Request $request): Response
    {
        if (! $this->can('cms.blueprints.view')) {
            return $this->denied('work on the site\'s templates (View blueprints)');
        }
        /** @var array{path: string, source?: string|null} $args */
        $args = $request->validate([
            'path' => ['required', 'string', 'max:200'],
            'source' => ['nullable', 'string', 'in:site,default'],
        ]);
        if (($args['source'] ?? 'site') === 'default') {
            if (! in_array($args['path'], self::DEFAULTS, true)) {
                return Response::error('The CMS\'s fallbacks are '.implode(', ', self::DEFAULTS).'.');
            }

            return $this->json(['source' => 'default', 'path' => $args['path'], 'view' => 'sunrice-cms::'.basename($args['path'], '.blade.php'),
                'content' => (string) file_get_contents(dirname(__DIR__, 2).'/resources/views/'.$args['path'])]);
        }
        $file = Templates::path($args['path']);
        if ($file === null) {
            return Response::error('Give a path under resources/views/cms like "pages/landing.blade.php": letters, numbers, "-", "_" and "/".');
        }
        if (! is_file($file)) {
            return Response::error("There is no template \"{$args['path']}\". cms_get_template_guide lists them.");
        }

        return $this->json(['source' => 'site', 'path' => $args['path'], 'view' => Templates::view($args['path']), 'content' => (string) file_get_contents($file)]);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'path' => $schema->string()->required(),
            'source' => $schema->string()->enum(['site', 'default']),
        ];
    }
}
