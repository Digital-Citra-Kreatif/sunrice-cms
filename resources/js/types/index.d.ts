export interface User {
    id: number;
    name: string | null;
    email: string | null;
}

export interface NavItem {
    label: string;
    href: string;
    /** lucide icon name in kebab-case, e.g. `file-text`. */
    icon?: string;
    /** A link outside the admin (an app route or another site): a plain link. */
    external?: boolean;
}

export interface NavGroup {
    label: string;
    items: NavItem[];
}

export interface LocaleInfo {
    main: string;
    available: string[];
    names: Record<string, string>;
}

export interface Branding {
    name: string;
    tagline: string;
    logo: string | null;
    font: string;
    color: string | null;
    /** Still named Sunrice (shows "Powered by"). */
    is_default: boolean;
}

export interface SettingsTab {
    key: string;
    label: string;
    /** A path inside the admin, e.g. "settings/seo". */
    href: string;
}

export interface SharedProps {
    auth: { user: User | null };
    branding?: Branding;
    permissions: string[] | ['*'];
    navigation: NavGroup[];
    /** Settings page tabs this user may open (built-in and registered by packages). */
    settingsTabs?: SettingsTab[];
    locales: LocaleInfo;
    flash: { success?: string | null; error?: string | null; id?: string | null };
    adminPath: string;
    errors: Record<string, string>;
    [key: string]: unknown;
}

export interface ColumnDef {
    key: string;
    label: string;
    sortable: boolean;
    type: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
    from: number | null;
    to: number | null;
}

export interface AdminField {
    handle: string;
    type: string;
    label: string;
    instructions?: string;
    required?: boolean;
    display_type?: string;
    /** Resolved: whether the value differs per language. */
    translatable?: boolean;
    config?: Record<string, unknown>;
    fields?: AdminField[];
    fieldsets?: { handle: string; title: string; fields: AdminField[] }[];
}

export interface AdminTab {
    handle: string;
    label: string;
    fields: AdminField[];
}

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
export type JsonRecord = { [key: string]: Json };
