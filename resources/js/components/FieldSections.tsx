import { Card, CardContent, CollapsibleCard } from '@sunrice/admin-sdk/ui';
import { FieldError, FieldInput, Fields, labelOf } from '@/components/FieldInput.tsx';
import { errorsAt, hasErrors } from '@/lib/builder.ts';
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
    sharedNote?: string;
    /** Read only (the cards still fold: their fields are disabled, not their headers). */
    disabled?: boolean;
}

/**
 * An editor's fields: a card of fields, and each group field as a card of
 * its own that folds away (remembered, and opened on an error inside).
 */
export function FieldSections({ fields, values, onChange, errors, storageKey, shared = [], sharedValues = {}, sharedNote, disabled = false }: Props) {
    // Runs of plain fields, and groups on their own.
    const sections: (FieldDefinition | FieldDefinition[])[] = [];
    for (const field of fields) {
        const last = sections[sections.length - 1];
        if (field.type === 'group') sections.push(field);
        else if (Array.isArray(last)) last.push(field);
        else sections.push([field]);
    }
    const note = sharedNote ? <p className="cms:text-sm cms:text-muted-foreground">{sharedNote}</p> : null;

    return (
        <>
            {sections.map((section) => {
                if (Array.isArray(section)) {
                    return (
                        <Card key={`fields-${section[0]?.handle ?? ''}`}>
                            <CardContent>
                                <fieldset disabled={disabled} className="cms:flex cms:min-w-0 cms:flex-col cms:gap-6">
                                    {section.map((field) => shared.includes(field.handle) ? (
                                        <fieldset key={field.handle} disabled className="cms:flex cms:flex-col cms:gap-1">
                                            <FieldInput id={`data-${field.handle}`} field={field} content value={sharedValues[field.handle]} errors={{}} onChange={() => {}} />
                                            {note}
                                        </fieldset>
                                    ) : (
                                        <FieldInput key={field.handle} id={`data-${field.handle}`} field={field} content value={values[field.handle]}
                                            errors={errorsAt(errors, `data.${field.handle}`)} onChange={(value) => onChange(field.handle, value)} />
                                    ))}
                                </fieldset>
                            </CardContent>
                        </Card>
                    );
                }
                const isShared = shared.includes(section.handle);
                const value = (isShared ? sharedValues : values)[section.handle];
                const fieldErrors = errorsAt(errors, `data.${section.handle}`);

                return (
                    <CollapsibleCard key={section.handle} title={labelOf(section)} titleClassName="cms:text-base" description={section.instructions ?? undefined}
                        storageKey={`${storageKey}:${section.handle}`} hasErrors={!isShared && hasErrors(errors, `data.${section.handle}`)}>
                        <fieldset disabled={isShared || disabled} role="group" aria-label={labelOf(section)} className="cms:flex cms:flex-col cms:gap-2">
                            <Fields bare fields={section.fields ?? []} id={`data-${section.handle}`} content errors={isShared ? {} : fieldErrors}
                                value={value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}}
                                onChange={(next) => onChange(section.handle, next)} />
                            {isShared && note}
                            <FieldError message={isShared ? undefined : fieldErrors['']} />
                        </fieldset>
                    </CollapsibleCard>
                );
            })}
        </>
    );
}
