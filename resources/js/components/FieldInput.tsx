import * as React from 'react';
import { ChevronDown, ChevronRight, ChevronsDownUp, ChevronsUpDown, Plus, Trash2 } from 'lucide-react';
import {
    Badge, Button, Checkbox, DatePicker, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Input, Label, MediaPickerInput,
    moveItem, RichTextEditor, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Skeleton, SortableHandle, type SortableHandleProps, SortableList, Switch, Textarea,
} from '@sunrice/admin-sdk/ui';
import { EntriesPicker } from '@/components/EntriesPicker.tsx';
import { TermsPicker } from '@/components/TermsPicker.tsx';
import { errorsAt } from '@/lib/builder.ts';
import { isShown } from '@/lib/conditions.ts';
import { asRecord, dateInputValue, dateValueFromInput, itemSummary, newBlock, newRow, syncKeys } from '@/lib/values.ts';
import type { Errors, FieldDefinition, Option } from '@/types.ts';

/** Radix's Select can't hold an empty value, so "none" is this. */
const NONE = '__none';

export function FieldError({ message }: { message?: string }) {
    return message ? <p className="cms:text-sm cms:text-destructive">{message}</p> : null;
}

/** Options as {value, label}, from either that or a list of values. */
export function optionsOf(field: FieldDefinition): Option[] {
    const options = field.config?.options;
    if (!Array.isArray(options)) return [];

    return options.flatMap((option): Option[] => {
        if (typeof option === 'string') return [{ value: option, label: option }];
        if (option && typeof option === 'object' && typeof (option as Option).value === 'string') {
            const { value, label } = option as Option;
            return [{ value, label: label || value }];
        }
        return [];
    });
}

interface Props {
    field: FieldDefinition;
    value: unknown;
    onChange: (value: unknown) => void;
    /** Errors by path relative to the value ("" for the value itself, "0.label" in a repeater). */
    errors: Errors;
    /** The input's id, for its label. */
    id: string;
    /** Content (an entry), not settings: rows and blocks get their key and Show switch. */
    content?: boolean;
}

/** Types whose inputs are a list or a set of inputs: labelled as a group. */
const GROUPS = ['repeater', 'group', 'flexible', 'link', 'media', 'rich_text', 'entries'];

/** One input for a field definition, any built-in type. */
/** A field's label, or its handle made readable ("event_day" → "Event day"). */
export function labelOf(field: FieldDefinition): string {
    if (field.label) return field.label;
    const words = field.handle.replace(/_/g, ' ');

    return words.charAt(0).toUpperCase() + words.slice(1);
}

export function FieldInput({ field, value, onChange, errors, id, content = false }: Props) {
    const label = labelOf(field);
    const group = GROUPS.includes(field.type) || (['select', 'terms'].includes(field.type) && field.config?.multiple === true);

    return (
        <div className="cms:flex cms:flex-col cms:gap-2" {...(group ? { role: 'group', 'aria-labelledby': `${id}-label` } : {})}>
            {field.type === 'toggle' ? (
                <div className="cms:flex cms:items-center cms:gap-3">
                    <Switch id={id} checked={value === true} onCheckedChange={(checked: boolean) => onChange(checked)} />
                    <Label htmlFor={id}>{label}</Label>
                </div>
            ) : (
                <Label id={`${id}-label`} htmlFor={group ? undefined : id}>{label}{field.required && <span className="cms:text-destructive"> *</span>}</Label>
            )}
            <Control field={field} value={value} onChange={onChange} errors={errors} id={id} content={content} />
            {['text', 'textarea'].includes(field.type) && numberConfig(field, 'max') !== undefined && (
                <CharacterCount length={typeof value === 'string' ? [...value].length : 0} max={numberConfig(field, 'max') ?? 0} />
            )}
            {field.instructions && <p className="cms:text-sm cms:text-muted-foreground">{field.instructions}</p>}
            <FieldError message={errors['']} />
        </div>
    );
}

/** "123 / 300" under a text with a limit, in red once over it (the server refuses more). */
function CharacterCount({ length, max }: { length: number; max: number }) {
    const over = length > max;

    return (
        <p className={`cms:-mt-1 cms:self-end cms:text-xs cms:tabular-nums ${over ? 'cms:font-medium cms:text-destructive' : 'cms:text-muted-foreground'}`}>
            {length} / {max}{over && <span> · {length - max} too many</span>}
        </p>
    );
}

function Control({ field, value, onChange, errors, id, content }: Props) {
    const invalid = errors[''] !== undefined;
    switch (field.type) {
        case 'toggle':
            return null;
        case 'file':
            // Visitors send files with forms; entries use a media field.
            return <p className="cms:text-sm cms:text-muted-foreground">Visitors attach a file here when they send a form.</p>;
        case 'textarea':
            return <Textarea id={id} aria-invalid={invalid} value={typeof value === 'string' ? value : ''} rows={numberConfig(field, 'rows') ?? 4}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)} />;
        case 'rich_text':
            // The panel's editor; its code loads when the first one shows.
            return <RichTextEditor id={id} labelledBy={`${id}-label`} invalid={invalid} value={typeof value === 'string' ? value : ''} onChange={onChange} />;
        case 'number':
            return (
                <Input
                    id={id} type="number" className="cms:max-w-48" aria-invalid={invalid}
                    value={typeof value === 'number' ? String(value) : typeof value === 'string' ? value : ''}
                    min={numberConfig(field, 'min')} max={numberConfig(field, 'max')} step={numberConfig(field, 'step') ?? 'any'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value === '' ? null : Number(e.target.value))}
                />
            );
        case 'date': {
            const time = field.config?.time === true;
            return <DatePicker id={id} withTime={time} invalid={invalid} required={field.required === true} value={dateValueFromInput(dateInputValue(value, time))}
                onChange={(picked: string | null) => onChange(dateValueFromInput(picked ?? ''))} />;
        }
        case 'select':
            return field.config?.multiple === true
                ? <MultiSelect options={optionsOf(field)} value={Array.isArray(value) ? value.map(String) : []} onChange={onChange} />
                : <SingleSelect options={optionsOf(field)} value={typeof value === 'string' ? value : null} onChange={onChange} id={id} required={field.required === true} />;
        case 'terms': {
            const multiple = field.config?.multiple === true;
            const ids = Array.isArray(value) ? value.filter((v): v is number => typeof v === 'number') : typeof value === 'number' ? value : null;
            return <TermsPicker id={id} taxonomy={typeof field.taxonomy === 'string' ? field.taxonomy : null} multiple={multiple} max={numberConfig(field, 'max') ?? null}
                required={field.required === true} invalid={invalid} value={multiple ? (Array.isArray(ids) ? ids : []) : (typeof ids === 'number' ? ids : null)} onChange={onChange} />;
        }
        case 'entries':
            return <EntriesPicker id={id} invalid={invalid} multiple={field.config?.multiple === true} max={numberConfig(field, 'max') ?? null}
                collections={field.collections ?? []} onChange={onChange}
                value={typeof value === 'number' || (Array.isArray(value) && value.every((v) => typeof v === 'number')) ? value as number | number[] : null} />;
        case 'link':
            return <LinkInput value={asRecord(value)} onChange={onChange} errors={errors} id={id} collections={field.collections ?? []} />;
        case 'media':
            return <MediaPickerInput id={id} invalid={invalid} disabled={false} multiple={field.config?.multiple === true}
                max={numberConfig(field, 'max') ?? null} types={Array.isArray(field.config?.types) ? field.config.types as string[] : []}
                value={typeof value === 'number' || (Array.isArray(value) && value.every((v) => typeof v === 'number')) ? value as number | number[] : null}
                onChange={onChange} />;
        case 'group':
            return <Fields fields={field.fields ?? []} value={asRecord(value)} onChange={onChange} errors={errors} id={id} content={content} />;
        case 'repeater':
            return <Rows field={field} value={Array.isArray(value) ? value : []} onChange={onChange} errors={errors} id={id} content={content} />;
        case 'flexible':
            return <Blocks field={field} value={Array.isArray(value) ? value : []} onChange={onChange} errors={errors} id={id} />;
        default:
            // No maxLength: a pasted text that's too long would be cut silently; the counter shows it instead.
            return <Input id={id} aria-invalid={invalid} value={typeof value === 'string' ? value : ''} placeholder={stringConfig(field, 'placeholder')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} />;
    }
}

function numberConfig(field: FieldDefinition, key: string): number | undefined {
    const value = field.config?.[key];
    return typeof value === 'number' ? value : undefined;
}

function stringConfig(field: FieldDefinition, key: string): string | undefined {
    const value = field.config?.[key];
    return typeof value === 'string' ? value : undefined;
}

/** A set of fields editing one object (a group, a row, a block). */
export function Fields({ fields, value, onChange, errors, id, content, bare = false }: {
    fields: FieldDefinition[]; value: Record<string, unknown>; onChange: (value: Record<string, unknown>) => void; errors: Errors; id: string; content?: boolean;
    /** Without the box around them (a card holds them already). */
    bare?: boolean;
}) {
    return (
        <div className={bare ? 'cms:flex cms:flex-col cms:gap-6' : 'cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4'}>
            {fields.filter((child) => isShown(child, value)).map((child) => child.shared ? (
                <fieldset key={child.handle} disabled className="cms:flex cms:flex-col cms:gap-1">
                    <FieldInput id={`${id}-${child.handle}`} field={child} value={value[child.handle]} content={content} errors={{}} onChange={() => {}} />
                    <p className="cms:text-sm cms:text-muted-foreground">Shared by all languages: edit it in the main language.</p>
                </fieldset>
            ) : (
                <FieldInput key={child.handle} id={`${id}-${child.handle}`} field={child} value={value[child.handle]} content={content}
                    errors={errorsAt(errors, child.handle)}
                    onChange={(next) => onChange({ ...value, [child.handle]: next })} />
            ))}
        </div>
    );
}

function SingleSelect({ options, value, onChange, id, required }: { options: Option[]; value: string | null; onChange: (value: unknown) => void; id: string; required: boolean }) {
    return (
        <Select value={value ?? NONE} onValueChange={(next: string) => onChange(next === NONE ? null : next)}>
            <SelectTrigger id={id} className="cms:w-full cms:max-w-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
                {!required && <SelectItem value={NONE}>None</SelectItem>}
                {options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
            </SelectContent>
        </Select>
    );
}

function MultiSelect({ options, value, onChange }: { options: Option[]; value: string[]; onChange: (value: unknown) => void }) {
    if (options.length === 0) return <p className="cms:text-sm cms:text-muted-foreground">Nothing to choose from yet.</p>;

    return (
        <div className="cms:flex cms:flex-col cms:gap-2">
            {options.map((option) => (
                <label key={option.value} className="cms:flex cms:items-center cms:gap-2 cms:text-sm">
                    <Checkbox
                        checked={value.includes(option.value)}
                        onCheckedChange={(checked: boolean) => onChange(checked
                            ? options.map((o) => o.value).filter((v) => v === option.value || value.includes(v))
                            : value.filter((v) => v !== option.value))}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
}

function LinkInput({ value, onChange, errors, id, collections }: {
    value: Record<string, unknown>; onChange: (value: unknown) => void; errors: Errors; id: string; collections: string[];
}) {
    const type = value.type === 'entry' ? 'entry' : 'url';
    const set = (changes: Record<string, unknown>) => {
        const link: Record<string, unknown> = { ...value, type, ...changes };
        const empty = link.type === 'entry' ? typeof link.entry_id !== 'number' : link.url === '' || link.url === undefined || link.url === null;
        // An empty link is no link; the text and tab choice wait for an address or entry.
        onChange(empty ? (link.label || link.new_tab ? link : null) : link);
    };

    return (
        <div className="cms:flex cms:flex-col cms:gap-2">
            <div role="radiogroup" aria-label="Link to" className="cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5">
                {(['url', 'entry'] as const).map((option) => (
                    <Button key={option} type="button" size="sm" role="radio" aria-checked={type === option} variant={type === option ? 'secondary' : 'ghost'}
                        onClick={() => set({ type: option, url: option === 'url' ? value.url : undefined, entry_id: option === 'entry' ? value.entry_id : undefined })}>
                        {option === 'url' ? 'Address' : 'Entry'}
                    </Button>
                ))}
            </div>
            <div className="cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start">
                {type === 'url'
                    ? <Input id={id} aria-label="Address" placeholder="https://… or /about" value={typeof value.url === 'string' ? value.url : ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => set({ url: e.target.value })} aria-invalid={errors.url !== undefined} />
                    : <EntriesPicker id={id} invalid={errors.entry_id !== undefined} multiple={false} max={null} collections={collections}
                        value={typeof value.entry_id === 'number' ? value.entry_id : null}
                        onChange={(next) => set({ entry_id: typeof next === 'number' ? next : undefined })} />}
                <Input aria-label="Link text" placeholder={type === 'entry' ? 'Link text (the entry\'s title)' : 'Link text'} value={typeof value.label === 'string' ? value.label : ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => set({ label: e.target.value })} />
                <label className="cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm">
                    <Checkbox checked={value.new_tab === true} onCheckedChange={(checked: boolean) => set({ new_tab: checked })} />
                    New tab
                </label>
                <div className="cms:md:col-span-3"><FieldError message={errors.url ?? errors.entry_id ?? errors.label ?? errors.type} /></div>
            </div>
        </div>
    );
}

/** Settings rows (a select's options) are a line of plain inputs; content rows are cards of full fields. */
function isCompact(field: FieldDefinition, content: boolean): boolean {
    return !content && (field.fields ?? []).every((child) => child.type === 'text');
}

/**
 * Keys for a list's items while they're added, removed and dragged (new
 * rows have no id yet): call remove() or move() before changing the list.
 */
function useItemKeys(count: number) {
    const keys = React.useRef<string[]>([]);
    keys.current = syncKeys(keys.current, count);

    return {
        keys: keys.current,
        remove: (index: number) => { keys.current = keys.current.filter((_, i) => i !== index); },
        move: (from: number, to: number) => { keys.current = moveItem(keys.current, from, to); },
    };
}

/**
 * Which rows or blocks of a list are folded, by item key: long lists fold
 * to their bars to scan and reorder. One with an error inside stays open.
 */
function useCollapsed() {
    const [collapsed, setCollapsed] = React.useState<ReadonlySet<string>>(() => new Set());

    return {
        isCollapsed: (key: string, hasErrors: boolean) => !hasErrors && collapsed.has(key),
        toggle: (key: string) => setCollapsed((current) => {
            const next = new Set(current);
            if (!next.delete(key)) next.add(key);
            return next;
        }),
        setAll: (keys: string[], fold: boolean) => setCollapsed(fold ? new Set(keys) : new Set()),
        anyOpen: (keys: string[]) => keys.some((key) => !collapsed.has(key)),
    };
}

/** "Collapse all" / "Expand all" beside a list's Add button, from two items on. */
function FoldAll({ keys, folding }: { keys: string[]; folding: ReturnType<typeof useCollapsed> }) {
    if (keys.length < 2) return null;
    const open = folding.anyOpen(keys);

    return (
        <Button type="button" variant="ghost" size="sm" onClick={() => folding.setAll(keys, open)}>
            {open ? <ChevronsDownUp /> : <ChevronsUpDown />} {open ? 'Collapse all' : 'Expand all'}
        </Button>
    );
}

function Rows({ field, value, onChange, errors, id, content = false }: Omit<Props, 'value'> & { value: unknown[] }) {
    const columns = field.fields ?? [];
    const rows = value.map(asRecord);
    const keys = useItemKeys(rows.length);
    const set = (index: number, row: Record<string, unknown>) => onChange(rows.map((r, i) => (i === index ? row : r)));
    const remove = (index: number) => { keys.remove(index); onChange(rows.filter((_, i) => i !== index)); };
    const noun = (field.label || 'row').toLowerCase().replace(/s$/, '');
    const Noun = noun.charAt(0).toUpperCase() + noun.slice(1);
    const items = rows.map((row, index) => ({ row, index, key: keys.keys[index] ?? String(index) }));
    const folding = useCollapsed();

    return (
        <div className="cms:flex cms:flex-col cms:gap-2">
            <SortableList items={items} getId={(item) => item.key}
                onReorder={(next, from, to) => { keys.move(from, to); onChange(next.map((item) => item.row)); }}>
                {({ row, index, key }, { handle }) => isCompact(field, content) ? (
                    <div className="cms:flex cms:items-start cms:gap-2">
                        <SortableHandle {...handle} label={`Move ${noun} ${index + 1}`} className="cms:mt-1" />
                        {columns.map((column) => (
                            <div key={column.handle} className="cms:flex cms:flex-1 cms:flex-col cms:gap-1">
                                <Input aria-label={column.label || column.handle} placeholder={column.label || column.handle}
                                    value={typeof row[column.handle] === 'string' ? row[column.handle] as string : ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(index, { ...row, [column.handle]: e.target.value })} />
                                <FieldError message={errors[`${index}.${column.handle}`]} />
                            </div>
                        ))}
                        <Button type="button" variant="ghost" size="icon" aria-label={`Remove ${noun} ${index + 1}`} onClick={() => remove(index)}>
                            <Trash2 />
                        </Button>
                    </div>
                ) : (() => {
                    const rowErrors = errorsAt(errors, String(index));
                    const collapsed = folding.isCollapsed(key, Object.keys(rowErrors).length > 0);
                    return (
                        <div className="cms:flex cms:flex-col cms:gap-2">
                            <ItemBar label={`${Noun} ${index + 1}`} summary={itemSummary(columns, row)} handle={handle} onRemove={() => remove(index)}
                                collapsed={collapsed} onToggle={() => folding.toggle(key)} controls={`${id}-${index}-fields`}
                                hidden={content ? row._hidden === true : undefined} onHidden={(hidden) => set(index, { ...row, _hidden: hidden })} />
                            <div id={`${id}-${index}-fields`} hidden={collapsed}>
                                {!collapsed && <Fields fields={columns} value={row} onChange={(next) => set(index, next)} errors={rowErrors} id={`${id}-${index}`} content={content} />}
                            </div>
                        </div>
                    );
                })()}
            </SortableList>
            <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => onChange([...rows, content ? newRow() : {}])}>
                    <Plus /> Add {noun}
                </Button>
                {!isCompact(field, content) && <FoldAll keys={items.map((item) => item.key)} folding={folding} />}
            </div>
        </div>
    );
}

function Blocks({ field, value, onChange, errors, id }: Omit<Props, 'value'> & { value: unknown[] }) {
    const types = field.blocks ?? [];
    const blocks = value.map(asRecord);
    const keys = useItemKeys(blocks.length);
    const set = (index: number, block: Record<string, unknown>) => onChange(blocks.map((b, i) => (i === index ? block : b)));
    const remove = (index: number) => { keys.remove(index); onChange(blocks.filter((_, i) => i !== index)); };
    const items = blocks.map((block, index) => ({ block, index, key: keys.keys[index] ?? String(index) }));
    const folding = useCollapsed();

    return (
        <div className="cms:flex cms:flex-col cms:gap-3">
            <SortableList items={items} getId={(item) => item.key} className="cms:gap-3"
                onReorder={(next, from, to) => { keys.move(from, to); onChange(next.map((item) => item.block)); }}>
                {({ block, index, key }, { handle }) => {
                    const type = types.find((t) => t.type === block.type);
                    const blockErrors = errorsAt(errors, `${index}.values`);
                    const collapsed = folding.isCollapsed(key, Object.keys(blockErrors).length > 0 || errors[`${index}.type`] !== undefined);
                    return (
                        <div className="cms:flex cms:flex-col cms:gap-2">
                            <ItemBar label={type?.label ?? String(block.type)} summary={type ? itemSummary(type.fields, asRecord(block.values)) : null} badge
                                handle={handle} onRemove={() => remove(index)} collapsed={collapsed} onToggle={() => folding.toggle(key)} controls={`${id}-${index}-fields`}
                                hidden={block.hidden === true} onHidden={(hidden) => set(index, { ...block, hidden })} />
                            <div id={`${id}-${index}-fields`} hidden={collapsed}>
                                {collapsed ? null : type ? (
                                    <Fields fields={type.fields} value={asRecord(block.values)} onChange={(values) => set(index, { ...block, values })}
                                        errors={blockErrors} id={`${id}-${index}`} content />
                                ) : (
                                    <p className="cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground">This kind of block no longer exists. Its values are kept.</p>
                                )}
                            </div>
                            <FieldError message={errors[`${index}.type`]} />
                        </div>
                    );
                }}
            </SortableList>
            <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button type="button" variant="outline" size="sm" disabled={types.length === 0}><Plus /> Add block</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {types.map((type) => (
                            <DropdownMenuItem key={type.type} onSelect={() => onChange([...blocks, newBlock(type.type)])}>{type.label}</DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <FoldAll keys={items.map((item) => item.key)} folding={folding} />
            </div>
        </div>
    );
}

/**
 * The bar above a row or block: its drag handle, a fold toggle with its
 * name and what it says, whether the site shows it, and remove.
 */
function ItemBar({ label, summary, badge = false, handle, onRemove, collapsed, onToggle, controls, hidden, onHidden }: {
    label: string; summary?: string | null; badge?: boolean; handle: SortableHandleProps; onRemove: () => void;
    collapsed: boolean; onToggle: () => void; controls: string;
    hidden?: boolean; onHidden: (hidden: boolean) => void;
}) {
    const Chevron = collapsed ? ChevronRight : ChevronDown;
    const name = summary ? `${label}: ${summary}` : label;

    return (
        <div className="cms:flex cms:items-center cms:gap-2">
            <SortableHandle {...handle} label={`Move ${name}`} />
            <button type="button" onClick={onToggle} aria-expanded={!collapsed} aria-controls={controls}
                className="cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring">
                <Chevron className="cms:size-4 cms:shrink-0 cms:text-muted-foreground" aria-hidden />
                {badge ? <Badge variant="secondary">{label}</Badge> : <span className="cms:shrink-0 cms:text-sm cms:font-medium">{label}</span>}
                {summary && <span className="cms:truncate cms:text-sm cms:text-muted-foreground">{summary}</span>}
                <span className="cms:sr-only">{collapsed ? '(collapsed)' : ''}</span>
            </button>
            {hidden !== undefined && (
                <label className="cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground" title="Off: kept here, but left out of the page">
                    <Switch checked={!hidden} onCheckedChange={(shown: boolean) => onHidden(!shown)} aria-label={`${name}: visible on site`} />
                    Visible on site
                </label>
            )}
            <Button type="button" variant="ghost" size="icon" className="cms:size-8 cms:shrink-0 cms:text-destructive"
                aria-label={`Remove ${name}`} onClick={onRemove}><Trash2 /></Button>
        </div>
    );
}
