import * as React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { ExternalLink, LoaderCircle } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import {
    Button, CollapsibleCard, Input, KeptEditsNotice, Label, PageHeader, Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
    useBreadcrumbs, useEditLock, useUnsavedChanges, ViewingNotice,
} from '@sunrice/admin-sdk/ui';
import { FieldError, Fields } from '@/components/FieldInput.tsx';
import { FieldSections } from '@/components/FieldSections.tsx';
import { VersionConflict } from '@/components/VersionConflict.tsx';
import { errorsAt, hasErrors } from '@/lib/builder.ts';
import { localeName } from '@/lib/entries.ts';
import { SEO_FIELDS } from '@/lib/seo.ts';
import type { FieldDefinition } from '@/types.ts';

// Field values are any JSON; see the entry editor for why `any`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldValues = Record<string, any>;

interface Props {
    taxonomy: { handle: string; title: string };
    term: {
        id: number; title: string; template: string | null; url: string | null;
        /** This language's own title and slug (null: not translated yet), and the main language's title. */
        ownTitle: string | null; slug: string | null; mainTitle: string | null;
    };
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
    usedBy?: { label: string; url: string | null; field: string }[];
}

export default function TermEditPage(props: Props) {
    // A fresh form per language and after each save.
    return <TermEdit key={`${props.locale}:${props.version}:${JSON.stringify([props.values, props.seo, props.term.template])}`} {...props} />;
}

function TermEdit({ taxonomy, term, translated, fields, locale, locales, shared, sharedValues, values, seo, version, usedBy = [] }: Props) {
    const list = adminUrl(`cms/taxonomies/${taxonomy.handle}/terms`);
    const url = adminUrl(`cms/terms/${term.id}/content`);
    useBreadcrumbs([{ label: taxonomy.title, href: `${list}?locale=${locale}` }, { label: term.title }]);
    const form = useForm<{ locale: string; title: string; slug: string; data: FieldValues; seo: FieldValues; template: string; version: number | null }>({
        locale, title: term.ownTitle ?? '', slug: term.slug ?? '', data: values, seo: seo ?? {}, template: term.template ?? '', version,
    });
    const errors = form.errors as Record<string, string | undefined>;
    const save = () => form.processing || form.put(url, { preserveScroll: true });
    // After "someone else saved": save over their version anyway.
    const saveMine = () => {
        form.transform((data) => ({ ...data, version: null }));
        form.put(url, { preserveScroll: true });
    };
    // One editor at a time per term page and language.
    const lock = useEditLock({
        type: 'cms.term', id: term.id, locale, enabled: translated, noun: 'term', leaveTo: `${list}?locale=${locale}`,
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
        <form onSubmit={(e) => { e.preventDefault(); save(); }} className="cms:flex cms:max-w-3xl cms:flex-col cms:gap-6">
            <Head title={term.title} />
            {lock.dialogs}
            <PageHeader
                title={term.title}
                back={{ href: `${list}?locale=${locale}`, label: `Back to ${taxonomy.title}` }}
                actions={
                    <>
                        {term.url && <Button type="button" variant="ghost" asChild><a href={term.url} target="_blank" rel="noopener noreferrer"><ExternalLink /> View</a></Button>}
                        {locales.length > 1 && (
                            <Select value={locale} onValueChange={(next: string) => router.get(adminUrl(`cms/terms/${term.id}/edit`), { locale: next })}>
                                <SelectTrigger className="cms:w-48" aria-label="Language"><SelectValue /></SelectTrigger>
                                <SelectContent>{locales.map((code, i) => <SelectItem key={code} value={code}>{localeName(code)}{i === 0 ? ' (main)' : ''}</SelectItem>)}</SelectContent>
                            </Select>
                        )}
                        {writable && <Button type="submit" disabled={form.processing}>{form.processing && <LoaderCircle className="cms:animate-spin" />} Save</Button>}
                    </>
                }
            >
                {form.isDirty && <span className="cms:text-sm cms:text-muted-foreground">Unsaved changes</span>}
            </PageHeader>

            <div className="cms:flex cms:min-w-0 cms:flex-col cms:gap-6">
                <ViewingNotice by={lock.viewingBy} />
                {!translated && (
                    <p className="cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground" role="note">
                        Not in {localeName(locale)} yet: the site shows the {localeName(locales[0] ?? 'en')} term meanwhile. Give it a title in {localeName(locale)} and save to add it.
                    </p>
                )}
                <fieldset disabled={!writable} className="cms:grid cms:min-w-0 cms:gap-4 cms:sm:grid-cols-2">
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor="term-title">Title</Label>
                        <Input id="term-title" value={form.data.title} required placeholder={term.mainTitle ?? ''} maxLength={255} aria-invalid={errors.title !== undefined}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('title', e.target.value)} />
                        <FieldError message={errors.title} />
                    </div>
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor="term-slug">Slug</Label>
                        <Input id="term-slug" className="cms:font-mono" value={form.data.slug} placeholder="Made from the title" maxLength={200} aria-invalid={errors.slug !== undefined}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('slug', e.target.value)} />
                        <FieldError message={errors.slug} />
                    </div>
                </fieldset>
                <KeptEditsNotice kept={lock.kept} disabled={!writable} onLoad={(id: number) => void loadKept(id)} onDiscard={(id: number) => void lock.discardKept(id)} />
                <VersionConflict message={errors.version} processing={form.processing} onSaveMine={saveMine} />
                <FieldSections disabled={!writable} fields={fields} values={form.data.data} errors={errors} storageKey={`cms:term:${taxonomy.handle}`}
                    shared={shared} sharedValues={sharedValues} sharedNote={`Shared by all languages: edit it in ${localeName(locales[0] ?? 'en')}.`}
                    onChange={(handle, value) => form.setData('data', { ...form.data.data, [handle]: value })} />
                <CollapsibleCard title="Search and sharing" titleClassName="cms:text-base" storageKey="cms:term:seo" hasErrors={hasErrors(errors, 'seo')}>
                    <fieldset disabled={!writable} className="cms:min-w-0">
                        <Fields bare id="seo" fields={SEO_FIELDS} value={form.data.seo} errors={errorsAt(errors, 'seo')} onChange={(next) => form.setData('seo', next)} />
                    </fieldset>
                </CollapsibleCard>
                <CollapsibleCard title="Used by" titleClassName="cms:text-base" storageKey="cms:term:used-by" contentClassName="cms:flex cms:flex-col cms:gap-1 cms:text-sm">
                    {usedBy.length === 0 && <p className="cms:text-muted-foreground">No content links here through its fields.</p>}
                    {usedBy.map((use) => (
                        <div key={`${use.label}:${use.field}`} className="cms:flex cms:items-baseline cms:gap-2">
                            {use.url ? <a href={use.url} className="cms:truncate cms:underline-offset-4 cms:hover:underline">{use.label}</a> : <span className="cms:truncate">{use.label}</span>}
                            <span className="cms:font-mono cms:text-xs cms:text-muted-foreground">{use.field}</span>
                        </div>
                    ))}
                </CollapsibleCard>
                <CollapsibleCard title="Page settings" titleClassName="cms:text-base" storageKey="cms:term:page-settings" hasErrors={errors.template !== undefined}
                    contentClassName="cms:flex cms:flex-col cms:gap-2">
                    <fieldset disabled={!writable} className="cms:flex cms:min-w-0 cms:flex-col cms:gap-2">
                        <Label htmlFor="template">Template</Label>
                        <Input id="template" className="cms:font-mono" placeholder="The taxonomy's" value={form.data.template}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('template', e.target.value)} aria-invalid={errors.template !== undefined} />
                        <FieldError message={errors.template} />
                    </fieldset>
                </CollapsibleCard>
            </div>
        </form>
    );
}
