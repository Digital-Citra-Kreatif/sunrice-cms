import * as React from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { FileText, Pencil, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import {
    Button, Card, CardContent, Input, Label, PageHeader, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SortableHandle, SortableList,
    useBreadcrumbs,
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
}

interface Props {
    taxonomy: { handle: string; title: string; hierarchical: boolean; pages?: boolean } | null;
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
    return ` It's used by ${usedBy.slice(0, 5).join('; ')}${usedBy.length > 5 ? ` and ${usedBy.length - 5} more` : ''}.`;
}

export default function TermsIndex({ taxonomy, taxonomies, terms, locales, locale, trashed = false }: Props) {
    useBreadcrumbs([{ label: 'Terms', href: adminUrl('cms/terms') }, ...(taxonomy ? [{ label: taxonomy.title }] : [])]);
    const [confirm, confirmDialog] = useConfirm();
    const [editing, setEditing] = React.useState<number | null>(null);
    // In the order dragged until the server's comes back.
    const [rows, setRows] = React.useState(terms);
    React.useEffect(() => setRows(terms), [terms]);

    if (!taxonomy) {
        return (
            <div className="cms:flex cms:flex-col cms:gap-4">
                <Head title="Terms" />
                <PageHeader title="Terms" description="There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here." />
            </div>
        );
    }
    const base = adminUrl(`cms/taxonomies/${taxonomy.handle}/terms`);
    const reorder = (parent: number, order: number[]) => {
        const ids = order.map((index) => rows[index]!.id);
        setRows(reorderLevel(rows, parent, order));
        router.post(adminUrl('cms/terms/reorder'), { taxonomy: taxonomy.handle, ids, parent_id: parent < 0 ? null : rows[parent]!.id },
            { preserveScroll: true, preserveState: true, onError: () => setRows(terms) });
    };

    /** The terms directly under the one at `parent` (-1: the top), dragged into order among themselves, each with the terms under it. */
    const level = (parent: number): React.ReactNode => (
        <SortableList items={childIndexes(rows, parent)} getId={(index) => rows[index]!.id} disabled={trashed} onReorder={(order) => reorder(parent, order)}
            className={parent < 0 ? 'cms:gap-1' : 'cms:mt-1 cms:gap-1 cms:pl-6'}>
            {(index, { handle, isOverlay }) => {
                const term = rows[index]!;
                return (
                    <div className="cms:rounded-lg cms:border cms:border-border/70 cms:bg-card">
                        <div className="cms:p-2">
                            {trashed ? (
                                <div className="cms:flex cms:items-center cms:gap-3 cms:pl-1">
                                    <span className="cms:flex-1 cms:font-medium">{term.title ?? term.fallback}</span>
                                    <Button variant="outline" size="sm" onClick={() => router.post(adminUrl(`cms/terms/${term.id}/restore`), {}, { preserveScroll: true })}><RotateCcw /> Restore</Button>
                                    <Button variant="ghost" size="sm" className="cms:text-destructive"
                                        onClick={() => confirm(`Delete "${term.fallback}" for good, in every language? Entries lose it.${usedBySentence(term.usedBy)}`,
                                            () => router.delete(adminUrl(`cms/terms/${term.id}/force`), { preserveScroll: true, data: (term.usedBy ?? []).length > 0 ? { force: 1 } : {} }))}>
                                        <Trash2 /> Delete for good
                                    </Button>
                                </div>
                            ) : editing === term.id && !isOverlay ? (
                                <TermForm action={adminUrl(`cms/terms/${term.id}`)} method="put" locale={locale} terms={terms} hierarchical={taxonomy.hierarchical}
                                    term={term} submitLabel="Save" onDone={() => setEditing(null)} />
                            ) : (
                                <div className="cms:flex cms:items-center cms:gap-2">
                                    <SortableHandle {...handle} label={`Move ${term.fallback}`} />
                                    <div className="cms:min-w-0 cms:flex-1">
                                        {term.title !== null
                                            ? <span className="cms:font-medium">{term.title}</span>
                                            : <span className="cms:text-muted-foreground cms:italic">{term.fallback} · not translated</span>}
                                        {term.slug && <span className="cms:ml-2 cms:text-xs cms:text-muted-foreground">/{term.slug}</span>}
                                    </div>
                                    <Button variant="ghost" size="icon" className="cms:size-8" aria-label={`Rename ${term.fallback}`} onClick={() => setEditing(term.id)}><Pencil /></Button>
                                    {taxonomy.pages && term.title !== null && (
                                        <Button variant="ghost" size="icon" className="cms:size-8" aria-label={`Edit ${term.fallback}'s page`} asChild>
                                            <Link href={adminUrl(`cms/terms/${term.id}/edit`) + `?locale=${locale}`}><FileText /></Link>
                                        </Button>
                                    )}
                                    <Button variant="ghost" size="icon" className="cms:size-8 cms:text-destructive" aria-label={`Move ${term.fallback} to the trash`}
                                        onClick={() => confirm(`Move "${term.fallback}" to the trash, with the terms under it? It comes off the site; you can restore it.${usedBySentence(term.usedBy)}`,
                                            () => router.delete(adminUrl(`cms/terms/${term.id}`), { preserveScroll: true }))}>
                                        <Trash2 />
                                    </Button>
                                </div>
                            )}
                        </div>
                        {!isOverlay && !trashed && childIndexes(rows, index).length > 0 && <div className="cms:px-2 cms:pb-2">{level(index)}</div>}
                    </div>
                );
            }}
        </SortableList>
    );

    return (
        <div className="cms:flex cms:max-w-4xl cms:flex-col cms:gap-6">
            <Head title={taxonomy.title} />
            {confirmDialog}
            <PageHeader
                title={taxonomy.title}
                actions={
                    <>
                        <Button variant={trashed ? 'secondary' : 'ghost'} size="sm" onClick={() => router.get(base, { locale, ...(trashed ? {} : { trashed: 1 }) })}>
                            {trashed ? 'Back to terms' : 'Trash'}
                        </Button>
                        {locales.length > 1 && (
                            <Select value={locale} onValueChange={(next: string) => router.get(base, { locale: next, ...(trashed ? { trashed: 1 } : {}) })}>
                                <SelectTrigger className="cms:w-48" aria-label="Language"><SelectValue /></SelectTrigger>
                                <SelectContent>{locales.map((code) => <SelectItem key={code} value={code}>{localeName(code)}</SelectItem>)}</SelectContent>
                            </Select>
                        )}
                    </>
                }
            >
                {taxonomies.length > 1 && (
                    <Select value={taxonomy.handle} onValueChange={(handle: string) => router.get(adminUrl(`cms/taxonomies/${handle}/terms`))}>
                        <SelectTrigger className="cms:w-48" aria-label="Taxonomy"><SelectValue /></SelectTrigger>
                        <SelectContent>{taxonomies.map((t) => <SelectItem key={t.handle} value={t.handle}>{t.title}</SelectItem>)}</SelectContent>
                    </Select>
                )}
            </PageHeader>

            {!trashed && <Card>
                <CardContent>
                    <TermForm key={`new-${terms.length}`} action={base} method="post" locale={locale} terms={terms} hierarchical={taxonomy.hierarchical}
                        submitLabel="Add term" />
                </CardContent>
            </Card>}

            <Card className="cms:p-2">
                {rows.length === 0 ? <p className="cms:p-4 cms:text-center cms:text-muted-foreground">{trashed ? 'The trash is empty.' : 'No terms yet.'}</p> : level(-1)}
            </Card>
        </div>
    );
}

function TermForm({ action, method, locale, terms, hierarchical, term, submitLabel, onDone }: {
    action: string; method: 'post' | 'put'; locale: string; terms: TermRow[]; hierarchical: boolean; term?: TermRow; submitLabel: string; onDone?: () => void;
}) {
    const form = useForm({ title: term?.title ?? '', slug: term?.slug ?? '', parent_id: term?.parentId ?? null as number | null, locale, version: term?.version ?? null });
    const errors = form.errors as Record<string, string | undefined>;
    // A term can't go under itself or a term under it.
    const blocked = new Set<number>();
    if (term) {
        blocked.add(term.id);
        const start = terms.findIndex((t) => t.id === term.id);
        for (let i = start + 1; i < terms.length && (terms[i]?.depth ?? 0) > term.depth; i++) blocked.add(terms[i]!.id);
    }
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.submit(method, action, { preserveScroll: true, onSuccess: () => { if (method === 'post') form.reset('title', 'slug'); onDone?.(); } });
    };
    const id = term ? `term-${term.id}` : 'new-term';

    return (
        <form onSubmit={submit} className="cms:grid cms:items-start cms:gap-3 cms:md:grid-cols-[2fr_1.5fr_1.5fr_auto]">
            <div className="cms:flex cms:flex-col cms:gap-1">
                <Label htmlFor={`${id}-title`} className={term ? 'cms:sr-only' : ''}>Title</Label>
                <Input id={`${id}-title`} value={form.data.title} placeholder={term?.fallback} required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('title', e.target.value)} />
                <FieldError message={errors.title ?? errors.version} />
            </div>
            <div className="cms:flex cms:flex-col cms:gap-1">
                <Label htmlFor={`${id}-slug`} className={term ? 'cms:sr-only' : ''}>Slug</Label>
                <Input id={`${id}-slug`} className="cms:font-mono" value={form.data.slug} placeholder="Made from the title"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setData('slug', e.target.value)} />
                <FieldError message={errors.slug} />
            </div>
            {hierarchical ? (
                <div className="cms:flex cms:flex-col cms:gap-1">
                    <Label htmlFor={`${id}-parent`} className={term ? 'cms:sr-only' : ''}>Under</Label>
                    <Select value={form.data.parent_id === null ? TOP : String(form.data.parent_id)}
                        onValueChange={(value: string) => form.setData('parent_id', value === TOP ? null : Number(value))}>
                        <SelectTrigger id={`${id}-parent`}><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value={TOP}>Top level</SelectItem>
                            {terms.filter((t) => !blocked.has(t.id)).map((t) => (
                                <SelectItem key={t.id} value={String(t.id)}>{'— '.repeat(t.depth)}{t.title ?? t.fallback}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FieldError message={errors.parent_id} />
                </div>
            ) : <div />}
            <div className={`cms:flex cms:gap-2 ${term ? '' : 'cms:md:mt-[17px]'}`}>
                <Button type="submit" disabled={form.processing}>{!term && <Plus />} {submitLabel}</Button>
                {onDone && <Button type="button" variant="ghost" onClick={onDone}>Cancel</Button>}
            </div>
        </form>
    );
}
