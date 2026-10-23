import '../css/admin.css';
import * as React from 'react';
import { usePage } from '@inertiajs/react';
import { definePlugin } from '@imajiner/admin-sdk';
import { setLocaleNames } from '@/lib/entries.ts';

/** A page that first takes the content languages' names the panel shares (`cms.locales`), so localeName() says them as the site does. */
function withLocaleNames<P extends object>(Page: React.ComponentType<P>): React.ComponentType<P> {
    return function CmsPage(props: P) {
        const shared = usePage().props.cms as { locales?: Record<string, string> } | undefined;
        setLocaleNames(shared?.locales);
        return <Page {...props} />;
    };
}

type Loader = () => Promise<{ default: React.ComponentType<never> }>;

// Each page is its own chunk, loaded the first time it opens (with what it alone uses).
const blueprintEdit: Loader = () => import('@/pages/Blueprints/Edit.tsx');

const pages: Record<string, Loader> = {
    'Cms/Blueprints/Index': () => import('@/pages/Blueprints/Index.tsx'),
    'Cms/Blueprints/Edit': blueprintEdit,
    'Cms/Fieldsets/Index': () => import('@/pages/Fieldsets/Index.tsx'),
    // A fieldset is edited like a blueprint.
    'Cms/Fieldsets/Edit': blueprintEdit,
    'Cms/Entries/Index': () => import('@/pages/Entries/Index.tsx'),
    'Cms/Entries/Edit': () => import('@/pages/Entries/Edit.tsx'),
    'Cms/Listing/Edit': () => import('@/pages/Listing/Edit.tsx'),
    'Cms/Terms/Index': () => import('@/pages/Terms/Index.tsx'),
    'Cms/TaxonomyIndex/Edit': () => import('@/pages/TaxonomyIndex/Edit.tsx'),
    'Cms/Translations/Edit': () => import('@/pages/Translations/Edit.tsx'),
    'Cms/Terms/Edit': () => import('@/pages/Terms/Edit.tsx'),
    'Cms/Globals/Edit': () => import('@/pages/Globals/Edit.tsx'),
    'Cms/Menus/Edit': () => import('@/pages/Menus/Edit.tsx'),
    'Cms/Comments/Index': () => import('@/pages/Comments/Index.tsx'),
    'Cms/Seo/Edit': () => import('@/pages/Seo/Edit.tsx'),
    'Cms/Submissions/Index': () => import('@/pages/Submissions/Index.tsx'),
};

definePlugin({
    lazyPages: Object.fromEntries(Object.entries(pages).map(([name, load]) => [
        name,
        async () => withLocaleNames((await load()).default as React.ComponentType<object>),
    ])),
});
