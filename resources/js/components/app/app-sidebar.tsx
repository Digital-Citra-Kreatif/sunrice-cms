import * as React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronRight, LayoutGrid } from 'lucide-react';
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu,
    SidebarMenuButton, SidebarMenuItem, SidebarRail, useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import AppLogo from '@/components/app/app-logo';
import { NavUser } from '@/components/app/nav-user';
import { navIcon } from '@/components/app/nav-icon';
import { useNavMatch } from '@/components/app/use-nav-match';
import { adminUrl } from '@/lib/route';
import type { NavGroup, SharedProps } from '@/types';

const GROUPS_KEY = 'sunrice:nav:collapsed';

const readCollapsed = (): string[] => {
    try {
        const value = JSON.parse(window.localStorage.getItem(GROUPS_KEY) ?? '[]');
        return Array.isArray(value) ? value.filter((label): label is string => typeof label === 'string') : [];
    } catch {
        return [];
    }
};

export function AppSidebar() {
    const { navigation, adminPath } = usePage<SharedProps>().props;
    const match = useNavMatch();
    const dashboardUrl = adminUrl('', adminPath);
    const onDashboard = usePage().url.split('?')[0] === dashboardUrl;
    const { isMobile, setOpenMobile, state } = useSidebar();
    // Groups the user folded away, remembered per browser by label.
    const [collapsed, setCollapsed] = React.useState<string[]>(readCollapsed);
    // In icon-only mode the labels are hidden, so every group stays open.
    const iconOnly = state === 'collapsed' && !isMobile;

    const toggleGroup = (label: string, open: boolean) => {
        setCollapsed((current) => {
            const next = open ? current.filter((l) => l !== label) : [...current.filter((l) => l !== label), label];
            try {
                window.localStorage.setItem(GROUPS_KEY, JSON.stringify(next));
            } catch {
                // Storage blocked: groups still fold, they just won't be remembered.
            }
            return next;
        });
    };

    // Navigating into a folded group unfolds it, so the current page is visible.
    const activeGroup = match?.group.label;
    React.useEffect(() => {
        if (activeGroup && readCollapsed().includes(activeGroup)) toggleGroup(activeGroup, true);
    }, [activeGroup]);

    // On phones the sidebar is a flyout: close it as soon as a link in it
    // (or anywhere) starts a visit, instead of leaving it over the new page.
    React.useEffect(() => {
        if (!isMobile) return;
        return router.on('start', () => setOpenMobile(false));
    }, [isMobile, setOpenMobile]);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="pt-4 pb-5">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="gap-5">
                <SidebarGroup className="px-2 py-0">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild isActive={onDashboard} tooltip="Dashboard">
                                <Link href={dashboardUrl} prefetch>
                                    <LayoutGrid />
                                    <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                {(navigation ?? []).map((group: NavGroup) => (
                    <Collapsible
                        key={group.label}
                        open={iconOnly || !collapsed.includes(group.label)}
                        onOpenChange={(open) => toggleGroup(group.label, open)}
                        className="group/collapsible"
                    >
                        <SidebarGroup className="px-2 py-0">
                            <SidebarGroupLabel asChild className="mb-1 w-full cursor-pointer text-[10px] font-semibold tracking-[0.14em] uppercase hover:text-sidebar-foreground">
                                <CollapsibleTrigger>
                                    {group.label}
                                    <ChevronRight className="ml-auto !size-3.5 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarMenu>
                                    {group.items.map((item) => {
                                        const Icon = navIcon(item.icon);
                                        return (
                                            <SidebarMenuItem key={`${group.label}:${item.href}`}>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={match?.item === item}
                                                    tooltip={item.label}
                                                >
                                                    {item.external ? (
                                                        <a href={item.href}>
                                                            <Icon />
                                                            <span>{item.label}</span>
                                                        </a>
                                                    ) : (
                                                        <Link href={adminUrl(item.href, adminPath)} prefetch>
                                                            <Icon />
                                                            <span>{item.label}</span>
                                                        </Link>
                                                    )}
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    })}
                                </SidebarMenu>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border/60 py-3">
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
