import * as React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { adminUrl, t } from '@sunrice/admin-sdk';
import {
    Button, CollapsibleCard, Input, Label, PageHeader, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, useBreadcrumbs, useUnsavedChanges,
} from '@sunrice/admin-sdk/ui';
import { FieldError } from '@/components/FieldInput.tsx';
import { localeName } from '@/lib/entries.ts';

interface Text {
    key: string;
    label: string;
    /** In the main language. */
    source: string;
    /** In the language being translated; empty: the main language's shows. */
    value: string;
    multiline: boolean;
}

interface Props {
    locale: string;
    main: string;
    locales: { code: string; name: string }[];
    sections: { key: string; title: string; texts: Text[] }[];
}

/**
 * Content → Translations: what visitors read outside entries (the site's
 * description, listing titles, forms, menus), in another language. Only
 * the translations change here.
 */
export default function TranslationsEdit({ locale, main, locales, sections }: Props) {
    const url = adminUrl('cms/translations');
    useBreadcrumbs([{ label: t('Translations') }]);
    const language = locales.find((l) => l.code === locale)?.name ?? localeName(locale);
    const form = useForm({
        locale,
        texts: Object.fromEntries(sections.flatMap((section) => section.texts.map((text) => [text.key, text.value]))) as Record<string, string>,
    });
    const errors = form.errors as Record<string, string | undefined>;
    const save = () => form.put(url, { preserveScroll: true, onSuccess: () => form.setDefaults() });
    useUnsavedChanges(form.isDirty, save);
    const set = (key: string, value: string) => form.setData('texts', { ...form.data.texts, [key]: value });

    return (
        <form onSubmit={(e) => { e.preventDefault(); save(); }} className="cms:flex cms:max-w-5xl cms:flex-col cms:gap-6">
            <Head title={t('Translations')} />
            <PageHeader title={t('Translations')}
                description={t('What visitors read outside entries: forms, listing titles, menus and the site\'s description. Empty: the :main text shows.', { main: localeName(main) })}
                actions={
                    <>
                        {locales.length > 1 && (
                            <Select value={locale} onValueChange={(code: string) => router.get(url, { locale: code })}>
                                <SelectTrigger aria-label={t('Language')} className="cms:w-48"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {locales.map((l) => <SelectItem key={l.code} value={l.code}>{l.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        )}
                        <Button type="submit" disabled={form.processing}>{form.processing && <LoaderCircle className="cms:animate-spin" />} {t('Save')}</Button>
                    </>
                }
            >
                {form.isDirty && <span className="cms:text-sm cms:text-muted-foreground">{t('Unsaved changes')}</span>}
            </PageHeader>
            <FieldError message={errors.locale} />

            {sections.map((section) => (
                <CollapsibleCard key={section.key} title={section.title} titleClassName="cms:text-base" storageKey={`cms:translations:${section.key}`}
                    contentClassName="cms:flex cms:flex-col cms:divide-y cms:divide-border/60">
                    {section.texts.map((text) => {
                        const id = `text-${text.key.replace(/[^A-Za-z0-9_-]/g, '-')}`;
                        const error = errors[`texts.${text.key}`];
                        return (
                            <div key={text.key} className="cms:grid cms:gap-2 cms:py-3 cms:first:pt-0 cms:last:pb-0 cms:md:grid-cols-2 cms:md:gap-4">
                                <div className="cms:flex cms:min-w-0 cms:flex-col cms:gap-1">
                                    <Label htmlFor={id}>{text.label}</Label>
                                    <p className="cms:text-sm cms:break-words cms:whitespace-pre-line cms:text-muted-foreground" lang={main}>{text.source || '—'}</p>
                                </div>
                                <div className="cms:flex cms:min-w-0 cms:flex-col cms:gap-1">
                                    {text.multiline
                                        ? <Textarea id={id} rows={2} lang={locale} value={form.data.texts[text.key] ?? ''} placeholder={text.source} aria-invalid={error !== undefined}
                                            aria-description={t('In :language', { language })} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => set(text.key, e.target.value)} />
                                        : <Input id={id} lang={locale} value={form.data.texts[text.key] ?? ''} placeholder={text.source} aria-invalid={error !== undefined}
                                            aria-description={t('In :language', { language })} onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(text.key, e.target.value)} />}
                                    <FieldError message={error} />
                                </div>
                            </div>
                        );
                    })}
                </CollapsibleCard>
            ))}
        </form>
    );
}
