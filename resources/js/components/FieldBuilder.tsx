import * as React from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import {
    Badge, Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Input, Label,
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SortableHandle, SortableList, Switch, Textarea,
} from '@sunrice/admin-sdk/ui';
import { t } from '@sunrice/admin-sdk';
import { ChangeWarning } from '@/components/ChangeWarning.tsx';
import { FieldError, FieldInput } from '@/components/FieldInput.tsx';
import { type BuilderField, cleanHandle, errorsAt, errorsUnder, handleWarning, hasErrors, MAX_DEPTH, newField, relabel, renamedFrom, type ReservedHandles } from '@/lib/builder.ts';
import { OPERATORS } from '@/lib/conditions.ts';
import type { Errors, FieldCondition, FieldTranslation, FieldTypeInfo, LocaleInfo } from '@/types.ts';

interface Props {
    fields: BuilderField[];
    onChange: (fields: BuilderField[]) => void;
    types: FieldTypeInfo[];
    /** Errors by path relative to this list ("0.handle"). */
    errors: Errors;
    depth?: number;
    /** For element ids. */
    idPrefix?: string;
    /** The top level's: handles content keeps for itself, warned about as they're typed. */
    reserved?: ReservedHandles;
    /** The other content languages than the main one: what visitors read in them (forms show it). */
    locales?: LocaleInfo[];
}

/** The fields of a blueprint or fieldset: add, edit, drag into order and remove, groups and repeaters nested (each level its own list). */
export function FieldBuilder({ fields, onChange, types, errors, depth = 1, idPrefix = 'field', reserved, locales = [] }: Props) {
    const [open, setOpen] = React.useState<Set<string>>(() => new Set());
    const toggle = (key: string) => setOpen((keys) => {
        const next = new Set(keys);
        next.has(key) ? next.delete(key) : next.add(key);
        return next;
    });
    const update = (index: number, field: BuilderField) => onChange(fields.map((f, i) => (i === index ? field : f)));
    // A new field opens alone: the others fold to their summary line.
    const add = (type: FieldTypeInfo) => {
        const field = newField(type.type, type.label, fields);
        onChange([...fields, field]);
        setOpen(new Set([field.key]));
    };

    return (
        <div className="cms:flex cms:flex-col cms:gap-2">
            {fields.length === 0 && <p className="cms:rounded-lg cms:border cms:border-dashed cms:p-4 cms:text-sm cms:text-muted-foreground">{t('No fields yet.')}</p>}
            {fields.length > 1 && (
                <div className="cms:flex cms:justify-end">
                    {open.size > 0
                        ? <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(new Set())}>{t('Close all')}</Button>
                        : <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(new Set(fields.map((field) => field.key)))}>{t('Open all')}</Button>}
                </div>
            )}
            <SortableList items={fields} getId={(field) => field.key} getLabel={(field) => field.label || field.handle} onReorder={(next) => onChange(next)}>
                {(field, { index, handle, isOverlay }) => {
                    const type = types.find((each) => each.type === field.type);
                    const invalid = hasErrors(errors, String(index)) || handleWarning(field, fields, reserved) !== null;
                    const expanded = !isOverlay && (open.has(field.key) || invalid);
                    const id = `${idPrefix}-${field.key}`;

                    return (
                        <div className={`cms:rounded-lg cms:border cms:bg-card ${invalid ? 'cms:border-destructive' : ''}`}>
                            <div className="cms:flex cms:items-center cms:gap-2 cms:p-2">
                                <SortableHandle {...handle} label={t('Move :title', { title: field.label || field.handle })} />
                                <Button type="button" variant="ghost" size="icon" className="cms:size-8" aria-expanded={expanded} aria-controls={id}
                                    aria-label={expanded ? t('Close :title', { title: field.label || field.handle }) : t('Open :title', { title: field.label || field.handle })} onClick={() => toggle(field.key)}>
                                    {expanded ? <ChevronDown /> : <ChevronRight />}
                                </Button>
                                <button type="button" className="cms:flex cms:min-w-0 cms:flex-1 cms:items-center cms:gap-2 cms:text-left" onClick={() => toggle(field.key)}>
                                    <span className="cms:truncate cms:font-medium">{field.label || field.handle}</span>
                                    <code className="cms:truncate cms:text-xs cms:text-muted-foreground">{field.handle}</code>
                                </button>
                                {field.required && <Badge variant="outline">{t('Required')}</Badge>}
                                <Badge variant="secondary">{type?.label ?? field.type}</Badge>
                                {type?.hasChildren && field.fields.length > 0 && !expanded && (
                                    <span className="cms:text-xs cms:text-muted-foreground">{t(':count inside', { count: field.fields.length })}</span>
                                )}
                                <Button type="button" variant="ghost" size="icon" className="cms:size-8 cms:text-destructive" aria-label={t('Remove :title', { title: field.label || field.handle })}
                                    onClick={() => onChange(fields.filter((_, i) => i !== index))}><Trash2 /></Button>
                            </div>
                            {expanded && (
                                <FieldSettings id={id} field={field} type={type} siblings={fields} onChange={(next) => update(index, next)}
                                    types={types} errors={errorsUnder(errors, String(index))} depth={depth} reserved={reserved} locales={locales} />
                            )}
                        </div>
                    );
                }}
            </SortableList>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button type="button" variant="outline" size="sm"><Plus /> {t('Add field')}</Button>
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
    reserved?: Props['reserved'];
    locales: LocaleInfo[];
}

const PER_LANGUAGE = { default: '__default', yes: 'yes', no: 'no' };

function FieldSettings({ id, field, type, siblings, onChange, types, errors, depth, reserved, locales }: SettingsProps) {
    const config = field.config ?? {};
    const warning = handleWarning(field, siblings, reserved, t);

    // A fieldset include: only which fieldset. Its fields land here with their own handles; its handle and settings aren't used.
    if (field.type === 'fieldset') {
        return (
            <div id={id} className="cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4">
                <div className="cms:grid cms:gap-4 cms:md:grid-cols-2">
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor={`${id}-label`}>{t('Label')}</Label>
                        <Input id={`${id}-label`} value={field.label ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(relabel(field, e.target.value, siblings))} />
                        <p className="cms:text-sm cms:text-muted-foreground">{t('Only shown here, in the builder.')}</p>
                    </div>
                    {type?.settings.map((setting) => (
                        <FieldInput key={setting.handle} id={`${id}-config-${setting.handle}`} field={setting} value={config[setting.handle]}
                            errors={errorsAt(errors, `config.${setting.handle}`)}
                            onChange={(value) => onChange({ ...field, config: { ...config, [setting.handle]: value } })} />
                    ))}
                </div>
                <FieldError message={errors.handle ?? errors.type} />
            </div>
        );
    }

    return (
        <div id={id} className="cms:flex cms:flex-col cms:gap-4 cms:border-t cms:p-4">
            {!type && <p className="cms:text-sm cms:text-destructive">{t('The field type ":type" isn\'t registered. Its data is kept; register the type or remove the field.', { type: field.type })}</p>}
            <div className="cms:grid cms:gap-4 cms:md:grid-cols-2">
                <div className="cms:flex cms:flex-col cms:gap-2">
                    <Label htmlFor={`${id}-label`}>{t('Label')}</Label>
                    <Input id={`${id}-label`} value={field.label ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(relabel(field, e.target.value, siblings))} />
                    <FieldError message={errors.label} />
                </div>
                <div className="cms:flex cms:flex-col cms:gap-2">
                    <Label htmlFor={`${id}-handle`}>{t('Handle')}</Label>
                    <Input id={`${id}-handle`} className="cms:font-mono" value={field.handle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...field, handle: cleanHandle(e.target.value), handleTouched: true })} />
                    <p className="cms:text-sm cms:text-muted-foreground">{t('How templates read it. Renaming it hides values saved under the old one.')}</p>
                    <div aria-live="polite">
                        {renamedFrom(field) !== null && (
                            <ChangeWarning>
                                {t('Content saved under ":old" won\'t show under the new handle, and templates that read ":old" get nothing. To keep it, put back ":old", save, and run php artisan sunrice:rename-field, which renames the field and moves its values.', { old: renamedFrom(field) ?? '' })}
                            </ChangeWarning>
                        )}
                    </div>
                    <FieldError message={errors.handle ?? warning ?? undefined} />
                </div>
            </div>
            <div className="cms:flex cms:flex-col cms:gap-2">
                <Label htmlFor={`${id}-instructions`}>{t('Instructions')}</Label>
                <Input id={`${id}-instructions`} value={field.instructions ?? ''} placeholder={t('Shown under the field to editors')}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...field, instructions: e.target.value || null })} />
                <FieldError message={errors.instructions} />
            </div>
            <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-6">
                <div className="cms:flex cms:items-center cms:gap-3">
                    <Switch id={`${id}-required`} checked={field.required === true} onCheckedChange={(required: boolean) => onChange({ ...field, required })} />
                    <Label htmlFor={`${id}-required`}>{t('Required')}</Label>
                </div>
                <div className="cms:flex cms:items-center cms:gap-3">
                    <Label htmlFor={`${id}-translatable`}>{t('Per language')}</Label>
                    <Select
                        value={field.translatable === true ? PER_LANGUAGE.yes : field.translatable === false ? PER_LANGUAGE.no : PER_LANGUAGE.default}
                        onValueChange={(value: string) => onChange({ ...field, translatable: value === PER_LANGUAGE.yes ? true : value === PER_LANGUAGE.no ? false : null })}
                    >
                        <SelectTrigger id={`${id}-translatable`} className="cms:w-48"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value={PER_LANGUAGE.default}>{t('As the type decides')}</SelectItem>
                            <SelectItem value={PER_LANGUAGE.yes}>{t('Yes, translated')}</SelectItem>
                            <SelectItem value={PER_LANGUAGE.no}>{t('No, shared')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <ConditionSettings id={id} field={field} siblings={siblings} onChange={onChange} errors={errorsUnder(errors, 'condition')} />

            {locales.length > 0 && <TranslationSettings id={id} field={field} locales={locales} onChange={onChange} errors={errorsUnder(errors, 'translations')} />}

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
                <Label htmlFor={`${id}-validation`}>{t('Extra rules')}</Label>
                <Textarea id={`${id}-validation`} rows={2} className="cms:font-mono"
                    value={(field.validation ?? []).join('\n')}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange({ ...field, validation: e.target.value.split('\n') })} />
                <p className="cms:text-sm cms:text-muted-foreground">{withCode(t('Optional checks, one per line, such as :email or :max (for developers: Laravel validation rules).'), { email: 'email', max: 'max:100' })}</p>
                <FieldError message={errors.validation ?? Object.entries(errors).find(([key]) => key.startsWith('validation.'))?.[1]} />
            </div>

            {type?.hasChildren && (
                <div className="cms:flex cms:flex-col cms:gap-2">
                    <Label>{t('Fields inside')}</Label>
                    <FieldBuilder fields={field.fields} onChange={(fields) => onChange({ ...field, fields })} types={types}
                        errors={errorsUnder(errors, 'fields')} depth={depth + 1} idPrefix={id} locales={locales} />
                    <FieldError message={errors.fields} />
                </div>
            )}
            <FieldError message={errors.type} />
        </div>
    );
}

/** The field's label, instructions and a select's option labels in the other languages, for visitors (forms, optionLabel()). */
function TranslationSettings({ id, field, locales, onChange, errors }: { id: string; field: BuilderField; locales: LocaleInfo[]; onChange: (field: BuilderField) => void; errors: Errors }) {
    const translations = field.translations ?? {};
    const options = field.type === 'select' && Array.isArray(field.config?.options)
        ? (field.config.options as { value?: unknown; label?: unknown }[]).filter((option) => typeof option?.value === 'string' && option.value !== '')
        : [];
    const set = (code: string, changes: Partial<FieldTranslation>) => {
        const next = { ...translations, [code]: { ...translations[code], ...changes } };
        onChange({ ...field, translations: next });
    };
    const message = Object.entries(errors).find(([, error]) => error)?.[1];

    return (
        <details className="cms:rounded-lg cms:border cms:p-3" open={Object.keys(translations).length > 0 || message !== undefined}>
            <summary className="cms:cursor-pointer cms:text-sm cms:font-medium">{t('In other languages')}</summary>
            <p className="cms:mt-2 cms:text-sm cms:text-muted-foreground">{t('What visitors read in each language, as forms show it. Empty: as above.')}</p>
            <div className="cms:mt-3 cms:flex cms:flex-col cms:gap-4">
                {locales.map(({ code, name }) => (
                    <div key={code} className="cms:grid cms:gap-3 cms:md:grid-cols-2">
                        <div className="cms:flex cms:flex-col cms:gap-2">
                            <Label htmlFor={`${id}-label-${code}`}>Label ({name})</Label>
                            <Input id={`${id}-label-${code}`} value={translations[code]?.label ?? ''} placeholder={field.label ?? ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(code, { label: e.target.value })} />
                        </div>
                        <div className="cms:flex cms:flex-col cms:gap-2">
                            <Label htmlFor={`${id}-instructions-${code}`}>Instructions ({name})</Label>
                            <Input id={`${id}-instructions-${code}`} value={translations[code]?.instructions ?? ''} placeholder={field.instructions ?? ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(code, { instructions: e.target.value })} />
                        </div>
                        {options.length > 0 && (
                            <fieldset className="cms:flex cms:flex-col cms:gap-2 cms:md:col-span-2">
                                <legend className="cms:text-sm cms:font-medium">Options ({name})</legend>
                                <div className="cms:grid cms:gap-2 cms:sm:grid-cols-2">
                                    {options.map((option) => {
                                        const value = String(option.value);
                                        return (
                                            <Input key={value} aria-label={`${value} (${name})`} value={translations[code]?.options?.[value] ?? ''}
                                                placeholder={typeof option.label === 'string' && option.label !== '' ? option.label : value}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => set(code, { options: { ...translations[code]?.options, [value]: e.target.value } })} />
                                        );
                                    })}
                                </div>
                            </fieldset>
                        )}
                    </div>
                ))}
            </div>
            <FieldError message={message} />
        </details>
    );
}

const ALWAYS = '__always';

/** An operator's words (OPERATORS keeps the English for the tests). */
function operatorLabel(operator: FieldCondition['operator']): string {
    switch (operator) {
        case 'equals':
            return t('is');
        case 'not_equals':
            return t('is not');
        case 'filled':
            return t('is filled in');
        default:
            return t('is empty');
    }
}

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
            <Label htmlFor={`${id}-condition`}>{t('Show')}</Label>
            <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-2">
                <Select value={condition?.field ?? ALWAYS} onValueChange={(value: string) => set(value === ALWAYS ? null : { field: value })}>
                    <SelectTrigger id={`${id}-condition`} className="cms:w-56"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value={ALWAYS}>{t('Always')}</SelectItem>
                        {others.map((other) => <SelectItem key={other.key} value={other.handle}>{t('When :field', { field: other.label || other.handle })}</SelectItem>)}
                    </SelectContent>
                </Select>
                {condition && (
                    <>
                        <Select value={operator.value} onValueChange={(value: string) => set({ operator: value as FieldCondition['operator'] })}>
                            <SelectTrigger aria-label={t('How to compare')} className="cms:w-36"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {OPERATORS.map((o) => <SelectItem key={o.value} value={o.value}>{operatorLabel(o.value)}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        {operator.needsValue && (
                            <Input aria-label={t('Value')} className="cms:w-48" placeholder={t('a value, or true / false')} value={String(condition.value ?? '')}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => set({ value: e.target.value })} />
                        )}
                    </>
                )}
            </div>
            <p className="cms:text-sm cms:text-muted-foreground">{t('A hidden field isn\'t required, and keeps what it had.')}</p>
            <FieldError message={errors.field ?? errors.operator ?? errors.value ?? errors[''] } />
        </div>
    );
}

/** A translated sentence with :placeholders shown as code. */
function withCode(text: string, codes: Record<string, string>): React.ReactNode {
    return text.split(/(:[a-z_]+)/).map((part, i) => {
        const code = codes[part.slice(1)];
        return part.startsWith(':') && code !== undefined ? <code key={i}>{code}</code> : part;
    });
}
