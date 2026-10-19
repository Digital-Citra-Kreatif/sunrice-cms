import '../css/admin.css';
import { definePlugin } from '@sunrice/admin-sdk';
import BlueprintForm from '@/pages/Blueprints/Form.tsx';
import BlueprintsIndex from '@/pages/Blueprints/Index.tsx';
import EntryEditor from '@/pages/Entries/Editor.tsx';
import EntriesIndex from '@/pages/Entries/Index.tsx';
import FieldsetsIndex from '@/pages/Fieldsets/Index.tsx';
import GlobalsEdit from '@/pages/Globals/Edit.tsx';
import GlobalsIndex from '@/pages/Globals/Index.tsx';
import TermsIndex from '@/pages/Terms/Index.tsx';

definePlugin({
    pages: {
        'Cms/Blueprints/Index': BlueprintsIndex,
        'Cms/Blueprints/Form': BlueprintForm,
        'Cms/Fieldsets/Index': FieldsetsIndex,
        'Cms/Entries/Index': EntriesIndex,
        'Cms/Entries/Editor': EntryEditor,
        'Cms/Terms/Index': TermsIndex,
        'Cms/Globals/Index': GlobalsIndex,
        'Cms/Globals/Edit': GlobalsEdit,
    },
});
