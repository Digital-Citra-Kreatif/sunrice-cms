export type EntryStatus = 'draft' | 'scheduled' | 'published';

export function statusLabel(status: EntryStatus): string {
    return { draft: 'Draft', scheduled: 'Scheduled', published: 'Published' }[status];
}

/** An ISO date as the reader's local date and time ("19 Oct 2026, 14:30"), or "—". */
export function formatDate(iso: string | null | undefined, locale?: string): string {
    if (!iso) return '—';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '—';

    return date.toLocaleString(locale, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/** The value of a datetime-local input for an ISO date, in the reader's time zone. */
export function localInputValue(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** A language's name: as Settings → Languages names it, else in the reader's language ("id" → "Indonesian"), or its code. */
/** The content languages' names as Settings → Languages gives them (shared with every admin page as `cms.locales`). */
let names: Record<string, string> = {};

export function setLocaleNames(next: Record<string, string> | null | undefined): void {
    names = next ?? {};
}

export function localeName(code: string, inLocale?: string): string {
    // The site's own name for it, so every screen says the same ("Bahasa Indonesia"), unless asked in another language.
    if (inLocale === undefined && names[code]) return names[code];
    try {
        return new Intl.DisplayNames(inLocale ? [inLocale] : undefined, { type: 'language' }).of(code.replace('_', '-')) ?? code;
    } catch {
        return code;
    }
}

export interface EntryLocale {
    code: string;
    /** As Settings → Languages names it. */
    name?: string;
    main: boolean;
    status: EntryStatus | null;
    /** The main language changed since this translation was last saved. */
    outdated?: boolean;
}
