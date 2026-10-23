/** The entry editor's terms (the Taxonomies card), apart from React. */

/** An entry's terms by taxonomy handle: term ids. */
export type TermsByTaxonomy = Record<string, number[]>;

/** Whether two lists hold the same terms, whatever their order. */
export function sameTerms(a: readonly number[], b: readonly number[]): boolean {
    const left = new Set(a);
    const right = new Set(b);

    return left.size === right.size && [...left].every((id) => right.has(id));
}

/**
 * What a save sends of the entry's terms (every language's): only the
 * taxonomies whose terms were changed from those the editor loaded
 * (`terms`), with the loaded ones (`terms_base`), so the server refuses
 * a save over terms someone changed since from another language's
 * editor instead of putting the old ones back. Null when none changed:
 * the terms are left as they are.
 */
export function termsToSend(loaded: TermsByTaxonomy, current: TermsByTaxonomy): { terms: TermsByTaxonomy; terms_base: TermsByTaxonomy } | null {
    const terms: TermsByTaxonomy = {};
    const base: TermsByTaxonomy = {};
    for (const [handle, ids] of Object.entries(current)) {
        const before = loaded[handle] ?? [];
        if (!sameTerms(before, ids)) {
            terms[handle] = ids.slice();
            base[handle] = before.slice();
        }
    }

    return Object.keys(terms).length === 0 ? null : { terms, terms_base: base };
}
