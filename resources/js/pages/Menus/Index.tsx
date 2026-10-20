import { Head, Link } from '@inertiajs/react';
import { adminUrl } from '@sunrice/admin-sdk';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, PageHeader, useBreadcrumbs } from '@sunrice/admin-sdk/ui';

export default function MenusIndex({ menus }: { menus: { handle: string; title: string }[] }) {
    useBreadcrumbs([{ label: 'Menus' }]);

    return (
        <div className="cms:flex cms:flex-col cms:gap-6">
            <Head title="Menus" />
            <PageHeader title="Menus" description="Navigation for the site: the main menu, the footer…" />
            {menus.length === 0 && <p className="cms:text-muted-foreground">There are no menus yet. Create one under Structure → Menu settings.</p>}
            <div className="cms:grid cms:gap-4 cms:sm:grid-cols-2 cms:lg:grid-cols-3">
                {menus.map((menu) => (
                    <Link key={menu.handle} href={adminUrl(`cms/menus/${menu.handle}`)} className="cms:rounded-xl cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none">
                        <Card className="cms:h-full cms:transition-colors cms:hover:bg-accent">
                            <CardHeader>
                                <CardTitle className="cms:text-base">{menu.title}</CardTitle>
                                <CardDescription><code className="cms:text-xs">{menu.handle}</code></CardDescription>
                            </CardHeader>
                            <CardContent />
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
