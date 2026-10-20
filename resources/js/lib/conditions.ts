import type { FieldCondition, FieldDefinition } from '../types.ts';

/** What a condition may test (the server knows the same: Field::OPERATORS). */
export const OPERATORS: { value: FieldCondition['operator']; label: string; needsValue: boolean }[] = [
    { value: 'equals', label: 'is', needsValue: true },
    { value: 'not_equals', label: 'is not', needsValue: true },
    { value: 'filled', label: 'is filled in', needsValue: false },
    { value: 'empty', label: 'is empty', needsValue: false },
];

function comparable(value: unknown): string {
    if (value === true) return 'true';
    if (value === false) return 'false';
    return typeof value === 'string' || typeof value === 'number' ? String(value) : '';
}

/**
 * Whether a field shows, given the values on its level: as the server
 * decides (Field::isShownWith), so hidden fields are never required.
 */
export function isShown(field: FieldDefinition, siblings: Record<string, unknown>): boolean {
    const condition = field.condition;
    if (!condition) return true;
    const other = siblings[condition.field];
    const filled = other !== null && other !== undefined && other !== '' && other !== false && !(Array.isArray(other) && other.length === 0);
    const equal = (Array.isArray(other) ? other : [other]).map(comparable).includes(comparable(condition.value));

    switch (condition.operator) {
        case 'equals':
            return equal;
        case 'not_equals':
            return !equal;
        case 'filled':
            return filled;
        default:
            return !filled;
    }
}
