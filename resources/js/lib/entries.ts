import { t } from '@imajiner/admin-sdk';

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

/**
 * What publishing does with the Publish date picked in the editor (the
 * date input's value, '' for none), compared with the one saved:
 * 'now' (no date, or the saved one), 'schedule' (a date to come),
 * 'backdate' (a past date on a draft: published now, dated then) or
 * 'redate' (another past date on a published entry). Both Publish
 * buttons go by it, so neither ignores a picked date.
 */
export function datedPublish(status: EntryStatus, picked: string, publishedAt: string | null, now: number = Date.now()): { action: 'now' | 'schedule' | 'backdate' | 'redate'; at: string | null } {
    const chosen = picked === '' ? null : new Date(picked);
    if (chosen === null || Number.isNaN(chosen.getTime())) return { action: 'now', at: null };
    const minute = (time: number) => Math.floor(time / 60_000);
    const saved = publishedAt ? new Date(publishedAt).getTime() : null;
    if (status !== 'draft' && saved !== null && minute(saved) === minute(chosen.getTime())) return { action: 'now', at: null };
    const at = chosen.toISOString();
    if (chosen.getTime() > now) return { action: 'schedule', at };

    return { action: status === 'draft' ? 'backdate' : 'redate', at };
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
 * title (a duplicate's "-copy", or "-copy-2" when that was taken) follows
 * the new one, while the entry has never been published (a live address
 * doesn't move by itself); a slug typed by hand stays.
 */
export function followingSlug(slug: string, oldTitle: string, newTitle: string, neverPublished: boolean): string {
    const made = slugFrom(oldTitle);
    const fromTitle = slug === made || (slug.startsWith(`${made}-`) && /^\d+$/.test(slug.slice(made.length + 1)));

    return neverPublished && made !== '' && fromTitle ? slugFrom(newTitle) : slug;
}

/**
 * What the slug field notes about a new slug: an address visitors have
 * known (`published`, the slug last published; null for a draft never
 * published or a page without an address) that publishing redirects from
 * ("redirects", while the entry is published), or that will lead nowhere
 * ("breaks"). Null while the slug is the same, or empty (made from the title).
 */
export function slugNote(published: string | null | undefined, slug: string, redirects: boolean): 'redirects' | 'breaks' | null {
    if (!published || slug.trim() === '' || slug.trim() === published) return null;

    return redirects ? 'redirects' : 'breaks';
}
