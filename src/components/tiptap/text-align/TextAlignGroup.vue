<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import type { ButtonGroupProps } from '@/components/ui/button-group';
import { ButtonGroup } from '@/components/ui/button-group';
import { cn } from '@/lib/utils';

import TextAlignButton from './TextAlignButton.vue';
import type { TextAlign } from './utils';

const props = withDefaults(
    defineProps<
        ButtonGroupProps & {
            editor: Editor;
            aligns?: TextAlign[];
        }
    >(),
    { aligns: () => ['left', 'center', 'right', 'justify'] }
);

const delegatedProps = reactiveOmit(props, 'editor', 'aligns');
</script>

<template>
    <ButtonGroup v-bind="delegatedProps" :class="cn('gap-0.5', props.class)">
        <TextAlignButton v-for="align in aligns" :key="align" :align="align" :editor="editor" />
    </ButtonGroup>
</template>
