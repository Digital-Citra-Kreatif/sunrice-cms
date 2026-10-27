import * as React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { ExternalLink, LoaderCircle } from 'lucide-react';
import { adminUrl, t } from '@imajiner/admin-sdk';
import {
    Button, Card, CardContent, CollapsibleCard, Input, Label, LanguageTabs, PageHeader, Switch, Textarea,
    useBreadcrumbs, useUnsavedChanges,
} from '@imajiner/admin-sdk/ui';
import { FieldError } from '@/components/FieldError.tsx';
import { localeName } from '@/lib/entries.ts';
import { translationProgress } from '@/lib/translations.ts';

interface Text {
    key: string;
    /** Where it shows ("Field: Name"), or what tells it apart (a handle); may be empty. */
    label: string;
    /** In the main language: what's translated. */
    source: string;
    /** In the language being translated; empty: the main language's shows. */
    value: string;
    multiline: boolean;
    /** Where visitors see it, when there's a page. */
    url: string | null;
}

interface Props {
    locale: string;
    main: string;
    locales: { code: string; name: string }[];
    /** By where visitors see them: listing and term page titles, each form, each menu, the site's description. */
    sections: { key: string; title: string; hint: string | null; texts: Text[] }[];
}

/**
 * Content → Translations: the site's own texts that aren't entries, in
 * another language, with how many are translated and a filter for the
 * rest. Only the translations change here.
 */
export default function TranslationsEdit({ locale, main, locales, sections }: Props) {
    const url = adminUrl('cms/translations');
    useBreadcrumbs([{ label: t('Translations') }]);
    const language = locales.find((l) => l.code === locale)?.name ?? localeName(locale);
    const form = useForm({
        locale,
        texts: Object.fromEntries(sections.flatMap((section) => section.texts.map((text) => [text.key, text.value]))) as Record<string, string>,
    });
    const [untranslatedOnly, setUntranslatedOnly] = React.useState(false);
    const errors = form.errors as Record<string, string | undefined>;
    const save = () => form.put(url, { preserveScroll: true, onSuccess: () => form.setDefaults() });
    useUnsavedChanges(form.isDirty, save);
    const set = (key: string, value: string) => form.setData('texts', { ...form.data.texts, [key]: value });
    const progress = translationProgress(sections.flatMap((section) => section.texts.map((text) => form.data.texts[text.key] ?? '')));
    const shown = sections
        // What was saved (the props) decides what the filter hides, so a row doesn't vanish while it's typed in.
        .map((section) => ({ ...section, texts: untranslatedOnly ? section.texts.filter((text) => text.value.trim() === '') : section.texts }))
        .filter((section) => section.texts.length > 0);

    return (
        <form onSubmit={(e) => { e.preventDefault(); save(); }} className="cms:flex cms:max-w-5xl cms:flex-col cms:gap-6">
            <Head title={t('Translations')} />
            <PageHeader title={t('Translations')}
                description={t('Translate the site\'s own texts that aren\'t entries: they show on listing pages, forms and menus. Left empty, the :main text shows.', { main: localeName(main) })} />

            {/* The language and Save stay in reach while scrolling a long list. */}
            <Card className="cms:sticky cms:top-16 cms:z-10 cms:py-3 cms:shadow-sm">
                <CardContent className="cms:flex cms:flex-wrap cms:items-center cms:gap-x-4 cms:gap-y-2">
                    {locales.length > 1 ? (
                        <LanguageTabs value={locale} languages={locales} onValueChange={(code: string) => router.get(url, { locale: code })} />
                    ) : <span className="cms:font-medium">{language}</span>}
                    <span className="cms:text-sm cms:text-muted-foreground" aria-live="polite">
                        {t(':done of :total translated into :language', { done: progress.done, total: progress.total, language })}
                    </span>
                    <span className="cms:flex cms:items-center cms:gap-2">
                        <Switch id="untranslated-only" checked={untranslatedOnly} onCheckedChange={(on: boolean) => setUntranslatedOnly(on)} />
                        <Label htmlFor="untranslated-only" className="cms:font-normal">{t('Only untranslated')}</Label>
                    </span>
                    <span className="cms:ml-auto cms:flex cms:items-center cms:gap-3">
                        {form.isDirty && <span className="cms:text-sm cms:text-muted-foreground">{t('Unsaved changes')}</span>}
                        <Button type="submit" disabled={form.processing}>{form.processing && <LoaderCircle className="cms:animate-spin" />} {t('Save')}</Button>
                    </span>
                </CardContent>
            </Card>
            <FieldError message={errors.locale} />

            {shown.length === 0 && (
                <p className="cms:py-8 cms:text-center cms:text-sm cms:text-muted-foreground">
                    {untranslatedOnly ? t('Everything is translated into :language.', { language }) : t('Nothing to translate yet.')}
                </p>
            )}
            {shown.map((section) => (
                <CollapsibleCard key={section.key} title={section.hint ? <>{section.title} <span className="cms:font-normal cms:text-muted-foreground">· {section.hint}</span></> : section.title}
                    titleClassName="cms:text-base" storageKey={`cms:translations:${section.key}`}
                    contentClassName="cms:flex cms:flex-col cms:divide-y cms:divide-border/60">
                    {section.texts.map((text) => {
                        const id = `text-${text.key.replace(/[^A-Za-z0-9_-]/g, '-')}`;
                        const error = errors[`texts.${text.key}`];
                        const value = form.data.texts[text.key] ?? '';
                        return (
                            <div key={text.key} className="cms:grid cms:gap-2 cms:py-3 cms:first:pt-0 cms:last:pb-0 cms:md:grid-cols-2 cms:md:gap-4">
                                <div className="cms:flex cms:min-w-0 cms:flex-col cms:gap-0.5">
                                    {/* The main language's text is what's translated: it's the label. */}
                                    <Label htmlFor={id} lang={main} className="cms:break-words cms:whitespace-pre-line">{text.source}</Label>
                                    {(text.label || text.url) && (
                                        <p className="cms:flex cms:flex-wrap cms:items-center cms:gap-x-2 cms:text-xs cms:text-muted-foreground">
                                            {text.label && <span>{text.label}</span>}
                                            {text.url && (
                                                <a href={text.url} target="_blank" rel="noopener noreferrer" className="cms:inline-flex cms:items-center cms:gap-1 cms:underline-offset-4 cms:hover:text-foreground cms:hover:underline">
                                                    {t('View')}<ExternalLink className="cms:size-3" aria-hidden />
                                                </a>
                                            )}
                                        </p>
                                    )}
                                </div>
                                <div className="cms:flex cms:min-w-0 cms:flex-col cms:gap-1">
                                    {text.multiline
                                        ? <Textarea id={id} rows={2} lang={locale} value={value} aria-invalid={error !== undefined}
                                            aria-description={t('In :language', { language })} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => set(text.key, e.target.value)} />
                                        : <Input id={id} lang={locale} value={value} aria-invalid={error !== undefined}
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
