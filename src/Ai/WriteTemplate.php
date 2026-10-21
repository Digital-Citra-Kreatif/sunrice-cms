<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsDestructive;
use Sunrice\Admin\Activity\ActivityLog;
use Sunrice\Admin\Security\SecurityLog;
use Sunrice\Cms\Support\SiteCache;
use Sunrice\Cms\Support\Templates;

#[IsDestructive]
#[Description('Create, replace or delete a template in resources/views/cms (Blade, "pages/landing.blade.php"). The Blade is compiled and checked for syntax errors before it\'s saved, and the version it replaces is kept as a backup. Read cms_get_template_guide first, then check the page with cms_render_page. Only for super admins, and only when the site allows it (sunrice-cms.ai.templates): templates run code on the server.')]
final class WriteTemplate extends CmsTool
{
    protected string $name = 'cms_write_template';

    /** Listed only to those who may use it, where the site allows it: otherwise agents try it in vain. */
    public function shouldRegister(): bool
    {
        return parent::shouldRegister() && Templates::writable($this->user());
    }

    public function handle(Request $request): Response
    {
        if (! Templates::writable($this->user())) {
            return Response::error('Writing templates runs code on the server, so it needs a super admin, and the site must allow it (sunrice-cms.ai.templates, SUNRICE_AI_TEMPLATES=true).');
        }
        /** @var array{path: string, content?: string|null, delete?: bool|null} $args */
        $args = $request->validate([
            'path' => ['required', 'string', 'max:200'],
            'content' => ['nullable', 'required_unless:delete,true', 'string', 'max:500000'],
            'delete' => ['nullable', 'boolean'],
        ]);
        $file = Templates::path($args['path']);
        if ($file === null) {
            return Response::error('Give a path under resources/views/cms like "pages/landing.blade.php": letters, numbers, "-", "_" and "/".');
        }
        $existed = is_file($file);

        if (($args['delete'] ?? false) === true) {
            if (! $existed) {
                return Response::error("There is no template \"{$args['path']}\".");
            }
            $backup = Templates::backup($file, $args['path']);
            File::delete($file);
            $this->changed('deleted', $args['path']);

            return $this->json(['deleted' => true, 'path' => $args['path'], 'backup' => $backup]);
        }

        $content = $args['content'] ?? '';
        $error = Templates::syntaxError($content);
        if ($error !== null) {
            return Response::error("Not saved: the template has a syntax error: {$error}");
        }
        $backup = $existed ? Templates::backup($file, $args['path']) : null;
        File::ensureDirectoryExists(dirname($file));
        File::put($file, $content);
        $this->changed($existed ? 'updated' : 'created', $args['path']);

        return $this->json(['saved' => true, 'created' => ! $existed, 'path' => $args['path'], 'view' => Templates::view($args['path']), 'backup' => $backup]);
    }

    /** Logged, a security event (code on the server), and the site's kept pages forgotten. */
    private function changed(string $action, string $path): void
    {
        app(ActivityLog::class)->record($action, 'template', null, $path);
        $user = $this->user();
        app(SecurityLog::class)->record('template changed', $user instanceof Model ? $user : null, null, ['note' => "{$action} {$path}"]);
        app(SiteCache::class)->changed("template {$path}", SiteCache::PAGES);
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'path' => $schema->string()->description('Under resources/views/cms, e.g. "pages/landing.blade.php".')->required(),
            'content' => $schema->string()->description('The whole file.'),
            'delete' => $schema->boolean()->description('Delete the template instead (a backup is kept).'),
        ];
    }
}
