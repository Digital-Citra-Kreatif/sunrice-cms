import * as React from 'react';
import {
    AlignLeft, Blocks, Calendar, ChevronRight, Copy, FileText, Group, Hash, Image, Link2, List, type LucideIcon, Newspaper, Paperclip, Plus, Puzzle,
    Repeat, Shapes, Tags, ToggleLeft, Trash2, Type, X,
} from 'lucide-react';
import {
    Badge, Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Input, Label,
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SortableHandle, SortableList, Switch, Textarea,
} from '@sunrice/admin-sdk/ui';
import { t } from '@sunrice/admin-sdk';
import { ChangeWarning } from '@/components/ChangeWarning.tsx';
import { FieldError, FieldInput } from '@/components/FieldInput.tsx';
import { type BuilderField, cleanHandle, conditionChoices, settingGroups, duplicateField, errorsAt, errorsUnder, handleWarning, hasErrors, isTranslatable, MAX_DEPTH, newField, relabel, renamedFrom, type ReservedHandles, setTranslatable } from '@/lib/builder.ts';
import { conditionFrom, conditionMatch, conditionRules, conditionValueInput, type ConditionValueInput, OPERATORS, startValue } from '@/lib/conditions.ts';
import { EntriesPicker } from '@/components/EntriesPicker.tsx';
import { TermsPicker } from '@/components/TermsPicker.tsx';
import type { Errors, FieldConditionRule, FieldDefinition, FieldTranslation, FieldTypeInfo, LocaleInfo } from '@/types.ts';

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
    // "Duplicate": the copy goes right after the original and opens alone, said aloud for screen readers.
    const [announcement, setAnnouncement] = React.useState('');
    const duplicate = (index: number) => {
        const result = duplicateField(fields, index, reserved, t);
        if (!result) return;
        onChange(result.fields);
        setOpen(new Set([result.copy.key]));
        setAnnouncement(t(':title duplicated as :copy, below it.', { title: fields[index]?.label || fields[index]?.handle || '', copy: result.copy.label ?? result.copy.handle }));
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
                        <div data-invalid={invalid ? 'true' : undefined} className={`cms:rounded-lg cms:border cms:bg-card ${invalid ? 'cms:border-destructive' : ''}`}>
                            <FieldRow field={field} type={type} index={index} expanded={expanded} controls={id} handle={handle} shared={locales.length > 0}
                                onToggle={() => toggle(field.key)} onDuplicate={() => duplicate(index)} onRemove={() => onChange(fields.filter((_, i) => i !== index))} />
                            {expanded && (
                                <FieldSettings id={id} field={field} type={type} siblings={fields} onChange={(next) => update(index, next)}
                                    types={types} errors={errorsUnder(errors, String(index))} depth={depth} reserved={reserved} locales={locales} />
                            )}
                        </div>
                    );
                }}
            </SortableList>
            <p className="cms:sr-only" aria-live="polite">{announcement}</p>
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

/** Each type's icon in a field's row; a type the panel doesn't know gets a plain one. */
const TYPE_ICONS: Record<string, LucideIcon> = {
    text: Type, textarea: AlignLeft, rich_text: FileText, number: Hash, toggle: ToggleLeft, date: Calendar, select: List,
    media: Image, entries: Newspaper, terms: Tags, link: Link2, group: Group, repeater: Repeat, flexible: Blocks, fieldset: Puzzle, file: Paperclip,
};

/**
 * A field's summary line: drag handle, open/close, then what it is at a glance (its type, its label and its
 * handle, the key content keeps it under), the markers that matter (required, shared, conditional), and
 * Duplicate and Remove at the end. The handle wraps under the label on narrow screens.
 */
function FieldRow({ field, type, expanded, controls, handle, shared, onToggle, onDuplicate, onRemove }: {
    field: BuilderField; type: FieldTypeInfo | undefined; index: number; expanded: boolean; controls: string;
    handle: React.ComponentProps<typeof SortableHandle>; shared: boolean; onToggle: () => void; onDuplicate: () => void; onRemove: () => void;
}) {
    const title = field.label || field.handle;
    const Icon = TYPE_ICONS[field.type] ?? Shapes;
    const include = field.type === 'fieldset';
    const key = include ? (typeof field.config?.fieldset === 'string' ? field.config.fieldset : '') : field.handle;
    const isShared = shared && !include && !isTranslatable(field, type?.translatable ?? false);

    return (
        <div className="cms:flex cms:items-center cms:gap-1 cms:py-1.5 cms:pr-1.5 cms:pl-2">
            <SortableHandle {...handle} label={t('Move :title', { title })} />
            <button type="button" aria-expanded={expanded} aria-controls={controls} onClick={onToggle}
                aria-label={expanded ? t('Close :title', { title }) : t('Open :title', { title })}
                className="cms:inline-flex cms:size-7 cms:shrink-0 cms:items-center cms:justify-center cms:rounded-md cms:text-muted-foreground cms:transition-colors hover:cms:bg-accent hover:cms:text-foreground focus-visible:cms:outline-none focus-visible:cms:ring-2 focus-visible:cms:ring-ring">
                <ChevronRight aria-hidden className={`cms:size-4 cms:transition-transform cms:duration-200 ${expanded ? 'cms:rotate-90' : ''}`} />
            </button>
            {/* The whole line opens it too, for the mouse; the chevron is the control for keyboards and screen readers. */}
            <div role="presentation" onClick={onToggle} className="cms:flex cms:min-w-0 cms:flex-1 cms:cursor-pointer cms:flex-wrap cms:items-center cms:gap-x-2.5 cms:gap-y-1 cms:py-0.5">
                <span className="cms:inline-flex cms:shrink-0 cms:items-center cms:gap-1 cms:rounded-md cms:bg-muted cms:px-1.5 cms:py-0.5 cms:text-xs cms:text-muted-foreground">
                    <Icon aria-hidden className="cms:size-3.5" />{type?.label ?? field.type}
                </span>
                <span className="cms:flex cms:min-w-0 cms:max-w-full cms:flex-col cms:gap-x-2 cms:sm:flex-row cms:sm:items-baseline">
                    <span className="cms:truncate cms:font-medium">{title}</span>
                    {key !== '' && key !== title && (
                        <code className="cms:truncate cms:text-xs cms:text-muted-foreground" title={include ? t('Fieldset') : t('Handle')}>{key}</code>
                    )}
                </span>
                {(field.required || isShared || field.condition || (type?.hasChildren && field.fields.length > 0 && !expanded)) && (
                    <span className="cms:flex cms:flex-wrap cms:items-center cms:gap-1">
                        {field.required && <Badge variant="outline" className="cms:font-normal">{t('Required')}</Badge>}
                        {isShared && <Badge variant="outline" className="cms:font-normal" title={t('One value shared by every language.')}>{t('Shared')}</Badge>}
                        {field.condition && <Badge variant="outline" className="cms:font-normal">{t('Conditional')}</Badge>}
                        {type?.hasChildren && field.fields.length > 0 && !expanded && (
                            <span className="cms:text-xs cms:text-muted-foreground">{t(':count inside', { count: field.fields.length })}</span>
                        )}
                    </span>
                )}
            </div>
            <Button type="button" variant="ghost" size="icon" className="cms:size-8 cms:text-muted-foreground hover:cms:text-foreground"
                aria-label={t('Duplicate :title', { title })} title={t('Duplicate :title', { title })} onClick={onDuplicate}><Copy /></Button>
            <Button type="button" variant="ghost" size="icon" className="cms:size-8 cms:text-destructive"
                aria-label={t('Remove :title', { title })} title={t('Remove :title', { title })} onClick={onRemove}><Trash2 /></Button>
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

    const groups = settingGroups(type?.settings ?? []);
    const setting = (each: FieldDefinition, fill = false) => (
        <FieldInput key={each.handle} id={`${id}-config-${each.handle}`} field={each} value={config[each.handle]} fill={fill}
            errors={errorsAt(errors, `config.${each.handle}`)}
            onChange={(value) => onChange({ ...field, config: { ...config, [each.handle]: value } })} />
    );
    const validationError = errors.validation ?? Object.entries(errors).find(([key]) => key.startsWith('validation.'))?.[1];

    return (
        <div id={id} className="cms:flex cms:flex-col cms:gap-5 cms:border-t cms:p-4">
            {!type && <p className="cms:text-sm cms:text-destructive">{t('The field type ":type" isn\'t registered. Its data is kept; register the type or remove the field.', { type: field.type })}</p>}
            <SettingsSection title={t('Basics')}>
                <div className="cms:grid cms:items-start cms:gap-4 cms:md:grid-cols-2">
                    <div className="cms:flex cms:min-w-0 cms:flex-col cms:gap-2">
                        <Label htmlFor={`${id}-label`}>{t('Label')}</Label>
                        <Input id={`${id}-label`} value={field.label ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(relabel(field, e.target.value, siblings))} />
                        <FieldError message={errors.label} />
                    </div>
                    <div className="cms:flex cms:min-w-0 cms:flex-col cms:gap-2">
                        <Label htmlFor={`${id}-handle`}>{t('Handle')}</Label>
                        <Input id={`${id}-handle`} className="cms:font-mono" value={field.handle}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ ...field, handle: cleanHandle(e.target.value), handleTouched: true })} />
                        {renamedFrom(field) === null && <p className="cms:text-sm cms:text-muted-foreground">{t('How templates read it. Renaming it hides values saved under the old one.')}</p>}
                        <div aria-live="polite">
                            {renamedFrom(field) !== null && (
                                <ChangeWarning>
                                    {withCode(t('Content saved under :old won\'t show under :new, and templates reading :old get nothing. To rename it with its content: put back :old, save, then run :command.'),
                                        { old: renamedFrom(field) ?? '', new: field.handle || '…', command: 'php artisan sunrice:rename-field' })}
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
                <div className="cms:grid cms:items-start cms:gap-4 cms:md:grid-cols-2">
                    <div className="cms:flex cms:h-9 cms:items-center cms:gap-3 cms:md:h-auto">
                        <Switch id={`${id}-required`} checked={field.required === true} onCheckedChange={(required: boolean) => onChange({ ...field, required })} />
                        <Label htmlFor={`${id}-required`}>{t('Required')}</Label>
                    </div>
                    <div className="cms:flex cms:min-w-0 cms:flex-col cms:gap-1">
                        <div className="cms:flex cms:items-center cms:gap-3">
                            <Switch id={`${id}-translatable`} checked={isTranslatable(field, type?.translatable ?? false)} aria-describedby={`${id}-translatable-help`}
                                onCheckedChange={(on: boolean) => onChange(setTranslatable(field, on, type?.translatable ?? false))} />
                            <Label htmlFor={`${id}-translatable`}>{t('Translatable')}</Label>
                        </div>
                        <p id={`${id}-translatable-help`} className="cms:text-sm cms:text-muted-foreground">{t('Each language gets its own value. Off: one value shared by every language.')}</p>
                    </div>
                </div>
            </SettingsSection>

            {groups.options.length > 0 && (
                <SettingsSection title={t('Options')}>
                    {groups.options.map((each) => (groups.dependents[each.handle]?.length ?? 0) > 0 ? (
                        <SwitchWithDependents key={each.handle} id={id} toggle={each} dependents={groups.dependents[each.handle] ?? []} config={config} errors={errors}
                            onChange={(changes) => onChange({ ...field, config: { ...config, ...changes } })} />
                    ) : setting(each, true))}
                </SettingsSection>
            )}

            {groups.limits.length > 0 && (
                <SettingsSection title={t('Limits and defaults')}>
                    <div className="cms:grid cms:grid-cols-1 cms:items-start cms:gap-4 cms:min-[420px]:grid-cols-2 cms:lg:grid-cols-4">
                        {groups.limits.map((each) => <div key={each.handle} className="cms:min-w-0">{setting(each, true)}</div>)}
                    </div>
                </SettingsSection>
            )}

            <ConditionSettings id={id} field={field} siblings={siblings} onChange={onChange} errors={errorsUnder(errors, 'condition')} />

            {locales.length > 0 && <TranslationSettings id={id} field={field} locales={locales} onChange={onChange} errors={errorsUnder(errors, 'translations')} />}

            <details className="cms:group cms:rounded-lg cms:border cms:p-3" open={(field.validation ?? []).some((rule) => rule.trim() !== '') || validationError !== undefined}>
                <summary className="cms:cursor-pointer cms:text-sm cms:font-medium">{t('Advanced')}</summary>
                <div className="cms:mt-3 cms:flex cms:flex-col cms:gap-2">
                    <Label htmlFor={`${id}-validation`}>{t('Extra rules')}</Label>
                    <Textarea id={`${id}-validation`} rows={2} className="cms:min-h-0 cms:font-mono"
                        value={(field.validation ?? []).join('\n')}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange({ ...field, validation: e.target.value.split('\n') })} />
                    <p className="cms:text-sm cms:text-muted-foreground">{withCode(t('Optional checks, one per line, such as :email or :max (for developers: Laravel validation rules).'), { email: 'email', max: 'max:100' })}</p>
                    <FieldError message={validationError} />
                </div>
            </details>

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

/**
 * A switch and the settings that only apply while it's on, on one row: [Several terms] At most [No limit].
 * They're hidden while it's off (and not kept: DefinitionValidator drops them).
 */
function SwitchWithDependents({ id, toggle, dependents, config, errors, onChange }: {
    id: string; toggle: FieldDefinition; dependents: FieldDefinition[]; config: Record<string, unknown>; errors: Errors; onChange: (changes: Record<string, unknown>) => void;
}) {
    const on = config[toggle.handle] === true;
    const toggleId = `${id}-config-${toggle.handle}`;
    const messages = [toggle, ...dependents].map((each) => errorsAt(errors, `config.${each.handle}`)['']).filter((message): message is string => message !== undefined);

    return (
        <div className="cms:flex cms:flex-col cms:gap-2">
            <div className="cms:flex cms:min-h-9 cms:flex-wrap cms:items-center cms:gap-x-6 cms:gap-y-2">
                <div className="cms:flex cms:items-center cms:gap-3">
                    <Switch id={toggleId} checked={on} onCheckedChange={(checked: boolean) => onChange({ [toggle.handle]: checked })} />
                    <Label htmlFor={toggleId}>{toggle.label || toggle.handle}</Label>
                </div>
                {on && dependents.map((each) => {
                    const dependentId = `${id}-config-${each.handle}`;
                    const value = config[each.handle];
                    return each.type === 'number' ? (
                        <div key={each.handle} className="cms:flex cms:items-center cms:gap-2">
                            <Label htmlFor={dependentId} className="cms:font-normal">{each.label || each.handle}</Label>
                            <Input id={dependentId} type="number" className="cms:w-28" aria-describedby={each.instructions ? `${dependentId}-help` : undefined}
                                placeholder={typeof each.config?.placeholder === 'string' ? each.config.placeholder : undefined}
                                min={typeof each.config?.min === 'number' ? each.config.min : undefined} max={typeof each.config?.max === 'number' ? each.config.max : undefined}
                                step={typeof each.config?.step === 'number' ? each.config.step : 'any'}
                                value={typeof value === 'number' || typeof value === 'string' ? String(value) : ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ [each.handle]: e.target.value === '' ? null : Number(e.target.value) })} />
                            {each.instructions && <span id={`${dependentId}-help`} className="cms:text-sm cms:text-muted-foreground">{each.instructions}</span>}
                        </div>
                    ) : (
                        <div key={each.handle} className="cms:basis-full">
                            <FieldInput id={dependentId} field={each} value={value} fill errors={errorsAt(errors, `config.${each.handle}`)} onChange={(next) => onChange({ [each.handle]: next })} />
                        </div>
                    );
                })}
            </div>
            {toggle.instructions && <p className="cms:text-sm cms:text-muted-foreground">{toggle.instructions}</p>}
            {messages.map((message) => <FieldError key={message} message={message} />)}
        </div>
    );
}

/** A titled part of a field's settings (Basics, Options, Limits and defaults, Visibility), each the same way. */
function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
    const id = React.useId();

    return (
        <section aria-labelledby={id} className="cms:flex cms:flex-col cms:gap-4">
            <h4 id={id} className="cms:text-xs cms:font-semibold cms:uppercase cms:tracking-wide cms:text-muted-foreground">{title}</h4>
            {children}
        </section>
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

/** An operator's words (OPERATORS keeps the English for the tests). */
function operatorLabel(operator: FieldConditionRule['operator']): string {
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

/**
 * "Show this field": always, or when other fields on this level are so: a list of rules (field, how to
 * compare, and with what, the value input fitting the other field), and with two or more, whether all
 * of them must hold or any one.
 */
function ConditionSettings({ id, field, siblings, onChange, errors }: { id: string; field: BuilderField; siblings: BuilderField[]; onChange: (field: BuilderField) => void; errors: Errors }) {
    const others = conditionChoices(field, siblings);
    const rules = conditionRules(field.condition);
    const match = conditionMatch(field.condition);
    const set = (next: FieldConditionRule[], nextMatch: 'all' | 'any' = match) => onChange({ ...field, condition: conditionFrom(next, nextMatch) });
    const setRule = (index: number, changes: Partial<FieldConditionRule>) => set(rules.map((rule, i) => (i === index ? { ...rule, ...changes } : rule)));
    const add = () => {
        const other = others.find((o) => !rules.some((rule) => rule.field === o.handle)) ?? others[0];
        if (!other) return;
        set([...rules, { field: other.handle, operator: 'equals', value: startValue(conditionValueInput(other)) }]);
    };
    // Errors under one rule ("rules.1.field"), or of the only rule ("field").
    const ruleError = (index: number): string | undefined => {
        const own = rules.length > 1 || 'rules' in (field.condition ?? {}) ? errorsUnder(errors, `rules.${index}`) : errors;
        return own.field ?? own.operator ?? own.value;
    };

    if (others.length === 0 && rules.length === 0) return null;

    return (
        <SettingsSection title={t('Visibility')}>
            {rules.length === 0 ? (
                <p className="cms:text-sm cms:text-muted-foreground">{t('Always shown.')}</p>
            ) : (
                <>
                    {rules.length > 1 && (
                        <div className="cms:flex cms:flex-wrap cms:items-center cms:gap-2 cms:text-sm">
                            <span id={`${id}-match-label`}>{t('Show when')}</span>
                            <Select value={match} onValueChange={(value: string) => set(rules, value === 'any' ? 'any' : 'all')}>
                                <SelectTrigger aria-labelledby={`${id}-match-label`} className="cms:h-8 cms:w-auto"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">{t('All of these')}</SelectItem>
                                    <SelectItem value="any">{t('Any of these')}</SelectItem>
                                </SelectContent>
                            </Select>
                            <span>{t('are true:')}</span>
                        </div>
                    )}
                    <ul className="cms:flex cms:flex-col cms:gap-2">
                        {rules.map((rule, index) => {
                            const other = siblings.find((sibling) => sibling.handle === rule.field && sibling.key !== field.key);
                            const operator = OPERATORS.find((o) => o.value === rule.operator) ?? OPERATORS[0]!;
                            const input = conditionValueInput(other);
                            const error = ruleError(index);
                            return (
                                <li key={index} className="cms:flex cms:flex-col cms:gap-1">
                                    <div className="cms:flex cms:flex-wrap cms:items-start cms:gap-2">
                                        <span className="cms:flex cms:h-9 cms:w-20 cms:shrink-0 cms:items-center cms:text-sm cms:text-muted-foreground">{index === 0 ? t('Only when') : (match === 'any' ? t('or') : t('and'))}</span>
                                        <Select value={rule.field} onValueChange={(value: string) => {
                                            const next = siblings.find((sibling) => sibling.handle === value);
                                            setRule(index, { field: value, value: startValue(conditionValueInput(next)) });
                                        }}>
                                            <SelectTrigger id={index === 0 ? `${id}-condition` : undefined} aria-label={t('Field')} className="cms:w-48"><SelectValue placeholder={rule.field} /></SelectTrigger>
                                            <SelectContent>
                                                {others.map((o) => <SelectItem key={o.key} value={o.handle}>{o.label || o.handle}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <Select value={operator.value} onValueChange={(value: string) => setRule(index, { operator: value as FieldConditionRule['operator'] })}>
                                            <SelectTrigger aria-label={t('How to compare')} className="cms:w-36"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                {OPERATORS.map((o) => <SelectItem key={o.value} value={o.value}>{operatorLabel(o.value)}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        {operator.needsValue && (
                                            <div className="cms:min-w-48 cms:flex-1 cms:sm:max-w-72">
                                                <ConditionValue id={`${id}-rule-${index}-value`} input={input} value={rule.value ?? null} invalid={error !== undefined}
                                                    onChange={(value) => setRule(index, { value })} />
                                            </div>
                                        )}
                                        <Button type="button" variant="ghost" size="icon" className="cms:ml-auto cms:size-9 cms:text-muted-foreground hover:cms:text-destructive"
                                            aria-label={t('Remove condition :number', { number: String(index + 1) })} title={t('Remove condition')}
                                            onClick={() => set(rules.filter((_, i) => i !== index))}><X /></Button>
                                    </div>
                                    <FieldError message={error} />
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
            {others.length > 0 && (
                <div><Button type="button" variant="outline" size="sm" onClick={add}><Plus /> {t('Add condition')}</Button></div>
            )}
            {rules.length > 0 && <p className="cms:text-sm cms:text-muted-foreground">{t('A hidden field isn\'t required, and keeps what it had.')}</p>}
            <FieldError message={errors[''] ?? errors.rules ?? errors.match} />
        </SettingsSection>
    );
}

/** A rule's value, with the input that fits the other field (conditionValueInput). */
function ConditionValue({ id, input, value, invalid, onChange }: {
    id: string; input: ConditionValueInput; value: string | number | boolean | null; invalid: boolean; onChange: (value: string | number | boolean | null) => void;
}) {
    switch (input.kind) {
        case 'options':
            return (
                <Select value={typeof value === 'string' && value !== '' ? value : undefined} onValueChange={(next: string) => onChange(next)}>
                    <SelectTrigger id={id} aria-label={t('Value')} aria-invalid={invalid} className="cms:w-full"><SelectValue placeholder={t('Choose…')} /></SelectTrigger>
                    <SelectContent>
                        {input.options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            );
        case 'toggle':
            return (
                <Select value={value === false || value === 'false' ? 'false' : 'true'} onValueChange={(next: string) => onChange(next === 'true')}>
                    <SelectTrigger id={id} aria-label={t('Value')} aria-invalid={invalid} className="cms:w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="true">{t('switched on')}</SelectItem>
                        <SelectItem value="false">{t('switched off')}</SelectItem>
                    </SelectContent>
                </Select>
            );
        case 'terms':
            return input.taxonomy === null
                ? <Input id={id} aria-label={t('Value')} aria-invalid={invalid} disabled placeholder={t('Choose the field\'s taxonomy first')} />
                : <TermsPicker id={id} taxonomy={input.taxonomy} multiple={false} max={null} required={false} invalid={invalid}
                    value={typeof value === 'number' ? value : typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : null}
                    onChange={(next) => onChange(typeof next === 'number' ? next : null)} />;
        case 'entries':
            return <EntriesPicker id={id} multiple={false} max={null} collections={input.collections} invalid={invalid}
                value={typeof value === 'number' ? value : typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : null}
                onChange={(next) => onChange(typeof next === 'number' ? next : null)} />;
        case 'number':
            return <Input id={id} type="number" aria-label={t('Value')} aria-invalid={invalid} placeholder={t('A number')}
                value={value === null || value === undefined ? '' : String(value)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value === '' ? null : Number(e.target.value))} />;
        default:
            return <Input id={id} aria-label={t('Value')} aria-invalid={invalid} placeholder={t('The text to compare with')}
                value={value === null || value === undefined ? '' : String(value)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} />;
    }
}

/** A translated sentence with :placeholders shown as code. */
function withCode(text: string, codes: Record<string, string>): React.ReactNode {
    return text.split(/(:[a-z_]+)/).map((part, i) => {
        const code = codes[part.slice(1)];
        return part.startsWith(':') && code !== undefined ? <code key={i}>{code}</code> : part;
    });
}
