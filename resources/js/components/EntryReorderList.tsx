import * as React from 'react';
import { router } from '@inertiajs/react';
import { adminUrl, t } from '@imajiner/admin-sdk';
import { Card, SortableHandle, SortableList } from '@imajiner/admin-sdk/ui';
import { type EntryStatus } from '@/lib/entries.ts';
import { EntryStatusBadges } from '@/components/EntryStatus.tsx';
import { MoveToMenu, type MoveTarget } from '@/components/MoveToMenu.tsx';
import { childIndexes, moveToPosition, reorderLevel, treeOrder } from '@/lib/tree.ts';

export interface ReorderRow { id: number; title: string; status: EntryStatus; changes?: boolean; parentId?: number | null; parent?: string | null }

/**
 * An ordered collection's entries (all of them, every page's) as rows
 * dragged into order, or sent to a position from each row's menu: each
 * move saves (ReorderEntries). A hierarchical collection shows its tree:
 * each entry moves among its siblings, with what's under it. A save that
 * fails calls `onError` (the page loads the order again).
 */
export function EntryReorderList({ collection, rows, hierarchical = false, onError }: { collection: string; rows: ReorderRow[]; hierarchical?: boolean; onError?: () => void }) {
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
            { preserveScroll: true, preserveState: true, onError: () => { setItems(arrange(rows)); onError?.(); } });
    };
    const moveTo = (index: number, to: MoveTarget) => {
        const move = moveToPosition(items, index, to === 'top' ? 1 : to === 'bottom' ? Number.MAX_SAFE_INTEGER : to);
        if (move) save(move.parent, move.order);
    };

    const level = (parent: number): React.ReactNode => {
        const siblings = childIndexes(items, parent);
        const positions = new Map(siblings.map((index, i) => [index, i + 1]));
        return (
            <SortableList items={siblings} getId={(index) => items[index]!.id} getLabel={(index) => items[index]!.title} onReorder={(order) => save(parent, order)}
                className={parent < 0 ? 'cms:gap-1' : 'cms:mt-1 cms:gap-1 cms:pl-6'}>
                {(index, { handle, isOverlay }) => {
                    const row = items[index]!;
                    const position = positions.get(index) ?? 0;
                    return (
                        <div>
                            <div className="cms:flex cms:items-center cms:gap-2 cms:rounded-lg cms:border cms:border-border/70 cms:bg-card cms:p-2 cms:text-sm">
                                <SortableHandle {...handle} label={t('Move :title', { title: row.title })} />
                                <span className="cms:w-8 cms:flex-none cms:text-right cms:text-xs cms:tabular-nums cms:text-muted-foreground" aria-hidden="true">{position}</span>
                                <span className="cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium">{row.title}</span>
                                <EntryStatusBadges status={row.status} changes={row.changes} />
                                {!isOverlay && siblings.length > 1 && <MoveToMenu title={row.title} position={position} count={siblings.length} onMove={(to) => moveTo(index, to)} />}
                            </div>
                            {!isOverlay && childIndexes(items, index).length > 0 && level(index)}
                        </div>
                    );
                }}
            </SortableList>
        );
    };

    return (
        <Card className="cms:p-2">
            {hierarchical && <p className="cms:px-1 cms:pb-1 cms:text-xs cms:text-muted-foreground">{t('Entries move among those at their level, with what\'s under them. To put one under another, choose its Parent in its Page settings.')}</p>}
            {level(-1)}
        </Card>
    );
}
