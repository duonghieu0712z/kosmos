<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import { ButtonGroup, ButtonGroupProps } from '@/components/ui/button-group';
import { cn } from '@/lib/utils';

import MarkButton from './MarkButton.vue';
import { MarkType } from './types';

const props = withDefaults(defineProps<ButtonGroupProps & { editor: Editor; marks?: MarkType[] }>(), {
    marks: () => ['bold', 'italic', 'strike', 'underline', 'code', 'superscript', 'subscript'],
});

const delegatedProps = reactiveOmit(props, 'class', 'editor', 'marks');
</script>

<template>
    <ButtonGroup v-bind="delegatedProps" :class="cn('gap-0.5', props.class)">
        <MarkButton v-for="mark in marks" :key="mark" :editor="editor" :type="mark" />
    </ButtonGroup>
</template>
