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

import TextAlignButton from './TextAlignButton.vue';
import type { TextAlign } from './utils';
import { canExecuteAny, getCurrentIcon, isActiveAny } from './utils';

withDefaults(
    defineProps<{
        editor: Editor;
        aligns?: TextAlign[];
        orientation?: 'horizontal' | 'vertical';
    }>(),
    {
        aligns: () => ['left', 'center', 'right', 'justify'],
        orientation: 'horizontal',
    }
);
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Tooltip>
                <TooltipTrigger>
                    <Button
                        :active="isActiveAny(editor, aligns)"
                        class="gap-0 px-1!"
                        :disabled="!canExecuteAny(editor, aligns)"
                        size="icon-sm"
                        variant="ghost"
                    >
                        <component :is="getCurrentIcon(editor)" />
                        <ChevronDown class="size-2" />
                    </Button>
                </TooltipTrigger>

                <TooltipContent>Text align</TooltipContent>
            </Tooltip>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" as-child>
            <ButtonGroup class="gap-0.5 p-0.5" :orientation="`${orientation}-rounded`">
                <DropdownMenuItem v-for="align in aligns" :key="align" class="p-0">
                    <TextAlignButton :align="align" :editor="editor" />
                </DropdownMenuItem>
            </ButtonGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
