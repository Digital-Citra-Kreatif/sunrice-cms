import type { FieldDefinition } from '@/types.ts';

/** The SEO card's fields (see Sunrice\\Cms\\Support\\Seo), edited with the field inputs. */
export const SEO_FIELDS: FieldDefinition[] = [
    { handle: 'title', type: 'text', label: 'Meta title', instructions: 'For search results and the browser tab. Empty: the title.', config: { max: 255 } },
    { handle: 'description', type: 'textarea', label: 'Meta description', instructions: 'A sentence or two for search results and shared links.', config: { max: 500 } },
    { handle: 'canonical', type: 'text', label: 'Canonical URL', instructions: 'Only when this page copies one elsewhere: that page\'s full address. Empty: this page.', config: { max: 2000 } },
    { handle: 'image', type: 'media', label: 'Open Graph image', instructions: 'Shown when the page is shared.', config: { types: ['image'] } },
    { handle: 'noindex', type: 'toggle', label: 'Hide from search engines (noindex)' },
];
