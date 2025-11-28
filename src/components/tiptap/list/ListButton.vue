<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

import type { ListType } from './utils';
import { canExecute, execute, getIcon, isActive } from './utils';

const props = withDefaults(
    defineProps<
        ToggleProps & {
            editor: Editor;
            type: ListType;
        }
    >(),
    {
        size: 'sm',
    }
);

const emits = defineEmits<{
    (e: 'update:toggle', type: ListType): void;
}>();

const delegatedProps = reactiveOmit(props, 'editor', 'type');
</script>

<template>
    <Toggle
        v-bind="delegatedProps"
        :class="cn('rounded!', props.class)"
        :disabled="!canExecute(editor, type)"
        :model-value="isActive(editor, type)"
        @click="
            () => {
                execute(editor, type);
                emits('update:toggle', type);
            }
        "
    >
        <component :is="getIcon(type)" />
    </Toggle>
</template>
