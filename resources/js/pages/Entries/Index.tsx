import * as React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Columns3, Compass, Download, ExternalLink, LayoutList, Plus, Search, X,
} from 'lucide-react';
import { useConfirm } from '@/components/Confirm.tsx';
import { EntryReorderList } from '@/components/EntryReorderList.tsx';
import { adminUrl } from '@sunrice/admin-sdk';
import {
    Badge, Button, Card, Checkbox, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuTrigger, Input, PageHeader, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Table,
    TableBody, TableCell, TableHead, TableHeader, TableRow, useBreadcrumbs, useTablePreferences,
} from '@sunrice/admin-sdk/ui';
import { type EntryLocale, type EntryStatus, formatDate, localeName, statusLabel } from '@/lib/entries.ts';
import {
    activeFilters, type EntryListQuery, entryListParams, entryListQueryString, nextSort, sortDirection,
} from '@/lib/entry-list.ts';

interface Row {
    id: number;
    title: string;
    slug: string;
    status: EntryStatus;
    publishedAt: string | null;
    updatedAt: string | null;
    createdAt: string | null;
    author: string | null;
    locales: EntryLocale[];
    /** The parent's title and id, in hierarchical collections. */
    parent?: string | null;
    parentId?: number | null;
    /** The visible field columns' text, by key ("field.price"). */
    cells: Record<string, string | null>;
}

interface Column {
    key: string;
    label: string;
    sortable: boolean;
    /** A blueprint field's column. */
    field: boolean;
}

interface Option {
    value: string;
    label: string;
}

interface Props {
    collection: { handle: string; title: string; dated: boolean; ordered?: boolean; listing?: boolean } | null;
    collections: { handle: string; title: string }[];
    entries: {
        data: Row[];
        total: number;
        from: number | null;
        to: number | null;
        currentPage: number;
        lastPage: number;
        prev_page_url: string | null;
        next_page_url: string | null;
    } | null;
    query: EntryListQuery | null;
    columns?: Column[];
    filters?: {
        authors: Option[];
        taxonomies: { handle: string; title: string; terms: (Option & { depth: number })[] }[];
        locales: string[];
    };
    links?: { group: string; label: string; href: string; external?: boolean }[];
    /** The collection's manual order, unfiltered: Move up and Move down. */
    manualOrder?: boolean;
    perPageOptions?: number[];
    preferencesKey?: string;
    can?: { create: boolean; update?: boolean; publish?: boolean; delete?: boolean; export?: boolean };
}

const ALL = '__all';
const STATUSES: { value: string; label: string }[] = [
    { value: 'draft', label: 'Drafts' },
    { value: 'published', label: 'Published' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'trashed', label: 'Trash' },
];

export default function EntriesIndex(props: Props) {
    const { collection, entries, query } = props;
    useBreadcrumbs([{ label: collection ? collection.title : 'Entries' }]);

    if (!collection || !entries || !query) {
        return (
            <div className="cms:flex cms:flex-col cms:gap-4">
                <Head title="Entries" />
                <PageHeader title="Entries" description="There are no collections yet. Create one under Structure → Collections, then come back to write its entries." />
            </div>
        );
    }

    return <EntryList {...props} collection={collection} entries={entries} query={query} />;
}

function EntryList({
    collection, collections, entries, query, columns = [], filters = { authors: [], taxonomies: [], locales: [] }, links = [],
    manualOrder = false, perPageOptions = [10, 25, 50, 100], preferencesKey, can,
}: Props & { collection: NonNullable<Props['collection']>; entries: NonNullable<Props['entries']>; query: EntryListQuery }) {
    const base = adminUrl(`cms/collections/${collection.handle}/entries`);
    const mainLocale = filters.locales[0] ?? query.locale;
    const [search, setSearch] = React.useState(query.search);
    const [selected, setSelected] = React.useState<number[]>([]);
    const [reordering, setReordering] = React.useState(false);
    const [confirm, confirmDialog] = useConfirm();
    const { setColumns, setPerPage } = useTablePreferences(preferencesKey ?? `table.cms.entries.${collection.handle}`, { columns: query.columns, perPage: query.perPage });
    React.useEffect(() => setSelected([]), [entries]);

    const trashed = query.status === 'trashed';
    const filtered = activeFilters(query) > 0;
    const visible = columns.filter((column) => query.columns.includes(column.key));
    const params = (changes: Partial<EntryListQuery> = {}) => entryListParams(query, changes, mainLocale);
    const visit = (changes: Partial<EntryListQuery>) => router.get(base, params(changes), { preserveState: true, preserveScroll: true, replace: true });

    React.useEffect(() => {
        if (search === query.search) return;
        const timer = window.setTimeout(() => visit({ search }), 300);
        return () => window.clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const bulkActions = trashed
        ? (can?.delete ? [{ action: 'restore', label: 'Restore' }, { action: 'delete', label: 'Delete for good', danger: true }] : [])
        : [
            ...(can?.publish ? [{ action: 'publish', label: 'Publish' }, { action: 'unpublish', label: 'Unpublish' }] : []),
            ...(can?.delete ? [{ action: 'trash', label: 'Move to the trash', danger: true }] : []),
        ];
    const runBulk = (action: string, label: string, danger = false) => {
        const go = () => router.post(`${base}/bulk`, { action, ids: selected }, { preserveScroll: true });
        if (danger) {
            confirm(`${label}: ${selected.length} ${selected.length === 1 ? 'entry' : 'entries'}?${action === 'delete' ? ' This can\'t be undone.' : ''}`, go);
        } else {
            go();
        }
    };

    const toggleColumn = async (key: string) => {
        const next = new Set(query.columns);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        await setColumns(columns.map((column) => column.key).filter((column) => next.has(column)));
        router.reload({ only: ['entries', 'query'] });
    };
    const clearFilters = () => {
        setSearch('');
        visit({ search: '', status: '', author: '', terms: {} });
    };

    const moveable = manualOrder && !!can?.update;
    // Dragging saves the order of what's shown, the rest of its level after it: only when the whole collection is on this page.
    const draggable = moveable && entries !== null && entries.lastPage <= 1 && entries.data.length > 1;
    const span = 1 + visible.length + (bulkActions.length > 0 ? 1 : 0) + (moveable ? 1 : 0);
    const exportQuery = entryListQueryString(params());
    const groups = [...new Set(links.map((link) => link.group))];

    return (
        <div className="cms:flex cms:flex-col cms:gap-6">
            <Head title={collection.title} />
            {confirmDialog}
            <PageHeader
                title={collection.title}
                actions={
                    <>
                        {links.length > 0 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline"><Compass /> Go to</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="cms:min-w-56">
                                    {groups.map((group, index) => (
                                        <React.Fragment key={group}>
                                            {index > 0 && <DropdownMenuSeparator />}
                                            <DropdownMenuLabel>{group}</DropdownMenuLabel>
                                            {links.filter((link) => link.group === group).map((link) => (
                                                <DropdownMenuItem key={link.href} asChild>
                                                    {link.external
                                                        ? <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <ExternalLink className="cms:ml-auto" /></a>
                                                        : <Link href={link.href}>{link.label}</Link>}
                                                </DropdownMenuItem>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                        {collection.listing && !trashed && (
                            <Button variant="outline" asChild><Link href={adminUrl(`cms/collections/${collection.handle}/listing/edit`)}><LayoutList /> Listing page</Link></Button>
                        )}
                        {entries.total > 0 && can?.export && (
                            <Button variant="outline" asChild><a href={`${base}/export${exportQuery ? `?${exportQuery}` : ''}`}><Download /> Export CSV</a></Button>
                        )}
                        {can?.create && !trashed && (
                            <Button asChild><Link href={`${base}/create`}><Plus /> New entry</Link></Button>
                        )}
                    </>
                }
            >
                {collections.length > 1 && (
                    <Select value={collection.handle} onValueChange={(handle: string) => router.get(adminUrl(`cms/collections/${handle}/entries`))}>
                        <SelectTrigger className="cms:w-48" aria-label="Collection"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {collections.map((c) => <SelectItem key={c.handle} value={c.handle}>{c.title}</SelectItem>)}
                        </SelectContent>
                    </Select>
                )}
            </PageHeader>

            <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-2">
                <div className="cms:relative cms:w-full cms:max-w-xs">
                    <Search className="cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" />
                    <Input className="cms:pl-9" placeholder="Search titles, slugs or #id" aria-label="Search entries" value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
                </div>
                <FilterSelect label="Status" value={query.status} options={STATUSES} onChange={(status) => visit({ status })} />
                {filters.authors.length > 0 && (
                    <FilterSelect label="Author" value={query.author} options={filters.authors} onChange={(author) => visit({ author })} />
                )}
                {filters.taxonomies.filter((taxonomy) => taxonomy.terms.length > 0).map((taxonomy) => (
                    <FilterSelect key={taxonomy.handle} label={taxonomy.title} value={query.terms[taxonomy.handle] ?? ''}
                        options={taxonomy.terms.map((term) => ({ value: term.value, label: `${'— '.repeat(term.depth)}${term.label}` }))}
                        onChange={(term) => visit({ terms: { ...query.terms, [taxonomy.handle]: term } })} />
                ))}
                {filters.locales.length > 1 && (
                    <Select value={query.locale} onValueChange={(locale: string) => visit({ locale })}>
                        <SelectTrigger className="cms:w-40" aria-label="Language"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {filters.locales.map((code) => <SelectItem key={code} value={code}>{localeName(code)}{code === mainLocale ? ' (main)' : ''}</SelectItem>)}
                        </SelectContent>
                    </Select>
                )}
                {filtered && <Button variant="ghost" size="sm" onClick={clearFilters}><X /> Clear</Button>}
                <div className="cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2">
                    {selected.length > 0 && bulkActions.length > 0 && (
                        <div role="toolbar" aria-label="Selected entries" className="cms:flex cms:flex-wrap cms:items-center cms:gap-2">
                            <span className="cms:text-sm cms:text-muted-foreground">{selected.length} selected</span>
                            {bulkActions.map((b) => (
                                <Button key={b.action} size="sm" variant={b.danger ? 'destructive' : 'outline'} onClick={() => runBulk(b.action, b.label, b.danger)}>{b.label}</Button>
                            ))}
                        </div>
                    )}
                    {draggable && (
                        <Button variant={reordering ? 'secondary' : 'outline'} aria-pressed={reordering} onClick={() => setReordering(!reordering)}>
                            <ArrowUpDown /> {reordering ? 'Done' : 'Reorder'}
                        </Button>
                    )}
                    {columns.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline"><Columns3 /> Columns</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="cms:max-h-96 cms:overflow-y-auto">
                                <DropdownMenuLabel>Columns</DropdownMenuLabel>
                                {columns.filter((column) => !column.field).map((column) => (
                                    <DropdownMenuCheckboxItem key={column.key} checked={query.columns.includes(column.key)}
                                        onSelect={(event: Event) => event.preventDefault()} onCheckedChange={() => void toggleColumn(column.key)}>
                                        {column.label}
                                    </DropdownMenuCheckboxItem>
                                ))}
                                {columns.some((column) => column.field) && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>Fields</DropdownMenuLabel>
                                        {columns.filter((column) => column.field).map((column) => (
                                            <DropdownMenuCheckboxItem key={column.key} checked={query.columns.includes(column.key)}
                                                onSelect={(event: Event) => event.preventDefault()} onCheckedChange={() => void toggleColumn(column.key)}>
                                                {column.label}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>

            {reordering && draggable ? <EntryReorderList collection={collection.handle} rows={entries.data} /> : <Card className="cms:gap-0 cms:overflow-hidden cms:py-0">
                <Table>
                    <TableHeader className="cms:bg-muted/60">
                        <TableRow className="cms:hover:bg-transparent">
                            {bulkActions.length > 0 && (
                                <TableHead className="cms:w-10">
                                    <Checkbox aria-label="Select all on this page" checked={entries.data.length > 0 && selected.length === entries.data.length}
                                        onCheckedChange={(on: boolean) => setSelected(on ? entries.data.map((r) => r.id) : [])} />
                                </TableHead>
                            )}
                            <SortableHead label="Title" sortKey="title" sort={query.sort} onSort={(sort) => visit({ sort })} />
                            {visible.map((column) => column.sortable
                                ? <SortableHead key={column.key} label={column.label} sortKey={column.key} sort={query.sort} onSort={(sort) => visit({ sort })} />
                                : <TableHead key={column.key}>{column.label}</TableHead>)}
                            {moveable && <TableHead className="cms:w-px"><span className="cms:sr-only">Order</span></TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entries.data.length === 0 && (
                            <TableRow className="cms:hover:bg-transparent">
                                <TableCell colSpan={span} className="cms:h-32 cms:text-center cms:text-muted-foreground">
                                    <EmptyState trashed={trashed} filtered={activeFilters(trashed ? { ...query, status: '' } : query) > 0} canCreate={!!can?.create} createUrl={`${base}/create`} onClear={clearFilters} />
                                </TableCell>
                            </TableRow>
                        )}
                        {entries.data.map((row, i) => (
                            <TableRow key={row.id} className="sunrice-row-in" style={{ '--i': i } as React.CSSProperties} data-state={selected.includes(row.id) ? 'selected' : undefined}>
                                {bulkActions.length > 0 && (
                                    <TableCell>
                                        <Checkbox aria-label={`Select ${row.title}`} checked={selected.includes(row.id)}
                                            onCheckedChange={(on: boolean) => setSelected(on ? [...selected, row.id] : selected.filter((id) => id !== row.id))} />
                                    </TableCell>
                                )}
                                <TableCell>
                                    <Link href={adminUrl(`cms/collections/${collection.handle}/entries/${row.id}/edit${query.locale !== mainLocale ? `?locale=${encodeURIComponent(query.locale)}` : ''}`)}
                                        className="cms:font-medium cms:underline-offset-4 cms:hover:underline">{row.title}</Link>
                                    {(!query.columns.includes('slug') || row.parent) && (
                                        <div className="cms:text-xs cms:text-muted-foreground">
                                            {!query.columns.includes('slug') && `/${row.slug}`}{row.parent ? `${query.columns.includes('slug') ? '' : ' · '}under ${row.parent}` : ''}
                                        </div>
                                    )}
                                </TableCell>
                                {visible.map((column) => (
                                    <TableCell key={column.key} className={column.key === 'status' ? '' : 'cms:text-muted-foreground'}>
                                        <div className="cms:max-w-72 cms:truncate">
                                            <CellValue row={row} column={column} mainLocale={mainLocale} />
                                        </div>
                                    </TableCell>
                                ))}
                                {moveable && (
                                    <TableCell className="cms:w-px">
                                        <span className="cms:flex">
                                            <Button variant="ghost" size="icon" aria-label={`Move ${row.title} up`} onClick={() => router.post(adminUrl(`cms/entries/${row.id}/move`), { direction: 'up' }, { preserveScroll: true })}><ArrowUp /></Button>
                                            <Button variant="ghost" size="icon" aria-label={`Move ${row.title} down`} onClick={() => router.post(adminUrl(`cms/entries/${row.id}/move`), { direction: 'down' }, { preserveScroll: true })}><ArrowDown /></Button>
                                        </span>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground">
                    <div className="cms:flex cms:items-center cms:gap-4">
                        <span>{entries.total === 0 ? 'No entries' : `${entries.from}–${entries.to} of ${entries.total}`}</span>
                        <Select value={String(query.perPage)} onValueChange={(value: string) => { void setPerPage(Number(value)); visit({ perPage: Number(value) }); }}>
                            <SelectTrigger className="cms:h-8 cms:w-auto" aria-label="Entries per page"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {perPageOptions.map((option) => <SelectItem key={option} value={String(option)}>{option} per page</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    {entries.lastPage > 1 && (
                        <div className="cms:flex cms:items-center cms:gap-2">
                            <span>Page {entries.currentPage} of {entries.lastPage}</span>
                            <Button variant="outline" size="icon" className="cms:size-8" aria-label="Previous page" disabled={!entries.prev_page_url}
                                onClick={() => entries.prev_page_url && router.get(entries.prev_page_url, {}, { preserveScroll: true })}><ChevronLeft /></Button>
                            <Button variant="outline" size="icon" className="cms:size-8" aria-label="Next page" disabled={!entries.next_page_url}
                                onClick={() => entries.next_page_url && router.get(entries.next_page_url, {}, { preserveScroll: true })}><ChevronRight /></Button>
                        </div>
                    )}
                </div>
            </Card>}
        </div>
    );
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: Option[]; onChange: (value: string) => void }) {
    return (
        <Select value={value === '' ? ALL : value} onValueChange={(next: string) => onChange(next === ALL ? '' : next)}>
            <SelectTrigger className="cms:w-40" aria-label={label}><SelectValue placeholder={label} /></SelectTrigger>
            <SelectContent>
                <SelectItem value={ALL}>{label}: all</SelectItem>
                {options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
            </SelectContent>
        </Select>
    );
}

function SortableHead({ label, sortKey, sort, onSort }: { label: string; sortKey: string; sort: string; onSort: (sort: string) => void }) {
    const direction = sortDirection(sort, sortKey);

    return (
        <TableHead aria-sort={direction === 'asc' ? 'ascending' : direction === 'desc' ? 'descending' : undefined}>
            <button type="button" onClick={() => onSort(nextSort(sort, sortKey))}
                className="cms:-ml-2 cms:inline-flex cms:h-8 cms:items-center cms:gap-1 cms:rounded-md cms:px-2 cms:hover:bg-accent cms:hover:text-accent-foreground">
                {label}
                {direction === 'asc' ? <ArrowUp className="cms:size-3" /> : direction === 'desc' ? <ArrowDown className="cms:size-3" /> : <ArrowUpDown className="cms:size-3 cms:opacity-40" />}
            </button>
        </TableHead>
    );
}

function CellValue({ row, column, mainLocale }: { row: Row; column: Column; mainLocale: string }) {
    switch (column.key) {
        case 'slug':
            return <>/{row.slug}</>;
        case 'status':
            return (
                <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-1">
                    <Badge variant={row.status === 'published' ? 'success' : 'secondary'}>{statusLabel(row.status)}</Badge>
                    {row.locales.length > 1 && row.locales.filter((l) => !l.main).map((l) => (
                        <Badge key={l.code} variant={l.status === 'published' ? 'secondary' : 'outline'}
                            className={l.status === null ? 'cms:opacity-50' : l.outdated ? 'cms:ring-2 cms:ring-amber-500/60' : ''}
                            title={`${localeName(l.code)}: ${l.status === null ? 'not translated' : statusLabel(l.status)}${l.outdated ? ', outdated: the main language changed since' : ''}`}>
                            {l.code.toUpperCase()}{l.outdated && <span aria-hidden="true">·!</span>}
                        </Badge>
                    ))}
                </div>
            );
        case 'author':
            return <>{row.author ?? '—'}</>;
        case 'published_at':
            return <>{formatDate(row.publishedAt)}</>;
        case 'updated_at':
            return <>{formatDate(row.updatedAt)}</>;
        case 'created_at':
            return <>{formatDate(row.createdAt)}</>;
        default:
            return <span title={row.cells[column.key] ?? undefined}>{row.cells[column.key] ?? '—'}</span>;
    }
}

function EmptyState({ trashed, filtered, canCreate, createUrl, onClear }: { trashed: boolean; filtered: boolean; canCreate: boolean; createUrl: string; onClear: () => void }) {
    if (filtered) {
        return (
            <div className="cms:flex cms:flex-col cms:items-center cms:gap-2">
                <span>Nothing matches these filters.</span>
                <Button variant="outline" size="sm" onClick={onClear}><X /> Clear filters</Button>
            </div>
        );
    }
    if (trashed) return <>The trash is empty.</>;

    return (
        <div className="cms:flex cms:flex-col cms:items-center cms:gap-2">
            <span>No entries yet.</span>
            {canCreate && <Button size="sm" asChild><Link href={createUrl}><Plus /> Write the first one</Link></Button>}
        </div>
    );
}
