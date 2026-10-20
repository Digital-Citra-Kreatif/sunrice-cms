import * as React from 'react';
import { Search, X } from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import { Badge, Button, Checkbox, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Skeleton } from '@sunrice/admin-sdk/ui';
import { termPickerQuery } from '@/lib/values.ts';

export interface TermOption { id: number; label: string; depth: number }

/** The chosen terms' titles the page already has (the entry editor sends them), by id. */
export const TermLabels = React.createContext<Record<string, string>>({});

/** Radix's Select can't hold an empty value, so "none" is this. */
const NONE = '__none';

async function fetchTerms(params: { taxonomy: string; q?: string; ids?: number[] }): Promise<{ items: TermOption[]; more: boolean }> {
    const response = await fetch(`${adminUrl('cms/terms/picker')}?${termPickerQuery(params)}`, { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
    if (!response.ok) throw new Error(String(response.status));

    return (await response.json()) as { items: TermOption[]; more: boolean };
}

interface Props {
    id: string;
    taxonomy: string | null;
    multiple: boolean;
    max: number | null;
    required: boolean;
    invalid: boolean;
    value: number | number[] | null;
    onChange: (value: number | number[] | null) => void;
}

/**
 * A terms field: the taxonomy's terms load when it shows (cms/terms/picker);
 * a large taxonomy is searched instead of listed whole.
 */
export function TermsPicker({ id, taxonomy, multiple, max, required, invalid, value, onChange }: Props) {
    const given = React.useContext(TermLabels);
    const ids = value === null ? [] : Array.isArray(value) ? value : [value];
    const [options, setOptions] = React.useState<TermOption[] | null>(null);
    const [searchable, setSearchable] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [fetched, setFetched] = React.useState<Record<number, string>>({});
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        if (!taxonomy) return;
        const q = search.trim();
        const timer = window.setTimeout(() => {
            fetchTerms({ taxonomy, q }).then((result) => {
                setOptions(result.items);
                if (result.more) setSearchable(true);
                setError(false);
            }).catch(() => setError(true));
        }, q === '' ? 0 : 250);
        return () => window.clearTimeout(timer);
    }, [taxonomy, search]);

    const label = (termId: number): string | undefined => given[String(termId)] ?? fetched[termId] ?? options?.find((o) => o.id === termId)?.label;
    // Titles of chosen terms neither the page nor the list gave.
    const unknown = options === null ? '' : ids.filter((termId) => label(termId) === undefined).join(',');
    React.useEffect(() => {
        if (!taxonomy || unknown === '') return;
        fetchTerms({ taxonomy, ids: unknown.split(',').map(Number) })
            .then((result) => setFetched((current) => ({ ...current, ...Object.fromEntries(result.items.map((item) => [item.id, item.label])) })))
            .catch(() => setError(true));
    }, [taxonomy, unknown]);

    if (!taxonomy) return <p className="cms:text-sm cms:text-muted-foreground">Choose a taxonomy for this field in its blueprint.</p>;
    if (options === null) return error ? <p className="cms:text-sm cms:text-destructive">Terms could not be loaded. Try again.</p> : <Skeleton className="cms:h-9 cms:w-full cms:max-w-sm" />;

    const name = (option: TermOption) => `${'— '.repeat(option.depth)}${option.label}`;
    const full = multiple && max !== null && ids.length >= max;
    const set = (next: number[]) => onChange(multiple ? next : (next[0] ?? null));

    // A searched taxonomy lists only some terms: the chosen ones show apart.
    const chosen = searchable && ids.length > 0 && (
        <div className="cms:flex cms:flex-wrap cms:gap-1.5">
            {ids.map((termId) => (
                <Badge key={termId} variant="secondary" className="cms:gap-1 cms:pr-1">
                    {label(termId) ?? `Term #${termId}`}
                    {!(required && !multiple) && (
                        <button type="button" className="cms:rounded-sm cms:p-0.5 cms:hover:bg-muted" aria-label={`Remove ${label(termId) ?? termId}`}
                            onClick={() => set(ids.filter((other) => other !== termId))}><X className="cms:size-3" /></button>
                    )}
                </Badge>
            ))}
        </div>
    );
    const searchBox = searchable && (
        <div className="cms:relative cms:max-w-sm">
            <Search className="cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" />
            <Input id={id} className="cms:pl-9" placeholder="Search terms" autoComplete="off" aria-invalid={invalid} value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
        </div>
    );

    if (!multiple && !searchable) {
        const selected = ids[0];
        const listed = selected === undefined || options.some((o) => o.id === selected);
        return (
            <Select value={selected === undefined ? NONE : String(selected)} onValueChange={(next: string) => onChange(next === NONE ? null : Number(next))}>
                <SelectTrigger id={id} className="cms:w-full cms:max-w-sm" aria-invalid={invalid}><SelectValue /></SelectTrigger>
                <SelectContent>
                    {!required && <SelectItem value={NONE}>None</SelectItem>}
                    {!listed && selected !== undefined && <SelectItem value={String(selected)}>{label(selected) ?? `Term #${selected}`}</SelectItem>}
                    {options.map((option) => <SelectItem key={option.id} value={String(option.id)}>{name(option)}</SelectItem>)}
                </SelectContent>
            </Select>
        );
    }

    return (
        <div className="cms:flex cms:flex-col cms:gap-2">
            {chosen}
            {searchBox}
            {options.length === 0 ? (
                <p className="cms:text-sm cms:text-muted-foreground">{search.trim() ? 'No terms match.' : 'Nothing to choose from yet.'}</p>
            ) : multiple ? (
                <div className="cms:flex cms:max-h-72 cms:flex-col cms:gap-2 cms:overflow-auto">
                    {options.map((option) => {
                        const checked = ids.includes(option.id);
                        return (
                            <label key={option.id} className="cms:flex cms:items-center cms:gap-2 cms:text-sm">
                                <Checkbox checked={checked} disabled={!checked && full}
                                    onCheckedChange={(on: boolean) => set(on ? [...ids, option.id] : ids.filter((other) => other !== option.id))} />
                                {name(option)}
                            </label>
                        );
                    })}
                </div>
            ) : (
                <div role="listbox" aria-label="Terms" className="cms:flex cms:max-h-72 cms:flex-col cms:overflow-auto">
                    {options.map((option) => (
                        <Button key={option.id} type="button" variant={ids[0] === option.id ? 'secondary' : 'ghost'} size="sm" className="cms:justify-start"
                            role="option" aria-selected={ids[0] === option.id} onClick={() => onChange(option.id)}>
                            {name(option)}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}
