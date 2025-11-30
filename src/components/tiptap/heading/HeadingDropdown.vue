<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { ChevronDown } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import HeadingButton from './HeadingButton.vue';
import type { HeadingLevel } from './utils';
import { canExecuteAny, getCurrentIcon, isActiveAny } from './utils';

withDefaults(
    defineProps<{
        editor: Editor;
        levels?: HeadingLevel[];
    }>(),
    {
        levels: () => [1, 2, 3, 4, 0],
    }
);
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Tooltip>
                <TooltipTrigger>
                    <Button
                        class="data-[active-state=true]:bg-accent gap-0 px-1!"
                        :data-active-state="isActiveAny(editor, levels)"
                        :disabled="!canExecuteAny(editor, levels)"
                        size="icon-sm"
                        variant="ghost"
                    >
                        <component :is="getCurrentIcon(editor)" />
                        <ChevronDown class="size-2" />
                    </Button>
                </TooltipTrigger>

                <TooltipContent>Heading</TooltipContent>
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
