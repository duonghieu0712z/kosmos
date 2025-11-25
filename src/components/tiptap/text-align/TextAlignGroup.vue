<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import { ButtonGroup, ButtonGroupProps } from '@/components/ui/button-group';
import { cn } from '@/lib/utils';

import TextAlignButton from './TextAlignButton.vue';
import type { TextAlign } from './types';

const props = withDefaults(
    defineProps<
        ButtonGroupProps & {
            editor: Editor;
            aligns?: TextAlign[];
            inDropdown?: boolean;
        }
    >(),
    { aligns: () => ['left', 'center', 'right', 'justify'] }
);

const delegatedProps = reactiveOmit(props, 'class', 'editor', 'aligns');
</script>

<template>
    <ButtonGroup v-bind="delegatedProps" :class="cn('gap-0.5', props.class)">
        <TextAlignButton v-for="align in aligns" :key="align" :align="align" :editor="editor" />
    </ButtonGroup>
</template>
