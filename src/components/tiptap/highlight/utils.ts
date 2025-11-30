import type { Editor } from '@tiptap/vue-3';
import { Highlighter } from 'lucide-vue-next';

import { isMarkInSchema, isNodeTypeSelected, parseShortcutKeys } from '@/lib/tiptap';

const HIGHLIGHT_LABEL = 'Highlight';
const HIGHLIGHT_SHORTCUT = 'mod+shift+h';

export function canExecute(editor: Editor) {
    if (!editor.isEditable) {
        return false;
    }

    if (!isMarkInSchema(editor, 'highlight') || isNodeTypeSelected(editor, ['image'])) {
        return false;
    }

    return editor.can().setHighlight();
}

export function isActive(editor: Editor, color?: string) {
    if (!editor.isEditable) {
        return false;
    }
    return color ? editor.isActive('highlight', { color }) : editor.isActive('highlight');
}

export function setHighlight(editor: Editor, color: string) {
    if (!canExecute(editor)) {
        return false;
    }

    if (editor.state.storedMarks) {
        const highlight = editor.schema.marks.highlight;
        if (highlight) {
            editor.view.dispatch(editor.state.tr.removeStoredMark(highlight));
        }
    }

    return editor.chain().focus().toggleHighlight({ color }).run();
}

export function unsetHighlight(editor: Editor) {
    if (!canExecute(editor)) {
        return false;
    }
    return editor.chain().focus().unsetHighlight().run();
}

export function getIcon() {
    return Highlighter;
}

export function getLabel(label?: string) {
    return label ?? HIGHLIGHT_LABEL;
}

export function getShortcutKeys() {
    return parseShortcutKeys(HIGHLIGHT_SHORTCUT);
}
