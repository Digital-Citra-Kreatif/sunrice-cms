import '../css/admin.css';
import * as React from 'react';
import { usePage } from '@inertiajs/react';
import { definePlugin } from '@sunrice/admin-sdk';
import { setLocaleNames } from '@/lib/entries.ts';
import BlueprintForm from '@/pages/Blueprints/Form.tsx';
import BlueprintsIndex from '@/pages/Blueprints/Index.tsx';
import EntryEditor from '@/pages/Entries/Editor.tsx';
import EntriesIndex from '@/pages/Entries/Index.tsx';
import ListingPage from '@/pages/Entries/Listing.tsx';
import FieldsetsIndex from '@/pages/Fieldsets/Index.tsx';
import GlobalsEdit from '@/pages/Globals/Edit.tsx';
import GlobalsIndex from '@/pages/Globals/Index.tsx';
import MenuEdit from '@/pages/Menus/Edit.tsx';
import MenusIndex from '@/pages/Menus/Index.tsx';
import CommentsIndex from '@/pages/Comments/Index.tsx';
import SubmissionsIndex from '@/pages/Submissions/Index.tsx';
import TermEdit from '@/pages/Terms/Edit.tsx';
import TermsIndex from '@/pages/Terms/Index.tsx';

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
    'Cms/Blueprints/Form': BlueprintForm,
    'Cms/Fieldsets/Index': FieldsetsIndex,
    'Cms/Entries/Index': EntriesIndex,
    'Cms/Entries/Editor': EntryEditor,
    'Cms/Entries/Listing': ListingPage,
    'Cms/Terms/Index': TermsIndex,
    'Cms/Terms/Edit': TermEdit,
    'Cms/Globals/Index': GlobalsIndex,
    'Cms/Globals/Edit': GlobalsEdit,
    'Cms/Menus/Index': MenusIndex,
    'Cms/Menus/Edit': MenuEdit,
    'Cms/Comments/Index': CommentsIndex,
    'Cms/Submissions/Index': SubmissionsIndex,
};

definePlugin({
    pages: Object.fromEntries(Object.entries(pages).map(([name, Page]) => [name, withLocaleNames(Page as React.ComponentType<object>)])),
});
