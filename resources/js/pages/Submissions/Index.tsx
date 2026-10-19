import * as React from 'react';
import { Head, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Download, Trash2 } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import {
    Button, Card, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useBreadcrumbs,
} from '@sunrice/admin-sdk/ui';
import { useConfirm } from '@/components/Confirm.tsx';
import { formatDate } from '@/lib/entries.ts';

interface Row {
    id: number;
    locale: string;
    createdAt: string | null;
    rows: { handle: string; label: string; value: string; file: string | null }[];
}

interface Props {
    form: { handle: string; title: string } | null;
    forms: { handle: string; title: string; count: number }[];
    submissions: { data: Row[]; total: number; from: number | null; to: number | null; prev_page_url: string | null; next_page_url: string | null } | null;
    can: { delete: boolean };
}

/** Columns the list shows; the rest are in the submission's dialog. */
const COLUMNS = 3;

export default function SubmissionsIndex({ form, forms, submissions, can }: Props) {
    useBreadcrumbs([{ label: 'Submissions', href: adminUrl('cms/submissions') }, ...(form ? [{ label: form.title }] : [])]);
    const [open, setOpen] = React.useState<Row | null>(null);
    const [confirm, confirmDialog] = useConfirm();

    if (!form || !submissions) {
        return (
            <div className="cms:flex cms:flex-col cms:gap-4">
                <Head title="Submissions" />
                <h1 className="cms:text-2xl cms:font-medium cms:tracking-tight">Submissions</h1>
                <p className="cms:text-muted-foreground">There are no forms yet. Create one under Structure → Forms and put it on a page; what visitors send shows up here.</p>
            </div>
        );
    }

    const columns = (submissions.data[0]?.rows ?? []).slice(0, COLUMNS);
    const remove = (row: Row) => confirm(`Delete this submission for good? It can't be restored.`,
        () => router.delete(adminUrl(`cms/submissions/${row.id}`), { preserveScroll: true, onSuccess: () => setOpen(null) }));

    return (
        <div className="cms:flex cms:flex-col cms:gap-6">
            <Head title={`${form.title} submissions`} />
            <div className="cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4">
                <div className="cms:flex cms:items-center cms:gap-3">
                    <h1 className="cms:text-2xl cms:font-medium cms:tracking-tight">{form.title}</h1>
                    {forms.length > 1 && (
                        <Select value={form.handle} onValueChange={(handle: string) => router.get(adminUrl(`cms/forms/${handle}/submissions`))}>
                            <SelectTrigger className="cms:w-56" aria-label="Form"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {forms.map((f) => <SelectItem key={f.handle} value={f.handle}>{f.title} ({f.count})</SelectItem>)}
                            </SelectContent>
                        </Select>
                    )}
                </div>
                {submissions.total > 0 && (
                    <Button variant="outline" asChild>
                        <a href={adminUrl(`cms/forms/${form.handle}/submissions/export`)}><Download /> Export CSV</a>
                    </Button>
                )}
            </div>

            <Card className="cms:py-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Sent</TableHead>
                            {columns.map((c) => <TableHead key={c.handle}>{c.label}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {submissions.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} className="cms:py-8 cms:text-center cms:text-muted-foreground">Nothing sent yet.</TableCell>
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
                    <span>{submissions.from}–{submissions.to} of {submissions.total}</span>
                    <div className="cms:flex cms:gap-2">
                        <Button variant="outline" size="icon" aria-label="Previous page" disabled={!submissions.prev_page_url}
                            onClick={() => submissions.prev_page_url && router.get(submissions.prev_page_url, {}, { preserveScroll: true })}><ChevronLeft /></Button>
                        <Button variant="outline" size="icon" aria-label="Next page" disabled={!submissions.next_page_url}
                            onClick={() => submissions.next_page_url && router.get(submissions.next_page_url, {}, { preserveScroll: true })}><ChevronRight /></Button>
                    </div>
                </div>
            )}

            <Dialog open={open !== null} onOpenChange={(next: boolean) => !next && setOpen(null)}>
                <DialogContent className="cms:max-h-[85vh] cms:overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{form.title}</DialogTitle>
                        <DialogDescription>Sent {formatDate(open?.createdAt ?? null)} · {open?.locale.toUpperCase()}</DialogDescription>
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
                    {can.delete && open && (
                        <DialogFooter>
                            <Button variant="destructive" onClick={() => remove(open)}><Trash2 /> Delete</Button>
                        </DialogFooter>
                    )}
                </DialogContent>
            </Dialog>
            {confirmDialog}
        </div>
    );
}
