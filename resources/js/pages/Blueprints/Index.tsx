import { usePage } from '@inertiajs/react';
import { adminUrl } from '@sunrice/admin-sdk';
import { FieldError } from '@/components/FieldInput.tsx';
import { type StructureRow, StructureList } from '@/components/StructureList.tsx';

export default function BlueprintsIndex({ blueprints }: { blueprints: StructureRow[] }) {
    const errors = usePage().props.errors as Record<string, string | undefined>;

    return (
        <>
            <FieldError message={errors.blueprint} />
            <StructureList noun="Blueprint" base={adminUrl('cms/blueprints')} rows={blueprints}
                intro="The fields editors fill in, for each kind of content." />
        </>
    );
}
