import type { FieldDefinition } from '@/types.ts';

export type CodeLanguage = 'html' | 'css' | 'javascript' | 'json' | 'plain';

const LANGUAGES: readonly CodeLanguage[] = ['html', 'css', 'javascript', 'json', 'plain'];

/** What a code field's editor highlights: its `language` setting, plain when it names none the editor knows. */
export function codeLanguageOf(field: Pick<FieldDefinition, 'config'>): CodeLanguage {
    const language = field.config?.language;

    return typeof language === 'string' && (LANGUAGES as readonly string[]).includes(language) ? language as CodeLanguage : 'plain';
}
