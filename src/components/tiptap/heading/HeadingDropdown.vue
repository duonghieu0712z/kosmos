<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactivePick } from '@vueuse/core';
import { ChevronDown } from 'lucide-vue-next';

import { ButtonGroup } from '@/components/ui/button-group';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import HeadingButton from './HeadingButton.vue';
import type { HeadingLevel, UseHeadingsConfig } from './utils';
import { useHeadings } from './utils';

const props = withDefaults(
    defineProps<{
        editor: Editor;
        levels?: HeadingLevel[];
    }>(),
    {
        levels: () => [1, 2, 3, 4, 0],
    }
);

const config = reactivePick(props, 'editor', 'levels') as UseHeadingsConfig;
const { canToggle, isActive, label, icon } = useHeadings(config);
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger :disabled="canToggle">
            <Tooltip>
                <TooltipTrigger>
                    <Toggle class="gap-0 px-1!" :disabled="!canToggle" :model-value="isActive" size="sm">
                        <component :is="icon" />
                        <ChevronDown class="size-2" />
                    </Toggle>
                </TooltipTrigger>

                <TooltipContent>{{ label }}</TooltipContent>
            </Tooltip>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" as-child>
            <ButtonGroup class="min-w-0 gap-0.5 p-0.5" orientation="vertical-rounded">
                <DropdownMenuItem v-for="level in levels" :key="level" class="p-0">
                    <HeadingButton class="px-2! py-1 text-xs" :editor="editor" :level="level" />
                </DropdownMenuItem>
            </ButtonGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
