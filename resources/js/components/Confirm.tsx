import * as React from 'react';
import { t } from '@sunrice/admin-sdk';
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@sunrice/admin-sdk/ui';

/**
 * const [confirm, dialog] = useConfirm(); confirm('Delete it?', () => …); render {dialog}.
 * The button says "Delete" unless given another label ("Move to trash" for what can be restored).
 */
export function useConfirm(): [(message: string, onConfirm: () => void, label?: string) => void, React.ReactNode] {
    const [pending, setPending] = React.useState<{ message: string; onConfirm: () => void; label: string } | null>(null);

    const dialog = (
        <Dialog open={pending !== null} onOpenChange={(open: boolean) => !open && setPending(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('Are you sure?')}</DialogTitle>
                    <DialogDescription>{pending?.message}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setPending(null)}>{t('Cancel')}</Button>
                    <Button type="button" variant="destructive" onClick={() => { pending?.onConfirm(); setPending(null); }}>{pending?.label ?? t('Delete')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return [(message, onConfirm, label = 'Delete') => setPending({ message, onConfirm, label }), dialog];
}
