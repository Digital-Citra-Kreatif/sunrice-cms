/**
 * A word-level difference between two texts, for the Compare dialogs:
 * the words both have, the words only the old one has ('removed') and
 * those only the new one has ('added'), in order. Whitespace stays with
 * the words (words alike but for the spaces after them are the same), so
 * joining the new side's parts gives the new text back. Texts too
 * long to compare word by word come back as one removed and one added
 * part (the whole values highlighted).
 */
export type DiffPart = { text: string; op: 'same' | 'removed' | 'added' };

/** Words (with the spaces after them) and line breaks. */
function tokens(text: string): string[] {
    return text.match(/\n|[^\s]+[^\S\n]*|[^\S\n]+/g) ?? [];
}

/** Word pairs compared at most: beyond it, the whole values are highlighted instead. */
const LIMIT = 250_000;

export function wordDiff(before: string, after: string): DiffPart[] {
    if (before === after) return before === '' ? [] : [{ text: before, op: 'same' }];
    const a = tokens(before);
    const b = tokens(after);
    if (a.length * b.length > LIMIT) {
        return [...(before ? [{ text: before, op: 'removed' as const }] : []), ...(after ? [{ text: after, op: 'added' as const }] : [])];
    }
    // The longest common subsequence, by suffix lengths.
    const rows = a.length + 1;
    const cols = b.length + 1;
    const lcs = new Uint32Array(rows * cols);
    for (let i = a.length - 1; i >= 0; i--) {
        for (let j = b.length - 1; j >= 0; j--) {
            lcs[i * cols + j] = a[i]!.trimEnd() === b[j]!.trimEnd() ? lcs[(i + 1) * cols + j + 1]! + 1 : Math.max(lcs[(i + 1) * cols + j]!, lcs[i * cols + j + 1]!);
        }
    }
    const parts: DiffPart[] = [];
    const push = (text: string, op: DiffPart['op']) => {
        const last = parts[parts.length - 1];
        if (last && last.op === op) last.text += text;
        else parts.push({ text, op });
    };
    let i = 0;
    let j = 0;
    while (i < a.length && j < b.length) {
        if (a[i]!.trimEnd() === b[j]!.trimEnd()) {
            // The new text's spacing.
            push(b[j]!, 'same');
            i++;
            j++;
        } else if (lcs[(i + 1) * cols + j]! >= lcs[i * cols + j + 1]!) {
            push(a[i++]!, 'removed');
        } else {
            push(b[j++]!, 'added');
        }
    }
    while (i < a.length) push(a[i++]!, 'removed');
    while (j < b.length) push(b[j++]!, 'added');

    return parts;
}

/** One side of a difference: the old side keeps what's the same and what was removed, the new side what's the same and what was added. */
export function diffSide(parts: DiffPart[], side: 'old' | 'new'): DiffPart[] {
    return parts.filter((part) => part.op === 'same' || part.op === (side === 'old' ? 'removed' : 'added'));
}
