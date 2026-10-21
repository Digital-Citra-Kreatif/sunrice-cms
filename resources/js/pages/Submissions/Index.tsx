import * as React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Download, Inbox, Plus, Trash2 } from 'lucide-react';
import { adminUrl, t } from '@sunrice/admin-sdk';
import {
    Button, Card, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, PageHeader, Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useBreadcrumbs,
} from '@sunrice/admin-sdk/ui';
import { useConfirm } from '@/components/Confirm.tsx';
import { formatDate } from '@/lib/entries.ts';

interface Row {
    id: number;
    locale: string;
    createdAt: string | null;
    rows: { handle: string; label: string; value: string; file: string | null }[];
    /** Who sent it, when kept (sunrice-cms.forms.visitor_details). */
    visitor: { ip: string | null; userAgent: string | null; referrer: string | null };
}

interface Props {
    form: { handle: string; title: string } | null;
    forms: { handle: string; title: string; count: number }[];
    submissions: { data: Row[]; total: number; from: number | null; to: number | null; prev_page_url: string | null; next_page_url: string | null } | null;
    can: { delete: boolean; export: boolean };
    /** No forms yet: where to create one (for those who may). */
    createForm?: string | null;
}

/** Columns the list shows; the rest are in the submission's dialog. */
const COLUMNS = 3;

export default function SubmissionsIndex({ form, forms, submissions, can, createForm = null }: Props) {
    useBreadcrumbs([{ label: t('Submissions'), href: adminUrl('cms/submissions') }, ...(form ? [{ label: form.title }] : [])]);
    const [open, setOpen] = React.useState<Row | null>(null);
    const [confirm, confirmDialog] = useConfirm();

    if (!form || !submissions) {
        return (
            <div className="cms:flex cms:flex-col cms:gap-4">
                <Head title={t('Submissions')} />
                <PageHeader title={t('Submissions')} description={t('What visitors send through the site\'s forms.')} />
                <Card className="cms:flex cms:flex-col cms:items-center cms:gap-3 cms:px-6 cms:py-14 cms:text-center">
                    <Inbox className="cms:size-8 cms:text-muted-foreground" />
                    <div className="cms:flex cms:flex-col cms:gap-1">
                        <p className="cms:font-medium">{t('No forms yet')}</p>
                        <p className="cms:max-w-sm cms:text-sm cms:text-muted-foreground">
                            {createForm ? t('Create a form, put it on a page, and what visitors send shows up here.') : t('Once someone creates a form and puts it on a page, what visitors send shows up here.')}
                        </p>
                    </div>
                    {createForm && <Button asChild><Link href={createForm}><Plus /> {t('Create a form')}</Link></Button>}
                </Card>
            </div>
        );
    }

    const columns = (submissions.data[0]?.rows ?? []).slice(0, COLUMNS);
    const remove = (row: Row) => confirm(t('Delete this submission for good? It can\'t be restored.'),
        () => router.delete(adminUrl(`cms/submissions/${row.id}`), { preserveScroll: true, onSuccess: () => setOpen(null) }));

    return (
        <div className="cms:flex cms:flex-col cms:gap-6">
            <Head title={t(':form submissions', { form: form.title })} />
            <PageHeader
                title={form.title}
                actions={submissions.total > 0 && can.export && (
                    <Button variant="outline" asChild>
                        <a href={adminUrl(`cms/forms/${form.handle}/submissions/export`)}><Download /> {t('Export CSV')}</a>
                    </Button>
                )}
            >
                {forms.length > 1 && (
                    <Select value={form.handle} onValueChange={(handle: string) => router.get(adminUrl(`cms/forms/${handle}/submissions`))}>
                        <SelectTrigger className="cms:w-56" aria-label={t('Form')}><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {forms.map((f) => <SelectItem key={f.handle} value={f.handle}>{f.title} ({f.count})</SelectItem>)}
                        </SelectContent>
                    </Select>
                )}
            </PageHeader>

            <Card className="cms:py-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('Sent')}</TableHead>
                            {columns.map((c) => <TableHead key={c.handle}>{c.label}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {submissions.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} className="cms:py-8 cms:text-center cms:text-muted-foreground">{t('Nothing sent yet.')}</TableCell>
                            </TableRow>
                        )}
                        {submissions.data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="cms:whitespace-nowrap">
                                    <button type="button" className="cms:font-medium cms:hover:underline" onClick={() => setOpen(row)}>{formatDate(row.createdAt)}</button>
                                </TableCell>
                                {columns.map((c) => (
                                    <TableCell key={c.handle} className="cms:max-w-64 cms:truncate">{row.rows.find((r) => r.handle === c.handle)?.value}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {submissions.total > 0 && (
                <div className="cms:flex cms:items-center cms:justify-between cms:text-sm cms:text-muted-foreground">
                    <span>{t(':from–:to of :total', { from: submissions.from, to: submissions.to, total: submissions.total })}</span>
                    <div className="cms:flex cms:gap-2">
                        <Button variant="outline" size="icon" aria-label={t('Previous page')} disabled={!submissions.prev_page_url}
                            onClick={() => submissions.prev_page_url && router.get(submissions.prev_page_url, {}, { preserveScroll: true })}><ChevronLeft /></Button>
                        <Button variant="outline" size="icon" aria-label={t('Next page')} disabled={!submissions.next_page_url}
                            onClick={() => submissions.next_page_url && router.get(submissions.next_page_url, {}, { preserveScroll: true })}><ChevronRight /></Button>
                    </div>
                </div>
            )}

            <Dialog open={open !== null} onOpenChange={(next: boolean) => !next && setOpen(null)}>
                <DialogContent className="cms:max-h-[85vh] cms:overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{form.title}</DialogTitle>
                        <DialogDescription>{t('Sent :date', { date: formatDate(open?.createdAt ?? null) })} · {open?.locale.toUpperCase()}</DialogDescription>
                    </DialogHeader>
                    <dl className="cms:flex cms:flex-col cms:gap-3 cms:text-sm">
                        {open?.rows.map((r) => (
                            <div key={r.handle}>
                                <dt className="cms:font-medium">{r.label}</dt>
                                <dd className="cms:whitespace-pre-wrap cms:break-words cms:text-muted-foreground">
                                    {r.file ? <a href={r.file} className="cms:underline cms:underline-offset-4 hover:cms:text-foreground" download>{r.value}</a> : (r.value || '—')}
                                </dd>
                            </div>
                        ))}
                    </dl>
                    {open && (open.visitor.ip || open.visitor.userAgent || open.visitor.referrer) && (
                        <dl className="cms:flex cms:flex-col cms:gap-3 cms:border-t cms:pt-3 cms:text-sm">
                            {([[t('IP address'), open.visitor.ip], [t('Browser'), open.visitor.userAgent], [t('Sent from'), open.visitor.referrer]] as const).map(([label, value]) => value && (
                                <div key={label}>
                                    <dt className="cms:font-medium">{label}</dt>
                                    <dd className="cms:break-all cms:text-muted-foreground">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    )}
                    {can.delete && open && (
                        <DialogFooter>
                            <Button variant="destructive" onClick={() => remove(open)}><Trash2 /> {t('Delete')}</Button>
                        </DialogFooter>
                    )}
                </DialogContent>
            </Dialog>
            {confirmDialog}
        </div>
    );
}
