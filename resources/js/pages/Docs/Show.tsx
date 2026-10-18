import { usePage } from '@inertiajs/react';
import { useBreadcrumbs } from '@/components/app/breadcrumbs';
import { DocsReader, type DocsSection } from '@/components/app/docs-reader';
import { adminUrl } from '@/lib/route';
import type { SharedProps } from '@/types';

interface Props {
    page: string;
    title: string;
    html: string;
    headings: { id: string; text: string; level: number }[];
    sections: DocsSection[];
}

/** Developer docs: the package's docs/*.md, with a guide list and "On this page". */
export default function DocsShow({ page, title, html, headings, sections }: Props) {
    const { adminPath } = usePage<SharedProps>().props;
    useBreadcrumbs([{ label: 'Manage' }, { label: 'Docs', href: adminUrl('docs', adminPath) }, { label: title }]);

    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-1">
                <h1 className="sunrice-page-title">Docs</h1>
                <p className="text-sm text-muted-foreground">How to build and run a site on Sunrice: templates, commands, languages, mail and more.</p>
            </div>
            <DocsReader base={adminUrl('docs', adminPath)} page={page} html={html} headings={headings} sections={sections} />
        </div>
    );
}
