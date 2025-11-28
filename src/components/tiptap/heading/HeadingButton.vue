<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

import type { HeadingLevel } from './utils';
import { getIcon } from './utils';

const props = withDefaults(
    defineProps<
        ToggleProps & {
            editor: Editor;
            level: HeadingLevel;
        }
    >(),
    {
        size: 'sm',
    }
);

const emits = defineEmits<{
    (e: 'update:toggle', level: HeadingLevel): void;
}>();

const delegatedProps = reactiveOmit(props, 'editor', 'level');
</script>

<template>
    <Toggle
        v-bind="delegatedProps"
        :class="cn('rounded!', props.class)"
        :disabled="!editor.isEditable || (level !== 0 && !editor.can().toggleHeading({ level }))"
        :model-value="level !== 0 && editor.isActive('heading', { level })"
        @click="
            () => {
                level === 0
                    ? editor.chain().focus().setParagraph().run()
                    : editor.chain().focus().toggleHeading({ level }).run();
                emits('update:toggle', level);
            }
        "
    >
        <component :is="getIcon(level)" />
        <div v-if="level === 0" class="flex-1">Paragraph</div>
        <div v-else class="flex-1">Heading {{ level }}</div>
    </Toggle>
</template>
