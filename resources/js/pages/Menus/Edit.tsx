import * as React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowDown, ArrowLeft, ArrowUp, IndentDecrease, IndentIncrease, Link2, LoaderCircle, Plus, Trash2 } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import {
    Badge, Button, Card, Checkbox, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Input, Label, useBreadcrumbs,
} from '@sunrice/admin-sdk/ui';
import { EntriesPicker } from '@/components/EntriesPicker.tsx';
import { FieldError } from '@/components/FieldInput.tsx';
import { localeName } from '@/lib/entries.ts';
import { type FlatItem, flatten, indent, type MenuNode, moveItem, newItem, outdent, removeItem, toTree } from '@/lib/menu.ts';
import { isSafeUrl, pickerQuery } from '@/lib/values.ts';

interface Props {
    menu: { handle: string; title: string };
    items: MenuNode[];
    locales: string[];
    limits: { depth: number; items: number };
    can: { update: boolean };
}

export default function MenuEdit({ menu, items: initial, locales, limits, can }: Props) {
    const url = adminUrl(`cms/menus/${menu.handle}`);
    useBreadcrumbs([{ label: 'Menus', href: adminUrl('cms/menus') }, { label: menu.title }]);
    const [items, setItems] = React.useState<FlatItem[]>(() => flatten(initial));
    const [adding, setAdding] = React.useState<'entry' | 'url' | null>(null);
    // The tree is recursive; Inertia's form types stop recursing only at `any`.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form = useForm<{ items: any[] }>({ items: initial });
    const errors = form.errors as Record<string, string | undefined>;
    const [dirty, setDirty] = React.useState(false);
    const main = locales[0] ?? 'en';
    const change = (next: FlatItem[]) => { setItems(next); setDirty(true); };
    const update = (index: number, patch: Partial<FlatItem>) => change(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));

    const save = (e: React.FormEvent) => {
        e.preventDefault();
        form.transform(() => ({ items: toTree(items).map(strip) }));
        form.put(url, { preserveScroll: true, onSuccess: () => setDirty(false) });
    };

    return (
        <form onSubmit={save} className="cms:flex cms:max-w-4xl cms:flex-col cms:gap-6">
            <Head title={menu.title} />
            <div className="cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-4">
                <div className="cms:flex cms:min-w-0 cms:items-center cms:gap-3">
                    <Button variant="outline" size="icon" className="cms:size-8 cms:shrink-0" asChild>
                        <Link href={adminUrl('cms/menus')} aria-label="Back to menus"><ArrowLeft /></Link>
                    </Button>
                    <h1 className="cms:truncate cms:text-2xl cms:font-medium cms:tracking-tight">{menu.title}</h1>
                    {dirty && <span className="cms:text-sm cms:text-muted-foreground">Unsaved changes</span>}
                </div>
                {can.update && (
                    <div className="cms:flex cms:gap-2">
                        <Button type="button" variant="outline" disabled={items.length >= limits.items} onClick={() => setAdding('entry')}><Plus /> Entry</Button>
                        <Button type="button" variant="outline" disabled={items.length >= limits.items} onClick={() => setAdding('url')}><Link2 /> Link</Button>
                        <Button type="submit" disabled={form.processing}>{form.processing && <LoaderCircle className="cms:animate-spin" />} Save</Button>
                    </div>
                )}
            </div>
            <FieldError message={errors.items} />
            {Object.keys(errors).some((key) => key.startsWith('items.')) && (
                <p role="alert" className="cms:text-sm cms:text-destructive">Some links need fixing: {Object.values(errors).filter(Boolean)[0]}</p>
            )}

            <Card className="cms:py-0">
                <ul className="cms:divide-y">
                    {items.length === 0 && <li className="cms:p-6 cms:text-center cms:text-muted-foreground">No links yet. Add an entry or a link.</li>}
                    {items.map((item, index) => (
                        <li key={item.key} className="cms:flex cms:flex-col cms:gap-2 cms:p-3" style={{ paddingLeft: `${0.75 + item.depth * 2}rem` }}>
                            <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-2">
                                <Input aria-label={`Label (${localeName(main)})`} className="cms:max-w-xs" disabled={!can.update}
                                    placeholder={item.entry?.title ?? 'Label'} value={item.labels[main] ?? ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, { labels: { ...item.labels, [main]: e.target.value } })} />
                                <span className="cms:min-w-0 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground">
                                    {item.entry_id !== null
                                        ? <>{item.entry?.collection}: {item.entry?.title ?? `Entry #${item.entry_id}`} {item.entry && !item.entry.live && <Badge variant="outline">Not on the site</Badge>}</>
                                        : item.url}
                                </span>
                                {can.update && (
                                    <div className="cms:flex cms:items-center">
                                        <label className="cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm">
                                            <Checkbox checked={item.new_tab} onCheckedChange={(checked: boolean) => update(index, { new_tab: checked })} /> New tab
                                        </label>
                                        <Button type="button" variant="ghost" size="icon" className="cms:size-8" aria-label="Out a level" disabled={item.depth === 0} onClick={() => change(outdent(items, index))}><IndentDecrease /></Button>
                                        <Button type="button" variant="ghost" size="icon" className="cms:size-8" aria-label="In a level" onClick={() => change(indent(items, index, limits.depth))}><IndentIncrease /></Button>
                                        <Button type="button" variant="ghost" size="icon" className="cms:size-8" aria-label="Move up" onClick={() => change(moveItem(items, index, -1))}><ArrowUp /></Button>
                                        <Button type="button" variant="ghost" size="icon" className="cms:size-8" aria-label="Move down" onClick={() => change(moveItem(items, index, 1))}><ArrowDown /></Button>
                                        <Button type="button" variant="ghost" size="icon" className="cms:size-8 cms:text-destructive" aria-label="Remove, with what's under it" onClick={() => change(removeItem(items, index))}><Trash2 /></Button>
                                    </div>
                                )}
                            </div>
                            {locales.length > 1 && (
                                <div className="cms:flex cms:flex-wrap cms:gap-2">
                                    {locales.slice(1).map((code) => (
                                        <Input key={code} aria-label={`Label (${localeName(code)})`} className="cms:max-w-xs" disabled={!can.update}
                                            placeholder={`${localeName(code)}: as ${localeName(main)}`} value={item.labels[code] ?? ''}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update(index, { labels: { ...item.labels, [code]: e.target.value } })} />
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </Card>

            <AddDialog kind={adding} onClose={() => setAdding(null)} onAdd={(item) => { change([...items, item]); setAdding(null); }} main={main} />
        </form>
    );
}

/** What's sent: the tree without the editor's extras. */
function strip({ entry: _entry, children, ...node }: MenuNode): Omit<MenuNode, 'entry'> {
    return { ...node, children: children.map(strip) as MenuNode[] };
}

function AddDialog({ kind, onClose, onAdd, main }: { kind: 'entry' | 'url' | null; onClose: () => void; onAdd: (item: FlatItem) => void; main: string }) {
    const [entryId, setEntryId] = React.useState<number | null>(null);
    const [address, setAddress] = React.useState('');
    const [label, setLabel] = React.useState('');
    React.useEffect(() => { setEntryId(null); setAddress(''); setLabel(''); }, [kind]);
    const safe = address.trim() === '' || isSafeUrl(address.trim());

    const add = async () => {
        if (kind === 'entry' && entryId !== null) {
            const response = await fetch(`${adminUrl('cms/entry-picker')}?${pickerQuery({ ids: [entryId], collections: [] })}`, { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
            const found = response.ok ? ((await response.json()) as { items: { title: string; collection: string; status: string }[] }).items[0] : undefined;
            onAdd(newItem({ entry_id: entryId, entry: found ? { title: found.title, collection: found.collection, live: found.status === 'published' } : null, labels: label ? { [main]: label } : {} }));
        } else if (kind === 'url' && address.trim() !== '' && safe && label.trim() !== '') {
            onAdd(newItem({ url: address.trim(), labels: { [main]: label.trim() } }));
        }
    };

    return (
        <Dialog open={kind !== null} onOpenChange={(open: boolean) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{kind === 'entry' ? 'Link to an entry' : 'Link to an address'}</DialogTitle>
                    <DialogDescription>
                        {kind === 'entry' ? 'It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site.' : 'A web address, a path on this site (/contact), mailto: or tel:.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="cms:flex cms:flex-col cms:gap-3">
                    {kind === 'entry' ? (
                        <EntriesPicker id="menu-entry" value={entryId} multiple={false} max={null} collections={[]} invalid={false}
                            onChange={(value) => setEntryId(typeof value === 'number' ? value : null)} />
                    ) : (
                        <div className="cms:flex cms:flex-col cms:gap-2">
                            <Label htmlFor="menu-url">Address</Label>
                            <Input id="menu-url" value={address} placeholder="https://… or /contact" aria-invalid={!safe}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} />
                            {!safe && <p className="cms:text-sm cms:text-destructive">This address could run code; use https://, a path, mailto: or tel:.</p>}
                        </div>
                    )}
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor="menu-label">Label{kind === 'entry' ? ' (optional)' : ''}</Label>
                        <Input id="menu-label" value={label} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="button" onClick={() => void add()}
                        disabled={kind === 'entry' ? entryId === null : address.trim() === '' || !safe || label.trim() === ''}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
