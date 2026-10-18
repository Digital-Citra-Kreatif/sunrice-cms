import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { useBreadcrumbs } from '@/components/app/breadcrumbs';
import { CollapsibleCard } from '@/components/app/collapsible-card';
import { InputError } from '@/components/app/input-error';
import { SettingsTabs } from '@/components/app/settings-tabs';
import { DataTable } from '@/components/data-table/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import FieldRenderer from '@/fields/FieldRenderer';
import { registerField } from '@/fields/registry';
import { registerDashboardCard } from '@/lib/dashboard-cards';
import { fetchJson } from '@/lib/fetch-json';
import { registerPage } from '@/lib/page-registry';
import { adminUrl as joinAdminUrl } from '@/lib/route';
import type { SharedProps } from '@/types';

// The site's admin path, from the first page's data and every visit after it.
let currentAdminPath: string | undefined;
function readInitialAdminPath(): string | undefined {
    try {
        // Inertia 2 puts the first page in <script data-page="app">; older versions in #app[data-page].
        const data = document.querySelector('script[data-page="app"]')?.textContent || document.getElementById('app')?.dataset.page;

        return data ? (JSON.parse(data) as { props?: Partial<SharedProps> }).props?.adminPath : undefined;
    } catch {
        return undefined;
    }
}

/** "commerce/orders" → "/cms/commerce/orders", with the site's admin path. */
function adminUrl(path = ''): string {
    currentAdminPath ??= readInitialAdminPath();

    return joinAdminUrl(path, currentAdminPath);
}

/**
 * window.Sunrice: the admin's extension API for site-provided scripts
 * (config `sunrice.admin.scripts`, or Sunrice::registerAdminScript()).
 *
 * Scripts use this React instance (a second copy of React would break
 * hooks) and register field components:
 *
 *     Sunrice.registerField('rating', ({ field, value, onChange, error }) => …);
 *
 * pages for a package's admin routes (Sunrice::adminRoutes()):
 *
 *     Sunrice.registerPage('Commerce/Orders/Show', ({ order }) => …);
 *
 * and dashboard cards (Sunrice::addDashboardCard()):
 *
 *     Sunrice.registerDashboardCard('commerce-sales', ({ total }) => …);
 *
 * Keep this surface small and stable: it is a public API.
 */
const api = {
    version: 2,
    React,
    ReactDOM,
    /** Admin control for a field type: receives { field, value, onChange, errors, pathPrefix }. */
    registerField,
    /**
     * A page for Inertia::render('Name') from a package's admin route. It
     * gets the admin layout (sidebar, header); set Component.layout = null
     * for a bare page.
     */
    registerPage,
    /**
     * A dashboard card for Sunrice::addDashboardCard('name', …): receives
     * the props its callback returned. Cards without a component show nothing.
     */
    registerDashboardCard,
    /** Inertia, from the admin's own copy (a second copy wouldn't see its pages). */
    inertia: { router, Link, Head, usePage, useForm },
    /** Admin address of a path: Sunrice.adminUrl('commerce/orders') → '/cms/commerce/orders'. */
    adminUrl,
    /**
     * The header's breadcrumb trail for a page the sidebar doesn't list:
     * Sunrice.useBreadcrumbs([{ label: 'Orders', href: Sunrice.adminUrl('commerce/orders') }, { label: '#1042' }]).
     */
    useBreadcrumbs,
    /** The admin's own UI primitives, so custom fields and pages match its look. */
    ui: {
        Badge, Button, Checkbox, Input, Label, Switch, Textarea,
        Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
        Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
        Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
        Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
        Tabs, TabsContent, TabsList, TabsTrigger,
    },
    /**
     * Larger admin building blocks: the list table (search, filters, sort,
     * pages, bulk actions), the editor's field list (every field type), a
     * collapsible card, a field error and the Settings page's tab bar (on a
     * package's settings tab: <SettingsTabs current="store" />).
     */
    components: { DataTable, FieldRenderer, CollapsibleCard, InputError, SettingsTabs },
    /** fetch() returning JSON, with the admin's CSRF token and error handling. */
    fetchJson,
    /** Toast notifications: Sunrice.toast.success('Saved'), .error(…). */
    toast,
};

export type SunriceApi = typeof api;

declare global {
    interface Window {
        Sunrice: SunriceApi;
    }
}

export function installPluginApi(): void {
    window.Sunrice = api;
    router.on('navigate', (event) => {
        currentAdminPath = (event.detail.page.props as Partial<SharedProps>).adminPath ?? currentAdminPath;
    });
}
