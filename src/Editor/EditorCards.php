<?php

declare(strict_types=1);

namespace Sunrice\Cms\Editor;

use Illuminate\Contracts\Auth\Access\Authorizable;
use InvalidArgumentException;
use Sunrice\Cms\Models\Entry;
use Sunrice\Cms\Models\Term;

/**
 * Plugins' cards in the entry and term editors (Cms::editorCard()), kept
 * for the life of the app.
 *
 * @internal
 */
final class EditorCards
{
    /** @var array<string, EditorCard> */
    private array $cards = [];

    public function add(EditorCard $card): void
    {
        if (isset($this->cards[$card->key])) {
            throw new InvalidArgumentException("Two editor cards have the key \"{$card->key}\".");
        }
        $this->cards[$card->key] = $card;
    }

    /** The card with this key shown on the record to the user, or null. */
    public function find(string $key, Entry|Term $record, ?Authorizable $user): ?EditorCard
    {
        $card = $this->cards[$key] ?? null;

        return $card !== null && $user !== null && $card->shownOn($record) && $card->allows($user, $record) ? $card : null;
    }

    /**
     * The cards on a record's editor for the user, ready to draw.
     *
     * @return list<array{key: string, title: string, description: string|null, sections: list<array<string, mixed>>, values: array<string, mixed>, url: string}>
     */
    public function for(Entry|Term $record, ?Authorizable $user): array
    {
        if ($user === null || $this->cards === []) {
            return [];
        }
        $cards = [];
        foreach ($this->cards as $key => $card) {
            if ($card->shownOn($record) && $card->allows($user, $record)) {
                $route = $record instanceof Entry ? 'sunrice.admin.cms.entries.cards.update' : 'sunrice.admin.cms.terms.cards.update';
                $cards[] = $card->props($record, route($route, [$record instanceof Entry ? 'entry' : 'term' => $record->id, 'card' => $key], false));
            }
        }

        return $cards;
    }
}
