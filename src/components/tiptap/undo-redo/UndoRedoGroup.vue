<!-- COMMENTED BY ANTIGRAVITY FOR CLEANUP
<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import type { ButtonGroupProps } from '@/components/ui/button-group';
import { ButtonGroup } from '@/components/ui/button-group';

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
        spacing: 'spaced',
    },
);

const delegatedProps = reactiveOmit(props, 'editor', 'actions');
</script>

<template>
    <ButtonGroup v-bind="delegatedProps">
        <UndoRedoButton v-for="action in actions" :key="action" :action="action" :editor="editor" />
    </ButtonGroup>
</template>
-->
