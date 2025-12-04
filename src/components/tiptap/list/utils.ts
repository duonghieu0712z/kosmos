import type { Editor } from '@tiptap/vue-3';
import { isTextSelection } from '@tiptap/vue-3';
import { List, ListChecks, ListOrdered } from 'lucide-vue-next';
import { computed } from 'vue';

import { findNodePosition, isNodeInSchema, isNodeTypeSelected, isValidPosition, parseShortcutKeys } from '@/lib/tiptap';

export type ListType = 'bullet' | 'ordered' | 'task';

export interface UseListConfig {
    editor: Editor;
    list: ListType;
}

export interface UseListsConfig {
    editor: Editor;
    lists: ListType[];
}

const LIST_ICONS = {
    bullet: List,
    ordered: ListOrdered,
    task: ListChecks,
} as const;

const LIST_SHORTCUT_KEYS = {
    bullet: 'mod+shift+8',
    ordered: 'mod+shift+7',
    task: 'mod+shift+9',
} as const;

function canToggleList(editor: Editor, list: ListType, turnInto = true) {
    if (!editor.isEditable) {
        return false;
    }

    if (!isNodeInSchema(editor, `${list}List`) || isNodeTypeSelected(editor, ['image'])) {
        return false;
    }

    if (!turnInto) {
        switch (list) {
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

function canToggleAnyList(editor: Editor, lists: ListType[]) {
    if (!editor.isEditable) {
        return false;
    }
    return lists.some((list) => canToggleList(editor, list));
}

function isActiveList(editor: Editor, list: ListType) {
    if (!editor.isEditable) {
        return false;
    }
    return editor.isActive(`${list}List`);
}

function isActiveAnyList(editor: Editor, lists: ListType[]) {
    if (!editor.isEditable) {
        return false;
    }
    return lists.some((list) => isActiveList(editor, list));
}

function toggleList(editor: Editor, list: ListType) {
    if (!canToggleList(editor, list)) {
        return false;
    }

    switch (list) {
        case 'bullet':
            return editor.chain().focus().toggleBulletList().run();
        case 'ordered':
            return editor.chain().focus().toggleOrderedList().run();
        case 'task':
            return editor.chain().focus().toggleTaskList().run();
        default:
            return false;
    }
}

function getCurrentList(editor: Editor): ListType {
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

function getLabelList(list: ListType) {
    return `${list.replace(/^./, (c) => c.toUpperCase())} list`;
}

export function useList(config: UseListConfig) {
    const { editor, list } = config;
    const canToggle = computed(() => canToggleList(editor, list));
    const isActive = computed(() => isActiveList(editor, list));
    const handleToggle = () => toggleList(editor, list);

    return {
        canToggle,
        isActive,
        label: getLabelList(list),
        icon: LIST_ICONS[list],
        shortcutKeys: parseShortcutKeys(LIST_SHORTCUT_KEYS[list]),
        handleToggle,
    };
}

export function useLists(config: UseListsConfig) {
    const { editor, lists } = config;
    const canToggle = computed(() => canToggleAnyList(editor, lists));
    const isActive = computed(() => isActiveAnyList(editor, lists));
    const icon = computed(() => LIST_ICONS[getCurrentList(editor)]);

    return {
        canToggle,
        isActive,
        icon,
    };
}
