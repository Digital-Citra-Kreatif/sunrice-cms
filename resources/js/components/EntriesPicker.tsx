import * as React from 'react';
import { Search, X } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import { Badge, Button, Input, SortableHandle, SortableList } from '@sunrice/admin-sdk/ui';
import { pickerQuery } from '@/lib/values.ts';
import { type EntryStatus, statusLabel } from '@/lib/entries.ts';

interface Item { id: number; title: string; collection: string; status: EntryStatus }

interface Props {
    id: string;
    value: number | number[] | null;
    multiple: boolean;
    max: number | null;
    /** Collection handles to choose from; none for any. */
    collections: string[];
    invalid: boolean;
    onChange: (value: number | number[] | null) => void;
}

/** The entries found, and the asked-for collections the user can't pick from (by title). */
async function fetchItems(params: { ids?: number[]; search?: string; collections: string[] }): Promise<{ items: Item[]; unavailable: string[] }> {
    const response = await fetch(`${adminUrl('cms/entry-picker')}?${pickerQuery(params)}`, { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
    if (!response.ok) throw new Error(String(response.status));
    const body = (await response.json()) as { items: Item[]; unavailable?: string[] };

    return { items: body.items, unavailable: body.unavailable ?? [] };
}

/** "Agents", "Agents and Pages", "Agents, Pages and Posts". */
function titles(names: string[]): string {
    return names.length < 2 ? (names[0] ?? '') : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

/**
 * Choose entries: the most recently edited show on focus, typing searches
 * their titles; several are kept in the order they're dragged into.
 */
export function EntriesPicker({ id, value, multiple, max, collections, invalid, onChange }: Props) {
    const ids = value === null ? [] : Array.isArray(value) ? value : [value];
    const [known, setKnown] = React.useState<Record<number, Item>>({});
    const [search, setSearch] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [results, setResults] = React.useState<Item[] | null>(null);
    const [unavailable, setUnavailable] = React.useState<string[]>([]);
    const [error, setError] = React.useState(false);
    const full = multiple && max !== null && ids.length >= max;

    // Titles of the chosen entries we haven't seen yet.
    const unknown = ids.filter((entryId) => !known[entryId]).join(',');
    React.useEffect(() => {
        if (unknown === '') return;
        fetchItems({ ids: unknown.split(',').map(Number), collections })
            .then(({ items }) => setKnown((current) => ({ ...current, ...Object.fromEntries(items.map((item) => [item.id, item])) })))
            .catch(() => setError(true));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unknown]);

    // While the search box has focus: the latest entries, or those matching what's typed.
    React.useEffect(() => {
        if (!open) { setResults(null); return; }
        const timer = window.setTimeout(() => {
            fetchItems({ search: search.trim(), collections })
                .then((found) => { setResults(found.items); setUnavailable(found.unavailable); setError(false); })
                .catch(() => setError(true));
        }, search.trim() === '' ? 0 : 250);
        return () => window.clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, open]);

    const pick = (item: Item) => {
        setKnown((current) => ({ ...current, [item.id]: item }));
        onChange(multiple ? [...ids, item.id] : item.id);
        setSearch('');
    };
    const set = (next: number[]) => onChange(multiple ? next : (next[0] ?? null));

    return (
        <div className="cms:flex cms:flex-col cms:gap-2">
            {ids.length > 0 && (
                <SortableList items={ids} getId={(entryId) => entryId} onReorder={(next) => set(next)} disabled={!multiple} className="cms:gap-1">
                    {(entryId, { handle }) => {
                        const item = known[entryId];
                        return (
                            <div className="cms:flex cms:items-center cms:gap-2 cms:rounded-md cms:border cms:bg-card cms:px-2 cms:py-1 cms:text-sm">
                                {multiple && <SortableHandle {...handle} label={`Move ${item?.title ?? entryId}`} />}
                                <span className={`cms:min-w-0 cms:flex-1 cms:truncate ${multiple ? '' : 'cms:pl-1'}`}>{item ? item.title : `Entry #${entryId}`}</span>
                                {item && <span className="cms:text-xs cms:text-muted-foreground">{item.collection}</span>}
                                {item && <Badge variant={item.status === 'published' ? 'success' : 'secondary'}>{statusLabel(item.status)}</Badge>}
                                <Button type="button" variant="ghost" size="icon" className="cms:size-7" aria-label={`Remove ${item?.title ?? entryId}`}
                                    onClick={() => set(ids.filter((other) => other !== entryId))}><X /></Button>
                            </div>
                        );
                    }}
                </SortableList>
            )}
            {!full && (multiple || ids.length === 0) && (
                <div className="cms:relative cms:max-w-md">
                    <Search className="cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" />
                    <Input id={id} className="cms:pl-9" placeholder="Search entries by title" aria-invalid={invalid} value={search} autoComplete="off"
                        aria-expanded={results !== null} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Escape' && open) { e.preventDefault(); setOpen(false); } }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value); setOpen(true); }} />
                    {results !== null && (
                        <ul role="listbox" aria-label="Matching entries" className="cms:absolute cms:z-10 cms:mt-1 cms:max-h-64 cms:w-full cms:overflow-auto cms:rounded-md cms:border cms:bg-card cms:p-1 cms:shadow-md">
                            {results.filter((item) => !ids.includes(item.id)).length === 0 && (
                                <li className="cms:p-2 cms:text-sm cms:text-muted-foreground">{search.trim() === '' ? 'No entries yet.' : 'No entries match.'}</li>
                            )}
                            {unavailable.length > 0 && (
                                <li className="cms:p-2 cms:text-sm cms:text-muted-foreground">
                                    Your role can't see entries of {titles(unavailable)}: ask an editor to link them.
                                </li>
                            )}
                            {results.filter((item) => !ids.includes(item.id)).map((item) => (
                                <li key={item.id} role="option" aria-selected={false}>
                                    <button type="button" className="cms:flex cms:w-full cms:items-center cms:gap-2 cms:rounded cms:px-2 cms:py-1.5 cms:text-left cms:text-sm cms:hover:bg-accent"
                                        // Keeps the focus in the search box, so the list stays open for the next pick.
                                        onMouseDown={(e: React.MouseEvent) => e.preventDefault()} onClick={() => pick(item)}>
                                        <span className="cms:flex-1 cms:truncate">{item.title}</span>
                                        <span className="cms:text-xs cms:text-muted-foreground">{item.collection}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            {error && <p className="cms:text-sm cms:text-destructive">Entries could not be loaded. Try again.</p>}
        </div>
    );
}
