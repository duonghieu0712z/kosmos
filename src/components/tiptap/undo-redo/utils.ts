import type { Editor } from '@tiptap/vue-3';
import { Redo, Undo } from 'lucide-vue-next';
import { computed } from 'vue';

import { isNodeTypeSelected, parseShortcutKeys } from '@/lib/tiptap';

export type UndoRedoAction = 'undo' | 'redo';

export interface UseUndoRedoConfig {
    editor: Editor;
    action: UndoRedoAction;
}

const UNDO_REDO_ICONS = {
    undo: Undo,
    redo: Redo,
} as const;

const UNDO_REDO_SHORTCUT_KEYS = {
    undo: 'mod+z',
    redo: 'mod+shift+z',
} as const;

function canExecuteAction(editor: Editor, action: UndoRedoAction) {
    if (!editor.isEditable) {
        return false;
    }

    if (isNodeTypeSelected(editor, ['image'])) {
        return false;
    }

    return editor.can()[action]();
}

function executeAction(editor: Editor, action: UndoRedoAction) {
    if (!canExecuteAction(editor, action)) {
        return false;
    }
    return editor.chain().focus()[action]().run();
}

function getLabelAction(action: UndoRedoAction) {
    return action.replace(/^./, (c) => c.toUpperCase());
}

export function useUndoRedo(config: UseUndoRedoConfig) {
    const { editor, action } = config;
    const canExecute = computed(() => canExecuteAction(editor, action));
    const handleExecute = () => executeAction(editor, action);

    return {
        canExecute,
        label: getLabelAction(action),
        icon: UNDO_REDO_ICONS[action],
        shortcutKeys: parseShortcutKeys(UNDO_REDO_SHORTCUT_KEYS[action]),
        handleExecute,
    };
}
