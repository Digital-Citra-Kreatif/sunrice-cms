/**
 * How wide fields are in the editor: a field's `width` is a percent of its
 * row (Field::WIDTHS), laid out on a 12-column grid so 33 + 66 and 4 × 25
 * fill a row exactly with the gap between them. Fields that don't fit wrap
 * to the next row; in a narrow field area (under 32rem: the editor's
 * sidebar, a phone) every field is full width.
 */

/** The widths a field may have, in percent (Field::WIDTHS); 100 when it has none. */
export const FIELD_WIDTHS = [25, 33, 50, 66, 75, 100] as const;

export type FieldWidth = (typeof FIELD_WIDTHS)[number];

/** A field's width: its own when it's one of the widths, else 100. */
export function fieldWidth(field: { width?: unknown }): FieldWidth {
    return FIELD_WIDTHS.find((width) => width === field.width) ?? 100;
}

/** How many of the grid's 12 columns a width takes: 25 → 3, 33 → 4, 50 → 6, 66 → 8, 75 → 9, 100 → 12. */
export function widthSpan(width: FieldWidth): number {
    return width === 33 ? 4 : width === 66 ? 8 : (width * 12) / 100;
}

/**
 * The row the fields sit in: a container (its width decides) with a 12-column
 * grid, labels lined up at the top. `gap` is the space between fields.
 */
export function fieldGrid(gap: 'cms:gap-x-4 cms:gap-y-6' | 'cms:gap-4' | 'cms:gap-6' = 'cms:gap-x-4 cms:gap-y-6'): string {
    return `cms:@container cms:grid cms:grid-cols-12 cms:items-start ${gap}`;
}

// Whole class names, so Tailwind finds them.
const SPANS: Record<FieldWidth, string> = {
    25: 'cms:@lg:col-span-3',
    33: 'cms:@lg:col-span-4',
    50: 'cms:@lg:col-span-6',
    66: 'cms:@lg:col-span-8',
    75: 'cms:@lg:col-span-9',
    100: '',
};

/** A field's place in fieldGrid(): full width, and its own width once the row is 32rem or wider. */
export function widthClass(field: { width?: unknown }): string {
    return `cms:col-span-12 cms:min-w-0 ${SPANS[fieldWidth(field)]}`.trim();
}

/** The field with that width: 100 is left out, as the server stores it. */
export function withWidth<T extends { width?: number }>(field: T, width: FieldWidth): T {
    const { width: _old, ...rest } = field;

    return (width === 100 ? rest : { ...rest, width }) as T;
}
