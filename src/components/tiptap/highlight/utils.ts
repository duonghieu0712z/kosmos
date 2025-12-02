import type { Editor } from '@tiptap/vue-3';
import { Highlighter } from 'lucide-vue-next';
import { computed } from 'vue';

import { isMarkInSchema, isNodeTypeSelected, parseShortcutKeys } from '@/lib/tiptap';

export interface UseHighlightConfig {
    editor: Editor;
    color: string;
}

const HIGHLIGHT_LABEL = 'Highlight';
const HIGHLIGHT_SHORTCUT_KEY = 'mod+shift+h';

function canSetColorHighlight(editor: Editor) {
    if (!editor.isEditable) {
        return false;
    }

    if (!isMarkInSchema(editor, 'highlight') || isNodeTypeSelected(editor, ['image'])) {
        return false;
    }

    return editor.can().setHighlight();
}

function isActiveColorHighlight(editor: Editor, color?: string) {
    if (!editor.isEditable) {
        return false;
    }
    return color ? editor.isActive('highlight', { color }) : editor.isActive('highlight');
}

function setColorHighlight(editor: Editor, color: string) {
    if (!canSetColorHighlight(editor)) {
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

function removeColorHighlight(editor: Editor) {
    if (!canSetColorHighlight(editor)) {
        return false;
    }
    return editor.chain().focus().unsetHighlight().run();
}

export function useHighlight(config: UseHighlightConfig) {
    const { editor, color } = config;
    const canHighlight = computed(() => canSetColorHighlight(editor));
    const isActive = computed(() => isActiveColorHighlight(editor, color));
    const setHighlight = () => setColorHighlight(editor, color);
    const removeHighlight = () => removeColorHighlight(editor);

    return {
        canHighlight,
        isActive,
        label: HIGHLIGHT_LABEL,
        icon: Highlighter,
        shortcutKeys: parseShortcutKeys(HIGHLIGHT_SHORTCUT_KEY),
        setHighlight,
        removeHighlight,
    };
}
