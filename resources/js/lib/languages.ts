import type { LanguageTab } from '@imajiner/admin-sdk/ui';
import type { EntryLocale, EntryStatus } from './entries.ts';

/** Says a text in the user's language (the panel's t); the tests run without one. */
type Translate = (text: string, replace?: Record<string, string>) => string;

/**
 * The language tabs of a page with a text per language (a term, a listing
 * page, a global set): the main language first and marked; with
 * `translated` (the languages with texts of their own; null: not known),
 * the others are missing until they have theirs.
 */
export function localeTabs(locales: string[], translated: string[] | null, name: (code: string) => string): LanguageTab[] {
    return locales.map((code, i) => ({
        code,
        name: name(code),
        main: i === 0,
        missing: translated !== null && !translated.includes(code),
    }));
}

/**
 * The entry editor's language tabs: every language of the site in its
 * order, each with its status (a green dot when live, amber when the main
 * language changed since it was saved); the ones it doesn't have yet are
 * missing (to add), and left out when they can't be added.
 */
export function entryLanguageTabs(locales: EntryLocale[], canAdd: boolean, translate: Translate, status: (status: EntryStatus) => string, name: (code: string) => string): LanguageTab[] {
    return locales
        .filter((locale) => locale.status !== null || canAdd)
        .map((locale) => {
            const tab: LanguageTab = { code: locale.code, name: locale.name ?? name(locale.code), main: locale.main };
            if (locale.status === null) {
                return { ...tab, missing: true };
            }
            if (locale.outdated) {
                return { ...tab, status: { tone: 'warning', label: translate('Outdated: the main language changed since') }, description: status(locale.status) };
            }

            return locale.status === 'published'
                ? { ...tab, status: { tone: 'success', label: status(locale.status) } }
                : { ...tab, description: status(locale.status) };
        });
}
