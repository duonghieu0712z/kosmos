<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { UndoRedoType } from './utils';
import { canExecute, execute, getIcon } from './utils';

const props = withDefaults(
    defineProps<
        ButtonProps & {
            editor: Editor;
            type: UndoRedoType;
        }
    >(),
    {
        variant: 'ghost',
        size: 'icon-sm',
    }
);

const emits = defineEmits<{
    (e: 'update:action', type: UndoRedoType): void;
}>();

const delegatedProps = reactiveOmit(props, 'editor', 'type');
</script>

<template>
    <Button
        v-bind="delegatedProps"
        :class="cn('rounded!', props.class)"
        :disabled="!canExecute(editor, type)"
        @click="
            () => {
                execute(editor, type);
                emits('update:action', type);
            }
        "
    >
        <component :is="getIcon(type)" />
    </Button>
</template>
