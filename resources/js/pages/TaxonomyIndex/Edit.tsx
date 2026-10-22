import { router } from '@inertiajs/react';
import { Settings2 } from 'lucide-react';
import { adminUrl, t } from '@imajiner/admin-sdk';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@imajiner/admin-sdk/ui';
import { PageValuesForm, type PageValuesProps } from '@/components/PageValuesForm.tsx';

interface Props extends PageValuesProps {
    taxonomy: { handle: string; title: string };
    /** The collection whose index page it is; null: the shared one. */
    collection: { handle: string; title: string } | null;
    /** The page on the site, in this language. */
    url: string | null;
    /** The taxonomy's index pages that are on (collection null: the shared one). */
    pages: { collection: string | null; title: string }[];
    /** The taxonomy's settings, when the user may change them. */
    settings?: string | null;
}

const SHARED = '__shared';

/** A taxonomy index page's fields and SEO (the shared one, or a collection's), per language. */
export default function TaxonomyIndexPage({ taxonomy, collection, url, pages, settings, ...props }: Props) {
    const back = adminUrl(`cms/taxonomies/${taxonomy.handle}/terms`);
    const editUrl = adminUrl(`cms/taxonomies/${taxonomy.handle}/index-page/edit`);
    const page = collection ? t('Index page: :collection', { collection: collection.title }) : t('Index page');

    return (
        <PageValuesForm {...props}
            title={`${taxonomy.title}: ${page}`}
            breadcrumbs={[{ label: taxonomy.title, href: back }, { label: page }]}
            back={{ href: back, label: t('Back to :title', { title: taxonomy.title }) }}
            saveUrl={adminUrl(`cms/taxonomies/${taxonomy.handle}/index-page`)}
            editUrl={editUrl}
            params={collection ? { collection: collection.handle } : {}}
            viewUrl={url}
            empty={t('The index page has no fields of its own: choose its fields (Index page fields) in the taxonomy\'s settings under Structure → Taxonomies.')}
            seoDescription={t('How the index page appears in search results and shared links.')}
            storageKey="cms:taxonomy-index:seo"
            menu={settings ? [{ label: t('Taxonomy settings'), href: settings, icon: <Settings2 /> }] : []}
        >
            {pages.length > 1 && (
                <Select value={collection?.handle ?? SHARED} onValueChange={(next: string) => router.get(editUrl, { ...(next === SHARED ? {} : { collection: next }), locale: props.locale })}>
                    <SelectTrigger className="cms:w-64" aria-label={t('Page')}><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {pages.map((each) => (
                            <SelectItem key={each.collection ?? SHARED} value={each.collection ?? SHARED}>
                                {each.collection === null ? t('Shared index (all collections)') : t(':collection only', { collection: each.title })}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        </PageValuesForm>
    );
}
