import * as React from 'react';
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import {
    Badge, Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Input, Label,
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch, Textarea,
} from '@sunrice/admin-sdk/ui';
import { FieldError, FieldInput } from '@/components/FieldInput.tsx';
import { type BuilderField, errorsAt, errorsUnder, hasErrors, MAX_DEPTH, move, newField, relabel } from '@/lib/builder.ts';
import { OPERATORS } from '@/lib/conditions.ts';
import type { Errors, FieldCondition, FieldTypeInfo } from '@/types.ts';

interface Props {
    fields: BuilderField[];
    onChange: (fields: BuilderField[]) => void;
    types: FieldTypeInfo[];
    /** Errors by path relative to this list ("0.handle"). */
    errors: Errors;
    depth?: number;
    /** For element ids. */
    idPrefix?: string;
}

/** The fields of a blueprint or fieldset: add, edit, reorder and remove, groups and repeaters nested. */
export function FieldBuilder({ fields, onChange, types, errors, depth = 1, idPrefix = 'field' }: Props) {
    const [open, setOpen] = React.useState<Set<string>>(() => new Set());
    const toggle = (key: string) => setOpen((keys) => {
        const next = new Set(keys);
        next.has(key) ? next.delete(key) : next.add(key);
        return next;
    });
    const update = (index: number, field: BuilderField) => onChange(fields.map((f, i) => (i === index ? field : f)));
    const add = (type: FieldTypeInfo) => {
        const field = newField(type.type, type.label, fields);
        onChange([...fields, field]);
        setOpen((keys) => new Set(keys).add(field.key));
    };

    return (
        <div className="cms:flex cms:flex-col cms:gap-2">
            {fields.length === 0 && <p className="cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground">No fields yet.</p>}
            {fields.map((field, index) => {
                const type = types.find((t) => t.type === field.type);
                const expanded = open.has(field.key) || hasErrors(errors, String(index));
                const id = `${idPrefix}-${field.key}`;

                return (
                    <div key={field.key} className={`cms:rounded-lg cms:border cms:bg-card ${hasErrors(errors, String(index)) ? 'cms:border-destructive' : ''}`}>
                        <div className="cms:flex cms:items-center cms:gap-2 cms:p-2">
                            <Button type="button" variant="ghost" size="icon" className="cms:size-8" aria-expanded={expanded} aria-controls={id}
                                aria-label={`${expanded ? 'Close' : 'Open'} ${field.label || field.handle}`} onClick={() => toggle(field.key)}>
                                {expanded ? <ChevronDown /> : <ChevronRight />}
                            </Button>
                            <button type="button" className="cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left" onClick={() => toggle(field.key)}>
                                <span className="cms:truncate cms:font-medium">{field.label || field.handle}</span>
                                <code className="cms:truncate cms:text-xs cms:text-muted-foreground">{field.handle}</code>
                            </button>
                            {field.required && <Badge variant="outline">Required</Badge>}
                            <Badge variant="secondary">{type?.label ?? field.type}</Badge>
                            <Button type="button" variant="ghost" size="icon" className="cms:size-8" aria-label="Move up" disabled={index === 0} onClick={() => onChange(move(fields, index, -1))}><ArrowUp /></Button>
                            <Button type="button" variant="ghost" size="icon" className="cms:size-8" aria-label="Move down" disabled={index === fields.length - 1} onClick={() => onChange(move(fields, index, 1))}><ArrowDown /></Button>
                            <Button type="button" variant="ghost" size="icon" className="cms:size-8 cms:text-destructive" aria-label={`Remove ${field.label || field.handle}`}
                                onClick={() => onChange(fields.filter((_, i) => i !== index))}><Trash2 /></Button>
                        </div>
                        {expanded && (
                            <FieldSettings id={id} field={field} type={type} siblings={fields} onChange={(next) => update(index, next)}
                                types={types} errors={errorsUnder(errors, String(index))} depth={depth} />
                        )}
                    </div>
                );
            })}
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button type="button" variant="outline" size="sm"><Plus /> Add field</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {types.filter((type) => !type.hasChildren || depth < MAX_DEPTH).map((type) => (
                            <DropdownMenuItem key={type.type} onSelect={() => add(type)}>{type.label}</DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

interface SettingsProps {
    id: string;
    field: BuilderField;
    type: FieldTypeInfo | undefined;
    siblings: BuilderField[];
    onChange: (field: BuilderField) => void;
    types: FieldTypeInfo[];
    errors: Errors;
    depth: number;
}

const PER_LANGUAGE = { default: '__default', yes: 'yes', no: 'no' };

function FieldSettings({ id, field, type, siblings, onChange, types, errors, depth }: SettingsProps) {
    const config = field.config ?? {};

    return (
        <div id={id} className="cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4">
            {!type && <p className="cms:text-sm cms:text-destructive">The field type "{field.type}" isn't registered. Its data is kept; register the type or remove the field.</p>}
            <div className="cms:grid cms:gap-4 cms:md:grid-cols-2">
                <div className="cms:flex cms:flex-col cms:gap-2">
                    <Label htmlFor={`${id}-label`}>Label</Label>
                    <Input id={`${id}-label`} value={field.label ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(relabel(field, e.target.value, siblings))} />
                    <FieldError message={errors.label} />
                </div>
                <div className="cms:flex cms:flex-col cms:gap-2">
                    <Label htmlFor={`${id}-handle`}>Handle</Label>
                    <Input id={`${id}-handle`} className="cms:font-mono" value={field.handle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...field, handle: e.target.value, handleTouched: true })} />
                    <p className="cms:text-sm cms:text-muted-foreground">How templates read it. Renaming it hides values saved under the old one.</p>
                    <FieldError message={errors.handle} />
                </div>
            </div>
            <div className="cms:flex cms:flex-col cms:gap-2">
                <Label htmlFor={`${id}-instructions`}>Instructions</Label>
                <Input id={`${id}-instructions`} value={field.instructions ?? ''} placeholder="Shown under the field to editors"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...field, instructions: e.target.value || null })} />
                <FieldError message={errors.instructions} />
            </div>
            <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-6">
                <div className="cms:flex cms:items-center cms:gap-3">
                    <Switch id={`${id}-required`} checked={field.required === true} onCheckedChange={(required: boolean) => onChange({ ...field, required })} />
                    <Label htmlFor={`${id}-required`}>Required</Label>
                </div>
                <div className="cms:flex cms:items-center cms:gap-3">
                    <Label htmlFor={`${id}-translatable`}>Per language</Label>
                    <Select
                        value={field.translatable === true ? PER_LANGUAGE.yes : field.translatable === false ? PER_LANGUAGE.no : PER_LANGUAGE.default}
                        onValueChange={(value: string) => onChange({ ...field, translatable: value === PER_LANGUAGE.yes ? true : value === PER_LANGUAGE.no ? false : null })}
                    >
                        <SelectTrigger id={`${id}-translatable`} className="cms:w-48"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value={PER_LANGUAGE.default}>As the type decides</SelectItem>
                            <SelectItem value={PER_LANGUAGE.yes}>Yes, translated</SelectItem>
                            <SelectItem value={PER_LANGUAGE.no}>No, shared</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <ConditionSettings id={id} field={field} siblings={siblings} onChange={onChange} errors={errorsUnder(errors, 'condition')} />

            {(type?.settings.length ?? 0) > 0 && (
                <div className="cms:grid cms:gap-4 cms:md:grid-cols-2">
                    {type?.settings.map((setting) => (
                        <FieldInput key={setting.handle} id={`${id}-config-${setting.handle}`} field={setting} value={config[setting.handle]}
                            errors={errorsAt(errors, `config.${setting.handle}`)}
                            onChange={(value) => onChange({ ...field, config: { ...config, [setting.handle]: value } })} />
                    ))}
                </div>
            )}

            <div className="cms:flex cms:flex-col cms:gap-2">
                <Label htmlFor={`${id}-validation`}>Extra rules</Label>
                <Textarea id={`${id}-validation`} rows={2} className="cms:font-mono" placeholder={'min:3\nregex:/^[A-Z]/'}
                    value={(field.validation ?? []).join('\n')}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange({ ...field, validation: e.target.value.split('\n') })} />
                <p className="cms:text-sm cms:text-muted-foreground">Laravel rules, one per line.</p>
                <FieldError message={errors.validation ?? Object.entries(errors).find(([key]) => key.startsWith('validation.'))?.[1]} />
            </div>

            {type?.hasChildren && (
                <div className="cms:flex cms:flex-col cms:gap-2">
                    <Label>Fields inside</Label>
                    <FieldBuilder fields={field.fields} onChange={(fields) => onChange({ ...field, fields })} types={types}
                        errors={errorsUnder(errors, 'fields')} depth={depth + 1} idPrefix={id} />
                    <FieldError message={errors.fields} />
                </div>
            )}
            <FieldError message={errors.type} />
        </div>
    );
}

const ALWAYS = '__always';

/** "Show only when …": another field on this level, how to compare, and with what. */
function ConditionSettings({ id, field, siblings, onChange, errors }: { id: string; field: BuilderField; siblings: BuilderField[]; onChange: (field: BuilderField) => void; errors: Errors }) {
    const others = siblings.filter((sibling) => sibling.key !== field.key && sibling.handle !== '');
    const condition = field.condition ?? null;
    const operator = OPERATORS.find((o) => o.value === condition?.operator) ?? OPERATORS[0]!;
    const set = (changes: Partial<FieldCondition> | null) =>
        onChange({ ...field, condition: changes === null ? null : { field: condition?.field ?? others[0]?.handle ?? '', operator: condition?.operator ?? 'equals', value: condition?.value ?? '', ...changes } });

    if (others.length === 0 && condition === null) return null;

    return (
        <div className="cms:flex cms:flex-col cms:gap-2">
            <Label htmlFor={`${id}-condition`}>Show</Label>
            <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-2">
                <Select value={condition?.field ?? ALWAYS} onValueChange={(value: string) => set(value === ALWAYS ? null : { field: value })}>
                    <SelectTrigger id={`${id}-condition`} className="cms:w-56"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value={ALWAYS}>Always</SelectItem>
                        {others.map((other) => <SelectItem key={other.key} value={other.handle}>When {other.label || other.handle}</SelectItem>)}
                    </SelectContent>
                </Select>
                {condition && (
                    <>
                        <Select value={operator.value} onValueChange={(value: string) => set({ operator: value as FieldCondition['operator'] })}>
                            <SelectTrigger aria-label="How to compare" className="cms:w-36"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {OPERATORS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        {operator.needsValue && (
                            <Input aria-label="Value" className="cms:w-48" placeholder="a value, or true / false" value={String(condition.value ?? '')}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => set({ value: e.target.value })} />
                        )}
                    </>
                )}
            </div>
            <p className="cms:text-sm cms:text-muted-foreground">A hidden field isn't required, and keeps what it had.</p>
            <FieldError message={errors.field ?? errors.operator ?? errors.value ?? errors[''] } />
        </div>
    );
}
