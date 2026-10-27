<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Sunrice\Cms\Models\Collection;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\EntryTranslation;
use Sunrice\Cms\Models\Form;
use Sunrice\Cms\Models\Revision;
use Sunrice\Cms\Models\Submission;
use Sunrice\Cms\Models\Taxonomy;
use Sunrice\Cms\Models\Term;
use Sunrice\Cms\Support\Access;
use Symfony\Component\HttpFoundation\Response;

/**
 * `cms.can:entries,update` on a route: Access decides, for the collection,
 * taxonomy or form the route is about (from its {collection}, {entry},
 * {translation}, {revision}, {taxonomy}, {term}, {form} or {submission}),
 * else for any. For an entry, its own and translators' rights count too.
 *
 * @internal
 */
final class AuthorizeContent
{
    public function handle(Request $request, Closure $next, string $area, string $action = 'view'): Response
    {
        $user = $request->user();
        $route = $request->route();
        $param = fn (string $name): mixed => $route?->parameter($name);
        $allowed = match ($area) {
            'entries' => Access::entries($user, $action, ...self::entryScope($param, $request)),
            'terms' => Access::terms($user, $action, self::taxonomy($param)),
            'submissions' => Access::submissions($user, $action, self::form($param)),
            // The term picker: for entries' terms and terms fields, a term's parent and a menu's terms (it checks the taxonomy itself).
            'term-picker' => Access::entries($user, 'view') || Access::terms($user, 'view') || $user?->can('cms.menus.update') === true,
            default => false,
        };
        abort_unless($allowed, 403);

        /** @var Response */
        return $next($request);
    }

    /**
     * @param  Closure(string): mixed  $param
     * @return array{0: Collection|null, 1: Entry|null, 2: string|null}
     */
    private static function entryScope(Closure $param, Request $request): array
    {
        $translation = $param('translation');
        $revision = $param('revision');
        if ($revision instanceof Revision) {
            $translation = $revision->translation;
        }
        if ($translation instanceof EntryTranslation) {
            return [$translation->entry->collection, $translation->entry, $translation->locale];
        }
        $entry = $param('entry');
        $collection = $param('collection');
        if ($entry instanceof Entry) {
            // Its address names its collection (bound already): don't load it again.
            if ($collection instanceof Collection && $collection->id === $entry->collection_id) {
                $entry->setRelation('collection', $collection);
            }
            $locale = $param('locale') ?? $request->input('locale');

            return [$entry->collection, $entry, is_string($locale) ? $locale : null];
        }

        return [$collection instanceof Collection ? $collection : null, null, null];
    }

    /** @param Closure(string): mixed $param */
    private static function taxonomy(Closure $param): ?Taxonomy
    {
        $term = $param('term');
        $taxonomy = $param('taxonomy');
        if ($term instanceof Term) {
            if ($taxonomy instanceof Taxonomy && $taxonomy->id === $term->taxonomy_id) {
                $term->setRelation('taxonomy', $taxonomy);
            }

            return $term->taxonomy;
        }

        return $taxonomy instanceof Taxonomy ? $taxonomy : null;
    }

    /** @param Closure(string): mixed $param */
    private static function form(Closure $param): ?Form
    {
        $submission = $param('submission');
        if ($submission instanceof Submission) {
            return $submission->form;
        }
        $form = $param('form');

        return $form instanceof Form ? $form : null;
    }
}
