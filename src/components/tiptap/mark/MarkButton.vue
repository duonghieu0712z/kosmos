<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';

import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

import { MARK_ICONS, MarkType } from './types';

interface Props extends ToggleProps {
    editor: Editor;
    type: MarkType;
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'sm',
});

const emits = defineEmits<{
    (e: 'update:toggle', type: MarkType): void;
}>();
</script>

<template>
    <Toggle
        :class="cn('rounded!', props.class)"
        :disabled="!editor.isEditable || !editor.can().toggleMark(type)"
        :model-value="editor.isActive(type)"
        :size="size"
        :variant="variant"
        @click="
            () => {
                editor.chain().focus().toggleMark(type).run();
                emits('update:toggle', type);
            }
        "
    >
        <component :is="MARK_ICONS[type]" />
    </Toggle>
</template>
