import * as React from 'react';
import { Head, useForm } from '@inertiajs/react';
import {
    Button, CollapsibleCard, Input, Label, MediaPickerInput, PageHeader, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SettingsLayout, Switch,
    useBreadcrumbs, useUnsavedChanges, type SettingsNavEntry,
} from '@sunrice/admin-sdk/ui';
import { adminUrl, t } from '@sunrice/admin-sdk';
import { FieldError } from '@/components/FieldInput.tsx';

type Role = 'title' | 'description' | 'image';

interface Row {
    kind: 'collection' | 'taxonomy';
    id: number;
    title: string;
    blueprint: string | null;
    options: Record<Role, { value: string; label: string }[]>;
    chosen: Record<Role, string | null>;
}

interface Props {
    site: { noindex: boolean; appendName: boolean; separator: string; twitter: string; image: number | null };
    siteName: string;
    /** Null: the user may not edit collections (or taxonomies). */
    collections: Row[] | null;
    taxonomies: Row[] | null;
    /** The Settings menu it's listed in (Panel::settingsNavigation()). */
    settingsNav: SettingsNavEntry[];
}

const roles = (): { role: Role; label: string; automatic: string }[] => [
    { role: 'title', label: t('Meta title'), automatic: t('Automatic (the title)') },
    { role: 'description', label: t('Meta description'), automatic: t('Automatic (nothing)') },
    { role: 'image', label: t('Share image'), automatic: t('Automatic (nothing)') },
];
const AUTO = '__auto';

/** Settings → SEO: search engines and sharing, and the fields each collection and taxonomy fills its SEO from. */
export default function SeoEdit({ site, siteName, collections, taxonomies, settingsNav }: Props) {
    useBreadcrumbs([{ label: t('Settings'), href: adminUrl('settings') }, { label: t('SEO') }]);
    const rows = [...(collections ?? []), ...(taxonomies ?? [])];
    const form = useForm({
        site: { ...site },
        mappings: rows.map((row) => ({ kind: row.kind, id: row.id, title: row.chosen.title ?? '', description: row.chosen.description ?? '', image: row.chosen.image ?? '' })),
    });
    const errors = form.errors as Record<string, string | undefined>;
    const save = () => form.put(adminUrl('cms/seo'), { preserveScroll: true, onSuccess: () => form.setDefaults() });
    useUnsavedChanges(form.isDirty, save);
    const setSite = <K extends keyof Props['site']>(key: K, value: Props['site'][K]) => form.setData('site', { ...form.data.site, [key]: value });
    const setField = (index: number, role: Role, value: string) =>
        form.setData('mappings', form.data.mappings.map((mapping, i) => (i === index ? { ...mapping, [role]: value } : mapping)));

    const group = (key: string, title: string, description: string, list: Row[], offset: number) => (
        <CollapsibleCard title={title} description={description} titleClassName="cms:text-base" storageKey={`cms:seo:${key}`} contentClassName="cms:flex cms:flex-col cms:divide-y cms:divide-border/60">
            {list.length === 0 && <p className="cms:text-sm cms:text-muted-foreground">{t('None yet.')}</p>}
            {list.map((row, i) => {
                const index = offset + i;
                return (
                    <div key={`${row.kind}-${row.id}`} className="cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0">
                        <div className="cms:flex cms:items-baseline cms:justify-between cms:gap-3">
                            <h3 className="cms:font-medium">{row.title}</h3>
                            <span className="cms:text-xs cms:text-muted-foreground">{row.blueprint ? t('Blueprint: :name', { name: row.blueprint }) : t('No blueprint')}</span>
                        </div>
                        <div className="cms:grid cms:gap-3 cms:sm:grid-cols-3">
                            {roles().map(({ role, label, automatic }) => (
                                <div key={role} className="cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5">
                                    <Label htmlFor={`seo-${index}-${role}`} className="cms:text-xs">{label}</Label>
                                    <Select value={form.data.mappings[index]?.[role] || AUTO} onValueChange={(value: string) => setField(index, role, value === AUTO ? '' : value)}>
                                        <SelectTrigger id={`seo-${index}-${role}`} className="cms:w-full"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={AUTO}>{automatic}</SelectItem>
                                            {row.options[role].map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FieldError message={errors[`mappings.${index}.${role}`]} />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </CollapsibleCard>
    );

    return (
        <SettingsLayout items={settingsNav} current="cms-seo">
            <form onSubmit={(e) => { e.preventDefault(); save(); }} className="cms:flex cms:flex-col cms:gap-6">
                <Head title={t('SEO')} />
                <PageHeader title={t('SEO')} description={t('What search engines and shared links see of the site.')}
                    actions={<Button type="submit" disabled={form.processing}>{t('Save')}</Button>} />

                <CollapsibleCard title={t('Search engines and sharing')} titleClassName="cms:text-base" storageKey="cms:seo:site" contentClassName="cms:flex cms:flex-col cms:gap-5">
                    <div className="cms:flex cms:items-start cms:gap-3">
                        <Switch id="seo-noindex" checked={form.data.site.noindex} onCheckedChange={(on: boolean) => setSite('noindex', on)} />
                        <div className="cms:flex cms:flex-col cms:gap-0.5">
                            <Label htmlFor="seo-noindex">{t('Hide the whole site from search engines')}</Label>
                            <p className="cms:text-xs cms:text-muted-foreground">{t('Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging.')}</p>
                        </div>
                    </div>
                    <div className="cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4">
                        <div className="cms:flex cms:items-start cms:gap-3">
                            <Switch id="seo-append" checked={form.data.site.appendName} onCheckedChange={(on: boolean) => setSite('appendName', on)} />
                            <div className="cms:flex cms:flex-col cms:gap-0.5">
                                <Label htmlFor="seo-append">{t('Add the site name to page titles')}</Label>
                                <p className="cms:text-xs cms:text-muted-foreground">
                                    {t('The browser tab and search results show ":example". Share previews keep the bare title.', { example: `${t('About')} ${form.data.site.separator || '|'} ${siteName}` })}
                                </p>
                            </div>
                        </div>
                        <div className="cms:flex cms:flex-col cms:gap-1.5">
                            <Label htmlFor="seo-separator" className="cms:text-xs">{t('Separator')}</Label>
                            <Input id="seo-separator" className="cms:w-20" maxLength={5} disabled={!form.data.site.appendName} value={form.data.site.separator}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSite('separator', e.target.value)} />
                        </div>
                    </div>
                    <div className="cms:flex cms:max-w-xs cms:flex-col cms:gap-1.5">
                        <Label htmlFor="seo-twitter">{t('X (Twitter) account')}</Label>
                        <Input id="seo-twitter" placeholder="@acme" maxLength={16} value={form.data.site.twitter}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSite('twitter', e.target.value)} />
                        <FieldError message={errors['site.twitter']} />
                    </div>
                    <div className="cms:flex cms:flex-col cms:gap-1.5">
                        <Label htmlFor="seo-image">{t('Default share image')}</Label>
                        <MediaPickerInput id="seo-image" invalid={errors['site.image'] !== undefined} disabled={false} multiple={false} max={null} types={['image']}
                            value={form.data.site.image} onChange={(value: number | number[] | null) => setSite('image', typeof value === 'number' ? value : null)} />
                        <p className="cms:text-xs cms:text-muted-foreground">{t('Shown when a page is shared and has no image of its own.')}</p>
                        <FieldError message={errors['site.image']} />
                    </div>
                </CollapsibleCard>

                {rows.length > 0 && (
                    <section className="cms:flex cms:flex-col cms:gap-1">
                        <h2 className="cms:text-base cms:font-medium">{t('Fields used for SEO')}</h2>
                        <p className="cms:text-sm cms:text-muted-foreground">
                            {t('When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page\'s own SEO fields always win; after the field come the site\'s (the description in Settings → Site, the share image above).')}
                        </p>
                    </section>
                )}
                {collections !== null && group('Collections', t('Collections'), t('Entries of each collection.'), collections, 0)}
                {taxonomies !== null && group('Taxonomies', t('Taxonomies'), t('Term pages of each taxonomy.'), taxonomies, collections?.length ?? 0)}
                <p className="cms:text-xs cms:text-muted-foreground">{t('Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field.')}</p>
            </form>
        </SettingsLayout>
    );
}
