<?php

declare(strict_types=1);

namespace Sunrice\Http\Controllers\Admin;

use Illuminate\Routing\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Sunrice\Models\Collection;
use Sunrice\Models\Entry;
use Sunrice\Models\Form;
use Sunrice\Models\FormSubmission;
use Sunrice\Sunrice;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $user = request()->user();
        // Only collections this user may open.
        $visible = Collection::query()->get()
            ->filter(fn (Collection $c) => $user->can('viewAny', [Entry::class, $c->id]))
            ->pluck('id');

        $collections = Collection::query()
            ->whereIn('id', $visible)
            ->withCount('entries')
            ->orderBy('title')
            ->get()
            ->map(fn (Collection $c) => [
                'handle' => $c->handle,
                'title' => $c->title,
                'entries' => $c->entries_count,
            ])
            ->all();

        $recentEdits = Entry::query()
            ->whereIn('collection_id', $visible)
            ->with(['collection:id,title,handle', 'translations'])
            ->latest('updated_at')
            ->limit(20)
            ->get()
            ->filter(fn (Entry $e) => $user->can('view', $e))
            ->take(8)
            ->values()
            ->map(fn (Entry $e) => [
                'id' => $e->id,
                'title' => $e->translations->first()->title ?? '#'.$e->id,
                'collection' => $e->collection?->title,
                'collection_handle' => $e->collection?->handle,
                'status' => $e->status,
                'updated_at' => $e->updated_at?->diffForHumans(),
            ])
            ->all();

        // Packages' cards (Sunrice::addDashboardCard()), loaded after the page (deferred).
        $cards = app(Sunrice::class)->dashboardCards($user);

        return Inertia::render('Dashboard', [
            'cards' => $cards === [] ? [] : Inertia::defer(fn () => array_map(fn (array $card) => [
                'name' => $card['name'],
                'position' => $card['position'],
                'props' => ($card['props'])(),
            ], $cards)),
            'collections' => $collections,
            'recentEdits' => $recentEdits,
            // Only forms whose submissions this user may read.
            'recentSubmissions' => FormSubmission::query()
                ->whereIn('form_id', Form::query()->get()->filter(fn (Form $f) => request()->user()->can('viewSubmissions', $f))->pluck('id'))
                ->with('form:id,title,fields')
                ->latest()
                ->limit(8)
                ->get()
                ->map(fn (FormSubmission $s) => [
                    'id' => $s->id,
                    'form_id' => $s->form_id,
                    'form' => $s->form?->title,
                    // A one-line summary: the first filled-in field.
                    'summary' => collect((array) $s->data)->first(fn ($v) => is_string($v) && trim($v) !== ''),
                    'created_at' => $s->created_at?->diffForHumans(),
                ])
                ->all(),
        ]);
    }
}
