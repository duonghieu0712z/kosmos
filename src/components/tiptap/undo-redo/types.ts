import { Redo, Undo } from 'lucide-vue-next';

export type UndoRedoType = 'undo' | 'redo';

export const UNDO_REDO_ICONS = {
    undo: Undo,
    redo: Redo,
} as const;
