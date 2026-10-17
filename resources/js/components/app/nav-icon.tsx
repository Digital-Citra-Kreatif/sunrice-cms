import {
    Blocks, BookOpen, Bot, Briefcase, Calendar, ChartColumn, Circle, ClipboardList, CreditCard, Database, ExternalLink, FileText,
    Folder, Globe, History, Home, Image, Inbox, LayoutGrid, LayoutTemplate, Library, LifeBuoy, Link, ListTree, Mail, MapPin, Megaphone, MessageSquare, Newspaper,
    Package, Settings, ShoppingBag, ShoppingCart, Shield, Star, Tags, Users, Wrench,
    type LucideIcon,
} from 'lucide-react';

/**
 * Icons available to the sidebar. Navigation items name an icon in
 * kebab-case (collections may set `settings.icon`); unknown names fall back
 * to a neutral dot so the bundle only ships the icons listed here.
 */
const icons: Record<string, LucideIcon> = {
    blocks: Blocks,
    'book-open': BookOpen,
    bot: Bot,
    briefcase: Briefcase,
    calendar: Calendar,
    'chart-column': ChartColumn,
    'clipboard-list': ClipboardList,
    'credit-card': CreditCard,
    database: Database,
    'external-link': ExternalLink,
    'file-text': FileText,
    folder: Folder,
    globe: Globe,
    history: History,
    home: Home,
    image: Image,
    inbox: Inbox,
    'layout-grid': LayoutGrid,
    'layout-template': LayoutTemplate,
    library: Library,
    'life-buoy': LifeBuoy,
    link: Link,
    'list-tree': ListTree,
    mail: Mail,
    'map-pin': MapPin,
    megaphone: Megaphone,
    'message-square': MessageSquare,
    newspaper: Newspaper,
    package: Package,
    settings: Settings,
    'shopping-bag': ShoppingBag,
    'shopping-cart': ShoppingCart,
    shield: Shield,
    star: Star,
    tags: Tags,
    users: Users,
    wrench: Wrench,
};

/** Icon names a collection can pick in its settings. */
export const navIconNames = Object.keys(icons);

export function navIcon(name?: string): LucideIcon {
    return (name && icons[name]) || Circle;
}
