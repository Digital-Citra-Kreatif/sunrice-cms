import { LayoutTemplate, Settings2 } from 'lucide-react';
import { adminUrl, t } from '@imajiner/admin-sdk';
import { PageValuesForm, type PageValuesProps } from '@/components/PageValuesForm.tsx';

interface Props extends PageValuesProps {
    collection: { handle: string; title: string; url: string | null };
    /** The collection's settings, when the user may change them. */
    settings?: string | null;
    /** Its listing blueprint's editor, when the user may edit blueprints. */
    blueprint?: string | null;
}

/** A collection's listing page fields and SEO, per language. */
export default function ListingPage({ collection, settings = null, blueprint = null, ...props }: Props) {
    // Back to the collection's settings, where the listing page is set up; for those who can't change them, its entries.
    const back = settings ?? adminUrl(`cms/collections/${collection.handle}/entries`);
    const breadcrumbs = settings
        ? [{ label: t('Collections'), href: adminUrl('cms/collections') }, { label: collection.title, href: settings }, { label: t('Listing page') }]
        : [{ label: collection.title, href: back }, { label: t('Listing page') }];

    return (
        <PageValuesForm {...props}
            title={t(':title: listing page', { title: collection.title })}
            breadcrumbs={breadcrumbs}
            back={{ href: back, label: t('Back to :title', { title: collection.title }) }}
            saveUrl={adminUrl(`cms/collections/${collection.handle}/listing`)}
            editUrl={adminUrl(`cms/collections/${collection.handle}/listing/edit`)}
            viewUrl={collection.url}
            empty={t('The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections.')}
            // Its blueprint setting on the collection's form (the panel's field-{name} anchor).
            emptyAction={settings ? { label: t('Choose a listing blueprint'), href: `${settings}#field-listing_blueprint` } : null}
            seoDescription={t('How the listing page appears in search results and shared links.')}
            storageKey="cms:listing:seo"
            templateHelp={t('For :title\'s listing page, in every language; also under Structure → Collections. Automatic uses the first file that exists.', { title: collection.title })}
            menu={[
                ...(settings ? [{ label: t('Collection settings'), href: settings, icon: <Settings2 /> }] : []),
                ...(blueprint ? [{ label: t('Edit blueprint'), href: blueprint, icon: <LayoutTemplate /> }] : []),
            ]} />
    );
}
