import * as React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DataTable, type FilterDef } from '@/components/data-table/DataTable';
import { adminUrl } from '@/lib/route';
import { useCan } from '@/lib/can';
import type { ColumnDef, Paginated, SharedProps } from '@/types';
import { DeleteUserDialog, type DeletableUser } from '@/components/app/delete-user-dialog';

interface UserRow { id: number; name: string; email: string; roles: string[]; content?: { entries: number; assets: number }; can?: { update: boolean; delete: boolean } }

interface Props {
    columns: ColumnDef[];
    rows: Paginated<UserRow>;
    meta: { search: string | null; filters: Record<string, string>; sort: string | null };
    filters: FilterDef[];
    /** Who can receive a deleted user's content. */
    others: DeletableUser[];
}

export default function UsersIndex({ columns, rows, meta, filters, others }: Props) {
    const { adminPath } = usePage<SharedProps>().props;
    const can = useCan();
    const [deleting, setDeleting] = React.useState<UserRow | null>(null);
    const withActions: ColumnDef[] = [...columns, { key: 'actions', label: '', sortable: false, type: 'actions' }];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="sunrice-page-title">Users</h1>
                {can('sunrice.users.create') && (
                    <Button asChild><Link href={adminUrl('users/create', adminPath)}><Plus className="mr-1 h-4 w-4" /> New user</Link></Button>
                )}
            </div>
            <DataTable
                columns={withActions}
                rows={rows}
                meta={meta}
                tableKey="users"
                filters={filters}
                searchPlaceholder="Search by name or email…"
                rowHref={(u) => ((u.can?.update ?? can('sunrice.users.edit')) ? adminUrl(`users/${u.id}/edit`, adminPath) : null)}
                renderCell={(u, column) => {
                    if (column.key === 'name') return <span className="font-medium">{u.name}</span>;
                    if (column.key === 'roles') {
                        return u.roles.length === 0
                            ? <span className="text-muted-foreground">—</span>
                            : <div className="flex flex-wrap gap-1">{u.roles.map((r) => <Badge key={r} variant="secondary">{r}</Badge>)}</div>;
                    }
                    if (column.key === 'actions') {
                        return (u.can?.delete ?? can('sunrice.users.delete')) ? (
                            <Button
                                variant="ghost" size="icon" className="text-destructive" aria-label={`Delete ${u.email}`}
                                onClick={(e) => { e.stopPropagation(); setDeleting(u); }}
                            ><Trash2 className="h-4 w-4" /></Button>
                        ) : null;
                    }
                    return undefined;
                }}
            />

            <DeleteUserDialog
                user={deleting}
                others={others.filter((u) => u.id !== deleting?.id)}
                onClose={() => setDeleting(null)}
                url={deleting ? adminUrl(`users/${deleting.id}`, adminPath) : ''}
            />
        </div>
    );
}
