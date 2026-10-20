import * as React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import { Button, Card, CardContent, KeptEditsNotice, PageHeader, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useBreadcrumbs, useEditLock, useUnsavedChanges, ViewingNotice } from '@sunrice/admin-sdk/ui';
import { FieldInput } from '@/components/FieldInput.tsx';
import { VersionConflict } from '@/components/VersionConflict.tsx';
import { errorsAt } from '@/lib/builder.ts';
import { localeName } from '@/lib/entries.ts';
import type { FieldDefinition } from '@/types.ts';

// Field values are any JSON; see the entry editor for why `any`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldValues = Record<string, any>;

interface Props {
    set: { id: number; handle: string; title: string };
    fields: FieldDefinition[];
    locale: string;
    locales: string[];
    /** Fields shared by all languages: read-only outside the main one. */
    shared: string[];
    values: FieldValues;
    /** The saved values' version, to refuse a save over someone else's newer one; null before the first save. */
    version: number | null;
    can: { update: boolean };
}

export default function GlobalsEditPage(props: Props) {
    // A fresh form per language and after each save.
    return <GlobalsEdit key={`${props.locale}:${props.version}:${JSON.stringify(props.values)}`} {...props} />;
}

function GlobalsEdit({ set, fields, locale, locales, shared, values, version, can }: Props) {
    const url = adminUrl(`cms/globals/${set.handle}`);
    useBreadcrumbs([{ label: 'Globals', href: adminUrl('cms/globals') }, { label: set.title }]);
    const form = useForm<{ locale: string; data: FieldValues; version: number | null }>({ locale, data: values, version });
    const errors = form.errors as Record<string, string | undefined>;
    const mainLocale = locales[0];
    const lock = useEditLock({
        type: 'cms.global', id: set.id, locale, enabled: can.update, noun: 'global set', leaveTo: adminUrl('cms/globals'),
        getUnsaved: () => (form.isDirty ? { data: form.data.data } : null),
    });
    const writable = can.update && !lock.readOnly;
    const save = () => form.processing || form.put(url, { preserveScroll: true });
    // After "someone else saved": save over their version anyway.
    const saveMine = () => {
        form.transform((data) => ({ ...data, version: null }));
        form.put(url, { preserveScroll: true });
    };
    const loadKept = async (id: number) => {
        const kept = await lock.loadKept(id);
        if (kept.data && typeof kept.data === 'object') form.setData('data', kept.data as FieldValues);
    };
    useUnsavedChanges(form.isDirty && !lock.takenOver, writable ? save : undefined);

    return (
        <form onSubmit={(e) => { e.preventDefault(); save(); }} className="cms:flex cms:max-w-3xl cms:flex-col cms:gap-6">
            <Head title={set.title} />
            {lock.dialogs}
            <PageHeader
                title={set.title}
                back={{ href: adminUrl('cms/globals'), label: 'Back to globals' }}
                actions={
                    <>
                        {locales.length > 1 && (
                            <Select value={locale} onValueChange={(next: string) => router.get(url, { locale: next })}>
                                <SelectTrigger className="cms:w-48" aria-label="Language"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {locales.map((code, i) => <SelectItem key={code} value={code}>{localeName(code)}{i === 0 ? ' (main)' : ''}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        )}
                        {writable && (
                            <Button type="submit" disabled={form.processing}>
                                {form.processing && <LoaderCircle className="cms:animate-spin" />} Save
                            </Button>
                        )}
                    </>
                }
            >
                {form.isDirty && <span className="cms:text-sm cms:text-muted-foreground">Unsaved changes</span>}
            </PageHeader>

            {fields.length === 0 ? (
                <p className="cms:text-muted-foreground">This global set has no fields: choose a blueprint for it under Structure → Global sets.</p>
            ) : (
                <fieldset disabled={!writable} className="cms:flex cms:flex-col cms:gap-4">
                    <ViewingNotice by={lock.viewingBy} />
                    <VersionConflict message={errors.version} processing={form.processing} onSaveMine={saveMine} />
                    <KeptEditsNotice kept={lock.kept} disabled={!writable} onLoad={(id: number) => void loadKept(id)} onDiscard={(id: number) => void lock.discardKept(id)} />
                    <Card>
                        <CardContent className="cms:flex cms:flex-col cms:gap-6">
                            {fields.map((field) => shared.includes(field.handle) ? (
                                <fieldset key={field.handle} disabled className="cms:flex cms:flex-col cms:gap-1">
                                    <FieldInput id={`data-${field.handle}`} field={field} content value={values[field.handle]} errors={{}} onChange={() => {}} />
                                    <p className="cms:text-sm cms:text-muted-foreground">Shared by all languages: edit it in {mainLocale ? localeName(mainLocale) : 'the main language'}.</p>
                                </fieldset>
                            ) : (
                                <FieldInput key={field.handle} id={`data-${field.handle}`} field={field} content value={form.data.data[field.handle]}
                                    errors={errorsAt(errors, `data.${field.handle}`)} onChange={(value) => form.setData('data', { ...form.data.data, [field.handle]: value })} />
                            ))}
                        </CardContent>
                    </Card>
                </fieldset>
            )}
        </form>
    );
}
