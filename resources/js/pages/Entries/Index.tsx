import * as React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Columns3, Download, Plus, RotateCcw, Search, X,
} from 'lucide-react';
import { useConfirm } from '@/components/Confirm.tsx';
import { EntryReorderList } from '@/components/EntryReorderList.tsx';
import { adminUrl, t } from '@imajiner/admin-sdk';
import {
    Badge, Button, Card, Checkbox, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuTrigger, Input, PageHeader, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Table,
    TableBody, TableCell, TableHead, TableHeader, TableRow, TrashHint, useBreadcrumbs, useTablePreferences,
} from '@imajiner/admin-sdk/ui';
import { type EntryLocale, type EntryStatus, formatDate, localeName, statusLabel } from '@/lib/entries.ts';
import {
    activeFilters, type EntryListQuery, entryListParams, entryListQueryString, nextSort, sortDirection,
} from '@/lib/entry-list.ts';

interface Row {
    id: number;
    title: string;
    slug: string;
    /** Its address on the site (/team/anindya), or null when the collection has no pages. */
    path?: string | null;
    status: EntryStatus;
    /** In the trash (the status is what it was before). */
    trashed?: boolean;
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
    collection: { handle: string; title: string; dated: boolean; ordered?: boolean; hierarchical?: boolean; listing?: boolean } | null;
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
    /** Outside the trash, how many entries are in it. */
    trashedCount?: number;
    can?: { create: boolean; update?: boolean; publish?: boolean; delete?: boolean; export?: boolean };
}

const ALL = '__all';
const statuses = (): { value: string; label: string }[] => [
    { value: 'draft', label: t('Drafts') },
    { value: 'published', label: t('Published') },
    { value: 'scheduled', label: t('Scheduled') },
    { value: 'trashed', label: t('Trash') },
];

export default function EntriesIndex(props: Props) {
    const { collection, entries, query } = props;
    useBreadcrumbs([{ label: collection ? collection.title : t('Entries') }]);

    if (!collection || !entries || !query) {
        return (
            <div className="cms:flex cms:flex-col cms:gap-4">
                <Head title={t('Entries')} />
                <PageHeader title={t('Entries')} description={t('There are no collections yet. Create one under Structure → Collections, then come back to write its entries.')} />
            </div>
        );
    }

    return <EntryList {...props} collection={collection} entries={entries} query={query} />;
}

function EntryList({
    collection, collections, entries, query, columns = [], filters = { authors: [], taxonomies: [], locales: [] }, links = [],
    manualOrder = false, perPageOptions = [10, 25, 50, 100], preferencesKey, trashedCount = 0, can,
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
        ? (can?.delete ? [{ action: 'restore', label: t('Restore') }, { action: 'delete', label: t('Permanently delete'), danger: true }] : [])
        : [
            ...(can?.publish ? [{ action: 'publish', label: t('Publish') }, { action: 'unpublish', label: t('Unpublish') }] : []),
            ...(can?.delete ? [{ action: 'trash', label: t('Move to the trash'), danger: true }] : []),
        ];
    const runBulk = (action: string, label: string, danger = false) => {
        const go = () => router.post(`${base}/bulk`, { action, ids: selected }, { preserveScroll: true });
        if (danger) {
            const question = selected.length === 1 ? t(':action: 1 entry?', { action: label }) : t(':action: :count entries?', { action: label, count: selected.length });
            confirm(`${question} ${action === 'delete' ? t('This can\'t be undone.') : t('They come off the site; you can restore them.')}`,
                go, action === 'trash' ? t('Move to trash') : t('Delete'));
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
    // In the trash, each row has its own Restore (the bulk bar has it too).
    const restorable = trashed && !!can?.delete;
    const span = 1 + visible.length + (bulkActions.length > 0 ? 1 : 0) + (moveable ? 1 : 0) + (restorable ? 1 : 0);
    const exportQuery = entryListQueryString(params());

    return (
        <div className="cms:flex cms:flex-col cms:gap-6">
            <Head title={collection.title} />
            {confirmDialog}
            <PageHeader
                title={collection.title}
                primary={can?.create && !trashed && <Button asChild><Link href={`${base}/create`}><Plus /> {t('New entry')}</Link></Button>}
                menu={[
                    ...(entries.total > 0 && can?.export
                        ? [{ label: t('Export CSV'), href: `${base}/export${exportQuery ? `?${exportQuery}` : ''}`, download: true, icon: <Download /> }]
                        : []),
                    ...links.map((link) => ({ label: link.label, href: link.href, external: link.external, group: link.group })),
                ]}
            >
                {collections.length > 1 && (
                    <Select value={collection.handle} onValueChange={(handle: string) => router.get(adminUrl(`cms/collections/${handle}/entries`))}>
                        <SelectTrigger className="cms:w-48" aria-label={t('Collection')}><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {collections.map((c) => <SelectItem key={c.handle} value={c.handle}>{c.title}</SelectItem>)}
                        </SelectContent>
                    </Select>
                )}
            </PageHeader>

            <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-2">
                <div className="cms:relative cms:w-full cms:max-w-xs">
                    <Search className="cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" />
                    <Input className="cms:pl-9" placeholder={t('Search titles, slugs or #id')} aria-label={t('Search entries')} value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
                </div>
                <FilterSelect label={t('Status')} value={query.status} options={statuses()} onChange={(status) => visit({ status })} />
                {filters.authors.length > 0 && (
                    <FilterSelect label={t('Author')} value={query.author} options={filters.authors} onChange={(author) => visit({ author })} />
                )}
                {filters.taxonomies.filter((taxonomy) => taxonomy.terms.length > 0).map((taxonomy) => (
                    <FilterSelect key={taxonomy.handle} label={taxonomy.title} value={query.terms[taxonomy.handle] ?? ''}
                        options={taxonomy.terms.map((term) => ({ value: term.value, label: `${'— '.repeat(term.depth)}${term.label}` }))}
                        onChange={(term) => visit({ terms: { ...query.terms, [taxonomy.handle]: term } })} />
                ))}
                {filters.locales.length > 1 && (
                    <Select value={query.locale} onValueChange={(locale: string) => visit({ locale })}>
                        <SelectTrigger className="cms:w-auto cms:min-w-40 cms:max-w-72" aria-label={t('Language')}><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {filters.locales.map((code) => <SelectItem key={code} value={code}>{localeName(code)}{code === mainLocale ? ` ${t('(main)')}` : ''}</SelectItem>)}
                        </SelectContent>
                    </Select>
                )}
                {filtered && <Button variant="ghost" size="sm" onClick={clearFilters}><X /> {t('Clear')}</Button>}
                <div className="cms:ml-auto cms:flex cms:flex-wrap cms:items-center cms:gap-2">
                    {selected.length > 0 && bulkActions.length > 0 && (
                        <div role="toolbar" aria-label={t('Selected entries')} className="cms:flex cms:flex-wrap cms:items-center cms:gap-2">
                            <span className="cms:text-sm cms:text-muted-foreground">{t(':count selected', { count: selected.length })}</span>
                            {bulkActions.map((b) => (
                                <Button key={b.action} size="sm" variant={b.danger ? 'destructive' : 'outline'} onClick={() => runBulk(b.action, b.label, b.danger)}>{b.label}</Button>
                            ))}
                        </div>
                    )}
                    {draggable && (
                        <Button variant={reordering ? 'secondary' : 'outline'} aria-pressed={reordering} onClick={() => setReordering(!reordering)}>
                            <ArrowUpDown /> {reordering ? t('Done') : t('Reorder')}
                        </Button>
                    )}
                    {columns.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline"><Columns3 /> {t('Columns')}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="cms:max-h-96 cms:overflow-y-auto">
                                <DropdownMenuLabel>{t('Columns')}</DropdownMenuLabel>
                                {columns.filter((column) => !column.field).map((column) => (
                                    <DropdownMenuCheckboxItem key={column.key} checked={query.columns.includes(column.key)}
                                        onSelect={(event: Event) => event.preventDefault()} onCheckedChange={() => void toggleColumn(column.key)}>
                                        {column.label}
                                    </DropdownMenuCheckboxItem>
                                ))}
                                {columns.some((column) => column.field) && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>{t('Fields')}</DropdownMenuLabel>
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

            {reordering && draggable ? <EntryReorderList collection={collection.handle} rows={entries.data} hierarchical={collection.hierarchical === true} /> : <Card className="cms:gap-0 cms:overflow-hidden cms:py-0">
                <Table>
                    <TableHeader className="cms:bg-muted/60">
                        <TableRow className="cms:hover:bg-transparent">
                            {bulkActions.length > 0 && (
                                <TableHead className="cms:w-10">
                                    <Checkbox aria-label={t('Select all on this page')} checked={entries.data.length > 0 && selected.length === entries.data.length}
                                        onCheckedChange={(on: boolean) => setSelected(on ? entries.data.map((r) => r.id) : [])} />
                                </TableHead>
                            )}
                            <SortableHead label={t('Title')} sortKey="title" sort={query.sort} onSort={(sort) => visit({ sort })} />
                            {visible.map((column) => column.sortable
                                ? <SortableHead key={column.key} label={column.label} sortKey={column.key} sort={query.sort} onSort={(sort) => visit({ sort })} />
                                : <TableHead key={column.key}>{column.label}</TableHead>)}
                            {moveable && <TableHead className="cms:w-px"><span className="cms:sr-only">{t('Order')}</span></TableHead>}
                            {restorable && <TableHead className="cms:w-px"><span className="cms:sr-only">{t('Restore')}</span></TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entries.data.length === 0 && (
                            <TableRow className="cms:hover:bg-transparent">
                                <TableCell colSpan={span} className="cms:h-32 cms:text-center cms:text-muted-foreground">
                                    <EmptyState trashed={trashed} filtered={activeFilters(trashed ? { ...query, status: '' } : query) > 0} canCreate={!!can?.create} createUrl={`${base}/create`} onClear={clearFilters} />
                                    {!trashed && <div className="cms:mt-2"><TrashHint count={trashedCount} onShow={() => visit({ status: 'trashed' })} /></div>}
                                </TableCell>
                            </TableRow>
                        )}
                        {entries.data.map((row, i) => (
                            <TableRow key={row.id} className="sunrice-row-in" style={{ '--i': i } as React.CSSProperties} data-state={selected.includes(row.id) ? 'selected' : undefined}>
                                {bulkActions.length > 0 && (
                                    <TableCell>
                                        <Checkbox aria-label={t('Select :title', { title: row.title })} checked={selected.includes(row.id)}
                                            onCheckedChange={(on: boolean) => setSelected(on ? [...selected, row.id] : selected.filter((id) => id !== row.id))} />
                                    </TableCell>
                                )}
                                <TableCell>
                                    <Link href={adminUrl(`cms/collections/${collection.handle}/entries/${row.id}/edit${query.locale !== mainLocale ? `?locale=${encodeURIComponent(query.locale)}` : ''}`)}
                                        className="cms:font-medium cms:underline-offset-4 cms:hover:underline">{row.title}</Link>
                                    {((!query.columns.includes('slug') && row.path) || row.parent) && (
                                        <div className="cms:text-xs cms:text-muted-foreground">
                                            {[!query.columns.includes('slug') ? row.path : null, row.parent ? t('under :parent', { parent: row.parent }) : null].filter(Boolean).join(' · ')}
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
                                            <Button variant="ghost" size="icon" aria-label={t('Move :title up', { title: row.title })} onClick={() => router.post(adminUrl(`cms/entries/${row.id}/move`), { direction: 'up' }, { preserveScroll: true })}><ArrowUp /></Button>
                                            <Button variant="ghost" size="icon" aria-label={t('Move :title down', { title: row.title })} onClick={() => router.post(adminUrl(`cms/entries/${row.id}/move`), { direction: 'down' }, { preserveScroll: true })}><ArrowDown /></Button>
                                        </span>
                                    </TableCell>
                                )}
                                {restorable && (
                                    <TableCell className="cms:w-px">
                                        <Button variant="outline" size="sm" aria-label={`Restore ${row.title}`}
                                            onClick={() => router.post(adminUrl(`cms/entries/${row.id}/restore`), {}, { preserveScroll: true })}>
                                            <RotateCcw /> Restore
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4 cms:border-t cms:px-6 cms:py-3 cms:text-sm cms:text-muted-foreground">
                    <div className="cms:flex cms:items-center cms:gap-4">
                        <span>{entries.total === 0 ? t('No entries') : t(':from–:to of :total', { from: entries.from, to: entries.to, total: entries.total })}</span>
                        <Select value={String(query.perPage)} onValueChange={(value: string) => { void setPerPage(Number(value)); visit({ perPage: Number(value) }); }}>
                            <SelectTrigger className="cms:h-8 cms:w-auto" aria-label={t('Entries per page')}><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {perPageOptions.map((option) => <SelectItem key={option} value={String(option)}>{t(':count per page', { count: option })}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    {entries.lastPage > 1 && (
                        <div className="cms:flex cms:items-center cms:gap-2">
                            <span>{t('Page :page of :last', { page: entries.currentPage, last: entries.lastPage })}</span>
                            <Button variant="outline" size="icon" className="cms:size-8" aria-label={t('Previous page')} disabled={!entries.prev_page_url}
                                onClick={() => entries.prev_page_url && router.get(entries.prev_page_url, {}, { preserveScroll: true })}><ChevronLeft /></Button>
                            <Button variant="outline" size="icon" className="cms:size-8" aria-label={t('Next page')} disabled={!entries.next_page_url}
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
            <SelectTrigger className="cms:w-auto cms:min-w-40 cms:max-w-72" title={label} aria-label={label}><SelectValue placeholder={label} /></SelectTrigger>
            <SelectContent>
                <SelectItem value={ALL}>{t(':filter: all', { filter: label })}</SelectItem>
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
            return <span className="cms:font-mono">{row.slug}</span>;
        case 'status':
            return (
                <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-1">
                    {row.trashed
                        ? <Badge variant="outline" className="cms:text-destructive" title={t(':status before it was trashed', { status: statusLabel(row.status) })}>{t('Trashed')}</Badge>
                        : <Badge variant={row.status === 'published' ? 'success' : 'secondary'}>{statusLabel(row.status)}</Badge>}
                    {row.locales.length > 1 && row.locales.filter((l) => !l.main).map((l) => {
                        const badge = languageBadge(l);
                        return (
                            <Badge key={l.code} variant={badge.variant} className={badge.className}
                                title={t(':language: :status', { language: localeName(l.code), status: badge.title })} aria-label={t(':language: :status', { language: localeName(l.code), status: badge.title })}>
                                {l.code.toUpperCase()}{badge.word && <span className="cms:font-normal">{badge.word}</span>}
                            </Badge>
                        );
                    })}
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

/**
 * Another language's badge in the Status column, its state in words: a
 * plain code when published and current, else "draft", "scheduled",
 * "outdated" or "missing" beside it (not only in a tooltip).
 */
function languageBadge(l: EntryLocale): { variant: 'secondary' | 'outline' | 'warning'; className: string; word: string | null; title: string } {
    if (l.status === null) return { variant: 'outline', className: 'cms:border-dashed cms:text-muted-foreground', word: t('missing'), title: t('not translated') };
    if (l.outdated) return { variant: 'warning', className: '', word: t('outdated'), title: t(':status, outdated: the main language changed since', { status: statusLabel(l.status) }) };
    if (l.status === 'published') return { variant: 'secondary', className: '', word: null, title: t('Published') };

    return { variant: 'outline', className: '', word: l.status === 'scheduled' ? t('scheduled') : t('draft'), title: statusLabel(l.status) };
}

function EmptyState({ trashed, filtered, canCreate, createUrl, onClear }: { trashed: boolean; filtered: boolean; canCreate: boolean; createUrl: string; onClear: () => void }) {
    if (filtered) {
        return (
            <div className="cms:flex cms:flex-col cms:items-center cms:gap-2">
                <span>{t('Nothing matches these filters.')}</span>
                <Button variant="outline" size="sm" onClick={onClear}><X /> {t('Clear filters')}</Button>
            </div>
        );
    }
    if (trashed) return <>{t('The trash is empty.')}</>;

    return (
        <div className="cms:flex cms:flex-col cms:items-center cms:gap-2">
            <span>{t('No entries yet.')}</span>
            {canCreate && <Button size="sm" asChild><Link href={createUrl}><Plus /> {t('Write the first one')}</Link></Button>}
        </div>
    );
}
