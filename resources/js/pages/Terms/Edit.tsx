import * as React from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, ExternalLink, LoaderCircle } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import {
    Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useBreadcrumbs, useUnsavedChanges,
} from '@sunrice/admin-sdk/ui';
import { FieldError, FieldInput, Fields } from '@/components/FieldInput.tsx';
import { errorsAt } from '@/lib/builder.ts';
import { localeName } from '@/lib/entries.ts';
import { SEO_FIELDS } from '@/lib/seo.ts';
import type { FieldDefinition } from '@/types.ts';

// Field values are any JSON; see the entry editor for why `any`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldValues = Record<string, any>;

interface Props {
    taxonomy: { handle: string; title: string };
    term: { id: number; title: string; template: string | null; url: string | null };
    /** Whether the term has a title in this language. */
    translated: boolean;
    fields: FieldDefinition[];
    locale: string;
    locales: string[];
    shared: string[];
    sharedValues: FieldValues;
    values: FieldValues;
    seo: FieldValues | null;
}

export default function TermEditPage(props: Props) {
    // A fresh form per language and after each save.
    return <TermEdit key={`${props.locale}:${JSON.stringify([props.values, props.seo, props.term.template])}`} {...props} />;
}

function TermEdit({ taxonomy, term, translated, fields, locale, locales, shared, sharedValues, values, seo }: Props) {
    const list = adminUrl(`cms/taxonomies/${taxonomy.handle}/terms`);
    const url = adminUrl(`cms/terms/${term.id}/content`);
    useBreadcrumbs([{ label: taxonomy.title, href: `${list}?locale=${locale}` }, { label: term.title }]);
    const form = useForm<{ locale: string; data: FieldValues; seo: FieldValues; template: string }>({ locale, data: values, seo: seo ?? {}, template: term.template ?? '' });
    const errors = form.errors as Record<string, string | undefined>;
    const save = () => form.processing || form.put(url, { preserveScroll: true });
    useUnsavedChanges(form.isDirty, translated ? save : undefined);

    return (
        <form onSubmit={(e) => { e.preventDefault(); save(); }} className="cms:flex cms:max-w-3xl cms:flex-col cms:gap-6">
            <Head title={term.title} />
            <div className="cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4">
                <div className="cms:flex cms:min-w-0 cms:items-center cms:gap-3">
                    <Button variant="outline" size="icon" className="cms:size-8 cms:shrink-0" asChild>
                        <Link href={`${list}?locale=${locale}`} aria-label={`Back to ${taxonomy.title}`}><ArrowLeft /></Link>
                    </Button>
                    <h1 className="cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight">{term.title}</h1>
                    {form.isDirty && <span className="cms:text-sm cms:text-muted-foreground">Unsaved changes</span>}
                </div>
                <div className="cms:flex cms:items-center cms:gap-2">
                    {term.url && <Button type="button" variant="ghost" asChild><a href={term.url} target="_blank" rel="noopener noreferrer"><ExternalLink /> View</a></Button>}
                    {locales.length > 1 && (
                        <Select value={locale} onValueChange={(next: string) => router.get(adminUrl(`cms/terms/${term.id}/edit`), { locale: next })}>
                            <SelectTrigger className="cms:w-48" aria-label="Language"><SelectValue /></SelectTrigger>
                            <SelectContent>{locales.map((code, i) => <SelectItem key={code} value={code}>{localeName(code)}{i === 0 ? ' (main)' : ''}</SelectItem>)}</SelectContent>
                        </Select>
                    )}
                    {translated && <Button type="submit" disabled={form.processing}>{form.processing && <LoaderCircle className="cms:animate-spin" />} Save</Button>}
                </div>
            </div>

            {!translated ? (
                <p className="cms:text-muted-foreground">This term has no title in {localeName(locale)} yet: give it one in the list first.</p>
            ) : (
                <>
                    {fields.length > 0 && (
                        <Card>
                            <CardContent className="cms:flex cms:flex-col cms:gap-6">
                                {fields.map((field) => shared.includes(field.handle) ? (
                                    <fieldset key={field.handle} disabled className="cms:flex cms:flex-col cms:gap-1">
                                        <FieldInput id={`data-${field.handle}`} field={field} content value={sharedValues[field.handle]} errors={{}} onChange={() => {}} />
                                        <p className="cms:text-sm cms:text-muted-foreground">Shared by all languages: edit it in {localeName(locales[0] ?? 'en')}.</p>
                                    </fieldset>
                                ) : (
                                    <FieldInput key={field.handle} id={`data-${field.handle}`} field={field} content value={form.data.data[field.handle]}
                                        errors={errorsAt(errors, `data.${field.handle}`)} onChange={(value) => form.setData('data', { ...form.data.data, [field.handle]: value })} />
                                ))}
                            </CardContent>
                        </Card>
                    )}
                    <Card>
                        <CardHeader><CardTitle className="cms:text-base">Search and sharing</CardTitle></CardHeader>
                        <CardContent>
                            <Fields id="seo" fields={SEO_FIELDS} value={form.data.seo} errors={errorsAt(errors, 'seo')} onChange={(next) => form.setData('seo', next)} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="cms:flex cms:flex-col cms:gap-2">
                            <Label htmlFor="template">Template</Label>
                            <Input id="template" className="cms:font-mono" placeholder="The taxonomy's" value={form.data.template}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('template', e.target.value)} aria-invalid={errors.template !== undefined} />
                            <FieldError message={errors.template} />
                        </CardContent>
                    </Card>
                </>
            )}
        </form>
    );
}
