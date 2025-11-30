import type { Editor } from '@tiptap/vue-3';
import { isTextSelection } from '@tiptap/vue-3';
import { Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from 'lucide-vue-next';

import { findNodePosition, isNodeInSchema, isNodeTypeSelected, isValidPosition, parseShortcutKeys } from '@/lib/tiptap';

export type HeadingLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const HEADING_ICONS = [Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6] as const;

export function canExecute(editor: Editor, level: HeadingLevel, turnInto = true) {
    if (!editor.isEditable) {
        return false;
    }

    if (!isNodeInSchema(editor, 'heading') || isNodeTypeSelected(editor, ['image'])) {
        return false;
    }

    if (!turnInto) {
        return level === 0 ? editor.can().setParagraph() : editor.can().toggleHeading({ level });
    }

    try {
        const selection = editor.view.state.selection;
        if (selection.empty || isTextSelection(selection)) {
            const pos = findNodePosition(editor, { node: selection.$anchor.node(1) })?.pos;
            if (!isValidPosition(pos)) {
                return false;
            }
        }
        return true;
    } catch {
        return false;
    }
}

export function canExecuteAny(editor: Editor, levels: HeadingLevel[]) {
    if (!editor.isEditable) {
        return false;
    }
    return levels.some((level) => level !== 0 && canExecute(editor, level));
}

export function isActive(editor: Editor, level: HeadingLevel) {
    if (!editor.isEditable) {
        return false;
    }
    return level !== 0 && editor.isActive('heading', { level });
}

export function isActiveAny(editor: Editor, levels: HeadingLevel[]) {
    if (!editor.isEditable) {
        return false;
    }
    return levels.some((level) => level !== 0 && isActive(editor, level));
}

export function execute(editor: Editor, level: HeadingLevel) {
    if (!canExecute(editor, level)) {
        return false;
    }

    if (level === 0) {
        return editor.chain().focus().setParagraph().run();
    }

    return editor.chain().focus().toggleHeading({ level }).run();
}

function getCurrent(editor: Editor): HeadingLevel {
    return editor.getAttributes('heading').level ?? 0;
}

export function getIcon(level: HeadingLevel) {
    return HEADING_ICONS[level];
}

export function getCurrentIcon(editor: Editor) {
    return getIcon(getCurrent(editor));
}

export function getLabel(level: HeadingLevel) {
    return level === 0 ? 'Paragraph' : `Heading ${level}`;
}

export function getShortcutKeys(level: HeadingLevel) {
    return parseShortcutKeys(`mod+alt+${level}`);
}
