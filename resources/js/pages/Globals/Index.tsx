import { Link, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { adminUrl } from '@/lib/route';
import { useCan } from '@/lib/can';
import type { SharedProps } from '@/types';

interface Row { id: number; handle: string; title: string; group: string; blueprint: { id: number; title: string } | null }

export default function GlobalsIndex({ globals }: { globals: Row[] }) {
    const { adminPath } = usePage<SharedProps>().props;
    const can = useCan();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="sunrice-page-title">Globals & template parts</h1>
                {can('sunrice.globals.create') && (
                    <Button asChild><Link href={adminUrl('globals/create', adminPath)}><Plus className="mr-1 h-4 w-4" /> New global</Link></Button>
                )}
            </div>
            <Table>
                <TableHeader><TableRow><TableHead>Title</TableHead><TableHead className="max-md:hidden">Handle</TableHead><TableHead className="max-md:hidden">Group</TableHead><TableHead className="max-md:hidden">Blueprint</TableHead><TableHead className="w-24" /></TableRow></TableHeader>
                <TableBody>
                    {globals.map((g) => (
                        <TableRow key={g.id}>
                            <TableCell>{can('sunrice.globals.edit') ? (
                                    <Link className="font-medium hover:underline" href={adminUrl(`globals/${g.id}/edit`, adminPath)}>{g.title}</Link>
                                ) : <span className="font-medium">{g.title}</span>}</TableCell>
                            <TableCell className="max-md:hidden"><code className="text-xs">{g.handle}</code></TableCell>
                            <TableCell className="max-md:hidden"><Badge variant="secondary">{g.group}</Badge></TableCell>
                            <TableCell className="max-md:hidden">{g.blueprint?.title ?? '—'}</TableCell>
                            <TableCell>
                                {can('sunrice.globals.delete') && (
                                    <Button
                                        variant="ghost" size="sm" className="text-destructive"
                                        onClick={() => window.confirm(`Delete "${g.title}"?`) && router.delete(adminUrl(`globals/${g.id}`, adminPath))}
                                    >Delete</Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                    {globals.length === 0 && <TableRow><TableCell colSpan={5} className="h-24 text-center text-muted-foreground">No globals.</TableCell></TableRow>}
                </TableBody>
            </Table>
        </div>
    );
}
