<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactivePick } from '@vueuse/core';
import { ChevronDown } from 'lucide-vue-next';
import { ref } from 'vue';

import { ButtonGroup } from '@/components/ui/button-group';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import ListButton from './ListButton.vue';
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
    <DropdownMenu @update:open="open = $event">
        <DropdownMenuTrigger :disabled="!canToggle">
            <Tooltip>
                <TooltipTrigger>
                    <Toggle class="gap-0 px-1!" :disabled="!canToggle" :model-value="isActive || open" size="icon">
                        <component :is="icon" />
                        <ChevronDown class="size-2" />
                    </Toggle>
                </TooltipTrigger>

                <TooltipContent>List</TooltipContent>
            </Tooltip>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" as-child>
            <ButtonGroup class="min-w-0 p-0.5" spacing="spaced">
                <DropdownMenuItem v-for="list in lists" :key="list" class="p-0">
                    <ListButton :editor="editor" :list="list" />
                </DropdownMenuItem>
            </ButtonGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
