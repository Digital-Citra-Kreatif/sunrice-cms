import * as React from 'react';
import { Check, CornerDownRight, ExternalLink, Pencil, RotateCcw, ShieldAlert, Trash2, Undo2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

export interface AdminComment {
    id: number;
    body: string;
    status: 'pending' | 'approved' | 'spam';
    trashed: boolean;
    author_name: string;
    author_email: string | null;
    user_id: number | null;
    locale: string;
    created_at: string | null;
    parent: { id: number; author_name: string } | null;
    entry: { id: number; title: string; collection: string | null; edit_url: string; url: string | null } | null;
}

export type CommentAction = 'approve' | 'pending' | 'spam' | 'trash' | 'restore' | 'delete';

interface Props {
    comments: AdminComment[];
    canModerate: boolean;
    canDelete: boolean;
    /** Show which entry each comment is on (the Comments page; not the entry's own card). */
    showEntry?: boolean;
    selected?: number[];
    onSelect?: (ids: number[]) => void;
    onAction: (comment: AdminComment, action: CommentAction) => void;
    onEdit: (comment: AdminComment, body: string) => Promise<boolean> | void;
    onReply: (comment: AdminComment, body: string) => Promise<boolean> | void;
    empty?: React.ReactNode;
}

const formatDate = (iso: string | null) => (iso ? new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '');

function StatusBadge({ comment }: { comment: AdminComment }) {
    if (comment.trashed) return <Badge variant="outline">Trash</Badge>;
    if (comment.status === 'pending') return <Badge variant="warning">Pending</Badge>;
    if (comment.status === 'spam') return <Badge variant="destructive">Spam</Badge>;
    return <Badge variant="success">Approved</Badge>;
}

/** Comments with their moderation actions, an inline reply box and editing. */
export function CommentList({ comments, canModerate, canDelete, showEntry = false, selected, onSelect, onAction, onEdit, onReply, empty }: Props) {
    const [editing, setEditing] = React.useState<{ id: number; mode: 'edit' | 'reply'; text: string } | null>(null);
    const [saving, setSaving] = React.useState(false);

    if (comments.length === 0) {
        return <p className="py-8 text-center text-sm text-muted-foreground">{empty ?? 'No comments.'}</p>;
    }

    const submit = async (comment: AdminComment) => {
        if (!editing || editing.text.trim().length < 2) return;
        setSaving(true);
        const result = await (editing.mode === 'edit' ? onEdit(comment, editing.text) : onReply(comment, editing.text));
        setSaving(false);
        if (result !== false) setEditing(null);
    };

    const toggle = (id: number, on: boolean) => onSelect?.(on ? [...(selected ?? []), id] : (selected ?? []).filter((s) => s !== id));

    return (
        <ul className="divide-y">
            {comments.map((comment) => {
                const open = editing?.id === comment.id ? editing : null;
                const act = (action: CommentAction, label: string, icon: React.ReactNode, className = '') => (
                    <Button type="button" variant="ghost" size="sm" className={`h-7 px-2 ${className}`} onClick={() => onAction(comment, action)}>
                        {icon}
                        {label}
                    </Button>
                );

                return (
                    <li key={comment.id} className="flex gap-3 py-4">
                        {onSelect && (
                            <Checkbox
                                className="mt-1"
                                aria-label={`Select comment by ${comment.author_name}`}
                                checked={(selected ?? []).includes(comment.id)}
                                onCheckedChange={(c) => toggle(comment.id, !!c)}
                            />
                        )}
                        <div className="min-w-0 flex-1 space-y-1.5">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                                <span className="font-medium">{comment.author_name}</span>
                                {comment.author_email && (
                                    <a className="text-muted-foreground hover:underline" href={`mailto:${comment.author_email}`}>{comment.author_email}</a>
                                )}
                                {comment.user_id !== null && <Badge variant="secondary">User</Badge>}
                                <StatusBadge comment={comment} />
                                <span className="text-xs text-muted-foreground" title={comment.created_at ?? ''}>{formatDate(comment.created_at)}</span>
                                <span className="text-xs text-muted-foreground uppercase">{comment.locale}</span>
                            </div>
                            {(comment.parent || (showEntry && comment.entry)) && (
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                    {comment.parent && (
                                        <span className="inline-flex items-center gap-1"><CornerDownRight className="size-3" /> Reply to {comment.parent.author_name}</span>
                                    )}
                                    {showEntry && comment.entry && (
                                        <span className="inline-flex items-center gap-1">
                                            On <a className="font-medium text-foreground hover:underline" href={comment.entry.edit_url}>{comment.entry.title}</a>
                                            {comment.entry.collection && <> · {comment.entry.collection}</>}
                                            {comment.entry.url && (
                                                <a href={`${comment.entry.url}#comment-${comment.id}`} target="_blank" rel="noreferrer" aria-label="View on the site" className="hover:text-foreground">
                                                    <ExternalLink className="size-3" />
                                                </a>
                                            )}
                                        </span>
                                    )}
                                </div>
                            )}
                            <p className="text-sm break-words whitespace-pre-wrap">{comment.body}</p>

                            {open && (
                                <div className="space-y-2 pt-1">
                                    <Textarea
                                        autoFocus
                                        rows={3}
                                        value={open.text}
                                        placeholder={open.mode === 'reply' ? `Reply to ${comment.author_name}…` : undefined}
                                        onChange={(e) => setEditing({ ...open, text: e.target.value })}
                                    />
                                    <div className="flex gap-2">
                                        <Button type="button" size="sm" disabled={saving || open.text.trim().length < 2} onClick={() => submit(comment)}>
                                            {open.mode === 'reply' ? 'Post reply' : 'Save'}
                                        </Button>
                                        <Button type="button" size="sm" variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
                                    </div>
                                    {open.mode === 'reply' && comment.status !== 'approved' && (
                                        <p className="text-xs text-muted-foreground">Replying approves this comment.</p>
                                    )}
                                </div>
                            )}

                            {!open && (canModerate || canDelete) && (
                                <div className="-ml-2 flex flex-wrap gap-0.5">
                                    {canModerate && !comment.trashed && (
                                        <>
                                            {comment.status !== 'approved' && act('approve', 'Approve', <Check />, 'text-emerald-700 dark:text-emerald-400')}
                                            {comment.status === 'approved' && act('pending', 'Unapprove', <Undo2 />)}
                                            {comment.status !== 'spam' && act('spam', 'Spam', <ShieldAlert />)}
                                            {comment.status !== 'spam' && (
                                                <Button type="button" variant="ghost" size="sm" className="h-7 px-2" onClick={() => setEditing({ id: comment.id, mode: 'reply', text: '' })}>
                                                    <CornerDownRight /> Reply
                                                </Button>
                                            )}
                                            <Button type="button" variant="ghost" size="sm" className="h-7 px-2" onClick={() => setEditing({ id: comment.id, mode: 'edit', text: comment.body })}>
                                                <Pencil /> Edit
                                            </Button>
                                        </>
                                    )}
                                    {canDelete && !comment.trashed && act('trash', 'Trash', <Trash2 />, 'text-destructive')}
                                    {canDelete && comment.trashed && act('restore', 'Restore', <RotateCcw />)}
                                    {canDelete && comment.trashed && act('delete', 'Delete forever', <Trash2 />, 'text-destructive')}
                                </div>
                            )}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
