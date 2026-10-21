import { t } from '@sunrice/admin-sdk';

export type EntryStatus = 'draft' | 'scheduled' | 'published';

export function statusLabel(status: EntryStatus): string {
    return { draft: t('Draft'), scheduled: t('Scheduled'), published: t('Published') }[status];
}

/** An ISO date as the reader's local date and time ("19 Oct 2026, 14:30"), or "—". */
export function formatDate(iso: string | null | undefined, locale?: string): string {
    if (!iso) return '—';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '—';

    // The 24-hour clock, as the date picker's time.
    return date.toLocaleString(locale ?? (document.documentElement.lang || undefined), { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
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

/** A slug made from a title, as the server makes it ("Villa Arunika (copy)" → "villa-arunika-copy"). */
export function slugFrom(title: string): string {
    return title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/**
 * The slug after the title changes: a slug that was made from the old
 * title (a duplicate's "-copy") follows the new one, while the entry has
 * never been published (a live address doesn't move by itself); a slug
 * typed by hand stays.
 */
export function followingSlug(slug: string, oldTitle: string, newTitle: string, neverPublished: boolean): string {
    return neverPublished && slug !== '' && slug === slugFrom(oldTitle) ? slugFrom(newTitle) : slug;
}
