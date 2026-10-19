<?php

declare(strict_types=1);

namespace Sunrice\Cms\Site;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\View;
use Sunrice\Cms\Fields\Field;
use Sunrice\Cms\Fields\HydrationContext;
use Sunrice\Cms\Models\EntryTranslation;

/**
 * Renders entries on the site: the fallback route (paths no app route
 * took) and signed previews of drafts.
 *
 * @internal
 */
final class SiteController
{
    public function show(Request $request, Site $site): Response|RedirectResponse
    {
        $translation = $site->find($request->path());
        if ($translation === null) {
            $redirect = $site->redirect($request->path());
            abort_if($redirect === null, 404);

            return redirect()->to($redirect->to_url, $redirect->status);
        }

        return $this->render($translation, preview: false);
    }

    /** A draft as it would look, from the editor's signed, expiring link. */
    public function preview(EntryTranslation $translation): Response
    {
        abort_if($translation->entry->trashed() || $translation->entry->collection->trashed(), 404);

        return $this->render($translation, preview: true)->header('X-Robots-Tag', 'noindex, nofollow');
    }

    private function render(EntryTranslation $translation, bool $preview): Response
    {
        app()->setLocale($translation->locale);
        $collection = $translation->entry->collection;

        return response()->view(self::view($collection->handle, $collection->template), [
            'entry' => $translation,
            'title' => $preview ? $translation->draft_title : $translation->title,
            'values' => $translation->values(new HydrationContext($translation->locale, $preview)),
            // Rich text is cleaned when saved, so it's the only HTML a template may print as is.
            'richText' => array_values(array_map(fn (Field $field): string => $field->handle, array_filter($collection->schema()->fields(), fn (Field $field): bool => $field->type === 'rich_text'))),
            'collection' => $collection,
            'locale' => $translation->locale,
            'preview' => $preview,
        ]);
    }

    /** The collection's template, else cms.{handle}, else cms.entry, else the CMS's plain one. */
    public static function view(string $handle, ?string $template): string
    {
        foreach (array_filter([$template, "cms.{$handle}", 'cms.entry']) as $view) {
            if (View::exists($view)) {
                return $view;
            }
        }

        return 'sunrice-cms::entry';
    }
}
