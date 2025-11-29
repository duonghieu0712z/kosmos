import { NodeSelection } from '@tiptap/pm/state';
import type { Editor } from '@tiptap/vue-3';
import { isNodeSelection, isTextSelection } from '@tiptap/vue-3';
import { List, ListChecks, ListOrdered } from 'lucide-vue-next';

import { findNodePosition, isNodeInSchema, isNodeTypeSelected, isValidPosition, parseShortcutKeys } from '@/lib/tiptap';

export type ListType = 'bullet' | 'ordered' | 'task';

const LIST_ICONS = {
    bullet: List,
    ordered: ListOrdered,
    task: ListChecks,
} as const;

const LIST_SHORTCUTS = {
    bullet: 'mod+shift+8',
    ordered: 'mod+shift+7',
    task: 'mod+shift+9',
} as const;

export function canExecute(editor: Editor, type: ListType, turnInto = true) {
    if (!editor.isEditable) {
        return false;
    }

    if (!isNodeInSchema(editor, `${type}List`) || isNodeTypeSelected(editor, ['image'])) {
        return false;
    }

    if (!turnInto) {
        switch (type) {
            case 'bullet':
                return editor.can().toggleBulletList();
            case 'ordered':
                return editor.can().toggleOrderedList();
            case 'task':
                return editor.can().toggleTaskList();
            default:
                return false;
        }
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

export function canExecuteAny(editor: Editor, lists: ListType[]) {
    if (!editor.isEditable) {
        return false;
    }
    return lists.some((type) => canExecute(editor, type));
}

export function isActive(editor: Editor, type: ListType) {
    if (!editor.isEditable) {
        return false;
    }
    return editor.isActive(`${type}List`);
}

export function isActiveAny(editor: Editor, lists: ListType[]) {
    if (!editor.isEditable) {
        return false;
    }
    return lists.some((type) => isActive(editor, type));
}

export function execute(editor: Editor, type: ListType) {
    if (!canExecute(editor, type)) {
        return false;
    }

    try {
        const view = editor.view;
        const state = view.state;
        let selection = state.selection;
        let tr = state.tr;

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

        if (isActive(editor, type)) {
            chain.liftListItem('listItem').lift('bulletList').lift('orderedList').lift('taskList').run();
        } else {
            switch (type) {
                case 'bullet':
                    chain.toggleBulletList().run();
                    break;
                case 'ordered':
                    chain.toggleOrderedList().run();
                    break;
                case 'task':
                    chain.toggleTaskList().run();
                    break;
            }
        }

        editor.chain().focus().selectTextblockEnd().run();
        return true;
    } catch {
        return false;
    }
}

function getCurrent(editor: Editor): ListType {
    if (!editor.isEditable) {
        return 'bullet';
    }

    if (editor.isActive('orderedList')) {
        return 'ordered';
    }

    if (editor.isActive('taskList')) {
        return 'task';
    }

    return 'bullet';
}

export function getIcon(type: ListType) {
    return LIST_ICONS[type];
}

export function getCurrentIcon(editor: Editor) {
    return getIcon(getCurrent(editor));
}

export function getLabel(type: ListType) {
    return `${type.replace(/^./, (c) => c.toUpperCase())} list`;
}

export function getShortcutKeys(type: ListType) {
    return parseShortcutKeys(LIST_SHORTCUTS[type]);
}
