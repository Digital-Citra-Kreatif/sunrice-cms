/** A field definition as stored (see Sunrice\Cms\Fields\Field). */
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
    /** A flexible field's kinds of block, as the editor gets them. */
    blocks?: BlockType[];
}

/** A field type the builder offers, with its settings as fields. */
export interface FieldTypeInfo {
    type: string;
    label: string;
    hasChildren: boolean;
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
