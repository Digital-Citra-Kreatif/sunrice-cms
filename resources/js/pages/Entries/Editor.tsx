import * as React from 'react';
import { Deferred, Head, router, useForm } from '@inertiajs/react';
import { CalendarClock, Check, ChevronDown, Copy, ExternalLink, Eye, Languages, LoaderCircle, Plus, RotateCcw, Send, Trash2, Undo2 } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import {
    Badge, Button, Card, CardContent, CollapsibleCard, DatePicker, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Input, KeptEditsNotice, Label, PageHeader,
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Skeleton, Switch, useBreadcrumbs, useEditLock, useUnsavedChanges, ViewingNotice,
} from '@sunrice/admin-sdk/ui';
import { useConfirm } from '@/components/Confirm.tsx';
import { EntriesPicker } from '@/components/EntriesPicker.tsx';
import { EntryComments, type EntryCommentsSummary } from '@/components/EntryComments.tsx';
import { FieldSections } from '@/components/FieldSections.tsx';
import { TermLabels } from '@/components/TermsPicker.tsx';
import { SEO_FIELDS } from '@/lib/seo.ts';
import { FieldError, Fields } from '@/components/FieldInput.tsx';
import { errorKeysAt, errorsAt, hasErrors } from '@/lib/builder.ts';
import { type EntryLocale, type EntryStatus, formatDate, localeName, localInputValue, statusLabel } from '@/lib/entries.ts';
import type { FieldDefinition } from '@/types.ts';

interface Props {
    collection: { handle: string; title: string; dated: boolean; hierarchical?: boolean; ordered?: boolean; comments?: boolean; pages?: boolean };
    /** Every language's: the parent entry and the entry's own Blade view. */
    settings?: { parentId: number | null; template: string | null; commentsClosed?: boolean; blueprint?: string | null };
    /** The blueprints the entry may use, when its collection offers more than one. */
    blueprints?: { handle: string; title: string }[];
    fields: FieldDefinition[];
    /** The site's languages and the entry's status in each (none for a new entry). */
    locales?: EntryLocale[];
    /** Fields shared by all languages, edited in the main one: read-only here with its values. */
    shared?: string[];
    sharedValues?: FieldValues;
    entry: {
        id: number;
        locale: string;
        isMain: boolean;
        status: EntryStatus;
        publishedAt: string | null;
        hasUnpublishedChanges: boolean;
        trashed: boolean;
        /** Sent for review ("Submit for review"): when, and by whom. */
        review?: { requestedAt: string; by: string | null } | null;
        version: number;
        /** The live page, when published and the collection has a URL. */
        url: string | null;
        /** A signed link showing the saved draft, for a while. */
        previewUrl: string;
    } | null;
    values: { title: string; slug: string; data: FieldValues; seo: FieldValues | null };
    /** Deferred: loaded after the page shows. */
    revisions?: { id: number; title: string; createdAt: string | null }[];
    /** Deferred, when the collection takes comments and the user may see them (else null). */
    comments?: EntryCommentsSummary | null;
    /** The chosen terms' titles, by id, for terms fields. */
    termLabels?: Record<string, string> | never[];
    /** Where other content points at this entry (entries, terms, global sets). */
    usedBy?: UsedBy[];
    /** This translation's id when a revision restore this session can be undone. */
    undoRestore?: number | null;
    /** This translation's id when it can be machine-translated from the main language ("Translate from …"). */
    machineTranslate?: number | null;
    can: { create: boolean; update: boolean; publish: boolean; delete: boolean };
}

/**
 * Field values are any JSON. Inertia's form types recurse into the data's
 * shape and stop only at `any`, so that's what the values are typed as.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldValues = Record<string, any>;
type UsedBy = { label: string; url: string | null; field: string; fieldLabel?: string };

/** " It's used by A; B." for confirmations, or nothing. */
function usedBySentence(usedBy: UsedBy[]): string {
    if (usedBy.length === 0) return '';
    const shown = usedBy.slice(0, 5).map((use) => use.label).join('; ');
    return ` It's used by ${shown}${usedBy.length > 5 ? ` and ${usedBy.length - 5} more` : ''}: those links will show nothing.`;
}
type FormData = { locale: string | null; title: string; slug: string; data: FieldValues; seo: FieldValues; version: number | null; publish: boolean; published_at: string | null };


/**
 * A fresh form for each version the server sends (after creating, saving,
 * publishing…): Inertia keeps the page component between visits, and the
 * form would keep the old values.
 */
export default function EntryEditorPage(props: Props) {
    const { entry } = props;

    return <EntryEditor key={entry ? `${entry.id}:${entry.locale}:${entry.version}:${entry.status}:${entry.trashed}:${entry.publishedAt}` : 'new'} {...props} />;
}

function EntryEditor({ collection, fields, locales = [], shared = [], sharedValues = {}, entry, values, revisions, comments, termLabels, usedBy = [], undoRestore = null, machineTranslate = null, settings, blueprints = [], can }: Props) {
    const list = adminUrl(`cms/collections/${collection.handle}/entries`);
    const url = entry ? adminUrl(`cms/entries/${entry.id}`) : list;
    const heading = entry ? values.title : 'New entry';
    useBreadcrumbs([{ label: collection.title, href: list }, { label: heading }]);
    const [confirm, confirmDialog] = useConfirm();
    const [scheduling, setScheduling] = React.useState(false);

    const form = useForm<FormData>({ ...values, seo: values.seo ?? {}, locale: entry?.locale ?? null, version: entry?.version ?? null, publish: false, published_at: null });
    const locale = entry ? { locale: entry.locale } : {};
    const mainLocale = locales.find((l) => l.main)?.code;

    const errors = form.errors as Record<string, string | undefined>;
    // An edited value loses its error: the server's message was about what was there before.
    const clearErrorsAt = (path: string) => {
        const keys = errorKeysAt(errors, path);
        if (keys.length > 0) form.clearErrors(...(keys as never[]));
    };
    // Nothing new to publish: the live version is the draft, and the form has no changes.
    const upToDate = entry !== null && entry.status !== 'draft' && !entry.hasUnpublishedChanges && !form.isDirty;
    const editable = entry === null ? can.create : can.update && !entry.trashed;

    const save = (publish = false, publishedAt: string | null = null) => {
        form.transform((data) => ({ ...data, publish, published_at: publishedAt }));
        if (entry) {
            form.put(url, { preserveScroll: true, onSuccess: () => setScheduling(false) });
        } else {
            form.post(url);
        }
    };
    // After "someone else saved": save over their version anyway.
    const saveMine = () => {
        form.transform((data) => ({ ...data, version: null, publish: false, published_at: null }));
        form.put(url, { preserveScroll: true });
    };
    const lock = useEditLock({
        type: 'cms.entry', id: entry?.id, locale: entry?.locale, enabled: entry !== null && editable, noun: 'entry', leaveTo: list,
        getUnsaved: () => (form.isDirty ? { title: form.data.title, slug: form.data.slug, data: form.data.data, seo: form.data.seo } : null),
    });
    const writable = editable && !lock.readOnly;
    const loadKept = async (id: number) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const kept = await lock.loadKept(id) as any;
        form.setData((data) => ({ ...data, title: kept.title ?? data.title, slug: kept.slug ?? data.slug, data: kept.data ?? data.data, seo: kept.seo ?? data.seo }));
    };
    useUnsavedChanges(form.isDirty && !lock.takenOver, writable ? () => form.processing || save() : undefined);

    // Those who may edit but not publish ask for a review: of what's in the form, saved first.
    const requestReview = () => {
        const send = () => router.post(`${url}/review`, locale, { preserveScroll: true });
        if (form.isDirty) {
            form.transform((data) => ({ ...data, publish: false, published_at: null }));
            form.put(url, { preserveScroll: true, onSuccess: send });
        } else {
            send();
        }
    };

    // Publishing what's in the form: saved first when one may edit, else the saved draft.
    const publish = (publishedAt: string | null = null) => {
        if (can.update) {
            save(true, publishedAt);
        } else if (entry) {
            router.post(`${url}/publish`, { ...locale, published_at: publishedAt }, { preserveScroll: true, onSuccess: () => setScheduling(false) });
        }
    };

    return (
        <form noValidate onSubmit={(e) => { e.preventDefault(); save(); }} className="cms:flex cms:flex-col cms:gap-6">
            <Head title={heading} />
            {confirmDialog}
            {lock.dialogs}

            <PageHeader
                title={heading}
                back={{ href: list, label: `Back to ${collection.title}` }}
                actions={
                    <>
                        {entry && !entry.trashed && collection.pages !== false && (
                            <Button type="button" variant="ghost" asChild>
                                <a href={entry.previewUrl} target="_blank" rel="noopener noreferrer"
                                    title={form.isDirty ? 'Shows the saved draft: save first to see your changes.' : 'Shows the saved draft.'}>
                                    <Eye /> Preview
                                </a>
                            </Button>
                        )}
                        {entry?.url && (
                            <Button type="button" variant="ghost" asChild>
                                <a href={entry.url} target="_blank" rel="noopener noreferrer"><ExternalLink /> View</a>
                            </Button>
                        )}
                        {entry?.trashed && can.delete && (
                            <Button type="button" variant="outline" onClick={() => router.post(`${url}/restore`, {}, { preserveScroll: true })}>
                                <RotateCcw /> Restore
                            </Button>
                        )}
                        {entry?.trashed && can.delete && (
                            <Button type="button" variant="outline" className="cms:text-destructive"
                                onClick={() => confirm(`Delete "${values.title}" for good, in every language, with its revisions? This can't be undone.${usedBySentence(usedBy)}`,
                                    () => router.delete(`${url}/force`, { data: usedBy.length > 0 ? { force: 1 } : {} }))}>
                                <Trash2 /> Delete for good
                            </Button>
                        )}
                        {entry && !entry.trashed && can.create && (
                            <Button type="button" variant="ghost" title="Copy every language as a new draft" onClick={() => router.post(`${url}/duplicate`)}>
                                <Copy /> Duplicate
                            </Button>
                        )}
                        {entry && !entry.trashed && can.delete && !lock.readOnly && (
                            <Button type="button" variant="outline" size="icon" className="cms:text-destructive" aria-label="Move to the trash"
                                onClick={() => confirm(`Move "${values.title}" to the trash? It comes off the site; you can restore it.${usedBySentence(usedBy)}`, () => router.delete(url), 'Move to trash')}>
                                <Trash2 />
                            </Button>
                        )}
                        {entry && writable && machineTranslate !== null && (
                            <Button type="button" variant="outline" disabled={form.processing || form.isDirty} title={form.isDirty ? 'Save your changes first' : 'Fill in what isn\'t translated yet, into the draft'}
                                onClick={() => router.post(adminUrl(`cms/entries/${machineTranslate}/translate`), { version: entry.version }, { preserveScroll: true })}>
                                <Languages /> Translate from {locales.find((l) => l.main)?.name ?? (mainLocale ? localeName(mainLocale) : 'the main language')}
                            </Button>
                        )}
                        {writable && (
                            <Button type="submit" variant={entry ? 'outline' : 'default'} disabled={form.processing}>
                                {form.processing && <LoaderCircle className="cms:animate-spin" />}
                                {entry ? 'Save draft' : 'Create draft'}
                            </Button>
                        )}
                        {entry && !entry.trashed && writable && !can.publish && (entry.status === 'draft' || entry.hasUnpublishedChanges || form.isDirty) && (
                            <Button type="button" disabled={form.processing} onClick={requestReview}
                                title={entry.review ? 'Already sent; sending again tells them again' : 'Ask those who can publish to review it'}>
                                <Send /> {entry.review ? 'Send for review again' : 'Submit for review'}
                            </Button>
                        )}
                        {entry && !entry.trashed && can.publish && !lock.readOnly && (
                            <div className="cms:flex">
                                <Button type="button" variant={upToDate ? 'outline' : 'default'} className="cms:rounded-r-none cms:disabled:opacity-100" disabled={form.processing || upToDate} onClick={() => publish()}>
                                    {upToDate && <Check className="cms:text-emerald-600 cms:dark:text-emerald-400" />}
                                    {entry.status === 'draft' ? 'Publish' : upToDate ? 'Published' : 'Publish changes'}
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button type="button" size="icon" variant={upToDate ? 'outline' : 'default'} className={upToDate ? 'cms:-ml-px cms:rounded-l-none' : 'cms:rounded-l-none cms:border-l cms:border-primary-foreground/20'} aria-label="More publishing options"><ChevronDown /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onSelect={() => setScheduling(true)}><CalendarClock /> Publish on a date…</DropdownMenuItem>
                                        {entry.status !== 'draft' && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onSelect={() => router.post(`${url}/unpublish`, locale, { preserveScroll: true })}>Unpublish</DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )}
                    </>
                }
            >
                {entry && <Badge variant={entry.status === 'published' ? 'success' : 'secondary'}>{entry.trashed ? 'In the trash' : statusLabel(entry.status)}</Badge>}
                {entry?.review && !entry.trashed && (
                    <Badge variant="warning" title={`${entry.review.by ? `${entry.review.by} sent it` : 'Sent'} on ${formatDate(entry.review.requestedAt)}`}>Waiting for review</Badge>
                )}
                {form.isDirty && <span className="cms:text-sm cms:text-muted-foreground">Unsaved changes</span>}
            </PageHeader>

            {entry && locales.length > 1 && (
                <LanguageBar entryUrl={url} current={entry.locale} locales={locales} canAdd={can.create && !entry.trashed}
                    canRemove={can.delete && !entry.isMain && !entry.trashed}
                    onRemove={() => confirm(`Remove the ${localeName(entry.locale)} translation of "${values.title}"? Its revisions go with it.`,
                        () => router.delete(`${url}/translations/${entry.locale}`))} />
            )}

            <ViewingNotice by={lock.viewingBy} onTakeOver={lock.requestTakeOver} />
            <KeptEditsNotice kept={lock.kept} disabled={!writable} onLoad={(id: number) => void loadKept(id)} onDiscard={(id: number) => void lock.discardKept(id)} />
            {errors.version && (
                <div role="alert" className="cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive">
                    <span>{errors.version}</span>
                    <span className="cms:flex cms:gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => router.reload()}>Load theirs</Button>
                        <Button type="button" variant="destructive" size="sm" disabled={form.processing}
                            onClick={() => confirm('Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions).', saveMine)}>
                            Save mine anyway
                        </Button>
                    </span>
                </div>
            )}
            {(errors.entry || errors.published_at) && <p role="alert" className="cms:text-sm cms:text-destructive">{errors.entry ?? errors.published_at}</p>}

            <div className="cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div className="cms:flex cms:min-w-0 cms:flex-col cms:gap-6">
                    <Card>
                        <CardContent>
                            <fieldset disabled={!writable} className="cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]">
                                <div className="cms:flex cms:flex-col cms:gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" value={form.data.title} aria-invalid={errors.title !== undefined}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { form.setData('title', e.target.value); clearErrorsAt('title'); }} />
                                    <FieldError message={errors.title} />
                                </div>
                                <div className="cms:flex cms:flex-col cms:gap-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" className="cms:font-mono" value={form.data.slug} placeholder="Made from the title" aria-invalid={errors.slug !== undefined}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { form.setData('slug', e.target.value); clearErrorsAt('slug'); }} />
                                    <FieldError message={errors.slug} />
                                </div>
                            </fieldset>
                        </CardContent>
                    </Card>

                    <TermLabels.Provider value={Array.isArray(termLabels) || !termLabels ? {} : termLabels}>
                        <FieldSections disabled={!writable} fields={fields} values={form.data.data} errors={errors} storageKey={`cms:entry:${collection.handle}`}
                            shared={shared} sharedValues={sharedValues}
                            sharedNote={`Shared by all languages: edit it in ${mainLocale ? localeName(mainLocale) : 'the main language'}.`}
                            onChange={(handle, value) => { form.setData('data', { ...form.data.data, [handle]: value }); clearErrorsAt(`data.${handle}`); }} />
                    </TermLabels.Provider>

                    <CollapsibleCard title="Search and sharing" titleClassName="cms:text-base" storageKey="cms:entry:seo" hasErrors={hasErrors(errors, 'seo')}>
                        <fieldset disabled={!writable} className="cms:min-w-0">
                            <Fields bare id="seo" fields={SEO_FIELDS} value={form.data.seo} errors={errorsAt(errors, 'seo')}
                                onChange={(seo) => { form.setData('seo', seo); clearErrorsAt('seo'); }} />
                        </fieldset>
                    </CollapsibleCard>
                </div>

                {entry && (
                    <aside className="cms:flex cms:flex-col cms:gap-4">
                        <CollapsibleCard title="Status" titleClassName="cms:text-base" storageKey="cms:entry:status" contentClassName="cms:flex cms:flex-col cms:gap-1 cms:text-sm">
                            <p>{statusLabel(entry.status)}{entry.status !== 'draft' && entry.publishedAt ? ` · ${formatDate(entry.publishedAt)}` : ''}</p>
                            {entry.review && (
                                <p className="cms:text-muted-foreground">
                                    Sent for review{entry.review.by ? ` by ${entry.review.by}` : ''} · {formatDate(entry.review.requestedAt)}.{can.publish ? ' Publishing it answers the request.' : ''}
                                </p>
                            )}
                            {entry.status !== 'draft' && entry.hasUnpublishedChanges && <p className="cms:text-muted-foreground">The draft has changes the site doesn't show yet.</p>}
                            {locales.find((l) => l.code === entry.locale)?.outdated && (
                                <p className="cms:text-amber-700 cms:dark:text-amber-400">The {mainLocale ? localeName(mainLocale) : 'main'} version changed since this translation was last saved.</p>
                            )}
                        </CollapsibleCard>
                        <CollapsibleCard title="Used by" titleClassName="cms:text-base" storageKey="cms:entry:used-by" contentClassName="cms:flex cms:flex-col cms:gap-1 cms:text-sm">
                            {usedBy.length === 0 && <p className="cms:text-muted-foreground">No other content links here.</p>}
                            {usedBy.map((use) => (
                                <div key={`${use.label}:${use.field}`} className="cms:min-w-0">
                                    {use.url ? <a href={use.url} className="cms:block cms:truncate cms:underline-offset-4 cms:hover:underline">{use.label}</a> : <span className="cms:block cms:truncate">{use.label}</span>}
                                    <span className="cms:text-xs cms:text-muted-foreground" title={use.field}>{use.fieldLabel ?? use.field}</span>
                                </div>
                            ))}
                        </CollapsibleCard>
                        {settings && <PageSettings entryUrl={url} collection={collection} settings={settings} blueprints={blueprints} disabled={!writable} />}
                        {comments !== null && collection.comments && <EntryComments entryId={entry.id} comments={comments} />}
                        <CollapsibleCard title="Revisions" titleClassName="cms:text-base" storageKey="cms:entry:revisions" contentClassName="cms:flex cms:flex-col cms:gap-2 cms:text-sm">
                            {undoRestore !== null && can.update && (
                                <Button type="button" variant="outline" size="sm" onClick={() => router.post(adminUrl(`cms/entry-translations/${undoRestore}/undo-restore`), {}, { preserveScroll: true })}>
                                    <Undo2 /> Undo the restore
                                </Button>
                            )}
                            <Deferred data="revisions" fallback={<div className="cms:flex cms:flex-col cms:gap-2"><Skeleton className="cms:h-8" /><Skeleton className="cms:h-8" /></div>}>
                                <>
                                    {(revisions ?? []).length === 0 && <p className="cms:text-muted-foreground">Each publish keeps one.</p>}
                                    {(revisions ?? []).map((revision) => (
                                        <div key={revision.id} className="cms:flex cms:items-center cms:justify-between cms:gap-2">
                                            <div className="cms:min-w-0">
                                                <div className="cms:truncate">{revision.title}</div>
                                                <div className="cms:text-xs cms:text-muted-foreground">{formatDate(revision.createdAt)}</div>
                                            </div>
                                            {can.update && !entry.trashed && (
                                                <Button type="button" variant="ghost" size="sm"
                                                    onClick={() => router.post(adminUrl(`cms/revisions/${revision.id}/restore`), {}, { preserveScroll: true })}>
                                                    Restore
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </>
                            </Deferred>
                        </CollapsibleCard>
                    </aside>
                )}
            </div>

            <ScheduleDialog open={scheduling} onClose={() => setScheduling(false)} processing={form.processing}
                current={entry?.publishedAt ?? null} onSchedule={(iso) => publish(iso)} />
        </form>
    );
}

function LanguageBar({ entryUrl, current, locales, canAdd, canRemove, onRemove }: {
    entryUrl: string; current: string; locales: EntryLocale[]; canAdd: boolean; canRemove: boolean; onRemove: () => void;
}) {
    return (
        <nav aria-label="Languages" className="cms:flex cms:flex-wrap cms:items-center cms:gap-2">
            {locales.map((l) => {
                const name = `${l.name ?? localeName(l.code)}${l.main ? ' (main)' : ''}`;
                if (l.status === null) {
                    return canAdd ? (
                        <Button key={l.code} type="button" variant="outline" size="sm" className="cms:border-dashed"
                            onClick={() => router.post(`${entryUrl}/translations`, { locale: l.code })}>
                            <Plus /> {name}
                        </Button>
                    ) : null;
                }
                return (
                    <Button key={l.code} type="button" size="sm" variant={l.code === current ? 'secondary' : 'ghost'} aria-current={l.code === current ? 'page' : undefined}
                        onClick={() => l.code !== current && router.get(`${entryUrl}/edit`, { locale: l.code })}>
                        {name}
                        <Badge variant={l.status === 'published' ? 'success' : 'outline'} className="cms:ml-1">{statusLabel(l.status)}</Badge>
                        {l.outdated && (
                            <Badge variant="outline" className="cms:border-amber-500/60 cms:text-amber-700 cms:dark:text-amber-400"
                                title="The main language changed since this translation was last saved.">Outdated</Badge>
                        )}
                    </Button>
                );
            })}
            {canRemove && (
                <Button type="button" variant="ghost" size="sm" className="cms:ml-auto cms:text-destructive" onClick={onRemove}>Remove this language</Button>
            )}
        </nav>
    );
}

function ScheduleDialog({ open, onClose, onSchedule, current, processing }: {
    open: boolean; onClose: () => void; onSchedule: (iso: string) => void; current: string | null; processing: boolean;
}) {
    const [value, setValue] = React.useState('');
    React.useEffect(() => {
        if (open) setValue(localInputValue(current ? new Date(current) : new Date(Date.now() + 86_400_000)));
    }, [open, current]);

    return (
        <Dialog open={open} onOpenChange={(next: boolean) => !next && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Publish on a date</DialogTitle>
                    <DialogDescription>The entry goes live then; a date in the past publishes it now with that date.</DialogDescription>
                </DialogHeader>
                <div className="cms:flex cms:flex-col cms:gap-2">
                    <Label htmlFor="published-at">Date and time</Label>
                    <DatePicker id="published-at" withTime required className="cms:max-w-none" value={value || null} onChange={(next) => setValue(next ?? '')} />
                    <p className="cms:text-sm cms:text-muted-foreground">In your time zone.</p>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="button" disabled={value === '' || processing} onClick={() => onSchedule(new Date(value).toISOString())}>Publish</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

/** The parent entry, the entry's own template, blueprint and comments, saved apart from the fields (every language's). */
function PageSettings({ entryUrl, collection, settings, blueprints, disabled }: {
    entryUrl: string;
    collection: Props['collection'];
    settings: NonNullable<Props['settings']>;
    blueprints: NonNullable<Props['blueprints']>;
    disabled: boolean;
}) {
    const savedBlueprint = blueprints.length > 1 ? (settings.blueprint ?? blueprints[0]!.handle) : undefined;
    const form = useForm({
        parent_id: settings.parentId, template: settings.template ?? '', comments_closed: settings.commentsClosed === true,
        ...(savedBlueprint !== undefined ? { blueprint: savedBlueprint } : {}),
    });
    const errors = form.errors as Record<string, string | undefined>;

    return (
        <CollapsibleCard title="Page settings" titleClassName="cms:text-base" storageKey="cms:entry:page-settings" hasErrors={Object.keys(errors).length > 0}>
            <fieldset disabled={disabled} className="cms:flex cms:flex-col cms:gap-4 cms:text-sm">
                {collection.hierarchical && (
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor="parent">Parent</Label>
                        <EntriesPicker id="parent" multiple={false} max={1} collections={[collection.handle]} invalid={errors.parent_id !== undefined}
                            value={form.data.parent_id} onChange={(value) => form.setData('parent_id', typeof value === 'number' ? value : null)} />
                        <FieldError message={errors.parent_id} />
                    </div>
                )}
                {blueprints.length > 1 && (
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor="blueprint">Blueprint</Label>
                        <Select value={form.data.blueprint} onValueChange={(handle: string) => form.setData('blueprint', handle)}>
                            <SelectTrigger id="blueprint" aria-invalid={errors.blueprint !== undefined}><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {blueprints.map((blueprint) => <SelectItem key={blueprint.handle} value={blueprint.handle}>{blueprint.title}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        {form.data.blueprint !== savedBlueprint && (
                            <p className="cms:text-muted-foreground">The fields change in every language; values of fields both blueprints have are kept. Save your draft first: the editor reloads.</p>
                        )}
                        <FieldError message={errors.blueprint} />
                    </div>
                )}
                <div className="cms:flex cms:flex-col cms:gap-2">
                    <Label htmlFor="template">Template</Label>
                    <Input id="template" className="cms:font-mono" placeholder="The collection's" value={form.data.template}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('template', e.target.value)} aria-invalid={errors.template !== undefined} />
                    <FieldError message={errors.template} />
                </div>
                {collection.comments && (
                    <div className="cms:flex cms:items-center cms:gap-3">
                        <Switch id="comments-open" checked={!form.data.comments_closed} onCheckedChange={(open: boolean) => form.setData('comments_closed', !open)} />
                        <Label htmlFor="comments-open">Accept new comments</Label>
                        <a href={adminUrl(`cms/comments?entry=${entryUrl.split('/').slice(-1)[0]}`)} className="cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline">Comments</a>
                    </div>
                )}
                {form.isDirty && (
                    <Button type="button" size="sm" disabled={form.processing}
                        // A new blueprint means new fields and versions: the editor starts afresh.
                        onClick={() => form.put(`${entryUrl}/settings`, { preserveScroll: true, preserveState: form.data.blueprint === savedBlueprint, onSuccess: () => form.setDefaults() })}>Save settings</Button>
                )}
            </fieldset>
        </CollapsibleCard>
    );
}
