import { t } from '@imajiner/admin-sdk';
import type { slugNote } from '@/lib/entries.ts';

/** A quiet note under a slug field whose new value moves a page's address (slugNote()). */
export function SlugNote({ note, redirectsUrl }: { note: ReturnType<typeof slugNote>; redirectsUrl?: string | null }) {
    return (
        <div aria-live="polite">
            {note !== null && (
                <p className="cms:text-xs cms:text-muted-foreground">
                    {note === 'redirects' ? t('Once published, the old address redirects to the new one.') : t('The old address will stop working (404) unless a redirect is added.')}
                    {note === 'breaks' && redirectsUrl && (
                        <>
                            {' '}
                            <a href={redirectsUrl} target="_blank" rel="noopener" className="cms:underline cms:underline-offset-2 cms:hover:text-foreground">{t('Add a redirect')}</a>
                        </>
                    )}
                </p>
            )}
        </div>
    );
}
