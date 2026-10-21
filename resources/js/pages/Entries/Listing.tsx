import * as React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { ExternalLink, LoaderCircle } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import { Button, Card, CardContent, CollapsibleCard, PageHeader, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useBreadcrumbs, useUnsavedChanges } from '@sunrice/admin-sdk/ui';
import { FieldInput, Fields } from '@/components/FieldInput.tsx';
import { SHARED_FIELD } from '@/components/FieldSections.tsx';
import { VersionConflict } from '@/components/VersionConflict.tsx';
import { errorKeysAt, errorsAt, hasErrors } from '@/lib/builder.ts';
import { localeName } from '@/lib/entries.ts';
import { SEO_FIELDS } from '@/lib/seo.ts';
import type { FieldDefinition } from '@/types.ts';
import { isShown } from '@/lib/conditions.ts';
import { hasSharedFields } from '@/lib/values.ts';

// Field values are any JSON; see the entry editor for why `any`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldValues = Record<string, any>;

interface Props {
    collection: { handle: string; title: string; url: string | null };
    fields: FieldDefinition[];
    locale: string;
    locales: string[];
    /** Fields shared by all languages: read-only outside the main one. */
    shared: string[];
    values: FieldValues;
    /** The listing page's own SEO in this language (title, description, share image, noindex, canonical). */
    seo: FieldValues | null;
    /** The saved values' version, to refuse a save over someone else's newer one; null before the first save. */
    version: number | null;
    can: { update: boolean };
}

export default function ListingPage(props: Props) {
    // A fresh form per language and after each save.
    return <ListingEdit key={`${props.locale}:${props.version}:${JSON.stringify([props.values, props.seo])}`} {...props} />;
}

function ListingEdit({ collection, fields, locale, locales, shared, values, seo, version, can }: Props) {
    const url = adminUrl(`cms/collections/${collection.handle}/listing`);
    const back = adminUrl(`cms/collections/${collection.handle}/entries`);
    useBreadcrumbs([{ label: collection.title, href: back }, { label: 'Listing page' }]);
    const form = useForm<{ locale: string; data: FieldValues; seo: FieldValues; version: number | null }>({ locale, data: values, seo: seo ?? {}, version });
    const errors = form.errors as Record<string, string | undefined>;
    const clearErrorsAt = (path: string) => {
        const keys = errorKeysAt(errors, path);
        if (keys.length > 0) form.clearErrors(...(keys as never[]));
    };
    const mainLocale = locales[0];
    const writable = can.update;
    const save = () => form.processing || form.put(url, { preserveScroll: true });
    // After "someone else saved": save over their version anyway.
    const saveMine = () => {
        form.transform((data) => ({ ...data, version: null }));
        form.put(url, { preserveScroll: true });
    };
    useUnsavedChanges(form.isDirty, writable ? save : undefined);

    return (
        <form noValidate onSubmit={(e) => { e.preventDefault(); save(); }} className="cms:flex cms:max-w-3xl cms:flex-col cms:gap-6">
            <Head title={`${collection.title}: listing page`} />
            <PageHeader
                title={`${collection.title}: listing page`}
                back={{ href: back, label: `Back to ${collection.title}` }}
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
                        {collection.url && (
                            <Button type="button" variant="ghost" asChild><a href={collection.url} target="_blank" rel="noopener noreferrer"><ExternalLink /> View</a></Button>
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

            <fieldset disabled={!writable} className="cms:flex cms:flex-col cms:gap-6">
                <VersionConflict message={errors.version} processing={form.processing} onSaveMine={saveMine} />
                {fields.length === 0 ? (
                    <p className="cms:text-muted-foreground">The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections.</p>
                ) : (
                    <Card>
                        <CardContent className="cms:flex cms:flex-col cms:gap-6">
                            {(shared.length > 0 || hasSharedFields(fields)) && (
                                <p role="note" className="cms:rounded-lg cms:border cms:border-dashed cms:px-3 cms:py-2 cms:text-sm cms:text-muted-foreground">
                                    Shared by all languages: the greyed-out fields are edited in {mainLocale ? localeName(mainLocale) : 'the main language'}.
                                </p>
                            )}
                            {fields.filter((field) => isShown(field, { ...values, ...form.data.data })).map((field) => shared.includes(field.handle) ? (
                                <fieldset key={field.handle} disabled className={SHARED_FIELD} title="Shared by all languages">
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
            <CollapsibleCard title="Search and sharing" titleClassName="cms:text-base" storageKey="cms:listing:seo" hasErrors={hasErrors(errors, 'seo')}>
                <fieldset disabled={!writable} className="cms:min-w-0">
                    <Fields bare id="seo" fields={SEO_FIELDS} value={form.data.seo} errors={errorsAt(errors, 'seo')} onChange={(next) => { form.setData('seo', next); clearErrorsAt('seo'); }} />
                </fieldset>
            </CollapsibleCard>
        </form>
    );
}
