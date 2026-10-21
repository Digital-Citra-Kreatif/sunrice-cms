import * as React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { adminUrl, t } from '@sunrice/admin-sdk';
import { Button, Card, CardContent, Input, Label, PageHeader, useBreadcrumbs, useUnsavedChanges } from '@sunrice/admin-sdk/ui';
import { ChangeWarning } from '@/components/ChangeWarning.tsx';
import { useConfirm } from '@/components/Confirm.tsx';
import { FieldBuilder } from '@/components/FieldBuilder.tsx';
import { FieldError } from '@/components/FieldInput.tsx';
import { type BuilderField, cleanHandle, errorsUnder, fromDefinitions, handleFromLabel, markSaved, toDefinitions } from '@/lib/builder.ts';
import type { FieldDefinition, FieldTypeInfo, LocaleInfo, Option } from '@/types.ts';

interface Props {
    /** The blueprint builder also builds fieldsets. */
    kind?: 'blueprint' | 'fieldset';
    blueprint: { id: number; handle: string; title: string; fields: FieldDefinition[] } | null;
    fieldTypes: FieldTypeInfo[];
    fieldsets: Option[];
    rules: string[];
    /** Handles content keeps for itself (Blueprint::RESERVED). */
    reserved?: string[];
    /** The content languages, the main one first: labels for visitors in the others. */
    locales?: LocaleInfo[];
    /** For a fieldset: what uses it ("the blueprint \"Page\""). */
    usedBy?: string[];
}

function handleHelp(kind: 'blueprint' | 'fieldset', exists: boolean): string {
    if (kind === 'fieldset') {
        return exists
            ? t('Set when it was created: flexible blocks keep it with what they hold.')
            : t('Lowercase letters, digits and underscores. It can\'t change later: flexible blocks keep it with what they hold.');
    }

    return exists
        ? t('Changing it updates the collections, taxonomies, global sets, forms and entries that use it.')
        : t('Lowercase letters, digits and underscores, made from the title until you type one.');
}

export default function BlueprintForm({ kind = 'blueprint', blueprint, fieldTypes, locales = [], usedBy = [], reserved = [] }: Props) {
    const fieldset = kind === 'fieldset';
    const base = adminUrl(fieldset ? 'cms/fieldsets' : 'cms/blueprints');
    const title = blueprint ? blueprint.title : fieldset ? t('New fieldset') : t('New blueprint');
    useBreadcrumbs([{ label: fieldset ? t('Fieldsets') : t('Blueprints'), href: base }, { label: title }]);
    const [confirm, confirmDialog] = useConfirm();

    const form = useForm({ title: blueprint?.title ?? '', handle: blueprint?.handle ?? '' });
    const [handleTouched, setHandleTouched] = React.useState(blueprint !== null);
    const [fields, setFields] = React.useState<BuilderField[]>(() => fromDefinitions(blueprint?.fields));
    const hasChildren = (type: string) => fieldTypes.find((each) => each.type === type)?.hasChildren === true;
    const errors = form.errors as Record<string, string | undefined>;

    // The builder's fields as last saved, to tell unsaved changes.
    const [savedFields, setSavedFields] = React.useState(() => JSON.stringify(fields));
    const dirty = form.isDirty || JSON.stringify(fields) !== savedFields;
    const saved = () => {
        form.setDefaults();
        // The handles just saved are the ones content keeps values under now.
        const next = markSaved(fields);
        setFields(next);
        setSavedFields(JSON.stringify(next));
    };

    const save = () => {
        if (form.processing) return;
        form.transform((data) => ({
            // A blueprint's handle can change (RenameBlueprint); a fieldset's can't: flexible blocks store it.
            ...(blueprint ? (kind === 'blueprint' ? { title: data.title, handle: data.handle } : { title: data.title }) : data),
            fields: toDefinitions(fields, hasChildren),
        }));
        if (blueprint) {
            form.put(`${base}/${blueprint.handle}`, { preserveScroll: true, onSuccess: saved });
        } else {
            form.post(base, { onSuccess: saved });
        }
    };
    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        save();
    };
    useUnsavedChanges(dirty, save);

    const remove = () => blueprint && confirm(fieldset
        ? t('Delete the fieldset ":title"? Content keeps its values.', { title: blueprint.title })
        : t('Delete the blueprint ":title"? Content keeps its values.', { title: blueprint.title }),
        () => router.delete(`${base}/${blueprint.handle}`, { preserveScroll: true }));

    return (
        <form onSubmit={submit} className="cms:flex cms:max-w-5xl cms:flex-col cms:gap-6">
            <Head title={title} />
            {confirmDialog}

            <PageHeader
                title={title}
                back={{ href: base, label: fieldset ? t('Back to fieldsets') : t('Back to blueprints') }}
                actions={
                    <>
                        {blueprint && (
                            <Button type="button" variant="outline" size="icon" className="cms:text-destructive" aria-label={t('Delete :title', { title })} onClick={remove}>
                                <Trash2 />
                            </Button>
                        )}
                        <Button type="submit" disabled={form.processing}>
                            {form.processing && <LoaderCircle className="cms:animate-spin" />}
                            {blueprint ? t('Save') : fieldset ? t('Create fieldset') : t('Create blueprint')}
                        </Button>
                    </>
                }
            />

            <FieldError message={errors.blueprint ?? errors.fieldset} />

            <Card>
                <CardContent className="cms:grid cms:gap-4 cms:md:grid-cols-2">
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor="title">{t('Title')}</Label>
                        <Input id="title" value={form.data.title} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            form.setData((data) => ({ ...data, title: e.target.value, handle: handleTouched ? data.handle : handleFromLabel(e.target.value) }));
                        }} />
                        <FieldError message={errors.title} />
                    </div>
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor="handle">{t('Handle')}</Label>
                        <Input id="handle" className="cms:font-mono" value={form.data.handle} disabled={blueprint !== null && kind === 'fieldset'} required spellCheck={false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setHandleTouched(true); form.setData('handle', cleanHandle(e.target.value)); }} />
                        <p className="cms:text-sm cms:text-muted-foreground">{handleHelp(kind, blueprint !== null)}</p>
                        <div aria-live="polite">
                            {blueprint !== null && kind === 'blueprint' && form.data.handle !== '' && form.data.handle !== blueprint.handle && (
                                <ChangeWarning id="handle-warning">
                                    {t('Changing the handle can break code. Sunrice updates the collections, taxonomies, global sets, forms and entries that use ":old". You update code that names it (Blueprint::where(\'handle\', \':old\')) and structure exports made before.', { old: blueprint.handle })}
                                </ChangeWarning>
                            )}
                        </div>
                        <FieldError message={errors.handle} />
                    </div>
                </CardContent>
            </Card>

            {usedBy.length > 0 && <p className="cms:text-sm cms:text-muted-foreground">{t('Used by :list. Changes show there at once.', { list: usedBy.join(', ') })}</p>}

            <section className="cms:flex cms:flex-col cms:gap-3" aria-labelledby="fields-heading">
                <h2 id="fields-heading" className="cms:text-lg cms:font-medium">{t('Fields')}</h2>
                <FieldBuilder fields={fields} onChange={setFields} types={fieldTypes} errors={errorsUnder(errors, 'fields')} reserved={kind === 'blueprint' ? reserved : undefined} locales={locales.slice(1)} />
                <FieldError message={errors.fields} />
            </section>
        </form>
    );
}
