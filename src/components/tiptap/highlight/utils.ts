import type { Editor } from '@tiptap/vue-3';
import { computed } from 'vue';

import { isMarkInSchema, isNodeTypeSelected, parseShortcutKeys } from '@/lib/tiptap';

export interface UseHighlightConfig {
    editor: Editor;
    colors: { color: string; label: string }[];
}

function canSetColorHighlight(editor: Editor) {
    if (!editor.isEditable) {
        return false;
    }

    if (!isMarkInSchema(editor, 'highlight') || isNodeTypeSelected(editor, ['image'])) {
        return false;
    }

    return editor.can().setHighlight();
}

function getCurrentHighlight(editor: Editor) {
    const color = editor.getAttributes('highlight').color;
    if (typeof color === 'string') {
        return color;
    }

    if (color === null) {
        return 'mark';
    }

    return false;
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
    const { editor } = config;
    const canHighlight = computed(() => canSetColorHighlight(editor));
    const currentHighlight = computed(() => getCurrentHighlight(editor));
    const setHighlight = (color: string) => setColorHighlight(editor, color);
    const removeHighlight = () => removeColorHighlight(editor);

    return {
        canHighlight,
        currentHighlight,
        shortcutKeys: parseShortcutKeys('mod+shift+h'),
        setHighlight,
        removeHighlight,
    };
}
