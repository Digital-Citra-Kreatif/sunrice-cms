import { Head, Link, router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { t } from '@imajiner/admin-sdk';
import { Button, Card, PageHeader, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useBreadcrumbs } from '@imajiner/admin-sdk/ui';
import { useConfirm } from '@/components/Confirm.tsx';

export interface StructureRow {
    id: number;
    handle: string;
    title: string;
    fields: number;
    usedBy?: string[];
}

/** The Blueprints and Fieldsets lists. */
export function StructureList({ kind, base, rows, intro }: { kind: 'blueprint' | 'fieldset'; base: string; rows: StructureRow[]; intro: string }) {
    const blueprint = kind === 'blueprint';
    const plural = blueprint ? t('Blueprints') : t('Fieldsets');
    useBreadcrumbs([{ label: plural }]);
    const [confirm, confirmDialog] = useConfirm();

    return (
        <div className="cms:flex cms:flex-col cms:gap-6">
            <Head title={plural} />
            {confirmDialog}
            <PageHeader title={plural} description={intro} actions={<Button asChild><Link href={`${base}/create`}><Plus /> {blueprint ? t('New blueprint') : t('New fieldset')}</Link></Button>} />
            <Card className="cms:py-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('Title')}</TableHead>
                            <TableHead>{t('Handle')}</TableHead>
                            <TableHead>{t('Fields')}</TableHead>
                            {rows.some((row) => row.usedBy) && <TableHead>{t('Used by')}</TableHead>}
                            <TableHead className="cms:w-12"><span className="cms:sr-only">{t('Actions')}</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.length === 0 && (
                            <TableRow><TableCell colSpan={5} className="cms:py-8 cms:text-center cms:text-muted-foreground">{blueprint ? t('No blueprints yet.') : t('No fieldsets yet.')}</TableCell></TableRow>
                        )}
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell><Link href={`${base}/${row.handle}/edit`} className="cms:font-medium cms:hover:underline">{row.title}</Link></TableCell>
                                <TableCell><code className="cms:text-xs">{row.handle}</code></TableCell>
                                <TableCell>{row.fields}</TableCell>
                                {row.usedBy && <TableCell className="cms:text-muted-foreground">{row.usedBy.join(', ') || '—'}</TableCell>}
                                <TableCell>
                                    <Button variant="ghost" size="icon" className="cms:size-8 cms:text-destructive" aria-label={t('Delete :title', { title: row.title })}
                                        onClick={() => confirm(blueprint ? t('Delete the blueprint ":title"? Content keeps its values.', { title: row.title }) : t('Delete the fieldset ":title"? Content keeps its values.', { title: row.title }),
                                            () => router.delete(`${base}/${row.handle}`, { preserveScroll: true }))}>
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
