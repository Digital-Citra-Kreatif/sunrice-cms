import * as React from 'react';
import { ChevronDown, ChevronRight, ChevronsDownUp, ChevronsUpDown, Plus, Trash2 } from 'lucide-react';
import {
    Badge, Button, Checkbox, CodeEditor, DatePicker, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Input, Label, MediaPickerInput,
    moveItem, RichTextEditor, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SortableHandle, type SortableHandleProps, SortableList, Switch, Textarea,
} from '@imajiner/admin-sdk/ui';
import { t } from '@imajiner/admin-sdk';
import { EntriesPicker } from '@/components/EntriesPicker.tsx';
import { FieldError } from '@/components/FieldError.tsx';
import { AFFIXED_INPUT, Affixed, FieldHint, HelperText, SharedHint } from '@/components/FieldPresentation.tsx';
import { TermsPicker } from '@/components/TermsPicker.tsx';
import { errorsAt } from '@/lib/builder.ts';
import { codeLanguageOf } from '@/lib/code.ts';
import { isShown } from '@/lib/conditions.ts';
import { affixesOf, CONTAINER_TYPES, hintOf } from '@/lib/presentation.ts';
import { fieldGrid, widthClass } from '@/lib/width.ts';
import { asRecord, dateInputValue, dateValueFromInput, groupedNumber, itemSummary, linkValue, offersEmptyChoice, newBlock, newRow, switchLink, syncKeys, type LinkKind, type LinkTargets } from '@/lib/values.ts';
import type { Errors, FieldDefinition, Option } from '@/types.ts';

/** Radix's Select can't hold an empty value, so "none" is this. */
const NONE = '__none';

export { FieldError };

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
    /** A number fills its place (the builder's compact rows) instead of keeping its own width. */
    fill?: boolean;
    /** Beside the label: the entry editor's "Changed" marker. */
    marker?: React.ReactNode;
    /**
     * Shared by all languages, shown read-only in another language than the
     * main one: says under it where to change it (SharedHint). A field inside
     * a group, row or block the server marks `shared` is, unless said otherwise.
     */
    shared?: boolean;
}

/** Types whose inputs are a list or a set of inputs: labelled as a group. */
const GROUPS = ['repeater', 'group', 'flexible', 'link', 'media', 'rich_text', 'entries'];

/** A field's label, or its handle made readable ("event_day" → "Event day"). */
export function labelOf(field: FieldDefinition): string {
    if (field.label) return field.label;
    const words = field.handle.replace(/_/g, ' ');

    return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * One input for a field definition, any built-in type, presented like
 * Filament's: the label (and required mark) with the hint and its ⓘ at the
 * right, the input (a text or number one with its prefix and suffix), the
 * helper text under it, then the error. A group, repeater or flexible field
 * has its helper text under its label instead: there's no one input to be under.
 * A field shared by all languages has, after its helper text, where to edit it.
 */
export function FieldInput({ field, value, onChange, errors, id, content = false, fill = false, marker = null, shared = field.shared === true }: Props) {
    const label = labelOf(field);
    const group = GROUPS.includes(field.type) || (['select', 'terms'].includes(field.type) && field.config?.multiple === true);
    // The message under a group of inputs (ticked choices, a group's fields) is tied to the group.
    const invalid = errors[''] !== undefined;
    const container = CONTAINER_TYPES.includes(field.type);
    const helper = field.instructions && field.instructions.trim() !== '' ? <HelperText id={`${id}-help`} text={field.instructions} /> : null;
    const sharedHint = shared ? <SharedHint id={`${id}-shared`} /> : null;
    const { hint } = hintOf(field);
    const { prefix, suffix } = affixesOf(field);
    // What the input is described by: its hint, prefix and suffix, helper text, where to edit it (shared) and error.
    const describedBy = [hint && `${id}-hint`, prefix && `${id}-prefix`, suffix && `${id}-suffix`, helper && `${id}-help`, sharedHint && `${id}-shared`, invalid && `${id}-error`].filter(Boolean).join(' ') || undefined;

    return (
        <div className="cms:flex cms:min-w-0 cms:flex-col cms:gap-2"
            {...(group ? { role: 'group', 'aria-labelledby': `${id}-label`, ...(invalid ? { 'aria-invalid': true } : {}), ...(invalid || helper || sharedHint ? { 'aria-describedby': [helper && `${id}-help`, sharedHint && `${id}-shared`, invalid && `${id}-error`].filter(Boolean).join(' ') } : {}) } : {})}>
            {field.type === 'toggle' ? (
                <div className="cms:flex cms:min-w-0 cms:items-center cms:gap-3">
                    <Switch id={id} checked={value === true} aria-describedby={describedBy} onCheckedChange={(checked: boolean) => onChange(checked)} />
                    <Label htmlFor={id} className="cms:min-w-0">{label}</Label>
                    {marker}
                    <FieldHint field={field} id={id} label={label} />
                </div>
            ) : (
                <div className="cms:flex cms:min-h-4 cms:min-w-0 cms:items-center cms:gap-2">
                    <Label id={`${id}-label`} htmlFor={group ? undefined : id} className="cms:min-w-0">{label}{field.required && <span className="cms:text-destructive"> *</span>}{marker}</Label>
                    <FieldHint field={field} id={id} label={label} />
                </div>
            )}
            {container && helper}
            {container && sharedHint}
            <Control field={field} value={value} onChange={onChange} errors={errors} id={id} content={content} fill={fill} describedBy={describedBy} />
            {['text', 'textarea', 'code'].includes(field.type) && numberConfig(field, 'max') !== undefined && (
                <CharacterCount length={typeof value === 'string' ? [...value].length : 0} max={numberConfig(field, 'max') ?? 0} />
            )}
            {!container && helper}
            {!container && sharedHint}
            <FieldError message={errors['']} id={`${id}-error`} />
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

function Control({ field, value, onChange, errors, id, content, fill = false, describedBy }: Props & {
    /** The ids that describe a single input (hint, prefix, suffix, helper text, error). */
    describedBy?: string;
}) {
    const invalid = errors[''] !== undefined;
    const { prefix, suffix } = affixesOf(field);
    const affixed = prefix !== null || suffix !== null;
    switch (field.type) {
        case 'toggle':
            return null;
        case 'file':
            // Visitors send files with forms; entries use a media field.
            return <p className="cms:text-sm cms:text-muted-foreground">{t('Visitors attach a file here when they send a form.')}</p>;
        case 'textarea':
            return <Textarea id={id} aria-invalid={invalid} aria-describedby={describedBy} value={typeof value === 'string' ? value : ''} rows={numberConfig(field, 'rows') ?? 4}
                placeholder={stringConfig(field, 'placeholder')} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)} />;
        case 'code':
            // The panel's code editor (CodeMirror); its code loads when the first one shows, a textarea meanwhile.
            return <CodeEditor id={id} aria-labelledby={`${id}-label`} aria-describedby={describedBy} invalid={invalid} language={codeLanguageOf(field)}
                value={typeof value === 'string' ? value : ''} placeholder={stringConfig(field, 'placeholder')} onChange={(code: string) => onChange(code)} />;
        case 'rich_text':
            // The panel's editor; its code loads when the first one shows.
            return <RichTextEditor id={id} labelledBy={`${id}-label`} invalid={invalid} value={typeof value === 'string' ? value : ''} onChange={onChange} />;
        case 'number': {
            const echo = groupedNumber(value);
            return (
                <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-3">
                    {/* With a prefix or suffix the box is a little wider, so the number keeps its room. */}
                    <Affixed prefix={prefix} suffix={suffix} id={id} className={fill ? '' : 'cms:max-w-64'}>
                        <Input
                            id={id} type="number" className={affixed ? AFFIXED_INPUT : fill ? 'cms:w-full' : 'cms:max-w-48'} placeholder={stringConfig(field, 'placeholder')} aria-invalid={invalid}
                            aria-describedby={[describedBy, echo && `${id}-grouped`].filter(Boolean).join(' ') || undefined}
                            value={typeof value === 'number' ? String(value) : typeof value === 'string' ? value : ''}
                            min={numberConfig(field, 'min')} max={numberConfig(field, 'max')} step={numberConfig(field, 'step') ?? 'any'}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value === '' ? null : Number(e.target.value))}
                        />
                    </Affixed>
                    {/* Long numbers read back grouped, so 18500000000 can't be mistaken for 1850000000. */}
                    {echo && <span id={`${id}-grouped`} className="cms:text-sm cms:tabular-nums cms:text-muted-foreground">{echo}</span>}
                </div>
            );
        }
        case 'date': {
            const time = field.config?.time === true;
            return <DatePicker id={id} withTime={time} invalid={invalid} required={field.required === true} value={dateValueFromInput(dateInputValue(value, time))}
                onChange={(picked: string | null) => onChange(dateValueFromInput(picked ?? ''))} />;
        }
        case 'select':
            return field.config?.multiple === true
                ? <MultiSelect options={optionsOf(field)} value={Array.isArray(value) ? value.map(String) : []} onChange={onChange} invalid={invalid}
                    empty={typeof field.config?.empty === 'string' ? field.config.empty : undefined} inTickOrder={field.config?.in_tick_order === true} />
                : <SingleSelect options={optionsOf(field)} value={typeof value === 'string' ? value : null} onChange={onChange} id={id} fill={fill}
                    empty={offersEmptyChoice(optionsOf(field), field.required === true, typeof field.config?.default === 'string' && field.config.default !== '', typeof value === 'string' && value !== '')} />;
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
            return <LinkInput label={labelOf(field)} value={asRecord(value)} onChange={onChange} errors={errors} id={id} collections={field.collections ?? []}
                placeholder={stringConfig(field, 'placeholder')} describedBy={describedBy} />;
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
            return (
                <Affixed prefix={prefix} suffix={suffix} id={id}>
                    <Input id={id} aria-invalid={invalid} aria-describedby={describedBy} className={affixed ? AFFIXED_INPUT : undefined} value={typeof value === 'string' ? value : ''}
                        placeholder={stringConfig(field, 'placeholder')} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} />
                </Affixed>
            );
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
    // Side by side by their widths (lib/width.ts); a box around them unless a card holds them already.
    const grid = <div className={fieldGrid(bare ? undefined : 'cms:gap-4')}>
        {fields.filter((child) => isShown(child, value)).map((child) => child.shared ? (
            // Greyed out, with where to edit it under it.
            <fieldset key={child.handle} disabled className={`cms:flex cms:flex-col cms:gap-1 cms:opacity-60 ${widthClass(child)}`}>
                <FieldInput id={`${id}-${child.handle}`} field={child} value={value[child.handle]} content={content} errors={{}} onChange={() => {}} shared />
            </fieldset>
        ) : (
            <div key={child.handle} className={widthClass(child)}>
                <FieldInput id={`${id}-${child.handle}`} field={child} value={value[child.handle]} content={content}
                    errors={errorsAt(errors, child.handle)}
                    onChange={(next) => onChange({ ...value, [child.handle]: next })} />
            </div>
        ))}
    </div>;

    return bare ? grid : <div className="cms:rounded-lg cms:border cms:p-4">{grid}</div>;
}

function SingleSelect({ options, value, onChange, id, empty, fill = false }: { options: Option[]; value: string | null; onChange: (value: unknown) => void; id: string; empty: boolean; fill?: boolean }) {
    return (
        <Select value={value ?? NONE} onValueChange={(next: string) => onChange(next === NONE ? null : next)}>
            <SelectTrigger id={id} className={fill ? 'cms:w-full' : 'cms:w-full cms:max-w-sm'}><SelectValue /></SelectTrigger>
            <SelectContent>
                {empty && <SelectItem value={NONE}>{t('None')}</SelectItem>}
                {options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
            </SelectContent>
        </Select>
    );
}

function MultiSelect({ options, value, onChange, empty, inTickOrder = false, invalid = false }: { options: Option[]; value: string[]; onChange: (value: unknown) => void; empty?: string; inTickOrder?: boolean; invalid?: boolean }) {
    if (options.length === 0) return <p className="cms:text-sm cms:text-muted-foreground">{empty ?? t('Nothing to choose from yet.')}</p>;

    return (
        <div className="cms:flex cms:flex-col cms:gap-2">
            {options.map((option) => (
                <label key={option.value} className="cms:flex cms:items-center cms:gap-2 cms:text-sm">
                    <Checkbox
                        checked={value.includes(option.value)}
                        aria-invalid={invalid || undefined}
                        onCheckedChange={(checked: boolean) => onChange(checked
                            ? (inTickOrder ? [...value.filter((v) => v !== option.value), option.value] : options.map((o) => o.value).filter((v) => v === option.value || value.includes(v)))
                            : value.filter((v) => v !== option.value))}
                    />
                    {option.label}
                    {inTickOrder && value.includes(option.value) && (
                        <span className="cms:text-xs cms:text-muted-foreground" aria-label={`number ${value.indexOf(option.value) + 1}`}>#{value.indexOf(option.value) + 1}</span>
                    )}
                </label>
            ))}
        </div>
    );
}

function LinkInput({ label, value, onChange, errors, id, collections, placeholder, describedBy }: {
    /** The field's label: the inputs are named after it ("Map link: address"), not just "Address". */
    label: string; value: Record<string, unknown>; onChange: (value: unknown) => void; errors: Errors; id: string; collections: string[];
    /** In the address input (the field's own, else an example). */
    placeholder?: string;
    describedBy?: string;
}) {
    // An empty link is stored as no link (null), so the kind chosen is kept here too.
    const [chosen, setChosen] = React.useState<LinkKind>(value.type === 'entry' ? 'entry' : 'url');
    const type: LinkKind = value.type === 'entry' || value.type === 'url' ? value.type : chosen;
    // The address or entry of the kind not chosen, until the page is left.
    const remembered = React.useRef<LinkTargets>({});
    const set = (changes: Record<string, unknown>) => onChange(linkValue({ ...value, type, ...changes }));
    const choose = (to: LinkKind) => {
        if (to === type) return;
        const next = switchLink(value, type, to, remembered.current);
        remembered.current = next.remembered;
        setChosen(to);
        onChange(next.value);
    };

    return (
        <div className="cms:flex cms:flex-col cms:gap-2">
            <div role="radiogroup" aria-label={t(':field: link to', { field: label })} className="cms:inline-flex cms:w-fit cms:rounded-md cms:border cms:p-0.5">
                {(['url', 'entry'] as const).map((option) => (
                    <Button key={option} type="button" size="sm" role="radio" aria-checked={type === option} variant={type === option ? 'secondary' : 'ghost'}
                        onClick={() => choose(option)}>
                        {option === 'url' ? t('Address') : t('Entry')}
                    </Button>
                ))}
            </div>
            <div className="cms:grid cms:gap-2 cms:md:grid-cols-[2fr_1fr_auto] cms:md:items-start">
                {type === 'url'
                    ? <Input id={id} aria-label={t(':field: address', { field: label })} placeholder={placeholder || t('https://… or /about')} aria-describedby={describedBy} value={typeof value.url === 'string' ? value.url : ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => set({ url: e.target.value })} aria-invalid={errors.url !== undefined} />
                    : <EntriesPicker id={id} invalid={errors.entry_id !== undefined} multiple={false} max={null} collections={collections}
                        value={typeof value.entry_id === 'number' ? value.entry_id : null}
                        onChange={(next) => set({ entry_id: typeof next === 'number' ? next : undefined })} />}
                <Input aria-label={t(':field: link text', { field: label })} placeholder={type === 'entry' ? t('Link text (the entry\'s title)') : t('Link text')} value={typeof value.label === 'string' ? value.label : ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => set({ label: e.target.value })} />
                <label className="cms:flex cms:h-9 cms:items-center cms:gap-2 cms:text-sm">
                    <Checkbox checked={value.new_tab === true} onCheckedChange={(checked: boolean) => set({ new_tab: checked })} />
                    {t('New tab')}
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
            {open ? <ChevronsDownUp /> : <ChevronsUpDown />} {open ? t('Collapse all') : t('Expand all')}
        </Button>
    );
}

function Rows({ field, value, onChange, errors, id, content = false }: Omit<Props, 'value'> & { value: unknown[] }) {
    const columns = field.fields ?? [];
    const rows = value.map(asRecord);
    const keys = useItemKeys(rows.length);
    const set = (index: number, row: Record<string, unknown>) => onChange(rows.map((r, i) => (i === index ? row : r)));
    const remove = (index: number) => { keys.remove(index); onChange(rows.filter((_, i) => i !== index)); };
    const noun = field.label ? field.label.toLowerCase().replace(/s$/, '') : t('row');
    const Noun = noun.charAt(0).toUpperCase() + noun.slice(1);
    const items = rows.map((row, index) => ({ row, index, key: keys.keys[index] ?? String(index) }));
    const folding = useCollapsed();

    return (
        <div className="cms:flex cms:flex-col cms:gap-2">
            <SortableList items={items} getId={(item) => item.key} getLabel={(item) => `${noun} ${item.index + 1}`}
                onReorder={(next, from, to) => { keys.move(from, to); onChange(next.map((item) => item.row)); }}>
                {({ row, index, key }, { handle }) => isCompact(field, content) ? (
                    <div className="cms:flex cms:items-start cms:gap-2">
                        <SortableHandle {...handle} label={t('Move :item :number', { item: noun, number: index + 1 })} className="cms:mt-1" />
                        {columns.map((column) => (
                            <div key={column.handle} className="cms:flex cms:flex-1 cms:flex-col cms:gap-1">
                                <Input aria-label={column.label || column.handle} placeholder={column.label || column.handle}
                                    value={typeof row[column.handle] === 'string' ? row[column.handle] as string : ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(index, { ...row, [column.handle]: e.target.value })} />
                                <FieldError message={errors[`${index}.${column.handle}`]} />
                            </div>
                        ))}
                        <Button type="button" variant="ghost" size="icon" aria-label={t('Remove :item :number', { item: noun, number: index + 1 })} onClick={() => remove(index)}>
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
                <Button type="button" variant="outline" size="sm" onClick={() => onChange([...rows, content ? newRow(field.defaults) : {}])}>
                    <Plus /> {t('Add :item', { item: noun })}
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
                getLabel={(item) => t(':type block', { type: types.find((each) => each.type === item.block.type)?.label ?? String(item.block.type) })}
                onReorder={(next, from, to) => { keys.move(from, to); onChange(next.map((item) => item.block)); }}>
                {({ block, index, key }, { handle }) => {
                    const type = types.find((each) => each.type === block.type);
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
                                    <p className="cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground">{t('This kind of block no longer exists. Its values are kept.')}</p>
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
                        <Button type="button" variant="outline" size="sm" disabled={types.length === 0}><Plus /> {t('Add block')}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {types.map((type) => (
                            <DropdownMenuItem key={type.type} onSelect={() => onChange([...blocks, newBlock(type.type, type.defaults)])}>{type.label}</DropdownMenuItem>
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
            <SortableHandle {...handle} label={t('Move :title', { title: name })} />
            <button type="button" onClick={onToggle} aria-expanded={!collapsed} aria-controls={controls}
                className="cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:rounded-md cms:text-left cms:outline-none cms:focus-visible:ring-2 cms:focus-visible:ring-ring">
                <Chevron className="cms:size-4 cms:shrink-0 cms:text-muted-foreground" aria-hidden />
                {badge ? <Badge variant="secondary">{label}</Badge> : <span className="cms:shrink-0 cms:text-sm cms:font-medium">{label}</span>}
                {summary && <span className="cms:truncate cms:text-sm cms:text-muted-foreground">{summary}</span>}
                <span className="cms:sr-only">{collapsed ? t('(collapsed)') : ''}</span>
            </button>
            {hidden !== undefined && (
                <label className="cms:flex cms:shrink-0 cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground" title={t('Off: kept here, but left out of the page')}>
                    <Switch checked={!hidden} onCheckedChange={(shown: boolean) => onHidden(!shown)} aria-label={t(':title: visible on site', { title: name })} />
                    {t('Visible on site')}
                </label>
            )}
            <Button type="button" variant="ghost" size="icon" className="cms:size-8 cms:shrink-0 cms:text-destructive"
                aria-label={t('Remove :title', { title: name })} onClick={onRemove}><Trash2 /></Button>
        </div>
    );
}
