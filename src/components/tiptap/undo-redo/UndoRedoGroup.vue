<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import type { ButtonGroupProps } from '@/components/ui/button-group';
import { ButtonGroup } from '@/components/ui/button-group';
import { cn } from '@/lib/utils';

import UndoRedoButton from './UndoRedoButton.vue';
import type { UndoRedoAction } from './utils';

const props = withDefaults(
    defineProps<
        ButtonGroupProps & {
            editor: Editor;
            actions?: UndoRedoAction[];
        }
    >(),
    {
        actions: () => ['undo', 'redo'],
        orientation: 'horizontal-rounded',
    },
);

const delegatedProps = reactiveOmit(props, 'editor', 'actions');
</script>

<template>
    <ButtonGroup v-bind="delegatedProps" :class="cn('gap-0.5', props.class)">
        <UndoRedoButton v-for="action in actions" :key="action" :action="action" :editor="editor" />
    </ButtonGroup>
</template>
