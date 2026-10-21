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
 * The ids of the moved item and its siblings (same parent), in the order
 * they now stand in `items`: what to save after a drag in a flat list.
 */
export function siblingOrder<T extends { id: number }>(items: readonly T[], moved: number, parentOf: (item: T) => number | null): number[] {
    const item = items.find((other) => other.id === moved);
    if (!item) return [];
    const parent = parentOf(item);

    return items.filter((other) => parentOf(other) === parent).map((other) => other.id);
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
        children.set(key, [...(children.get(key) ?? []), item]);
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
