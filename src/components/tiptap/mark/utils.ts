import type { Editor } from '@tiptap/vue-3';
import {
    BoldIcon,
    Code2Icon,
    ItalicIcon,
    StrikethroughIcon,
    SubscriptIcon,
    SuperscriptIcon,
    UnderlineIcon,
} from 'lucide-vue-next';
import { computed } from 'vue';

import { isMarkInSchema, isNodeTypeSelected, parseShortcutKeys } from '@/lib/tiptap';

export type MarkType = 'bold' | 'italic' | 'underline' | 'strike' | 'code' | 'superscript' | 'subscript';

export interface UseMarkConfig {
    editor: Editor;
    mark: MarkType;
}

const MARK_ICONS = {
    bold: BoldIcon,
    italic: ItalicIcon,
    underline: UnderlineIcon,
    strike: StrikethroughIcon,
    code: Code2Icon,
    superscript: SuperscriptIcon,
    subscript: SubscriptIcon,
} as const;

const MARK_SHORTCUT_KEYS = {
    bold: 'mod+b',
    italic: 'mod+i',
    underline: 'mod+u',
    strike: 'mod+shift+s',
    code: 'mod+e',
    superscript: 'mod+.',
    subscript: 'mod+,',
} as const;

function canToggleMark(editor: Editor, mark: MarkType) {
    if (!editor.isEditable) {
        return false;
    }

    if (!isMarkInSchema(editor, mark) || isNodeTypeSelected(editor, ['image'])) {
        return false;
    }

    return editor.can().toggleMark(mark);
}

function isActiveMark(editor: Editor, mark: MarkType) {
    if (!editor.isEditable) {
        return false;
    }
    return editor.isActive(mark);
}

function toggleMark(editor: Editor, mark: MarkType) {
    if (!canToggleMark(editor, mark)) {
        return false;
    }
    return editor.chain().focus().toggleMark(mark).run();
}

function getLabelMark(type: MarkType) {
    return type.replace(/^./, (c) => c.toUpperCase());
}

export function useMark(config: UseMarkConfig) {
    const { editor, mark } = config;
    const canToggle = computed(() => canToggleMark(editor, mark));
    const isActive = computed(() => isActiveMark(editor, mark));
    const handleToggle = () => toggleMark(editor, mark);

    return {
        canToggle,
        isActive,
        label: getLabelMark(mark),
        icon: MARK_ICONS[mark],
        shortcutKeys: parseShortcutKeys(MARK_SHORTCUT_KEYS[mark]),
        handleToggle,
    };
}
