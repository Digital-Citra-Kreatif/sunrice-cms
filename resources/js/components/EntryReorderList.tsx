import * as React from 'react';
import { router } from '@inertiajs/react';
import { adminUrl, t } from '@sunrice/admin-sdk';
import { Badge, Card, SortableHandle, SortableList } from '@sunrice/admin-sdk/ui';
import { type EntryStatus, statusLabel } from '@/lib/entries.ts';
import { childIndexes, reorderLevel, treeOrder } from '@/lib/tree.ts';

export interface ReorderRow { id: number; title: string; status: EntryStatus; parentId?: number | null; parent?: string | null }

/**
 * An ordered collection's list page as rows dragged into order: each drop
 * saves (ReorderEntries). A hierarchical collection shows its tree: each
 * entry moves among its siblings, with what's under it.
 */
export function EntryReorderList({ collection, rows, hierarchical = false }: { collection: string; rows: ReorderRow[]; hierarchical?: boolean }) {
    const arrange = React.useCallback(
        (list: ReorderRow[]) => treeOrder(list, (row) => (hierarchical ? row.parentId : null)),
        [hierarchical],
    );
    const [items, setItems] = React.useState(() => arrange(rows));
    React.useEffect(() => setItems(arrange(rows)), [rows, arrange]);

    /** The entries directly under the one at `parent` (-1: the top) in the order dragged. */
    const save = (parent: number, order: number[]) => {
        const next = reorderLevel(items, parent, order);
        const ids = childIndexes(next, parent).map((index) => next[index]!.id);
        setItems(next);
        router.post(adminUrl('cms/entries/reorder'), { collection, ids, parent_id: parent < 0 ? null : (items[parent]?.id ?? null) },
            { preserveScroll: true, preserveState: true, onError: () => setItems(arrange(rows)) });
    };

    const level = (parent: number): React.ReactNode => (
        <SortableList items={childIndexes(items, parent)} getId={(index) => items[index]!.id} getLabel={(index) => items[index]!.title} onReorder={(order) => save(parent, order)}
            className={parent < 0 ? 'cms:gap-1' : 'cms:mt-1 cms:gap-1 cms:pl-6'}>
            {(index, { handle }) => {
                const row = items[index]!;
                return (
                    <div>
                        <div className="cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm">
                            <SortableHandle {...handle} label={t('Move :title', { title: row.title })} />
                            <span className="cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium">{row.title}</span>
                            <Badge variant={row.status === 'published' ? 'success' : 'secondary'}>{statusLabel(row.status)}</Badge>
                        </div>
                        {childIndexes(items, index).length > 0 && level(index)}
                    </div>
                );
            }}
        </SortableList>
    );

    return (
        <Card className="cms:p-2">
            {hierarchical && <p className="cms:px-1 cms:pb-1 cms:text-xs cms:text-muted-foreground">{t('Entries move among those at their level, with what\'s under them. To put one under another, choose its Parent in its Page settings.')}</p>}
            {level(-1)}
        </Card>
    );
}
