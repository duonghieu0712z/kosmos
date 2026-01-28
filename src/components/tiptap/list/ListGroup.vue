<!-- COMMENTED BY ANTIGRAVITY FOR CLEANUP
<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import type { ButtonGroupProps } from '@/components/ui/button-group';
import { ButtonGroup } from '@/components/ui/button-group';

import ListButton from './ListButton.vue';
import type { ListType } from './utils';

const props = withDefaults(
    defineProps<
        ButtonGroupProps & {
            editor: Editor;
            lists?: ListType[];
        }
    >(),
    {
        lists: () => ['bullet', 'ordered'],
        spacing: 'spaced',
    },
);

const delegatedProps = reactiveOmit(props, 'editor', 'lists');
</script>

<template>
    <ButtonGroup v-bind="delegatedProps">
        <ListButton v-for="list in lists" :key="list" :editor="editor" :list="list" />
    </ButtonGroup>
</template>
-->
