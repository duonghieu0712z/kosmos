<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import type { ButtonGroupProps } from '@/components/ui/button-group';
import { ButtonGroup } from '@/components/ui/button-group';
import { cn } from '@/lib/utils';

import ListButton from './ListButton.vue';
import type { ListType } from './types';

const props = withDefaults(
    defineProps<
        ButtonGroupProps & {
            editor: Editor;
            lists?: ListType[];
        }
    >(),
    {
        lists: () => ['bullet', 'ordered'],
    }
);

const delegatedProps = reactiveOmit(props, 'editor', 'lists');
</script>

<template>
    <ButtonGroup v-bind="delegatedProps" :class="cn('gap-0.5', props.class)">
        <ListButton v-for="list in lists" :key="list" :editor="editor" :type="list" />
    </ButtonGroup>
</template>
