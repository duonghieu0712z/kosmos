import type { Editor } from '@tiptap/vue-3';
import { Bold, Code2, Italic, Strikethrough, Subscript, Superscript, Underline } from 'lucide-vue-next';

import { isMarkInSchema, isNodeTypeSelected, parseShortcutKeys } from '@/lib/tiptap';

export type MarkType = 'bold' | 'italic' | 'underline' | 'strike' | 'code' | 'superscript' | 'subscript';

const MARK_ICONS = {
    bold: Bold,
    italic: Italic,
    underline: Underline,
    strike: Strikethrough,
    code: Code2,
    superscript: Superscript,
    subscript: Subscript,
} as const;

const MARK_SHORTCUTS = {
    bold: 'mod+b',
    italic: 'mod+i',
    underline: 'mod+u',
    strike: 'mod+shift+s',
    code: 'mod+e',
    superscript: 'mod+.',
    subscript: 'mod+,',
} as const;

export function canExecute(editor: Editor, type: MarkType) {
    if (!editor.isEditable) {
        return false;
    }

    if (!isMarkInSchema(editor, type) || isNodeTypeSelected(editor, ['image'])) {
        return false;
    }

    return editor.can().toggleMark(type);
}

export function isActive(editor: Editor, type: MarkType) {
    if (!editor.isEditable) {
        return false;
    }
    return editor.isActive(type);
}

export function execute(editor: Editor, type: MarkType) {
    if (!canExecute(editor, type)) {
        return false;
    }
    return editor.chain().focus().toggleMark(type).run();
}

export function getIcon(type: MarkType) {
    return MARK_ICONS[type];
}

export function getLabel(type: MarkType) {
    return type.replace(/^./, (c) => c.toUpperCase());
}

export function getShortcutKeys(type: MarkType) {
    return parseShortcutKeys(MARK_SHORTCUTS[type]);
}
