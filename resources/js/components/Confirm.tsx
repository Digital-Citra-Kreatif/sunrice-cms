import * as React from 'react';
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@sunrice/admin-sdk/ui';

/** const [confirm, dialog] = useConfirm(); confirm('Delete it?', () => …); render {dialog}. */
export function useConfirm(): [(message: string, onConfirm: () => void) => void, React.ReactNode] {
    const [pending, setPending] = React.useState<{ message: string; onConfirm: () => void } | null>(null);

    const dialog = (
        <Dialog open={pending !== null} onOpenChange={(open: boolean) => !open && setPending(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>{pending?.message}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setPending(null)}>Cancel</Button>
                    <Button type="button" variant="destructive" onClick={() => { pending?.onConfirm(); setPending(null); }}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return [(message, onConfirm) => setPending({ message, onConfirm }), dialog];
}
