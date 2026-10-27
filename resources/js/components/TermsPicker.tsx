import * as React from 'react';
import { usePage } from '@inertiajs/react';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';
import { adminUrl, t } from '@imajiner/admin-sdk';
import { Button, Popover, PopoverAnchor, PopoverContent, PopoverTrigger, Skeleton } from '@imajiner/admin-sdk/ui';
import { appendPage, chosenIds, isFull, moveActive, parentPaths, pickTerm, termPath, termValue, withoutLast, type TermOption } from '@/lib/term-picker.ts';
import { termPickerQuery } from '@/lib/values.ts';

export type { TermOption } from '@/lib/term-picker.ts';

/** The chosen terms' titles the page already has (the entry editor sends them), by id. */
export const TermLabels = React.createContext<Record<string, string>>({});

/** A term as the picker's list gives it; looked up by id, with its parents' titles (top first). */
interface Page { items: (TermOption & { parents?: string[] })[]; more: boolean }

/** The chosen terms' parents' titles the page has (the entry editor's `termParents`), by id. */
function givenParents(props: Record<string, unknown>): Record<string, string[]> {
    const parents = props.termParents;

    return parents && typeof parents === 'object' && !Array.isArray(parents) ? parents as Record<string, string[]> : {};
}

async function fetchTerms(params: { taxonomy: string; q?: string; offset?: number; ids?: number[] }, signal?: AbortSignal): Promise<Page> {
    const response = await fetch(`${adminUrl('cms/terms/picker')}?${termPickerQuery(params)}`, { headers: { Accept: 'application/json' }, credentials: 'same-origin', signal });
    if (!response.ok) throw new Error(String(response.status));

    return (await response.json()) as Page;
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

/** What's known of a term: its title, and its parents' when the tree was listed. */
interface Known { label: string; parents?: string[] }

/**
 * A terms field: the chosen terms as chips, and a button opening a searchable
 * list of the taxonomy's terms (cms/terms/picker, loaded when it opens, a
 * page at a time, searched on the server).
 */
export function TermsPicker({ id, taxonomy, multiple, max, required, invalid, value, onChange }: Props) {
    const given = React.useContext(TermLabels);
    // So a chip's tooltip says "News › Local" before the list is opened.
    const parentsGiven = givenParents(usePage().props as Record<string, unknown>);
    const ids = chosenIds(value);
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [list, setList] = React.useState<(Page & { q: string }) | null>(null);
    const [loadingMore, setLoadingMore] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [attempt, setAttempt] = React.useState(0);
    const [known, setKnown] = React.useState<Record<number, Known>>({});
    const [active, setActive] = React.useState(-1);
    // Set from a press in the box until its click is handled: see onInteractOutside.
    const pressedInBox = React.useRef(false);
    const input = React.useRef<HTMLInputElement>(null);
    const loaded = React.useRef<string | null>(null);
    const q = search.trim();

    const remember = React.useCallback((items: Page['items'], tree: boolean) => {
        const paths = tree ? parentPaths(items) : {};
        setKnown((current) => {
            const next = { ...current };
            for (const item of items) next[item.id] = { label: item.label, parents: paths[item.id] ?? item.parents ?? current[item.id]?.parents };
            return next;
        });
    }, []);

    // The list loads when the picker opens, and again as the search changes.
    const wanted = open && taxonomy ? q : null;
    React.useEffect(() => {
        if (wanted === null || taxonomy === null || loaded.current === `${taxonomy}\n${wanted}`) return;
        const controller = new AbortController();
        const timer = window.setTimeout(() => {
            fetchTerms({ taxonomy, q: wanted }, controller.signal).then((page) => {
                loaded.current = `${taxonomy}\n${wanted}`;
                setList({ ...page, q: wanted });
                remember(page.items, wanted === '');
                setActive(wanted !== '' && page.items.length > 0 ? 0 : -1);
                setError(false);
            }).catch((e: unknown) => {
                if (!(e instanceof DOMException && e.name === 'AbortError')) setError(true);
            });
        }, wanted === '' ? 0 : 250);
        return () => {
            window.clearTimeout(timer);
            controller.abort();
        };
    }, [taxonomy, wanted, attempt, remember]);

    const label = (termId: number): string | undefined => given[String(termId)] ?? known[termId]?.label;
    // Titles of chosen terms neither the page nor a list gave.
    const unknown = ids.filter((termId) => label(termId) === undefined).join(',');
    React.useEffect(() => {
        if (!taxonomy || unknown === '') return;
        fetchTerms({ taxonomy, ids: unknown.split(',').map(Number) }).then((page) => remember(page.items, false)).catch(() => undefined);
    }, [taxonomy, unknown, remember]);

    const loadMore = () => {
        if (!taxonomy || !list?.more || loadingMore || list.q !== q) return;
        setLoadingMore(true);
        fetchTerms({ taxonomy, q: list.q, offset: list.items.length }).then((page) => {
            const items = appendPage(list.items, page.items);
            setList({ items, more: page.more, q: list.q });
            remember(items, list.q === '');
        }).catch(() => setError(true)).finally(() => setLoadingMore(false));
    };

    // The highlighted option stays in view.
    React.useEffect(() => {
        if (active >= 0 && list) document.getElementById(`${id}-option-${list.items[active]?.id}`)?.scrollIntoView({ block: 'nearest' });
    }, [active, id, list]);

    if (!taxonomy) return <p className="cms:text-sm cms:text-muted-foreground">{t('Choose a taxonomy for this field in its blueprint.')}</p>;

    const full = isFull(ids, multiple, max);
    const removable = multiple || !required;
    const set = (next: number[]) => onChange(termValue(next, multiple));
    const pick = (termId: number) => {
        set(pickTerm(ids, termId, multiple, max));
        if (!multiple) setOpen(false);
    };
    const items = list?.items ?? [];
    const disabled = (index: number) => full && !ids.includes(items[index]?.id ?? -1);
    const name = (termId: number) => label(termId) ?? t('Term #:id', { id: termId });

    const onOpenChange = (next: boolean) => {
        if (!next) setSearch('');
        setOpen(next);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const next = moveActive(active, event.key, items.length, disabled);
            if (event.key === 'ArrowDown' && next === active && active === items.length - 1) loadMore();
            setActive(next);
        } else if (event.key === 'Enter') {
            event.preventDefault();
            const item = items[active];
            if (item && !disabled(active)) pick(item.id);
        } else if (event.key === 'Backspace' && search === '' && removable && ids.length > 0) {
            event.preventDefault();
            set(withoutLast(ids));
        }
    };

    const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const el = event.currentTarget;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 48) loadMore();
    };

    const placeholder = multiple ? t('Choose terms…') : t('Choose a term…');
    const listId = `${id}-listbox`;
    const stale = list !== null && list.q !== q;

    let body: React.ReactNode;
    if (error) {
        body = (
            <div className="cms:flex cms:flex-col cms:items-start cms:gap-2 cms:p-3 cms:text-sm">
                <p className="cms:text-destructive">{t('Terms could not be loaded.')}</p>
                <Button type="button" variant="outline" size="sm" onClick={() => { setError(false); setAttempt((n) => n + 1); }}>{t('Try again')}</Button>
            </div>
        );
    } else if (list === null) {
        body = (
            <div className="cms:flex cms:flex-col cms:gap-2 cms:p-2" aria-busy="true" aria-label={t('Loading terms')}>
                {[70, 55, 80, 45, 65].map((w) => <Skeleton key={w} className="cms:h-5" style={{ width: `${w}%` }} />)}
            </div>
        );
    } else if (items.length === 0) {
        body = <p className="cms:p-3 cms:text-sm cms:text-muted-foreground">{list.q ? t('No terms match “:search”.', { search: list.q }) : t('Nothing to choose from yet.')}</p>;
    } else {
        body = (
            <div className={`cms:max-h-72 cms:overflow-y-auto cms:overscroll-contain cms:p-1 ${stale ? 'cms:opacity-60' : ''}`} onScroll={onScroll}>
                <div role="listbox" id={listId} aria-label={t('Terms')} aria-multiselectable={multiple || undefined} aria-busy={stale || undefined}>
                    {items.map((item, index) => {
                        const selected = ids.includes(item.id);
                        const off = disabled(index);
                        const path = termPath(item.label, known[item.id]?.parents);
                        return (
                            <div key={item.id} id={`${id}-option-${item.id}`} role="option" aria-selected={selected} aria-disabled={off || undefined} title={path}
                                className={`cms:flex cms:cursor-default cms:items-center cms:gap-2 cms:rounded-sm cms:py-1.5 cms:pr-2 cms:text-sm cms:select-none ${index === active ? 'cms:bg-accent cms:text-accent-foreground' : ''} ${off ? 'cms:opacity-50' : ''}`}
                                style={{ paddingLeft: `${0.5 + Math.min(item.depth, 6) * 0.875}rem` }}
                                onMouseDown={(event) => event.preventDefault()} onMouseMove={() => { if (index !== active) setActive(index); }}
                                onClick={() => { if (!off) pick(item.id); }}>
                                <Check className={`cms:size-4 cms:shrink-0 ${selected ? '' : 'cms:invisible'}`} aria-hidden="true" />
                                <span className="cms:min-w-0 cms:truncate">{item.label}</span>
                            </div>
                        );
                    })}
                </div>
                {list.more && (
                    <Button type="button" variant="ghost" size="sm" className="cms:mt-1 cms:w-full" disabled={loadingMore} onMouseDown={(event: React.MouseEvent) => event.preventDefault()} onClick={loadMore}>
                        {loadingMore ? t('Loading…') : t('Load more')}
                    </Button>
                )}
            </div>
        );
    }

    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            {/* The list is placed against the whole box, not the Add… button after the chips: under it, at its width,
                where it opened, however many terms are chosen (it doesn't flip above near the bottom of the window). */}
            <PopoverAnchor asChild>
            <div data-terms-box="" onPointerDownCapture={() => { pressedInBox.current = true; }}
                onClickCapture={() => { setTimeout(() => { pressedInBox.current = false; }, 0); }}
                data-invalid={invalid || undefined}
                className="cms:flex cms:w-full cms:max-w-xl cms:min-w-0 cms:[contain:inline-size] cms:flex-wrap cms:items-center cms:gap-1 cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:p-1 cms:shadow-xs cms:data-invalid:border-destructive cms:dark:bg-input/20">
                {ids.map((termId) => (
                    <span key={termId} title={termPath(name(termId), known[termId]?.parents ?? parentsGiven[String(termId)])}
                        className="cms:inline-flex cms:h-7 cms:max-w-full cms:min-w-0 cms:items-center cms:gap-0.5 cms:rounded-sm cms:bg-secondary cms:pl-2 cms:text-xs cms:font-medium cms:text-secondary-foreground">
                        <span className={`cms:min-w-0 cms:truncate ${removable ? '' : 'cms:pr-2'}`}>{name(termId)}</span>
                        {removable && (
                            <button type="button" className="cms:inline-flex cms:size-7 cms:shrink-0 cms:items-center cms:justify-center cms:rounded-sm cms:text-muted-foreground cms:hover:bg-muted cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none"
                                aria-label={t('Remove :term', { term: name(termId) })} onMouseDown={(event: React.MouseEvent) => { if (open) event.preventDefault(); }}
                                onClick={() => { set(ids.filter((other) => other !== termId)); if (open) input.current?.focus(); }}>
                                <X className="cms:size-3" aria-hidden="true" />
                            </button>
                        )}
                    </span>
                ))}
                <PopoverTrigger asChild>
                    <button id={id} type="button" aria-haspopup="listbox" aria-invalid={invalid || undefined}
                        className="cms:flex cms:h-7 cms:min-w-24 cms:flex-1 cms:items-center cms:justify-between cms:gap-1 cms:rounded-sm cms:px-2 cms:text-left cms:text-sm cms:text-muted-foreground cms:hover:bg-muted cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none cms:disabled:pointer-events-none cms:disabled:opacity-50">
                        <span className="cms:truncate">{ids.length === 0 ? placeholder : multiple ? t('Add…') : t('Change…')}</span>
                        <ChevronsUpDown className="cms:size-4 cms:shrink-0 cms:opacity-60" aria-hidden="true" />
                    </button>
                </PopoverTrigger>
            </div>
            </PopoverAnchor>
            <PopoverContent side="bottom" align="start" sideOffset={4} avoidCollisions={false} className="cms:max-w-[calc(100vw-2rem)] cms:p-0" style={{ width: 'var(--radix-popper-anchor-width)' }}
                // Removing a chip (its ×, in the box) keeps the list open.
                // A press inside the box (removing a chip) isn't outside the list, though Radix only checks after the click, once the × is gone.
                onInteractOutside={(event: Event) => { if (pressedInBox.current || (event.target instanceof Element && event.target.closest('[data-terms-box]'))) event.preventDefault(); }}
                // Focus left with a removed chip (on the page itself) isn't leaving the list.
                onFocusOutside={(event: Event) => { const target = event.target; if (!(target instanceof Element) || target === document.body || target.closest('[data-terms-box]')) event.preventDefault(); }}
                onOpenAutoFocus={(event: Event) => { event.preventDefault(); input.current?.focus(); }}>
                <div className="cms:relative cms:border-b cms:border-border/60">
                    <Search className="cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground" aria-hidden="true" />
                    <input ref={input} type="text" role="combobox" aria-expanded="true" aria-controls={listId} aria-autocomplete="list" aria-label={t('Search terms')}
                        aria-activedescendant={active >= 0 && items[active] ? `${id}-option-${items[active].id}` : undefined}
                        className="cms:h-10 cms:w-full cms:bg-transparent cms:pr-3 cms:pl-9 cms:text-sm cms:outline-none cms:placeholder:text-muted-foreground"
                        placeholder={t('Search terms')} autoComplete="off" value={search} onKeyDown={onKeyDown}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)} />
                </div>
                {body}
                {full && max !== null && <p className="cms:border-t cms:border-border/60 cms:px-3 cms:py-2 cms:text-xs cms:text-muted-foreground">{t('Up to :max terms.', { max })}</p>}
            </PopoverContent>
        </Popover>
    );
}
