export type EntryStatus = 'draft' | 'scheduled' | 'published';

export function statusLabel(status: EntryStatus): string {
    return { draft: 'Draft', scheduled: 'Scheduled', published: 'Published' }[status];
}

/** An ISO date as the reader's local date and time ("19 Oct 2026, 14:30"), or "—". */
export function formatDate(iso: string | null | undefined, locale?: string): string {
    if (!iso) return '—';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '—';

    // The 24-hour clock, as the date picker's time.
    return date.toLocaleString(locale, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
}

/**
 * Where "Publish on a date" starts: the date it's scheduled for, when that's
 * still to come; else tomorrow, on the hour (never an old publish date).
 */
export function scheduleStart(current: string | null, now: Date = new Date()): Date {
    const scheduled = current ? new Date(current) : null;
    if (scheduled && !Number.isNaN(scheduled.getTime()) && scheduled > now) return scheduled;
    const start = new Date(now);
    start.setDate(start.getDate() + 1);
    start.setMinutes(0, 0, 0);

    return start;
}

/** The value of a datetime-local input for an ISO date, in the reader's time zone. */
export function localInputValue(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** A language's name in the reader's language ("id" → "Indonesian"), or its code. */
export function localeName(code: string, inLocale?: string): string {
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
