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

import ListButton from './ListButton.vue';
import type { ListType } from './utils';
import { canExecuteAny, getCurrentIcon, isActiveAny } from './utils';

withDefaults(
    defineProps<{
        editor: Editor;
        lists?: ListType[];
        orientation?: 'horizontal' | 'vertical';
    }>(),
    {
        lists: () => ['bullet', 'ordered'],
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
                        class="data-[active-state=true]:bg-accent gap-0 px-1!"
                        :data-active-state="isActiveAny(editor, lists)"
                        :disabled="!canExecuteAny(editor, lists)"
                        size="icon-sm"
                        variant="ghost"
                    >
                        <component :is="getCurrentIcon(editor)" />
                        <ChevronDown class="size-2" />
                    </Button>
                </TooltipTrigger>

                <TooltipContent>List</TooltipContent>
            </Tooltip>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" as-child>
            <ButtonGroup class="min-w-0 gap-0.5 p-0.5" :orientation="`${orientation}-rounded`">
                <DropdownMenuItem v-for="list in lists" :key="list" class="p-0">
                    <ListButton :editor="editor" :type="list" />
                </DropdownMenuItem>
            </ButtonGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
