import * as React from 'react';
import { Head, router } from '@inertiajs/react';
import { Check, ChevronLeft, ChevronRight, ExternalLink, MessageSquareReply, Pencil, RotateCcw, ShieldAlert, Trash2, Undo2 } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import {
    Badge, Button, Card, Checkbox, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Input,
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Tabs, TabsList, TabsTrigger, Textarea, useBreadcrumbs,
} from '@sunrice/admin-sdk/ui';
import { useConfirm } from '@/components/Confirm.tsx';
import { FieldError } from '@/components/FieldInput.tsx';
import { formatDate } from '@/lib/entries.ts';

type Tab = 'all' | 'pending' | 'approved' | 'spam' | 'trash';

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

const TABS: { value: Tab; label: string }[] = [
    { value: 'all', label: 'All' }, { value: 'pending', label: 'Pending' }, { value: 'approved', label: 'Approved' },
    { value: 'spam', label: 'Spam' }, { value: 'trash', label: 'Trash' },
];

const STATUS: Record<Row['status'], string> = { pending: 'Pending', approved: 'Approved', spam: 'Spam' };

export default function CommentsIndex({ tab, counts, filters, collections, comments, can, errors = {} }: Props) {
    useBreadcrumbs([{ label: 'Comments', href: adminUrl('cms/comments') }]);
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
        action === 'delete' ? confirm(`Delete ${selected.length} comments for good? This can't be undone.`, run) : run();
    };
    const all = comments.data.length > 0 && selected.length === comments.data.length;

    return (
        <div className="cms:flex cms:flex-col cms:gap-6">
            <Head title="Comments" />
            <div className="cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4">
                <h1 className="cms:text-2xl cms:font-medium cms:tracking-tight">Comments</h1>
                <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-2">
                    <Input type="search" placeholder="Search text, name or email" aria-label="Search comments" className="cms:w-64"
                        value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
                    {collections.length > 1 && (
                        <Select value={filters.collection ?? 'all'} onValueChange={(value: string) => visit({ collection: value === 'all' ? null : value })}>
                            <SelectTrigger className="cms:w-48" aria-label="Collection"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Every collection</SelectItem>
                                {collections.map((c) => <SelectItem key={c.handle} value={c.handle}>{c.title}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    )}
                </div>
            </div>

            {filters.entry !== null && (
                <p className="cms:text-sm cms:text-muted-foreground">
                    Comments on one entry. <button type="button" className="cms:underline cms:underline-offset-4" onClick={() => router.get(adminUrl('cms/comments'))}>Show all</button>
                </p>
            )}

            <Tabs value={tab} onValueChange={(value: string) => visit({ status: value as Tab })}>
                <TabsList className="cms:h-auto cms:flex-wrap cms:justify-start">
                    {TABS.map((t) => <TabsTrigger key={t.value} value={t.value}>{t.label} <span className="cms:ml-1 cms:text-muted-foreground">{counts[t.value]}</span></TabsTrigger>)}
                </TabsList>
            </Tabs>

            {selected.length > 0 && (
                <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm" role="toolbar" aria-label="With the selected comments">
                    <span className="cms:text-muted-foreground">{selected.length} selected</span>
                    {can.moderate && tab !== 'trash' && (
                        <>
                            <Button size="sm" variant="outline" onClick={() => bulk('approve')}><Check /> Approve</Button>
                            <Button size="sm" variant="outline" onClick={() => bulk('unapprove')}><Undo2 /> Unapprove</Button>
                            <Button size="sm" variant="outline" onClick={() => bulk('spam')}><ShieldAlert /> Spam</Button>
                        </>
                    )}
                    {can.delete && tab !== 'trash' && <Button size="sm" variant="outline" onClick={() => bulk('trash')}><Trash2 /> Trash</Button>}
                    {can.delete && tab === 'trash' && (
                        <>
                            <Button size="sm" variant="outline" onClick={() => bulk('restore')}><RotateCcw /> Restore</Button>
                            <Button size="sm" variant="destructive" onClick={() => bulk('delete')}><Trash2 /> Delete for good</Button>
                        </>
                    )}
                </div>
            )}

            {comments.data.length === 0 ? (
                <p className="cms:text-muted-foreground">{filters.search ? 'No comments match.' : 'No comments here.'}</p>
            ) : (
                <Card className="cms:divide-y cms:p-0">
                    <div className="cms:flex cms:items-center cms:gap-3 cms:px-4 cms:py-2 cms:text-sm cms:text-muted-foreground">
                        <Checkbox checked={all} aria-label="Select all" onCheckedChange={(checked: boolean) => setSelected(checked ? comments.data.map((c) => c.id) : [])} />
                        <span>{comments.from}–{comments.to} of {comments.total}</span>
                    </div>
                    {comments.data.map((row) => (
                        <article key={row.id} className="cms:flex cms:gap-3 cms:px-4 cms:py-4" aria-labelledby={`comment-${row.id}-author`}>
                            <Checkbox checked={selected.includes(row.id)} aria-label={`Select ${row.author}'s comment`}
                                onCheckedChange={(checked: boolean) => setSelected(checked ? [...selected, row.id] : selected.filter((id) => id !== row.id))} />
                            <div className="cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2">
                                <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-sm">
                                    <span id={`comment-${row.id}-author`} className="cms:font-medium">{row.author}</span>
                                    {row.email && <span className="cms:text-muted-foreground">{row.email}</span>}
                                    {row.member && <Badge variant="outline">Signed in</Badge>}
                                    {!row.trashed && <Badge variant={row.status === 'approved' ? 'secondary' : row.status === 'spam' ? 'destructive' : 'default'}>{STATUS[row.status]}</Badge>}
                                    <span className="cms:text-muted-foreground">{row.createdAt ? formatDate(row.createdAt) : ''} · {row.locale.toUpperCase()}</span>
                                </div>
                                <p className="cms:text-sm cms:text-muted-foreground">
                                    On {row.entry.url
                                        ? <a href={row.entry.url} target="_blank" rel="noreferrer" className="cms:underline-offset-4 hover:cms:underline">{row.entry.title} <ExternalLink className="cms:inline cms:size-3" /></a>
                                        : row.entry.title}
                                    {row.parent && <> · replying to {row.parent.author}: “{row.parent.excerpt}”</>}
                                </p>
                                <p className="cms:whitespace-pre-wrap cms:break-words">{row.body}</p>
                                <div className="cms:flex cms:flex-wrap cms:gap-1">
                                    {can.moderate && !row.trashed && (
                                        <>
                                            {row.status !== 'approved' && <Button size="sm" variant="ghost" onClick={() => setStatus(row, 'approved')}><Check /> Approve</Button>}
                                            {row.status === 'approved' && <Button size="sm" variant="ghost" onClick={() => setStatus(row, 'pending')}><Undo2 /> Unapprove</Button>}
                                            {row.status !== 'spam' && <Button size="sm" variant="ghost" onClick={() => setStatus(row, 'spam')}><ShieldAlert /> Spam</Button>}
                                            {row.status !== 'spam' && <Button size="sm" variant="ghost" onClick={() => setEditing({ row, mode: 'reply' })}><MessageSquareReply /> Reply</Button>}
                                            <Button size="sm" variant="ghost" onClick={() => setEditing({ row, mode: 'edit' })}><Pencil /> Edit</Button>
                                        </>
                                    )}
                                    {can.delete && !row.trashed && (
                                        <Button size="sm" variant="ghost" onClick={() => router.delete(adminUrl(`cms/comments/${row.id}`), { preserveScroll: true })}><Trash2 /> Trash</Button>
                                    )}
                                    {can.delete && row.trashed && (
                                        <>
                                            <Button size="sm" variant="ghost" onClick={() => post(`cms/comments/${row.id}/restore`)}><RotateCcw /> Restore</Button>
                                            <Button size="sm" variant="ghost" onClick={() => confirm('Delete this comment for good? Replies to it stay.',
                                                () => router.delete(adminUrl(`cms/comments/${row.id}/force`), { preserveScroll: true }))}><Trash2 /> Delete for good</Button>
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
                    <Button variant="outline" size="sm" disabled={!comments.prev_page_url} onClick={() => comments.prev_page_url && router.get(comments.prev_page_url)}><ChevronLeft /> Newer</Button>
                    <Button variant="outline" size="sm" disabled={!comments.next_page_url} onClick={() => comments.next_page_url && router.get(comments.next_page_url)}>Older <ChevronRight /></Button>
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
                    <DialogTitle>{mode === 'reply' ? `Reply to ${row.author}` : `Edit ${row.author}'s comment`}</DialogTitle>
                    <DialogDescription>
                        {mode === 'reply' ? (row.status === 'pending' ? 'Your reply is published at once, and approves this comment.' : 'Your reply is published at once, under your name.') : 'Fix a typo or remove a link.'}
                    </DialogDescription>
                </DialogHeader>
                {mode === 'reply' && <p className="cms:max-h-32 cms:overflow-auto cms:whitespace-pre-wrap cms:text-sm cms:text-muted-foreground">{row.body}</p>}
                <Textarea aria-label={mode === 'reply' ? 'Your reply' : 'Comment'} rows={5} value={body} aria-invalid={error !== undefined}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)} />
                <FieldError message={error} />
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="button" disabled={body.trim() === '' || processing} onClick={save}>{mode === 'reply' ? 'Post reply' : 'Save'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
