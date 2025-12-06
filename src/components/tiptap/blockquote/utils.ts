import { NodeSelection } from '@tiptap/pm/state';
import { type Editor, isNodeSelection, isTextSelection } from '@tiptap/vue-3';
import { computed } from 'vue';

import { findNodePosition, isNodeInSchema, isNodeTypeSelected, isValidPosition, parseShortcutKeys } from '@/lib/tiptap';

export interface UseBlockquoteConfig {
    editor: Editor;
}

function canToggleBlockquote(editor: Editor, turnInto = true) {
    if (!editor.isEditable) {
        return false;
    }

    if (!isNodeInSchema(editor, 'blockquote') || isNodeTypeSelected(editor, ['image'])) {
        return false;
    }

    if (!turnInto) {
        return editor.can().toggleBlockquote();
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

function isActiveBlockquote(editor: Editor) {
    if (!editor.isEditable) {
        return false;
    }
    return editor.isActive('blockquote');
}

function toggleBlockquote(editor: Editor) {
    if (!canToggleBlockquote(editor)) {
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

        if (isActiveBlockquote(editor)) {
            chain.lift('blockquote').run();
        } else {
            chain.wrapIn('blockquote').run();
        }

        editor.chain().focus().selectTextblockEnd().run();
        return true;
    } catch {
        return false;
    }
}

export function useBlockquote(config: UseBlockquoteConfig) {
    const { editor } = config;
    const canToggle = computed(() => canToggleBlockquote(editor));
    const isActive = computed(() => isActiveBlockquote(editor));
    const handleToggle = () => toggleBlockquote(editor);

    return {
        canToggle,
        isActive,
        shortcutKeys: parseShortcutKeys('mod+shift+b'),
        handleToggle,
    };
}
