import * as React from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, CalendarClock, ChevronDown, ExternalLink, Eye, LoaderCircle, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import {
    Badge, Button, Card, CardContent, CardHeader, CardTitle, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Input, Label, useBreadcrumbs,
} from '@sunrice/admin-sdk/ui';
import { useConfirm } from '@/components/Confirm.tsx';
import { FieldError, FieldInput, Fields } from '@/components/FieldInput.tsx';
import { errorsAt } from '@/lib/builder.ts';
import { type EntryLocale, type EntryStatus, formatDate, localeName, localInputValue, statusLabel } from '@/lib/entries.ts';
import type { FieldDefinition } from '@/types.ts';

interface Props {
    collection: { handle: string; title: string; dated: boolean };
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
        version: number;
        /** The live page, when published and the collection has a URL. */
        url: string | null;
        /** A signed link showing the saved draft, for a while. */
        previewUrl: string;
    } | null;
    values: { title: string; slug: string; data: FieldValues; seo: FieldValues | null };
    revisions: { id: number; title: string; createdAt: string | null }[];
    can: { create: boolean; update: boolean; publish: boolean; delete: boolean };
}

/**
 * Field values are any JSON. Inertia's form types recurse into the data's
 * shape and stop only at `any`, so that's what the values are typed as.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldValues = Record<string, any>;
type FormData = { locale: string | null; title: string; slug: string; data: FieldValues; seo: FieldValues; version: number | null; publish: boolean; published_at: string | null };

/** The SEO card's fields (see Sunrice\\Cms\\Support\\Seo), edited with the field inputs. */
const SEO_FIELDS: FieldDefinition[] = [
    { handle: 'title', type: 'text', label: 'SEO title', instructions: 'For search results and tabs. Empty: the title.', config: { max: 255 } },
    { handle: 'description', type: 'textarea', label: 'Description', instructions: 'A sentence or two for search results and shared links.', config: { max: 500 } },
    { handle: 'image', type: 'media', label: 'Share image', instructions: 'Shown when the page is shared.', config: { types: ['image'] } },
    { handle: 'noindex', type: 'toggle', label: 'Hide from search engines' },
];

/**
 * A fresh form for each version the server sends (after creating, saving,
 * publishing…): Inertia keeps the page component between visits, and the
 * form would keep the old values.
 */
export default function EntryEditorPage(props: Props) {
    const { entry } = props;

    return <EntryEditor key={entry ? `${entry.id}:${entry.locale}:${entry.version}:${entry.status}:${entry.trashed}:${entry.publishedAt}` : 'new'} {...props} />;
}

function EntryEditor({ collection, fields, locales = [], shared = [], sharedValues = {}, entry, values, revisions, can }: Props) {
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
    // Publishing what's in the form: saved first when one may edit, else the saved draft.
    const publish = (publishedAt: string | null = null) => {
        if (can.update) {
            save(true, publishedAt);
        } else if (entry) {
            router.post(`${url}/publish`, { ...locale, published_at: publishedAt }, { preserveScroll: true, onSuccess: () => setScheduling(false) });
        }
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); save(); }} className="cms:flex cms:flex-col cms:gap-6">
            <Head title={heading} />
            {confirmDialog}

            <div className="cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4">
                <div className="cms:flex cms:min-w-0 cms:items-center cms:gap-3">
                    <Button variant="outline" size="icon" className="cms:size-8 cms:shrink-0" asChild>
                        <Link href={list} aria-label={`Back to ${collection.title}`}><ArrowLeft /></Link>
                    </Button>
                    <h1 className="cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight">{heading}</h1>
                    {entry && <Badge variant={entry.status === 'published' ? 'default' : 'secondary'}>{entry.trashed ? 'In the trash' : statusLabel(entry.status)}</Badge>}
                    {form.isDirty && <span className="cms:text-sm cms:text-muted-foreground">Unsaved changes</span>}
                </div>
                <div className="cms:flex cms:items-center cms:gap-2">
                    {entry && !entry.trashed && (
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
                    {entry && !entry.trashed && can.delete && (
                        <Button type="button" variant="outline" size="icon" className="cms:text-destructive" aria-label="Move to the trash"
                            onClick={() => confirm(`Move "${values.title}" to the trash? It comes off the site; you can restore it.`, () => router.delete(url))}>
                            <Trash2 />
                        </Button>
                    )}
                    {editable && (
                        <Button type="submit" variant={entry && can.publish ? 'outline' : 'default'} disabled={form.processing}>
                            {form.processing && <LoaderCircle className="cms:animate-spin" />}
                            {entry ? 'Save draft' : 'Create draft'}
                        </Button>
                    )}
                    {entry && !entry.trashed && can.publish && (
                        <div className="cms:flex">
                            <Button type="button" className="cms:rounded-r-none" disabled={form.processing || upToDate} onClick={() => publish()}>
                                {entry.status === 'draft' ? 'Publish' : upToDate ? 'Published' : 'Publish changes'}
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button type="button" size="icon" className="cms:rounded-l-none cms:border-l cms:border-primary-foreground/20" aria-label="More publishing options"><ChevronDown /></Button>
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
                </div>
            </div>

            {entry && locales.length > 1 && (
                <LanguageBar entryUrl={url} current={entry.locale} locales={locales} canAdd={can.create && !entry.trashed}
                    canRemove={can.delete && !entry.isMain && !entry.trashed}
                    onRemove={() => confirm(`Remove the ${localeName(entry.locale)} translation of "${values.title}"? Its revisions go with it.`,
                        () => router.delete(`${url}/translations/${entry.locale}`))} />
            )}

            {errors.version && <p role="alert" className="cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive">{errors.version}</p>}
            {(errors.entry || errors.published_at) && <p role="alert" className="cms:text-sm cms:text-destructive">{errors.entry ?? errors.published_at}</p>}

            <div className="cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]">
                <fieldset disabled={!editable} className="cms:flex cms:min-w-0 cms:flex-col cms:gap-6">
                    <Card>
                        <CardContent className="cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]">
                            <div className="cms:flex cms:flex-col cms:gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={form.data.title} aria-invalid={errors.title !== undefined}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('title', e.target.value)} />
                                <FieldError message={errors.title} />
                            </div>
                            <div className="cms:flex cms:flex-col cms:gap-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input id="slug" className="cms:font-mono" value={form.data.slug} placeholder="Made from the title" aria-invalid={errors.slug !== undefined}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('slug', e.target.value)} />
                                <FieldError message={errors.slug} />
                            </div>
                        </CardContent>
                    </Card>

                    {fields.length > 0 && (
                        <Card>
                            <CardContent className="cms:flex cms:flex-col cms:gap-6">
                                {fields.map((field) => shared.includes(field.handle) ? (
                                    <fieldset key={field.handle} disabled className="cms:flex cms:flex-col cms:gap-1">
                                        <FieldInput id={`data-${field.handle}`} field={field} content value={sharedValues[field.handle]} errors={{}} onChange={() => {}} />
                                        <p className="cms:text-sm cms:text-muted-foreground">Shared by all languages: edit it in {mainLocale ? localeName(mainLocale) : 'the main language'}.</p>
                                    </fieldset>
                                ) : (
                                    <FieldInput key={field.handle} id={`data-${field.handle}`} field={field} content
                                        value={form.data.data[field.handle]} errors={errorsAt(errors, `data.${field.handle}`)}
                                        onChange={(value) => form.setData('data', { ...form.data.data, [field.handle]: value })} />
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader><CardTitle className="cms:text-base">Search and sharing</CardTitle></CardHeader>
                        <CardContent>
                            <Fields id="seo" fields={SEO_FIELDS} value={form.data.seo} errors={errorsAt(errors, 'seo')}
                                onChange={(seo) => form.setData('seo', seo)} />
                        </CardContent>
                    </Card>
                </fieldset>

                {entry && (
                    <aside className="cms:flex cms:flex-col cms:gap-4">
                        <Card>
                            <CardHeader><CardTitle className="cms:text-base">Status</CardTitle></CardHeader>
                            <CardContent className="cms:flex cms:flex-col cms:gap-1 cms:text-sm">
                                <p>{statusLabel(entry.status)}{entry.status !== 'draft' && entry.publishedAt ? ` · ${formatDate(entry.publishedAt)}` : ''}</p>
                                {entry.status !== 'draft' && entry.hasUnpublishedChanges && <p className="cms:text-muted-foreground">The draft has changes the site doesn't show yet.</p>}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle className="cms:text-base">Revisions</CardTitle></CardHeader>
                            <CardContent className="cms:flex cms:flex-col cms:gap-2 cms:text-sm">
                                {revisions.length === 0 && <p className="cms:text-muted-foreground">Each publish keeps one.</p>}
                                {revisions.map((revision) => (
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
                            </CardContent>
                        </Card>
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
                const name = `${localeName(l.code)}${l.main ? ' (main)' : ''}`;
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
                        <Badge variant={l.status === 'published' ? 'default' : 'outline'} className="cms:ml-1">{statusLabel(l.status)}</Badge>
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
                    <Input id="published-at" type="datetime-local" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
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
