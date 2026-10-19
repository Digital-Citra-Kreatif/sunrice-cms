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
