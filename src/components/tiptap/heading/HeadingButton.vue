<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';

import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

import { HEADING_ICONS, HeadingLevel } from './utils';

interface Props extends ToggleProps {
    editor: Editor;
    level: HeadingLevel;
    onlyIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    onlyIcon: false,
    variant: 'default',
    size: 'sm',
});

const emits = defineEmits<{
    (e: 'update:toggle', level: HeadingLevel): void;
}>();
</script>

<template>
    <Toggle
        :class="cn('rounded!', props.class)"
        :disabled="!editor.isEditable || (level !== 0 && !editor.can().toggleHeading({ level }))"
        :model-value="level !== 0 && editor.isActive('heading', { level })"
        :size="size"
        :variant="variant"
        @click="
            () => {
                level === 0
                    ? editor.chain().focus().setParagraph().run()
                    : editor.chain().focus().toggleHeading({ level }).run();
                emits('update:toggle', level);
            }
        "
    >
        <component :is="HEADING_ICONS[level]" />
        <div v-if="level === 0" :class="cn(onlyIcon ? 'sr-only' : 'flex-1')">Paragraph</div>
        <div v-else :class="cn(onlyIcon ? 'sr-only' : 'flex-1')">Heading {{ level }}</div>
    </Toggle>
</template>
