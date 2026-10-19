import * as React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import {
    Button, Card, CardContent, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, useBreadcrumbs,
} from '@sunrice/admin-sdk/ui';
import { useConfirm } from '@/components/Confirm.tsx';
import { FieldError } from '@/components/FieldInput.tsx';
import { localeName } from '@/lib/entries.ts';

interface TermRow {
    id: number;
    parentId: number | null;
    depth: number;
    /** In the language shown; null when not translated yet. */
    title: string | null;
    slug: string | null;
    /** The main language's title, for untranslated terms. */
    fallback: string;
}

interface Props {
    taxonomy: { handle: string; title: string; hierarchical: boolean } | null;
    taxonomies: { handle: string; title: string }[];
    terms: TermRow[];
    locales: string[];
    locale: string;
}

const TOP = '__top';

export default function TermsIndex({ taxonomy, taxonomies, terms, locales, locale }: Props) {
    useBreadcrumbs([{ label: 'Terms', href: adminUrl('cms/terms') }, ...(taxonomy ? [{ label: taxonomy.title }] : [])]);
    const [confirm, confirmDialog] = useConfirm();
    const [editing, setEditing] = React.useState<number | null>(null);

    if (!taxonomy) {
        return (
            <div className="cms:flex cms:flex-col cms:gap-4">
                <Head title="Terms" />
                <h1 className="cms:text-2xl cms:font-medium cms:tracking-tight">Terms</h1>
                <p className="cms:text-muted-foreground">There are no taxonomies yet. Create one under Structure → Taxonomies (categories, tags…), then add its terms here.</p>
            </div>
        );
    }
    const base = adminUrl(`cms/taxonomies/${taxonomy.handle}/terms`);

    return (
        <div className="cms:flex cms:max-w-4xl cms:flex-col cms:gap-6">
            <Head title={taxonomy.title} />
            {confirmDialog}
            <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-3">
                <h1 className="cms:text-2xl cms:font-medium cms:tracking-tight">{taxonomy.title}</h1>
                {taxonomies.length > 1 && (
                    <Select value={taxonomy.handle} onValueChange={(handle: string) => router.get(adminUrl(`cms/taxonomies/${handle}/terms`))}>
                        <SelectTrigger className="cms:w-48" aria-label="Taxonomy"><SelectValue /></SelectTrigger>
                        <SelectContent>{taxonomies.map((t) => <SelectItem key={t.handle} value={t.handle}>{t.title}</SelectItem>)}</SelectContent>
                    </Select>
                )}
                {locales.length > 1 && (
                    <Select value={locale} onValueChange={(next: string) => router.get(base, { locale: next })}>
                        <SelectTrigger className="cms:ml-auto cms:w-48" aria-label="Language"><SelectValue /></SelectTrigger>
                        <SelectContent>{locales.map((code) => <SelectItem key={code} value={code}>{localeName(code)}</SelectItem>)}</SelectContent>
                    </Select>
                )}
            </div>

            <Card>
                <CardContent>
                    <TermForm key={`new-${terms.length}`} action={base} method="post" locale={locale} terms={terms} hierarchical={taxonomy.hierarchical}
                        submitLabel="Add term" />
                </CardContent>
            </Card>

            <Card className="cms:py-0">
                <ul className="cms:divide-y">
                    {terms.length === 0 && <li className="cms:p-6 cms:text-center cms:text-muted-foreground">No terms yet.</li>}
                    {terms.map((term) => {
                        const siblings = terms.filter((t) => t.parentId === term.parentId);
                        const position = siblings.findIndex((t) => t.id === term.id);
                        return (
                            <li key={term.id} className="cms:p-3" style={{ paddingLeft: `${0.75 + term.depth * 1.5}rem` }}>
                                {editing === term.id ? (
                                    <TermForm action={adminUrl(`cms/terms/${term.id}`)} method="put" locale={locale} terms={terms} hierarchical={taxonomy.hierarchical}
                                        term={term} submitLabel="Save" onDone={() => setEditing(null)} />
                                ) : (
                                    <div className="cms:flex cms:items-center cms:gap-3">
                                        <div className="cms:min-w-0 cms:flex-1">
                                            {term.title !== null
                                                ? <span className="cms:font-medium">{term.title}</span>
                                                : <span className="cms:text-muted-foreground cms:italic">{term.fallback} · not translated</span>}
                                            {term.slug && <span className="cms:ml-2 cms:text-xs cms:text-muted-foreground">/{term.slug}</span>}
                                        </div>
                                        <Button variant="ghost" size="icon" className="cms:size-8" aria-label={`Move ${term.fallback} up`} disabled={position === 0}
                                            onClick={() => router.post(adminUrl(`cms/terms/${term.id}/move`), { direction: 'up' }, { preserveScroll: true })}><ArrowUp /></Button>
                                        <Button variant="ghost" size="icon" className="cms:size-8" aria-label={`Move ${term.fallback} down`} disabled={position === siblings.length - 1}
                                            onClick={() => router.post(adminUrl(`cms/terms/${term.id}/move`), { direction: 'down' }, { preserveScroll: true })}><ArrowDown /></Button>
                                        <Button variant="ghost" size="icon" className="cms:size-8" aria-label={`Edit ${term.fallback}`} onClick={() => setEditing(term.id)}><Pencil /></Button>
                                        <Button variant="ghost" size="icon" className="cms:size-8 cms:text-destructive" aria-label={`Delete ${term.fallback}`}
                                            onClick={() => confirm(`Delete "${term.fallback}" in every language? Terms under it move up a level.`,
                                                () => router.delete(adminUrl(`cms/terms/${term.id}`), { preserveScroll: true }))}>
                                            <Trash2 />
                                        </Button>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </Card>
        </div>
    );
}

function TermForm({ action, method, locale, terms, hierarchical, term, submitLabel, onDone }: {
    action: string; method: 'post' | 'put'; locale: string; terms: TermRow[]; hierarchical: boolean; term?: TermRow; submitLabel: string; onDone?: () => void;
}) {
    const form = useForm({ title: term?.title ?? '', slug: term?.slug ?? '', parent_id: term?.parentId ?? null as number | null, locale });
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
                <FieldError message={errors.title} />
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
            <div className={`cms:flex cms:gap-2 ${term ? '' : 'cms:md:mt-6'}`}>
                <Button type="submit" disabled={form.processing}>{!term && <Plus />} {submitLabel}</Button>
                {onDone && <Button type="button" variant="ghost" onClick={onDone}>Cancel</Button>}
            </div>
        </form>
    );
}
