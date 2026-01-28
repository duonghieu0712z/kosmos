<!-- COMMENTED BY ANTIGRAVITY FOR CLEANUP
<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import type { ButtonGroupProps } from '@/components/ui/button-group';
import { ButtonGroup } from '@/components/ui/button-group';

import TextAlignButton from './TextAlignButton.vue';
import type { TextAlign } from './utils';

const props = withDefaults(
    defineProps<
        ButtonGroupProps & {
            editor: Editor;
            aligns?: TextAlign[];
        }
    >(),
    {
        aligns: () => ['left', 'center', 'right', 'justify'],
        spacing: 'spaced',
    },
);

const delegatedProps = reactiveOmit(props, 'editor', 'aligns');
</script>

<template>
    <ButtonGroup v-bind="delegatedProps">
        <TextAlignButton v-for="align in aligns" :key="align" :align="align" :editor="editor" />
    </ButtonGroup>
</template>
-->
