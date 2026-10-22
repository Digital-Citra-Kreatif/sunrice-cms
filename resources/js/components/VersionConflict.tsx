import { router } from '@inertiajs/react';
import { t } from '@sunrice/admin-sdk';
import { Button } from '@sunrice/admin-sdk/ui';
import { useConfirm } from '@/components/Confirm.tsx';

/**
 * The notice after "someone else saved": load their version, or save
 * mine over it (the form is sent again without a version to check).
 */
export function VersionConflict({ message, processing, onSaveMine }: { message: string | undefined; processing: boolean; onSaveMine: () => void }) {
    const [confirm, confirmDialog] = useConfirm();
    if (!message) return null;

    return (
        <div role="alert" className="cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive">
            {confirmDialog}
            <span>{message}</span>
            <span className="cms:flex cms:gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => router.reload()}>{t('Load theirs')}</Button>
                <Button type="button" variant="destructive" size="sm" disabled={processing}
                    onClick={() => confirm(t('Save your version over theirs? Their changes are replaced.'), onSaveMine)}>
                    {t('Save mine anyway')}
                </Button>
            </span>
        </div>
    );
}
