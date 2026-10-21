import type { FieldCondition, FieldConditionRule, FieldDefinition } from '../types.ts';

/** What a condition may test (the server knows the same: Field::OPERATORS). */
export const OPERATORS: { value: FieldConditionRule['operator']; label: string; needsValue: boolean }[] = [
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

/** A condition's rules: none, its one rule, or its several. */
export function conditionRules(condition: FieldCondition | null | undefined): FieldConditionRule[] {
    if (!condition) return [];

    return 'rules' in condition ? (Array.isArray(condition.rules) ? condition.rules : []) : [condition];
}

/** How a condition's rules combine: all of them (also a single rule), or any one. */
export function conditionMatch(condition: FieldCondition | null | undefined): 'all' | 'any' {
    return condition && 'rules' in condition && condition.match === 'any' ? 'any' : 'all';
}

/**
 * The condition to store for these rules: none for no rules, the rule
 * itself for one (as definitions written before several existed), else
 * the rules with how they combine.
 */
export function conditionFrom(rules: FieldConditionRule[], match: 'all' | 'any'): FieldCondition | null {
    if (rules.length === 0) return null;
    if (rules.length === 1) return rules[0]!;

    return { match, rules };
}

function holds(rule: FieldConditionRule, siblings: Record<string, unknown>): boolean {
    const other = siblings[rule.field];
    const filled = other !== null && other !== undefined && other !== '' && other !== false && !(Array.isArray(other) && other.length === 0);
    const equal = (Array.isArray(other) ? other : [other]).map(comparable).includes(comparable(rule.value));

    switch (rule.operator) {
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

/**
 * Whether a field shows, given the values on its level: as the server
 * decides (Field::isShownWith), so hidden fields are never required.
 * Several rules must all hold, or any one.
 */
export function isShown(field: FieldDefinition, siblings: Record<string, unknown>): boolean {
    const rules = conditionRules(field.condition);
    if (rules.length === 0) return true;

    return conditionMatch(field.condition) === 'any' ? rules.some((rule) => holds(rule, siblings)) : rules.every((rule) => holds(rule, siblings));
}

/** What a rule's value is chosen with, by the other field's type. */
export type ConditionValueInput =
    | { kind: 'options'; options: { value: string; label: string }[] }
    | { kind: 'toggle' }
    | { kind: 'terms'; taxonomy: string | null }
    | { kind: 'entries'; collections: string[] }
    | { kind: 'number' }
    | { kind: 'text' };

/**
 * The input that fits a rule's value: a select's own options, On / Off for
 * a toggle, a term or entry picker, a number, else text.
 */
export function conditionValueInput(other: Pick<FieldDefinition, 'type' | 'config'> | undefined): ConditionValueInput {
    const config = other?.config ?? {};
    switch (other?.type) {
        case 'select': {
            const options = (Array.isArray(config.options) ? config.options : []).flatMap((option: unknown) => {
                if (typeof option === 'string' && option !== '') return [{ value: option, label: option }];
                if (option && typeof option === 'object' && typeof (option as { value?: unknown }).value === 'string' && (option as { value: string }).value !== '') {
                    const { value, label } = option as { value: string; label?: unknown };
                    return [{ value, label: typeof label === 'string' && label !== '' ? label : value }];
                }
                return [];
            });
            return options.length > 0 ? { kind: 'options', options } : { kind: 'text' };
        }
        case 'toggle':
            return { kind: 'toggle' };
        case 'terms':
            return { kind: 'terms', taxonomy: typeof config.taxonomy === 'string' && config.taxonomy !== '' ? config.taxonomy : null };
        case 'entries':
            return { kind: 'entries', collections: Array.isArray(config.collections) ? config.collections.filter((c): c is string => typeof c === 'string') : [] };
        case 'number':
            return { kind: 'number' };
        default:
            return { kind: 'text' };
    }
}

/** A rule's value as a new kind of input starts it: true for a toggle, the first option of a select, else empty. */
export function startValue(input: ConditionValueInput): string | number | boolean | null {
    switch (input.kind) {
        case 'toggle':
            return true;
        case 'options':
            return input.options[0]?.value ?? '';
        case 'terms':
        case 'entries':
        case 'number':
            return null;
        default:
            return '';
    }
}
