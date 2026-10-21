import { t } from '@sunrice/admin-sdk';
import type { FieldDefinition } from '@/types.ts';

/** The SEO card's fields (see Sunrice\\Cms\\Support\\Seo), edited with the field inputs, in the user's language. */
export function seoFields(): FieldDefinition[] {
    return [
        { handle: 'title', type: 'text', label: t('Meta title'), instructions: t('Empty: the title.'), config: { max: 255 } },
        { handle: 'description', type: 'textarea', label: t('Meta description'), instructions: t('A sentence or two for search results.'), config: { max: 500 } },
        { handle: 'canonical', type: 'text', label: t('Canonical URL'), instructions: t('Only if this page copies another: that page\'s address. Empty: this page.'), config: { max: 2000 } },
        { handle: 'image', type: 'media', label: t('Open Graph image'), instructions: t('Shown when the page is shared.'), config: { types: ['image'] } },
        { handle: 'noindex', type: 'toggle', label: t('Hide from search engines (noindex)') },
    ];
}
