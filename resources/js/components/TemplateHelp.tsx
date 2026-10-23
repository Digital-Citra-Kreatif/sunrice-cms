import * as React from 'react';
import { router } from '@inertiajs/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { t } from '@imajiner/admin-sdk';
import {
    Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, Label, Popover, PopoverContent, PopoverTrigger,
} from '@imajiner/admin-sdk/ui';
import { FieldError } from '@/components/FieldError.tsx';

/** A view and whether its file exists, as the server found it. */
export interface TemplateFile {
    view: string;
    exists: boolean;
}

/** The views a page may render with: its own (if set) and those tried in order when it's empty; and the views that exist to pick from. */
export interface TemplateLookup {
    own: TemplateFile | null;
    fallbacks: TemplateFile[];
    /** The views that exist to pick from (layouts, partials and the like left out): loaded when the choice opens. */
    choices?: string[];
    /** A view name to show how names map to files ("pages.blog-landing"). */
    example?: string;
}

/** A page's lookup with the views to pick from, once its `templateChoices` prop is loaded (TemplateField asks for it). */
export function withTemplateChoices(lookup: TemplateLookup | null, choices: string[] | undefined): TemplateLookup | null {
    return lookup === null || choices === undefined ? lookup : { ...lookup, choices };
}

/** cms.article → cms/article.blade.php, under resources/views (a package's "pkg::x.y" stays as it is). */
export const shortViewFile = (view: string) => (view.includes('::') ? view : `${view.replace(/\./g, '/')}.blade.php`);

/**
 * Which of the views is used: the page's own, when its file exists, else
 * the first fallback that exists (null: the built-in template). A view
 * typed but not saved yet counts when it's one of the choices.
 */
export function usedTemplate(value: string, lookup: TemplateLookup | null | undefined): string | null {
    const own = value.trim();
    if (own !== '' && !missingTemplate(value, lookup)) return own;

    return lookup?.fallbacks.find((file) => file.exists && file.view !== own)?.view ?? null;
}

/** Whether a typed view has no file yet (as far as the server said). */
export function missingTemplate(value: string, lookup: TemplateLookup | null | undefined): boolean {
    const own = value.trim();
    if (own === '') return false;
    if (lookup?.own?.view === own) return !lookup.own.exists;

    return lookup?.choices !== undefined && !lookup.choices.includes(own);
}

/** A file's path on one line, cut short with the whole of it in a tooltip. */
function FilePath({ view }: { view: string }) {
    const file = shortViewFile(view);

    return <code title={file} className="cms:block cms:min-w-0 cms:truncate cms:font-mono cms:text-xs">{file}</code>;
}

/** The files tried for a page, in order, the one in use marked: the "How is it chosen?" popover's list. */
export function TemplateOrder({ value = '', lookup = null }: { value?: string; lookup?: TemplateLookup | null }) {
    const own = value.trim();
    const used = usedTemplate(value, lookup);
    const inUse = <span className="cms:shrink-0 cms:rounded cms:bg-emerald-500/15 cms:px-1.5 cms:text-[0.65rem] cms:font-medium cms:text-emerald-800 cms:dark:text-emerald-300">{t('in use')}</span>;
    const files = [...(own !== '' ? [own] : []), ...(lookup?.fallbacks ?? []).map((file) => file.view).filter((view) => view !== own)];

    return (
        <div className="cms:flex cms:flex-col cms:gap-2 cms:text-xs">
            <p className="cms:text-muted-foreground">{t('Tried in this order; the first file that exists is used.')}</p>
            <ol className="cms:flex cms:flex-col cms:gap-1">
                {files.map((view, i) => (
                    <li key={view} className="cms:flex cms:min-w-0 cms:items-center cms:gap-2 cms:text-muted-foreground">
                        <span className="cms:w-4 cms:shrink-0 cms:text-right cms:tabular-nums">{i + 1}.</span>
                        <FilePath view={view} />
                        {used === view && inUse}
                    </li>
                ))}
                <li className="cms:flex cms:items-center cms:gap-2 cms:text-muted-foreground">
                    <span className="cms:w-4 cms:shrink-0 cms:text-right cms:tabular-nums">{files.length + 1}.</span>
                    <span className="cms:min-w-0 cms:truncate">{t('the built-in template')}</span>
                    {used === null && inUse}
                </li>
            </ol>
        </div>
    );
}

/**
 * A page's template setting: a combobox of the views that exist, with
 * "Automatic" (empty: the collection's or taxonomy's template) first and
 * any other view name typed in; two helper lines (how names map to files,
 * what Automatic uses), the file in use, and "How is it chosen?" for the
 * order the files are tried in. The views to pick from (lookup.choices)
 * may be left out of the page until the choice first opens (finding them
 * reads the views folders): it then reloads the page's `templateChoices`
 * prop (withTemplateChoices()).
 */
export function TemplateField({ id, value, onChange, lookup = null, example, automatic, error, disabled = false }: {
    id: string;
    value: string;
    onChange: (value: string) => void;
    lookup?: TemplateLookup | null;
    /** A view name to show how names map to files, when the lookup has none: "pages.posts-landing". */
    example: string;
    /** What Automatic uses, in words: "Automatic uses the collection's template." */
    automatic: string;
    error?: string;
    disabled?: boolean;
}) {
    const [open, setOpen] = React.useState(false);
    const [typed, setTyped] = React.useState('');
    const loadChoices = () => { if (lookup?.choices === undefined) router.reload({ only: ['templateChoices'] }); };
    const choices = lookup?.choices ?? [];
    const shown = lookup?.example ?? example;
    // The site's own folder first, then the other views.
    const inCms = choices.filter((view) => view.startsWith('cms.'));
    const others = choices.filter((view) => !view.startsWith('cms.'));
    const option = (view: string) => (
        <CommandItem key={view} value={view} onSelect={() => pick(view)}>
            <Check className={own === view ? '' : 'cms:opacity-0'} /> <span className="cms:truncate cms:font-mono cms:text-xs">{view}</span>
        </CommandItem>
    );
    const own = value.trim();
    const used = usedTemplate(value, lookup);
    const missing = missingTemplate(value, lookup);
    const candidate = typed.trim().toLowerCase();
    const pick = (next: string) => { onChange(next); setOpen(false); setTyped(''); };

    return (
        <div className="cms:flex cms:min-w-0 cms:flex-col cms:gap-2">
            <Label htmlFor={id}>{t('Template')}</Label>
            <Popover open={open} onOpenChange={(next: boolean) => { setOpen(next); if (!next) setTyped(''); if (next) loadChoices(); }}>
                <PopoverTrigger asChild>
                    <Button id={id} type="button" variant="outline" role="combobox" aria-expanded={open} aria-invalid={error !== undefined} disabled={disabled}
                        className="cms:w-full cms:min-w-0 cms:justify-between cms:font-normal">
                        <span className={`cms:min-w-0 cms:truncate ${own === '' ? 'cms:text-muted-foreground' : 'cms:font-mono cms:text-xs'}`} title={own || undefined}>
                            {own === '' ? t('Automatic') : own}
                        </span>
                        <ChevronsUpDown className="cms:opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="cms:w-(--radix-popover-trigger-width) cms:min-w-64 cms:p-0">
                    <Command>
                        <CommandInput placeholder={t('Automatic, or type a view name')} value={typed} onValueChange={setTyped} />
                        <CommandList>
                            <CommandEmpty>{t('No such view.')}</CommandEmpty>
                            {/* Whatever is typed, first, so Enter takes it: any view of the app, not only those listed. */}
                            {candidate !== '' && !choices.includes(candidate) && (
                                <CommandGroup>
                                    <CommandItem value={`__typed ${candidate}`} keywords={[candidate]} onSelect={() => pick(candidate)}>
                                        <Check className="cms:opacity-0" /> <span className="cms:truncate">{t('Use “:view”', { view: candidate })}</span>
                                    </CommandItem>
                                </CommandGroup>
                            )}
                            <CommandGroup>
                                <CommandItem value="__automatic" keywords={[t('Automatic')]} onSelect={() => pick('')}>
                                    <Check className={own === '' ? '' : 'cms:opacity-0'} /> {t('Automatic')}
                                </CommandItem>
                            </CommandGroup>
                            {inCms.length > 0 && <CommandGroup heading={t('In cms/')}>{inCms.map(option)}</CommandGroup>}
                            {others.length > 0 && <CommandGroup heading={inCms.length > 0 ? t('Other views') : t('Views')}>{others.map(option)}</CommandGroup>}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {missing && <p className="cms:text-xs cms:text-amber-700 cms:dark:text-amber-400">{t('No such file yet: the page uses the next one until it exists.')}</p>}
            <div className="cms:flex cms:flex-col cms:gap-0.5 cms:text-xs cms:leading-relaxed cms:text-muted-foreground">
                <p>{t('A view name from resources/views: :example is :file.', { example: '\u0000', file: '\u0001' }).split(/(\u0000|\u0001)/).map((part, i) => part === '\u0000'
                    ? <code key={i} className="cms:wrap-anywhere">{shown}</code>
                    : part === '\u0001' ? <code key={i} className="cms:wrap-anywhere">{shortViewFile(shown)}</code> : part)}</p>
                <p>{automatic}</p>
            </div>
            {/* The file in use, then the link; the link goes under it when they don't fit side by side. A long path is cut short, whole in its tooltip. */}
            <div className="cms:flex cms:min-w-0 cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-1 cms:text-xs cms:text-muted-foreground">
                <span className="cms:flex cms:min-w-0 cms:max-w-full cms:items-baseline cms:gap-1">
                    <span className="cms:shrink-0">{t('Uses')}</span>
                    {used === null ? <span>{t('the built-in template')}</span> : <FilePath view={used} />}
                </span>
                <Popover>
                    <PopoverTrigger asChild>
                        <button type="button" className="cms:ml-auto cms:shrink-0 cms:rounded-sm cms:underline cms:underline-offset-4 cms:hover:text-foreground cms:focus-visible:outline-2 cms:focus-visible:outline-ring">
                            {t('How is it chosen?')}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="cms:w-max cms:min-w-72 cms:max-w-[min(32rem,calc(100vw-2rem))]">
                        <TemplateOrder value={value} lookup={lookup} />
                    </PopoverContent>
                </Popover>
            </div>
            <FieldError message={error} />
        </div>
    );
}
