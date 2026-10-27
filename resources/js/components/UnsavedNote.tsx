import { t } from '@imajiner/admin-sdk';

/**
 * "Unsaved changes" beside a page's title: its space is kept while there
 * are none (hidden, not removed), so the header's buttons don't move when
 * the first change is made.
 */
export function UnsavedNote({ dirty }: { dirty: boolean }) {
    return (
        <span aria-hidden={!dirty} className={`cms:text-sm cms:whitespace-nowrap cms:text-muted-foreground cms:transition-opacity ${dirty ? '' : 'cms:invisible cms:opacity-0'}`}>
            {t('Unsaved changes')}
        </span>
    );
}
