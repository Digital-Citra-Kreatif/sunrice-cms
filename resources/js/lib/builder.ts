import type { Errors, FieldDefinition } from '../types.ts';

/** Groups and repeaters nest this deep (DefinitionValidator::MAX_DEPTH). */
export const MAX_DEPTH = 5;

/** A field in the builder: its definition plus a key that survives reordering. */
export interface BuilderField extends Omit<FieldDefinition, 'fields'> {
    key: string;
    fields: BuilderField[];
    /** Whether the handle was typed (then the label no longer changes it). */
    handleTouched: boolean;
}

let next = 0;
const newKey = () => `f${++next}`;

/** "Hero image" → "hero_image": the handle a label suggests. */
export function handleFromLabel(label: string): string {
    const handle = label
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .replace(/^[0-9_]+/, '')
        .slice(0, 64);

    return handle;
}

/** A handle not yet used on this level: "text", then "text_2"… */
export function uniqueHandle(base: string, siblings: { handle: string }[]): string {
    const taken = new Set(siblings.map((field) => field.handle));
    const start = handleFromLabel(base) || 'field';
    let handle = start;
    for (let i = 2; taken.has(handle); i++) {
        handle = `${start}_${i}`;
    }

    return handle;
}

export function fromDefinitions(definitions: FieldDefinition[] | undefined): BuilderField[] {
    return (definitions ?? []).map(({ fields, ...definition }) => ({
        ...definition,
        key: newKey(),
        fields: fromDefinitions(fields),
        handleTouched: true,
    }));
}

/** What is sent to the server: definitions without the builder's keys, children only where they belong. */
export function toDefinitions(fields: BuilderField[], hasChildren: (type: string) => boolean): FieldDefinition[] {
    return fields.map(({ key: _key, handleTouched: _touched, fields: children, ...definition }) => ({
        ...definition,
        validation: (definition.validation ?? []).map((rule) => rule.trim()).filter((rule) => rule !== ''),
        ...(hasChildren(definition.type) ? { fields: toDefinitions(children, hasChildren) } : {}),
    }));
}

export function newField(type: string, label: string, siblings: BuilderField[]): BuilderField {
    return { key: newKey(), type, label, handle: uniqueHandle(label, siblings), required: false, config: {}, fields: [], handleTouched: false };
}

/** Moves the item at `from` one place up (-1) or down (+1); out of range does nothing. */
export function move<T>(items: T[], from: number, by: -1 | 1): T[] {
    const to = from + by;
    if (from < 0 || from >= items.length || to < 0 || to >= items.length) return items;
    const copy = items.slice();
    const [item] = copy.splice(from, 1) as [T];
    copy.splice(to, 0, item);

    return copy;
}

/** Changes the label, and the handle with it while nobody typed one. */
export function relabel(field: BuilderField, label: string, siblings: BuilderField[]): BuilderField {
    if (field.handleTouched) return { ...field, label };
    const others = siblings.filter((sibling) => sibling.key !== field.key);

    return { ...field, label, handle: uniqueHandle(label || field.type, others) };
}

/** The errors under a path, with the path removed: errorsUnder({'fields.0.handle': 'x'}, 'fields.0') → {handle: 'x'}. */
export function errorsUnder(errors: Errors, path: string): Errors {
    const prefix = `${path}.`;
    const found: Errors = {};
    for (const [key, message] of Object.entries(errors)) {
        if (key.startsWith(prefix)) found[key.slice(prefix.length)] = message;
    }

    return found;
}

/** The errors for the value at a path: its own under "", and those under it. */
export function errorsAt(errors: Errors, path: string): Errors {
    const own = errors[path];

    return { ...errorsUnder(errors, path), ...(own !== undefined ? { '': own } : {}) };
}

/** Whether there's any error at or under a path. */
export function hasErrors(errors: Errors, path: string): boolean {
    return Object.keys(errors).some((key) => key === path || key.startsWith(`${path}.`));
}
