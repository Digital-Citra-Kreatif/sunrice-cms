import * as React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { ExternalLink, LoaderCircle } from 'lucide-react';
import { adminUrl, t } from '@sunrice/admin-sdk';
import {
    Button, CollapsibleCard, Input, KeptEditsNotice, Label, PageHeader, Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
    useBreadcrumbs, useEditLock, useUnsavedChanges, ViewingNotice,
} from '@sunrice/admin-sdk/ui';
import { FieldError, Fields } from '@/components/FieldInput.tsx';
import { FieldSections } from '@/components/FieldSections.tsx';
import { SlugNote } from '@/components/SlugNote.tsx';
import { TemplateHelp, type TemplateLookup } from '@/components/TemplateHelp.tsx';
import { VersionConflict } from '@/components/VersionConflict.tsx';
import { LanguageTabs } from '@/components/LanguageTabs.tsx';
import { errorKeysAt, errorsAt, hasErrors } from '@/lib/builder.ts';
import { localeName, slugNote } from '@/lib/entries.ts';
import { seoFields } from '@/lib/seo.ts';
import type { FieldDefinition } from '@/types.ts';

// Field values are any JSON; see the entry editor for why `any`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldValues = Record<string, any>;

interface Props {
    taxonomy: { handle: string; title: string; hierarchical?: boolean };
    /** Null: a new term, created with all of this. */
    term: {
        id: number; title: string; template: string | null; url: string | null;
        /** This language's own title and slug (null: not translated yet), and the main language's title. */
        ownTitle: string | null; slug: string | null; mainTitle: string | null;
        /** Whether it has a page of its own, whose address a new slug moves. */
        hasPage?: boolean;
        /** The languages it has a title in. */
        translatedIn?: string[];
    } | null;
    /** The term it sits under (null: the top level). */
    parentId?: number | null;
    /** Where it can go, in nested taxonomies (never under itself or a term under it). */
    terms?: { id: number; title: string; depth: number }[];
    /** Where to add a redirect by hand, for those who may. */
    redirectsUrl?: string | null;
    /** The views tried for its page, in order, and which exist. */
    templates?: TemplateLookup | null;
    /** Whether the term has a title in this language. */
    translated: boolean;
    fields: FieldDefinition[];
    locale: string;
    locales: string[];
    shared: string[];
    sharedValues: FieldValues;
    values: FieldValues;
    seo: FieldValues | null;
    /** The translation's version, to refuse a save over someone else's newer one; null when not translated. */
    version: number | null;
    /** Where other content points at this term. */
    usedBy?: { label: string; url: string | null; field: string; fieldLabel?: string }[];
}

const TOP = '__top';

export default function TermEditPage(props: Props) {
    // A fresh form per language and after each save.
    return <TermEdit key={`${props.term?.id ?? 'new'}:${props.locale}:${props.version}:${JSON.stringify([props.values, props.seo, props.term?.template, props.parentId])}`} {...props} />;
}

/** One editor for a term, new or not: title, slug, where it sits, its fields, SEO and template, in a language. */
function TermEdit({ taxonomy, term, parentId = null, terms = [], translated, fields, locale, locales, shared, sharedValues, values, seo, version, usedBy = [], redirectsUrl = null, templates = null }: Props) {
    const list = adminUrl(`cms/taxonomies/${taxonomy.handle}/terms`);
    const url = term ? adminUrl(`cms/terms/${term.id}/content`) : list;
    const heading = term ? term.title : t('New term');
    useBreadcrumbs([{ label: taxonomy.title, href: `${list}?locale=${locale}` }, { label: heading }]);
    const form = useForm<{ locale: string; title: string; slug: string; parent_id: number | null; data: FieldValues; seo: FieldValues; template: string; version: number | null }>({
        locale, title: term?.ownTitle ?? '', slug: term?.slug ?? '', parent_id: parentId, data: values, seo: seo ?? {}, template: term?.template ?? '', version,
    });
    const errors = form.errors as Record<string, string | undefined>;
    const clearErrorsAt = (path: string) => {
        const keys = errorKeysAt(errors, path);
        if (keys.length > 0) form.clearErrors(...(keys as never[]));
    };
    const save = () => form.processing || (term ? form.put(url, { preserveScroll: true }) : form.post(url));
    // After "someone else saved": save over their version anyway.
    const saveMine = () => {
        form.transform((data) => ({ ...data, version: null }));
        form.put(url, { preserveScroll: true });
    };
    // One editor at a time per term page and language.
    const lock = useEditLock({
        type: 'cms.term', id: term?.id, locale, enabled: term !== null && translated, noun: t('term'), leaveTo: `${list}?locale=${locale}`,
        getUnsaved: () => (form.isDirty ? { data: form.data.data, seo: form.data.seo, template: form.data.template } : null),
    });
    // Not translated yet: giving it a title here adds the language.
    const writable = !lock.readOnly;
    const loadKept = async (id: number) => {
        const kept = await lock.loadKept(id);
        form.setData((data) => ({
            ...data,
            data: kept.data && typeof kept.data === 'object' ? kept.data as FieldValues : data.data,
            seo: kept.seo && typeof kept.seo === 'object' ? kept.seo as FieldValues : data.seo,
            template: typeof kept.template === 'string' ? kept.template : data.template,
        }));
    };
    useUnsavedChanges(form.isDirty && !lock.takenOver, writable ? save : undefined);

    return (
        <form noValidate onSubmit={(e) => { e.preventDefault(); save(); }} className="cms:flex cms:flex-col cms:gap-6">
            <Head title={term ? term.title : t('New term · :taxonomy', { taxonomy: taxonomy.title })} />
            {lock.dialogs}
            <PageHeader
                title={heading}
                back={{ href: `${list}?locale=${locale}`, label: t('Back to :title', { title: taxonomy.title }) }}
                actions={
                    <>
                        {term?.url && <Button type="button" variant="ghost" asChild><a href={term.url} target="_blank" rel="noopener noreferrer"><ExternalLink /> {t('View page')}</a></Button>}
                        {writable && <Button type="submit" disabled={form.processing}>{form.processing && <LoaderCircle className="cms:animate-spin" />} {term ? t('Save') : t('Create term')}</Button>}
                    </>
                }
            >
                {form.isDirty && <span className="cms:text-sm cms:text-muted-foreground">{t('Unsaved changes')}</span>}
            </PageHeader>

            <div className="cms:grid cms:items-start cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_20rem]">
                <div className="cms:flex cms:min-w-0 cms:flex-col cms:gap-6">
                    <LanguageTabs current={locale} locales={locales} translated={term ? (term.translatedIn ?? null) : [locale]}
                        onSwitch={(next) => router.get(term ? `${list}/${term.id}/edit` : `${list}/create`, { locale: next, ...(term === null && form.data.parent_id !== null ? { parent: form.data.parent_id } : {}) })} />
                    <ViewingNotice by={lock.viewingBy} onTakeOver={lock.requestTakeOver} />
                    {term === null && locales.length > 1 && (
                        <p className="cms:text-sm cms:text-muted-foreground">{t('In :language. Translate it here afterwards: switch the language and give it a title there.', { language: localeName(locale) })}</p>
                    )}
                    {!translated && (
                        <p className="cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground" role="note">
                            {t('Not in :language yet: the site shows the :main term meanwhile. Give it a title in :language and save to add it.', { language: localeName(locale), main: localeName(locales[0] ?? 'en') })}
                        </p>
                    )}
                    <fieldset disabled={!writable} className="cms:grid cms:min-w-0 cms:gap-4 cms:sm:grid-cols-2">
                        <div className="cms:flex cms:flex-col cms:gap-2">
                            <Label htmlFor="term-title">{t('Title')}</Label>
                            <Input id="term-title" value={form.data.title} required autoFocus={term === null} placeholder={term?.mainTitle ?? ''} maxLength={255} aria-invalid={errors.title !== undefined}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { form.setData('title', e.target.value); clearErrorsAt('title'); }} />
                            <FieldError message={errors.title} />
                        </div>
                        <div className="cms:flex cms:flex-col cms:gap-2">
                            <Label htmlFor="term-slug">{t('Slug')}</Label>
                            <Input id="term-slug" className="cms:font-mono" value={form.data.slug} placeholder={t('Made from the title')} maxLength={200} aria-invalid={errors.slug !== undefined}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { form.setData('slug', e.target.value); clearErrorsAt('slug'); }} />
                            {/* A term's page moves as soon as it's saved: nothing redirects from the old address. */}
                            <SlugNote note={slugNote(term?.hasPage ? term.slug : null, form.data.slug, false)} redirectsUrl={redirectsUrl} />
                            <FieldError message={errors.slug} />
                        </div>
                        {taxonomy.hierarchical && (
                            <div className="cms:flex cms:flex-col cms:gap-2 cms:sm:col-span-2">
                                <Label htmlFor="term-parent">{t('Under')}</Label>
                                <Select value={form.data.parent_id === null ? TOP : String(form.data.parent_id)}
                                    onValueChange={(value: string) => { form.setData('parent_id', value === TOP ? null : Number(value)); clearErrorsAt('parent_id'); }}>
                                    <SelectTrigger id="term-parent" className="cms:sm:w-1/2" aria-invalid={errors.parent_id !== undefined}><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={TOP}>{t('Top level')}</SelectItem>
                                        {terms.map((each) => <SelectItem key={each.id} value={String(each.id)}>{'— '.repeat(each.depth)}{each.title}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FieldError message={errors.parent_id} />
                            </div>
                        )}
                    </fieldset>
                    <KeptEditsNotice kept={lock.kept} disabled={!writable} onLoad={(id: number) => void loadKept(id)} onDiscard={(id: number) => void lock.discardKept(id)} />
                    <VersionConflict message={errors.version} processing={form.processing} onSaveMine={saveMine} />
                    <FieldSections disabled={!writable} fields={fields} values={form.data.data} errors={errors} storageKey={`cms:term:${taxonomy.handle}`}
                        shared={shared} sharedValues={sharedValues} sharedNote={t('Shared by all languages: the greyed-out fields are edited in :language.', { language: localeName(locales[0] ?? 'en') })}
                        onChange={(handle, value) => { form.setData('data', { ...form.data.data, [handle]: value }); clearErrorsAt(`data.${handle}`); }} />
                    <CollapsibleCard title={t('SEO')} description={t('How this term\'s page appears in search results and shared links.')} titleClassName="cms:text-base" storageKey="cms:term:seo" hasErrors={hasErrors(errors, 'seo')}>
                        <fieldset disabled={!writable} className="cms:min-w-0">
                            <Fields bare id="seo" fields={seoFields()} value={form.data.seo} errors={errorsAt(errors, 'seo')} onChange={(next) => { form.setData('seo', next); clearErrorsAt('seo'); }} />
                        </fieldset>
                    </CollapsibleCard>
                </div>
                <aside className="cms:flex cms:min-w-0 cms:flex-col cms:gap-6">
                    <CollapsibleCard title={t('Page settings')} titleClassName="cms:text-base" storageKey="cms:term:page-settings" hasErrors={errors.template !== undefined}
                        contentClassName="cms:flex cms:flex-col cms:gap-2">
                        <fieldset disabled={!writable} className="cms:flex cms:min-w-0 cms:flex-col cms:gap-2">
                            <Label htmlFor="template">{t('Template')}</Label>
                            <Input id="template" className="cms:font-mono" placeholder={`cms.${taxonomy.handle}-special`} value={form.data.template}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('template', e.target.value)} aria-invalid={errors.template !== undefined} />
                            <TemplateHelp example={`cms.${taxonomy.handle}-special`} empty={t('Leave empty to use the taxonomy\'s template.')} value={form.data.template} lookup={templates} />
                            <FieldError message={errors.template} />
                        </fieldset>
                    </CollapsibleCard>
{term && (
                    <CollapsibleCard title={t('Used by')} titleClassName="cms:text-base" storageKey="cms:term:used-by" contentClassName="cms:flex cms:flex-col cms:gap-1 cms:text-sm">
                        {usedBy.length === 0 && <p className="cms:text-muted-foreground">{t('No content links here through its fields.')}</p>}
                        {usedBy.map((use) => (
                            <div key={`${use.label}:${use.field}`} className="cms:flex cms:items-baseline cms:gap-2">
                                {use.url ? <a href={use.url} className="cms:truncate cms:underline-offset-4 cms:hover:underline">{use.label}</a> : <span className="cms:truncate">{use.label}</span>}
                                <span className="cms:text-xs cms:text-muted-foreground" title={use.field}>{use.fieldLabel ?? use.field}</span>
                            </div>
                        ))}
                    </CollapsibleCard>
)}
                </aside>
            </div>
        </form>
    );
}
