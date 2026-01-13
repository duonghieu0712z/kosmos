<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactivePick } from '@vueuse/core';
import { ChevronDownIcon } from 'lucide-vue-next';
import { ref } from 'vue';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import ListGroup from './ListGroup.vue';
import type { ListType, UseListsConfig } from './utils';
import { useLists } from './utils';

const props = withDefaults(
    defineProps<{
        editor: Editor;
        lists?: ListType[];
        orientation?: 'horizontal' | 'vertical';
    }>(),
    {
        lists: () => ['bullet', 'ordered'],
        orientation: 'horizontal',
    },
);

const config = reactivePick(props, 'editor', 'lists') as UseListsConfig;
const { canToggle, isActive, icon } = useLists(config);

const open = ref(false);
</script>

<template>
    <Popover @update:open="open = $event">
        <PopoverTrigger as="div" :disabled="!canToggle">
            <Tooltip>
                <TooltipTrigger>
                    <Toggle :disabled="!canToggle" :model-value="isActive || open" size="icon">
                        <component :is="icon" />
                        <ChevronDownIcon class="size-2" />
                    </Toggle>
                </TooltipTrigger>

                <TooltipContent side="bottom">List</TooltipContent>
            </Tooltip>
        </PopoverTrigger>

        <PopoverContent align="start" as-child class="p-0.5">
            <ListGroup :editor="editor" :lists="lists" :orientation="orientation" />
        </PopoverContent>
    </Popover>
</template>
