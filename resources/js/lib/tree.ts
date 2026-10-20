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
