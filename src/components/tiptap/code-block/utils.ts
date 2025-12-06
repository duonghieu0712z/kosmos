import { NodeSelection } from '@tiptap/pm/state';
import type { Editor } from '@tiptap/vue-3';
import { isNodeSelection, isTextSelection } from '@tiptap/vue-3';
import { computed } from 'vue';

import { findNodePosition, isNodeInSchema, isNodeTypeSelected, isValidPosition, parseShortcutKeys } from '@/lib/tiptap';

export interface UseCodeBlockConfig {
    editor: Editor;
}

function canToggleCodeBlock(editor: Editor, turnInto = true) {
    if (!editor.isEditable) {
        return false;
    }

    if (!isNodeInSchema(editor, 'codeBlock') || isNodeTypeSelected(editor, ['image'])) {
        return false;
    }

    if (!turnInto) {
        return editor.can().toggleCodeBlock();
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

function isActiveCodeBlock(editor: Editor) {
    if (!editor.isEditable) {
        return false;
    }
    return editor.isActive('codeBlock');
}

function toggleCodeBlock(editor: Editor) {
    if (!canToggleCodeBlock(editor)) {
        return false;
    }

    try {
        const view = editor.view;
        const state = view.state;
        let tr = state.tr;
        let selection = state.selection;

        if (selection.empty || isTextSelection(selection)) {
            const pos = findNodePosition(editor, { node: selection.$anchor.node(1) })?.pos;
            if (!isValidPosition(pos)) {
                return false;
            }

            tr = tr.setSelection(NodeSelection.create(state.doc, pos));
            view.dispatch(tr);
            selection = view.state.selection;
        }

        let chain = editor.chain().focus();
        if (isNodeSelection(selection)) {
            const firstChild = selection.node.firstChild?.firstChild;
            const lastChild = selection.node.lastChild?.lastChild;

            const from = firstChild ? selection.from + firstChild.nodeSize : selection.from + 1;
            const to = lastChild ? selection.to - lastChild.nodeSize : selection.to - 1;

            chain = chain.setTextSelection({ from, to }).clearNodes();
        }

        if (isActiveCodeBlock(editor)) {
            chain.setParagraph().run();
        } else {
            chain.setCodeBlock().run();
        }

        editor.chain().focus().selectTextblockEnd().run();
        return true;
    } catch {
        return false;
    }
}

export function useCodeBlock(config: UseCodeBlockConfig) {
    const { editor } = config;
    const canToggle = computed(() => canToggleCodeBlock(editor));
    const isActive = computed(() => isActiveCodeBlock(editor));
    const handleToggle = () => toggleCodeBlock(editor);

    return {
        canToggle,
        isActive,
        shortcutKeys: parseShortcutKeys('mod+alt+c'),
        handleToggle,
    };
}
