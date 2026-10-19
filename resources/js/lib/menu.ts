/**
 * The menu editor works on a flat list of items with depths (0 = top);
 * an item's children are the items right after it that are deeper. Every
 * change carries an item's children along.
 */

export interface MenuNode {
    entry_id: number | null;
    term_id: number | null;
    collection_id: number | null;
    /** For the editor: what it links to (an entry, a term's page, a listing page) and whether the site shows it. */
    target?: { title: string; kind: string; live: boolean } | null;
    url: string | null;
    labels: Record<string, string>;
    new_tab: boolean;
    children: MenuNode[];
}

export interface FlatItem extends Omit<MenuNode, 'children'> {
    key: string;
    depth: number;
}

let next = 0;

export function flatten(nodes: MenuNode[], depth = 0): FlatItem[] {
    return nodes.flatMap(({ children, ...node }) => [{ ...node, key: `m${++next}`, depth }, ...flatten(children ?? [], depth + 1)]);
}

export function toTree(items: FlatItem[]): MenuNode[] {
    const root: MenuNode[] = [];
    const stack: { depth: number; children: MenuNode[] }[] = [{ depth: -1, children: root }];
    for (const { key: _key, depth, ...item } of items) {
        while (stack.length > 1 && stack[stack.length - 1]!.depth >= depth) stack.pop();
        const node: MenuNode = { ...item, children: [] };
        stack[stack.length - 1]!.children.push(node);
        stack.push({ depth, children: node.children });
    }

    return root;
}

/** The index after an item's last child. */
export function subtreeEnd(items: FlatItem[], index: number): number {
    const depth = items[index]?.depth ?? 0;
    let end = index + 1;
    while (end < items.length && items[end]!.depth > depth) end++;

    return end;
}

function shift(items: FlatItem[], index: number, by: number): FlatItem[] {
    const end = subtreeEnd(items, index);

    return items.map((item, i) => (i >= index && i < end ? { ...item, depth: item.depth + by } : item));
}

/** Puts an item (with its children) under the item above it, when the depth allows. */
export function indent(items: FlatItem[], index: number, maxDepth: number): FlatItem[] {
    const item = items[index];
    const above = items[index - 1];
    if (!item || !above || item.depth > above.depth) return items;
    const deepest = Math.max(...items.slice(index, subtreeEnd(items, index)).map((i) => i.depth));
    if (deepest + 1 > maxDepth - 1) return items;

    return shift(items, index, 1);
}

export function outdent(items: FlatItem[], index: number): FlatItem[] {
    return (items[index]?.depth ?? 0) === 0 ? items : shift(items, index, -1);
}

/** Moves an item (with its children) past its previous (-1) or next (+1) sibling. */
export function moveItem(items: FlatItem[], index: number, by: -1 | 1): FlatItem[] {
    const item = items[index];
    if (!item) return items;
    const end = subtreeEnd(items, index);
    const block = items.slice(index, end);
    if (by === -1) {
        let sibling = index - 1;
        while (sibling >= 0 && items[sibling]!.depth > item.depth) sibling--;
        if (sibling < 0 || items[sibling]!.depth !== item.depth) return items;

        return [...items.slice(0, sibling), ...block, ...items.slice(sibling, index), ...items.slice(end)];
    }
    const sibling = items[end];
    if (!sibling || sibling.depth !== item.depth) return items;
    const siblingEnd = subtreeEnd(items, end);

    return [...items.slice(0, index), ...items.slice(end, siblingEnd), ...block, ...items.slice(siblingEnd)];
}

export function removeItem(items: FlatItem[], index: number): FlatItem[] {
    return [...items.slice(0, index), ...items.slice(subtreeEnd(items, index))];
}

export function newItem(item: Partial<FlatItem>): FlatItem {
    return { key: `m${++next}`, depth: 0, entry_id: null, term_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: false, ...item };
}
