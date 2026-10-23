/** One rule of a condition: another field on its level is so. */
export interface FieldConditionRule {
    field: string;
    operator: 'equals' | 'not_equals' | 'filled' | 'empty';
    value?: string | number | boolean | null;
}

/** Several rules: every one holds ("all"), or one is enough ("any"). */
export interface FieldConditionGroup {
    match: 'all' | 'any';
    rules: FieldConditionRule[];
}

/** Shown only when other fields on its level are so: one rule, or several. */
export type FieldCondition = FieldConditionRule | FieldConditionGroup;

/** A field definition as stored (see Sunrice\Cms\Fields\Field). */
export interface FieldTranslation {
    label?: string;
    instructions?: string;
    options?: Record<string, string>;
}

/** A content language: its code and name. */
export interface LocaleInfo {
    code: string;
    name: string;
}

export interface FieldDefinition {
    handle: string;
    type: string;
    label?: string | null;
    required?: boolean;
    instructions?: string | null;
    translatable?: boolean | null;
    validation?: string[];
    config?: Record<string, unknown>;
    fields?: FieldDefinition[];
    condition?: FieldCondition | null;
    /** What visitors read in other languages, by language: label, instructions, a select's option labels by value. */
    translations?: Record<string, FieldTranslation>;
    /** How much of the row it takes in the editor, in percent (25, 33, 50, 66, 75; none: 100). See lib/width.ts. */
    width?: number;
    /** A flexible field's kinds of block, as the editor gets them. */
    blocks?: BlockType[];
    /** A terms field's taxonomy (its terms load from cms/terms/picker). */
    taxonomy?: string | null;
    /** An entries field's collections to choose from (handles). */
    collections?: string[];
    /** Inside a translated group, row or block of another language: the main language's value, read-only. */
    shared?: boolean;
}

/** A field type the builder offers, with its settings as fields. */
export interface FieldTypeInfo {
    type: string;
    label: string;
    hasChildren: boolean;
    /** Whether fields of this type are translated unless set otherwise (FieldType::translatableByDefault()). */
    translatable?: boolean;
    settings: FieldDefinition[];
}

export interface Option {
    value: string;
    label: string;
}

/** Validation errors by dot path ("fields.0.handle"). */
export type Errors = Record<string, string | undefined>;

/** A kind of flexible block: a fieldset, with its fields. */
export interface BlockType {
    type: string;
    label: string;
    fields: FieldDefinition[];
}
