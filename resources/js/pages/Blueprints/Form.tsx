import * as React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import { Button, Card, CardContent, Input, Label, PageHeader, useBreadcrumbs, useUnsavedChanges } from '@sunrice/admin-sdk/ui';
import { useConfirm } from '@/components/Confirm.tsx';
import { FieldBuilder } from '@/components/FieldBuilder.tsx';
import { FieldError } from '@/components/FieldInput.tsx';
import { type BuilderField, cleanHandle, errorsUnder, fromDefinitions, handleFromLabel, toDefinitions } from '@/lib/builder.ts';
import type { FieldDefinition, FieldTypeInfo, Option } from '@/types.ts';

interface Props {
    /** The blueprint builder also builds fieldsets. */
    kind?: 'blueprint' | 'fieldset';
    blueprint: { id: number; handle: string; title: string; fields: FieldDefinition[] } | null;
    fieldTypes: FieldTypeInfo[];
    fieldsets: Option[];
    rules: string[];
    /** For a fieldset: what uses it ("the blueprint \"Page\""). */
    usedBy?: string[];
}

export default function BlueprintForm({ kind = 'blueprint', blueprint, fieldTypes, usedBy = [] }: Props) {
    const noun = kind === 'fieldset' ? 'Fieldset' : 'Blueprint';
    const base = adminUrl(kind === 'fieldset' ? 'cms/fieldsets' : 'cms/blueprints');
    const title = blueprint ? blueprint.title : `New ${noun.toLowerCase()}`;
    useBreadcrumbs([{ label: `${noun}s`, href: base }, { label: title }]);
    const [confirm, confirmDialog] = useConfirm();

    const form = useForm({ title: blueprint?.title ?? '', handle: blueprint?.handle ?? '' });
    const [handleTouched, setHandleTouched] = React.useState(blueprint !== null);
    const [fields, setFields] = React.useState<BuilderField[]>(() => fromDefinitions(blueprint?.fields));
    const hasChildren = (type: string) => fieldTypes.find((t) => t.type === type)?.hasChildren === true;
    const errors = form.errors as Record<string, string | undefined>;

    // The builder's fields as last saved, to tell unsaved changes.
    const [savedFields, setSavedFields] = React.useState(() => JSON.stringify(fields));
    const dirty = form.isDirty || JSON.stringify(fields) !== savedFields;
    const saved = () => {
        form.setDefaults();
        setSavedFields(JSON.stringify(fields));
    };

    const save = () => {
        if (form.processing) return;
        form.transform((data) => ({
            ...(blueprint ? { title: data.title } : data),
            fields: toDefinitions(fields, hasChildren),
        }));
        if (blueprint) {
            form.put(`${base}/${blueprint.id}`, { preserveScroll: true, onSuccess: saved });
        } else {
            form.post(base, { onSuccess: saved });
        }
    };
    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        save();
    };
    useUnsavedChanges(dirty, save);

    const remove = () => blueprint && confirm(`Delete the ${noun.toLowerCase()} "${blueprint.title}"? Content keeps its values.`,
        () => router.delete(`${base}/${blueprint.id}`, { preserveScroll: true }));

    return (
        <form onSubmit={submit} className="cms:flex cms:max-w-5xl cms:flex-col cms:gap-6">
            <Head title={title} />
            {confirmDialog}

            <PageHeader
                title={title}
                back={{ href: base, label: `Back to ${noun.toLowerCase()}s` }}
                actions={
                    <>
                        {blueprint && (
                            <Button type="button" variant="outline" size="icon" className="cms:text-destructive" aria-label={`Delete ${title}`} onClick={remove}>
                                <Trash2 />
                            </Button>
                        )}
                        <Button type="submit" disabled={form.processing}>
                            {form.processing && <LoaderCircle className="cms:animate-spin" />}
                            {blueprint ? 'Save' : `Create ${noun.toLowerCase()}`}
                        </Button>
                    </>
                }
            />

            <FieldError message={errors.blueprint ?? errors.fieldset} />

            <Card>
                <CardContent className="cms:grid cms:gap-4 cms:md:grid-cols-2">
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={form.data.title} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            form.setData((data) => ({ ...data, title: e.target.value, handle: handleTouched ? data.handle : handleFromLabel(e.target.value) }));
                        }} />
                        <FieldError message={errors.title} />
                    </div>
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor="handle">Handle</Label>
                        <Input id="handle" className="cms:font-mono" value={form.data.handle} disabled={blueprint !== null} required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setHandleTouched(true); form.setData('handle', cleanHandle(e.target.value)); }} />
                        <p className="cms:text-sm cms:text-muted-foreground">{blueprint ? 'Set when it was created.' : 'Lowercase letters, digits and underscores. It can\'t change later.'}</p>
                        <FieldError message={errors.handle} />
                    </div>
                </CardContent>
            </Card>

            {usedBy.length > 0 && <p className="cms:text-sm cms:text-muted-foreground">Used by {usedBy.join(', ')}. Changes show there at once.</p>}

            <section className="cms:flex cms:flex-col cms:gap-3" aria-labelledby="fields-heading">
                <h2 id="fields-heading" className="cms:text-lg cms:font-medium">Fields</h2>
                <FieldBuilder fields={fields} onChange={setFields} types={fieldTypes} errors={errorsUnder(errors, 'fields')} />
                <FieldError message={errors.fields} />
            </section>
        </form>
    );
}
