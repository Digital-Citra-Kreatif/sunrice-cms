/**
 * Lists in tree order with depths (0 = top), as the menu editor and the
 * terms list hold them: an item's children are the items right after it
 * that are deeper. These helpers reorder one level, children carried along.
 */

export interface Depthed {
    depth: number;
}

/** The index after the item's last child (its subtree is items[index, end)). */
export function subtreeEnd(items: readonly Depthed[], index: number): number {
    const depth = items[index]?.depth ?? 0;
    let end = index + 1;
    while (end < items.length && items[end]!.depth > depth) end++;

    return end;
}

/** Indexes of the items directly under the item at `parent` (-1: the top level). */
export function childIndexes(items: readonly Depthed[], parent: number): number[] {
    const start = parent < 0 ? 0 : parent + 1;
    const end = parent < 0 ? items.length : subtreeEnd(items, parent);
    const depth = parent < 0 ? 0 : (items[parent]?.depth ?? 0) + 1;
    const found: number[] = [];
    for (let i = start; i < end; i++) {
        if (items[i]!.depth === depth) found.push(i);
    }

    return found;
}

/**
 * The list with the items directly under `parent` in the order given
 * (their indexes, as childIndexes() gave them, reordered), each with its
 * children. Anything else given leaves the list as it was.
 */
export function reorderLevel<T extends Depthed>(items: readonly T[], parent: number, order: readonly number[]): T[] {
    const current = childIndexes(items, parent);
    if (order.length !== current.length || [...order].sort((a, b) => a - b).some((index, i) => index !== current[i])) return items.slice();
    if (current.length === 0) return items.slice();
    const start = current[0]!;
    const end = subtreeEnd(items, current[current.length - 1]!);
    const blocks = order.flatMap((index) => items.slice(index, subtreeEnd(items, index)));

    return [...items.slice(0, start), ...blocks, ...items.slice(end)];
}

/**
 * Items with parents (by id), as a flat list in any order, in tree order
 * with depths: each level keeps the order the items came in. Items whose
 * parent isn't in the list (or that are in a loop) go to the top level.
 */
export function treeOrder<T extends { id: number }>(items: readonly T[], parentOf: (item: T) => number | null | undefined): (T & Depthed)[] {
    const ids = new Set(items.map((item) => item.id));
    const children = new Map<number | null, T[]>();
    for (const item of items) {
        const parent = parentOf(item);
        const key = parent !== null && parent !== undefined && ids.has(parent) ? parent : null;
        const level = children.get(key);
        if (level) level.push(item);
        else children.set(key, [item]);
    }
    const out: (T & Depthed)[] = [];
    const placed = new Set<number>();
    const walk = (parent: number | null, depth: number) => {
        for (const item of children.get(parent) ?? []) {
            if (placed.has(item.id)) continue;
            placed.add(item.id);
            out.push({ ...item, depth });
            walk(item.id, depth + 1);
        }
    };
    walk(null, 0);
    // In a loop, none of them reaches the top: they're shown there.
    for (const item of items) {
        if (!placed.has(item.id)) {
            placed.add(item.id);
            out.push({ ...item, depth: 0 });
            walk(item.id, 1);
        }
    }

    return out;
}

/** The index of the item's parent: the nearest item before it one level up (-1: it's at the top). */
export function parentIndex(items: readonly Depthed[], index: number): number {
    const depth = items[index]?.depth ?? 0;
    for (let i = index - 1; i >= 0; i--) {
        if (items[i]!.depth < depth) return i;
    }

    return -1;
}

/** Where the item stands among its siblings: its parent's index, its position (from 1) and how many they are. */
export function levelPosition(items: readonly Depthed[], index: number): { parent: number; position: number; count: number } {
    const parent = parentIndex(items, index);
    const siblings = childIndexes(items, parent);

    return { parent, position: siblings.indexOf(index) + 1, count: siblings.length };
}

/**
 * The order of the item's level (indexes, as childIndexes() gives them)
 * with the item at `position` among its siblings: 1 is the first, past
 * the last is the last, below 1 the first. Null when it doesn't move.
 */
export function moveToPosition(items: readonly Depthed[], index: number, position: number): { parent: number; order: number[] } | null {
    const { parent } = levelPosition(items, index);
    const siblings = childIndexes(items, parent);
    const from = siblings.indexOf(index);
    if (from < 0 || !Number.isFinite(position)) return null;
    const to = Math.min(Math.max(Math.trunc(position), 1), siblings.length) - 1;
    if (to === from) return null;
    const order = siblings.filter((i) => i !== index);
    order.splice(to, 0, index);

    return { parent, order };
}
