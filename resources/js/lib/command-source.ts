import { pickerQuery } from './values.ts';

interface PickerItem { id: number; title: string; collection: string; collectionHandle: string; status: string }

export interface EntryCommand {
    id: string;
    label: string;
    description: string;
    group: string;
    icon: string;
    url: string;
}

/** Says a text in the user's language (the panel's t); the tests run without one. */
type Translate = (text: string) => string;
const english: Translate = (text) => text;

/** The entry picker's results (GET cms/entries/picker) as command palette items. */
export function entryCommands(items: PickerItem[], href: (path: string) => string, translate: Translate = english): EntryCommand[] {
    return items.map((item) => ({
        id: String(item.id),
        label: item.title,
        description: item.status === 'published' ? item.collection : `${item.collection} · ${translate(item.status)}`,
        group: translate('Entries'),
        icon: 'file-text',
        url: href(`cms/collections/${item.collectionHandle}/entries/${item.id}/edit`),
    }));
}

/**
 * Searches entries by title for the command palette, with the permissions
 * of the entry picker (entries the person may view). A 403 or a failed
 * request gives no results.
 */
export async function searchEntries(query: string, signal: AbortSignal, href: (path: string) => string, translate: Translate = english): Promise<EntryCommand[]> {
    const response = await fetch(`${href('cms/entries/picker')}?${pickerQuery({ search: query.trim(), collections: [] })}`, {
        signal, headers: { Accept: 'application/json' }, credentials: 'same-origin',
    });
    if (!response.ok) return [];
    const { items } = (await response.json()) as { items: PickerItem[] };

    return entryCommands(items, href, translate);
}
