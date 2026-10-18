import { Deferred, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ArrowUpRight, FileText, Inbox, PenLine, Layers } from 'lucide-react';
import { CollapsibleCard } from '@/components/app/collapsible-card';
import { Badge } from '@/components/ui/badge';
import { AtmosphereArt } from '@/components/app/atmosphere-art';
import { registeredDashboardCard } from '@/lib/dashboard-cards';
import { pluginScriptsLoaded } from '@/lib/page-registry';
import { adminUrl } from '@/lib/route';
import type { SharedProps } from '@/types';

/** A package's card (Sunrice::addDashboardCard()), in position order. */
interface DashboardCard {
    name: string;
    position: number;
    props: Record<string, unknown>;
}

interface Props {
    /** Deferred: undefined until it has loaded. */
    cards?: DashboardCard[];
    collections: { handle: string; title: string; entries: number }[];
    recentEdits: { id: number; title: string; collection: string | null; collection_handle: string | null; status: string; updated_at: string | null }[];
    recentSubmissions: { id: number; form_id: number; form: string | null; summary: string | null; created_at: string | null }[];
}

function EmptyState({ icon: Icon, children }: { icon: typeof FileText; children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center text-sm text-muted-foreground">
            <div className="flex size-12 items-center justify-center rounded-lg bg-muted">
                <Icon className="size-5" />
            </div>
            {children}
        </div>
    );
}

function PackageCards({ cards }: { cards?: DashboardCard[] }) {
    // Admin scripts register their cards after the admin's bundle: render again once they have run.
    const [, setScriptsLoaded] = useState(false);
    useEffect(() => {
        let active = true;
        void pluginScriptsLoaded().then(() => active && setScriptsLoaded(true));

        return () => {
            active = false;
        };
    }, []);

    if (!cards || cards.length === 0) {
        return null;
    }

    return (
        <div className="grid gap-5 lg:grid-cols-2">
            {cards.map((card) => {
                const Card = registeredDashboardCard(card.name);

                return Card ? <Card key={card.name} {...(card.props ?? {})} /> : null;
            })}
        </div>
    );
}

function PackageCardsLoading() {
    return (
        <div className="grid gap-5 lg:grid-cols-2" aria-busy="true" aria-label="Loading cards">
            <div className="h-40 animate-pulse rounded-xl border border-border/60 bg-muted/50" />
        </div>
    );
}

export default function Dashboard({ cards, collections, recentEdits, recentSubmissions }: Props) {
    const { adminPath, auth } = usePage<SharedProps>().props;
    const firstName = auth.user?.name?.split(' ')[0];
    const entryCount = collections.reduce((total, collection) => total + collection.entries, 0);

    return (
        <div className="flex flex-col gap-8">
            <CollapsibleCard title="Your workspace, at a glance" storageKey="dashboard:overview" titleClassName="text-[10px] tracking-[0.16em] uppercase" className="sunrice-atmosphere relative isolate border-border/40" contentClassName="relative px-6 py-8 md:px-10 md:py-10">
                <div className="relative z-10 max-w-xl md:max-w-[65%]">
                    <h1 className="text-3xl leading-tight font-medium tracking-[-0.045em] md:text-4xl">{firstName ? `Welcome back, ${firstName}.` : 'Your content starts here.'}</h1>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed opacity-75">A little clarity for your next idea. Here’s what’s happening with your content.</p>
                    <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-current/10 pt-5">
                        <div><span className="text-2xl font-medium tracking-tight tabular-nums">{entryCount}</span><span className="ml-2 text-xs opacity-70">{entryCount === 1 ? 'entry' : 'entries'}</span></div>
                        <div><span className="text-2xl font-medium tracking-tight tabular-nums">{collections.length}</span><span className="ml-2 text-xs opacity-70">{collections.length === 1 ? 'collection' : 'collections'}</span></div>
                    </div>
                </div>
                <AtmosphereArt className="absolute top-0 right-[-3rem] hidden h-full w-[40%] md:block" />
            </CollapsibleCard>

            <section className="space-y-4" aria-labelledby="collections-heading">
                <div className="flex items-center justify-between gap-3">
                    <h2 id="collections-heading" className="text-lg font-medium tracking-tight">Your collections</h2>
                    <span className="text-xs text-muted-foreground">A home for every kind of content</span>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,14rem),1fr))] gap-4">
                    {collections.map((c) => (
                        <CollapsibleCard key={c.handle} storageKey={`dashboard:collection:${c.handle}`} contentClassName="px-5"
                            title={<span className="flex min-w-0 items-center gap-2.5"><span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground"><Layers className="size-4" /></span><span className="truncate">{c.title}</span></span>}
                            headerAction={<Link href={adminUrl(`collections/${c.handle}/entries`, adminPath)} aria-label={`Open ${c.title}`} className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ArrowUpRight className="size-4" /></Link>}>
                            <div className="flex items-baseline gap-2"><span className="text-3xl font-medium tracking-tight tabular-nums">{c.entries}</span><span className="text-xs text-muted-foreground">{c.entries === 1 ? 'entry' : 'entries'}</span></div>
                        </CollapsibleCard>
                    ))}
                    {collections.length === 0 && (
                        <CollapsibleCard title="Collections" storageKey="dashboard:collections-empty" className="col-span-full">
                            <EmptyState icon={FileText}>No collections yet. Create one under Manage → Collections.</EmptyState>
                        </CollapsibleCard>
                    )}
                </div>
            </section>

            <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
                <CollapsibleCard title={<span className="flex items-center gap-2"><PenLine className="size-4 text-muted-foreground" /> Recent edits</span>} description="The latest entries changed across all collections." storageKey="dashboard:recent-edits">
                    {recentEdits.length === 0 ? (
                        <EmptyState icon={PenLine}>No entries yet.</EmptyState>
                    ) : (
                        <ul className="-mx-2 flex flex-col divide-y divide-border/60">
                            {recentEdits.map((e) => (
                                <li key={e.id}>
                                    <Link
                                        href={adminUrl(e.collection_handle ? `collections/${e.collection_handle}/entries/${e.id}/edit` : `entries/${e.id}`, adminPath)}
                                        className="flex items-center justify-between gap-3 rounded-lg px-2 py-3.5 text-sm transition-colors hover:bg-accent"
                                    >
                                        <div className="min-w-0">
                                            <div className="truncate font-medium">{e.title}</div>
                                            {e.collection && <div className="mt-1 truncate text-xs text-muted-foreground">{e.collection}</div>}
                                        </div>
                                        <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                                            <Badge variant={e.status === 'published' ? 'success' : 'secondary'} className="capitalize">
                                                {e.status}
                                            </Badge>
                                            <span className="hidden sm:inline">{e.updated_at}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </CollapsibleCard>
                <CollapsibleCard title={<span className="flex items-center gap-2"><Inbox className="size-4 text-muted-foreground" /> Recent form submissions</span>} description="New messages from your public forms." storageKey="dashboard:recent-submissions" className="bg-card/70">
                    {recentSubmissions.length === 0 ? (
                        <EmptyState icon={Inbox}>No submissions yet.</EmptyState>
                    ) : (
                        <ul className="flex flex-col divide-y divide-border/60">
                            {recentSubmissions.map((s) => (
                                <li key={s.id}>
                                    <Link
                                        href={adminUrl(`forms/${s.form_id}/submissions`, adminPath)}
                                        className="-mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-3.5 text-sm transition-colors hover:bg-accent"
                                    >
                                        <span className="min-w-0">
                                            <span className="block truncate font-medium">{s.summary ?? 'New submission'}</span>
                                            <span className="mt-1 block text-xs text-muted-foreground">{s.form ?? 'Form'}</span>
                                        </span>
                                        <span className="shrink-0 text-xs text-muted-foreground">{s.created_at}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </CollapsibleCard>
            </div>

            {cards === undefined || cards.length > 0 ? (
                <Deferred data="cards" fallback={<PackageCardsLoading />}>
                    <PackageCards cards={cards} />
                </Deferred>
            ) : null}
        </div>
    );
}
