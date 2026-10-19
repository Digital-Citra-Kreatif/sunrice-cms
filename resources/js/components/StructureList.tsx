import { Head, Link, router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { Button, Card, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useBreadcrumbs } from '@sunrice/admin-sdk/ui';
import { useConfirm } from '@/components/Confirm.tsx';

export interface StructureRow {
    id: number;
    handle: string;
    title: string;
    fields: number;
    usedBy?: string[];
}

/** The Blueprints and Fieldsets lists. */
export function StructureList({ noun, base, rows, intro }: { noun: string; base: string; rows: StructureRow[]; intro: string }) {
    const plural = `${noun}s`;
    useBreadcrumbs([{ label: plural }]);
    const [confirm, confirmDialog] = useConfirm();

    return (
        <div className="flex flex-col gap-6">
            <Head title={plural} />
            {confirmDialog}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-medium tracking-tight">{plural}</h1>
                    <p className="text-sm text-muted-foreground">{intro}</p>
                </div>
                <Button asChild><Link href={`${base}/create`}><Plus /> New {noun.toLowerCase()}</Link></Button>
            </div>
            <Card className="py-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Handle</TableHead>
                            <TableHead>Fields</TableHead>
                            {rows.some((row) => row.usedBy) && <TableHead>Used by</TableHead>}
                            <TableHead className="w-12"><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.length === 0 && (
                            <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">No {plural.toLowerCase()} yet.</TableCell></TableRow>
                        )}
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell><Link href={`${base}/${row.id}/edit`} className="font-medium hover:underline">{row.title}</Link></TableCell>
                                <TableCell><code className="text-xs">{row.handle}</code></TableCell>
                                <TableCell>{row.fields}</TableCell>
                                {row.usedBy && <TableCell className="text-muted-foreground">{row.usedBy.join(', ') || '—'}</TableCell>}
                                <TableCell>
                                    <Button variant="ghost" size="icon" className="size-8 text-destructive" aria-label={`Delete ${row.title}`}
                                        onClick={() => confirm(`Delete the ${noun.toLowerCase()} "${row.title}"? Content keeps its values.`,
                                            () => router.delete(`${base}/${row.id}`, { preserveScroll: true }))}>
                                        <Trash2 />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
