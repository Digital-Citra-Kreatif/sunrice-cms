import { usePage } from '@inertiajs/react';
import { adminUrl } from '@sunrice/admin-sdk';
import { FieldError } from '@/components/FieldInput.tsx';
import { type StructureRow, StructureList } from '@/components/StructureList.tsx';

export default function FieldsetsIndex({ fieldsets }: { fieldsets: StructureRow[] }) {
    const errors = usePage().props.errors as Record<string, string | undefined>;

    return (
        <>
            <FieldError message={errors.fieldset} />
            <StructureList noun="Fieldset" base={adminUrl('cms/fieldsets')} rows={fieldsets}
                intro="Fields shared between blueprints, and the kinds of block of flexible fields." />
        </>
    );
}
