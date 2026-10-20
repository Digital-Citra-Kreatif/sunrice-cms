/** cms.article → resources/views/cms/article.blade.php */
export const viewFile = (view: string) => `resources/views/${view.replace(/\./g, '/')}.blade.php`;

/** How a template name maps to a file, and what's used, in order, when it's left empty. */
export function TemplateHelp({ example, fallbacks }: { example: string; fallbacks: string[] }) {
    return (
        <div className="cms:flex cms:flex-col cms:gap-1 cms:text-xs cms:leading-relaxed cms:text-muted-foreground">
            <p>A Blade view: <code className="cms:text-foreground">{example}</code> is <code className="cms:break-all">{viewFile(example)}</code>.</p>
            <p>Empty: the first that exists of</p>
            <ol className="cms:ml-4 cms:list-decimal">
                {fallbacks.map((fallback) => <li key={fallback}>{fallback.includes(' ') ? fallback : <code className="cms:break-all">{viewFile(fallback)}</code>}</li>)}
                <li>the built-in template</li>
            </ol>
        </div>
    );
}
