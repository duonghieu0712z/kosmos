<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import type { ButtonGroupProps } from '@/components/ui/button-group';
import { ButtonGroup } from '@/components/ui/button-group';
import { cn } from '@/lib/utils';

import type { UndoRedoType } from './types';
import UndoRedoButton from './UndoRedoButton.vue';

const props = withDefaults(
    defineProps<
        ButtonGroupProps & {
            editor: Editor;
            types?: UndoRedoType[];
        }
    >(),
    {
        types: () => ['undo', 'redo'],
    }
);

const delegatedProps = reactiveOmit(props, 'editor', 'types');
</script>

<template>
    <ButtonGroup v-bind="delegatedProps" :class="cn('gap-0.5', props.class)">
        <UndoRedoButton v-for="type in types" :key="type" :editor="editor" :type="type" />
    </ButtonGroup>
</template>
