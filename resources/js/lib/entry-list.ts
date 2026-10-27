/** The entries list's state, as the server read it from the URL (EntryList::state()). */
export interface EntryListQuery {
    search: string;
    /** '', 'draft', 'published', 'scheduled' or 'trashed'. */
    status: string;
    /** A user id, or ''. */
    author: string;
    /** A term id by taxonomy handle. */
    terms: Record<string, string>;
    locale: string;
    /** '' for the collection's own order; a column key, '-' first for descending. */
    sort: string;
    perPage: number;
    columns: string[];
}

export type EntryListParams = Record<string, string | number | Record<string, string>>;

/**
 * The URL parameters for the list with some changes, leaving out what is
 * the default (no search, every status, the main language, the
 * collection's order). Changing anything but the page goes back to page 1.
 */
export function entryListParams(query: EntryListQuery, changes: Partial<EntryListQuery>, mainLocale: string): EntryListParams {
    const next = { ...query, ...changes };
    const terms = Object.fromEntries(Object.entries(next.terms).filter(([, id]) => id !== ''));
    const params: EntryListParams = {};
    if (next.search) params.search = next.search;
    if (next.status) params.status = next.status;
    if (next.author) params.author = next.author;
    if (Object.keys(terms).length > 0) params.terms = terms;
    if (next.locale && next.locale !== mainLocale) params.locale = next.locale;
    if (next.sort) params.sort = next.sort;
    params.per_page = next.perPage;

    return params;
}

/** The query string of those parameters ("terms[topics]=3"), for links such as the CSV export. */
export function entryListQueryString(params: EntryListParams): string {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (typeof value === 'object') {
            for (const [name, item] of Object.entries(value)) search.set(`${key}[${name}]`, item);
        } else {
            search.set(key, String(value));
        }
    }

    return search.toString();
}

/** A header click: ascending, then descending, then back to the collection's order. */
export function nextSort(current: string, key: string): string {
    if (current === key) return `-${key}`;
    if (current === `-${key}`) return '';

    return key;
}

/** The direction a column is sorted in, or null. */
export function sortDirection(current: string, key: string): 'asc' | 'desc' | null {
    if (current === key) return 'asc';
    if (current === `-${key}`) return 'desc';

    return null;
}

/** How many filters narrow the list (search, status, author, terms; not the language). */
export function activeFilters(query: EntryListQuery): number {
    return [query.search, query.status, query.author, ...Object.values(query.terms)].filter((value) => value !== '').length;
}

/** More filters than this (author, taxonomies) go in one Filters menu instead of a select each. */
export const INLINE_FILTERS = 2;

/** How many of the Filters menu's filters (author, taxonomies) are set: its button's count. */
export function menuFiltersSet(query: EntryListQuery, taxonomies: readonly string[]): number {
    return [query.author, ...taxonomies.map((handle) => query.terms[handle] ?? '')].filter((value) => value !== '').length;
}
