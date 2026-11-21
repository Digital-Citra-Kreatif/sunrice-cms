import * as React from 'react';
import { router } from '@inertiajs/react';
import { t } from '@imajiner/admin-sdk';
import { Button, CollapsibleCard, FormSections, type SettingsValue } from '@imajiner/admin-sdk/ui';

/** A plugin's card in the entry or term editor's sidebar (Cms::editorCard()): its fields and where it saves. */
export interface PluginCard {
    key: string;
    title: string;
    description: string | null;
    sections: unknown[];
    values: Record<string, SettingsValue>;
    url: string;
}

/**
 * Plugins' cards, each with its own Save: they save at once, apart from
 * the draft (settings about the entry or term, not its content), so they
 * work while the editor has unsaved changes. Not a <form>: the term
 * editor's sidebar is inside its own form.
 */
export function PluginCards({ cards, disabled, storageKey }: { cards: PluginCard[]; disabled: boolean; storageKey: string }) {
    return cards.map((card) => <PluginCardView key={card.key} card={card} disabled={disabled} storageKey={`${storageKey}:${card.key}`} />);
}

function PluginCardView({ card, disabled, storageKey }: { card: PluginCard; disabled: boolean; storageKey: string }) {
    const [data, setData] = React.useState(card.values);
    const [errors, setErrors] = React.useState<Partial<Record<string, string>>>({});
    const [saving, setSaving] = React.useState(false);
    // Saved (the page's props came back): start from what's kept now.
    React.useEffect(() => setData(card.values), [card.values]);
    const changed = JSON.stringify(data) !== JSON.stringify(card.values);
    const save = () => router.put(card.url, { values: data }, {
        preserveScroll: true,
        preserveState: true,
        // Its errors apart from the editor's own fields (which may share a name).
        errorBag: `card-${card.key}`,
        onStart: () => setSaving(true),
        onFinish: () => setSaving(false),
        onSuccess: () => setErrors({}),
        onError: (bag) => setErrors(bag as Partial<Record<string, string>>),
    });

    return (
        <CollapsibleCard title={card.title} description={card.description ?? undefined} titleClassName="cms:text-base" storageKey={storageKey}
            hasErrors={Object.keys(errors).length > 0} contentClassName="cms:flex cms:flex-col cms:gap-4 cms:text-sm">
            <fieldset disabled={disabled || saving} className="cms:min-w-0">
                <FormSections bare sections={card.sections} data={data} errors={errors} storageKey={storageKey}
                    onChange={(name: string, value: SettingsValue) => { setData({ ...data, [name]: value }); setErrors({ ...errors, [name]: undefined }); }} />
            </fieldset>
            <Button type="button" size="sm" className="cms:w-fit" disabled={disabled || saving || !changed} onClick={save}>{t('Save')}</Button>
        </CollapsibleCard>
    );
}
