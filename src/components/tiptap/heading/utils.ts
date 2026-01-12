import type { Editor } from '@tiptap/vue-3';
import { isTextSelection } from '@tiptap/vue-3';
import {
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    Heading4Icon,
    Heading5Icon,
    Heading6Icon,
    HeadingIcon,
} from 'lucide-vue-next';
import { computed } from 'vue';

import { findNodePosition, isNodeInSchema, isNodeTypeSelected, isValidPosition, parseShortcutKeys } from '@/lib/tiptap';

export type HeadingLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface UseHeadingConfig {
    editor: Editor;
    level: HeadingLevel;
}

export interface UseHeadingsConfig {
    editor: Editor;
    levels: HeadingLevel[];
}

const HEADING_ICONS = [
    HeadingIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    Heading4Icon,
    Heading5Icon,
    Heading6Icon,
] as const;

function canToggleHeading(editor: Editor, level: HeadingLevel, turnInto = true) {
    if (!editor.isEditable) {
        return false;
    }

    if (!isNodeInSchema(editor, 'heading') || isNodeTypeSelected(editor, ['image'])) {
        return false;
    }

    if (!turnInto) {
        return level === 0 ? editor.can().setParagraph() : editor.can().toggleHeading({ level });
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

function canToggleAnyHeading(editor: Editor, levels: HeadingLevel[]) {
    if (!editor.isEditable) {
        return false;
    }
    return levels.some((level) => level !== 0 && canToggleHeading(editor, level));
}

function isActiveHeading(editor: Editor, level: HeadingLevel) {
    if (!editor.isEditable) {
        return false;
    }
    return level !== 0 && editor.isActive('heading', { level });
}

function isActiveAnyHeading(editor: Editor, levels: HeadingLevel[]) {
    if (!editor.isEditable) {
        return false;
    }
    return levels.some((level) => level !== 0 && isActiveHeading(editor, level));
}

function toggleHeading(editor: Editor, level: HeadingLevel) {
    if (!canToggleHeading(editor, level)) {
        return false;
    }

    if (level === 0) {
        return editor.chain().focus().setParagraph().run();
    }

    return editor.chain().focus().toggleHeading({ level }).run();
}

function getCurrentHeading(editor: Editor): HeadingLevel {
    return editor.getAttributes('heading').level ?? 0;
}

function getLabelHeading(level: HeadingLevel) {
    return level === 0 ? 'Paragraph' : `Heading ${level}`;
}

export function useHeading(config: UseHeadingConfig) {
    const { editor, level } = config;
    const canToggle = computed(() => canToggleHeading(editor, level));
    const isActive = computed(() => isActiveHeading(editor, level));
    const handleToggle = () => toggleHeading(editor, level);

    return {
        canToggle,
        isActive,
        label: getLabelHeading(level),
        icon: HEADING_ICONS[level],
        shortcutKeys: parseShortcutKeys(`mod+alt+${level}`),
        handleToggle,
    };
}

export function useHeadings(config: UseHeadingsConfig) {
    const { editor, levels } = config;
    const canToggle = computed(() => canToggleAnyHeading(editor, levels));
    const isActive = computed(() => isActiveAnyHeading(editor, levels));
    const icon = computed(() => HEADING_ICONS[getCurrentHeading(editor)]);

    return {
        canToggle,
        isActive,
        icon,
    };
}
