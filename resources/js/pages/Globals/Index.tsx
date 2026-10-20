import { Head, Link } from '@inertiajs/react';
import { adminUrl } from '@sunrice/admin-sdk';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, PageHeader, useBreadcrumbs } from '@sunrice/admin-sdk/ui';

export default function GlobalsIndex({ sets }: { sets: { handle: string; title: string; blueprint: string | null }[] }) {
    useBreadcrumbs([{ label: 'Globals' }]);

    return (
        <div className="cms:flex cms:flex-col cms:gap-6">
            <Head title="Globals" />
            <PageHeader title="Globals" description="Values the whole site uses, like contact details and footer text." />
            {sets.length === 0 && <p className="cms:text-muted-foreground">There are no global sets yet. Create one under Structure → Global sets.</p>}
            <div className="cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3">
                {sets.map((set) => (
                    <Link key={set.handle} href={adminUrl(`cms/globals/${set.handle}`)} className="cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none">
                        <Card className="cms:h-full cms:transition-colors cms:hover:bg-accent">
                            <CardHeader>
                                <CardTitle className="cms:text-base">{set.title}</CardTitle>
                                <CardDescription>{set.blueprint ? <code className="cms:text-xs">{set.handle}</code> : 'No blueprint yet: choose one under Structure → Global sets.'}</CardDescription>
                            </CardHeader>
                            <CardContent />
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
