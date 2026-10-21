import * as React from 'react';
import { Deferred, Head, router, useForm, usePage } from '@inertiajs/react';
import { CalendarClock, Check, ChevronDown, Copy, ExternalLink, Eye, Languages, LoaderCircle, MoreHorizontal, Plus, RotateCcw, Send, Trash2, Undo2 } from 'lucide-react';
import { adminUrl, t } from '@sunrice/admin-sdk';
import {
    Badge, Button, Card, CardContent, CollapsibleCard, DatePicker, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Input, KeptEditsNotice, Label, PageHeader,
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Skeleton, Switch, Textarea, useBreadcrumbs, useEditLock, useUnsavedChanges, ViewingNotice,
} from '@sunrice/admin-sdk/ui';
import { useConfirm } from '@/components/Confirm.tsx';
import { TemplateHelp, type TemplateLookup } from '@/components/TemplateHelp.tsx';
import { EntriesPicker } from '@/components/EntriesPicker.tsx';
import { EntryComments, type EntryCommentsSummary } from '@/components/EntryComments.tsx';
import { FieldSections } from '@/components/FieldSections.tsx';
import { SlugNote } from '@/components/SlugNote.tsx';
import { TermLabels } from '@/components/TermsPicker.tsx';
import { seoFields } from '@/lib/seo.ts';
import { FieldError, Fields } from '@/components/FieldInput.tsx';
import { errorKeysAt, errorsAt, hasErrors } from '@/lib/builder.ts';
import { type EntryLocale, type EntryStatus, followingSlug, formatDate, localeName, localInputValue, scheduleStart, slugNote, statusLabel } from '@/lib/entries.ts';
import type { FieldDefinition } from '@/types.ts';

interface Props {
    collection: { handle: string; title: string; dated: boolean; hierarchical?: boolean; ordered?: boolean; comments?: boolean; pages?: boolean };
    /** Every language's: the parent entry and the entry's own Blade view. */
    settings?: { parentId: number | null; template: string | null; commentsClosed?: boolean; blueprint?: string | null };
    /** Whether it's the site's homepage, whether the user may make it so (cms.homepage, in a collection whose entries can be), and the current homepage's title. */
    homepage?: { is: boolean; can: boolean; current?: string | null };
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
        review?: { requestedAt: string; by: string | null; mine?: boolean } | null;
        version: number;
        /** The live page, when published and the collection has a URL. */
        url: string | null;
        /** A signed link showing the saved draft, for a while. */
        previewUrl: string;
        /** The slug in the address visitors have known (null: never published, no address of its own, or the homepage). */
        publishedSlug?: string | null;
    } | null;
    /** Where to add a redirect by hand, for those who may. */
    redirectsUrl?: string | null;
    /** The views tried for its page, in order, and which exist. */
    templates?: TemplateLookup | null;
    values: { title: string; slug: string; data: FieldValues; seo: FieldValues | null };
    /** Deferred: loaded after the page shows. */
    revisions?: Revision[];
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
    /** Another language, without machine translation set up: the button shows, off, saying what it needs. */
    machineTranslateMissing?: boolean;
    /** translate: may add a language to the entry (create, or translators' right to edit other languages). */
    can: { create: boolean; update: boolean; publish: boolean; delete: boolean; translate?: boolean };
}

/**
 * Field values are any JSON. Inertia's form types recurse into the data's
 * shape and stop only at `any`, so that's what the values are typed as.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldValues = Record<string, any>;
type UsedBy = { label: string; url: string | null; field: string; fieldLabel?: string };
/** A published version: who published it and what it changed from the one before (null: the first, or older ones were pruned). */
type Revision = { id: number; title: string; createdAt: string | null; author: string | null; changed: string[] | null };

/** " It's used by A; B." for confirmations, or nothing. */
function usedBySentence(usedBy: UsedBy[]): string {
    if (usedBy.length === 0) return '';
    const shown = usedBy.slice(0, 5).map((use) => use.label).join('; ');
    return ` ${usedBy.length > 5
        ? t('It\'s used by :list and :count more: those links will show nothing.', { list: shown, count: usedBy.length - 5 })
        : t('It\'s used by :list: those links will show nothing.', { list: shown })}`;
}
/** With the page settings (every language's), saved with the draft. */
type FormData = {
    locale: string | null; title: string; slug: string; data: FieldValues; seo: FieldValues; version: number | null; publish: boolean; published_at: string | null;
    parent_id: number | null; template: string; comments_closed: boolean;
};
type SettingsValues = Pick<FormData, 'parent_id' | 'template' | 'comments_closed'>;


/**
 * A fresh form for each version the server sends (after creating, saving,
 * publishing…): Inertia keeps the page component between visits, and the
 * form would keep the old values.
 */
export default function EntryEditorPage(props: Props) {
    const { entry } = props;

    return <EntryEditor key={entry ? `${entry.id}:${entry.locale}:${entry.version}:${entry.status}:${entry.trashed}:${entry.publishedAt}` : 'new'} {...props} />;
}

function EntryEditor({ collection, fields, locales = [], shared = [], sharedValues = {}, entry, values, revisions, comments, termLabels, usedBy = [], undoRestore = null, machineTranslate = null, machineTranslateMissing = false, settings, blueprints = [], homepage, redirectsUrl = null, templates = null, can }: Props) {
    const list = adminUrl(`cms/collections/${collection.handle}/entries`);
    const url = entry ? adminUrl(`cms/entries/${entry.id}`) : list;
    const heading = entry ? values.title : t('New entry');
    useBreadcrumbs([{ label: collection.title, href: list }, { label: heading }]);
    const [confirm, confirmDialog] = useConfirm();
    const [scheduling, setScheduling] = React.useState(false);
    const [comparing, setComparing] = React.useState<Revision | null>(null);
    const [sendingBack, setSendingBack] = React.useState(false);

    const form = useForm<FormData>({
        ...values, seo: values.seo ?? {}, locale: entry?.locale ?? null, version: entry?.version ?? null, publish: false, published_at: null,
        parent_id: settings?.parentId ?? null, template: settings?.template ?? '', comments_closed: settings?.commentsClosed === true,
    });
    const setSettings = (patch: Partial<SettingsValues>) => form.setData((data) => ({ ...data, ...patch }));
    const locale = entry ? { locale: entry.locale } : {};
    const mainLocale = locales.find((l) => l.main)?.code;

    const errors = form.errors as Record<string, string | undefined>;
    // From the sidebar's own requests (the date, the homepage).
    const pageErrors = (usePage().props.errors ?? {}) as Record<string, string | undefined>;
    // An edited value loses its error: the server's message was about what was there before.
    const clearErrorsAt = (path: string) => {
        const keys = errorKeysAt(errors, path);
        if (keys.length > 0) form.clearErrors(...(keys as never[]));
    };
    // Nothing new to publish: the live version is the draft, and the form has no changes.
    const upToDate = entry !== null && entry.status !== 'draft' && !entry.hasUnpublishedChanges && !form.isDirty;
    const editable = entry === null ? can.create : can.update && !entry.trashed;
    const scheduled = entry?.status === 'scheduled';

    // Page settings are every language's: left out for those who may not change them (translators).
    const payload = (data: FormData) => {
        if (settings || entry === null) return data;
        const { parent_id: _parent, template: _template, comments_closed: _comments, ...rest } = data;
        return rest;
    };
    const save = (publish = false, publishedAt: string | null = null) => {
        form.transform((data) => ({ ...payload(data), publish, published_at: publishedAt }));
        if (entry) {
            form.put(url, { preserveScroll: true, onSuccess: () => setScheduling(false) });
        } else {
            form.post(url);
        }
    };
    // After "someone else saved": save over their version anyway.
    const saveMine = () => {
        form.transform((data) => ({ ...payload(data), version: null, publish: false, published_at: null }));
        form.put(url, { preserveScroll: true });
    };
    const lock = useEditLock({
        type: 'cms.entry', id: entry?.id, locale: entry?.locale, enabled: entry !== null && editable, noun: t('entry'), leaveTo: list,
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
                back={{ href: list, label: t('Back to :title', { title: collection.title }) }}
                actions={
                    <>
                        {entry && !entry.trashed && collection.pages !== false && (
                            <Button type="button" variant="ghost" asChild>
                                <a href={entry.previewUrl} target="_blank" rel="noopener noreferrer"
                                    title={form.isDirty ? t('Shows the saved draft: save first to see your changes.') : t('Shows the saved draft.')}>
                                    <Eye /> {t('Preview')}
                                </a>
                            </Button>
                        )}
                        {entry?.url && (
                            <Button type="button" variant="ghost" asChild>
                                <a href={entry.url} target="_blank" rel="noopener noreferrer"><ExternalLink /> {t('View page')}</a>
                            </Button>
                        )}
                        {entry?.trashed && can.delete && (
                            <Button type="button" variant="outline" onClick={() => router.post(`${url}/restore`, {}, { preserveScroll: true })}>
                                <RotateCcw /> {t('Restore')}
                            </Button>
                        )}
                        {entry?.trashed && can.delete && (
                            <Button type="button" variant="outline" className="cms:text-destructive"
                                onClick={() => confirm(t('Permanently delete ":title" in every language, with its revisions? This can\'t be undone.', { title: values.title }) + usedBySentence(usedBy),
                                    () => router.delete(`${url}/force`, { data: usedBy.length > 0 ? { force: 1 } : {} }))}>
                                <Trash2 /> {t('Permanently delete')}
                            </Button>
                        )}
                        {entry && !entry.trashed && (can.create || (can.delete && !lock.readOnly) || (writable && machineTranslate !== null)) && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button type="button" variant="outline" size="icon" aria-label={t('More actions')}><MoreHorizontal /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="cms:min-w-52">
                                    {writable && machineTranslate !== null && (
                                        <DropdownMenuItem disabled={form.processing || form.isDirty} title={form.isDirty ? undefined : t('Fill in what isn\'t translated yet, into the draft')}
                                            onSelect={() => router.post(adminUrl(`cms/entries/${entry.id}/translations/${entry.locale}/translate`), { version: entry.version }, { preserveScroll: true })}>
                                            <Languages /> {form.isDirty ? t('Save to translate') : t('Translate from :language', { language: locales.find((l) => l.main)?.name ?? (mainLocale ? localeName(mainLocale) : t('the main language')) })}
                                        </DropdownMenuItem>
                                    )}
                                    {can.create && <DropdownMenuItem title={t('Copy every language as a new draft')} onSelect={() => router.post(`${url}/duplicate`)}><Copy /> {t('Duplicate')}</DropdownMenuItem>}
                                    {can.delete && !lock.readOnly && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cms:text-destructive"
                                                onSelect={() => confirm(t('Move ":title" to the trash? It comes off the site; you can restore it.', { title: values.title }) + usedBySentence(usedBy), () => router.delete(url), t('Move to trash'))}>
                                                <Trash2 /> {t('Move to trash')}
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                        {entry && writable && machineTranslateMissing && (
                            <span title={t('Machine translation isn\'t set up on this site: ask your developer (SUNRICE_TRANSLATE_DRIVER, see Help → Developer docs → Machine translation).')}>
                                <Button type="button" variant="outline" disabled aria-describedby="machine-translate-missing">
                                    <Languages /> {t('Translate from :language', { language: locales.find((l) => l.main)?.name ?? (mainLocale ? localeName(mainLocale) : t('the main language')) })}
                                </Button>
                                <span id="machine-translate-missing" className="cms:sr-only">{t('Machine translation isn\'t set up on this site: ask your developer.')}</span>
                            </span>
                        )}
                        {writable && (
                            <Button type="submit" variant={entry ? 'outline' : 'default'} disabled={form.processing}>
                                {form.processing && <LoaderCircle className="cms:animate-spin" />}
                                {entry ? t('Save draft') : t('Create draft')}
                            </Button>
                        )}
                        {entry && !entry.trashed && writable && !can.publish && (entry.status === 'draft' || entry.hasUnpublishedChanges || form.isDirty) && (
                            <Button type="button" disabled={form.processing} onClick={requestReview}
                                title={entry.review ? t('Already sent; sending again tells them again') : t('Ask those who can publish to review it')}>
                                <Send /> {entry.review ? t('Send for review again') : t('Submit for review')}
                            </Button>
                        )}
                        {entry && !entry.trashed && can.publish && !lock.readOnly && (
                            <div className="cms:flex">
                                {scheduled && upToDate ? (
                                    <Button type="button" variant="outline" className="cms:rounded-r-none" disabled={form.processing} title={t('Change the date')} onClick={() => setScheduling(true)}>
                                        <CalendarClock /> {t('Scheduled for :date', { date: formatDate(entry.publishedAt) })}
                                    </Button>
                                ) : (
                                    <Button type="button" variant={upToDate ? 'outline' : 'default'} className="cms:rounded-r-none cms:disabled:opacity-100" disabled={form.processing || upToDate} onClick={() => publish()}>
                                        {upToDate && <Check className="cms:text-emerald-600 cms:dark:text-emerald-400" />}
                                        {entry.status === 'draft' ? t('Publish') : upToDate ? t('Published') : t('Publish changes')}
                                    </Button>
                                )}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button type="button" size="icon" variant={upToDate ? 'outline' : 'default'} className={upToDate ? 'cms:-ml-px cms:rounded-l-none' : 'cms:rounded-l-none cms:border-l cms:border-primary-foreground/20'} aria-label={t('More publishing options')}><ChevronDown /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onSelect={() => setScheduling(true)}><CalendarClock /> {scheduled ? t('Change the date…') : t('Publish on a date…')}</DropdownMenuItem>
                                        {scheduled && <DropdownMenuItem onSelect={() => publish(new Date().toISOString())}>{t('Publish now')}</DropdownMenuItem>}
                                        {entry.status !== 'draft' && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onSelect={() => router.post(`${url}/unpublish`, locale, { preserveScroll: true })}>
                                                    {scheduled ? t('Unschedule (back to draft)') : t('Unpublish')}
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )}
                    </>
                }
            >
                {entry && <Badge variant={entry.status === 'published' ? 'success' : 'secondary'}>{entry.trashed ? t('In the trash') : statusLabel(entry.status)}</Badge>}
                {entry?.review && !entry.trashed && (
                    <Badge variant="warning" title={entry.review.by ? t(':name sent it on :date', { name: entry.review.by, date: formatDate(entry.review.requestedAt) }) : t('Sent on :date', { date: formatDate(entry.review.requestedAt) })}>{t('Waiting for review')}</Badge>
                )}
                {form.isDirty && <span className="cms:text-sm cms:text-muted-foreground">{t('Unsaved changes')}</span>}
            </PageHeader>

            {entry && locales.length > 1 && (
                <LanguageBar entryUrl={url} editUrl={`${list}/${entry.id}/edit`} current={entry.locale} locales={locales} canAdd={(can.create || can.translate === true) && !entry.trashed}
                    canRemove={can.delete && !entry.isMain && !entry.trashed}
                    onRemove={() => confirm(t('Remove the :language translation of ":title"? Its revisions go with it.', { language: localeName(entry.locale), title: values.title }),
                        () => router.delete(`${url}/translations/${entry.locale}`))} />
            )}

            <ViewingNotice by={lock.viewingBy} onTakeOver={lock.requestTakeOver} />
            <KeptEditsNotice kept={lock.kept} disabled={!writable} onLoad={(id: number) => void loadKept(id)} onDiscard={(id: number) => void lock.discardKept(id)} />
            {errors.version && (
                <div role="alert" className="cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive">
                    <span>{errors.version}</span>
                    <span className="cms:flex cms:gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => router.reload()}>{t('Load theirs')}</Button>
                        <Button type="button" variant="destructive" size="sm" disabled={form.processing}
                            onClick={() => confirm(t('Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions).'), saveMine)}>
                            {t('Save mine anyway')}
                        </Button>
                    </span>
                </div>
            )}
            {(errors.entry || errors.published_at || pageErrors.published_at || pageErrors.homepage) && (
                <p role="alert" className="cms:text-sm cms:text-destructive">{errors.entry ?? errors.published_at ?? pageErrors.published_at ?? pageErrors.homepage}</p>
            )}

            <div className="cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div className="cms:flex cms:min-w-0 cms:flex-col cms:gap-6">
                    <Card>
                        <CardContent>
                            <fieldset disabled={!writable} className="cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]">
                                <div className="cms:flex cms:flex-col cms:gap-2">
                                    <Label htmlFor="title">{t('Title')}</Label>
                                    <Input id="title" value={form.data.title} aria-invalid={errors.title !== undefined}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const title = e.target.value;
                                            // A slug made from the title (a duplicate's "-copy") follows it until first published.
                                            form.setData((data) => ({ ...data, title, slug: followingSlug(data.slug, data.title, title, entry !== null && entry.publishedAt === null && entry.status === 'draft') }));
                                            clearErrorsAt('title');
                                        }} />
                                    <FieldError message={errors.title} />
                                </div>
                                <div className="cms:flex cms:flex-col cms:gap-2">
                                    <Label htmlFor="slug">{t('Slug')}</Label>
                                    <Input id="slug" className="cms:font-mono" value={form.data.slug} placeholder={t('Made from the title')} aria-invalid={errors.slug !== undefined}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { form.setData('slug', e.target.value); clearErrorsAt('slug'); }} />
                                    {/* Publishing redirects from the old address while the entry is published (live or scheduled). */}
                                    <SlugNote note={slugNote(entry?.publishedSlug, form.data.slug, entry !== null && entry.status !== 'draft')} redirectsUrl={redirectsUrl} />
                                    <FieldError message={errors.slug} />
                                </div>
                            </fieldset>
                        </CardContent>
                    </Card>

                    <TermLabels.Provider value={Array.isArray(termLabels) || !termLabels ? {} : termLabels}>
                        <FieldSections disabled={!writable} fields={fields} values={form.data.data} errors={errors} storageKey={`cms:entry:${collection.handle}`}
                            shared={shared} sharedValues={sharedValues}
                            sharedNote={mainLocale ? t('Shared by all languages: the greyed-out fields are edited in :language.', { language: localeName(mainLocale) }) : t('Shared by all languages: the greyed-out fields are edited in the main language.')}
                            onChange={(handle, value) => { form.setData('data', { ...form.data.data, [handle]: value }); clearErrorsAt(`data.${handle}`); }} />
                    </TermLabels.Provider>

                    <CollapsibleCard title={t('SEO')} description={t('How this entry appears in search results and shared links.')} titleClassName="cms:text-base" storageKey="cms:entry:seo" hasErrors={hasErrors(errors, 'seo')}>
                        <fieldset disabled={!writable} className="cms:min-w-0">
                            <Fields bare id="seo" fields={seoFields()} value={form.data.seo} errors={errorsAt(errors, 'seo')}
                                onChange={(seo) => { form.setData('seo', seo); clearErrorsAt('seo'); }} />
                        </fieldset>
                    </CollapsibleCard>
                </div>

                {!entry && collection.hierarchical && (
                    <aside className="cms:flex cms:flex-col cms:gap-4">
                        <CollapsibleCard title="Page settings" titleClassName="cms:text-base" storageKey="cms:entry:page-settings" hasErrors={errors.parent_id !== undefined}>
                            <fieldset disabled={!writable} className="cms:flex cms:flex-col cms:gap-4 cms:text-sm">
                                <ParentField collection={collection} value={form.data.parent_id} error={errors.parent_id} onChange={(parent_id) => setSettings({ parent_id })} />
                            </fieldset>
                        </CollapsibleCard>
                    </aside>
                )}
                {entry && (
                    <aside className="cms:flex cms:flex-col cms:gap-4">
                        <CollapsibleCard title={t('Status')} titleClassName="cms:text-base" storageKey="cms:entry:status" contentClassName="cms:flex cms:flex-col cms:gap-3 cms:text-sm">
                            <dl className="cms:flex cms:flex-col cms:gap-2">
                                <div className="cms:flex cms:items-center cms:justify-between cms:gap-3">
                                    <dt className="cms:text-muted-foreground">{t('Status')}</dt>
                                    <dd><Badge variant={entry.status === 'published' ? 'success' : 'secondary'}>{entry.trashed ? t('In the trash') : statusLabel(entry.status)}</Badge></dd>
                                </div>
                                {entry.status !== 'draft' && entry.publishedAt && (
                                    <div className="cms:flex cms:items-baseline cms:justify-between cms:gap-3">
                                        <dt className="cms:text-muted-foreground">{entry.status === 'scheduled' ? t('Scheduled for') : t('Published')}</dt>
                                        <dd className="cms:text-right cms:tabular-nums">{formatDate(entry.publishedAt)}</dd>
                                    </div>
                                )}
                            </dl>
                            {entry.review && (
                                <p className="cms:text-muted-foreground">
                                    {entry.review.by ? t('Sent for review by :name · :date.', { name: entry.review.by, date: formatDate(entry.review.requestedAt) }) : t('Sent for review · :date.', { date: formatDate(entry.review.requestedAt) })}
                                    {can.publish ? ` ${t('Publishing it answers the request.')}` : ''}
                                </p>
                            )}
                            {entry.review && !entry.trashed && (entry.review.mine || (can.publish && !lock.readOnly)) && (
                                <div className="cms:flex cms:flex-wrap cms:gap-2">
                                    {can.publish && !lock.readOnly && (
                                        <Button type="button" variant="outline" size="sm" disabled={form.processing} onClick={() => setSendingBack(true)}>
                                            <Undo2 /> {t('Send back…')}
                                        </Button>
                                    )}
                                    {entry.review.mine && (
                                        <Button type="button" variant="outline" size="sm" disabled={form.processing}
                                            title={t('Take the request back, to keep working on it')}
                                            onClick={() => router.post(`${url}/review/withdraw`, locale, { preserveScroll: true })}>
                                            {t('Withdraw the request')}
                                        </Button>
                                    )}
                                </div>
                            )}
                            {!entry.trashed && can.publish && !lock.readOnly && (
                                <PublishDate key={entry.publishedAt ?? 'none'} status={entry.status} publishedAt={entry.publishedAt} processing={form.processing}
                                    onPublish={(iso) => publish(iso)} onUnpublish={() => router.post(`${url}/unpublish`, locale, { preserveScroll: true })} />
                            )}
                            {entry.status !== 'draft' && entry.hasUnpublishedChanges && <p className="cms:text-muted-foreground">{t('The draft has changes the site doesn\'t show yet.')}</p>}
                            {homepage?.is && <p className="cms:text-muted-foreground">{t('This is the site\'s homepage.')}</p>}
                            {homepage && !homepage.is && homepage.can && entry.status === 'published' && !entry.trashed && (
                                <Button type="button" variant="outline" size="sm" className="cms:mt-1 cms:self-start"
                                    onClick={() => confirm(
                                        (homepage.current
                                            ? t('Make ":title" the homepage? Visitors to / will see it instead of ":current".', { title: values.title, current: homepage.current })
                                            : t('Make ":title" the homepage? Visitors to / will see it.', { title: values.title }))
                                        + ' ' + t('Its own address will lead to / as well.'),
                                        () => router.post(`${url}/homepage`, {}, { preserveScroll: true }), t('Make this the homepage'))}>
                                    {t('Make this the homepage')}
                                </Button>
                            )}
                            {locales.find((l) => l.code === entry.locale)?.outdated && (
                                <p className="cms:text-amber-700 cms:dark:text-amber-400">{mainLocale ? t('The :language version changed since this translation was last saved.', { language: localeName(mainLocale) }) : t('The main version changed since this translation was last saved.')}</p>
                            )}
                        </CollapsibleCard>
                        <CollapsibleCard title={t('Used by')} titleClassName="cms:text-base" storageKey="cms:entry:used-by" contentClassName="cms:flex cms:flex-col cms:gap-1 cms:text-sm">
                            {usedBy.length === 0 && <p className="cms:text-muted-foreground">{t('No other content links here.')}</p>}
                            {usedBy.map((use) => (
                                <div key={`${use.label}:${use.field}`} className="cms:min-w-0">
                                    {use.url ? <a href={use.url} className="cms:block cms:truncate cms:underline-offset-4 cms:hover:underline">{use.label}</a> : <span className="cms:block cms:truncate">{use.label}</span>}
                                    <span className="cms:text-xs cms:text-muted-foreground" title={use.field}>{use.fieldLabel ?? use.field}</span>
                                </div>
                            ))}
                        </CollapsibleCard>
                        {settings && <PageSettings entryUrl={url} collection={collection} settings={settings} templates={templates} blueprints={blueprints} disabled={!writable}
                            values={form.data} errors={errors} onChange={setSettings} draftDirty={form.isDirty} />}
                        {comments !== null && collection.comments && <EntryComments entryId={entry.id} comments={comments} />}
                        <CollapsibleCard title={t('Revisions')} titleClassName="cms:text-base" storageKey="cms:entry:revisions" contentClassName="cms:flex cms:flex-col cms:gap-2 cms:text-sm">
                            {undoRestore !== null && can.update && (
                                <Button type="button" variant="outline" size="sm" onClick={() => router.post(adminUrl(`cms/entries/${entry.id}/translations/${entry.locale}/undo-restore`), {}, { preserveScroll: true })}>
                                    <Undo2 /> {t('Undo the restore')}
                                </Button>
                            )}
                            <Deferred data="revisions" fallback={<div className="cms:flex cms:flex-col cms:gap-2"><Skeleton className="cms:h-8" /><Skeleton className="cms:h-8" /></div>}>
                                <>
                                    {(revisions ?? []).length === 0 && <p className="cms:text-muted-foreground">{t('Each publish keeps one.')}</p>}
                                    {(revisions ?? []).map((revision) => (
                                        <div key={revision.id} className="cms:flex cms:flex-col cms:gap-1 cms:border-b cms:border-border/60 cms:pb-2 cms:last:border-b-0 cms:last:pb-0">
                                            <div className="cms:min-w-0">
                                                <div className="cms:truncate">{revision.title}</div>
                                                <div className="cms:text-xs cms:text-muted-foreground">
                                                    {formatDate(revision.createdAt)}{revision.author ? ` · ${revision.author}` : ''}
                                                </div>
                                                <div className="cms:text-xs cms:text-muted-foreground">
                                                    {revision.changed === null ? t('First kept version') : revision.changed.length === 0 ? t('No field changed') : t('Changed: :fields', { fields: revision.changed.join(', ') })}
                                                </div>
                                            </div>
                                            <div className="cms:flex cms:gap-1">
                                                <Button type="button" variant="ghost" size="sm" onClick={() => setComparing(revision)}>{t('Compare')}</Button>
                                                {can.update && !entry.trashed && (
                                                    <Button type="button" variant="ghost" size="sm"
                                                        onClick={() => router.post(adminUrl(`cms/entries/${entry.id}/revisions/${revision.id}/restore`), {}, { preserveScroll: true })}>
                                                        {t('Restore')}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            </Deferred>
                        </CollapsibleCard>
                    </aside>
                )}
            </div>

            {entry?.review && <SendBackDialog open={sendingBack} onClose={() => setSendingBack(false)} by={entry.review.by}
                onSend={(note, done) => router.post(`${url}/review/send-back`, { ...locale, note }, { preserveScroll: true, onSuccess: () => { setSendingBack(false); done(); }, onError: done })} />}
            <CompareDialog entryId={entry?.id ?? 0} revision={comparing} onClose={() => setComparing(null)} dirty={form.isDirty} />
            <ScheduleDialog open={scheduling} onClose={() => setScheduling(false)} processing={form.processing} rescheduling={scheduled}
                current={entry?.publishedAt ?? null} onSchedule={(iso) => publish(iso)} />
        </form>
    );
}

/** "Send back": answer a review request without publishing, with a note for the one who asked. */
function SendBackDialog({ open, onClose, by, onSend }: { open: boolean; onClose: () => void; by: string | null; onSend: (note: string, done: () => void) => void }) {
    const [note, setNote] = React.useState('');
    const [sending, setSending] = React.useState(false);
    const errors = (usePage().props.errors ?? {}) as Record<string, string | undefined>;
    React.useEffect(() => { if (open) setNote(''); }, [open]);

    return (
        <Dialog open={open} onOpenChange={(next: boolean) => !next && !sending && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('Send back without publishing')}</DialogTitle>
                    <DialogDescription>
                        {by ? t(':name gets an email with your note, and the request is cleared. The draft stays as it is.', { name: by }) : t('The one who asked gets an email with your note, and the request is cleared. The draft stays as it is.')}
                    </DialogDescription>
                </DialogHeader>
                <div className="cms:flex cms:flex-col cms:gap-2">
                    <Label htmlFor="send-back-note">{t('Note (optional)')}</Label>
                    <Textarea id="send-back-note" rows={4} maxLength={2000} value={note} placeholder={t('What to change before it can be published')}
                        aria-invalid={errors.note !== undefined} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)} />
                    <FieldError message={errors.note} />
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" disabled={sending} onClick={onClose}>{t('Cancel')}</Button>
                    <Button type="button" disabled={sending} onClick={() => { setSending(true); onSend(note, () => setSending(false)); }}>
                        {sending && <LoaderCircle className="cms:animate-spin" />} {t('Send back')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function LanguageBar({ entryUrl, editUrl, current, locales, canAdd, canRemove, onRemove }: {
    entryUrl: string; editUrl: string; current: string; locales: EntryLocale[]; canAdd: boolean; canRemove: boolean; onRemove: () => void;
}) {
    const present = locales.filter((l) => l.status !== null);
    const missing = locales.filter((l) => l.status === null);

    return (
        <nav aria-label={t('Languages')} className="cms:flex cms:flex-wrap cms:items-center cms:gap-2">
            {/* The languages it has, by code: a dot for live, amber when outdated. */}
            <div className="cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5">
                {present.map((l) => {
                    const active = l.code === current;
                    const name = l.main ? t(':language (main)', { language: l.name ?? localeName(l.code) }) : (l.name ?? localeName(l.code));
                    const status = l.status ? statusLabel(l.status) : '';
                    const title = l.outdated
                        ? t(':language: :status, outdated (the main language changed since)', { language: name, status })
                        : t(':language: :status', { language: name, status });
                    return (
                        <button key={l.code} type="button" title={title} aria-label={title} aria-current={active ? 'page' : undefined}
                            onClick={() => !active && router.get(editUrl, { locale: l.code })}
                            className={`cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${active ? 'cms:bg-card cms:text-foreground cms:shadow-xs' : 'cms:text-muted-foreground cms:hover:text-foreground'}`}>
                            {l.code}
                            {(l.outdated || l.status === 'published') && (
                                <span aria-hidden className={`cms:size-1.5 cms:rounded-full ${l.outdated ? 'cms:bg-amber-500' : 'cms:bg-emerald-500'}`} />
                            )}
                        </button>
                    );
                })}
            </div>
            {canAdd && missing.map((l) => (
                <Button key={l.code} type="button" variant="outline" size="sm" className="cms:h-8 cms:border-dashed cms:text-xs cms:uppercase"
                    title={t('Add :language', { language: l.name ?? localeName(l.code) })} onClick={() => router.post(`${entryUrl}/translations`, { locale: l.code })}>
                    <Plus /> {l.code}
                </Button>
            ))}
            {canRemove && (
                <Button type="button" variant="ghost" size="sm" className="cms:ml-auto cms:text-destructive" onClick={onRemove}>{t('Remove this language')}</Button>
            )}
        </nav>
    );
}

/**
 * The date an entry shows as published, to set or change: a past one
 * publishes it with that date, a future one schedules it.
 */
function PublishDate({ status, publishedAt, processing, onPublish, onUnpublish }: {
    status: EntryStatus; publishedAt: string | null; processing: boolean; onPublish: (iso: string | null) => void; onUnpublish: () => void;
}) {
    const [value, setValue] = React.useState(publishedAt ? localInputValue(new Date(publishedAt)) : '');
    const chosen = value === '' ? null : new Date(value);
    const future = chosen !== null && chosen.getTime() > Date.now();
    // To the minute, as the input shows it.
    const minute = (date: Date | null) => (date === null ? null : Math.floor(date.getTime() / 60_000));
    const changed = minute(chosen) !== minute(publishedAt ? new Date(publishedAt) : null);
    const label = status === 'draft'
        ? (future ? t('Schedule') : t('Publish'))
        : (future ? (status === 'scheduled' ? t('Reschedule') : t('Schedule')) : t('Change date'));

    return (
        <div className="cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3">
            <Label htmlFor="entry-published-at">{t('Publish date')}</Label>
            <DatePicker id="entry-published-at" withTime className="cms:max-w-none" value={value || null} onChange={(next) => setValue(next ?? '')} />
            <p className="cms:text-xs cms:text-muted-foreground">
                {status === 'draft' ? t('Empty: now. A date in the future schedules it.') : t('The date shown as published. A date in the future takes it off the site until then.')}
            </p>
            <div className="cms:flex cms:flex-wrap cms:gap-2">
                {(status === 'draft' || changed) && (
                    <Button type="button" size="sm" disabled={processing} onClick={() => onPublish(chosen?.toISOString() ?? null)}>
                        <CalendarClock /> {label}
                    </Button>
                )}
                {status !== 'draft' && <Button type="button" size="sm" variant="outline" disabled={processing} onClick={onUnpublish}>{t('Unpublish')}</Button>}
            </div>
        </div>
    );
}

function ScheduleDialog({ open, onClose, onSchedule, current, processing, rescheduling }: {
    open: boolean; onClose: () => void; onSchedule: (iso: string) => void; current: string | null; processing: boolean; rescheduling: boolean;
}) {
    const [value, setValue] = React.useState('');
    React.useEffect(() => {
        // The date it's scheduled for, else tomorrow: never the date it was first published.
        if (open) setValue(localInputValue(scheduleStart(current)));
    }, [open, current]);
    const chosen = value === '' ? null : new Date(value);
    const past = chosen !== null && chosen.getTime() <= Date.now();

    return (
        <Dialog open={open} onOpenChange={(next: boolean) => !next && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{rescheduling ? t('Change the publish date') : t('Publish on a date')}</DialogTitle>
                    <DialogDescription>{t('The entry goes live then.')}</DialogDescription>
                </DialogHeader>
                <div className="cms:flex cms:flex-col cms:gap-2">
                    <Label htmlFor="published-at">{t('Date and time')}</Label>
                    <DatePicker id="published-at" withTime required className="cms:max-w-none" value={value || null} onChange={(next) => setValue(next ?? '')} />
                    <p className="cms:text-sm cms:text-muted-foreground">{t('In your time zone.')}</p>
                    {past && (
                        <p role="alert" className="cms:text-sm cms:text-amber-700 cms:dark:text-amber-400">
                            {t('This date has passed: the entry goes live now, dated :date.', { date: formatDate(chosen.toISOString()) })}
                        </p>
                    )}
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>{t('Cancel')}</Button>
                    <Button type="button" disabled={chosen === null || processing} onClick={() => chosen && onSchedule(chosen.toISOString())}>
                        {past ? t('Publish now, back-dated') : rescheduling ? t('Change the date') : t('Schedule')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

/** A revision beside the saved draft: the fields where they differ, as text. */
function CompareDialog({ entryId, revision, onClose, dirty }: { entryId: number; revision: Revision | null; onClose: () => void; dirty: boolean }) {
    const [fields, setFields] = React.useState<{ label: string; revision: string; draft: string }[] | null>(null);
    const [failed, setFailed] = React.useState(false);
    React.useEffect(() => {
        setFields(null);
        setFailed(false);
        if (!revision) return;
        let current = true;
        fetch(adminUrl(`cms/entries/${entryId}/revisions/${revision.id}/compare`), { headers: { Accept: 'application/json' }, credentials: 'same-origin' })
            .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
            .then((body: { fields: { label: string; revision: string; draft: string }[] }) => { if (current) setFields(body.fields); })
            .catch(() => { if (current) setFailed(true); });
        return () => { current = false; };
    }, [revision, entryId]);

    return (
        <Dialog open={revision !== null} onOpenChange={(next: boolean) => !next && onClose()}>
            <DialogContent className="cms:max-h-[85vh] cms:overflow-y-auto cms:sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{t('Compare with the draft')}</DialogTitle>
                    <DialogDescription>
                        {revision ? (revision.author ? t('The version published :date by :name, beside the saved draft.', { date: formatDate(revision.createdAt), name: revision.author }) : t('The version published :date, beside the saved draft.', { date: formatDate(revision.createdAt) })) : ''}
                        {dirty ? ` ${t('Your unsaved changes aren\'t included.')}` : ''}
                    </DialogDescription>
                </DialogHeader>
                {failed && <p className="cms:text-sm cms:text-destructive">{t('The comparison could not be loaded. Try again.')}</p>}
                {!failed && fields === null && <div className="cms:flex cms:flex-col cms:gap-2"><Skeleton className="cms:h-12" /><Skeleton className="cms:h-12" /></div>}
                {fields?.length === 0 && <p className="cms:text-sm cms:text-muted-foreground">{t('The draft is the same as this version.')}</p>}
                {fields && fields.length > 0 && (
                    <dl className="cms:flex cms:flex-col cms:gap-4 cms:text-sm">
                        {fields.map((field) => (
                            <div key={field.label} className="cms:flex cms:flex-col cms:gap-1">
                                <dt className="cms:font-medium">{field.label}</dt>
                                <dd className="cms:grid cms:gap-2 cms:sm:grid-cols-2">
                                    <div className="cms:rounded-md cms:border cms:border-destructive/30 cms:bg-destructive/5 cms:p-2 cms:break-words cms:whitespace-pre-wrap">
                                        <span className="cms:block cms:text-xs cms:text-muted-foreground">{t('This version')}</span>{field.revision || '—'}
                                    </div>
                                    <div className="cms:rounded-md cms:border cms:border-emerald-500/30 cms:bg-emerald-500/5 cms:p-2 cms:break-words cms:whitespace-pre-wrap">
                                        <span className="cms:block cms:text-xs cms:text-muted-foreground">{t('Draft')}</span>{field.draft || '—'}
                                    </div>
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>{t('Close')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function ParentField({ collection, value, error, onChange }: { collection: Props['collection']; value: number | null; error?: string; onChange: (id: number | null) => void }) {
    return (
        <div className="cms:flex cms:flex-col cms:gap-2">
            <Label htmlFor="parent">{t('Parent')}</Label>
            <EntriesPicker id="parent" multiple={false} max={1} collections={[collection.handle]} invalid={error !== undefined}
                value={value} onChange={(next) => onChange(typeof next === 'number' ? next : null)} />
            <FieldError message={error} />
        </div>
    );
}

/**
 * The parent entry, the entry's own template and comments (every
 * language's), saved with the draft; and its blueprint, changed on its own
 * (the editor reloads with the new fields).
 */
function PageSettings({ entryUrl, collection, settings, templates, blueprints, disabled, values, errors, onChange, draftDirty }: {
    templates: TemplateLookup | null;
    entryUrl: string;
    collection: Props['collection'];
    settings: NonNullable<Props['settings']>;
    blueprints: NonNullable<Props['blueprints']>;
    disabled: boolean;
    values: SettingsValues;
    errors: Record<string, string | undefined>;
    onChange: (patch: Partial<SettingsValues>) => void;
    draftDirty: boolean;
}) {
    const savedBlueprint = blueprints.length > 1 ? (settings.blueprint ?? blueprints[0]!.handle) : undefined;
    const blueprintForm = useForm({ blueprint: savedBlueprint ?? '' });
    const blueprintError = (blueprintForm.errors as Record<string, string | undefined>).blueprint;
    const hasErrors = ['parent_id', 'template', 'comments_closed'].some((key) => errors[key] !== undefined) || blueprintError !== undefined;

    return (
        <CollapsibleCard title={t('Page settings')} titleClassName="cms:text-base" storageKey="cms:entry:page-settings" hasErrors={hasErrors}>
            <fieldset disabled={disabled} className="cms:flex cms:flex-col cms:gap-4 cms:text-sm">
                {collection.hierarchical && <ParentField collection={collection} value={values.parent_id} error={errors.parent_id} onChange={(parent_id) => onChange({ parent_id })} />}
                {blueprints.length > 1 && (
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor="blueprint">{t('Blueprint')}</Label>
                        <Select value={blueprintForm.data.blueprint} onValueChange={(handle: string) => blueprintForm.setData('blueprint', handle)}>
                            <SelectTrigger id="blueprint" aria-invalid={blueprintError !== undefined}><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {blueprints.map((blueprint) => <SelectItem key={blueprint.handle} value={blueprint.handle}>{blueprint.title}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        {blueprintForm.data.blueprint !== savedBlueprint && (
                            <>
                                <p className="cms:text-muted-foreground">{t('The fields change in every language; values of fields both blueprints have are kept. The editor reloads.')}</p>
                                <Button type="button" size="sm" disabled={blueprintForm.processing || draftDirty} title={draftDirty ? t('Save your draft first') : undefined}
                                    // A new blueprint means new fields and versions: the editor starts afresh.
                                    onClick={() => blueprintForm.put(`${entryUrl}/settings`, { preserveScroll: true })}>{t('Change blueprint')}</Button>
                            </>
                        )}
                        <FieldError message={blueprintError} />
                    </div>
                )}
                <div className="cms:flex cms:flex-col cms:gap-2">
                    <Label htmlFor="template">{t('Template')}</Label>
                    <Input id="template" className="cms:font-mono" placeholder={`cms.${collection.handle}-landing`} value={values.template}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ template: e.target.value })} aria-invalid={errors.template !== undefined} />
                    <TemplateHelp example={`cms.${collection.handle}-landing`} empty={t('Leave empty to use the collection\'s template.')} value={values.template} lookup={templates} />
                    <FieldError message={errors.template} />
                </div>
                {collection.comments && (
                    <div className="cms:flex cms:items-center cms:gap-3">
                        <Switch id="comments-open" checked={!values.comments_closed} onCheckedChange={(open: boolean) => onChange({ comments_closed: !open })} />
                        <Label htmlFor="comments-open">{t('Accept new comments')}</Label>
                        <a href={adminUrl(`cms/comments?entry=${entryUrl.split('/').slice(-1)[0]}`)} className="cms:ml-auto cms:text-muted-foreground cms:underline-offset-4 hover:cms:underline">{t('Comments')}</a>
                    </div>
                )}
            </fieldset>
        </CollapsibleCard>
    );
}
