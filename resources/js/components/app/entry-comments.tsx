import * as React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { CollapsibleCard } from '@/components/app/collapsible-card';
import { CommentList, type AdminComment, type CommentAction } from '@/components/app/comment-list';
import { Switch } from '@/components/ui/switch';
import { fetchJson, xsrfToken } from '@/lib/fetch-json';
import { adminUrl } from '@/lib/route';
import { useCan } from '@/lib/can';
import type { SharedProps } from '@/types';

interface Listing {
    comments: { data: AdminComment[]; total: number };
    counts: { all: number; pending: number; approved: number; spam: number; trash: number };
}

/**
 * The entry editor's Comments card: the entry's latest comments with
 * moderation, and the switch that closes them. Loads its list itself
 * (JSON), and acts without reloading the editor, so unsaved edits stay.
 */
export function EntryComments({ entryId, closed: initiallyClosed }: { entryId: number; closed: boolean }) {
    const { adminPath } = usePage<SharedProps>().props;
    const can = useCan();
    const [listing, setListing] = React.useState<Listing | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [closed, setClosed] = React.useState(initiallyClosed);
    const listUrl = adminUrl(`comments?entry=${entryId}&per_page=20`, adminPath);

    const load = React.useCallback(() => {
        fetchJson<Listing>(listUrl).then(setListing).catch((e: Error) => setError(e.message));
    }, [listUrl]);

    React.useEffect(load, [load]);

    const send = async (url: string, method: 'POST' | 'PUT', payload: Record<string, unknown>): Promise<boolean> => {
        const res = await fetch(adminUrl(url, adminPath), {
            method,
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'X-XSRF-TOKEN': xsrfToken() },
            body: JSON.stringify(payload),
        });
        const body = await res.json().catch(() => null);
        if (!res.ok) {
            const first = body?.errors ? Object.values(body.errors as Record<string, string[]>)[0]?.[0] : null;
            toast.error(first ?? body?.message ?? `Request failed (${res.status}).`);
            return false;
        }
        if (body?.message) toast.success(body.message);
        load();
        return true;
    };

    const act = (comment: AdminComment, action: CommentAction) => {
        if (action === 'delete' && !window.confirm('Delete this comment for good?')) return;
        void send(`comments/${comment.id}/moderate`, 'POST', { action });
    };

    const toggleClosed = async (value: boolean) => {
        setClosed(value);
        if (!(await send(`entries/${entryId}/comments-closed`, 'PUT', { closed: value }))) setClosed(!value);
    };

    const counts = listing?.counts;
    const description = counts
        ? `${counts.approved} approved${counts.pending ? ` · ${counts.pending} waiting` : ''}${counts.spam ? ` · ${counts.spam} spam` : ''}`
        : undefined;

    return (
        <CollapsibleCard title="Comments" description={description} storageKey="entry:comments" contentClassName="flex flex-col gap-3">
            {can('sunrice.comments.moderate') && (
                <label className="flex items-center gap-3 text-sm">
                    <Switch checked={!closed} onCheckedChange={(v) => toggleClosed(!v)} />
                    Accept new comments on this entry
                </label>
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
            {!listing && !error && <LoaderCircle className="size-4 animate-spin text-muted-foreground" />}
            {listing && (
                <>
                    <CommentList
                        comments={listing.comments.data}
                        canModerate={can('sunrice.comments.moderate')}
                        canDelete={can('sunrice.comments.delete')}
                        onAction={act}
                        onEdit={(comment, body) => send(`comments/${comment.id}`, 'PUT', { body })}
                        onReply={(comment, body) => send(`comments/${comment.id}/reply`, 'POST', { body })}
                        empty="No comments on this entry yet."
                    />
                    {listing.comments.total > listing.comments.data.length && (
                        <Link className="text-sm underline" href={adminUrl(`comments?entry=${entryId}`, adminPath)}>
                            See all {listing.comments.total} comments
                        </Link>
                    )}
                </>
            )}
        </CollapsibleCard>
    );
}
