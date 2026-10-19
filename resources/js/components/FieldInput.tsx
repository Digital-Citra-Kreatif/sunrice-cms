import { Plus, Trash2 } from 'lucide-react';
import { Button, Checkbox, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch, Textarea } from '@sunrice/admin-sdk/ui';
import { errorsUnder } from '@/lib/builder.ts';
import type { Errors, FieldDefinition, Option } from '@/types.ts';

/** Radix's Select can't hold an empty value, so "none" is this. */
const NONE = '__none';

export function FieldError({ message }: { message?: string }) {
    return message ? <p className="text-sm text-destructive">{message}</p> : null;
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
    errors: Errors;
    /** The input's id, for its label. */
    id: string;
}

/**
 * One input for a field definition: text, textarea, number, toggle, select
 * (one or several) and repeater (rows of its fields). Errors come by path
 * relative to the value ("" for the value itself, "0.label" in a repeater).
 */
export function FieldInput({ field, value, onChange, errors, id }: Props) {
    const label = field.label || field.handle;
    // Lists of inputs are a labelled group, not one labelled input.
    const group = field.type === 'repeater' || (field.type === 'select' && field.config?.multiple === true);

    return (
        <div className="flex flex-col gap-2" {...(group ? { role: 'group', 'aria-labelledby': `${id}-label` } : {})}>
            {field.type === 'toggle' ? (
                <div className="flex items-center gap-3">
                    <Switch id={id} checked={value === true} onCheckedChange={(checked: boolean) => onChange(checked)} />
                    <Label htmlFor={id}>{label}</Label>
                </div>
            ) : (
                <Label id={`${id}-label`} htmlFor={group ? undefined : id}>{label}{field.required && <span className="text-destructive"> *</span>}</Label>
            )}
            <Control field={field} value={value} onChange={onChange} errors={errors} id={id} />
            {field.instructions && <p className="text-sm text-muted-foreground">{field.instructions}</p>}
            <FieldError message={errors['']} />
        </div>
    );
}

function Control({ field, value, onChange, errors, id }: Props) {
    switch (field.type) {
        case 'toggle':
            return null;
        case 'textarea':
            return <Textarea id={id} value={typeof value === 'string' ? value : ''} rows={4} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)} />;
        case 'number':
            return (
                <Input
                    id={id} type="number" className="max-w-48"
                    value={typeof value === 'number' ? String(value) : typeof value === 'string' ? value : ''}
                    min={numberConfig(field, 'min')} max={numberConfig(field, 'max')} step={numberConfig(field, 'step') ?? 'any'}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value === '' ? null : Number(e.target.value))}
                />
            );
        case 'select':
            return field.config?.multiple === true
                ? <MultiSelect options={optionsOf(field)} value={Array.isArray(value) ? value.map(String) : []} onChange={onChange} />
                : <SingleSelect options={optionsOf(field)} value={typeof value === 'string' ? value : null} onChange={onChange} id={id} required={field.required === true} />;
        case 'repeater':
            return <Rows field={field} value={Array.isArray(value) ? value : []} onChange={onChange} errors={errors} />;
        default:
            return <Input id={id} value={typeof value === 'string' ? value : ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} />;
    }
}

function numberConfig(field: FieldDefinition, key: string): number | undefined {
    const value = field.config?.[key];
    return typeof value === 'number' ? value : undefined;
}

function SingleSelect({ options, value, onChange, id, required }: { options: Option[]; value: string | null; onChange: (value: unknown) => void; id: string; required: boolean }) {
    return (
        <Select value={value ?? NONE} onValueChange={(next: string) => onChange(next === NONE ? null : next)}>
            <SelectTrigger id={id} className="w-full max-w-sm"><SelectValue /></SelectTrigger>
            <SelectContent>
                {!required && <SelectItem value={NONE}>None</SelectItem>}
                {options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
            </SelectContent>
        </Select>
    );
}

function MultiSelect({ options, value, onChange }: { options: Option[]; value: string[]; onChange: (value: unknown) => void }) {
    if (options.length === 0) return <p className="text-sm text-muted-foreground">Nothing to choose from yet.</p>;

    return (
        <div className="flex flex-col gap-2">
            {options.map((option) => (
                <label key={option.value} className="flex items-center gap-2 text-sm">
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

function Rows({ field, value, onChange, errors }: Omit<Props, 'value' | 'id'> & { value: unknown[] }) {
    const columns = field.fields ?? [];
    const rows = value.map((row) => (row && typeof row === 'object' && !Array.isArray(row) ? row as Record<string, unknown> : {}));
    const set = (index: number, handle: string, cell: unknown) => onChange(rows.map((row, i) => (i === index ? { ...row, [handle]: cell } : row)));

    return (
        <div className="flex flex-col gap-2">
            {rows.map((row, index) => (
                <div key={index} className="flex items-start gap-2">
                    {columns.map((column) => {
                        const cellErrors = errorsUnder(errors, `${index}.${column.handle}`);
                        return (
                            <div key={column.handle} className="flex flex-1 flex-col gap-1">
                                <Input
                                    aria-label={column.label || column.handle} placeholder={column.label || column.handle}
                                    value={typeof row[column.handle] === 'string' ? row[column.handle] as string : ''}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(index, column.handle, e.target.value)}
                                />
                                <FieldError message={errors[`${index}.${column.handle}`] ?? cellErrors['']} />
                            </div>
                        );
                    })}
                    <Button type="button" variant="ghost" size="icon" aria-label="Remove row" onClick={() => onChange(rows.filter((_, i) => i !== index))}>
                        <Trash2 />
                    </Button>
                </div>
            ))}
            <div>
                <Button type="button" variant="outline" size="sm" onClick={() => onChange([...rows, {}])}>
                    <Plus /> Add {(field.label || 'row').toLowerCase().replace(/s$/, '')}
                </Button>
            </div>
        </div>
    );
}
