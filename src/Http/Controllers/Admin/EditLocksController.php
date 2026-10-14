<?php

declare(strict_types=1);

namespace Sunrice\Http\Controllers\Admin;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Gate;
use Sunrice\Locks\EditLocks;
use Sunrice\Models\Entry;
use Sunrice\Models\GlobalSet;
use Sunrice\Models\KeptEdit;
use Sunrice\Models\Term;
use Sunrice\Support\Locales;

/**
 * JSON endpoints behind the editors' edit locks: renew (heartbeat), take
 * over, release, keep unsaved changes when taken over, and load or
 * discard kept changes.
 */
class EditLocksController extends Controller
{
    public function __construct(protected EditLocks $locks) {}

    /** Take or renew the lock. Also lists changes kept for this item. */
    public function renew(Request $request, string $type, int $id): JsonResponse
    {
        [$key, $locale] = $this->authorizeItem($request, $type, $id);
        $state = $this->locks->acquire($key, $this->editor($request), $this->userId($request), $this->userName($request));

        return response()->json($state + ['kept' => $this->kept($type, $id, $locale)]);
    }

    public function take(Request $request, string $type, int $id): JsonResponse
    {
        [$key] = $this->authorizeItem($request, $type, $id);
        $this->locks->takeOver($key, $this->editor($request), $this->userId($request), $this->userName($request));

        return response()->json(['status' => 'ok']);
    }

    public function release(Request $request, string $type, int $id): JsonResponse
    {
        [$key] = $this->authorizeItem($request, $type, $id);
        $this->locks->release($key, $this->editor($request));

        return response()->json(['status' => 'released']);
    }

    /** The unsaved changes of an editor that was taken over. */
    public function keep(Request $request, string $type, int $id): JsonResponse
    {
        [, $locale] = $this->authorizeItem($request, $type, $id);
        $validated = $request->validate(['content' => ['required', 'array'], 'taken_by' => ['nullable', 'string', 'max:255']]);
        $kept = KeptEdit::query()->create([
            'type' => $type,
            'model_id' => $id,
            'locale' => $locale,
            'user_id' => $this->userId($request),
            'user_name' => $this->userName($request),
            'taken_by' => $validated['taken_by'] ?? null,
            'content' => $validated['content'],
        ]);

        return response()->json(['kept' => $kept->id]);
    }

    public function show(Request $request, KeptEdit $kept): JsonResponse
    {
        $this->authorizeItem($request->merge(['locale' => $kept->locale]), $kept->type, $kept->model_id);

        return response()->json(['content' => $kept->content]);
    }

    public function destroy(Request $request, KeptEdit $kept): JsonResponse
    {
        $this->authorizeItem($request->merge(['locale' => $kept->locale]), $kept->type, $kept->model_id);
        $kept->delete();

        return response()->json(['deleted' => true]);
    }

    /**
     * The lock key and language of an item the user may edit.
     *
     * @return array{0: string, 1: string}
     */
    protected function authorizeItem(Request $request, string $type, int $id): array
    {
        $locale = (string) $request->input('locale', '');
        $model = match ($type) {
            'entry' => Entry::query()->find($id),
            'term' => Term::query()->find($id),
            'global' => GlobalSet::query()->find($id),
            default => null,
        };
        abort_if(! $model instanceof Model, 404);

        if ($model instanceof Entry) {
            $locale = Locales::isAvailable($locale) ? $locale : Locales::main();
            abort_unless(Gate::allows(Locales::isMain($locale) ? 'update' : 'translate', $model), 403);
        } elseif ($model instanceof GlobalSet) {
            $locale = Locales::isAvailable($locale) ? $locale : Locales::main();
            abort_unless(Gate::allows('update', $model), 403);
        } else {
            // A term's languages are edited together.
            $locale = '';
            abort_unless(Gate::allows('update', $model), 403);
        }

        return [EditLocks::key($type, $id, $locale), $locale];
    }

    protected function userId(Request $request): int|string
    {
        $id = $request->user()?->getAuthIdentifier();
        abort_unless(is_int($id) || is_string($id), 403);

        return $id;
    }

    protected function userName(Request $request): string
    {
        $user = $request->user();

        return $user instanceof Model ? (string) $user->getAttribute('name') : '';
    }

    /** The editor tab (one user may have the same entry open twice). */
    protected function editor(Request $request): string
    {
        return substr((string) $request->validate(['editor' => ['required', 'string', 'max:64', 'regex:/^[A-Za-z0-9_-]+$/']])['editor'], 0, 64);
    }

    /** @return array<int, array{id: int, by: string|null, taken_by: string|null, at: string|null}> */
    protected function kept(string $type, int $id, string $locale): array
    {
        return KeptEdit::query()->where('type', $type)->where('model_id', $id)->where('locale', $locale)
            ->where('created_at', '>=', now()->subDays(30))->latest('id')->limit(10)->get()
            ->map(fn (KeptEdit $k) => ['id' => $k->id, 'by' => $k->user_name, 'taken_by' => $k->taken_by, 'at' => $k->created_at?->toIso8601String()])
            ->all();
    }
}
