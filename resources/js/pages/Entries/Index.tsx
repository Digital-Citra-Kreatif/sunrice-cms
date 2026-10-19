import * as React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import {
    Badge, Button, Card, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useBreadcrumbs,
} from '@sunrice/admin-sdk/ui';
import { type EntryLocale, type EntryStatus, formatDate, statusLabel } from '@/lib/entries.ts';

interface Row {
    id: number;
    title: string;
    slug: string;
    status: EntryStatus;
    publishedAt: string | null;
    updatedAt: string | null;
    locales: EntryLocale[];
}

interface Props {
    collection: { handle: string; title: string; dated: boolean } | null;
    collections: { handle: string; title: string }[];
    entries: { data: Row[]; total: number; from: number | null; to: number | null; prev_page_url: string | null; next_page_url: string | null } | null;
    query: { search: string; trashed: boolean };
    can?: { create: boolean };
}

export default function EntriesIndex({ collection, collections, entries, query, can }: Props) {
    useBreadcrumbs([{ label: 'Entries', href: adminUrl('cms/entries') }, ...(collection ? [{ label: collection.title }] : [])]);
    const [search, setSearch] = React.useState(query.search);
    const base = collection ? adminUrl(`cms/collections/${collection.handle}/entries`) : '';

    const visit = (changes: Partial<{ search: string; trashed: boolean }>) => {
        const params = { ...query, ...changes };
        router.get(base, { ...(params.search ? { search: params.search } : {}), ...(params.trashed ? { trashed: 1 } : {}) },
            { preserveState: true, preserveScroll: true, replace: true });
    };

    React.useEffect(() => {
        if (search === query.search) return;
        const timer = window.setTimeout(() => visit({ search }), 300);
        return () => window.clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    if (!collection || !entries) {
        return (
            <div className="cms:flex cms:flex-col cms:gap-4">
                <Head title="Entries" />
                <h1 className="cms:text-2xl cms:font-medium cms:tracking-tight">Entries</h1>
                <p className="cms:text-muted-foreground">There are no collections yet. Create one under Structure → Collections, then come back to write its entries.</p>
            </div>
        );
    }

    return (
        <div className="cms:flex cms:flex-col cms:gap-6">
            <Head title={collection.title} />
            <div className="cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4">
                <div className="cms:flex cms:items-center cms:gap-3">
                    <h1 className="cms:text-2xl cms:font-medium cms:tracking-tight">{collection.title}</h1>
                    {collections.length > 1 && (
                        <Select value={collection.handle} onValueChange={(handle: string) => router.get(adminUrl(`cms/collections/${handle}/entries`))}>
                            <SelectTrigger className="cms:w-48" aria-label="Collection"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {collections.map((c) => <SelectItem key={c.handle} value={c.handle}>{c.title}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    )}
                </div>
                {can?.create && !query.trashed && (
                    <Button asChild><Link href={`${base}/create`}><Plus /> New entry</Link></Button>
                )}
            </div>

            <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-3">
                <div className="cms:relative cms:w-full cms:max-w-sm">
                    <Search className="cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" />
                    <Input className="cms:pl-9" placeholder="Search titles" aria-label="Search titles" value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
                </div>
                <Button variant={query.trashed ? 'secondary' : 'ghost'} size="sm" onClick={() => visit({ trashed: !query.trashed })}>
                    {query.trashed ? 'Back to entries' : 'Trash'}
                </Button>
            </div>

            <Card className="cms:py-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>{collection.dated ? 'Date' : 'Updated'}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entries.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="cms:py-8 cms:text-center cms:text-muted-foreground">
                                    {query.trashed ? 'The trash is empty.' : query.search ? 'Nothing matches.' : 'No entries yet.'}
                                </TableCell>
                            </TableRow>
                        )}
                        {entries.data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <Link href={adminUrl(`cms/entries/${row.id}/edit`)} className="cms:font-medium cms:hover:underline">{row.title}</Link>
                                    <div className="cms:text-xs cms:text-muted-foreground">/{row.slug}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-1">
                                        <Badge variant={row.status === 'published' ? 'default' : 'secondary'}>{statusLabel(row.status)}</Badge>
                                        {row.locales.length > 1 && row.locales.filter((l) => !l.main).map((l) => (
                                            <Badge key={l.code} variant={l.status === 'published' ? 'default' : 'outline'}
                                                className={l.status === null ? 'cms:opacity-50' : ''}
                                                title={`${l.code}: ${l.status === null ? 'not translated' : statusLabel(l.status)}`}>
                                                {l.code.toUpperCase()}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="cms:text-muted-foreground">{formatDate(collection.dated ? row.publishedAt : row.updatedAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {entries.total > 0 && (
                <div className="cms:flex cms:items-center cms:justify-between cms:text-sm cms:text-muted-foreground">
                    <span>{entries.from}–{entries.to} of {entries.total}</span>
                    <div className="cms:flex cms:gap-2">
                        <Button variant="outline" size="icon" aria-label="Previous page" disabled={!entries.prev_page_url}
                            onClick={() => entries.prev_page_url && router.get(entries.prev_page_url, {}, { preserveScroll: true })}><ChevronLeft /></Button>
                        <Button variant="outline" size="icon" aria-label="Next page" disabled={!entries.next_page_url}
                            onClick={() => entries.next_page_url && router.get(entries.next_page_url, {}, { preserveScroll: true })}><ChevronRight /></Button>
                    </div>
                </div>
            )}
        </div>
    );
}
