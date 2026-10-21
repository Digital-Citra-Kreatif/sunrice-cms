import { t } from '@sunrice/admin-sdk';

/** cms.article → resources/views/cms/article.blade.php */
export const viewFile = (view: string) => `resources/views/${view.replace(/\./g, '/')}.blade.php`;

/** How a template name maps to a file, and what's used, in order, when it's left empty. */
export function TemplateHelp({ example, fallbacks }: { example: string; fallbacks: string[] }) {
    return (
        <div className="cms:flex cms:flex-col cms:gap-1 cms:text-xs cms:leading-relaxed cms:text-muted-foreground">
            <p>{t('A Blade view: :example is :file.', { example: '\u0000', file: '\u0001' }).split(/(\u0000|\u0001)/).map((part, i) => part === '\u0000'
                ? <code key={i} className="cms:text-foreground">{example}</code>
                : part === '\u0001' ? <code key={i} className="cms:break-all">{viewFile(example)}</code> : part)}</p>
            <p>{t('Empty: the first that exists of')}</p>
            <ol className="cms:ml-4 cms:list-decimal">
                {fallbacks.map((fallback) => <li key={fallback}>{fallback.includes(' ') ? fallback : <code className="cms:break-all">{viewFile(fallback)}</code>}</li>)}
                <li>{t('the built-in template')}</li>
            </ol>
        </div>
    );
}
