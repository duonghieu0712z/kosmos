<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';

import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

import { ALIGN_ICONS, TextAlign } from './types';

interface Props extends ToggleProps {
    editor: Editor;
    align: TextAlign;
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'sm',
});

const emits = defineEmits<{
    (e: 'update:toggle', align: TextAlign): void;
}>();
</script>

<template>
    <Toggle
        :class="cn('rounded!', props.class)"
        :disabled="!editor.isEditable || !editor.can().setTextAlign(align)"
        :model-value="editor.isActive({ textAlign: align })"
        :size="size"
        :variant="variant"
        @click="
            () => {
                editor.chain().focus().setTextAlign(align).run();
                emits('update:toggle', align);
            }
        "
    >
        <component :is="ALIGN_ICONS[align]" />
    </Toggle>
</template>
