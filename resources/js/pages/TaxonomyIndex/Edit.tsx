import { router } from '@inertiajs/react';
import { LayoutTemplate, Settings2 } from 'lucide-react';
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
    /** The taxonomy's settings, when the user may change them (the back link, breadcrumbs and menu). */
    settings?: string | null;
    /** Its index page blueprint's editor, when the user may edit blueprints. */
    blueprint?: string | null;
}

const SHARED = '__shared';

/** A taxonomy index page's fields and SEO (the shared one, or a collection's), per language. */
export default function TaxonomyIndexPage({ taxonomy, collection, url, pages, settings = null, blueprint = null, ...props }: Props) {
    // Back to the taxonomy's settings, where its index pages are set up; for those who can't change them, its terms.
    const back = settings ?? adminUrl(`cms/taxonomies/${taxonomy.handle}/terms`);
    const editUrl = adminUrl(`cms/taxonomies/${taxonomy.handle}/index-page/edit`);
    const page = collection ? t('Index page: :collection', { collection: collection.title }) : t('Index page');
    const breadcrumbs = settings
        ? [{ label: t('Taxonomies'), href: adminUrl('cms/taxonomies') }, { label: taxonomy.title, href: settings }, { label: page }]
        : [{ label: taxonomy.title, href: back }, { label: page }];

    return (
        <PageValuesForm {...props}
            title={`${taxonomy.title}: ${page}`}
            breadcrumbs={breadcrumbs}
            back={{ href: back, label: t('Back to :title', { title: taxonomy.title }) }}
            saveUrl={adminUrl(`cms/taxonomies/${taxonomy.handle}/index-page`)}
            editUrl={editUrl}
            params={collection ? { collection: collection.handle } : {}}
            viewUrl={url}
            empty={t('The index page has no fields of its own: choose an index page blueprint for the taxonomy under Structure → Taxonomies.')}
            emptyAction={settings ? { label: t('Choose an index page blueprint'), href: `${settings}#field-index_blueprint` } : null}
            seoDescription={t('How the index page appears in search results and shared links.')}
            storageKey="cms:taxonomy-index:seo"
            templateHelp={t('For all of :taxonomy\'s index pages, the shared one and each collection\'s, in every language; also under Structure → Taxonomies. Automatic uses the first file that exists.', { taxonomy: taxonomy.title })}
            menu={[
                ...(settings ? [{ label: t('Taxonomy settings'), href: settings, icon: <Settings2 /> }] : []),
                ...(blueprint ? [{ label: t('Edit blueprint'), href: blueprint, icon: <LayoutTemplate /> }] : []),
            ]}
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
