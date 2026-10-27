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

/** A long number grouped for reading ("18,500,000,000"), or null below 10,000 and for anything else. */
export function groupedNumber(value: unknown): string | null {
    const number = typeof value === 'number' ? value : typeof value === 'string' && value.trim() !== '' ? Number(value) : NaN;
    if (!Number.isFinite(number) || Math.abs(number) < 10000) return null;

    return new Intl.NumberFormat('en', { maximumFractionDigits: 20 }).format(number);
}

/**
 * Whether a single select offers its own "None": not for a required field,
 * not when an option already means none (its own "None"), and not beside
 * a default unless the value is empty already (an older entry).
 */
export function offersEmptyChoice(options: readonly { value: string; label: string }[], required: boolean, hasDefault: boolean, filled: boolean): boolean {
    if (required) return false;
    if (options.some((option) => ['none', ''].includes(option.label.trim().toLowerCase()) || option.value.trim().toLowerCase() === 'none')) return false;

    return !hasDefault || !filled;
}

/** A new repeater row, with its fields' defaults (the field's `defaults`): the server gives it its stable id. */
export function newRow(defaults?: unknown): Record<string, unknown> {
    return { ...structuredClone(asRecord(defaults)), _hidden: false };
}

/**
 * What a repeater row or block says, to name it in its bar ("15 m saltwater
 * pool" rather than "Feature 2"): its first filled text field, else null.
 * Text inside groups counts; rich text is read without its tags, its
 * entities decoded (What&#039;s → What's), as text React escapes again.
 */
export function itemSummary(fields: readonly { handle: string; type: string; fields?: unknown[] }[], values: Record<string, unknown>, max = 60): string | null {
    for (const field of fields) {
        const value = values[field.handle];
        let text: string | null = null;
        if (['text', 'textarea', 'email', 'url'].includes(field.type) && typeof value === 'string') text = value;
        else if (field.type === 'rich_text' && typeof value === 'string') text = decodeEntities(value.replace(/<[^>]*>/g, ' '));
        else if (field.type === 'group' && Array.isArray(field.fields)) {
            text = itemSummary(field.fields as { handle: string; type: string }[], asRecord(value), max);
        }
        const clean = (text ?? '').replace(/\s+/g, ' ').trim();
        if (clean !== '') return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
    }

    return null;
}

const NAMED_ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

/**
 * HTML's character references in text (after its tags are gone) as the
 * characters they stand for: &amp;, &#039;, &#x27;… Unknown ones stay as
 * they are. The result is text, never parsed as HTML again.
 */
export function decodeEntities(text: string): string {
    return text.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (whole, name: string) => {
        if (name[0] === '#') {
            const code = name[1] === 'x' || name[1] === 'X' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);

            return Number.isInteger(code) && code > 0 && code <= 0x10ffff && (code < 0xd800 || code > 0xdfff) ? String.fromCodePoint(code) : whole;
        }

        return NAMED_ENTITIES[name.toLowerCase()] ?? whole;
    });
}

/** A new flexible block of a kind (a fieldset's handle), with its fields' defaults (the kind's `defaults`). */
export function newBlock(type: string, defaults?: unknown): Record<string, unknown> {
    return { type, hidden: false, values: structuredClone(asRecord(defaults)) };
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
export function termPickerQuery({ taxonomy, q, offset, except, ids }: { taxonomy: string; q?: string; offset?: number; except?: number | null; ids?: number[] }): string {
    const params = new URLSearchParams({ taxonomy });
    if (q) params.set('q', q);
    if (offset) params.set('offset', String(offset));
    // A term being moved: not it nor the terms under it.
    if (except) params.set('except', String(except));
    for (const id of ids ?? []) params.append('ids[]', String(id));

    return params.toString();
}

export type LinkKind = 'url' | 'entry';
export type LinkTargets = { url?: unknown; entry_id?: unknown };

/** A link field's value as it's kept: no address or entry, and no text or tab choice either, is no link (null). */
export function linkValue(link: Record<string, unknown>): Record<string, unknown> | null {
    const empty = link.type === 'entry' ? typeof link.entry_id !== 'number' : link.url === '' || link.url === undefined || link.url === null;

    return empty ? (link.label || link.new_tab ? link : null) : link;
}

/**
 * Switching a link field between an address and an entry: the value keeps
 * only the chosen kind's target (what's saved), and the one it had for the
 * other kind is remembered, so switching back brings it back until the page
 * is left.
 */
export function switchLink(value: Record<string, unknown>, from: LinkKind, to: LinkKind, remembered: LinkTargets): { value: Record<string, unknown> | null; remembered: LinkTargets } {
    const kept: LinkTargets = from === 'url' ? { ...remembered, url: value.url } : { ...remembered, entry_id: value.entry_id };
    const link = { ...value, type: to, url: to === 'url' ? kept.url : undefined, entry_id: to === 'entry' ? kept.entry_id : undefined };

    return { value: linkValue(link), remembered: kept };
}
