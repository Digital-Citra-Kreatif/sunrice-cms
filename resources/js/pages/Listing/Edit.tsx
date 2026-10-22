import { adminUrl, t } from '@imajiner/admin-sdk';
import { PageValuesForm, type PageValuesProps } from '@/components/PageValuesForm.tsx';

interface Props extends PageValuesProps {
    collection: { handle: string; title: string; url: string | null };
}

/** A collection's listing page fields and SEO, per language. */
export default function ListingPage({ collection, ...props }: Props) {
    const back = adminUrl(`cms/collections/${collection.handle}/entries`);

    return (
        <PageValuesForm {...props}
            title={t(':title: listing page', { title: collection.title })}
            breadcrumbs={[{ label: collection.title, href: back }, { label: t('Listing page') }]}
            back={{ href: back, label: t('Back to :title', { title: collection.title }) }}
            saveUrl={adminUrl(`cms/collections/${collection.handle}/listing`)}
            editUrl={adminUrl(`cms/collections/${collection.handle}/listing/edit`)}
            viewUrl={collection.url}
            empty={t('The listing page has no fields of its own: choose a listing blueprint for the collection under Structure → Collections.')}
            seoDescription={t('How the listing page appears in search results and shared links.')}
            storageKey="cms:listing:seo" />
    );
}
