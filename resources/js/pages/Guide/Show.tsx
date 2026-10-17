import { router, usePage } from '@inertiajs/react';
import { Languages } from 'lucide-react';
import { useBreadcrumbs } from '@/components/app/breadcrumbs';
import { DocsReader, type DocsSection } from '@/components/app/docs-reader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { adminUrl } from '@/lib/route';
import type { SharedProps } from '@/types';

interface Props {
    page: string;
    title: string;
    html: string;
    headings: { id: string; text: string; level: number }[];
    sections: DocsSection[];
    locale: string;
    locales: { code: string; label: string }[];
}

const TEXT: Record<string, { intro: string; pages: string; onThisPage: string; language: string }> = {
    en: { intro: 'How to work with the CMS: content, media, forms, comments, settings and your team.', pages: 'Guide pages', onThisPage: 'On this page', language: 'Guide language' },
    id: { intro: 'Cara bekerja dengan CMS: konten, media, formulir, komentar, pengaturan, dan tim Anda.', pages: 'Halaman panduan', onThisPage: 'Di halaman ini', language: 'Bahasa panduan' },
};

/** User guide: guide/{locale}/*.md, in the reader's chosen language. */
export default function GuideShow({ page, title, html, headings, sections, locale, locales }: Props) {
    const { adminPath } = usePage<SharedProps>().props;
    const text = TEXT[locale] ?? TEXT.en;
    const base = adminUrl('guide', adminPath);
    useBreadcrumbs([{ label: 'Manage' }, { label: 'Guide', href: base }, { label: title }]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                    <h1 className="sunrice-page-title">{locale === 'id' ? 'Panduan' : 'Guide'}</h1>
                    <p className="text-sm text-muted-foreground">{text.intro}</p>
                </div>
                {locales.length > 1 && (
                    // The server remembers the choice for the next pages.
                    <Select value={locale} onValueChange={(lang) => router.visit(`${base}/${page}?lang=${lang}`, { preserveScroll: true })}>
                        <SelectTrigger className="w-full sm:w-52" aria-label={text.language}>
                            <Languages className="size-4 text-muted-foreground" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {locales.map((l) => <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                )}
            </div>
            <DocsReader
                base={base}
                page={page}
                html={html}
                headings={headings}
                sections={sections}
                labels={{ pages: text.pages, onThisPage: text.onThisPage }}
            />
        </div>
    );
}
