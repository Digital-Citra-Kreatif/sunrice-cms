import '../css/admin.css';
import { adminUrl, definePlugin } from '@sunrice/admin-sdk';
import { registerCommandSource } from '@sunrice/admin-sdk/ui';
import { searchEntries } from '@/lib/command-source.ts';
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
import SeoEdit from '@/pages/Seo/Edit.tsx';
import SubmissionsIndex from '@/pages/Submissions/Index.tsx';
import TermEdit from '@/pages/Terms/Edit.tsx';
import TermCreate from '@/pages/Terms/Create.tsx';
import TermsIndex from '@/pages/Terms/Index.tsx';

definePlugin({
    pages: {
        'Cms/Blueprints/Index': BlueprintsIndex,
        'Cms/Blueprints/Form': BlueprintForm,
        'Cms/Fieldsets/Index': FieldsetsIndex,
        'Cms/Entries/Index': EntriesIndex,
        'Cms/Entries/Editor': EntryEditor,
        'Cms/Entries/Listing': ListingPage,
        'Cms/Terms/Index': TermsIndex,
        'Cms/Terms/Create': TermCreate,
        'Cms/Terms/Edit': TermEdit,
        'Cms/Globals/Index': GlobalsIndex,
        'Cms/Globals/Edit': GlobalsEdit,
        'Cms/Menus/Index': MenusIndex,
        'Cms/Menus/Edit': MenuEdit,
        'Cms/Comments/Index': CommentsIndex,
        'Cms/Seo/Edit': SeoEdit,
        'Cms/Submissions/Index': SubmissionsIndex,
    },
});

// Cmd/Ctrl+K also searches entries by title, once this bundle has loaded (any CMS page).
registerCommandSource((query, signal) => searchEntries(query, signal, adminUrl));
