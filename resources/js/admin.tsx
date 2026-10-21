import '../css/admin.css';
import { adminUrl, definePlugin, t } from '@sunrice/admin-sdk';
import { registerCommandSource } from '@sunrice/admin-sdk/ui';
import { searchEntries } from '@/lib/command-source.ts';
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
import TermCreate from '@/pages/Terms/Create.tsx';
import TermsIndex from '@/pages/Terms/Index.tsx';

definePlugin({
    pages: {
        'Cms/Blueprints/Index': BlueprintsIndex,
        'Cms/Blueprints/Edit': BlueprintEdit,
        'Cms/Fieldsets/Index': FieldsetsIndex,
        // A fieldset is edited like a blueprint.
        'Cms/Fieldsets/Edit': BlueprintEdit,
        'Cms/Entries/Index': EntriesIndex,
        'Cms/Entries/Edit': EntryEdit,
        'Cms/Listing/Edit': ListingEdit,
        'Cms/Terms/Index': TermsIndex,
        'Cms/Terms/Create': TermCreate,
        'Cms/Terms/Edit': TermEdit,
        'Cms/Globals/Edit': GlobalsEdit,
        'Cms/Menus/Edit': MenuEdit,
        'Cms/Comments/Index': CommentsIndex,
        'Cms/Seo/Edit': SeoEdit,
        'Cms/Submissions/Index': SubmissionsIndex,
    },
});

// Cmd/Ctrl+K also searches entries by title, once this bundle has loaded (any CMS page).
registerCommandSource((query, signal) => searchEntries(query, signal, adminUrl, (text) => t(text)));
