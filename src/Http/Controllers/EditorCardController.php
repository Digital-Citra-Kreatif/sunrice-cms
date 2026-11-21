<?php

declare(strict_types=1);

namespace Sunrice\Cms\Http\Controllers;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Sunrice\Cms\Editor\EditorCards;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Term;

/**
 * Saves a plugin's card in the entry or term editor (Cms::editorCard()).
 * The routes check the user may update the entry or term; the card's
 * own check (EditorCard::can()) is checked here.
 *
 * @internal
 */
final class EditorCardController
{
    public function entry(Request $request, Entry $entry, string $card, EditorCards $cards): RedirectResponse
    {
        return $this->save($request, $entry, $card, $cards);
    }

    public function term(Request $request, Term $term, string $card, EditorCards $cards): RedirectResponse
    {
        return $this->save($request, $term, $card, $cards);
    }

    private function save(Request $request, Entry|Term $record, string $key, EditorCards $cards): RedirectResponse
    {
        $user = $request->user();
        $user = $user instanceof Authorizable ? $user : null;
        $card = $cards->find($key, $record, $user);
        abort_if($card === null || $user === null, 404);
        $input = $request->input('values', []);
        $card->store($record, is_array($input) ? $input : [], $user);

        return back()->with('success', __(':card saved.', ['card' => $card->title()]));
    }
}
