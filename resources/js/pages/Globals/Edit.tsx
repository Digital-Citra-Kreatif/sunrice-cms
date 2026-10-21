import * as React from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { LoaderCircle, Settings2 } from 'lucide-react';
import { adminUrl, t } from '@sunrice/admin-sdk';
import { Button, KeptEditsNotice, PageHeader, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useBreadcrumbs, useEditLock, useUnsavedChanges, ViewingNotice } from '@sunrice/admin-sdk/ui';
import { FieldSections } from '@/components/FieldSections.tsx';
import { VersionConflict } from '@/components/VersionConflict.tsx';
import { errorKeysAt } from '@/lib/builder.ts';
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
    /** Its title, handle and fields (the set's resource), when the user may change them. */
    settings?: string | null;
}

export default function GlobalsEditPage(props: Props) {
    // A fresh form per language and after each save.
    return <GlobalsEdit key={`${props.locale}:${props.version}:${JSON.stringify(props.values)}`} {...props} />;
}

function GlobalsEdit({ set, fields, locale, locales, shared, values, version, can, settings }: Props) {
    const url = adminUrl(`cms/globals/${set.handle}/values`);
    useBreadcrumbs([{ label: t('Globals'), href: adminUrl('cms/globals') }, { label: set.title }]);
    const form = useForm<{ locale: string; data: FieldValues; version: number | null }>({ locale, data: values, version });
    const errors = form.errors as Record<string, string | undefined>;
    const clearErrorsAt = (path: string) => {
        const keys = errorKeysAt(errors, path);
        if (keys.length > 0) form.clearErrors(...(keys as never[]));
    };
    const mainLocale = locales[0];
    const lock = useEditLock({
        type: 'cms.global', id: set.id, locale, enabled: can.update, noun: t('global set'), leaveTo: adminUrl('cms/globals'),
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
        <form noValidate onSubmit={(e) => { e.preventDefault(); save(); }} className="cms:flex cms:max-w-5xl cms:flex-col cms:gap-6">
            <Head title={set.title} />
            {lock.dialogs}
            <PageHeader
                title={set.title}
                back={{ href: adminUrl('cms/globals'), label: t('Back to globals') }}
                actions={
                    <>
                        {settings && <Button type="button" variant="ghost" asChild><Link href={settings}><Settings2 /> {t('Settings')}</Link></Button>}
                        {locales.length > 1 && (
                            <Select value={locale} onValueChange={(next: string) => router.get(url, { locale: next })}>
                                <SelectTrigger className="cms:w-48" aria-label={t('Language')}><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {locales.map((code, i) => <SelectItem key={code} value={code}>{localeName(code)}{i === 0 ? ` ${t('(main)')}` : ''}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        )}
                        {writable && (
                            <Button type="submit" disabled={form.processing}>
                                {form.processing && <LoaderCircle className="cms:animate-spin" />} {t('Save')}
                            </Button>
                        )}
                    </>
                }
            >
                {form.isDirty && <span className="cms:text-sm cms:text-muted-foreground">{t('Unsaved changes')}</span>}
            </PageHeader>

            {fields.length === 0 ? (
                <p className="cms:text-muted-foreground">{t('This global set has no fields: choose a blueprint for it in its Settings.')}</p>
            ) : (
                <div className="cms:flex cms:flex-col cms:gap-4">
                    <ViewingNotice by={lock.viewingBy} onTakeOver={lock.requestTakeOver} />
                    {mainLocale && locale !== mainLocale && (
                        <p className="cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground" role="note">
                            {version === null
                                ? t('Not saved in :language yet: these are the :main values, which the site shows meanwhile. Translate them, then save.', { language: localeName(locale), main: localeName(mainLocale) })
                                : t('A field left empty shows the :main value on the site.', { main: localeName(mainLocale) })}
                        </p>
                    )}
                    <VersionConflict message={errors.version} processing={form.processing} onSaveMine={saveMine} />
                    <KeptEditsNotice kept={lock.kept} disabled={!writable} onLoad={(id: number) => void loadKept(id)} onDiscard={(id: number) => void lock.discardKept(id)} />
                    <FieldSections disabled={!writable} fields={fields} values={form.data.data} errors={errors} storageKey={`cms:global:${set.handle}`}
                        shared={shared} sharedValues={values}
                        sharedNote={mainLocale ? t('Shared by all languages: the greyed-out fields are edited in :language.', { language: localeName(mainLocale) }) : t('Shared by all languages: the greyed-out fields are edited in the main language.')}
                        onChange={(handle, value) => { form.setData('data', { ...form.data.data, [handle]: value }); clearErrorsAt(`data.${handle}`); }} />
                </div>
            )}
        </form>
    );
}
