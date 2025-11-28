<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

import type { TextAlign } from './utils';
import { canExecute, execute, getIcon, isActive } from './utils';

const props = withDefaults(
    defineProps<
        ToggleProps & {
            editor: Editor;
            align: TextAlign;
        }
    >(),
    {
        size: 'sm',
    }
);

const emits = defineEmits<{
    (e: 'update:toggle', align: TextAlign): void;
}>();

const delegatedProps = reactiveOmit(props, 'editor', 'align');
</script>

<template>
    <Toggle
        v-bind="delegatedProps"
        :class="cn('rounded!', props.class)"
        :disabled="!canExecute(editor, align)"
        :model-value="isActive(editor, align)"
        @click="
            () => {
                execute(editor, align);
                emits('update:toggle', align);
            }
        "
    >
        <component :is="getIcon(align)" />
    </Toggle>
</template>
