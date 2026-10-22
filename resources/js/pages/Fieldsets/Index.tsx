import { usePage } from '@inertiajs/react';
import { adminUrl, t } from '@imajiner/admin-sdk';
import { FieldError } from '@/components/FieldInput.tsx';
import { type StructureRow, StructureList } from '@/components/StructureList.tsx';

export default function FieldsetsIndex({ fieldsets }: { fieldsets: StructureRow[] }) {
    const errors = usePage().props.errors as Record<string, string | undefined>;

    return (
        <>
            <FieldError message={errors.fieldset} />
            <StructureList kind="fieldset" base={adminUrl('cms/fieldsets')} rows={fieldsets}
                intro={t('Fields shared between blueprints, and the kinds of block of flexible fields.')} />
        </>
    );
}
