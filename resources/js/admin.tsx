import '../css/admin.css';
import { definePlugin } from '@sunrice/admin-sdk';
import BlueprintForm from '@/pages/Blueprints/Form.tsx';
import BlueprintsIndex from '@/pages/Blueprints/Index.tsx';
import FieldsetsIndex from '@/pages/Fieldsets/Index.tsx';

definePlugin({
    pages: {
        'Cms/Blueprints/Index': BlueprintsIndex,
        'Cms/Blueprints/Form': BlueprintForm,
        'Cms/Fieldsets/Index': FieldsetsIndex,
    },
});
