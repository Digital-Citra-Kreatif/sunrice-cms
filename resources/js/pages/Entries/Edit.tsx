import * as React from 'react';
import { toast } from 'sonner';
import { useForm, usePage, router, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Copy, ExternalLink, EyeOff, History, Languages, LoaderCircle, MoreHorizontal, Send, Trash2, Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputError } from '@/components/app/input-error';
import { CollapsibleCard } from '@/components/app/collapsible-card';
import { EntryComments } from '@/components/app/entry-comments';
import { useUnsavedChanges } from '@/lib/use-unsaved-changes';
import { useBreadcrumbs } from '@/components/app/breadcrumbs';
import FieldRenderer from '@/fields/FieldRenderer';
import TermsField from '@/fields/TermsField';
import { TemplateHelp } from '@/components/app/template-help';
import { KeptEditsNotice, VersionConflict, useEditLock } from '@/components/app/edit-lock';
import { TranslationModeProvider } from '@/fields/translation-mode';
import { adminUrl } from '@/lib/route';
import { useCan } from '@/lib/can';
import type { AdminField, AdminTab, SharedProps } from '@/types'; import type { Json } from '@/types';

interface RevisionRow { id: number; created_at: string | null; created_at_iso?: string | null; user_id: number | null }

interface TranslationState {
    id?: number;
    title: string;
    slug: string;
    data: Record<string, Json>;
    seo: Record<string, Json>;
    is_ready: boolean;
    is_outdated: boolean;
    has_draft: boolean;
    /** A revision was restored this session and can be undone. */
    can_undo_restore?: boolean;
    draft_title: string;
    draft_slug: string;
    /** Fingerprint of the loaded draft: a save is refused if it changed meanwhile. */
    version?: string;
    /** Public address of this translation; null when the collection has no single pages. */
    url?: string | null;
    /** Whether the public can see it (published and, for other languages, Ready). */
    is_live?: boolean;
    revisions: RevisionRow[];
}

interface Props {
    collection: { id: number; handle: string; title: string; settings?: Record<string, unknown> };
    entry: {
        id: number; status: string; published_at: string | null; blueprint_id: number | null;
        author_id: number | null; term_ids: number[]; template?: string | null; parent_id?: number | null; comments_closed?: boolean; terms_by_taxonomy?: Record<number, number[]>; translations: Record<string, TranslationState>;
    } | null;
    blueprint: AdminTab[] | null;
    blueprints: { id: number; title: string }[];
    /** Hierarchical collections: entries this one can go under (tree order). */
    parentOptions?: { id: number; title: string; depth: number }[] | null;
    /** Pages to jump to from the ⋮ menu. */
    taxonomies: { id: number; handle: string; title: string; single?: boolean }[];
    locales: string[];
    mainLocale?: string;
    /** What the current user may do with this entry (null for a new entry). */
    can?: { update: boolean; translate: boolean; publish: boolean; delete: boolean; create: boolean; view_drafts?: boolean } | null;
}

/** A readable local date and time, e.g. "6 Oct 2026, 16:49". */
function formatDate(iso: string | null | undefined): string | null {
    if (!iso) return null;
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? iso : date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

/** ISO date → the value a datetime-local input expects (local time). */
function toLocalInput(iso: string | null): string {
    if (!iso) return '';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function flatFields(tabs: AdminTab[] | null): AdminField[] {
    return (tabs ?? []).flatMap((t) => t.fields ?? []);
}

export default function EntryEdit({ collection, entry, blueprint, blueprints, parentOptions, taxonomies, locales, mainLocale = locales[0], can: allowed }: Props) {
    const { adminPath } = usePage<SharedProps>().props;
    const can = useCan();
    const isNew = entry === null;

    const [locale, setLocale] = React.useState(mainLocale);
    const perms = allowed ?? { update: true, translate: true, publish: true, delete: true, create: true };
    // Translate-only users edit other languages; the main language is read-only for them.
    const mayEdit = isNew || (locale === mainLocale ? perms.update : perms.translate);
    const existing = entry?.translations ?? {};

    // Working data for each locale is the draft (data.draft) if present
    // else the live columns. A language without a translation yet starts
    // from the main language's text, laid out exactly like it.
    const initialFrom = (translations: Record<string, TranslationState>, lc: string): TranslationState => {
        const t = translations[lc];
        if (t) {
            // The editor works on the draft: data/seo already are, title and slug come separately.
            return { ...t, title: t.has_draft ? t.draft_title ?? t.title : t.title, slug: t.has_draft ? t.draft_slug ?? t.slug : t.slug };
        }
        return {
            title: lc === mainLocale ? '' : translations[mainLocale]?.title ?? '',
            slug: '',
            data: lc === mainLocale ? {} : translations[mainLocale]?.data ?? {},
            seo: lc === mainLocale ? {} : translations[mainLocale]?.seo ?? {},
            is_ready: false, is_outdated: false,
            has_draft: false, draft_title: '', draft_slug: '', revisions: [],
        };
    };
    const initial = (lc: string) => initialFrom(existing, lc);

    const form = useForm<{
        locale: string;
        title: string;
        slug: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        seo: any;
        is_ready?: boolean;
        blueprint_id?: number | string;
        term_ids: number[];
        template: string;
        parent_id: number | null;
    }>({
        blueprint_id: '',
        locale: mainLocale,
        title: initial(mainLocale).title,
        slug: initial(mainLocale).slug,
        data: initial(mainLocale).data,
        seo: initial(mainLocale).seo,
        term_ids: entry?.term_ids ?? [],
        template: entry?.template ?? '',
        parent_id: entry?.parent_id ?? null,
    });

    // Only one person edits a language at a time (WordPress-style lock).
    const lock = useEditLock({
        type: 'entry',
        id: entry?.id,
        locale,
        enabled: !isNew && mayEdit,
        getUnsaved: () => (form.isDirty ? { title: form.data.title, slug: form.data.slug, data: form.data.data, seo: form.data.seo } : null),
        leaveTo: adminUrl(`collections/${collection.handle}/entries`, adminPath),
    });
    const canEdit = mayEdit && !lock.readOnly;
    // While someone else holds the lock, nothing here changes the entry.
    const acts = lock.readOnly ? { ...perms, update: false, publish: false, translate: false, delete: false } : perms;
    const hasMenuActions = acts.update || acts.publish || acts.create || acts.delete;
    const loadKept = async (id: number) => {
        const c = await lock.loadKept(id).catch(() => null);
        if (!c) return toast.error('Could not load those changes.');
        form.setData((d) => ({ ...d, title: String(c.title ?? d.title), slug: String(c.slug ?? d.slug), data: c.data ?? d.data, seo: c.seo ?? d.seo }));
        toast.success('Loaded. Review them, then save.');
    };

    // Sent with every save, so saving over someone else's newer changes is refused.
    const versionRef = React.useRef<string | undefined>(undefined);
    versionRef.current = existing[locale]?.version;
    const overwriteRef = React.useRef(false);
    const withVersion = <T extends object>(d: T) => ({ ...d, version: versionRef.current ?? '', overwrite: overwriteRef.current });
    const overwrite = () => {
        overwriteRef.current = true;
        formRef.current?.requestSubmit();
    };

    // Picked terms per taxonomy. The picker only knows ids, so each
    // taxonomy keeps the ids it picked; the form posts them all together.
    const [termIdsByTaxonomy, setTermIdsByTaxonomy] = React.useState<Record<number, number[]>>(() => entry?.terms_by_taxonomy ?? {});
    const setTaxonomyTerms = (taxonomyId: number, ids: number[]) => {
        const next = { ...termIdsByTaxonomy, [taxonomyId]: ids };
        setTermIdsByTaxonomy(next);
        form.setData('term_ids', Object.values(next).flat());
    };

    const formRef = React.useRef<HTMLFormElement>(null);
    useUnsavedChanges(canEdit && form.isDirty && !form.processing, () => formRef.current?.requestSubmit());

    const switchLocale = (lc: string) => {
        if (lc === locale) return;
        // Each language is saved separately: don't drop this one's edits silently.
        if (canEdit && form.isDirty && !window.confirm(`You have unsaved changes in ${locale.toUpperCase()}. Switch language and discard them?`)) return;
        setLocale(lc);
        const t = initial(lc);
        const next = { ...form.data, locale: lc, title: t.title, slug: t.slug, data: t.data, seo: t.seo };
        form.setData(next);
        form.setDefaults(next);
        form.clearErrors();
    };

    const tabs: AdminTab[] = blueprint ?? [];
    const seoTab = tabs.find((t) => t.handle === 'seo');
    const contentTabs = tabs.filter((t) => t.handle !== 'seo');
    const current = initial(locale);

    // After the server changes the draft (restore a revision, return to
    // draft), load what it now holds into the form.
    const reloadFromServer = (page: { props: Record<string, unknown> }) => {
        const fresh = (page.props.entry as Props['entry'])?.translations ?? {};
        const t = initialFrom(fresh, locale);
        form.setData((d) => ({ ...d, title: t.title, slug: t.slug, data: t.data, seo: t.seo }));
        form.setDefaults();
        form.clearErrors();
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isNew) {
            form.transform((d) => ({
                title: d.title,
                slug: d.slug,
                data: d.data,
                seo: d.seo,
                blueprint_id: d.blueprint_id || null,
            }));
            form.post(adminUrl(`collections/${collection.handle}/entries`, adminPath), {
                onSuccess: () => form.setDefaults(),
                onFinish: () => form.transform((d) => d),
            });
            return;
        }
        form.transform(withVersion);
        form.put(adminUrl(`entries/${entry.id}`, adminPath), {
            preserveScroll: true,
            onSuccess: () => form.setDefaults(),
            onFinish: () => { overwriteRef.current = false; },
        });
    };

    // Publish date for the main language: empty = now, a future time schedules it.
    const [publishAt, setPublishAt] = React.useState(toLocalInput(entry?.published_at ?? null));
    React.useEffect(() => setPublishAt(toLocalInput(entry?.published_at ?? null)), [entry?.published_at]);

    const publish = (at?: string) => {
        if (!entry) return;
        const publishedAt = locale === mainLocale && at ? new Date(at).toISOString() : null;
        const go = () => router.post(adminUrl(`entries/${entry.id}/publish`, adminPath), { locale, published_at: publishedAt }, { preserveScroll: true });
        // Publishing takes the saved draft, so save unsaved edits first.
        if (form.isDirty && canEdit) {
            form.transform(withVersion);
            form.put(adminUrl(`entries/${entry.id}`, adminPath), { preserveScroll: true, onSuccess: () => { form.setDefaults(); go(); } });
        } else {
            go();
        }
    };

    const changePublishDate = () => entry && publishAt && router.put(
        adminUrl(`entries/${entry.id}/publish-date`, adminPath),
        { published_at: new Date(publishAt).toISOString() },
        { preserveScroll: true },
    );
    const unpublish = () => entry && window.confirm('Unpublish this entry? It will be taken off the site.') && router.post(adminUrl(`entries/${entry.id}/unpublish`, adminPath), {}, { preserveScroll: true });
    // A different entry: start fresh rather than carrying this form over.
    const duplicate = () => entry && router.post(adminUrl(`entries/${entry.id}/duplicate`, adminPath), {}, { preserveState: false });
    const trash = () => entry && window.confirm('Move this entry to trash?') && router.delete(adminUrl(`entries/${entry.id}`, adminPath));
    const returnToDraft = () => {
        const tid = existing[locale]?.id;
        if (tid) router.put(adminUrl(`entry-translations/${tid}/return-to-draft`, adminPath), {}, { preserveScroll: true, onSuccess: reloadFromServer });
    };
    const restoreRevision = (r: RevisionRow) => {
        const question = form.isDirty
            ? `Restore the revision from ${formatDate(r.created_at_iso) ?? r.created_at}? Your unsaved changes will be lost. You can undo the restore afterwards.`
            : `Restore the revision from ${formatDate(r.created_at_iso) ?? r.created_at} into the draft? You can undo this afterwards.`;
        if (!window.confirm(question)) return;
        router.post(adminUrl(`revisions/${r.id}/restore`, adminPath), {}, { preserveScroll: true, onSuccess: reloadFromServer });
    };
    const undoRestore = () => {
        const tid = existing[locale]?.id;
        if (tid) router.post(adminUrl(`entry-translations/${tid}/undo-restore`, adminPath), {}, { preserveScroll: true, onSuccess: reloadFromServer });
    };

    const markReady = () => {
        if (!entry) return;
        form.transform((data) => withVersion({ ...data, is_ready: !current.is_ready }));
        form.put(adminUrl(`entries/${entry.id}`, adminPath), {
            preserveScroll: true,
            onFinish: () => form.transform((data) => data),
        });
    };

    const scheduled = entry?.status === 'published' && !!entry.published_at && new Date(entry.published_at) > new Date();
    const statusLabel = entry?.status !== 'published' ? 'Draft' : scheduled ? 'Scheduled' : 'Published';
    const publishAtChanged = publishAt !== toLocalInput(entry?.published_at ?? null);
    const publishAtFuture = !!publishAt && new Date(publishAt) > new Date();

    useBreadcrumbs([
        { label: 'Content' },
        { label: collection.title, href: adminUrl(`collections/${collection.handle}/entries`, adminPath) },
        { label: isNew ? 'New entry' : existing[mainLocale]?.title || 'Untitled' },
    ]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                    <Button variant="outline" size="icon" className="size-8 shrink-0" asChild>
                        <Link href={adminUrl(`collections/${collection.handle}/entries`, adminPath)} aria-label={`Back to ${collection.title}`}>
                            <ArrowLeft />
                        </Link>
                    </Button>
                    <div className="min-w-0 space-y-1">
                        <h1 className="truncate sunrice-page-title">
                            {isNew ? `New ${collection.title} entry` : form.data.title || 'Untitled'}
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <span>{collection.title}</span>
                            {entry && (
                                <Badge variant={scheduled ? 'warning' : entry.status === 'published' ? 'success' : 'secondary'}>{statusLabel}</Badge>
                            )}
                            {current.is_outdated && <Badge variant="warning">Outdated translation</Badge>}
                            {current.has_draft && entry?.status === 'published' && <Badge variant="outline">Unpublished changes</Badge>}
                        </div>
                    </div>
                </div>
                {!isNew && (
                    <div className="flex items-center gap-2">
                        {current.url && (current.is_live || allowed?.view_drafts) && (
                            <Button type="button" variant="outline" asChild>
                                <a
                                    href={current.url}
                                    target="_blank"
                                    rel="noopener"
                                    title={current.is_live ? 'Open the public page' : 'Only you and other editors can see this draft while signed in'}
                                >
                                    <ExternalLink /> {current.is_live ? 'View page' : 'View draft'}
                                </a>
                            </Button>
                        )}
                        {acts.publish && (
                            <Button type="button" onClick={() => publish()}>
                                <Send /> Publish
                            </Button>
                        )}
                        {hasMenuActions && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button type="button" variant="outline" size="icon" aria-label="More actions">
                                    <MoreHorizontal />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                {acts.update && (
                                    <DropdownMenuItem onSelect={markReady}>
                                        <CheckCircle2 /> {current.is_ready ? 'Unmark ready' : 'Mark ready'}
                                    </DropdownMenuItem>
                                )}
                                {acts.update && locale !== mainLocale && current.is_ready && (
                                    <DropdownMenuItem onSelect={returnToDraft}>
                                        <Undo2 /> Return to draft
                                    </DropdownMenuItem>
                                )}
                                {acts.publish && entry?.status === 'published' && (
                                    <DropdownMenuItem onSelect={unpublish}>
                                        <EyeOff /> Unpublish
                                    </DropdownMenuItem>
                                )}
                                {acts.create && (
                                    <DropdownMenuItem onSelect={duplicate}>
                                        <Copy /> Duplicate
                                    </DropdownMenuItem>
                                )}
                                {acts.delete && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem variant="destructive" onSelect={trash}>
                                            <Trash2 /> Move to trash
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        )}
                    </div>
                )}
            </div>

            {locales.length > 1 && (
                <Tabs value={locale} onValueChange={switchLocale} activationMode="manual">
                    <TabsList>
                        {locales.map((lc) => (
                            <TabsTrigger key={lc} value={lc} className="gap-1.5 uppercase">
                                {lc}
                                {existing[lc]?.has_draft && <span className="size-1.5 rounded-full bg-amber-500" aria-label="has draft" />}
                                {lc !== mainLocale && existing[lc]?.is_ready && <span className="size-1.5 rounded-full bg-emerald-500" aria-label="ready" />}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            )}

            {lock.dialogs}
            <VersionConflict message={(form.errors as Record<string, string>).version} onOverwrite={overwrite} />
            {canEdit && <KeptEditsNotice kept={lock.kept} onLoad={loadKept} onDiscard={lock.discardKept} />}
            {!canEdit && (
                <p className="rounded-md border border-dashed bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                    {lock.readOnly
                        ? `${lock.viewingBy ?? 'Someone else'} is editing this ${locale.toUpperCase()} version. You're viewing it read-only.`
                        : locale === mainLocale && acts.translate
                        ? 'You can translate this entry. Switch to another language to edit it.'
                        : 'You can view this version but not edit it.'}
                </p>
            )}

            <form ref={formRef} onSubmit={submit} className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
                <div className="flex min-w-0 flex-col gap-6">
                    {contentTabs.map((tab, index) => (
                        <CollapsibleCard key={tab.handle} title={tab.label} storageKey={`entry:${collection.handle}:${tab.handle}`} hasErrors={Object.keys(form.errors).length > 0} contentClassName="flex flex-col gap-6">
                            <fieldset disabled={!canEdit} className="flex min-w-0 flex-col gap-6 disabled:opacity-80">
                                {index === 0 && (
                                    <div className="grid gap-4 sm:grid-cols-2 items-start">
                                        <div className="grid gap-2">
                                            <Label htmlFor="entry-title">Title</Label>
                                            <Input id="entry-title" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} required />
                                            <InputError message={form.errors.title} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="entry-slug">Slug</Label>
                                            <Input
                                                id="entry-slug"
                                                className="font-mono text-sm"
                                                value={form.data.slug}
                                                onChange={(e) => form.setData('slug', e.target.value)}
                                                placeholder="Generated from the title"
                                            />
                                            <InputError message={form.errors.slug} />
                                        </div>
                                    </div>
                                )}
                                {index === 0 && locale !== mainLocale && (
                                    <p className="flex items-start gap-2 rounded-md border border-dashed bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                                        <Languages className="mt-0.5 size-4 shrink-0" />
                                        <span>
                                            Translate the text here. Rows, blocks, their order and visibility, images and other shared
                                            fields come from the {mainLocale.toUpperCase()} version. Text left unchanged keeps following it.
                                        </span>
                                    </p>
                                )}
                                <TranslationModeProvider secondary={locale !== mainLocale} mainLocale={mainLocale}>
                                    <FieldRenderer
                                        fields={tab.fields}
                                        values={form.data.data}
                                        errors={form.errors}
                                        onChange={(values) => form.setData('data', values)}
                                    />
                                </TranslationModeProvider>
                            </fieldset>
                        </CollapsibleCard>
                    ))}
                    {seoTab && (
                        <CollapsibleCard
                            hasErrors={Object.keys(form.errors).length > 0}
                            title={seoTab.label}
                            description="How this entry appears in search results and social shares."
                            storageKey={`entry:${collection.handle}:seo`}
                        >
                            <fieldset disabled={!canEdit} className="min-w-0 disabled:opacity-80">
                                <FieldRenderer
                                    fields={seoTab.fields}
                                    values={form.data.seo}
                                    errors={form.errors}
                                    pathPrefix="seo"
                                    onChange={(values) => form.setData('seo', values)}
                                />
                            </fieldset>
                        </CollapsibleCard>
                    )}
                    {entry && collection.settings?.comments === true && collection.settings?.has_single !== false && can('sunrice.comments.view') && (
                        <EntryComments entryId={entry.id} closed={!!entry.comments_closed} />
                    )}
                </div>

                <div className="flex flex-col gap-6 lg:sticky lg:top-6">
                    <CollapsibleCard title="Status" titleClassName="text-sm" storageKey="entry:status" contentClassName="flex flex-col gap-4">
                            {entry && (
                                <dl className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 text-sm">
                                    <dt className="text-muted-foreground">Status</dt>
                                    <dd className="text-right">
                                        <Badge variant={scheduled ? 'warning' : entry.status === 'published' ? 'success' : 'secondary'}>{statusLabel}</Badge>
                                    </dd>
                                    {entry.published_at && (
                                        <>
                                            <dt className="text-muted-foreground">{scheduled ? 'Goes live' : 'Published'}</dt>
                                            <dd className="text-right" title={entry.published_at}>{formatDate(entry.published_at)}</dd>
                                        </>
                                    )}
                                    {locale !== mainLocale && (
                                        <>
                                            <dt className="text-muted-foreground">Translation</dt>
                                            <dd className="text-right">{current.is_ready ? 'Ready' : 'Draft'}</dd>
                                        </>
                                    )}
                                </dl>
                            )}
                            {entry && acts.publish && locale === mainLocale && (
                                <div className="grid gap-2">
                                    <Label htmlFor="publish-at">Publish date</Label>
                                    <Input id="publish-at" type="datetime-local" value={publishAt} onChange={(e) => setPublishAt(e.target.value)} />
                                    <p className="text-xs text-muted-foreground">
                                        {publishAt ? (publishAtFuture ? 'In the future: the entry goes live then.' : 'The date shown as published.') : 'Empty: publish now.'}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {entry.status !== 'published' ? (
                                            <Button type="button" size="sm" onClick={() => publish(publishAt)}>
                                                <Send /> {publishAtFuture ? 'Schedule' : 'Publish'}
                                            </Button>
                                        ) : (
                                            <>
                                                {publishAtChanged && publishAt && (
                                                    <Button type="button" size="sm" onClick={changePublishDate}>
                                                        {publishAtFuture ? 'Reschedule' : 'Update date'}
                                                    </Button>
                                                )}
                                                <Button type="button" size="sm" variant="outline" onClick={unpublish}>
                                                    <EyeOff /> {scheduled ? 'Cancel schedule' : 'Unpublish'}
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                            {isNew && blueprints.length > 1 && (
                                <div className="grid gap-2">
                                    <Label>Blueprint</Label>
                                    <Select
                                        value={String(form.data.blueprint_id || '')}
                                        onValueChange={(v) => form.setData('blueprint_id', Number(v))}
                                    >
                                        <SelectTrigger className="w-full"><SelectValue placeholder="Collection default" /></SelectTrigger>
                                        <SelectContent>
                                            {blueprints.map((b) => <SelectItem key={b.id} value={String(b.id)}>{b.title}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            {canEdit && (
                                <div className="grid gap-1.5">
                                    <Button
                                        type="submit"
                                        variant={isNew || form.isDirty ? 'default' : 'outline'}
                                        disabled={form.processing || (!isNew && !form.isDirty)}
                                        className="w-full"
                                    >
                                        {form.processing && <LoaderCircle className="animate-spin" />}
                                        {isNew ? 'Create draft' : form.isDirty ? 'Save draft' : 'Saved'}
                                    </Button>
                                    <p className="text-center text-xs text-muted-foreground">
                                        {form.isDirty ? (
                                            <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-amber-500" /> Unsaved changes</span>
                                        ) : !isNew && 'All changes saved'}
                                        <span className="hidden sm:inline"> · Ctrl/⌘ S</span>
                                    </p>
                                </div>
                            )}
                    </CollapsibleCard>

                    {taxonomies.length > 0 && (
                        <CollapsibleCard title="Taxonomies" titleClassName="text-sm" storageKey="entry:taxonomies" contentClassName="flex flex-col gap-4">
                            <fieldset disabled={!acts.update} className="flex flex-col gap-4 disabled:opacity-60">
                                {taxonomies.map((tax) => (
                                    <div key={tax.id} className="grid gap-2">
                                        <Label>{tax.title}{tax.single && <span className="ml-1 font-normal text-muted-foreground">(one)</span>}</Label>
                                        <TermsField
                                            field={{ handle: `taxonomy_${tax.handle}`, type: 'terms', label: tax.title, config: { taxonomy: tax.handle, ...(tax.single ? { max: 1 } : {}) } }}
                                            value={termIdsByTaxonomy[tax.id] ?? []}
                                            onChange={(value) => setTaxonomyTerms(tax.id, (value as number[]) ?? [])}
                                        />
                                    </div>
                                ))}
                                <InputError message={(form.errors as Record<string, string>).term_ids} />
                                {!perms.update && <p className="text-xs text-muted-foreground">Only editors can change terms.</p>}
                            </fieldset>
                        </CollapsibleCard>
                    )}

                    {parentOptions && (
                        <CollapsibleCard title="Parent" titleClassName="text-sm" storageKey="entry:parent" contentClassName="flex flex-col gap-2">
                            <fieldset disabled={!acts.update} className="grid gap-2 disabled:opacity-60">
                                <Label htmlFor="entry-parent" className="sr-only">Parent</Label>
                                <Select value={form.data.parent_id ? String(form.data.parent_id) : 'none'} onValueChange={(v) => form.setData('parent_id', v === 'none' ? null : Number(v))}>
                                    <SelectTrigger id="entry-parent" className="w-full"><SelectValue /></SelectTrigger>
                                    <SelectContent className="max-h-80">
                                        <SelectItem value="none">None (top level)</SelectItem>
                                        {parentOptions.map((p) => (
                                            <SelectItem key={p.id} value={String(p.id)}>
                                                <span style={{ paddingLeft: `${p.depth * 0.75}rem` }}>{p.depth > 0 && '— '}{p.title}</span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={(form.errors as Record<string, string>).parent_id} />
                                <p className="text-xs text-muted-foreground">
                                    The URL starts with the parent's, e.g. <code>/about/team</code>. Saved with the draft and applied right away; the old URL redirects.
                                </p>
                            </fieldset>
                        </CollapsibleCard>
                    )}

                    {collection.settings?.has_single !== false && (
                        <CollapsibleCard title="Template" titleClassName="text-sm" storageKey="entry:template" defaultOpen={false} contentClassName="flex flex-col gap-2">
                            <fieldset disabled={!acts.update} className="grid gap-2 disabled:opacity-60">
                                <Label htmlFor="entry-template" className="sr-only">Template</Label>
                                <Input
                                    id="entry-template"
                                    className="font-mono text-sm"
                                    placeholder={(collection.settings?.template as string) || `e.g. ${collection.handle}.landing`}
                                    value={form.data.template}
                                    onChange={(e) => form.setData('template', e.target.value)}
                                />
                                <InputError message={(form.errors as Record<string, string>).template} />
                                <TemplateHelp
                                    example={`${collection.handle}.landing`}
                                    defaults={[...(collection.settings?.template ? [collection.settings.template as string] : []), `sunrice.${collection.handle}.show`, 'sunrice.show']}
                                    lead="Overrides the collection's template for this entry's page."
                                />
                            </fieldset>
                        </CollapsibleCard>
                    )}

                    {!isNew && canEdit && (current.revisions.length > 0 || current.can_undo_restore) && (
                        <CollapsibleCard
                            title={<span className="flex items-center gap-2"><History className="size-4" /> Revisions</span>}
                            titleClassName="text-sm"
                            description="Restoring copies a revision into the draft; the live page changes when you publish."
                            storageKey="entry:revisions"
                        >
                            {current.can_undo_restore && (
                                <div className="mb-3 flex items-center justify-between gap-2 rounded-md border border-dashed px-3 py-2 text-sm">
                                    <span className="text-muted-foreground">A revision was restored.</span>
                                    <Button type="button" variant="outline" size="sm" className="h-7" onClick={undoRestore}>
                                        <Undo2 /> Undo
                                    </Button>
                                </div>
                            )}
                            <ul className="-mx-2 flex flex-col">
                                {current.revisions.slice(0, 10).map((r) => (
                                    <li key={r.id} className="flex items-center justify-between rounded-md px-2 py-1 text-sm hover:bg-accent">
                                        <span className="text-muted-foreground" title={r.created_at ?? undefined}>{formatDate(r.created_at_iso) ?? r.created_at}</span>
                                        <Button type="button" variant="ghost" size="sm" className="h-7" onClick={() => restoreRevision(r)}>
                                            Restore
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </CollapsibleCard>
                    )}
                </div>
            </form>
        </div>
    );
}
