<?php

declare(strict_types=1);

namespace Sunrice\Cms\Ai;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Tools\Annotations\IsReadOnly;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Support\Access;
use Sunrice\Cms\Support\Seo;

#[IsReadOnly]
#[Description('Check the live pages (of a "collection", or all you may see) for SEO problems: no description, a title or description too long or too short, the same title on two pages of a language, pages hidden from search engines. Fix them with cms_save_entry (its "seo" object).')]
final class SeoAudit extends CmsTool
{
    protected string $name = 'cms_seo_audit';

    private const LIMIT = 200;

    public function handle(Request $request): Response
    {
        $collections = Access::collections($this->user())->filter(fn ($collection): bool => $collection->route !== null);
        $handle = $request->get('collection');
        if (is_string($handle) && $handle !== '') {
            $collections = $collections->where('handle', $handle);
        }
        $pages = EntryTranslation::query()->live()->whereIn('collection_id', $collections->modelKeys())->with('entry.collection')->limit(2000)->get();

        $titles = [];
        foreach ($pages as $page) {
            $titles[$page->locale][mb_strtolower(self::pageTitle($page))][] = $page->entry_id;
        }
        $problems = [];
        foreach ($pages as $page) {
            $seo = is_array($page->data[Seo::KEY] ?? null) ? $page->data[Seo::KEY] : [];
            $title = self::pageTitle($page);
            $description = is_string($seo['description'] ?? null) ? trim($seo['description']) : '';
            $issues = [];
            if ($description === '') {
                $issues[] = 'no description';
            } elseif (mb_strlen($description) > 160) {
                $issues[] = 'description over 160 characters';
            } elseif (mb_strlen($description) < 50) {
                $issues[] = 'description under 50 characters';
            }
            if (mb_strlen($title) > 60) {
                $issues[] = 'title over 60 characters';
            }
            if (count($titles[$page->locale][mb_strtolower($title)] ?? []) > 1) {
                $issues[] = 'title also used by entry '.implode(', ', array_diff($titles[$page->locale][mb_strtolower($title)], [$page->entry_id]));
            }
            if (($seo['noindex'] ?? false) === true) {
                $issues[] = 'hidden from search engines';
            }
            if ($issues !== []) {
                $problems[] = ['id' => $page->entry_id, 'locale' => $page->locale, 'title' => $title, 'url' => $page->url(), 'issues' => $issues];
            }
            if (count($problems) >= self::LIMIT) {
                break;
            }
        }

        return $this->json(['pages_checked' => $pages->count(), 'with_problems' => count($problems), 'pages' => $problems]);
    }

    private static function pageTitle(EntryTranslation $page): string
    {
        $seo = $page->data[Seo::KEY] ?? null;

        return is_array($seo) && is_string($seo['title'] ?? null) && trim($seo['title']) !== '' ? trim($seo['title']) : (string) $page->title;
    }

    public function schema(JsonSchema $schema): array
    {
        return ['collection' => $schema->string()];
    }
}
