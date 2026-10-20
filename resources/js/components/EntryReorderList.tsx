import * as React from 'react';
import { router } from '@inertiajs/react';
import { adminUrl } from '@sunrice/admin-sdk';
import { Badge, Card, SortableHandle, SortableList } from '@sunrice/admin-sdk/ui';
import { type EntryStatus, statusLabel } from '@/lib/entries.ts';
import { siblingOrder } from '@/lib/tree.ts';

export interface ReorderRow { id: number; title: string; status: EntryStatus; parentId?: number | null; parent?: string | null }

/**
 * An ordered collection's list page as rows dragged into order: each drop
 * saves (ReorderEntries). In a hierarchical collection an entry moves
 * among its siblings only.
 */
export function EntryReorderList({ collection, rows }: { collection: string; rows: ReorderRow[] }) {
    const [order, setOrder] = React.useState(rows);
    React.useEffect(() => setOrder(rows), [rows]);

    const save = (next: ReorderRow[], to: number) => {
        const moved = next[to];
        if (!moved) return;
        const parentId = moved.parentId ?? null;
        const ids = siblingOrder(next, moved.id, (row) => row.parentId ?? null);
        setOrder(next);
        router.post(adminUrl('cms/entries/reorder'), { collection, ids, parent_id: parentId },
            { preserveScroll: true, preserveState: true, onError: () => setOrder(rows) });
    };

    return (
        <Card className="cms:p-2">
            <SortableList items={order} getId={(row) => row.id} onReorder={(next, _from, to) => save(next, to)} className="cms:gap-1">
                {(row, { handle }) => (
                    <div className="cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm">
                        <SortableHandle {...handle} label={`Move ${row.title}`} />
                        <span className="cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium">{row.title}</span>
                        {row.parent && <span className="cms:truncate cms:text-xs cms:text-muted-foreground">under {row.parent}</span>}
                        <Badge variant={row.status === 'published' ? 'default' : 'secondary'}>{statusLabel(row.status)}</Badge>
                    </div>
                )}
            </SortableList>
        </Card>
    );
}
