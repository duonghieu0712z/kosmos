import type { Editor } from '@tiptap/vue-3';
import { Redo, Undo } from 'lucide-vue-next';

import { isNodeTypeSelected } from '@/lib/tiptap';

export type UndoRedoType = 'undo' | 'redo';

const UNDO_REDO_ICONS = {
    undo: Undo,
    redo: Redo,
} as const;

export function canExecute(editor: Editor, type: UndoRedoType) {
    if (!editor.isEditable) {
        return false;
    }

    if (isNodeTypeSelected(editor, ['image'])) {
        return false;
    }

    return editor.can()[type]();
}

export function execute(editor: Editor, type: UndoRedoType) {
    if (!canExecute(editor, type)) {
        return false;
    }
    return editor.chain().focus()[type]().run();
}

export function getIcon(type: UndoRedoType) {
    return UNDO_REDO_ICONS[type];
}
