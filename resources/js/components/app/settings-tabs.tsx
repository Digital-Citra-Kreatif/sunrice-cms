import { Link, usePage } from '@inertiajs/react';
import { adminUrl } from '@/lib/route';
import { cn } from '@/lib/utils';
import type { SharedProps } from '@/types';

/**
 * General | SEO | (package tabs) switcher at the top of the settings
 * pages. Packages render it on their own settings pages too
 * (window.Sunrice.components.SettingsTabs) with their tab's key as
 * `current`.
 */
export function SettingsTabs({ current }: { current: string }) {
    const { adminPath, settingsTabs } = usePage<SharedProps>().props;
    const tabs = settingsTabs ?? [
        { key: 'general', label: 'General', href: 'settings' },
        { key: 'seo', label: 'SEO', href: 'settings/seo' },
    ];

    if (tabs.length < 2) {
        return null;
    }

    return (
        <nav className="inline-flex w-fit flex-wrap rounded-lg bg-muted p-1 text-sm" aria-label="Settings sections">
            {tabs.map((tab) => (
                <Link
                    key={tab.key}
                    href={adminUrl(tab.href, adminPath)}
                    aria-current={current === tab.key ? 'page' : undefined}
                    className={cn('rounded-md px-3 py-1 font-medium text-muted-foreground', current === tab.key && 'bg-background text-foreground shadow-sm')}
                >
                    {tab.label}
                </Link>
            ))}
        </nav>
    );
}
