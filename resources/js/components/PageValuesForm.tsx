import * as React from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ExternalLink, LoaderCircle } from 'lucide-react';
import { t } from '@imajiner/admin-sdk';
import { Button, Card, CardContent, CollapsibleCard, LanguageTabs, PageHeader, type PageHeaderMenuItem, useBreadcrumbs, useUnsavedChanges } from '@imajiner/admin-sdk/ui';
import { FieldInput, Fields } from '@/components/FieldInput.tsx';
import { SHARED_FIELD } from '@/components/FieldSections.tsx';
import { MainLanguage } from '@/components/FieldPresentation.tsx';
import { VersionConflict } from '@/components/VersionConflict.tsx';
import { TemplateField, type TemplateLookup, withTemplateChoices } from '@/components/TemplateHelp.tsx';
import { errorKeysAt, errorsAt, hasErrors } from '@/lib/builder.ts';
import { localeName } from '@/lib/entries.ts';
import { localeTabs } from '@/lib/languages.ts';
import { seoFields } from '@/lib/seo.ts';
import type { FieldDefinition } from '@/types.ts';
import { isShown } from '@/lib/conditions.ts';
import { fieldGrid, widthClass } from '@/lib/width.ts';
import { UnsavedNote } from '@/components/UnsavedNote.tsx';

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
    can: { update: boolean; template?: boolean };
    /** The page's template setting (its collection's or taxonomy's), when it has one here. */
    template?: string | null;
    templates?: TemplateLookup | null;
    /** The views to pick a template from: loaded when the Template choice first opens. */
    templateChoices?: string[];
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
    /** Where its fields are chosen (a blueprint setting), for those who may: a button under `empty`. */
    emptyAction?: { label: string; href: string } | null;
    seoDescription: string;
    storageKey: string;
    menu?: PageHeaderMenuItem[];
    /** Above the language switch: another page's fields, say. */
    children?: React.ReactNode;
    /** Under the Template choice: what Automatic uses, and who else the setting applies to. */
    templateHelp?: string;
}

/** A page's own fields and SEO in one language, saved live (no drafts). A fresh form per language and after each save. */
export function PageValuesForm(props: FormProps) {
    return <PageValuesEdit key={`${props.editUrl}:${JSON.stringify(props.params ?? {})}:${props.locale}:${props.version}:${JSON.stringify([props.values, props.seo])}`} {...props} />;
}

function PageValuesEdit({ title, breadcrumbs, back, saveUrl, editUrl, params = {}, viewUrl, empty, emptyAction = null, seoDescription, storageKey, menu, children,
    fields, locale, locales, translated = [], shared, values, seo, version, can, template, templates, templateChoices, templateHelp }: FormProps) {
    useBreadcrumbs(breadcrumbs);
    // The template is sent only by those who may change it (the collection's or taxonomy's setting).
    const hasTemplate = templates !== undefined;
    const templateWritable = can.update && can.template === true;
    const form = useForm<{ locale: string; data: FieldValues; seo: FieldValues; version: number | null; template?: string }>({
        locale, data: values, seo: seo ?? {}, version, ...(hasTemplate && templateWritable ? { template: template ?? '' } : {}),
    });
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

    // The page's texts in this language: its fields and SEO.
    const texts = (
        <>
            {children}
            {/* Each language has its own texts: the one open, those without theirs yet muted. */}
            <LanguageTabs value={locale} languages={localeTabs(locales, translated, localeName)} onValueChange={(next: string) => router.get(editUrl, { ...params, locale: next })} />
            <fieldset disabled={!writable} className="cms:flex cms:flex-col cms:gap-6">
                <VersionConflict message={errors.version} processing={form.processing} onSaveMine={saveMine} />
                {fields.length === 0 ? (
                    // A card like the fields' would be, so it lines up with the cards beside it.
                    <Card>
                        <CardContent className="cms:flex cms:flex-col cms:items-start cms:gap-3">
                            <p className="cms:text-sm cms:text-muted-foreground">{empty}</p>
                            {emptyAction && <Button type="button" variant="outline" size="sm" asChild><Link href={emptyAction.href}>{emptyAction.label}</Link></Button>}
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardContent className="cms:flex cms:flex-col cms:gap-6">
                            {/* Side by side by their widths (lib/width.ts); shared fields say under them where to edit them. */}
                            <MainLanguage.Provider value={mainLocale ? localeName(mainLocale) : null}>
                            <div className={fieldGrid()}>
                            {fields.filter((field) => isShown(field, { ...values, ...form.data.data })).map((field) => shared.includes(field.handle) ? (
                                <fieldset key={field.handle} disabled className={`${SHARED_FIELD} ${widthClass(field)}`}>
                                    <FieldInput id={`data-${field.handle}`} field={field} content value={values[field.handle]} errors={{}} onChange={() => {}} shared />
                                </fieldset>
                            ) : (
                                <div key={field.handle} className={widthClass(field)}>
                                    <FieldInput id={`data-${field.handle}`} field={field} content value={form.data.data[field.handle]}
                                        errors={errorsAt(errors, `data.${field.handle}`)} onChange={(value) => { form.setData('data', { ...form.data.data, [field.handle]: value }); clearErrorsAt(`data.${field.handle}`); }} />
                                </div>
                            ))}
                            </div>
                            </MainLanguage.Provider>
                        </CardContent>
                    </Card>
                )}
            </fieldset>
            <CollapsibleCard title={t('SEO')} description={seoDescription} titleClassName="cms:text-base" storageKey={storageKey} hasErrors={hasErrors(errors, 'seo')}>
                <fieldset disabled={!writable} className="cms:min-w-0">
                    <Fields bare id="seo" fields={seoFields()} value={form.data.seo} errors={errorsAt(errors, 'seo')} onChange={(next) => { form.setData('seo', next); clearErrorsAt('seo'); }} />
                </fieldset>
            </CollapsibleCard>
        </>
    );

    return (
        <form noValidate onSubmit={(e) => { e.preventDefault(); save(); }} className={`cms:flex cms:flex-col cms:gap-6 ${hasTemplate ? '' : 'cms:max-w-5xl'}`}>
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
                <UnsavedNote dirty={form.isDirty} />
            </PageHeader>

            {hasTemplate ? (
                // Like the entry and term editors: the page's texts, and its settings beside them.
                <div className="cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]">
                    <div className="cms:flex cms:min-w-0 cms:flex-col cms:gap-6">{texts}</div>
                    <aside className="cms:flex cms:min-w-0 cms:flex-col cms:gap-6">
                        <CollapsibleCard title={t('Page settings')} titleClassName="cms:text-base" storageKey={`${storageKey}:page-settings`} hasErrors={errors.template !== undefined}
                            contentClassName="cms:flex cms:flex-col cms:gap-2">
                            <TemplateField id="template" value={form.data.template ?? template ?? ''} lookup={withTemplateChoices(templates ?? null, templateChoices)}
                                onChange={(next) => { form.setData('template', next); form.clearErrors('template' as never); }}
                                example="cms.landing" automatic={templateHelp ?? t('Automatic uses the first file that exists.')}
                                error={errors.template} disabled={!templateWritable} />
                        </CollapsibleCard>
                    </aside>
                </div>
            ) : texts}
        </form>
    );
}
