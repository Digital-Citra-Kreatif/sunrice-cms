import * as React from 'react';
import { EditorContent, useEditor, useEditorState, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import {
    Bold, Code, Heading2, Heading3, ImagePlus, Italic, Link2, List, ListOrdered, Minus, Quote, Redo2, Strikethrough, Underline, Undo2,
} from 'lucide-react';
import { adminUrl } from '@sunrice/admin-sdk';
import {
    Button, Checkbox, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Input, Label, MediaPickerInput, Tooltip, TooltipContent, TooltipTrigger,
} from '@sunrice/admin-sdk/ui';
import { isSafeUrl } from '@/lib/values.ts';

/** Images keep their media library id, so the server knows which files a text uses. */
const LibraryImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            'data-media-id': { default: null },
        };
    },
});

interface Props {
    id: string;
    value: string;
    onChange: (html: string | null) => void;
    invalid: boolean;
    /** The label's id, for the editing area's name. */
    labelledBy: string;
}

/**
 * Rich text for entries: the formatting the server keeps when it cleans
 * the HTML (headings, lists, quotes, code, links, library images).
 */
export function RichTextEditor({ id, value, onChange, invalid, labelledBy }: Props) {
    const [dialog, setDialog] = React.useState<'link' | 'image' | null>(null);
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ heading: { levels: [2, 3, 4] }, link: { openOnClick: false, autolink: true } }),
            LibraryImage,
        ],
        content: value,
        editorProps: {
            attributes: {
                id,
                class: 'cms-prose',
                role: 'textbox',
                'aria-multiline': 'true',
                'aria-labelledby': labelledBy,
                ...(invalid ? { 'aria-invalid': 'true' } : {}),
            },
        },
        onUpdate: ({ editor: e }) => onChange(e.isEmpty ? null : e.getHTML()),
    });

    return (
        <div className={`cms:rounded-md cms:border cms:bg-background ${invalid ? 'cms:border-destructive' : ''}`}>
            {editor && <Toolbar editor={editor} onLink={() => setDialog('link')} onImage={() => setDialog('image')} />}
            <EditorContent editor={editor} />
            {editor && <LinkDialog editor={editor} open={dialog === 'link'} onClose={() => setDialog(null)} />}
            {editor && <ImageDialog editor={editor} open={dialog === 'image'} onClose={() => setDialog(null)} />}
        </div>
    );
}

function Toolbar({ editor, onLink, onImage }: { editor: Editor; onLink: () => void; onImage: () => void }) {
    const state = useEditorState({
        editor,
        selector: ({ editor: e }) => ({
            bold: e.isActive('bold'), italic: e.isActive('italic'), underline: e.isActive('underline'), strike: e.isActive('strike'),
            code: e.isActive('code'), h2: e.isActive('heading', { level: 2 }), h3: e.isActive('heading', { level: 3 }),
            bullet: e.isActive('bulletList'), ordered: e.isActive('orderedList'), quote: e.isActive('blockquote'), link: e.isActive('link'),
            undo: e.can().undo(), redo: e.can().redo(),
        }),
    });
    const chain = () => editor.chain().focus();

    return (
        <div role="toolbar" aria-label="Formatting" className="cms:flex cms:flex-wrap cms:gap-0.5 cms:border-b cms:p-1">
            <Tool label="Bold" active={state.bold} onClick={() => chain().toggleBold().run()}><Bold /></Tool>
            <Tool label="Italic" active={state.italic} onClick={() => chain().toggleItalic().run()}><Italic /></Tool>
            <Tool label="Underline" active={state.underline} onClick={() => chain().toggleUnderline().run()}><Underline /></Tool>
            <Tool label="Strikethrough" active={state.strike} onClick={() => chain().toggleStrike().run()}><Strikethrough /></Tool>
            <Tool label="Code" active={state.code} onClick={() => chain().toggleCode().run()}><Code /></Tool>
            <Separator />
            <Tool label="Heading" active={state.h2} onClick={() => chain().toggleHeading({ level: 2 }).run()}><Heading2 /></Tool>
            <Tool label="Subheading" active={state.h3} onClick={() => chain().toggleHeading({ level: 3 }).run()}><Heading3 /></Tool>
            <Tool label="Bulleted list" active={state.bullet} onClick={() => chain().toggleBulletList().run()}><List /></Tool>
            <Tool label="Numbered list" active={state.ordered} onClick={() => chain().toggleOrderedList().run()}><ListOrdered /></Tool>
            <Tool label="Quote" active={state.quote} onClick={() => chain().toggleBlockquote().run()}><Quote /></Tool>
            <Tool label="Divider" onClick={() => chain().setHorizontalRule().run()}><Minus /></Tool>
            <Separator />
            <Tool label="Link" active={state.link} onClick={onLink}><Link2 /></Tool>
            <Tool label="Image from the media library" onClick={onImage}><ImagePlus /></Tool>
            <Separator />
            <Tool label="Undo" disabled={!state.undo} onClick={() => chain().undo().run()}><Undo2 /></Tool>
            <Tool label="Redo" disabled={!state.redo} onClick={() => chain().redo().run()}><Redo2 /></Tool>
        </div>
    );
}

function Separator() {
    return <span aria-hidden className="cms:mx-1 cms:my-1 cms:w-px cms:bg-border" />;
}

function Tool({ label, active, disabled, onClick, children }: { label: string; active?: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button type="button" variant={active ? 'secondary' : 'ghost'} size="icon" className="cms:size-8" aria-label={label}
                    aria-pressed={active === undefined ? undefined : active} disabled={disabled} onClick={onClick}
                    // A mouse click keeps the text's focus and selection, so typing goes on where it was.
                    onMouseDown={(e: React.MouseEvent) => e.preventDefault()}>
                    {children}
                </Button>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
        </Tooltip>
    );
}

function LinkDialog({ editor, open, onClose }: { editor: Editor; open: boolean; onClose: () => void }) {
    const [url, setUrl] = React.useState('');
    const [newTab, setNewTab] = React.useState(false);
    React.useEffect(() => {
        if (!open) return;
        const attributes = editor.getAttributes('link');
        setUrl(typeof attributes.href === 'string' ? attributes.href : '');
        setNewTab(attributes.target === '_blank');
    }, [open, editor]);
    const safe = url.trim() === '' || isSafeUrl(url.trim());

    const apply = () => {
        const href = url.trim();
        const chain = editor.chain().focus().extendMarkRange('link');
        (href === '' ? chain.unsetLink() : chain.setLink({ href, target: newTab ? '_blank' : null })).run();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(next: boolean) => !next && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Link</DialogTitle>
                    <DialogDescription>A web address, a path on this site (/about), mailto: or tel:. Empty removes the link.</DialogDescription>
                </DialogHeader>
                <div className="cms:flex cms:flex-col cms:gap-3">
                    <div className="cms:flex cms:flex-col cms:gap-2">
                        <Label htmlFor="rich-link-url">Address</Label>
                        <Input id="rich-link-url" value={url} placeholder="https://…" aria-invalid={!safe}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                            onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter') { e.preventDefault(); if (safe) apply(); } }} />
                        {!safe && <p className="cms:text-sm cms:text-destructive">This address could run code; use https://, a path, mailto: or tel:.</p>}
                    </div>
                    <label className="cms:flex cms:items-center cms:gap-2 cms:text-sm">
                        <Checkbox checked={newTab} onCheckedChange={(checked: boolean) => setNewTab(checked)} /> Open in a new tab
                    </label>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="button" disabled={!safe} onClick={apply}>Apply</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

interface PickedMedia { id: number; url: string; alt: string | null; title: string | null; width: number | null; height: number | null }

function ImageDialog({ editor, open, onClose }: { editor: Editor; open: boolean; onClose: () => void }) {
    const [id, setId] = React.useState<number | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    React.useEffect(() => { if (open) { setId(null); setError(null); } }, [open]);

    const insert = async () => {
        if (id === null) return;
        try {
            const response = await fetch(`${adminUrl('media/picker')}?ids[]=${id}`, { headers: { Accept: 'application/json' }, credentials: 'same-origin' });
            const item = ((await response.json()) as { items?: PickedMedia[] }).items?.[0];
            if (!response.ok || !item) throw new Error('missing');
            editor.chain().focus().setImage({ src: item.url, alt: item.alt ?? item.title ?? '', title: item.title ?? undefined }).updateAttributes('image', { 'data-media-id': String(item.id) }).run();
            onClose();
        } catch {
            setError('That file could not be loaded. Try again, or choose another.');
        }
    };

    return (
        <Dialog open={open} onOpenChange={(next: boolean) => !next && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Image</DialogTitle>
                    <DialogDescription>Choose an image from the media library. Its alt text goes with it.</DialogDescription>
                </DialogHeader>
                <MediaPickerInput id="rich-image" value={id} multiple={false} max={null} types={['image']} disabled={false} invalid={error !== null}
                    onChange={(value) => setId(typeof value === 'number' ? value : null)} />
                {error && <p className="cms:text-sm cms:text-destructive">{error}</p>}
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="button" disabled={id === null} onClick={() => void insert()}>Insert</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
