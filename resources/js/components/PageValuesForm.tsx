import * as React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { ExternalLink, LoaderCircle } from 'lucide-react';
import { t } from '@imajiner/admin-sdk';
import { Button, Card, CardContent, CollapsibleCard, PageHeader, type PageHeaderMenuItem, useBreadcrumbs, useUnsavedChanges } from '@imajiner/admin-sdk/ui';
import { FieldInput, Fields } from '@/components/FieldInput.tsx';
import { SHARED_FIELD } from '@/components/FieldSections.tsx';
import { VersionConflict } from '@/components/VersionConflict.tsx';
import { LanguageTabs } from '@/components/LanguageTabs.tsx';
import { errorKeysAt, errorsAt, hasErrors } from '@/lib/builder.ts';
import { localeName } from '@/lib/entries.ts';
import { seoFields } from '@/lib/seo.ts';
import type { FieldDefinition } from '@/types.ts';
import { isShown } from '@/lib/conditions.ts';
import { hasSharedFields } from '@/lib/values.ts';

// Field values are any JSON; see the entry editor for why `any`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldValues = Record<string, any>;

/** What the server sends for a page's own fields (a listing page, a taxonomy's index page), per language. */
export interface PageValuesProps {
    fields: FieldDefinition[];
    locale: string;
    locales: string[];
    /** The languages with texts of their own (the main one always). */
    translated?: string[];
    /** Fields shared by all languages: read-only outside the main one. */
    shared: string[];
    values: FieldValues;
    /** The page's own SEO in this language (title, description, share image, noindex, canonical). */
    seo: FieldValues | null;
    /** The saved values' version, to refuse a save over someone else's newer one; null before the first save. */
    version: number | null;
    can: { update: boolean };
}

interface FormProps extends PageValuesProps {
    title: string;
    breadcrumbs: { label: string; href?: string }[];
    back: { href: string; label: string };
    /** Where the values are saved (PUT), and the editor's own address (GET, for the language switch). */
    saveUrl: string;
    editUrl: string;
    /** Sent with every save and kept by the language switch (which page it is). */
    params?: Record<string, string>;
    /** The page on the site, in this language. */
    viewUrl: string | null;
    /** Said when the page has no fields of its own. */
    empty: string;
    seoDescription: string;
    storageKey: string;
    menu?: PageHeaderMenuItem[];
    /** Above the language switch: another page's fields, say. */
    children?: React.ReactNode;
}

/** A page's own fields and SEO in one language, saved live (no drafts). A fresh form per language and after each save. */
export function PageValuesForm(props: FormProps) {
    return <PageValuesEdit key={`${props.editUrl}:${JSON.stringify(props.params ?? {})}:${props.locale}:${props.version}:${JSON.stringify([props.values, props.seo])}`} {...props} />;
}

function PageValuesEdit({ title, breadcrumbs, back, saveUrl, editUrl, params = {}, viewUrl, empty, seoDescription, storageKey, menu, children,
    fields, locale, locales, translated = [], shared, values, seo, version, can }: FormProps) {
    useBreadcrumbs(breadcrumbs);
    const form = useForm<{ locale: string; data: FieldValues; seo: FieldValues; version: number | null }>({ locale, data: values, seo: seo ?? {}, version });
    const errors = form.errors as Record<string, string | undefined>;
    const clearErrorsAt = (path: string) => {
        const keys = errorKeysAt(errors, path);
        if (keys.length > 0) form.clearErrors(...(keys as never[]));
    };
    const mainLocale = locales[0];
    const writable = can.update;
    const save = () => {
        if (form.processing) return;
        form.transform((data) => ({ ...data, ...params }));
        form.put(saveUrl, { preserveScroll: true });
    };
    // After "someone else saved": save over their version anyway.
    const saveMine = () => {
        form.transform((data) => ({ ...data, ...params, version: null }));
        form.put(saveUrl, { preserveScroll: true });
    };
    useUnsavedChanges(form.isDirty, writable ? save : undefined);

    return (
        <form noValidate onSubmit={(e) => { e.preventDefault(); save(); }} className="cms:flex cms:max-w-5xl cms:flex-col cms:gap-6">
            <Head title={title} />
            <PageHeader
                title={title}
                back={back}
                menu={menu}
                actions={
                    <>
                        {viewUrl && (
                            <Button type="button" variant="ghost" asChild><a href={viewUrl} target="_blank" rel="noopener noreferrer"><ExternalLink /> {t('View')}</a></Button>
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

            {children}
            {/* Each language has its own texts: which one is open, which have theirs, the others a click away. */}
            <LanguageTabs current={locale} locales={locales} translated={translated} onSwitch={(next) => router.get(editUrl, { ...params, locale: next })} />
            <fieldset disabled={!writable} className="cms:flex cms:flex-col cms:gap-6">
                <VersionConflict message={errors.version} processing={form.processing} onSaveMine={saveMine} />
                {fields.length === 0 ? (
                    <p className="cms:text-muted-foreground">{empty}</p>
                ) : (
                    <Card>
                        <CardContent className="cms:flex cms:flex-col cms:gap-6">
                            {(shared.length > 0 || hasSharedFields(fields)) && (
                                <p role="note" className="cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground">
                                    {mainLocale ? t('Shared by all languages: the greyed-out fields are edited in :language.', { language: localeName(mainLocale) }) : t('Shared by all languages: the greyed-out fields are edited in the main language.')}
                                </p>
                            )}
                            {fields.filter((field) => isShown(field, { ...values, ...form.data.data })).map((field) => shared.includes(field.handle) ? (
                                <fieldset key={field.handle} disabled className={SHARED_FIELD} title={t('Shared by all languages')}>
                                    <FieldInput id={`data-${field.handle}`} field={field} content value={values[field.handle]} errors={{}} onChange={() => {}} />
                                </fieldset>
                            ) : (
                                <FieldInput key={field.handle} id={`data-${field.handle}`} field={field} content value={form.data.data[field.handle]}
                                    errors={errorsAt(errors, `data.${field.handle}`)} onChange={(value) => { form.setData('data', { ...form.data.data, [field.handle]: value }); clearErrorsAt(`data.${field.handle}`); }} />
                            ))}
                        </CardContent>
                    </Card>
                )}
            </fieldset>
            <CollapsibleCard title={t('SEO')} description={seoDescription} titleClassName="cms:text-base" storageKey={storageKey} hasErrors={hasErrors(errors, 'seo')}>
                <fieldset disabled={!writable} className="cms:min-w-0">
                    <Fields bare id="seo" fields={seoFields()} value={form.data.seo} errors={errorsAt(errors, 'seo')} onChange={(next) => { form.setData('seo', next); clearErrorsAt('seo'); }} />
                </fieldset>
            </CollapsibleCard>
        </form>
    );
}
