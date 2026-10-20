/** Helpers for entry values in the editor. */

export function asRecord(value: unknown): Record<string, unknown> {
    return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

/** A stored date ("2026-10-19" or "2026-10-19T14:30:00") as a date or datetime-local input's value. */
export function dateInputValue(value: unknown, time: boolean): string {
    if (typeof value !== 'string' || value === '') return '';
    const match = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(value);
    if (!match) return '';

    return time ? `${match[1]}T${match[2] ?? '00:00'}` : match[1] ?? '';
}

/** An input's date back as a value to send, or null when emptied. */
export function dateValueFromInput(input: string): string | null {
    return input === '' ? null : input;
}

/** A new repeater row: the server gives it its stable id. */
export function newRow(): Record<string, unknown> {
    return { _hidden: false };
}

/** A new flexible block of a kind (a fieldset's handle). */
export function newBlock(type: string): Record<string, unknown> {
    return { type, hidden: false, values: {} };
}

/**
 * Whether a link address is safe (the server's SafeUrl rule): paths,
 * #anchors, and http, https, mailto and tel; not javascript: or data:.
 */
export function isSafeUrl(url: string): boolean {
    // Browsers ignore whitespace and control characters inside a scheme.
    const clean = url.replace(/[\u0000- \u007f]+/g, '');
    const scheme = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(clean);
    if (scheme) return ['http', 'https', 'mailto', 'tel'].includes(scheme[1]!.toLowerCase());

    return !clean.includes('\\');
}

/** The entry picker endpoint's query string. */
export function pickerQuery({ ids, search, collections }: { ids?: number[]; search?: string; collections: string[] }): string {
    const params = new URLSearchParams();
    for (const id of ids ?? []) params.append('ids[]', String(id));
    if (search) params.set('search', search);
    for (const handle of collections) params.append('collections[]', handle);

    return params.toString();
}

let nextKey = 0;

/**
 * Keys for the items of a list that have no id of their own (new repeater
 * rows, a select's options), kept in step as items are added, removed and
 * moved: the same keys when the count still matches, else fresh ones.
 */
export function syncKeys(keys: readonly string[], count: number): string[] {
    if (keys.length === count) return keys.slice();
    if (keys.length < count) return [...keys, ...Array.from({ length: count - keys.length }, () => `k${++nextKey}`)];

    return keys.slice(0, count);
}

/** The term picker endpoint's query string. */
export function termPickerQuery({ taxonomy, q, ids }: { taxonomy: string; q?: string; ids?: number[] }): string {
    const params = new URLSearchParams({ taxonomy });
    if (q) params.set('q', q);
    for (const id of ids ?? []) params.append('ids[]', String(id));

    return params.toString();
}
