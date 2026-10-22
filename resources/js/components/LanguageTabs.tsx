import { Check } from 'lucide-react';
import { t } from '@imajiner/admin-sdk';
import { localeName } from '@/lib/entries.ts';
import { languageHint } from '@/lib/languages.ts';

/**
 * The language being edited, as the entry editor's language bar shows it: each language by its code, the one
 * open marked, a check on those with content of their own (`translated`; null: not known), and a line saying
 * which one is being edited and that the others are a click away ("Editing: English (main) — switch to edit
 * Bahasa Indonesia").
 */
export function LanguageTabs({ current, locales, translated, onSwitch }: {
    current: string; locales: string[]; translated: string[] | null; onSwitch: (code: string) => void;
}) {
    if (locales.length < 2) return null;
    const hint = languageHint(current, locales, translated, t, localeName);

    return (
        <nav aria-label={t('Languages')} className="cms:flex cms:flex-wrap cms:items-center cms:gap-x-3 cms:gap-y-2">
            <div className="cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5">
                {locales.map((code, i) => {
                    const active = code === current;
                    const own = translated === null || translated.includes(code);
                    const name = i === 0 ? t(':language (main)', { language: localeName(code) }) : localeName(code);
                    const title = own ? name : t(':language: not translated yet', { language: name });
                    return (
                        <button key={code} type="button" title={title} aria-label={title} aria-current={active ? 'page' : undefined}
                            onClick={() => !active && onSwitch(code)}
                            className={`cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${active ? 'cms:bg-card cms:text-foreground cms:shadow-xs' : 'cms:text-muted-foreground cms:hover:text-foreground'} ${own ? '' : 'cms:italic cms:opacity-70'}`}>
                            {code}
                            {own && translated !== null && <Check aria-hidden className="cms:size-3 cms:text-emerald-600" />}
                        </button>
                    );
                })}
            </div>
            <p className="cms:text-sm cms:text-muted-foreground" aria-live="polite">{hint}</p>
        </nav>
    );
}
