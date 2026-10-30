import * as React from 'react';
import { ArrowDownToLine, ArrowUpToLine, ListOrdered, MoreHorizontal } from 'lucide-react';
import { t } from '@imajiner/admin-sdk';
import {
    Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger, Input, Label,
} from '@imajiner/admin-sdk/ui';

export type MoveTarget = 'top' | 'bottom' | number;

/**
 * A row's "⋯" menu for long lists, where dragging or arrows take too
 * long: Move to top, Move to bottom, and Move to position… (a number
 * among the entries at its level). `position` and `count` (when known)
 * disable what wouldn't move it and bound the number.
 */
export function MoveToMenu({ title, position, count, onMove }: { title: string; position?: number; count?: number; onMove: (to: MoveTarget) => void }) {
    const [asking, setAsking] = React.useState(false);
    const [value, setValue] = React.useState('');
    const id = React.useId();
    const number = /^\d+$/.test(value.trim()) ? Number(value.trim()) : null;
    const valid = number !== null && number >= 1;
    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!valid) return;
        setAsking(false);
        onMove(count !== undefined ? Math.min(number, count) : number);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label={t('More ways to move :title', { title })}><MoreHorizontal /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled={position === 1} onSelect={() => onMove('top')}><ArrowUpToLine /> {t('Move to top')}</DropdownMenuItem>
                    <DropdownMenuItem disabled={position !== undefined && position === count} onSelect={() => onMove('bottom')}><ArrowDownToLine /> {t('Move to bottom')}</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => { setValue(position !== undefined ? String(position) : ''); setAsking(true); }}><ListOrdered /> {t('Move to position…')}</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {asking && (
                <Dialog open onOpenChange={(open: boolean) => !open && setAsking(false)}>
                    <DialogContent>
                        <form onSubmit={submit} className="cms:flex cms:flex-col cms:gap-4">
                            <DialogHeader>
                                <DialogTitle>{t('Move :title', { title })}</DialogTitle>
                                <DialogDescription>
                                    {count !== undefined && position !== undefined
                                        ? t('It\'s number :position of :count at its level. 1 puts it first.', { position, count })
                                        : t('Among the entries at its level: 1 puts it first, a number past the last puts it last.')}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="cms:flex cms:flex-col cms:gap-1.5">
                                <Label htmlFor={id}>{t('Position')}</Label>
                                <Input id={id} type="number" inputMode="numeric" min={1} max={count} step={1} autoFocus value={value}
                                    aria-invalid={value !== '' && !valid}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setAsking(false)}>{t('Cancel')}</Button>
                                <Button type="submit" disabled={!valid}>{t('Move')}</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
