import * as React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { ArrowLeft, ExternalLink, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CollapsibleCard } from '@/components/app/collapsible-card';
import { InputError } from '@/components/app/input-error';
import { TemplateHelp } from '@/components/app/template-help';
import { useBreadcrumbs } from '@/components/app/breadcrumbs';
import { KeptEditsNotice, VersionConflict, useEditLock } from '@/components/app/edit-lock';
import FieldRenderer from '@/fields/FieldRenderer';
import { TranslationModeProvider } from '@/fields/translation-mode';
import { SEO_FIELDS } from '@/lib/seo-fields';
import { adminUrl } from '@/lib/route';
import { useCan } from '@/lib/can';
import { useUnsavedChanges } from '@/lib/use-unsaved-changes';
import { cn } from '@/lib/utils';
import type { AdminTab, Json, SharedProps } from '@/types';

interface TranslationValues {
    title: string;
    slug: string;
    data: Record<string, Json>;
    seo: Record<string, Json>;
    /** Other languages: shown on the site once Ready (the main language always is). */
    is_ready: boolean;
}

interface Props {
    taxonomy: { id: number; handle: string; title: string; hierarchical: boolean; template?: string | null; has_pages: boolean };
    term: {
        id: number;
        parent_id: number | null;
        template: string | null;
        translations: Record<string, Partial<TranslationValues>>;
        /** Fingerprint of what was loaded: a save is refused if it changed meanwhile. */
        version?: string;
        urls: Record<string, string> | null;
        entries: number;
    } | null;
    parents: { value: string; label: string }[];
    locales: string[];
    mainLocale: string;
    blueprint: AdminTab[] | null;
    can: { edit: boolean; delete: boolean };
    /** Pages to jump to from the ⋮ menu. */
}

interface TermForm {
    parent_id: number | null;
    template: string;
    translations: Record<string, TranslationValues>;
}

const initialForm = (term: Props['term'], locales: string[], mainLocale: string): TermForm => ({
    parent_id: term?.parent_id ?? null,
    template: term?.template ?? '',
    translations: Object.fromEntries(locales.map((l) => {
        const t = term?.translations[l];
        // A language without a translation starts from the main language's fields.
        const data = t?.data ?? (l === mainLocale ? {} : term?.translations[mainLocale]?.data ?? {});
        return [l, { title: t?.title ?? '', slug: t?.slug ?? '', data: data as Record<string, Json>, seo: (t?.seo ?? {}) as Record<string, Json>, is_ready: t?.is_ready ?? true }];
    })),
});

/** Create or edit a term: content and SEO per language, parent and template. */
export default function TermEdit({ taxonomy, term, parents, locales, mainLocale, blueprint, can: allowed }: Props) {
    const { adminPath } = usePage<SharedProps>().props;
    const can = useCan();
    const isNew = term === null;
    const [locale, setLocale] = React.useState(mainLocale);
    const [form, setForm] = React.useState<TermForm>(() => initialForm(term, locales, mainLocale));
    const [saved, setSaved] = React.useState(() => JSON.stringify(initialForm(term, locales, mainLocale)));
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [processing, setProcessing] = React.useState(false);
    const formRef = React.useRef<HTMLFormElement>(null);

    // Fresh props after a save: they become the saved state.
    React.useEffect(() => {
        const next = initialForm(term, locales, mainLocale);
        setForm(next);
        setSaved(JSON.stringify(next));
    }, [term, locales, mainLocale]);

    const listUrl = adminUrl(`taxonomies/${taxonomy.handle}/terms`, adminPath);
    // Only one person edits a term at a time (all its languages together).
    const lock = useEditLock({
        type: 'term',
        id: term?.id,
        enabled: !isNew && allowed.edit,
        getUnsaved: () => (JSON.stringify(form) !== saved ? (form as unknown as Record<string, unknown>) : null),
        leaveTo: listUrl,
    });
    const readOnly = !allowed.edit || lock.readOnly;
    const dirty = !readOnly && JSON.stringify(form) !== saved;
    useUnsavedChanges(dirty && !processing, () => formRef.current?.requestSubmit());
    const loadKept = async (id: number) => {
        const content = await lock.loadKept(id).catch(() => null);
        if (!content) return toast.error('Could not load those changes.');
        setForm({ ...form, ...(content as Partial<TermForm>) });
        toast.success('Loaded. Review them, then save.');
    };
    const current = form.translations[locale];
    const fields = (blueprint ?? []).flatMap((t) => t.fields ?? []);
    const secondary = locale !== mainLocale;
    // Fields that aren't translatable always show the main language's value.
    const shownData = secondary
        ? { ...current.data, ...Object.fromEntries(fields.filter((f) => f.translatable === false).map((f) => [f.handle, form.translations[mainLocale]?.data[f.handle] ?? null])) }
        : current.data;
    const setTranslation = (patch: Partial<TranslationValues>) =>
        setForm({ ...form, translations: { ...form.translations, [locale]: { ...current, ...patch } } });
    const localeHasError = (l: string) => Object.keys(errors).some((k) => k.startsWith(`translations.${l}`));
    const errorsFor = (prefix: string) => Object.fromEntries(Object.entries(errors)
        .filter(([k]) => k.startsWith(`translations.${locale}.${prefix}.`))
        .map(([k, v]) => [k.replace(`translations.${locale}.`, ''), v]));

    useBreadcrumbs([
        { label: 'Taxonomies' },
        { label: taxonomy.title, href: listUrl },
        { label: isNew ? 'New term' : term.translations[mainLocale]?.title || 'Term' },
    ]);

    const submit = (e: React.FormEvent, overwrite = false) => {
        e.preventDefault();
        const options = {
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            onSuccess: () => setErrors({}),
            onError: (e: Record<string, string>) => {
                setErrors(e);
                // Show the first language with a problem.
                const bad = locales.find((l) => Object.keys(e).some((k) => k.startsWith(`translations.${l}`)));
                if (bad) setLocale(bad);
            },
        };
        if (isNew) {
            router.post(adminUrl(`taxonomies/${taxonomy.handle}/terms`, adminPath), form as never, options);
        } else {
            router.put(adminUrl(`terms/${term.id}`, adminPath), { ...form, version: term.version ?? '', overwrite } as never, options);
        }
    };

    const destroy = () => {
        if (!term) return;
        const message = term.entries > 0
            ? `Delete this term? It is removed from ${term.entries} ${term.entries === 1 ? 'entry' : 'entries'}${taxonomy.hierarchical ? ', and its child terms are deleted too' : ''}.`
            : 'Delete this term?';
        if (window.confirm(message)) router.delete(adminUrl(`terms/${term.id}`, adminPath));
    };

    const pageUrl = term?.urls?.[locale] ?? null;

    return (
        <form ref={formRef} onSubmit={submit} className="flex flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                    <Button variant="outline" size="icon" className="size-8 shrink-0" asChild>
                        <Link href={listUrl} aria-label={`Back to ${taxonomy.title}`}><ArrowLeft /></Link>
                    </Button>
                    <div className="min-w-0 space-y-1">
                        <h1 className="truncate sunrice-page-title">{isNew ? `New ${taxonomy.title} term` : form.translations[mainLocale]?.title || 'Untitled'}</h1>
                        <p className="text-sm text-muted-foreground">
                            {taxonomy.title}
                            {!isNew && ` · ${term.entries} ${term.entries === 1 ? 'entry' : 'entries'}`}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {pageUrl && (
                        <Button type="button" variant="outline" asChild>
                            <a href={pageUrl} target="_blank" rel="noopener"><ExternalLink /> View page</a>
                        </Button>
                    )}
                    {allowed.delete && !lock.readOnly && (
                        <Button type="button" variant="outline" size="icon" className="text-destructive" aria-label="Delete term" onClick={destroy}>
                            <Trash2 />
                        </Button>
                    )}
                    {!readOnly && (
                        <Button type="submit" disabled={processing}>{processing ? 'Saving…' : isNew ? 'Create term' : 'Save'}</Button>
                    )}
                </div>
            </div>

            {lock.dialogs}
            <VersionConflict message={errors.version} onOverwrite={() => submit({ preventDefault() {} } as React.FormEvent, true)} />
            {!readOnly && <KeptEditsNotice kept={lock.kept} onLoad={loadKept} onDiscard={lock.discardKept} />}
            {lock.readOnly && (
                <p className="rounded-md border border-dashed bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                    {lock.viewingBy ?? 'Someone else'} is editing this term. You&apos;re viewing it read-only.
                </p>
            )}
            {locales.length > 1 && (
                <Tabs value={locale} onValueChange={setLocale} activationMode="manual">
                    <TabsList>
                        {locales.map((l) => (
                            <TabsTrigger
                                key={l}
                                value={l}
                                title={l === mainLocale ? 'Main language' : 'Optional: leave empty to use the main language'}
                                className={cn('gap-1.5 uppercase', localeHasError(l) && 'text-destructive')}
                            >
                                {l}
                                {l !== mainLocale && (form.translations[l]?.title ?? '').trim() !== '' && (
                                    form.translations[l].is_ready
                                        ? <span className="size-1.5 rounded-full bg-emerald-500" aria-label="translated" />
                                        : <span className="size-1.5 rounded-full bg-amber-500" aria-label="not ready" />
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            )}

            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="flex min-w-0 flex-col gap-6">
                    <CollapsibleCard title="Content" storageKey="term:content" hasErrors={localeHasError(locale)}>
                        <fieldset disabled={readOnly} className="flex min-w-0 flex-col gap-5">
                        <div className="grid gap-5 sm:grid-cols-2 items-start">
                            <div className="grid gap-2">
                                <Label htmlFor="term-title">Title</Label>
                                <Input
                                    id="term-title"
                                    value={current.title}
                                    placeholder={locale !== mainLocale ? form.translations[mainLocale]?.title : ''}
                                    onChange={(e) => setTranslation({ title: e.target.value })}
                                />
                                <InputError message={errors[`translations.${locale}.title`] ?? errors[`translations.${locale}`]} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="term-slug">Slug</Label>
                                <Input id="term-slug" className="font-mono" value={current.slug} placeholder="Generated from the title" onChange={(e) => setTranslation({ slug: e.target.value })} />
                                <InputError message={errors[`translations.${locale}.slug`]} />
                            </div>
                        </div>
                        {secondary && (
                            <>
                                <p className="-mt-2 text-xs text-muted-foreground">
                                    Optional. Leave the title empty to show the {mainLocale.toUpperCase()} version in this language.
                                </p>
                                <label className="flex items-start gap-2 text-sm">
                                    <Switch className="mt-0.5" checked={current.is_ready} onCheckedChange={(v) => setTranslation({ is_ready: v })} />
                                    <span>
                                        Ready
                                        <span className="block text-xs text-muted-foreground">
                                            {current.is_ready
                                                ? 'Shown on the site in this language.'
                                                : `Not shown yet: the site shows the ${mainLocale.toUpperCase()} version until it's ready.`}
                                        </span>
                                    </span>
                                </label>
                            </>
                        )}
                        {fields.length > 0 ? (
                            <TranslationModeProvider secondary={secondary} mainLocale={mainLocale}>
                                <FieldRenderer fields={fields} values={shownData} errors={errorsFor('data')} onChange={(data) => setTranslation({ data })} />
                            </TranslationModeProvider>
                        ) : (
                            <p className="text-xs text-muted-foreground">
                                Need more on terms, such as a description or image? Pick a blueprint in{' '}
                                {can('sunrice.taxonomies.edit') ? (
                                    <Link className="underline" href={adminUrl(`structure/taxonomies/${taxonomy.id}/edit`, adminPath)}>this taxonomy's settings</Link>
                                ) : (
                                    "this taxonomy's settings"
                                )}
                                .
                            </p>
                        )}
                        </fieldset>
                    </CollapsibleCard>

                    {taxonomy.has_pages && (
                        <CollapsibleCard
                            title="SEO"
                            description="How this term's page appears in search results and social shares."
                            storageKey="term:seo"
                            defaultOpen={false}
                            hasErrors={Object.keys(errorsFor('seo')).length > 0}
                        >
                            <fieldset disabled={readOnly} className="min-w-0">
                                <FieldRenderer fields={SEO_FIELDS} values={current.seo} pathPrefix="seo" errors={errorsFor('seo')} onChange={(seo) => setTranslation({ seo })} />
                            </fieldset>
                        </CollapsibleCard>
                    )}
                    <InputError message={errors.translations} />
                </div>

                <div className="flex flex-col gap-6 lg:sticky lg:top-6">
                    {taxonomy.hierarchical && (
                        <CollapsibleCard title="Parent" titleClassName="text-sm" storageKey="term:parent">
                            <fieldset disabled={readOnly} className="min-w-0">
                            <Select value={form.parent_id === null ? 'none' : String(form.parent_id)} onValueChange={(v) => setForm({ ...form, parent_id: v === 'none' ? null : Number(v) })}>
                                <SelectTrigger className="w-full" aria-label="Parent term"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None (top level)</SelectItem>
                                    {parents.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.parent_id} />
                            </fieldset>
                        </CollapsibleCard>
                    )}
                    {taxonomy.has_pages && (
                        <CollapsibleCard title="Template" titleClassName="text-sm" storageKey="term:template" defaultOpen={false}>
                            <fieldset disabled={readOnly} className="flex min-w-0 flex-col gap-2">
                            <Label htmlFor="term-template" className="sr-only">Template</Label>
                            <Input
                                id="term-template"
                                className="font-mono text-sm"
                                placeholder={taxonomy.template || `e.g. taxonomies.${taxonomy.handle}-featured`}
                                value={form.template}
                                onChange={(e) => setForm({ ...form, template: e.target.value })}
                            />
                            <InputError message={errors.template} />
                            <TemplateHelp
                                example={`taxonomies.${taxonomy.handle}-featured`}
                                defaults={[...(taxonomy.template ? [taxonomy.template] : []), `sunrice.taxonomies.${taxonomy.handle}.show`, 'sunrice.taxonomies.show']}
                                lead="Overrides the taxonomy's template for this term's page."
                            />
                            </fieldset>
                        </CollapsibleCard>
                    )}
                    {!readOnly && (
                        <p className="text-center text-xs text-muted-foreground">
                            {dirty ? 'Unsaved changes' : isNew ? 'Not saved yet' : 'All changes saved'} · Ctrl/⌘ S
                        </p>
                    )}
                </div>
            </div>
        </form>
    );
}
