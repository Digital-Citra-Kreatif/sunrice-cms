import type { Errors, FieldDefinition } from '../types.ts';

/** Says a text in the user's language (the panel's t); the tests run without one. */
type Translate = (text: string, replace?: Record<string, string>) => string;
const english: Translate = (text, replace = {}) => text.replace(/:([A-Za-z_]+)/g, (match, name: string) => replace[name] ?? match);

/** Groups and repeaters nest this deep (DefinitionValidator::MAX_DEPTH). */
export const MAX_DEPTH = 5;

/** A field in the builder: its definition plus a key that survives reordering. */
export interface BuilderField extends Omit<FieldDefinition, 'fields'> {
    key: string;
    fields: BuilderField[];
    /** Whether the handle was typed (then the label no longer changes it). */
    handleTouched: boolean;
    /** The handle it was saved with (none for a field added since): content keeps its values under it. */
    savedHandle?: string;
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

/**
 * What can be typed in a handle box: lowercase letters, numbers and
 * underscores, from a letter ("Hero Image" typed becomes "hero_image"),
 * the end left as typed.
 */
export function cleanHandle(typed: string): string {
    return typed
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9_]+/g, '_')
        .replace(/^[0-9_]+/, '')
        .replace(/_{2,}/g, '_')
        .slice(0, 64);
}

/** The same as cleanHandle ("Contact-Person" → "contact_person"). */
export const handleInput = cleanHandle;

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
        savedHandle: definition.handle,
    }));
}

/** What is sent to the server: definitions without the builder's keys, children only where they belong. */
export function toDefinitions(fields: BuilderField[], hasChildren: (type: string) => boolean): FieldDefinition[] {
    return fields.map(({ key: _key, handleTouched: _touched, savedHandle: _saved, fields: children, ...definition }) => ({
        ...definition,
        validation: (definition.validation ?? []).map((rule) => rule.trim()).filter((rule) => rule !== ''),
        ...(hasChildren(definition.type) ? { fields: toDefinitions(children, hasChildren) } : {}),
    }));
}

export function newField(type: string, label: string, siblings: BuilderField[]): BuilderField {
    return { key: newKey(), type, label, handle: uniqueHandle(label, siblings), required: false, config: {}, fields: [], handleTouched: false };
}

/**
 * Whether a saved field's handle was changed: its values stay stored under
 * the old one, out of sight (sunrice:rename-field moves them). A fieldset
 * include has no handle of its own.
 */
export function renamedFrom(field: Pick<BuilderField, 'handle' | 'type' | 'savedHandle'>): string | null {
    return field.type !== 'fieldset' && field.savedHandle !== undefined && field.savedHandle !== '' && field.handle !== field.savedHandle ? field.savedHandle : null;
}

/** The fields once saved: their handles now are the ones content keeps values under. */
export function markSaved(fields: BuilderField[]): BuilderField[] {
    return fields.map((field) => ({ ...field, savedHandle: field.handle, fields: markSaved(field.fields) }));
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

/** The error keys at or under a path: cleared once that value is edited, so a fixed field shows no stale error. */
export function errorKeysAt(errors: Errors, path: string): string[] {
    return Object.keys(errors).filter((key) => key === path || key.startsWith(`${path}.`));
}

/** Whether there's any error at or under a path. */
export function hasErrors(errors: Errors, path: string): boolean {
    return Object.keys(errors).some((key) => key === path || key.startsWith(`${path}.`));
}

/** The fields on a level that a field's "Show when" may look at: the others with a handle and a value of their own (not a fieldset include). */
export function conditionChoices<T extends { key: string; handle: string; type: string }>(field: { key: string }, siblings: T[]): T[] {
    return siblings.filter((sibling) => sibling.key !== field.key && sibling.handle !== '' && sibling.type !== 'fieldset');
}

/** A blueprint's top level: the handles content keeps for itself (Blueprint::RESERVED). */
export type ReservedHandles = string[];

/** What's wrong with a field's handle before saving: taken on its level, or kept by content for itself. */
export function handleWarning(field: { key: string; handle: string; type: string }, siblings: { key: string; handle: string; type: string }[], reserved?: ReservedHandles, translate: Translate = english): string | null {
    if (field.type === 'fieldset') return null;
    if (reserved?.includes(field.handle)) {
        return translate('":handle" is used by the content itself; choose another handle.', { handle: field.handle });
    }
    if (field.handle !== '' && siblings.some((sibling) => sibling.key !== field.key && sibling.type !== 'fieldset' && sibling.handle === field.handle)) {
        return translate('There is already a field ":handle" here.', { handle: field.handle });
    }

    return null;
}

/** Whether a field is translated: its own setting, else its type's default (FieldType::translatableByDefault()). */
export function isTranslatable(field: Pick<BuilderField, 'translatable'>, typeDefault: boolean): boolean {
    return typeof field.translatable === 'boolean' ? field.translatable : typeDefault;
}

/** Turns "Translatable" on or off: the same as the type's default is stored as unset, so definitions stay clean and follow the type. */
export function setTranslatable<T extends Pick<BuilderField, 'translatable'>>(field: T, on: boolean, typeDefault: boolean): T {
    return { ...field, translatable: on === typeDefault ? null : on };
}

/** A copy's handle on its level: "excerpt_copy", then "excerpt_copy_2"…, never a reserved one, at most 64 characters. */
export function copyHandle(handle: string, siblings: { handle: string }[], reserved: ReservedHandles = []): string {
    const taken = new Set([...siblings.map((field) => field.handle), ...reserved]);
    const base = `${(cleanHandle(handle) || 'field').slice(0, 64 - '_copy_99'.length)}_copy`;
    let copy = base;
    for (let i = 2; taken.has(copy); i++) {
        copy = `${base}_${i}`;
    }

    return copy;
}

/** A field and what's inside it with new builder keys and nothing saved: settings, condition and translations copied deeply. */
function cloneField(field: BuilderField): BuilderField {
    const { key: _key, savedHandle: _saved, fields, ...rest } = field;

    return { ...(structuredClone(rest) as Omit<BuilderField, 'key' | 'savedHandle' | 'fields'>), key: newKey(), fields: fields.map(cloneField) };
}

/**
 * "Duplicate": a copy of the field at `index`, put right after it, labelled
 * "… (copy)" with a handle of its own on this level. Unsaved, like any new
 * field. Returns the fields and the copy.
 */
export function duplicateField(fields: BuilderField[], index: number, reserved: ReservedHandles = [], translate: Translate = english): { fields: BuilderField[]; copy: BuilderField } | null {
    const field = fields[index];
    if (field === undefined) return null;
    const label = field.label || field.handle;
    const copy: BuilderField = {
        ...cloneField(field),
        label: translate(':label (copy)', { label }),
        handle: field.type === 'fieldset' ? field.handle : copyHandle(field.handle, fields, reserved),
        handleTouched: true,
    };

    return { fields: [...fields.slice(0, index + 1), copy, ...fields.slice(index + 1)], copy };
}

/**
 * The switch a setting depends on: a setting shown only while a toggle among the settings is on
 * ("At most" while "Several terms" is), which the builder shows inline next to that switch.
 */
export function dependsOn(setting: FieldDefinition, settings: FieldDefinition[]): string | null {
    const condition = setting.condition;
    if (!condition || 'rules' in condition) return null;
    const on = condition.operator === 'filled' || (condition.operator === 'equals' && (condition.value === true || condition.value === 'true'));

    return on && settings.some((other) => other.handle === condition.field && other.type === 'toggle') ? condition.field : null;
}

/**
 * A type's settings in the builder's sections: "Options" (choices, lists, switches and long texts, full
 * width) and "Limits and defaults" (numbers and short texts, side by side on one compact row). Settings
 * that depend on a switch go with it instead, by its handle.
 */
export function settingGroups(settings: FieldDefinition[]): { options: FieldDefinition[]; limits: FieldDefinition[]; dependents: Record<string, FieldDefinition[]> } {
    const compact = (setting: FieldDefinition) => setting.type === 'number' || (setting.type === 'text' && (setting.instructions ?? '').length <= 60);
    const dependents: Record<string, FieldDefinition[]> = {};
    const free: FieldDefinition[] = [];
    for (const setting of settings) {
        const on = dependsOn(setting, settings);
        if (on === null) free.push(setting);
        else (dependents[on] ??= []).push(setting);
    }

    return { options: free.filter((setting) => !compact(setting)), limits: free.filter(compact), dependents };
}
