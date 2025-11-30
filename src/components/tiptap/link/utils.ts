import type { Editor } from '@tiptap/vue-3';
import { Link } from 'lucide-vue-next';

const LINK_LABEL = 'Link';

export function canExecute(editor: Editor) {
    if (!editor.isEditable) {
        return false;
    }
    return editor.can().setMark('link');
}

export function isActive(editor: Editor) {
    if (!editor.isEditable) {
        return false;
    }
    return editor.isActive('link');
}

export function getIcon() {
    return Link;
}

export function getLabel() {
    return LINK_LABEL;
}
