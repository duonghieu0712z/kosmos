import type { Editor } from '@tiptap/vue-3';
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-vue-next';
import { computed } from 'vue';

import { isNodeTypeSelected, parseShortcutKeys } from '@/lib/tiptap';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export interface UseTextAlignConfig {
    editor: Editor;
    align: TextAlign;
}

export interface UseTextAlignsConfig {
    editor: Editor;
    aligns: TextAlign[];
}

const TEXT_ALIGN_ICONS = {
    left: AlignLeftIcon,
    center: AlignCenterIcon,
    right: AlignRightIcon,
    justify: AlignJustifyIcon,
} as const;

const TEXT_ALIGN_SHORTCUT_KEYS = {
    left: 'mod+shift+l',
    center: 'mod+shift+e',
    right: 'mod+shift+r',
    justify: 'mod+shift+j',
} as const;

function canSetTextAlign(editor: Editor, align: TextAlign) {
    if (!editor.isEditable) {
        return false;
    }

    if (isNodeTypeSelected(editor, ['image', 'horizontalRule'])) {
        return false;
    }

    return editor.can().setTextAlign(align);
}

function canSetAnyTextAlign(editor: Editor, aligns: TextAlign[]) {
    if (!editor.isEditable) {
        return false;
    }
    return aligns.some((align) => canSetTextAlign(editor, align));
}

function isActiveTextAlign(editor: Editor, align: TextAlign) {
    if (!editor.isEditable) {
        return false;
    }
    return editor.isActive({ textAlign: align });
}

function setTextAlign(editor: Editor, align: TextAlign) {
    if (!canSetTextAlign(editor, align)) {
        return false;
    }
    return editor.chain().focus().setTextAlign(align).run();
}

function getCurrentTextAlign(editor: Editor): TextAlign {
    return editor.getAttributes('paragraph').textAlign ?? editor.getAttributes('heading').textAlign ?? 'left';
}

function getLabelTextAlign(align: TextAlign) {
    return `Align ${align}`;
}

export function useTextAlign(config: UseTextAlignConfig) {
    const { editor, align } = config;
    const canAlign = computed(() => canSetTextAlign(editor, align));
    const isActive = computed(() => isActiveTextAlign(editor, align));
    const handleAlign = () => setTextAlign(editor, align);

    return {
        canAlign,
        isActive,
        label: getLabelTextAlign(align),
        icon: TEXT_ALIGN_ICONS[align],
        shortcutKeys: parseShortcutKeys(TEXT_ALIGN_SHORTCUT_KEYS[align]),
        handleAlign,
    };
}

export function useTextAligns(config: UseTextAlignsConfig) {
    const { editor, aligns } = config;
    const canAlign = computed(() => canSetAnyTextAlign(editor, aligns));
    const icon = computed(() => TEXT_ALIGN_ICONS[getCurrentTextAlign(editor)]);

    return {
        canAlign,
        icon,
    };
}
