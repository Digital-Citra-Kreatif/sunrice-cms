import * as React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { adminUrl, t } from '@sunrice/admin-sdk';
import {
    Button, Card, CardContent, Input, Label, PageHeader, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useBreadcrumbs,
} from '@sunrice/admin-sdk/ui';
import { FieldError } from '@/components/FieldInput.tsx';
import { localeName } from '@/lib/entries.ts';

interface Props {
    taxonomy: { handle: string; title: string; hierarchical: boolean };
    locale: string;
    locales: string[];
    /** Put under this term to start with (?parent=). */
    parent: number | null;
    /** Where it can go, in nested taxonomies. */
    terms: { id: number; title: string; depth: number }[];
}

const TOP = '__top';

export default function TermCreate({ taxonomy, locale, locales, parent, terms }: Props) {
    const list = adminUrl(`cms/taxonomies/${taxonomy.handle}/terms`);
    useBreadcrumbs([{ label: taxonomy.title, href: `${list}?locale=${locale}` }, { label: t('New term') }]);
    const form = useForm({ title: '', slug: '', parent_id: parent, locale });
    const errors = form.errors as Record<string, string | undefined>;

    return (
        <form onSubmit={(e) => { e.preventDefault(); form.post(list); }} className="cms:flex cms:max-w-3xl cms:flex-col cms:gap-6">
            <Head title={t('New term · :taxonomy', { taxonomy: taxonomy.title })} />
            <PageHeader
                title={t('New term')}
                back={{ href: `${list}?locale=${locale}`, label: t('Back to :title', { title: taxonomy.title }) }}
                actions={
                    <>
                        {locales.length > 1 && (
                            <Select value={locale} onValueChange={(next: string) => router.get(`${list}/create`, { locale: next, ...(parent ? { parent } : {}) })}>
                                <SelectTrigger className="cms:w-40" aria-label={t('Language')}><SelectValue /></SelectTrigger>
                                <SelectContent>{locales.map((code) => <SelectItem key={code} value={code}>{localeName(code)}</SelectItem>)}</SelectContent>
                            </Select>
                        )}
                        <Button type="submit" disabled={form.processing}>{form.processing && <LoaderCircle className="cms:animate-spin" />} {t('Create term')}</Button>
                    </>
                }
            />
            <Card>
                <CardContent className="cms:grid cms:gap-5 cms:md:grid-cols-[3fr_2fr]">
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor="title">{t('Title')}</Label>
                        <Input id="title" value={form.data.title} required autoFocus aria-invalid={errors.title !== undefined}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('title', e.target.value)} />
                        <FieldError message={errors.title} />
                    </div>
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor="slug">{t('Slug')}</Label>
                        <Input id="slug" className="cms:font-mono" value={form.data.slug} placeholder={t('Made from the title')} aria-invalid={errors.slug !== undefined}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('slug', e.target.value)} />
                        <FieldError message={errors.slug} />
                    </div>
                    {taxonomy.hierarchical && (
                        <div className="cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2">
                            <Label htmlFor="parent">{t('Under')}</Label>
                            <Select value={form.data.parent_id === null ? TOP : String(form.data.parent_id)}
                                onValueChange={(value: string) => form.setData('parent_id', value === TOP ? null : Number(value))}>
                                <SelectTrigger id="parent" className="cms:md:w-1/2"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={TOP}>{t('Top level')}</SelectItem>
                                    {terms.map((term) => <SelectItem key={term.id} value={String(term.id)}>{'— '.repeat(term.depth)}{term.title}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FieldError message={errors.parent_id} />
                        </div>
                    )}
                    {locales.length > 1 && <p className="cms:text-sm cms:text-muted-foreground cms:md:col-span-2">{t('In :language. Translate it from the list afterwards.', { language: localeName(locale) })}</p>}
                </CardContent>
            </Card>
        </form>
    );
}
