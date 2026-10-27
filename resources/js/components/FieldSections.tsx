import { Card, CardContent, CollapsibleCard } from '@imajiner/admin-sdk/ui';
import { FieldError, FieldInput, Fields, labelOf } from '@/components/FieldInput.tsx';
import { ChangedMarker } from '@/components/EntryStatus.tsx';
import { FieldHint, HelperText, MainLanguage, SharedHint } from '@/components/FieldPresentation.tsx';
import { errorsAt, hasErrors } from '@/lib/builder.ts';
import { isShown } from '@/lib/conditions.ts';
import { hintOf } from '@/lib/presentation.ts';
import { fieldGrid, widthClass } from '@/lib/width.ts';
import type { Errors, FieldDefinition } from '@/types.ts';

// Field values are any JSON; see the entry editor for why `any`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldValues = Record<string, any>;

interface Props {
    fields: FieldDefinition[];
    values: FieldValues;
    onChange: (handle: string, value: unknown) => void;
    /** The form's errors, by path ("data.intro"). */
    errors: Errors;
    /** Remembers each group's open or closed under this key plus its handle. */
    storageKey: string;
    /** Fields shared by all languages, shown read-only with these values. */
    shared?: string[];
    sharedValues?: FieldValues;
    /** The main language's name ("English"): under each shared field, "Not translatable: edit it in English." */
    mainLanguage?: string | null;
    /** Read only (the cards still fold: their fields are disabled, not their headers). */
    disabled?: boolean;
    /** Fields whose saved draft differs from the live version: marked "Changed" beside their label. */
    changed?: string[];
}

/**
 * An editor's fields: a card of fields, and each group field as a card of
 * its own that folds away (remembered, and opened on an error inside).
 * A field whose condition isn't met is left out. Fields sit side by side by
 * their widths (lib/width.ts), top-level groups too.
 */
const hasHint = (field: FieldDefinition) => { const { hint, tooltip } = hintOf(field); return hint !== null || tooltip !== null; };

/** How a field shared by all languages looks in another language: read-only and greyed out. */
export const SHARED_FIELD = 'cms:flex cms:flex-col cms:gap-1 cms:opacity-60';

export function FieldSections({ fields, values, onChange, errors, storageKey, shared = [], sharedValues = {}, mainLanguage = null, disabled = false, changed = [] }: Props) {
    // Runs of plain fields, and groups on their own.
    const sections: (FieldDefinition | FieldDefinition[])[] = [];
    // Fields hidden by their condition (as the server decides) are left out.
    const siblings = { ...sharedValues, ...values };
    for (const field of fields.filter((each) => isShown(each, siblings))) {
        const last = sections[sections.length - 1];
        if (field.type === 'group') sections.push(field);
        else if (Array.isArray(last)) last.push(field);
        else sections.push([field]);
    }
    if (sections.length === 0) return null;

    // A grid of their own: runs of plain fields are full-width cards, groups take their width (lib/width.ts).
    // Shared fields say under them where to edit them, in the main language (SharedHint).
    return (
        <MainLanguage.Provider value={mainLanguage}>
        <div className={fieldGrid('cms:gap-6')}>
            {sections.map((section) => {
                if (Array.isArray(section)) {
                    return (
                        <Card key={`fields-${section[0]?.handle ?? ''}`} className="cms:col-span-12 cms:min-w-0">
                            <CardContent>
                                <fieldset disabled={disabled} className="cms:min-w-0">
                                    <div className={fieldGrid()}>
                                    {section.map((field) => shared.includes(field.handle) ? (
                                        <fieldset key={field.handle} disabled className={`${SHARED_FIELD} ${widthClass(field)}`}>
                                            <FieldInput id={`data-${field.handle}`} field={field} content value={sharedValues[field.handle]} errors={{}} onChange={() => {}} shared />
                                        </fieldset>
                                    ) : (
                                        <div key={field.handle} className={widthClass(field)}>
                                            <FieldInput id={`data-${field.handle}`} field={field} content value={values[field.handle]}
                                                errors={errorsAt(errors, `data.${field.handle}`)} onChange={(value) => onChange(field.handle, value)}
                                                marker={changed.includes(field.handle) ? <ChangedMarker /> : null} />
                                        </div>
                                    ))}
                                    </div>
                                </fieldset>
                            </CardContent>
                        </Card>
                    );
                }
                const isShared = shared.includes(section.handle);
                const value = (isShared ? sharedValues : values)[section.handle];
                const fieldErrors = errorsAt(errors, `data.${section.handle}`);

                return (
                    <CollapsibleCard key={section.handle} className={widthClass(section)} title={changed.includes(section.handle) ? <>{labelOf(section)}<ChangedMarker /></> : labelOf(section)} titleClassName="cms:text-base"
                        headerAction={hasHint(section) ? <FieldHint field={section} id={`data-${section.handle}`} label={labelOf(section)} maxWidth="cms:max-w-40 cms:sm:max-w-64" /> : undefined}
                        storageKey={`${storageKey}:${section.handle}`} hasErrors={!isShared && hasErrors(errors, `data.${section.handle}`)}>
                        <fieldset disabled={isShared || disabled} role="group" aria-label={labelOf(section)} className={`cms:flex cms:flex-col cms:gap-2 ${isShared ? 'cms:opacity-60' : ''}`}>
                            {/* Its helper text under its heading (not in the header: that's a button, and the text may hold links). */}
                            <HelperText text={section.instructions} className="cms:-mt-1 cms:mb-2" />
                            {/* Shared as a whole: said once here, not under each of its fields. */}
                            {isShared && <SharedHint className="cms:-mt-1 cms:mb-2" />}
                            <Fields bare fields={section.fields ?? []} id={`data-${section.handle}`} content errors={isShared ? {} : fieldErrors}
                                value={value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}}
                                onChange={(next) => onChange(section.handle, next)} />
                            <FieldError message={isShared ? undefined : fieldErrors['']} />
                        </fieldset>
                    </CollapsibleCard>
                );
            })}
        </div>
        </MainLanguage.Provider>
    );
}
