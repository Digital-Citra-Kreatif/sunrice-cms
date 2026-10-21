import * as React from 'react';
import { Head, router } from '@inertiajs/react';
import { Check, ChevronLeft, ChevronRight, ExternalLink, MessageSquare, MessageSquareReply, Search, Pencil, RotateCcw, ShieldAlert, Trash2, Undo2 } from 'lucide-react';
import { adminUrl, t } from '@sunrice/admin-sdk';
import {
    Badge, Button, Card, Checkbox, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Input, PageHeader, Select,
    SelectContent, SelectItem, SelectTrigger, SelectValue, Tabs, TabsList, TabsTrigger, Textarea, TrashHint, useBreadcrumbs,
} from '@sunrice/admin-sdk/ui';
import { useConfirm } from '@/components/Confirm.tsx';
import { FieldError } from '@/components/FieldInput.tsx';
import { formatDate } from '@/lib/entries.ts';

type Tab = 'all' | 'pending' | 'approved' | 'spam' | 'trashed';

interface Row {
    id: number;
    body: string;
    status: 'pending' | 'approved' | 'spam';
    trashed: boolean;
    locale: string;
    author: string;
    email: string | null;
    member: boolean;
    createdAt: string | null;
    entry: { id: number; title: string; url: string | null };
    parent: { id: number; author: string; excerpt: string } | null;
}

interface Props {
    tab: Tab;
    counts: Record<Tab, number>;
    filters: { search: string; collection: string | null; entry: number | null };
    collections: { handle: string; title: string }[];
    comments: { data: Row[]; total: number; from: number | null; to: number | null; prev_page_url: string | null; next_page_url: string | null };
    can: { moderate: boolean; delete: boolean };
    errors?: Record<string, string>;
}

const tabs = (): { value: Tab; label: string }[] => [
    { value: 'all', label: t('All') }, { value: 'pending', label: t('Pending') }, { value: 'approved', label: t('Approved') },
    { value: 'spam', label: t('Spam') }, { value: 'trashed', label: t('Trash') },
];

const statusLabel = (status: Row['status']): string => ({ pending: t('Pending'), approved: t('Approved'), spam: t('Spam') })[status];

export default function CommentsIndex({ tab, counts, filters, collections, comments, can, errors = {} }: Props) {
    useBreadcrumbs([{ label: t('Comments'), href: adminUrl('cms/comments') }]);
    const [search, setSearch] = React.useState(filters.search);
    const [selected, setSelected] = React.useState<number[]>([]);
    const [editing, setEditing] = React.useState<{ row: Row; mode: 'reply' | 'edit' } | null>(null);
    const [confirm, confirmDialog] = useConfirm();

    const visit = (changes: Partial<{ status: Tab; search: string; collection: string | null }>) => {
        const next = { status: tab, search: filters.search, collection: filters.collection, ...changes };
        router.get(adminUrl('cms/comments'), {
            ...(next.status !== 'all' ? { status: next.status } : {}),
            ...(next.search ? { search: next.search } : {}),
            ...(next.collection ? { collection: next.collection } : {}),
            ...(filters.entry ? { entry: filters.entry } : {}),
        }, { preserveState: true, replace: true, onSuccess: () => setSelected([]) });
    };

    React.useEffect(() => {
        if (search === filters.search) return;
        const timer = window.setTimeout(() => visit({ search }), 300);
        return () => window.clearTimeout(timer);
    }, [search]);

    const post = (url: string, data: Record<string, string | number[]> = {}) => router.post(adminUrl(url), data, { preserveScroll: true, onSuccess: () => setSelected([]) });
    const setStatus = (row: Row, status: Row['status']) => post(`cms/comments/${row.id}/status`, { status });
    const bulk = (action: string) => {
        const run = () => post('cms/comments/bulk', { action, ids: selected });
        action === 'delete' ? confirm(selected.length === 1 ? t('Permanently delete 1 comment? This can\'t be undone.') : t('Permanently delete :count comments? This can\'t be undone.', { count: selected.length }), run) : run();
    };
    const all = comments.data.length > 0 && selected.length === comments.data.length;

    return (
        <div className="cms:flex cms:flex-col cms:gap-6">
            <Head title={t('Comments')} />
            <PageHeader title={t('Comments')} />

            <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-2">
                <div className="cms:relative cms:w-full cms:sm:w-64">
                    <Search className="cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" />
                    <Input type="search" placeholder={t('Search text, name or email')} aria-label={t('Search comments')} className="cms:pl-9"
                        value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
                </div>
                {collections.length > 1 && (
                    <Select value={filters.collection ?? 'all'} onValueChange={(value: string) => visit({ collection: value === 'all' ? null : value })}>
                        <SelectTrigger className="cms:w-48" aria-label={t('Collection')}><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t('Every collection')}</SelectItem>
                            {collections.map((c) => <SelectItem key={c.handle} value={c.handle}>{c.title}</SelectItem>)}
                        </SelectContent>
                    </Select>
                )}
            </div>

            {filters.entry !== null && (
                <p className="cms:text-sm cms:text-muted-foreground">
                    {t('Comments on one entry.')} <button type="button" className="cms:underline cms:underline-offset-4" onClick={() => router.get(adminUrl('cms/comments'))}>{t('Show all')}</button>
                </p>
            )}

            <Tabs value={tab} onValueChange={(value: string) => visit({ status: value as Tab })}>
                <TabsList className="cms:h-auto cms:flex-wrap cms:justify-start">
                    {tabs().map((each) => <TabsTrigger key={each.value} value={each.value} title={each.value === 'all' ? t('Everything but the trash') : undefined}>{each.label} <span className="cms:ml-1 cms:text-muted-foreground">{counts[each.value]}</span></TabsTrigger>)}
                </TabsList>
            </Tabs>

            {selected.length > 0 && (
                <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm" role="toolbar" aria-label={t('With the selected comments')}>
                    <span className="cms:text-muted-foreground">{t(':count selected', { count: selected.length })}</span>
                    {can.moderate && tab !== 'trashed' && (
                        <>
                            <Button size="sm" variant="outline" onClick={() => bulk('approve')}><Check /> {t('Approve')}</Button>
                            <Button size="sm" variant="outline" onClick={() => bulk('unapprove')}><Undo2 /> {t('Unapprove')}</Button>
                            <Button size="sm" variant="outline" onClick={() => bulk('spam')}><ShieldAlert /> {t('Spam')}</Button>
                        </>
                    )}
                    {can.delete && tab !== 'trashed' && <Button size="sm" variant="outline" onClick={() => bulk('trash')}><Trash2 /> {t('Move to trash')}</Button>}
                    {can.delete && tab === 'trashed' && (
                        <>
                            <Button size="sm" variant="outline" onClick={() => bulk('restore')}><RotateCcw /> {t('Restore')}</Button>
                            <Button size="sm" variant="destructive" onClick={() => bulk('delete')}><Trash2 /> {t('Permanently delete')}</Button>
                        </>
                    )}
                </div>
            )}

            {comments.data.length === 0 ? (
                <div className="cms:flex cms:flex-col cms:items-center cms:gap-3 cms:rounded-xl cms:border cms:border-dashed cms:px-6 cms:py-16 cms:text-center">
                    <span className="cms:grid cms:size-10 cms:place-items-center cms:rounded-full cms:bg-muted cms:text-muted-foreground"><MessageSquare className="cms:size-4" /></span>
                    <p className="cms:text-sm cms:text-muted-foreground">{filters.search ? t('No comments match.') : t('No comments here.')}</p>
                    {tab !== 'trashed' && <TrashHint count={counts.trashed ?? 0} onShow={() => visit({ status: 'trashed' })} />}
                </div>
            ) : (
                <Card className="cms:divide-y cms:p-0">
                    <div className="cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground">
                        <Checkbox checked={all} aria-label={t('Select all')} onCheckedChange={(checked: boolean) => setSelected(checked ? comments.data.map((c) => c.id) : [])} />
                        <span>{t(':from–:to of :total', { from: comments.from, to: comments.to, total: comments.total })}</span>
                    </div>
                    {comments.data.map((row) => (
                        <article key={row.id} className="cms:flex cms:gap-3 cms:px-4 cms:py-4" aria-labelledby={`comment-${row.id}-author`}>
                            <Checkbox checked={selected.includes(row.id)} aria-label={t('Select :author\'s comment', { author: row.author })}
                                onCheckedChange={(checked: boolean) => setSelected(checked ? [...selected, row.id] : selected.filter((id) => id !== row.id))} />
                            <div className="cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2">
                                <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm">
                                    <span id={`comment-${row.id}-author`} className="cms:font-medium">{row.author}</span>
                                    {row.email && <span className="cms:text-muted-foreground">{row.email}</span>}
                                    {row.member && <Badge variant="outline">{t('Signed in')}</Badge>}
                                    {!row.trashed && <Badge variant={row.status === 'approved' ? 'success' : row.status === 'spam' ? 'destructive' : 'warning'}>{statusLabel(row.status)}</Badge>}
                                    <span className="cms:text-muted-foreground">{row.createdAt ? formatDate(row.createdAt) : ''} · {row.locale.toUpperCase()}</span>
                                </div>
                                <p className="cms:text-sm cms:text-muted-foreground">
                                    {t('On')} {row.entry.url
                                        ? <a href={row.entry.url} target="_blank" rel="noreferrer" className="cms:underline-offset-4 hover:cms:underline">{row.entry.title} <ExternalLink className="cms:inline cms:size-3" /></a>
                                        : row.entry.title}
                                    {row.parent && <> · {t('replying to :author: “:excerpt”', { author: row.parent.author, excerpt: row.parent.excerpt })}</>}
                                </p>
                                <p className="cms:whitespace-pre-wrap cms:break-words">{row.body}</p>
                                <div className="cms:flex cms:flex-wrap cms:gap-1">
                                    {can.moderate && !row.trashed && (
                                        <>
                                            {row.status !== 'approved' && <Button size="sm" variant="ghost" onClick={() => setStatus(row, 'approved')}><Check /> {t('Approve')}</Button>}
                                            {row.status === 'approved' && <Button size="sm" variant="ghost" onClick={() => setStatus(row, 'pending')}><Undo2 /> {t('Unapprove')}</Button>}
                                            {row.status !== 'spam' && <Button size="sm" variant="ghost" onClick={() => setStatus(row, 'spam')}><ShieldAlert /> {t('Spam')}</Button>}
                                            {row.status !== 'spam' && <Button size="sm" variant="ghost" onClick={() => setEditing({ row, mode: 'reply' })}><MessageSquareReply /> {t('Reply')}</Button>}
                                            <Button size="sm" variant="ghost" onClick={() => setEditing({ row, mode: 'edit' })}><Pencil /> {t('Edit')}</Button>
                                        </>
                                    )}
                                    {can.delete && !row.trashed && (
                                        <Button size="sm" variant="ghost" onClick={() => router.delete(adminUrl(`cms/comments/${row.id}`), { preserveScroll: true })}><Trash2 /> {t('Move to trash')}</Button>
                                    )}
                                    {can.delete && row.trashed && (
                                        <>
                                            <Button size="sm" variant="ghost" onClick={() => post(`cms/comments/${row.id}/restore`)}><RotateCcw /> {t('Restore')}</Button>
                                            <Button size="sm" variant="ghost" onClick={() => confirm(t('Permanently delete this comment? Replies to it stay.'),
                                                () => router.delete(adminUrl(`cms/comments/${row.id}/force`), { preserveScroll: true }))}><Trash2 /> {t('Permanently delete')}</Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </Card>
            )}

            {(comments.prev_page_url || comments.next_page_url) && (
                <div className="cms:flex cms:justify-end cms:gap-2">
                    <Button variant="outline" size="sm" disabled={!comments.prev_page_url} onClick={() => comments.prev_page_url && router.get(comments.prev_page_url)}><ChevronLeft /> {t('Newer')}</Button>
                    <Button variant="outline" size="sm" disabled={!comments.next_page_url} onClick={() => comments.next_page_url && router.get(comments.next_page_url)}>{t('Older')} <ChevronRight /></Button>
                </div>
            )}

            {editing && <Compose key={`${editing.mode}-${editing.row.id}`} row={editing.row} mode={editing.mode} error={errors.body} onClose={() => setEditing(null)} />}
            {confirmDialog}
        </div>
    );
}

/** Answer a comment (published at once, under your name) or fix its text. */
function Compose({ row, mode, error, onClose }: { row: Row; mode: 'reply' | 'edit'; error?: string; onClose: () => void }) {
    const [body, setBody] = React.useState(mode === 'edit' ? row.body : '');
    const [processing, setProcessing] = React.useState(false);
    const save = () => {
        setProcessing(true);
        const options = { preserveScroll: true, onSuccess: onClose, onFinish: () => setProcessing(false) };
        mode === 'reply'
            ? router.post(adminUrl(`cms/comments/${row.id}/reply`), { body }, options)
            : router.put(adminUrl(`cms/comments/${row.id}`), { body }, options);
    };

    return (
        <Dialog open onOpenChange={(open: boolean) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{mode === 'reply' ? t('Reply to :author', { author: row.author }) : t('Edit :author\'s comment', { author: row.author })}</DialogTitle>
                    <DialogDescription>
                        {mode === 'reply' ? (row.status === 'pending' ? t('Your reply is published at once, and approves this comment.') : t('Your reply is published at once, under your name.')) : t('Fix a typo or remove a link.')}
                    </DialogDescription>
                </DialogHeader>
                {mode === 'reply' && <p className="cms:max-h-32 cms:overflow-auto cms:whitespace-pre-wrap cms:text-sm cms:text-muted-foreground">{row.body}</p>}
                <Textarea aria-label={mode === 'reply' ? t('Your reply') : t('Comment')} rows={5} value={body} aria-invalid={error !== undefined}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)} />
                <FieldError message={error} />
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>{t('Cancel')}</Button>
                    <Button type="button" disabled={body.trim() === '' || processing} onClick={save}>{mode === 'reply' ? t('Post reply') : t('Save')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
