<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import type { ButtonGroupProps } from '@/components/ui/button-group';
import { ButtonGroup } from '@/components/ui/button-group';

import MarkButton from './MarkButton.vue';
import type { MarkType } from './utils';

const props = withDefaults(
    defineProps<
        ButtonGroupProps & {
            editor: Editor;
            marks?: MarkType[];
        }
    >(),
    {
        marks: () => ['bold', 'italic', 'underline', 'strike'],
        spacing: 'spaced',
    },
);

const delegatedProps = reactiveOmit(props, 'editor', 'marks');
</script>

<template>
    <ButtonGroup v-bind="delegatedProps">
        <MarkButton v-for="mark in marks" :key="mark" :editor="editor" :mark="mark" />
    </ButtonGroup>
</template>
