import * as React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { IndentDecrease, IndentIncrease, Link2, List, LoaderCircle, Plus, Settings2, Tag, Trash2 } from 'lucide-react';
import { adminUrl, t } from '@sunrice/admin-sdk';
import {
    Badge, Button, Card, Checkbox, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Input, Label, PageHeader,
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SortableHandle, SortableList, useBreadcrumbs, useUnsavedChanges,
} from '@sunrice/admin-sdk/ui';
import { EntriesPicker } from '@/components/EntriesPicker.tsx';
import { FieldError } from '@/components/FieldInput.tsx';
import { localeName } from '@/lib/entries.ts';
import { type FlatItem, flatten, indent, labelFallback, type MenuNode, newItem, outdent, removeItem, toTree } from '@/lib/menu.ts';
import { childIndexes, reorderLevel } from '@/lib/tree.ts';
import { isSafeUrl, pickerQuery } from '@/lib/values.ts';

interface Props {
    menu: { handle: string; title: string };
    items: MenuNode[];
    locales: string[];
    limits: { depth: number; items: number };
    terms: { id: number; title: string; taxonomy: string }[];
    listings: { id: number; title: string }[];
    can: { update: boolean };
    /** Its title and handle (the menu's resource), when the user may change them. */
    settings?: string | null;
}

type Kind = 'entry' | 'term' | 'listing' | 'url';

export default function MenuEdit({ menu, items: initial, locales, limits, terms, listings, can, settings }: Props) {
    const url = adminUrl(`cms/menus/${menu.handle}/links`);
    useBreadcrumbs([{ label: t('Menus'), href: adminUrl('cms/menus') }, { label: menu.title }]);
    const [items, setItems] = React.useState<FlatItem[]>(() => flatten(initial));
    const [adding, setAdding] = React.useState<Kind | null>(null);
    // The tree is recursive; Inertia's form types stop recursing only at `any`.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form = useForm<{ items: any[] }>({ items: initial });
    const errors = form.errors as Record<string, string | undefined>;
    const [dirty, setDirty] = React.useState(false);
    const main = locales[0] ?? 'en';
    const change = (next: FlatItem[]) => { setItems(next); setDirty(true); };
    const update = (index: number, patch: Partial<FlatItem>) => change(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));

    const persist = () => {
        if (form.processing) return;
        form.transform(() => ({ items: toTree(items).map(strip) }));
        form.put(url, { preserveScroll: true, onSuccess: () => setDirty(false) });
    };
    const save = (e: React.FormEvent) => {
        e.preventDefault();
        persist();
    };
    useUnsavedChanges(dirty, can.update ? persist : undefined);

    /** The items directly under the one at `parent` (-1: the top), dragged into order among themselves, each with its own children. */
    const level = (parent: number): React.ReactNode => (
        <SortableList items={childIndexes(items, parent)} getId={(index) => items[index]!.key}
            getLabel={(index) => items[index]!.labels[main] || items[index]!.target?.title || items[index]!.url || 'link'} disabled={!can.update}
            onReorder={(order) => change(reorderLevel(items, parent, order))} className={parent < 0 ? 'cms:gap-1' : 'cms:mt-1 cms:gap-1 cms:pl-6'}>
            {(index, { handle, isOverlay }) => {
                const item = items[index]!;
                return (
                    <div className={`cms:rounded-lg cms:border cms:bg-card ${isOverlay ? '' : 'cms:border-border/70'}`}>
                        <div className="cms:flex cms:items-start cms:gap-2 cms:p-2">
                            {can.update && <div className="cms:flex cms:h-10 cms:shrink-0 cms:items-center"><SortableHandle {...handle} label={t('Move :title', { title: item.labels[main] || item.target?.title || item.url || t('link') })} /></div>}
                            <div className="cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2">
                            <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-2">
                                <Input aria-label={t('Label (:language)', { language: localeName(main) })} className="cms:w-full cms:sm:max-w-xs" disabled={!can.update}
                                    placeholder={item.target?.title ?? t('Label')} value={item.labels[main] ?? ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, { labels: { ...item.labels, [main]: e.target.value } })} />
                                <span className="cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground">
                                    {item.url !== null
                                        ? item.url
                                        : <>{item.target ? `${item.target.kind}: ${item.target.title}` : t('Gone')} {(!item.target || !item.target.live) && <Badge variant="outline">{t('Not on the site')}</Badge>}</>}
                                </span>
                                {can.update && (
                                    <div className="cms:flex cms:items-center">
                                        <label className="cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm">
                                            <Checkbox checked={item.new_tab} onCheckedChange={(checked: boolean) => update(index, { new_tab: checked })} /> {t('New tab')}
                                        </label>
                                        <Button type="button" variant="ghost" size="icon" className="cms:size-8" aria-label={t('Outdent')} disabled={item.depth === 0} onClick={() => change(outdent(items, index))}><IndentDecrease /></Button>
                                        <Button type="button" variant="ghost" size="icon" className="cms:size-8" aria-label={t('Indent')} onClick={() => change(indent(items, index, limits.depth))}><IndentIncrease /></Button>
                                        <Button type="button" variant="ghost" size="icon" className="cms:size-8 cms:text-destructive" aria-label={t('Remove, with what\'s under it')} onClick={() => change(removeItem(items, index))}><Trash2 /></Button>
                                    </div>
                                )}
                            </div>
                            {item.collection_id !== null && (
                                <Input aria-label={t('Filters')} className="cms:w-full cms:sm:max-w-md cms:font-mono" disabled={!can.update}
                                    placeholder={t('Filters (optional): :example', { example: 'filter=value' })} value={item.query ?? ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, { query: e.target.value })} />
                            )}
                            {locales.length > 1 && (
                                <div className="cms:flex cms:flex-wrap cms:gap-2">
                                    {locales.slice(1).map((code) => (
                                        <Input key={code} aria-label={t('Label (:language)', { language: localeName(code) })} className="cms:w-full cms:sm:max-w-xs" disabled={!can.update}
                                            placeholder={labelFallback(item) === 'title'
                                                ? t(':language: its title there, else as :main', { language: localeName(code), main: localeName(main) })
                                                : t(':language: as :main', { language: localeName(code), main: localeName(main) })} value={item.labels[code] ?? ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, { labels: { ...item.labels, [code]: e.target.value } })} />
                                    ))}
                                </div>
                            )}
                            </div>
                        </div>
                        {!isOverlay && childIndexes(items, index).length > 0 && <div className="cms:px-2 cms:pb-2">{level(index)}</div>}
                    </div>
                );
            }}
        </SortableList>
    );

    return (
        <form onSubmit={save} className="cms:flex cms:max-w-5xl cms:flex-col cms:gap-6">
            <Head title={menu.title} />
            <PageHeader
                title={menu.title}
                back={{ href: adminUrl('cms/menus'), label: t('Back to menus') }}
                actions={can.update && (
                    <>
                        {settings && <Button type="button" variant="ghost" asChild><Link href={settings}><Settings2 /> {t('Settings')}</Link></Button>}
                        <Button type="button" variant="outline" disabled={items.length >= limits.items} onClick={() => setAdding('entry')}><Plus /> {t('Entry')}</Button>
                        {terms.length > 0 && <Button type="button" variant="outline" disabled={items.length >= limits.items} onClick={() => setAdding('term')}><Tag /> {t('Term')}</Button>}
                        {listings.length > 0 && <Button type="button" variant="outline" disabled={items.length >= limits.items} onClick={() => setAdding('listing')}><List /> {t('Listing')}</Button>}
                        <Button type="button" variant="outline" disabled={items.length >= limits.items} onClick={() => setAdding('url')}><Link2 /> {t('Link')}</Button>
                        <Button type="submit" disabled={form.processing}>{form.processing && <LoaderCircle className="cms:animate-spin" />} {t('Save')}</Button>
                    </>
                )}
            >
                {dirty && <span className="cms:text-sm cms:text-muted-foreground">{t('Unsaved changes')}</span>}
            </PageHeader>
            <FieldError message={errors.items} />
            {Object.keys(errors).some((key) => key.startsWith('items.')) && (
                <p role="alert" className="cms:text-sm cms:text-destructive">{t('Some links need fixing: :error', { error: Object.values(errors).filter(Boolean)[0] })}</p>
            )}

            <Card className="cms:p-2">
                {items.length === 0 ? <p className="cms:p-4 cms:text-center cms:text-muted-foreground">{t('No links yet. Add an entry or a link.')}</p> : level(-1)}
            </Card>

            <AddDialog kind={adding} terms={terms} listings={listings} onClose={() => setAdding(null)} onAdd={(item) => { change([...items, item]); setAdding(null); }} main={main} />
        </form>
    );
}

/** What's sent: the tree without the editor's extras. */
function strip({ target: _target, children, ...node }: MenuNode): Omit<MenuNode, 'target'> {
    return { ...node, children: children.map(strip) as MenuNode[] };
}

/** A menu links to pages that exist: said when the search finds none. */
const menuEntryHint = (): string => t('A menu links to entries that already exist: create the page first (Content → Entries), then add it here, or add a web address instead.');

const titles = (): Record<Kind, string> => ({ entry: t('Link to an entry'), term: t('Link to a term\'s page'), listing: t('Link to a listing page'), url: t('Link to an address') });

const descriptions = (): Record<Kind, string> => ({
    entry: t('It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site.'),
    term: t('The page listing the term\'s entries, in each language. Its title is the label unless you give one.'),
    listing: t('The collection\'s listing page, in each language, optionally with filters. The collection\'s title is the label unless you give one.'),
    url: t('A web address, a path on this site (/contact), mailto: or tel:.'),
});

function AddDialog({ kind, terms, listings, onClose, onAdd, main }: {
    kind: Kind | null;
    terms: Props['terms'];
    listings: Props['listings'];
    onClose: () => void;
    onAdd: (item: FlatItem) => void;
    main: string;
}) {
    const [entryId, setEntryId] = React.useState<number | null>(null);
    const [choice, setChoice] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [label, setLabel] = React.useState('');
    const [query, setQuery] = React.useState('');
    React.useEffect(() => { setEntryId(null); setChoice(''); setAddress(''); setLabel(''); setQuery(''); }, [kind]);
    const safe = address.trim() === '' || isSafeUrl(address.trim());
    const labels = label.trim() ? { [main]: label.trim() } : {};

    const add = async () => {
        if (kind === 'entry' && entryId !== null) {
            const response = await fetch(`${adminUrl('cms/entries/picker')}?${pickerQuery({ ids: [entryId], collections: [] })}`, { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
            const found = response.ok ? ((await response.json()) as { items: { title: string; collection: string; status: string }[] }).items[0] : undefined;
            onAdd(newItem({ entry_id: entryId, target: found ? { title: found.title, kind: found.collection, live: found.status === 'published' } : null, labels }));
        } else if (kind === 'term' && choice !== '') {
            const term = terms.find((each) => String(each.id) === choice);
            onAdd(newItem({ term_id: Number(choice), target: term ? { title: term.title, kind: term.taxonomy, live: true } : null, labels }));
        } else if (kind === 'listing' && choice !== '') {
            const listing = listings.find((l) => String(l.id) === choice);
            onAdd(newItem({ collection_id: Number(choice), target: listing ? { title: listing.title, kind: t('Listing page'), live: true } : null, labels, query: query.trim().replace(/^\?/, '') || null }));
        } else if (kind === 'url' && address.trim() !== '' && safe && label.trim() !== '') {
            onAdd(newItem({ url: address.trim(), labels }));
        }
    };
    const ready = kind === 'entry' ? entryId !== null : kind === 'url' ? address.trim() !== '' && safe && label.trim() !== '' : choice !== '';

    return (
        <Dialog open={kind !== null} onOpenChange={(open: boolean) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{kind ? titles()[kind] : ''}</DialogTitle>
                    <DialogDescription>{kind ? descriptions()[kind] : ''}</DialogDescription>
                </DialogHeader>
                <div className="cms:flex cms:flex-col cms:gap-3">
                    {kind === 'entry' && (
                        <EntriesPicker id="menu-entry" value={entryId} multiple={false} max={null} collections={[]} invalid={false}
                            emptyHint={menuEntryHint()} onChange={(value) => setEntryId(typeof value === 'number' ? value : null)} />
                    )}
                    {(kind === 'term' || kind === 'listing') && (
                        <div className="cms:flex cms:flex-col cms:gap-2">
                            <Label htmlFor="menu-target">{kind === 'term' ? t('Term') : t('Collection')}</Label>
                            <Select value={choice} onValueChange={setChoice}>
                                <SelectTrigger id="menu-target"><SelectValue placeholder={t('Choose…')} /></SelectTrigger>
                                <SelectContent>
                                    {kind === 'term'
                                        ? terms.map((term) => <SelectItem key={term.id} value={String(term.id)}>{term.taxonomy}: {term.title}</SelectItem>)
                                        : listings.map((l) => <SelectItem key={l.id} value={String(l.id)}>{l.title}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    {kind === 'listing' && (
                        <div className="cms:flex cms:flex-col cms:gap-2">
                            <Label htmlFor="menu-query">{t('Filters (optional)')}</Label>
                            <Input id="menu-query" className="cms:font-mono" value={query} placeholder="filter=value&other=value"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} />
                            <p className="cms:text-sm cms:text-muted-foreground">{t('What the listing page\'s filters put after the ? in its address. Each language\'s link gets them, and a term may be named by its slug in any language.')}</p>
                        </div>
                    )}
                    {kind === 'url' && (
                        <div className="cms:flex cms:flex-col cms:gap-2">
                            <Label htmlFor="menu-url">{t('Address')}</Label>
                            <Input id="menu-url" value={address} placeholder={t('https://… or /contact')} aria-invalid={!safe}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} />
                            {!safe && <p className="cms:text-sm cms:text-destructive">{t('This address could run code; use https://, a path, mailto: or tel:.')}</p>}
                        </div>
                    )}
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor="menu-label">{kind === 'url' ? t('Label') : t('Label (optional)')}</Label>
                        <Input id="menu-label" value={label} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>{t('Cancel')}</Button>
                    <Button type="button" onClick={() => void add()} disabled={!ready}>{t('Add')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
