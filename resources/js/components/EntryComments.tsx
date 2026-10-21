import * as React from 'react';
import { router } from '@inertiajs/react';
import { Check, MessageSquareReply, ShieldAlert } from 'lucide-react';
import { adminUrl, t } from '@sunrice/admin-sdk';
import { Badge, Button, CollapsibleCard, Skeleton, Textarea } from '@sunrice/admin-sdk/ui';
import { formatDate } from '@/lib/entries.ts';

export interface EntryCommentsSummary {
    counts: { pending: number; approved: number; spam: number };
    latest: { id: number; author: string; excerpt: string; status: 'pending' | 'approved'; locale: string; reply: boolean; createdAt: string | null }[];
    canModerate: boolean;
}

/** Comment actions from the editor keep the form as it is (unsaved edits too). */
const keep = { preserveScroll: true, preserveState: true };

/**
 * The editor's comments card: counts, the latest five with Approve, Spam
 * and Reply, and a link to all of the entry's comments. Its data is a
 * deferred prop (undefined while loading).
 */
export function EntryComments({ entryId, comments }: { entryId: number; comments: EntryCommentsSummary | undefined }) {
    const [replying, setReplying] = React.useState<number | null>(null);
    const [body, setBody] = React.useState('');
    const [sending, setSending] = React.useState(false);
    const status = (id: number, value: 'approved' | 'spam') => router.post(adminUrl(`cms/comments/${id}/status`), { status: value }, keep);
    const reply = (id: number) => router.post(adminUrl(`cms/comments/${id}/reply`), { body }, {
        ...keep,
        onStart: () => setSending(true),
        onFinish: () => setSending(false),
        onSuccess: () => { setReplying(null); setBody(''); },
    });

    return (
        <CollapsibleCard title={t('Comments')} titleClassName="cms:text-base" storageKey="cms:entry:comments" contentClassName="cms:flex cms:flex-col cms:gap-3 cms:text-sm"
            headerAction={comments && comments.counts.pending > 0 ? <Badge>{t(':count pending', { count: comments.counts.pending })}</Badge> : undefined}>
            {!comments ? (
                <div className="cms:flex cms:flex-col cms:gap-2"><Skeleton className="cms:h-10" /><Skeleton className="cms:h-10" /></div>
            ) : (
                <>
                    <p className="cms:text-muted-foreground">
                        {t(':approved approved · :pending pending · :spam spam', { approved: comments.counts.approved, pending: comments.counts.pending, spam: comments.counts.spam })}
                    </p>
                    {comments.latest.length === 0 && <p className="cms:text-muted-foreground">{t('No comments yet.')}</p>}
                    {comments.latest.map((comment) => (
                        <div key={comment.id} className="cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0">
                            <div className="cms:flex cms:items-center cms:gap-2">
                                <span className="cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium">{comment.author}</span>
                                {comment.status === 'pending' && <Badge variant="outline">{t('Pending')}</Badge>}
                            </div>
                            <p className="cms:line-clamp-3 cms:break-words cms:whitespace-pre-line">{comment.excerpt}</p>
                            <div className="cms:text-xs cms:text-muted-foreground">{formatDate(comment.createdAt)}{comment.reply ? ` · ${t('a reply')}` : ''}</div>
                            {comments.canModerate && (
                                <div className="cms:flex cms:flex-wrap cms:gap-1">
                                    {comment.status === 'pending' && (
                                        <Button type="button" variant="outline" size="sm" onClick={() => status(comment.id, 'approved')}><Check /> {t('Approve')}</Button>
                                    )}
                                    <Button type="button" variant="ghost" size="sm" onClick={() => status(comment.id, 'spam')}><ShieldAlert /> {t('Spam')}</Button>
                                    <Button type="button" variant="ghost" size="sm" aria-expanded={replying === comment.id}
                                        onClick={() => { setReplying(replying === comment.id ? null : comment.id); setBody(''); }}>
                                        <MessageSquareReply /> {t('Reply')}
                                    </Button>
                                </div>
                            )}
                            {replying === comment.id && (
                                <div className="cms:flex cms:flex-col cms:gap-2">
                                    <Textarea aria-label={t('Reply to :author', { author: comment.author })} rows={3} value={body}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)} />
                                    <div className="cms:flex cms:gap-2">
                                        <Button type="button" size="sm" disabled={body.trim() === '' || sending} onClick={() => reply(comment.id)}>{t('Post reply')}</Button>
                                        <Button type="button" variant="ghost" size="sm" onClick={() => setReplying(null)}>{t('Cancel')}</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <a href={adminUrl(`cms/comments?entry=${entryId}`)} className="cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline">
                        {t('All comments on this entry')}
                    </a>
                </>
            )}
        </CollapsibleCard>
    );
}
