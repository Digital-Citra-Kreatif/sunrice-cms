/** The term picker's selection and keyboard logic, apart from React. */

export interface TermOption { id: number; label: string; depth: number }

/** The picker's value as a list of term ids. */
export function chosenIds(value: number | number[] | null): number[] {
    return value === null ? [] : Array.isArray(value) ? value : [value];
}

/** Whether no other term may be added (several terms, `max` reached). */
export function isFull(ids: readonly number[], multiple: boolean, max: number | null): boolean {
    return multiple && max !== null && ids.length >= max;
}

/**
 * The ids after picking a term: with several terms it's added (at the end,
 * unless `max` is reached) or taken out; with one, it replaces the term.
 */
export function pickTerm(ids: readonly number[], id: number, multiple: boolean, max: number | null): number[] {
    if (!multiple) return [id];
    if (ids.includes(id)) return ids.filter((other) => other !== id);

    return isFull(ids, multiple, max) ? ids.slice() : [...ids, id];
}

/** The ids without the last one (Backspace in an empty search). */
export function withoutLast(ids: readonly number[]): number[] {
    return ids.slice(0, -1);
}

/** The value to send for these ids: a list with several terms, else one id or null. */
export function termValue(ids: readonly number[], multiple: boolean): number | number[] | null {
    return multiple ? ids.slice() : (ids[0] ?? null);
}

/**
 * The option to highlight after a key: ↓/↑ move to the next or previous one
 * that isn't disabled (staying put at either end), Home/End to the first or
 * last. -1 is none (an empty list, or nothing highlighted yet).
 */
export function moveActive(current: number, key: string, count: number, disabled: (index: number) => boolean = () => false): number {
    const step = key === 'ArrowDown' || key === 'Home' ? 1 : key === 'ArrowUp' || key === 'End' ? -1 : 0;
    if (step === 0 || count === 0) return current;
    let index = key === 'Home' ? 0 : key === 'End' ? count - 1 : current + step;
    if (key === 'ArrowUp' && current === -1) index = count - 1;
    while (index >= 0 && index < count && disabled(index)) index += step;

    return index >= 0 && index < count ? index : current;
}

/** The pages of a list put together, each term once. */
export function appendPage(items: readonly TermOption[], page: readonly TermOption[]): TermOption[] {
    const seen = new Set(items.map((item) => item.id));

    return [...items, ...page.filter((item) => !seen.has(item.id))];
}

/** The titles of each term's parents, top first, read off a list in tree order with depths. */
export function parentPaths(items: readonly TermOption[]): Record<number, string[]> {
    const stack: string[] = [];
    const paths: Record<number, string[]> = {};
    for (const item of items) {
        stack.length = Math.min(stack.length, item.depth);
        paths[item.id] = stack.slice();
        stack.push(item.label);
    }

    return paths;
}

/** A term with its parents ("News › Local"), for a tooltip. */
export function termPath(label: string, parents: readonly string[] | undefined): string {
    return [...(parents ?? []), label].join(' › ');
}
