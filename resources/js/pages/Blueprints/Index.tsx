import { usePage } from '@inertiajs/react';
import { adminUrl, t } from '@imajiner/admin-sdk';
import { FieldError } from '@/components/FieldError.tsx';
import { type StructureRow, StructureList } from '@/components/StructureList.tsx';

export default function BlueprintsIndex({ blueprints }: { blueprints: StructureRow[] }) {
    const errors = usePage().props.errors as Record<string, string | undefined>;

    return (
        <>
            <FieldError message={errors.blueprint} />
            <StructureList kind="blueprint" base={adminUrl('cms/blueprints')} rows={blueprints}
                intro={t('The fields editors fill in, for each kind of content.')} />
        </>
    );
}
