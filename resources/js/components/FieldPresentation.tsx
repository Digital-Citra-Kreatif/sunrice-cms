import * as React from 'react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@imajiner/admin-sdk/ui';
import { t } from '@imajiner/admin-sdk';
import { inlineMarkdown } from '@/lib/inline-markdown.ts';
import { hintOf } from '@/lib/presentation.ts';
import type { FieldDefinition } from '@/types.ts';

/**
 * The hint at the right of a field's label, in small muted text ("Before
 * tax"), cut short with "…" where the row is narrow (all of it on hover),
 * and an ⓘ after it (or alone) showing the hint's tooltip on hover or focus.
 */
export function FieldHint({ field, id, label, maxWidth = 'cms:max-w-[60%]' }: {
    field: Pick<FieldDefinition, 'hint' | 'hint_tooltip'>; id: string;
    /** The field's label: the ⓘ is "More about Price". */
    label: string;
    /** How wide the hint may get before it's cut short (beside a label: 60% of the row). */
    maxWidth?: string;
}) {
    const { hint, tooltip } = hintOf(field);
    if (hint === null && tooltip === null) return null;

    return (
        <span className={`cms:ml-auto cms:flex ${maxWidth} cms:min-w-0 cms:shrink-0 cms:items-center cms:gap-1 cms:text-xs cms:leading-none cms:text-muted-foreground`}>
            {hint !== null && <span id={`${id}-hint`} className="cms:min-w-0 cms:truncate cms:py-0.5" title={hint}>{hint}</span>}
            {tooltip !== null && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button type="button" aria-label={t('More about :field', { field: label })}
                            className="cms:-m-1 cms:inline-flex cms:shrink-0 cms:rounded-full cms:p-1 cms:text-muted-foreground cms:outline-none cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring">
                            <Info className="cms:size-3.5" aria-hidden />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent className="cms:max-w-xs cms:text-left cms:whitespace-pre-line">{tooltip}</TooltipContent>
                </Tooltip>
            )}
        </span>
    );
}

/**
 * A field's helper text (its "instructions"): simple Markdown, made safe by
 * inlineMarkdown() (everything escaped; only links, bold, italic and code).
 */
export function HelperText({ text, id, className = '' }: { text: string | null | undefined; id?: string; className?: string }) {
    if (!text || text.trim() === '') return null;

    return (
        <p id={id} className={`cms:text-sm cms:text-muted-foreground cms:[overflow-wrap:anywhere] cms:[&_a]:font-medium cms:[&_a]:text-foreground cms:[&_a]:underline cms:[&_a]:underline-offset-2 cms:[&_a:hover]:text-primary cms:[&_code]:rounded cms:[&_code]:bg-muted cms:[&_code]:px-1 cms:[&_code]:font-mono cms:[&_code]:text-[0.8125rem] cms:[&_strong]:font-semibold cms:[&_strong]:text-foreground ${className}`.trim()}
            dangerouslySetInnerHTML={{ __html: inlineMarkdown(text) }} />
    );
}

/**
 * The main language's name ("English"), for the hint under a field shared
 * by all languages: given by the editor of another language than the main one.
 */
export const MainLanguage = React.createContext<string | null>(null);

/**
 * Under a field shared by all languages, in another language than the main
 * one (it's read-only there): where to change it, like its helper text.
 */
export function SharedHint({ id, className = '' }: { id?: string; className?: string }) {
    const language = React.useContext(MainLanguage);

    return (
        <p id={id} className={`cms:text-sm cms:text-muted-foreground ${className}`.trim()}>
            {language ? t('Not translatable: edit it in :language.', { language }) : t('Not translatable: edit it in the main language.')}
        </p>
    );
}

/**
 * An input with a prefix and/or suffix attached ("Rp" 150000, 120 "m²"):
 * one bordered box with the panel's input look, the focus ring around the
 * whole of it, red when the input is invalid, faded when it's disabled.
 * The input inside loses its own border and ring (affixedInput). Without
 * either, the input as it is.
 */
export function Affixed({ prefix, suffix, id, className = '', children }: {
    prefix: string | null; suffix: string | null;
    /** The input's id: the addons are `${id}-prefix` and `${id}-suffix`, for its aria-describedby. */
    id: string;
    className?: string;
    children: React.ReactNode;
}) {
    if (prefix === null && suffix === null) return <>{children}</>;
    const addon = 'cms:flex cms:shrink-0 cms:items-center cms:bg-muted/60 cms:px-3 cms:text-sm cms:whitespace-nowrap cms:text-muted-foreground cms:select-none';

    return (
        <div data-slot="input-group" className={`cms:flex cms:h-10 cms:w-full cms:min-w-0 cms:items-stretch cms:overflow-hidden cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:shadow-xs cms:transition-[border-color,box-shadow] cms:duration-150 cms:hover:border-ring/45 cms:focus-within:border-ring/70 cms:focus-within:ring-4 cms:focus-within:ring-ring-glow cms:has-[[aria-invalid=true]]:border-destructive cms:has-[[aria-invalid=true]]:ring-destructive/20 cms:has-disabled:cursor-not-allowed cms:has-disabled:opacity-50 cms:has-[[readonly]]:bg-muted/30 cms:dark:bg-input/20 ${className}`.trim()}>
            {prefix !== null && <span id={`${id}-prefix`} className={`${addon} cms:border-r cms:border-input/80`}>{prefix}</span>}
            {children}
            {suffix !== null && <span id={`${id}-suffix`} className={`${addon} cms:border-l cms:border-input/80`}>{suffix}</span>}
        </div>
    );
}

/** The classes of an input inside Affixed(): the box draws its border, background and ring. */
export const AFFIXED_INPUT = 'cms:h-full cms:min-w-0 cms:flex-1 cms:rounded-none cms:border-0 cms:bg-transparent cms:shadow-none cms:hover:border-0 cms:focus-visible:ring-0 cms:aria-invalid:ring-0 cms:disabled:opacity-100 cms:dark:bg-transparent';
