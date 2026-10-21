/** Says a text in the user's language (the panel's t); the tests run without one. */
type Translate = (text: string, replace?: Record<string, string>) => string;

/**
 * The line beside a language switch: which language is being edited and the others to switch to,
 * "Editing: English (main) — switch to edit Bahasa Indonesia", or that this one has nothing of its own yet.
 */
export function languageHint(current: string, locales: string[], translated: string[] | null, translate: Translate, name: (code: string) => string): string {
    const main = locales[0];
    const editing = current === main ? translate(':language (main)', { language: name(current) }) : name(current);
    const others = locales.filter((code) => code !== current).map(name).join(', ');
    if (translated !== null && !translated.includes(current)) {
        return translate('Editing: :language, not translated yet', { language: editing });
    }

    return others === '' ? translate('Editing: :language', { language: editing }) : translate('Editing: :language — switch to edit :others', { language: editing, others });
}
