/**
 * The errors under `prefix` ("structured.sameAs.0" under "structured"), by
 * what follows it ("sameAs.0"): Settings → SEO's structured data fields
 * are sent under "structured", and FormSections takes errors by field name.
 */
export function errorsUnder(errors: Record<string, string | undefined>, prefix: string): Partial<Record<string, string>> {
    const own: Partial<Record<string, string>> = {};
    for (const [key, message] of Object.entries(errors)) {
        if (key.startsWith(`${prefix}.`) && message !== undefined) own[key.slice(prefix.length + 1)] = message;
    }
    return own;
}
