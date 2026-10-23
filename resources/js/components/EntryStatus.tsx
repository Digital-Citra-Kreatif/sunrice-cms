import { t } from '@imajiner/admin-sdk';
import { Badge } from '@imajiner/admin-sdk/ui';
import { type EntryStatus, changesPending, statusLabel } from '@/lib/entries.ts';

/**
 * An entry's status as lists and the editor show it: Draft, Scheduled or
 * Live, and beside a published one whose draft differs, "Changes pending"
 * (the same words everywhere).
 */
export function EntryStatusBadges({ status, changes = false }: { status: EntryStatus; changes?: boolean }) {
    return (
        <>
            <Badge variant={status === 'published' ? 'success' : 'secondary'}>{statusLabel(status)}</Badge>
            {changesPending({ status, changes }) && (
                <Badge variant="warning" title={t('Saved changes visitors don\'t see yet')}>{t('Changes pending')}</Badge>
            )}
        </>
    );
}

/** Beside a field's label: its saved draft differs from the live version. */
export function ChangedMarker() {
    return (
        <span title={t('Different from the live version')} className="cms:ml-2 cms:inline-flex cms:items-center cms:gap-1 cms:align-middle cms:text-xs cms:font-normal cms:text-amber-700 cms:dark:text-amber-400">
            <span aria-hidden className="cms:size-1.5 cms:rounded-full cms:bg-amber-500" />
            {t('Changed')}
            <span className="cms:sr-only"> ({t('Different from the live version')})</span>
        </span>
    );
}
