/**
 * A field's helper text as safe HTML: simple inline Markdown only, so a
 * blueprint's author can write "See the [style guide](https://example.com)",
 * **bold**, *italic* and `code`. Everything is escaped first; the only tags
 * that come out are <a>, <strong>, <em> and <code>, made here. Links go to
 * web, mail and phone addresses or paths on the site (never `javascript:`
 * or `data:`) and open in a new tab with rel="noopener noreferrer". No raw
 * HTML: `<b>` reads as the text "<b>".
 */

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Text with &, <, >, " and ' escaped: safe in content and in attribute values. */
export function escapeHtml(text: string): string {
    return text.replace(/[&<>"']/g, (char) => ESCAPES[char] ?? char);
}

/**
 * Whether a link may point there: http(s), mailto and tel addresses, a path
 * on the site ("/about", not "//elsewhere") or an anchor ("#prices").
 * Control characters and spaces (which browsers strip from schemes) refuse it.
 */
export function isSafeHref(href: string): boolean {
    // eslint-disable-next-line no-control-regex
    if (/[\u0000- \u007f]/.test(href)) return false;

    return /^(https?:\/\/[^/]|mailto:|tel:|\/(?![/\\])|#)/i.test(href);
}

// Code spans first (nothing inside them is Markdown), then links, bold, italic.
const TOKEN = /`([^`\n]+)`|\[([^\]\n]+)\]\(([^()\s]+)\)|\*\*(?=\S)(.+?)(?<=\S)\*\*|\*(?=[^\s*])([^*\n]+?)(?<=\S)\*/;

/**
 * The text's HTML: `[label](url)` links, `**bold**`, `*italic*` and
 * `` `code` ``; anything else is text. A link to an address that isn't
 * safe (isSafeHref) shows its label only.
 */
export function inlineMarkdown(text: string, inLink = false): string {
    let html = '';
    let rest = text;
    for (let match = TOKEN.exec(rest); match !== null; match = TOKEN.exec(rest)) {
        html += escapeHtml(rest.slice(0, match.index));
        const [whole, code, label, href, bold, italic] = match;
        if (code !== undefined) {
            html += `<code>${escapeHtml(code)}</code>`;
        } else if (label !== undefined && href !== undefined) {
            // No link inside a link; an unsafe address keeps only its words.
            html += inLink || !isSafeHref(href)
                ? inlineMarkdown(label, inLink)
                : `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${inlineMarkdown(label, true)}</a>`;
        } else if (bold !== undefined) {
            html += `<strong>${inlineMarkdown(bold, inLink)}</strong>`;
        } else if (italic !== undefined) {
            html += `<em>${inlineMarkdown(italic, inLink)}</em>`;
        } else {
            html += escapeHtml(whole);
        }
        rest = rest.slice(match.index + whole.length);
    }

    return html + escapeHtml(rest);
}
