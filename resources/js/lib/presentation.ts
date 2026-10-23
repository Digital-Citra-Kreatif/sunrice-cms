/**
 * How a field presents itself in the editor, besides its input: the hint
 * at the right of its label (with an ⓘ for its tooltip), the helper text
 * under the input (lib/inline-markdown.ts) and the prefix and suffix
 * attached to a text or number input. Display only: none of it is stored
 * with the value.
 */

/** Types whose input can carry a prefix and a suffix. */
export const AFFIX_TYPES = ['text', 'number'];

/** Types that hold other fields: their helper text sits under their heading, not under an input. */
export const CONTAINER_TYPES = ['group', 'repeater', 'flexible'];

/** Settings the builder shows under Appearance (Sunrice\Cms\Fields\Types\InputSettings). */
export const APPEARANCE_SETTINGS = ['placeholder', 'prefix', 'suffix'];

function text(value: unknown): string | null {
    return typeof value === 'string' && value.trim() !== '' ? value.trim() : null;
}

/** The hint and its tooltip, each null when there's none. */
export function hintOf(field: { hint?: unknown; hint_tooltip?: unknown }): { hint: string | null; tooltip: string | null } {
    return { hint: text(field.hint), tooltip: text(field.hint_tooltip) };
}

/** The prefix and suffix of a text or number input, each null when there's none (or the type has none). */
export function affixesOf(field: { type: string; config?: Record<string, unknown> }): { prefix: string | null; suffix: string | null } {
    if (!AFFIX_TYPES.includes(field.type)) return { prefix: null, suffix: null };

    return { prefix: text(field.config?.prefix), suffix: text(field.config?.suffix) };
}
