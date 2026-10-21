import * as React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { IndentDecrease, IndentIncrease, Link2, List, LoaderCircle, Plus, Tag, Trash2 } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import {
    Badge, Button, Card, Checkbox, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Input, Label, PageHeader,
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SortableHandle, SortableList, useBreadcrumbs, useUnsavedChanges,
} from '@sunrice/admin-sdk/ui';
import { EntriesPicker } from '@/components/EntriesPicker.tsx';
import { FieldError } from '@/components/FieldInput.tsx';
import { localeName } from '@/lib/entries.ts';
import { type FlatItem, flatten, indent, type MenuNode, newItem, outdent, removeItem, toTree } from '@/lib/menu.ts';
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
}

type Kind = 'entry' | 'term' | 'listing' | 'url';

export default function MenuEdit({ menu, items: initial, locales, limits, terms, listings, can }: Props) {
    const url = adminUrl(`cms/menus/${menu.handle}`);
    useBreadcrumbs([{ label: 'Menus', href: adminUrl('cms/menus') }, { label: menu.title }]);
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
                            {can.update && <div className="cms:flex cms:h-10 cms:shrink-0 cms:items-center"><SortableHandle {...handle} label={`Move ${item.labels[main] || item.target?.title || item.url || 'link'}`} /></div>}
                            <div className="cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2">
                            <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-2">
                                <Input aria-label={`Label (${localeName(main)})`} className="cms:w-full cms:sm:max-w-xs" disabled={!can.update}
                                    placeholder={item.target?.title ?? 'Label'} value={item.labels[main] ?? ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, { labels: { ...item.labels, [main]: e.target.value } })} />
                                <span className="cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground">
                                    {item.url !== null
                                        ? item.url
                                        : <>{item.target ? `${item.target.kind}: ${item.target.title}` : 'Gone'} {(!item.target || !item.target.live) && <Badge variant="outline">Not on the site</Badge>}</>}
                                </span>
                                {can.update && (
                                    <div className="cms:flex cms:items-center">
                                        <label className="cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm">
                                            <Checkbox checked={item.new_tab} onCheckedChange={(checked: boolean) => update(index, { new_tab: checked })} /> New tab
                                        </label>
                                        <Button type="button" variant="ghost" size="icon" className="cms:size-8" aria-label="Out a level" disabled={item.depth === 0} onClick={() => change(outdent(items, index))}><IndentDecrease /></Button>
                                        <Button type="button" variant="ghost" size="icon" className="cms:size-8" aria-label="In a level" onClick={() => change(indent(items, index, limits.depth))}><IndentIncrease /></Button>
                                        <Button type="button" variant="ghost" size="icon" className="cms:size-8 cms:text-destructive" aria-label="Remove, with what's under it" onClick={() => change(removeItem(items, index))}><Trash2 /></Button>
                                    </div>
                                )}
                            </div>
                            {locales.length > 1 && (
                                <div className="cms:flex cms:flex-wrap cms:gap-2">
                                    {locales.slice(1).map((code) => (
                                        <Input key={code} aria-label={`Label (${localeName(code)})`} className="cms:w-full cms:sm:max-w-xs" disabled={!can.update}
                                            placeholder={`${localeName(code)}: as ${localeName(main)}`} value={item.labels[code] ?? ''}
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
        <form onSubmit={save} className="cms:flex cms:max-w-4xl cms:flex-col cms:gap-6">
            <Head title={menu.title} />
            <PageHeader
                title={menu.title}
                back={{ href: adminUrl('cms/menus'), label: 'Back to menus' }}
                actions={can.update && (
                    <>
                        <Button type="button" variant="outline" disabled={items.length >= limits.items} onClick={() => setAdding('entry')}><Plus /> Entry</Button>
                        {terms.length > 0 && <Button type="button" variant="outline" disabled={items.length >= limits.items} onClick={() => setAdding('term')}><Tag /> Term</Button>}
                        {listings.length > 0 && <Button type="button" variant="outline" disabled={items.length >= limits.items} onClick={() => setAdding('listing')}><List /> Listing</Button>}
                        <Button type="button" variant="outline" disabled={items.length >= limits.items} onClick={() => setAdding('url')}><Link2 /> Link</Button>
                        <Button type="submit" disabled={form.processing}>{form.processing && <LoaderCircle className="cms:animate-spin" />} Save</Button>
                    </>
                )}
            >
                {dirty && <span className="cms:text-sm cms:text-muted-foreground">Unsaved changes</span>}
            </PageHeader>
            <FieldError message={errors.items} />
            {Object.keys(errors).some((key) => key.startsWith('items.')) && (
                <p role="alert" className="cms:text-sm cms:text-destructive">Some links need fixing: {Object.values(errors).filter(Boolean)[0]}</p>
            )}

            <Card className="cms:p-2">
                {items.length === 0 ? <p className="cms:p-4 cms:text-center cms:text-muted-foreground">No links yet. Add an entry or a link.</p> : level(-1)}
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
const MENU_ENTRY_HINT = 'A menu links to entries that already exist: create the page first (Content → Entries), then add it here, or add a web address instead.';

const TITLES: Record<Kind, string> = { entry: 'Link to an entry', term: 'Link to a term\'s page', listing: 'Link to a listing page', url: 'Link to an address' };

const DESCRIPTIONS: Record<Kind, string> = {
    entry: 'It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site.',
    term: 'The page listing the term\'s entries, in each language. Its title is the label unless you give one.',
    listing: 'The collection\'s listing page, in each language. The collection\'s title is the label unless you give one.',
    url: 'A web address, a path on this site (/contact), mailto: or tel:.',
};

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
    React.useEffect(() => { setEntryId(null); setChoice(''); setAddress(''); setLabel(''); }, [kind]);
    const safe = address.trim() === '' || isSafeUrl(address.trim());
    const labels = label.trim() ? { [main]: label.trim() } : {};

    const add = async () => {
        if (kind === 'entry' && entryId !== null) {
            const response = await fetch(`${adminUrl('cms/entry-picker')}?${pickerQuery({ ids: [entryId], collections: [] })}`, { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
            const found = response.ok ? ((await response.json()) as { items: { title: string; collection: string; status: string }[] }).items[0] : undefined;
            onAdd(newItem({ entry_id: entryId, target: found ? { title: found.title, kind: found.collection, live: found.status === 'published' } : null, labels }));
        } else if (kind === 'term' && choice !== '') {
            const term = terms.find((t) => String(t.id) === choice);
            onAdd(newItem({ term_id: Number(choice), target: term ? { title: term.title, kind: term.taxonomy, live: true } : null, labels }));
        } else if (kind === 'listing' && choice !== '') {
            const listing = listings.find((l) => String(l.id) === choice);
            onAdd(newItem({ collection_id: Number(choice), target: listing ? { title: listing.title, kind: 'Listing page', live: true } : null, labels }));
        } else if (kind === 'url' && address.trim() !== '' && safe && label.trim() !== '') {
            onAdd(newItem({ url: address.trim(), labels }));
        }
    };
    const ready = kind === 'entry' ? entryId !== null : kind === 'url' ? address.trim() !== '' && safe && label.trim() !== '' : choice !== '';

    return (
        <Dialog open={kind !== null} onOpenChange={(open: boolean) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{kind ? TITLES[kind] : ''}</DialogTitle>
                    <DialogDescription>{kind ? DESCRIPTIONS[kind] : ''}</DialogDescription>
                </DialogHeader>
                <div className="cms:flex cms:flex-col cms:gap-3">
                    {kind === 'entry' && (
                        <EntriesPicker id="menu-entry" value={entryId} multiple={false} max={null} collections={[]} invalid={false}
                            emptyHint={MENU_ENTRY_HINT} onChange={(value) => setEntryId(typeof value === 'number' ? value : null)} />
                    )}
                    {(kind === 'term' || kind === 'listing') && (
                        <div className="cms:flex cms:flex-col cms:gap-2">
                            <Label htmlFor="menu-target">{kind === 'term' ? 'Term' : 'Collection'}</Label>
                            <Select value={choice} onValueChange={setChoice}>
                                <SelectTrigger id="menu-target"><SelectValue placeholder="Choose…" /></SelectTrigger>
                                <SelectContent>
                                    {kind === 'term'
                                        ? terms.map((t) => <SelectItem key={t.id} value={String(t.id)}>{t.taxonomy}: {t.title}</SelectItem>)
                                        : listings.map((l) => <SelectItem key={l.id} value={String(l.id)}>{l.title}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    {kind === 'url' && (
                        <div className="cms:flex cms:flex-col cms:gap-2">
                            <Label htmlFor="menu-url">Address</Label>
                            <Input id="menu-url" value={address} placeholder="https://… or /contact" aria-invalid={!safe}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} />
                            {!safe && <p className="cms:text-sm cms:text-destructive">This address could run code; use https://, a path, mailto: or tel:.</p>}
                        </div>
                    )}
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor="menu-label">Label{kind === 'url' ? '' : ' (optional)'}</Label>
                        <Input id="menu-label" value={label} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="button" onClick={() => void add()} disabled={!ready}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
