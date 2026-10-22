import '../css/admin.css';
import * as React from 'react';
import { usePage } from '@inertiajs/react';
import { definePlugin } from '@imajiner/admin-sdk';
import { setLocaleNames } from '@/lib/entries.ts';
import BlueprintEdit from '@/pages/Blueprints/Edit.tsx';
import BlueprintsIndex from '@/pages/Blueprints/Index.tsx';
import EntryEdit from '@/pages/Entries/Edit.tsx';
import EntriesIndex from '@/pages/Entries/Index.tsx';
import ListingEdit from '@/pages/Listing/Edit.tsx';
import FieldsetsIndex from '@/pages/Fieldsets/Index.tsx';
import GlobalsEdit from '@/pages/Globals/Edit.tsx';
import MenuEdit from '@/pages/Menus/Edit.tsx';
import CommentsIndex from '@/pages/Comments/Index.tsx';
import SeoEdit from '@/pages/Seo/Edit.tsx';
import SubmissionsIndex from '@/pages/Submissions/Index.tsx';
import TermEdit from '@/pages/Terms/Edit.tsx';
import TermsIndex from '@/pages/Terms/Index.tsx';
import TaxonomyIndexEdit from '@/pages/TaxonomyIndex/Edit.tsx';
import TranslationsEdit from '@/pages/Translations/Edit.tsx';

/** A page that first takes the content languages' names the panel shares (`cms.locales`), so localeName() says them as the site does. */
function withLocaleNames<P extends object>(Page: React.ComponentType<P>): React.ComponentType<P> {
    return function CmsPage(props: P) {
        const shared = usePage().props.cms as { locales?: Record<string, string> } | undefined;
        setLocaleNames(shared?.locales);
        return <Page {...props} />;
    };
}

const pages: Record<string, React.ComponentType<never>> = {
    'Cms/Blueprints/Index': BlueprintsIndex,
    'Cms/Blueprints/Edit': BlueprintEdit,
    'Cms/Fieldsets/Index': FieldsetsIndex,
    // A fieldset is edited like a blueprint.
    'Cms/Fieldsets/Edit': BlueprintEdit,
    'Cms/Entries/Index': EntriesIndex,
    'Cms/Entries/Edit': EntryEdit,
    'Cms/Listing/Edit': ListingEdit,
    'Cms/Terms/Index': TermsIndex,
    'Cms/TaxonomyIndex/Edit': TaxonomyIndexEdit,
    'Cms/Translations/Edit': TranslationsEdit,
    'Cms/Terms/Edit': TermEdit,
    'Cms/Globals/Edit': GlobalsEdit,
    'Cms/Menus/Edit': MenuEdit,
    'Cms/Comments/Index': CommentsIndex,
    'Cms/Seo/Edit': SeoEdit,
    'Cms/Submissions/Index': SubmissionsIndex,
};

definePlugin({
    pages: Object.fromEntries(Object.entries(pages).map(([name, Page]) => [name, withLocaleNames(Page as React.ComponentType<object>)])),
});
