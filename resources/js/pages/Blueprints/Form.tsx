import * as React from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle, Trash2 } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import { Button, Card, CardContent, Input, Label, useBreadcrumbs } from '@sunrice/admin-sdk/ui';
import { useConfirm } from '@/components/Confirm.tsx';
import { FieldBuilder } from '@/components/FieldBuilder.tsx';
import { FieldError } from '@/components/FieldInput.tsx';
import { type BuilderField, errorsUnder, fromDefinitions, handleFromLabel, toDefinitions } from '@/lib/builder.ts';
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

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        form.transform((data) => ({
            ...(blueprint ? { title: data.title } : data),
            fields: toDefinitions(fields, hasChildren),
        }));
        if (blueprint) {
            form.put(`${base}/${blueprint.id}`, { preserveScroll: true });
        } else {
            form.post(base);
        }
    };

    const remove = () => blueprint && confirm(`Delete the ${noun.toLowerCase()} "${blueprint.title}"? Content keeps its values.`,
        () => router.delete(`${base}/${blueprint.id}`, { preserveScroll: true }));

    return (
        <form onSubmit={submit} className="flex max-w-4xl flex-col gap-6">
            <Head title={title} />
            {confirmDialog}

            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                    <Button variant="outline" size="icon" className="size-8 shrink-0" asChild>
                        <Link href={base} aria-label={`Back to ${noun.toLowerCase()}s`}><ArrowLeft /></Link>
                    </Button>
                    <h1 className="truncate text-2xl font-medium tracking-tight">{title}</h1>
                </div>
                <div className="flex items-center gap-2">
                    {blueprint && (
                        <Button type="button" variant="outline" size="icon" className="text-destructive" aria-label={`Delete ${title}`} onClick={remove}>
                            <Trash2 />
                        </Button>
                    )}
                    <Button type="submit" disabled={form.processing}>
                        {form.processing && <LoaderCircle className="animate-spin" />}
                        {blueprint ? 'Save' : `Create ${noun.toLowerCase()}`}
                    </Button>
                </div>
            </div>

            <FieldError message={errors.blueprint ?? errors.fieldset} />

            <Card>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={form.data.title} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            form.setData((data) => ({ ...data, title: e.target.value, handle: handleTouched ? data.handle : handleFromLabel(e.target.value) }));
                        }} />
                        <FieldError message={errors.title} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="handle">Handle</Label>
                        <Input id="handle" className="font-mono" value={form.data.handle} disabled={blueprint !== null} required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setHandleTouched(true); form.setData('handle', e.target.value); }} />
                        <p className="text-sm text-muted-foreground">{blueprint ? 'Set when it was created.' : 'Lowercase letters, digits and underscores. It can\'t change later.'}</p>
                        <FieldError message={errors.handle} />
                    </div>
                </CardContent>
            </Card>

            {usedBy.length > 0 && <p className="text-sm text-muted-foreground">Used by {usedBy.join(', ')}. Changes show there at once.</p>}

            <section className="flex flex-col gap-3" aria-labelledby="fields-heading">
                <h2 id="fields-heading" className="text-lg font-medium">Fields</h2>
                <FieldBuilder fields={fields} onChange={setFields} types={fieldTypes} errors={errorsUnder(errors, 'fields')} />
                <FieldError message={errors.fields} />
            </section>
        </form>
    );
}
