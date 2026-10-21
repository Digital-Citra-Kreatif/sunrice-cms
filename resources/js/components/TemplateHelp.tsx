import * as React from 'react';
import { t } from '@sunrice/admin-sdk';

/** A view and whether its file exists, as the server found it. */
export interface TemplateFile {
    view: string;
    exists: boolean;
}

/** The views a page may render with: its own (if set) and those tried in order when it's empty. */
export interface TemplateLookup {
    own: TemplateFile | null;
    fallbacks: TemplateFile[];
}

/** cms.article → resources/views/cms/article.blade.php */
export const viewFile = (view: string) => `resources/views/${shortViewFile(view)}`;

/** cms.article → cms/article.blade.php, under resources/views (a package's "pkg::x.y" stays as it is). */
export const shortViewFile = (view: string) => (view.includes('::') ? view : `${view.replace(/\./g, '/')}.blade.php`);

/** Which of the views is used: the page's own, when its file exists, else the first fallback that exists (null: the built-in template). */
export function usedTemplate(value: string, lookup: TemplateLookup | null | undefined): string | null {
    const own = value.trim();
    if (own !== '') return lookup?.own?.view === own && !lookup.own.exists ? null : own;

    return lookup?.fallbacks.find((file) => file.exists)?.view ?? null;
}

/** A path that may only break after its slashes. */
function Path({ file }: { file: string }) {
    const parts = file.split('/');

    return (
        <code className="cms:whitespace-normal cms:break-normal">
            {parts.map((part, i) => <React.Fragment key={i}>{part}{i < parts.length - 1 && <>/<wbr /></>}</React.Fragment>)}
        </code>
    );
}

/**
 * Under a template setting: one plain line for editors, and for developers
 * a "Which file?" disclosure with the files tried in order (relative to
 * resources/views), marking the one in use when the server said which exist.
 */
export function TemplateHelp({ example, empty, value = '', lookup = null }: {
    example: string;
    /** What an empty setting uses, in words: "Leave empty to use the collection's template." */
    empty: string;
    value?: string;
    lookup?: TemplateLookup | null;
}) {
    const own = value.trim();
    const used = usedTemplate(value, lookup);
    const fallbacks = lookup?.fallbacks ?? [];
    const inUse = <span className="cms:ml-1 cms:rounded cms:bg-muted cms:px-1 cms:text-[0.65rem] cms:font-medium cms:text-foreground">{t('in use')}</span>;

    return (
        <div className="cms:flex cms:flex-col cms:gap-1 cms:text-xs cms:leading-relaxed cms:text-muted-foreground">
            <p>{empty}</p>
            <details className="cms:group">
                <summary className="cms:w-fit cms:cursor-pointer cms:select-none cms:rounded-sm cms:underline-offset-4 hover:cms:underline focus-visible:cms:outline-2 focus-visible:cms:outline-ring">{t('Which file?')}</summary>
                <div className="cms:mt-1.5 cms:flex cms:flex-col cms:gap-1.5">
                    {own !== '' && (
                        <p>
                            <Path file={shortViewFile(own)} />
                            {lookup?.own?.view === own ? (lookup.own.exists ? inUse : <span className="cms:ml-1 cms:text-destructive">{t('not found')}</span>) : null}
                        </p>
                    )}
                    <p>{own !== '' ? t('Without it, the first that exists:') : t('The first that exists:')}</p>
                    <ol className="cms:ml-4 cms:list-decimal cms:space-y-0.5">
                        {fallbacks.map((file) => <li key={file.view}><Path file={shortViewFile(file.view)} />{used === file.view && own === '' && inUse}</li>)}
                        <li>{t('the built-in template')}{used === null && inUse}</li>
                    </ol>
                    <p>{t('Files are under resources/views; a name like :example is :file.', { example: '\u0000', file: '\u0001' }).split(/(\u0000|\u0001)/).map((part, i) => part === '\u0000'
                        ? <code key={i}>{example}</code>
                        : part === '\u0001' ? <Path key={i} file={shortViewFile(example)} /> : part)}</p>
                </div>
            </details>
        </div>
    );
}
