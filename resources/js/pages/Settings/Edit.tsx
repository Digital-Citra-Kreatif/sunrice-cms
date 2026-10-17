import * as React from 'react';
import { useForm } from '@inertiajs/react';
import { Image as ImageIcon, LoaderCircle, Mail, Plus, TriangleAlert, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CollapsibleCard } from '@/components/app/collapsible-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AssetPicker, { PickedAsset } from '@/components/AssetPicker';
import EntryPicker, { PickedEntry } from '@/components/EntryPicker';
import { InputError } from '@/components/app/input-error';
import { useBreadcrumbs } from '@/components/app/breadcrumbs';
import { SettingsTabs } from '@/components/app/settings-tabs';
import { adminUrl } from '@/lib/route';
import { usePage } from '@inertiajs/react';
import type { SharedProps } from '@/types';
import { useUnsavedChanges } from '@/lib/use-unsaved-changes';

interface Settings {
    name: string;
    description: string | null;
    timezone: string;
    locales: { main: string; available: string[]; names: Record<string, string> };
    code: { head: string | null; body_start: string | null; body_end: string | null };
    branding?: { name: string | null; tagline: string | null; logo: number | null; font: string | null; color: string | null };
    security?: { two_factor: boolean };
    comments?: Partial<CommentSettings>;
}

interface CommentSettings {
    moderation: 'all' | 'first_time' | 'none';
    require_login: boolean;
    captcha: boolean;
    rate_limit: { attempts: number | ''; per_minutes: number | '' };
    close_after_days: number | '';
    max_depth: number | '';
    notify: boolean;
    notify_roles: string[];
    notify_emails: string[];
    reply_notifications: boolean;
}

interface MailInfo {
    mailer: string;
    transport: string;
    host: string | null;
    port: number | string | null;
    from: string | null;
    from_name: string | null;
    delivers: boolean;
}

interface Props {
    settings: Settings;
    homepage: PickedEntry | null;
    timezones: string[];
    mainLocked: boolean;
    brandLogo?: { id: number; url: string; filename: string } | null;
    fonts?: { value: string; label: string }[];
    mail?: MailInfo;
    roles?: string[];
    captchaConfigured?: boolean;
}

export default function SettingsEdit({ settings, homepage, timezones, mainLocked, brandLogo = null, fonts = [], mail, roles = [], captchaConfigured = false }: Props) {
    const { adminPath } = usePage<SharedProps>().props;
    const [home, setHome] = React.useState<PickedEntry[]>(homepage ? [homepage] : []);
    const [logo, setLogo] = React.useState(brandLogo);
    const [newLocale, setNewLocale] = React.useState('');

    const form = useForm({
        name: settings.name ?? '',
        description: settings.description ?? '',
        timezone: settings.timezone ?? 'UTC',
        homepage_entry_id: homepage?.id ?? null as number | null,
        locales: {
            main: settings.locales.main,
            available: settings.locales.available,
            names: settings.locales.names ?? {},
        },
        branding: {
            name: settings.branding?.name ?? 'Sunrice',
            tagline: settings.branding?.tagline ?? '',
            logo: settings.branding?.logo ?? null as number | null,
            font: settings.branding?.font ?? 'instrument-sans',
            color: settings.branding?.color ?? '',
        },
        code: {
            head: settings.code.head ?? '',
            body_start: settings.code.body_start ?? '',
            body_end: settings.code.body_end ?? '',
        },
        security: {
            two_factor: !!settings.security?.two_factor,
        },
        comments: {
            moderation: settings.comments?.moderation ?? 'first_time',
            require_login: !!settings.comments?.require_login,
            captcha: !!settings.comments?.captcha,
            rate_limit: {
                attempts: settings.comments?.rate_limit?.attempts ?? 3,
                per_minutes: settings.comments?.rate_limit?.per_minutes ?? 1,
            },
            close_after_days: settings.comments?.close_after_days ?? '',
            max_depth: settings.comments?.max_depth ?? 3,
            notify: settings.comments?.notify !== false,
            notify_roles: settings.comments?.notify_roles ?? [],
            notify_emails: settings.comments?.notify_emails ?? [],
            reply_notifications: settings.comments?.reply_notifications !== false,
        } as CommentSettings,
    });
    const testMail = useForm({ test_email: '' });
    const sendTestMail = () => testMail.post(adminUrl('settings/test-mail', adminPath), { preserveScroll: true });
    const errors = form.errors as Record<string, string>;
    const locales = form.data.locales;
    const savedBranding = React.useRef(JSON.stringify(form.data.branding));

    useBreadcrumbs([{ label: 'Settings' }]);

    const setLocales = (next: Partial<typeof locales>) => form.setData('locales', { ...locales, ...next });

    const addLocale = () => {
        const code = newLocale.trim();
        if (code === '' || locales.available.includes(code)) return;
        setLocales({ available: [...locales.available, code] });
        setNewLocale('');
    };

    const removeLocale = (code: string) => {
        const names = { ...locales.names };
        delete names[code];
        setLocales({ available: locales.available.filter((c) => c !== code), names });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Font and color live in the page head: reload to apply them.
        const brandingChanged = JSON.stringify(form.data.branding) !== savedBranding.current;
        form.put(adminUrl('settings', adminPath), {
            preserveScroll: true,
            onSuccess: () => {
                if (brandingChanged) window.location.reload();
            },
        });
    };

    // Leave-page warning for unsaved edits; Ctrl/⌘ S saves.
    const formRef = React.useRef<HTMLFormElement>(null);
    useUnsavedChanges(form.isDirty && !form.processing, () => formRef.current?.requestSubmit());

    return (
        <form ref={formRef} onSubmit={submit} className="flex max-w-3xl flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="sunrice-page-title">Settings</h1>
                <Button type="submit" disabled={form.processing}>
                    {form.processing && <LoaderCircle className="animate-spin" />} Save settings
                </Button>
            </div>
            <SettingsTabs current="general" />

            <CollapsibleCard title="General" storageKey="settings:general" hasErrors={Object.keys(errors).length > 0} contentClassName="flex flex-col gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="site-name">Site name</Label>
                    <Input id="site-name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} required />
                    <InputError message={errors.name} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="site-description">Description</Label>
                    <Textarea id="site-description" rows={2} value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} />
                    <p className="text-xs text-muted-foreground">Used as the meta description of pages that don't set their own.</p>
                    <InputError message={errors.description} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 items-start">
                    <div className="grid gap-2">
                        <Label>Timezone</Label>
                        <Select value={form.data.timezone} onValueChange={(v) => form.setData('timezone', v)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent className="max-h-72">
                                {timezones.map((tz) => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.timezone} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Homepage</Label>
                        <div className="flex gap-2">
                            <div className="min-w-0 flex-1">
                                <EntryPicker
                                    value={home}
                                    placeholder="Choose an entry…"
                                    onChange={(picked) => { setHome(picked); form.setData('homepage_entry_id', picked[0]?.id ?? null); }}
                                />
                            </div>
                            {home.length > 0 && (
                                <Button type="button" variant="ghost" size="icon" aria-label="Clear homepage"
                                    onClick={() => { setHome([]); form.setData('homepage_entry_id', null); }}>
                                    <X />
                                </Button>
                            )}
                        </div>
                        <InputError message={errors.homepage_entry_id} />
                    </div>
                </div>
            </CollapsibleCard>

            <CollapsibleCard title="Languages" description={<>The main language has unprefixed URLs; others are served under /&#123;code&#125;/….</>} storageKey="settings:languages" hasErrors={Object.keys(errors).length > 0} contentClassName="flex flex-col gap-3">
                {locales.available.map((code) => (
                    <div key={code} className="flex items-center gap-3">
                        <code className="w-16 text-sm">{code}</code>
                        <Input
                            className="max-w-60"
                            placeholder="Name, e.g. English"
                            value={locales.names[code] ?? ''}
                            onChange={(e) => setLocales({ names: { ...locales.names, [code]: e.target.value } })}
                        />
                        {code === locales.main ? (
                            <span className="text-xs font-medium text-muted-foreground">Main language</span>
                        ) : (
                            <>
                                {!mainLocked && (
                                    <Button type="button" variant="ghost" size="sm" onClick={() => setLocales({ main: code })}>Make main</Button>
                                )}
                                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground" aria-label={`Remove ${code}`} onClick={() => removeLocale(code)}>
                                    <X />
                                </Button>
                            </>
                        )}
                    </div>
                ))}
                <div className="flex items-center gap-2">
                    <Input
                        className="w-32 font-mono"
                        placeholder="e.g. en"
                        value={newLocale}
                        onChange={(e) => setNewLocale(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addLocale(); } }}
                    />
                    <Button type="button" variant="outline" size="sm" onClick={addLocale}><Plus /> Add language</Button>
                </div>
                {mainLocked && <MainLanguageHelp example={locales.available.find((code) => code !== locales.main) ?? 'en'} />}
                <InputError message={errors['locales.main'] ?? errors['locales.available'] ?? Object.entries(errors).find(([k]) => k.startsWith('locales.'))?.[1]} />
            </CollapsibleCard>

            <CollapsibleCard
                title="Branding"
                description="White-label the admin panel: its name, logo, font and accent color. The public site isn't affected."
                storageKey="settings:branding"
                contentClassName="flex flex-col gap-4"
            >
                <div className="grid gap-4 sm:grid-cols-2 items-start">
                    <div className="grid gap-2">
                        <Label htmlFor="brand-name">Panel name</Label>
                        <Input id="brand-name" maxLength={60} value={form.data.branding.name} onChange={(e) => form.setData('branding', { ...form.data.branding, name: e.target.value })} />
                        <InputError message={errors['branding.name']} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="brand-tagline">Tagline</Label>
                        <Input id="brand-tagline" maxLength={80} placeholder="Optional" value={form.data.branding.tagline} onChange={(e) => form.setData('branding', { ...form.data.branding, tagline: e.target.value })} />
                        <InputError message={errors['branding.tagline']} />
                    </div>
                </div>
                <p className="-mt-2 text-xs text-muted-foreground">Shown in the sidebar, on the login page and in browser tabs. Renaming it also hides "Powered by Sunrice CMS".</p>

                <div className="grid gap-2">
                    <Label>Logo</Label>
                    <div className="flex flex-wrap items-center gap-3">
                        {logo ? (
                            <div className="flex items-center gap-2 rounded-md border p-2 text-sm">
                                <img src={logo.url} alt="" className="size-10 rounded object-contain" />
                                <span className="max-w-48 truncate">{logo.filename}</span>
                                <button type="button" className="text-muted-foreground hover:text-foreground" aria-label="Remove logo"
                                    onClick={() => { setLogo(null); form.setData('branding', { ...form.data.branding, logo: null }); }}>
                                    <X className="size-4" />
                                </button>
                            </div>
                        ) : (
                            <span className="flex items-center gap-2 text-sm text-muted-foreground"><ImageIcon className="size-4" /> Sunrice mark</span>
                        )}
                        <AssetPicker
                            imageOnly
                            trigger={<Button type="button" variant="outline" size="sm">Choose logo</Button>}
                            onSelect={(assets: PickedAsset[]) => {
                                const a = assets[0];
                                if (!a) return;
                                setLogo({ id: a.id, url: a.url, filename: a.filename });
                                form.setData('branding', { ...form.data.branding, logo: a.id });
                            }}
                        />
                    </div>
                    <InputError message={errors['branding.logo']} />
                    <p className="text-xs text-muted-foreground">A square image works best (SVG or PNG). Also used as the browser tab icon.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 items-start">
                    <div className="grid gap-2">
                        <Label htmlFor="brand-font">Font</Label>
                        <Select value={form.data.branding.font} onValueChange={(v) => form.setData('branding', { ...form.data.branding, font: v })}>
                            <SelectTrigger id="brand-font" className="w-full"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {fonts.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <InputError message={errors['branding.font']} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="brand-color">Accent color</Label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                aria-label="Pick accent color"
                                className="size-9 shrink-0 cursor-pointer rounded-lg border border-input bg-card p-1"
                                value={form.data.branding.color || '#2a2a2a'}
                                onChange={(e) => form.setData('branding', { ...form.data.branding, color: e.target.value })}
                            />
                            <Input
                                id="brand-color"
                                className="font-mono"
                                placeholder="Default (neutral)"
                                value={form.data.branding.color}
                                onChange={(e) => form.setData('branding', { ...form.data.branding, color: e.target.value.trim() })}
                            />
                            {form.data.branding.color && (
                                <Button type="button" variant="ghost" size="sm" onClick={() => form.setData('branding', { ...form.data.branding, color: '' })}>Reset</Button>
                            )}
                        </div>
                        <InputError message={errors['branding.color']} />
                    </div>
                </div>
                <p className="-mt-2 text-xs text-muted-foreground">
                    The accent color is used for primary buttons, the active menu item and focus outlines; text on it switches between black and white to stay readable.
                </p>
                {/^#[0-9a-fA-F]{6}$/.test(form.data.branding.color) && (
                    <div className="flex items-center gap-3 rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
                        Preview
                        <span
                            className="inline-flex h-8 items-center rounded-lg px-3 text-sm font-medium"
                            style={{ background: form.data.branding.color, color: readableOn(form.data.branding.color) }}
                        >
                            Publish
                        </span>
                    </div>
                )}
            </CollapsibleCard>

            <CollapsibleCard title="Code snippets" description={<>
                        Analytics, tag managers, verification tags… Added to every page through{' '}
                        <code>&lt;x-sunrice::code position="…" /&gt;</code> in your layout. Printed as-is.
                    </>} storageKey="settings:code-snippets" hasErrors={Object.keys(errors).length > 0} contentClassName="flex flex-col gap-4">
                {([
                    ['head', 'In <head>', 'End of <head>: analytics, verification meta tags.'],
                    ['body_start', 'Start of <body>', 'Right after <body>: e.g. Google Tag Manager <noscript>.'],
                    ['body_end', 'End of <body>', 'Before </body>: chat widgets, deferred scripts.'],
                ] as const).map(([key, label, help]) => (
                    <div key={key} className="grid gap-2">
                        <Label htmlFor={`code-${key}`}>{label}</Label>
                        <Textarea
                            id={`code-${key}`}
                            rows={4}
                            className="font-mono text-xs"
                            spellCheck={false}
                            value={form.data.code[key]}
                            onChange={(e) => form.setData('code', { ...form.data.code, [key]: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">{help}</p>
                        <InputError message={errors[`code.${key}`]} />
                    </div>
                ))}
            </CollapsibleCard>

            <CollapsibleCard
                title="Email"
                description="Login codes, password resets and form notifications are sent with these settings, from your .env (MAIL_*)."
                storageKey="settings:email"
                hasErrors={!!testMail.errors.test_email}
                contentClassName="flex flex-col gap-4"
            >
                {mail && (
                    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
                        <dt className="text-muted-foreground">Mailer</dt>
                        <dd className="font-mono text-xs leading-5">{mail.mailer}{mail.transport !== mail.mailer && ` (${mail.transport})`}</dd>
                        {mail.host && (<><dt className="text-muted-foreground">Server</dt><dd className="font-mono text-xs leading-5">{mail.host}{mail.port ? `:${mail.port}` : ''}</dd></>)}
                        <dt className="text-muted-foreground">From</dt>
                        <dd className="font-mono text-xs leading-5">{mail.from || '—'}{mail.from_name ? ` (${mail.from_name})` : ''}</dd>
                    </dl>
                )}
                {mail && !mail.delivers && (
                    <p className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-[13px] text-amber-800 dark:text-amber-300">
                        <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                        <span>The "{mail.transport}" mailer doesn't deliver email: messages only go to the log. Set MAIL_MAILER=smtp and the MAIL_* settings in .env to send real email.</span>
                    </p>
                )}
                <div className="grid gap-2">
                    <Label htmlFor="test-email">Send a test email</Label>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Input
                            id="test-email"
                            type="email"
                            placeholder="you@example.com"
                            value={testMail.data.test_email}
                            onChange={(e) => testMail.setData('test_email', e.target.value)}
                            // Enter sends the test, not the settings form around it.
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    sendTestMail();
                                }
                            }}
                        />
                        <Button type="button" variant="outline" className="shrink-0" disabled={testMail.processing || testMail.data.test_email.trim() === ''} onClick={sendTestMail}>
                            {testMail.processing ? <LoaderCircle className="animate-spin" /> : <Mail />} Send test
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Sent right away with the settings above. If it fails, the error from the mail server is shown here.</p>
                    <InputError message={testMail.errors.test_email} />
                </div>
            </CollapsibleCard>

            <CollapsibleCard title="Security" storageKey="settings:security" contentClassName="flex flex-col gap-4">
                <label className="flex items-start gap-3">
                    <Switch checked={form.data.security.two_factor} onCheckedChange={(v) => form.setData('security', { ...form.data.security, two_factor: v })} />
                    <span className="grid gap-0.5 text-sm">
                        <span className="font-medium">Two-factor login with an emailed code</span>
                        <span className="text-xs text-muted-foreground">
                            After their password, everyone logging in to the admin must enter a 6-digit code sent to their email address.
                        </span>
                    </span>
                </label>
                {form.data.security.two_factor && (
                    <div className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-[13px] text-amber-800 dark:text-amber-300">
                        <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                        <div className="grid gap-1">
                            <p className="font-medium">Make sure email (SMTP) is set up before turning this on.</p>
                            <p>
                                If login codes can't be delivered, nobody can log in, including you. Send yourself a test email above first
                                {mail && !mail.delivers && <> (right now mail only goes to the log)</>}. Locked out? Turn it off on the server with{' '}
                                <code className="font-mono text-xs">php artisan sunrice:two-factor off</code>.
                            </p>
                        </div>
                    </div>
                )}
            </CollapsibleCard>

            <CommentsCard
                value={form.data.comments}
                onChange={(next) => form.setData('comments', { ...form.data.comments, ...next })}
                roles={roles}
                captchaConfigured={captchaConfigured}
                errors={errors}
            />

            <div>
                <Button type="submit" disabled={form.processing}>
                    {form.processing && <LoaderCircle className="animate-spin" />} Save settings
                </Button>
            </div>
        </form>
    );
}

/** Why the main language is locked, and how to change it from the command line. */
function MainLanguageHelp({ example }: { example: string }) {
    const command = `php artisan sunrice:switch-main-language ${example}`;

    return (
        <details className="group rounded-lg border border-border/80 bg-muted/30 text-[13px]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 text-muted-foreground hover:text-foreground">
                <span>The main language is locked because content exists. How do I change it?</span>
                <span aria-hidden className="text-xs transition-transform group-open:rotate-90">›</span>
            </summary>
            <div className="grid gap-2 border-t border-border/70 px-3 py-3 leading-relaxed text-muted-foreground">
                <p>
                    Every entry keeps its full content in the main language, and only the main language has unprefixed URLs. Switching
                    converts that content, so it is done on the server with an Artisan command instead of here:
                </p>
                <ol className="ml-4 grid list-decimal gap-1.5">
                    <li>Back up your database.</li>
                    <li>
                        See what would change and what is missing:
                        <code className="mt-1 block rounded-md bg-card px-2 py-1 font-mono text-xs text-foreground">{command} --dry-run</code>
                    </li>
                    <li>
                        Translate the entries and terms it lists, or add <code className="font-mono text-xs text-foreground">--copy-missing</code> to give them a
                        copy of the current text.
                    </li>
                    <li>
                        Run the switch:
                        <code className="mt-1 block rounded-md bg-card px-2 py-1 font-mono text-xs text-foreground">{command}</code>
                    </li>
                    <li>
                        If you cache routes or config, refresh them: <code className="font-mono text-xs text-foreground">php artisan optimize</code>.
                    </li>
                </ol>
                <p>Old addresses keep working: they redirect (301) to each page's new URL.</p>
            </div>
        </details>
    );
}

/** Black or white text on a #rrggbb background (mirrors Branding::readableOn). */
function readableOn(hex: string): string {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return 1.05 / (luminance + 0.05) >= (luminance + 0.05) / 0.05 ? '#ffffff' : '#111111';
}

const NUMBER = (value: string): number | '' => (value === '' ? '' : Number(value));

/** Settings → Comments: moderation, spam protection and notifications. */
function CommentsCard({ value, onChange, roles, captchaConfigured, errors }: {
    value: CommentSettings;
    onChange: (next: Partial<CommentSettings>) => void;
    roles: string[];
    captchaConfigured: boolean;
    errors: Record<string, string>;
}) {
    // Typed as text; stored as a list of addresses.
    const [emails, setEmails] = React.useState(value.notify_emails.join(', '));
    const emailError = Object.entries(errors).find(([key]) => key.startsWith('comments.notify_emails'))?.[1];
    const hasErrors = Object.keys(errors).some((key) => key.startsWith('comments.'));

    const toggle = (key: keyof CommentSettings, label: string, help: React.ReactNode, disabled = false) => (
        <label className="flex items-start gap-3">
            <Switch checked={!!value[key]} disabled={disabled} onCheckedChange={(v) => onChange({ [key]: v } as Partial<CommentSettings>)} />
            <span className="grid gap-0.5 text-sm">
                <span className="font-medium">{label}</span>
                <span className="text-xs text-muted-foreground">{help}</span>
            </span>
        </label>
    );

    return (
        <CollapsibleCard
            title="Comments"
            description="For collections with Allow comments on (Structure → Collections → Pages & URLs)."
            storageKey="settings:comments"
            hasErrors={hasErrors}
            contentClassName="flex flex-col gap-5"
        >
            <div className="grid gap-2">
                <Label>New comments</Label>
                <Select value={value.moderation} onValueChange={(v) => onChange({ moderation: v as CommentSettings['moderation'] })}>
                    <SelectTrigger className="w-full sm:w-96"><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="first_time">Hold a commenter's first comment for approval</SelectItem>
                        <SelectItem value="all">Hold every comment for approval</SelectItem>
                        <SelectItem value="none">Publish comments right away</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                    With the first option, once one of a commenter's comments is approved, their next ones appear at once. Comments by people who can moderate are always published.
                </p>
                <InputError message={errors['comments.moderation']} />
            </div>

            {toggle('require_login', 'Only signed-in users can comment', 'Guests see the comments but not the form.')}
            {toggle(
                'captcha',
                'Ask for a captcha',
                captchaConfigured
                    ? 'Uses the captcha set up for forms.'
                    : <>No captcha keys are set: add <code className="font-mono">SUNRICE_CAPTCHA_SITE_KEY</code> and <code className="font-mono">SUNRICE_CAPTCHA_SECRET_KEY</code> to .env first (see the Forms docs).</>,
                !captchaConfigured && !value.captcha,
            )}

            <div className="grid gap-2">
                <Label>Rate limit</Label>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Input type="number" min={1} max={100} className="w-20" value={value.rate_limit.attempts} onChange={(e) => onChange({ rate_limit: { ...value.rate_limit, attempts: NUMBER(e.target.value) } })} />
                    comments per visitor every
                    <Input type="number" min={1} max={1440} className="w-20" value={value.rate_limit.per_minutes} onChange={(e) => onChange({ rate_limit: { ...value.rate_limit, per_minutes: NUMBER(e.target.value) } })} />
                    minutes
                </div>
                <InputError message={errors['comments.rate_limit.attempts'] ?? errors['comments.rate_limit.per_minutes']} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="comments-close">Close comments after (days)</Label>
                    <Input id="comments-close" type="number" min={1} placeholder="Never" value={value.close_after_days} onChange={(e) => onChange({ close_after_days: NUMBER(e.target.value) })} />
                    <p className="text-xs text-muted-foreground">Counted from the entry's publish date. Existing comments stay visible.</p>
                    <InputError message={errors['comments.close_after_days']} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="comments-depth">Reply levels shown</Label>
                    <Input id="comments-depth" type="number" min={1} max={10} value={value.max_depth} onChange={(e) => onChange({ max_depth: NUMBER(e.target.value) })} />
                    <p className="text-xs text-muted-foreground">Deeper replies line up at the last level.</p>
                    <InputError message={errors['comments.max_depth']} />
                </div>
            </div>

            {toggle('notify', 'Email moderators about new comments', 'Sent for every new comment, with a link to approve it.')}
            {value.notify && (
                <div className="grid gap-4 pl-12">
                    <div className="grid gap-2">
                        <Label>Roles</Label>
                        <div className="flex flex-wrap gap-x-5 gap-y-2">
                            {roles.map((role) => (
                                <label key={role} className="flex items-center gap-2 text-sm">
                                    <Checkbox
                                        checked={value.notify_roles.includes(role)}
                                        onCheckedChange={(c) => onChange({ notify_roles: c ? [...value.notify_roles, role] : value.notify_roles.filter((r) => r !== role) })}
                                    />
                                    {role}
                                </label>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">None ticked: everyone who can moderate comments.</p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="comments-emails">Also send to</Label>
                        <Input
                            id="comments-emails"
                            value={emails}
                            placeholder="editor@example.com, team@example.com"
                            onChange={(e) => {
                                setEmails(e.target.value);
                                onChange({ notify_emails: e.target.value.split(/[\s,;]+/).filter((email) => email !== '') });
                            }}
                        />
                        <InputError message={emailError} />
                    </div>
                </div>
            )}

            {toggle('reply_notifications', 'Let commenters get an email when someone replies', 'Adds a "Notify me of replies" box to the form. Each email has a link to stop them.')}
        </CollapsibleCard>
    );
}
