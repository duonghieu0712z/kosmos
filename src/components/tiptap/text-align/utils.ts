import type { Editor } from '@tiptap/vue-3';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-vue-next';

import { isNodeTypeSelected } from '@/lib/tiptap';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

const ALIGN_ICONS = {
    left: AlignLeft,
    center: AlignCenter,
    right: AlignRight,
    justify: AlignJustify,
} as const;

export function canExecute(editor: Editor, align: TextAlign) {
    if (!editor.isEditable) {
        return false;
    }

    if (isNodeTypeSelected(editor, ['image', 'horizontalRule'])) {
        return false;
    }

    return editor.can().setTextAlign(align);
}

export function canExecuteAny(editor: Editor, aligns: TextAlign[]) {
    if (!editor.isEditable) {
        return false;
    }
    return aligns.some((align) => canExecute(editor, align));
}

export function isActive(editor: Editor, align: TextAlign) {
    if (!editor.isEditable) {
        return false;
    }
    return editor.isActive({ textAlign: align });
}

export function isActiveAny(editor: Editor, aligns: TextAlign[]) {
    if (!editor.isEditable) {
        return false;
    }
    return aligns.some((align) => isActive(editor, align));
}

export function execute(editor: Editor, align: TextAlign) {
    if (!canExecute(editor, align)) {
        return false;
    }
    return editor.chain().focus().setTextAlign(align).run();
}

function getCurrent(editor: Editor): TextAlign {
    return editor.getAttributes('paragraph').textAlign ?? editor.getAttributes('heading').textAlign ?? 'left';
}

export function getIcon(align: TextAlign) {
    return ALIGN_ICONS[align];
}

export function getCurrentIcon(editor: Editor) {
    return getIcon(getCurrent(editor));
}
