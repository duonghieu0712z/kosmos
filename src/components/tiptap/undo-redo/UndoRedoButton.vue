<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { UNDO_REDO_ICONS, UndoRedoType } from './types';

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
</script>

<template>
    <Button
        :class="cn('rounded!', props.class)"
        :disabled="!editor.isEditable || !editor.can()[type]()"
        :size="size"
        :variant="variant"
        @click="
            () => {
                editor.chain().focus()[type]().run();
                emits('update:action', type);
            }
        "
    >
        <component :is="UNDO_REDO_ICONS[type]" />
    </Button>
</template>
