<!-- COMMENTED BY ANTIGRAVITY FOR CLEANUP
<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactivePick } from '@vueuse/core';
import { ChevronDownIcon } from 'lucide-vue-next';
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
    },
);

const config = reactivePick(props, 'editor', 'levels') as UseHeadingsConfig;
const { canToggle, isActive, icon } = useHeadings(config);

const open = ref(false);
</script>

<template>
    <DropdownMenu @update:open="open = $event">
        <DropdownMenuTrigger as="div" :disabled="!canToggle">
            <Tooltip>
                <TooltipTrigger>
                    <Toggle :disabled="!canToggle" :model-value="isActive || open" size="icon">
                        <component :is="icon" />
                        <ChevronDownIcon class="size-2" />
                    </Toggle>
                </TooltipTrigger>

                <TooltipContent side="bottom">Heading</TooltipContent>
            </Tooltip>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" as-child>
            <ButtonGroup class="min-w-0 p-0.5" orientation="vertical" spacing="spaced">
                <DropdownMenuItem v-for="level in levels" :key="level" class="p-0">
                    <HeadingButton class="px-2 text-xs" :editor="editor" :level="level" />
                </DropdownMenuItem>
            </ButtonGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
-->
