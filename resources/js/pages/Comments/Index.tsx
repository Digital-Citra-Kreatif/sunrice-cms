import * as React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PerPageSelect } from '@/components/data-table/PerPageSelect';
import { useBreadcrumbs } from '@/components/app/breadcrumbs';
import { CommentList, type AdminComment, type CommentAction } from '@/components/app/comment-list';
import { adminUrl } from '@/lib/route';
import { useCan } from '@/lib/can';
import { cn } from '@/lib/utils';
import type { Paginated, SharedProps } from '@/types';

type Status = 'all' | 'pending' | 'approved' | 'spam' | 'trash';

interface Props {
    comments: Paginated<AdminComment> & { prev_page_url: string | null; next_page_url: string | null };
    counts: Record<Status, number>;
    filters: { status: Status; entry: number | null; collection: string | null; search: string };
    entry: { id: number; title: string; edit_url: string } | null;
    collections: { handle: string; title: string }[];
}

const TABS: { value: Status; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'spam', label: 'Spam' },
    { value: 'trash', label: 'Trash' },
];

const CONFIRM: Partial<Record<CommentAction, (count: number) => string>> = {
    delete: (count) => (count === 1 ? 'Delete this comment for good? Its replies stay, without it.' : `Delete ${count} comments for good?`),
};

export default function CommentsIndex({ comments, counts, filters, entry, collections }: Props) {
    const { adminPath } = usePage<SharedProps>().props;
    const can = useCan();
    const canModerate = can('sunrice.comments.moderate');
    const canDelete = can('sunrice.comments.delete');
    const [search, setSearch] = React.useState(filters.search);
    const [selected, setSelected] = React.useState<number[]>([]);

    useBreadcrumbs([{ label: 'Comments' }]);

    // A new page or filter starts with nothing selected.
    React.useEffect(() => setSelected([]), [comments.current_page, filters.status, filters.entry, filters.collection, filters.search]);

    const visit = (changes: Partial<Props['filters']>) => {
        const next = { ...filters, ...changes };
        router.get(adminUrl('comments', adminPath), Object.fromEntries(Object.entries({
            status: next.status === 'all' ? undefined : next.status,
            entry: next.entry ?? undefined,
            collection: next.collection ?? undefined,
            search: next.search || undefined,
        }).filter(([, v]) => v !== undefined)) as Record<string, string>, { preserveState: true, preserveScroll: true });
    };

    const run = (ids: number[], action: CommentAction) => {
        const confirmText = CONFIRM[action]?.(ids.length);
        if (confirmText && !window.confirm(confirmText)) return;
        const options = { preserveScroll: true, onSuccess: () => setSelected([]) };
        if (ids.length === 1) {
            router.post(adminUrl(`comments/${ids[0]}/moderate`, adminPath), { action }, options);
        } else {
            router.post(adminUrl('comments/bulk', adminPath), { action, ids }, options);
        }
    };

    const save = (url: string, method: 'post' | 'put', body: string) => new Promise<boolean>((resolve) => {
        router[method](adminUrl(url, adminPath), { body }, {
            preserveScroll: true,
            onSuccess: () => resolve(true),
            onError: () => resolve(false),
        });
    });

    const allSelected = comments.data.length > 0 && selected.length === comments.data.length;
    const trash = filters.status === 'trash';

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="sunrice-page-title">Comments</h1>
            </div>

            <nav className="flex flex-wrap gap-1 border-b" aria-label="Status">
                {TABS.map((tab) => (
                    <button
                        key={tab.value}
                        type="button"
                        onClick={() => visit({ status: tab.value })}
                        className={cn(
                            '-mb-px border-b-2 px-3 py-2 text-sm',
                            filters.status === tab.value ? 'border-foreground font-medium' : 'border-transparent text-muted-foreground hover:text-foreground',
                        )}
                    >
                        {tab.label} <span className="text-xs text-muted-foreground">{counts[tab.value]}</span>
                    </button>
                ))}
            </nav>

            <div className="flex flex-wrap items-center gap-2">
                <Input
                    placeholder="Search text, name or email…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && visit({ search })}
                    className="w-full sm:max-w-xs"
                />
                {collections.length > 1 && (
                    <Select value={filters.collection ?? 'all'} onValueChange={(v) => visit({ collection: v === 'all' ? null : v })}>
                        <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All collections</SelectItem>
                            {collections.map((c) => <SelectItem key={c.handle} value={c.handle}>{c.title}</SelectItem>)}
                        </SelectContent>
                    </Select>
                )}
                {entry && (
                    <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm">
                        On <Link href={entry.edit_url} className="font-medium hover:underline">{entry.title}</Link>
                        <button type="button" aria-label="Show every entry's comments" onClick={() => visit({ entry: null })} className="text-muted-foreground hover:text-foreground">
                            <X className="size-3.5" />
                        </button>
                    </span>
                )}
            </div>

            {(canModerate || canDelete) && comments.data.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <label className="flex items-center gap-2">
                        <Checkbox checked={allSelected} onCheckedChange={(c) => setSelected(c ? comments.data.map((x) => x.id) : [])} />
                        {selected.length > 0 ? `${selected.length} selected` : 'Select all'}
                    </label>
                    {selected.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {canModerate && !trash && (
                                <>
                                    <Button size="sm" variant="outline" onClick={() => run(selected, 'approve')}>Approve</Button>
                                    <Button size="sm" variant="outline" onClick={() => run(selected, 'pending')}>Unapprove</Button>
                                    <Button size="sm" variant="outline" onClick={() => run(selected, 'spam')}>Spam</Button>
                                </>
                            )}
                            {canDelete && !trash && <Button size="sm" variant="outline" className="text-destructive" onClick={() => run(selected, 'trash')}>Trash</Button>}
                            {canDelete && trash && <Button size="sm" variant="outline" onClick={() => run(selected, 'restore')}>Restore</Button>}
                            {canDelete && (trash || filters.status === 'spam') && (
                                <Button size="sm" variant="outline" className="text-destructive" onClick={() => run(selected, 'delete')}>Delete forever</Button>
                            )}
                        </div>
                    )}
                </div>
            )}

            <CommentList
                comments={comments.data}
                canModerate={canModerate}
                canDelete={canDelete}
                showEntry={!entry}
                selected={canModerate || canDelete ? selected : undefined}
                onSelect={canModerate || canDelete ? setSelected : undefined}
                onAction={(comment, action) => run([comment.id], action)}
                onEdit={(comment, body) => save(`comments/${comment.id}`, 'put', body)}
                onReply={(comment, body) => save(`comments/${comment.id}/reply`, 'post', body)}
                empty={filters.search ? 'No comments match your search.' : filters.status === 'pending' ? 'Nothing waiting for approval.' : 'No comments here yet.'}
            />

            {comments.total > 10 && (
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span>Page {comments.current_page} of {comments.last_page} · {comments.total} comments</span>
                        <PerPageSelect tableKey="comments" value={comments.per_page} />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled={!comments.prev_page_url} onClick={() => comments.prev_page_url && router.get(comments.prev_page_url, {}, { preserveScroll: true })}>Previous</Button>
                        <Button variant="outline" size="sm" disabled={!comments.next_page_url} onClick={() => comments.next_page_url && router.get(comments.next_page_url, {}, { preserveScroll: true })}>Next</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
