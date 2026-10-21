import * as React from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ExternalLink, FileText, LayoutTemplate, MoreHorizontal, Pencil, Plus, RotateCcw, Search, Settings2, Trash2 } from 'lucide-react';
import { adminUrl, t } from '@sunrice/admin-sdk';
import {
    Button, Card, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator, DropdownMenuTrigger, Input, Label, PageHeader, Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
    SortableHandle, type SortableHandleProps, SortableList, useBreadcrumbs,
} from '@sunrice/admin-sdk/ui';
import { useConfirm } from '@/components/Confirm.tsx';
import { FieldError } from '@/components/FieldInput.tsx';
import { localeName } from '@/lib/entries.ts';
import { childIndexes, reorderLevel } from '@/lib/tree.ts';

interface TermRow {
    id: number;
    parentId: number | null;
    depth: number;
    /** In the language shown; null when not translated yet. */
    title: string | null;
    slug: string | null;
    /** The translation's version, to refuse a save over someone else's newer one; null when not translated. */
    version: number | null;
    /** The main language's title, for untranslated terms. */
    fallback: string;
    /** Where other content points at it. */
    usedBy?: string[];
    /** Entries tagged with it. */
    entries?: number;
    createdAt?: string | null;
    /** Its page on the site, when it has one in this language. */
    url?: string | null;
}

interface Props {
    taxonomy: {
        handle: string; title: string; hierarchical: boolean; pages?: boolean;
        /** The taxonomy's settings, when the user may change them. */
        settings?: string | null;
        /** Its terms' blueprint, when the user may edit blueprints. */
        blueprint?: string | null;
        /** The collections whose entries it groups. */
        collections?: { title: string; url: string }[];
    } | null;
    /** Showing the trash. */
    trashed?: boolean;
    taxonomies: { handle: string; title: string }[];
    terms: TermRow[];
    locales: string[];
    locale: string;
}

const TOP = '__top';

/** " It's used by A; B." for confirmations, or nothing. */
function usedBySentence(usedBy: string[] = []): string {
    if (usedBy.length === 0) return '';
    const list = usedBy.slice(0, 5).join('; ');
    return ` ${usedBy.length > 5 ? t('It\'s used by :list and :count more.', { list, count: usedBy.length - 5 }) : t('It\'s used by :list.', { list })}`;
}

export default function TermsIndex({ taxonomy, taxonomies, terms, locales, locale, trashed = false }: Props) {
    useBreadcrumbs([{ label: taxonomy ? taxonomy.title : t('Terms') }]);
    const [confirm, confirmDialog] = useConfirm();
    // The term being renamed.
    const [editing, setEditing] = React.useState<TermRow | null>(null);
    const [search, setSearch] = React.useState('');
    // In the order dragged until the server's comes back.
    const [rows, setRows] = React.useState(terms);
    React.useEffect(() => setRows(terms), [terms]);

    if (!taxonomy) {
        return (
            <div className="cms:flex cms:flex-col cms:gap-4">
                <Head title={t('Terms')} />
                <PageHeader title={t('Terms')} description={t('There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here.')} />
            </div>
        );
    }
    const base = adminUrl(`cms/taxonomies/${taxonomy.handle}/terms`);
    const pageUrl = (term: TermRow) => adminUrl(`cms/taxonomies/${taxonomy.handle}/terms/${term.id}/edit`) + `?locale=${encodeURIComponent(locale)}`;
    const reorder = (parent: number, order: number[]) => {
        const ids = order.map((index) => rows[index]!.id);
        setRows(reorderLevel(rows, parent, order));
        router.post(adminUrl('cms/terms/reorder'), { taxonomy: taxonomy.handle, ids, parent_id: parent < 0 ? null : rows[parent]!.id },
            { preserveScroll: true, preserveState: true, onError: () => setRows(terms) });
    };
    const trash = (term: TermRow) => confirm(t('Move ":title" to the trash, with the terms under it? It comes off the site; you can restore it.', { title: term.fallback }) + usedBySentence(term.usedBy),
        () => router.delete(adminUrl(`cms/terms/${term.id}`), { preserveScroll: true }), t('Move to trash'));
    const needle = search.trim().toLowerCase();
    const found = needle === '' ? null : rows.filter((each) => `${each.title ?? each.fallback} ${each.slug ?? ''}`.toLowerCase().includes(needle));
    const collections = taxonomy.collections ?? [];

    /** One term's row: drag handle, title, slug, entries, created and its actions. */
    const row = (term: TermRow, handle: SortableHandleProps | null, depth: number) => (
        <div className={`${GRID} cms:border-t cms:border-border/60 cms:px-3 cms:py-2`}>
            <span className="cms:flex cms:justify-center">{handle && !trashed && <SortableHandle {...handle} label={t('Move :title', { title: term.fallback })} />}</span>
            <div className="cms:flex cms:min-w-0 cms:items-center cms:gap-2" style={{ paddingLeft: depth * 20 }}>
                {depth > 0 && <span className="cms:text-muted-foreground" aria-hidden>└</span>}
                {trashed ? <span className="cms:truncate cms:font-medium">{term.title ?? term.fallback}</span> : (
                    <button type="button" className="cms:truncate cms:text-left cms:font-medium cms:underline-offset-4 cms:hover:underline"
                        onClick={() => taxonomy.pages && term.title !== null ? router.get(pageUrl(term)) : setEditing(term)}>
                        {term.title ?? <span className="cms:font-normal cms:text-muted-foreground cms:italic">{t(':title · not translated', { title: term.fallback })}</span>}
                    </button>
                )}
                {term.url && (
                    <a href={term.url} target="_blank" rel="noopener noreferrer" className="cms:text-muted-foreground cms:hover:text-foreground" aria-label={t('View page')} title={t('View page')}>
                        <ExternalLink className="cms:size-3.5" />
                    </a>
                )}
            </div>
            <code className="cms:hidden cms:truncate cms:text-xs cms:text-muted-foreground cms:md:block">{term.slug ?? '—'}</code>
            <span className="cms:hidden cms:text-sm cms:text-muted-foreground cms:tabular-nums cms:md:block">{term.entries ?? 0}</span>
            <span className="cms:hidden cms:text-sm cms:text-muted-foreground cms:md:block">{formatDay(term.createdAt)}</span>
            <div className="cms:flex cms:justify-end">
                {trashed ? (
                    <div className="cms:flex cms:gap-1">
                        <Button variant="outline" size="sm" onClick={() => router.post(adminUrl(`cms/terms/${term.id}/restore`), {}, { preserveScroll: true })}><RotateCcw /> {t('Restore')}</Button>
                        <Button variant="ghost" size="sm" className="cms:text-destructive"
                            onClick={() => confirm(t('Permanently delete ":title" in every language? Entries lose it.', { title: term.fallback }) + usedBySentence(term.usedBy),
                                () => router.delete(adminUrl(`cms/terms/${term.id}/force`), { preserveScroll: true, data: (term.usedBy ?? []).length > 0 ? { force: 1 } : {} }))}>
                            <Trash2 /> {t('Permanently delete')}
                        </Button>
                    </div>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="cms:size-8" aria-label={t('Actions for :title', { title: term.fallback })}><MoreHorizontal /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => setEditing(term)}><Pencil /> {t('Rename')}</DropdownMenuItem>
                            {taxonomy.hierarchical && term.title !== null && (
                                <DropdownMenuItem asChild><Link href={`${base}/create?locale=${encodeURIComponent(locale)}&parent=${term.id}`}><Plus /> {t('Add a term under it')}</Link></DropdownMenuItem>
                            )}
                            {taxonomy.pages && term.title !== null && (
                                <DropdownMenuItem asChild><Link href={pageUrl(term)}><FileText /> {t('Edit page')}</Link></DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cms:text-destructive" onSelect={() => trash(term)}><Trash2 /> {t('Move to trash')}</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </div>
    );

    /** The terms directly under the one at `parent` (-1: the top), dragged into order among themselves, each with the terms under it. */
    const level = (parent: number): React.ReactNode => (
        <SortableList items={childIndexes(rows, parent)} getId={(index) => rows[index]!.id} getLabel={(index) => rows[index]!.title ?? rows[index]!.fallback} disabled={trashed} onReorder={(order) => reorder(parent, order)} className="cms:gap-0">
            {(index, { handle, isOverlay }) => (
                <div className={isOverlay ? 'cms:rounded-md cms:bg-card cms:shadow-md' : ''}>
                    {row(rows[index]!, handle, rows[index]!.depth)}
                    {!isOverlay && !trashed && childIndexes(rows, index).length > 0 && level(index)}
                </div>
            )}
        </SortableList>
    );

    return (
        <div className="cms:flex cms:flex-col cms:gap-4">
            <Head title={taxonomy.title} />
            {confirmDialog}
            <PageHeader
                title={trashed ? t(':title — trash', { title: taxonomy.title }) : taxonomy.title}
                primary={!trashed && <Button asChild><Link href={`${base}/create?locale=${encodeURIComponent(locale)}`}><Plus /> {t('New term')}</Link></Button>}
                menu={[
                    ...collections.map((c) => ({ label: c.title, href: c.url, group: t('Used by collections') })),
                    ...(taxonomy.settings ? [{ label: t('Taxonomy settings'), href: taxonomy.settings, icon: <Settings2 />, group: t('Structure') }] : []),
                    ...(taxonomy.blueprint ? [{ label: t('Edit blueprint'), href: taxonomy.blueprint, icon: <LayoutTemplate />, group: t('Structure') }] : []),
                ]}
            >
                {taxonomies.length > 1 && (
                    <Select value={taxonomy.handle} onValueChange={(handle: string) => router.get(adminUrl(`cms/taxonomies/${handle}/terms`))}>
                        <SelectTrigger className="cms:w-48" aria-label={t('Taxonomy')}><SelectValue /></SelectTrigger>
                        <SelectContent>{taxonomies.map((each) => <SelectItem key={each.handle} value={each.handle}>{each.title}</SelectItem>)}</SelectContent>
                    </Select>
                )}
            </PageHeader>

            <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-3">
                <div className="cms:relative cms:w-full cms:max-w-xs">
                    <Search className="cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" />
                    <Input className="cms:pl-9" placeholder={t('Search terms…')} aria-label={t('Search terms')} value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
                </div>
                {locales.length > 1 && (
                    <Select value={locale} onValueChange={(next: string) => router.get(base, { locale: next, ...(trashed ? { status: 'trashed' } : {}) })}>
                        <SelectTrigger className="cms:w-40" aria-label={t('Language')}><SelectValue /></SelectTrigger>
                        <SelectContent>{locales.map((code) => <SelectItem key={code} value={code}>{localeName(code)}</SelectItem>)}</SelectContent>
                    </Select>
                )}
                <Button variant={trashed ? 'secondary' : 'ghost'} className="cms:ml-auto cms:order-last"
                    onClick={() => router.get(base, trashed ? { locale } : { locale, status: 'trashed' })}>
                    {trashed ? t('Back to terms') : <><Trash2 /> {t('Trash')}</>}
                </Button>
                {!trashed && rows.length > 1 && !found && (
                    <p className="cms:text-sm cms:text-muted-foreground">{taxonomy.hierarchical ? t('Drag terms to set their order; a term\'s parent is set when you rename it.') : t('Drag terms to set their order.')}</p>
                )}
            </div>

            <Card className="cms:gap-0 cms:overflow-hidden cms:py-0">
                <div className={`${GRID} cms:bg-muted/60 cms:px-3 cms:py-2.5 cms:text-sm cms:font-medium cms:text-muted-foreground`}>
                    <span />
                    <span>{t('Title')}</span>
                    <span className="cms:hidden cms:md:block">{t('Slug')}</span>
                    <span className="cms:hidden cms:md:block">{t('Entries')}</span>
                    <span className="cms:hidden cms:md:block">{t('Created')}</span>
                    <span className="cms:sr-only">{t('Actions')}</span>
                </div>
                {rows.length === 0 ? (
                    <div className="cms:flex cms:flex-col cms:items-center cms:gap-3 cms:border-t cms:border-border/60 cms:p-10 cms:text-center cms:text-muted-foreground">
                        {trashed ? t('The trash is empty.') : <>{t('No terms yet.')}<Button size="sm" asChild><Link href={`${base}/create?locale=${encodeURIComponent(locale)}`}><Plus /> {t('New term')}</Link></Button></>}
                    </div>
                ) : found ? (
                    found.length === 0
                        ? <p className="cms:border-t cms:border-border/60 cms:p-8 cms:text-center cms:text-muted-foreground">{t('No terms match “:search”.', { search })}</p>
                        : found.map((term) => <React.Fragment key={term.id}>{row(term, null, 0)}</React.Fragment>)
                ) : trashed ? rows.map((term) => <React.Fragment key={term.id}>{row(term, null, 0)}</React.Fragment>) : level(-1)}
            </Card>

            <Dialog open={editing !== null} onOpenChange={(open: boolean) => { if (!open) setEditing(null); }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('Rename “:title”', { title: editing?.fallback })}</DialogTitle>
                        <DialogDescription>{locales.length > 1 ? t('In :language.', { language: localeName(locale) }) : t('Its title and the slug in its address.')}</DialogDescription>
                    </DialogHeader>
                    {editing !== null && (
                        <TermForm key={editing.id} term={editing} locale={locale} terms={terms} hierarchical={taxonomy.hierarchical} onDone={() => setEditing(null)} />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

const GRID = 'cms:grid cms:items-center cms:gap-3 cms:grid-cols-[1.5rem_1fr_2.5rem] cms:md:grid-cols-[1.5rem_minmax(0,2fr)_minmax(0,1.2fr)_5rem_7rem_2.5rem]';

/** "19 Oct 2026", or "—". */
function formatDay(iso: string | null | undefined): string {
    if (!iso) return '—';
    const date = new Date(iso);

    return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString(document.documentElement.lang || undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Renames a term in the language shown: its title, slug and where it sits. */
function TermForm({ locale, terms, hierarchical, term, onDone }: { locale: string; terms: TermRow[]; hierarchical: boolean; term: TermRow; onDone: () => void }) {
    const form = useForm({ title: term.title ?? '', slug: term.slug ?? '', parent_id: term.parentId, locale, version: term.version });
    const errors = form.errors as Record<string, string | undefined>;
    // A term can't go under itself or a term under it.
    const blocked = new Set<number>();
    blocked.add(term.id);
    const start = terms.findIndex((each) => each.id === term.id);
    for (let i = start + 1; i < terms.length && (terms[i]?.depth ?? 0) > term.depth; i++) blocked.add(terms[i]!.id);
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(adminUrl(`cms/terms/${term.id}`), { preserveScroll: true, onSuccess: onDone });
    };
    const id = `term-${term.id}`;

    return (
        <form onSubmit={submit} className="cms:flex cms:flex-col cms:gap-4">
            <div className="cms:flex cms:flex-col cms:gap-1.5">
                <Label htmlFor={`${id}-title`}>{t('Title')}</Label>
                <Input id={`${id}-title`} value={form.data.title} placeholder={term.fallback} required autoFocus
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('title', e.target.value)} />
                <FieldError message={errors.title ?? errors.version} />
            </div>
            <div className="cms:flex cms:flex-col cms:gap-1.5">
                <Label htmlFor={`${id}-slug`}>{t('Slug')}</Label>
                <Input id={`${id}-slug`} className="cms:font-mono" value={form.data.slug} placeholder={t('Made from the title')}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('slug', e.target.value)} />
                <FieldError message={errors.slug} />
            </div>
            {hierarchical && (
                <div className="cms:flex cms:flex-col cms:gap-1.5">
                    <Label htmlFor={`${id}-parent`}>{t('Under')}</Label>
                    <Select value={form.data.parent_id === null ? TOP : String(form.data.parent_id)}
                        onValueChange={(value: string) => form.setData('parent_id', value === TOP ? null : Number(value))}>
                        <SelectTrigger id={`${id}-parent`}><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TOP}>{t('Top level')}</SelectItem>
                            {terms.filter((each) => !blocked.has(each.id)).map((each) => (
                                <SelectItem key={each.id} value={String(each.id)}>{'— '.repeat(each.depth)}{each.title ?? each.fallback}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FieldError message={errors.parent_id} />
                </div>
            )}
            <DialogFooter>
                <Button type="button" variant="ghost" onClick={onDone}>{t('Cancel')}</Button>
                <Button type="submit" disabled={form.processing}>{t('Save')}</Button>
            </DialogFooter>
        </form>
    );
}
