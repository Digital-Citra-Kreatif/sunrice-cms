import * as React from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react';
import {
    Badge, Button, Checkbox, DatePicker, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Input, Label, MediaPickerInput,
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Skeleton, Switch, Textarea,
} from '@sunrice/admin-sdk/ui';
import { EntriesPicker } from '@/components/EntriesPicker.tsx';
import { errorsAt, move } from '@/lib/builder.ts';
import { asRecord, dateInputValue, dateValueFromInput, newBlock, newRow } from '@/lib/values.ts';
import type { Errors, FieldDefinition, Option } from '@/types.ts';

/** The rich text editor (ProseMirror) is large: loaded when a rich text field shows. */
const RichTextEditor = React.lazy(() => import('@/components/RichTextEditor.tsx').then((m) => ({ default: m.RichTextEditor })));

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
            {field.instructions && <p className="cms:text-sm cms:text-muted-foreground">{field.instructions}</p>}
            <FieldError message={errors['']} />
        </div>
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
            return (
                <React.Suspense fallback={<Skeleton className="cms:h-48 cms:w-full" />}>
                    <RichTextEditor id={id} labelledBy={`${id}-label`} invalid={invalid} value={typeof value === 'string' ? value : ''} onChange={onChange} />
                </React.Suspense>
            );
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
            const options = field.terms ?? [];
            if (field.config?.multiple === true) {
                const ids = Array.isArray(value) ? value.map(String) : [];
                return <MultiSelect options={options} value={ids} onChange={(next) => onChange((next as string[]).map(Number))} />;
            }
            return <SingleSelect options={options} id={id} required={field.required === true} value={value === null || value === undefined ? null : String(value)}
                onChange={(next) => onChange(next === null ? null : Number(next))} />;
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
            return <Input id={id} aria-invalid={invalid} value={typeof value === 'string' ? value : ''} placeholder={stringConfig(field, 'placeholder')}
                maxLength={numberConfig(field, 'max')} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} />;
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
export function Fields({ fields, value, onChange, errors, id, content }: {
    fields: FieldDefinition[]; value: Record<string, unknown>; onChange: (value: Record<string, unknown>) => void; errors: Errors; id: string; content?: boolean;
}) {
    return (
        <div className="cms:flex cms:flex-col cms:gap-4 cms:rounded-lg cms:border cms:p-4">
            {fields.map((child) => child.shared ? (
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

function Rows({ field, value, onChange, errors, id, content = false }: Omit<Props, 'value'> & { value: unknown[] }) {
    const columns = field.fields ?? [];
    const rows = value.map(asRecord);
    const set = (index: number, row: Record<string, unknown>) => onChange(rows.map((r, i) => (i === index ? row : r)));
    const noun = (field.label || 'row').toLowerCase().replace(/s$/, '');
    const Noun = noun.charAt(0).toUpperCase() + noun.slice(1);

    return (
        <div className="cms:flex cms:flex-col cms:gap-2">
            {rows.map((row, index) => isCompact(field, content) ? (
                <div key={index} className="cms:flex cms:items-start cms:gap-2">
                    {columns.map((column) => (
                        <div key={column.handle} className="cms:flex cms:flex-1 cms:flex-col cms:gap-1">
                            <Input aria-label={column.label || column.handle} placeholder={column.label || column.handle}
                                value={typeof row[column.handle] === 'string' ? row[column.handle] as string : ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(index, { ...row, [column.handle]: e.target.value })} />
                            <FieldError message={errors[`${index}.${column.handle}`]} />
                        </div>
                    ))}
                    <Button type="button" variant="ghost" size="icon" aria-label={`Remove ${noun} ${index + 1}`} onClick={() => onChange(rows.filter((_, i) => i !== index))}>
                        <Trash2 />
                    </Button>
                </div>
            ) : (
                <div key={typeof row._id === 'string' ? row._id : index} className="cms:flex cms:flex-col cms:gap-2">
                    <ItemBar label={`${Noun} ${index + 1}`} index={index} count={rows.length}
                        onMove={(by) => onChange(move(rows, index, by))} onRemove={() => onChange(rows.filter((_, i) => i !== index))}
                        hidden={content ? row._hidden === true : undefined} onHidden={(hidden) => set(index, { ...row, _hidden: hidden })} />
                    <Fields fields={columns} value={row} onChange={(next) => set(index, next)} errors={errorsAt(errors, String(index))} id={`${id}-${index}`} content={content} />
                </div>
            ))}
            <div>
                <Button type="button" variant="outline" size="sm" onClick={() => onChange([...rows, content ? newRow() : {}])}>
                    <Plus /> Add {noun}
                </Button>
            </div>
        </div>
    );
}

function Blocks({ field, value, onChange, errors, id }: Omit<Props, 'value'> & { value: unknown[] }) {
    const types = field.blocks ?? [];
    const blocks = value.map(asRecord);
    const set = (index: number, block: Record<string, unknown>) => onChange(blocks.map((b, i) => (i === index ? block : b)));

    return (
        <div className="cms:flex cms:flex-col cms:gap-3">
            {blocks.map((block, index) => {
                const type = types.find((t) => t.type === block.type);
                return (
                    <div key={typeof block.id === 'string' ? block.id : index} className="cms:flex cms:flex-col cms:gap-2">
                        <ItemBar label={type?.label ?? String(block.type)} badge index={index} count={blocks.length}
                            onMove={(by) => onChange(move(blocks, index, by))} onRemove={() => onChange(blocks.filter((_, i) => i !== index))}
                            hidden={block.hidden === true} onHidden={(hidden) => set(index, { ...block, hidden })} />
                        {type ? (
                            <Fields fields={type.fields} value={asRecord(block.values)} onChange={(values) => set(index, { ...block, values })}
                                errors={errorsAt(errors, `${index}.values`)} id={`${id}-${index}`} content />
                        ) : (
                            <p className="cms:rounded-lg cms:border cms:p-4 cms:text-sm cms:text-muted-foreground">This kind of block no longer exists. Its values are kept.</p>
                        )}
                        <FieldError message={errors[`${index}.type`]} />
                    </div>
                );
            })}
            <div>
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
            </div>
        </div>
    );
}

/** The bar above a row or block: its name, move, show/hide and remove. */
function ItemBar({ label, badge = false, index, count, onMove, onRemove, hidden, onHidden }: {
    label: string; badge?: boolean; index: number; count: number; onMove: (by: -1 | 1) => void; onRemove: () => void;
    hidden?: boolean; onHidden: (hidden: boolean) => void;
}) {
    return (
        <div className="cms:flex cms:items-center cms:gap-2">
            {badge ? <Badge variant="secondary">{label}</Badge> : <span className="cms:text-sm cms:font-medium">{label}</span>}
            {hidden !== undefined && (
                <label className="cms:ml-auto cms:flex cms:items-center cms:gap-2 cms:text-sm cms:text-muted-foreground">
                    <Switch checked={!hidden} onCheckedChange={(shown: boolean) => onHidden(!shown)} aria-label={`Show ${label}`} />
                    Show
                </label>
            )}
            <div className={hidden === undefined ? 'cms:ml-auto cms:flex' : 'cms:flex'}>
                <Button type="button" variant="ghost" size="icon" className="cms:size-8" aria-label={`Move ${label} up`} disabled={index === 0} onClick={() => onMove(-1)}><ArrowUp /></Button>
                <Button type="button" variant="ghost" size="icon" className="cms:size-8" aria-label={`Move ${label} down`} disabled={index === count - 1} onClick={() => onMove(1)}><ArrowDown /></Button>
                <Button type="button" variant="ghost" size="icon" className="cms:size-8 cms:text-destructive" aria-label={`Remove ${label}`} onClick={onRemove}><Trash2 /></Button>
            </div>
        </div>
    );
}
