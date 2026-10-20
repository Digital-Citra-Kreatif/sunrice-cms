import * as React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { ExternalLink, LoaderCircle } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import { Button, Card, CardContent, PageHeader, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useBreadcrumbs, useUnsavedChanges } from '@sunrice/admin-sdk/ui';
import { FieldInput } from '@/components/FieldInput.tsx';
import { errorsAt } from '@/lib/builder.ts';
import { localeName } from '@/lib/entries.ts';
import type { FieldDefinition } from '@/types.ts';

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
    can: { update: boolean };
}

export default function ListingPage(props: Props) {
    // A fresh form per language and after each save.
    return <ListingEdit key={`${props.locale}:${JSON.stringify(props.values)}`} {...props} />;
}

function ListingEdit({ collection, fields, locale, locales, shared, values, can }: Props) {
    const url = adminUrl(`cms/collections/${collection.handle}/listing`);
    const back = adminUrl(`cms/collections/${collection.handle}/entries`);
    useBreadcrumbs([{ label: collection.title, href: back }, { label: 'Listing page' }]);
    const form = useForm<{ locale: string; data: FieldValues }>({ locale, data: values });
    const errors = form.errors as Record<string, string | undefined>;
    const mainLocale = locales[0];
    const writable = can.update;
    const save = () => form.processing || form.put(url, { preserveScroll: true });
    useUnsavedChanges(form.isDirty, writable ? save : undefined);

    return (
        <form onSubmit={(e) => { e.preventDefault(); save(); }} className="cms:flex cms:max-w-3xl cms:flex-col cms:gap-6">
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

            {fields.length === 0 ? (
                <p className="cms:text-muted-foreground">The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections.</p>
            ) : (
                <fieldset disabled={!writable} className="cms:flex cms:flex-col cms:gap-4">
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
