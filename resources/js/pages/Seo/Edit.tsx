import * as React from 'react';
import { Head, useForm } from '@inertiajs/react';
import {
    Button, CollapsibleCard, Input, Label, MediaPickerInput, PageHeader, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch,
    useBreadcrumbs, useUnsavedChanges,
} from '@sunrice/admin-sdk/ui';
import { adminUrl } from '@sunrice/admin-sdk';
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
}

const ROLES: { role: Role; label: string; automatic: string }[] = [
    { role: 'title', label: 'Meta title', automatic: 'the title' },
    { role: 'description', label: 'Meta description', automatic: 'nothing' },
    { role: 'image', label: 'Share image', automatic: 'nothing' },
];
const AUTO = '__auto';

/** Settings → SEO: search engines and sharing, and the fields each collection and taxonomy fills its SEO from. */
export default function SeoEdit({ site, siteName, collections, taxonomies }: Props) {
    useBreadcrumbs([{ label: 'Settings', href: adminUrl('settings') }, { label: 'SEO' }]);
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

    const group = (title: string, description: string, list: Row[], offset: number) => (
        <CollapsibleCard title={title} description={description} titleClassName="cms:text-base" storageKey={`cms:seo:${title}`} contentClassName="cms:flex cms:flex-col cms:divide-y cms:divide-border/60">
            {list.length === 0 && <p className="cms:text-sm cms:text-muted-foreground">None yet.</p>}
            {list.map((row, i) => {
                const index = offset + i;
                return (
                    <div key={`${row.kind}-${row.id}`} className="cms:flex cms:flex-col cms:gap-3 cms:py-4 cms:first:pt-0 cms:last:pb-0">
                        <div className="cms:flex cms:items-baseline cms:justify-between cms:gap-3">
                            <h3 className="cms:font-medium">{row.title}</h3>
                            <span className="cms:text-xs cms:text-muted-foreground">{row.blueprint ? `Blueprint: ${row.blueprint}` : 'No blueprint'}</span>
                        </div>
                        <div className="cms:grid cms:gap-3 cms:sm:grid-cols-3">
                            {ROLES.map(({ role, label, automatic }) => (
                                <div key={role} className="cms:flex cms:min-w-0 cms:flex-col cms:gap-1.5">
                                    <Label htmlFor={`seo-${index}-${role}`} className="cms:text-xs">{label}</Label>
                                    <Select value={form.data.mappings[index]?.[role] || AUTO} onValueChange={(value: string) => setField(index, role, value === AUTO ? '' : value)}>
                                        <SelectTrigger id={`seo-${index}-${role}`} className="cms:w-full"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={AUTO}>Automatic ({automatic})</SelectItem>
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
        <form onSubmit={(e) => { e.preventDefault(); save(); }} className="cms:flex cms:max-w-5xl cms:flex-col cms:gap-6">
            <Head title="SEO" />
            <PageHeader title="SEO" description="What search engines and shared links see of the site."
                actions={<Button type="submit" disabled={form.processing}>Save SEO settings</Button>} />

            <CollapsibleCard title="Search engines and sharing" titleClassName="cms:text-base" storageKey="cms:seo:site" contentClassName="cms:flex cms:flex-col cms:gap-5">
                <div className="cms:flex cms:items-start cms:gap-3">
                    <Switch id="seo-noindex" checked={form.data.site.noindex} onCheckedChange={(on: boolean) => setSite('noindex', on)} />
                    <div className="cms:flex cms:flex-col cms:gap-0.5">
                        <Label htmlFor="seo-noindex">Hide the whole site from search engines</Label>
                        <p className="cms:text-xs cms:text-muted-foreground">Every page asks not to be indexed and the sitemap is empty. For a site still being built, or staging.</p>
                    </div>
                </div>
                <div className="cms:flex cms:flex-wrap cms:items-start cms:justify-between cms:gap-4">
                    <div className="cms:flex cms:items-start cms:gap-3">
                        <Switch id="seo-append" checked={form.data.site.appendName} onCheckedChange={(on: boolean) => setSite('appendName', on)} />
                        <div className="cms:flex cms:flex-col cms:gap-0.5">
                            <Label htmlFor="seo-append">Add the site name to page titles</Label>
                            <p className="cms:text-xs cms:text-muted-foreground">
                                The browser tab and search results show "About {form.data.site.separator || '|'} {siteName}". Share previews keep the bare title.
                            </p>
                        </div>
                    </div>
                    <div className="cms:flex cms:flex-col cms:gap-1.5">
                        <Label htmlFor="seo-separator" className="cms:text-xs">Separator</Label>
                        <Input id="seo-separator" className="cms:w-20" maxLength={5} disabled={!form.data.site.appendName} value={form.data.site.separator}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSite('separator', e.target.value)} />
                    </div>
                </div>
                <div className="cms:flex cms:max-w-xs cms:flex-col cms:gap-1.5">
                    <Label htmlFor="seo-twitter">X (Twitter) account</Label>
                    <Input id="seo-twitter" placeholder="@acme" maxLength={16} value={form.data.site.twitter}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSite('twitter', e.target.value)} />
                    <FieldError message={errors['site.twitter']} />
                </div>
                <div className="cms:flex cms:flex-col cms:gap-1.5">
                    <Label htmlFor="seo-image">Default share image</Label>
                    <MediaPickerInput id="seo-image" invalid={errors['site.image'] !== undefined} disabled={false} multiple={false} max={null} types={['image']}
                        value={form.data.site.image} onChange={(value: number | number[] | null) => setSite('image', typeof value === 'number' ? value : null)} />
                    <p className="cms:text-xs cms:text-muted-foreground">Shown when a page is shared and has no image of its own.</p>
                    <FieldError message={errors['site.image']} />
                </div>
            </CollapsibleCard>

            {rows.length > 0 && (
                <section className="cms:flex cms:flex-col cms:gap-1">
                    <h2 className="cms:text-base cms:font-medium">Fields used for SEO</h2>
                    <p className="cms:text-sm cms:text-muted-foreground">
                        When an entry or term leaves its meta title, description or share image empty, the site uses one of its fields instead. A page's own SEO fields always win;
                        after the field come the site's (the description in Settings → Site, the share image above).
                    </p>
                </section>
            )}
            {collections !== null && group('Collections', 'Entries of each collection.', collections, 0)}
            {taxonomies !== null && group('Taxonomies', 'Term pages of each taxonomy.', taxonomies, collections?.length ?? 0)}
            <p className="cms:text-xs cms:text-muted-foreground">Meta title: a text field. Meta description: a text or textarea field, cut to 300 characters. Share image: the first image of a media field.</p>
        </form>
    );
}
