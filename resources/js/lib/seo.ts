import type { FieldDefinition } from '@/types.ts';

/** The SEO card's fields (see Sunrice\\Cms\\Support\\Seo), edited with the field inputs. */
export const SEO_FIELDS: FieldDefinition[] = [
    { handle: 'title', type: 'text', label: 'SEO title', instructions: 'For search results and tabs. Empty: the title.', config: { max: 255 } },
    { handle: 'description', type: 'textarea', label: 'Description', instructions: 'A sentence or two for search results and shared links.', config: { max: 500 } },
    { handle: 'image', type: 'media', label: 'Share image', instructions: 'Shown when the page is shared.', config: { types: ['image'] } },
    { handle: 'noindex', type: 'toggle', label: 'Hide from search engines' },
    { handle: 'canonical', type: 'text', label: 'Canonical address', instructions: 'Only when this page copies one elsewhere: that page\'s full address. Empty: this page.', config: { max: 2000 } },
];
