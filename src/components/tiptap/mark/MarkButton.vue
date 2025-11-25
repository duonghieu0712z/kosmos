<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

import type { MarkType } from './types';
import { MARK_ICONS } from './types';

const props = withDefaults(
    defineProps<
        ToggleProps & {
            editor: Editor;
            type: MarkType;
        }
    >(),
    {
        size: 'sm',
    }
);

const emits = defineEmits<{
    (e: 'update:toggle', type: MarkType): void;
}>();

const delegatedProps = reactiveOmit(props, 'editor', 'type');
</script>

<template>
    <Toggle
        v-bind="delegatedProps"
        :class="cn('rounded!', props.class)"
        :disabled="!editor.isEditable || !editor.can().toggleMark(type)"
        :model-value="editor.isActive(type)"
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
