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
        <DropdownMenuTrigger as-child>
            <Button
                class="data-[active-state=true]:bg-accent gap-0 rounded! px-1!"
                :data-active-state="isActiveAny(editor, lists)"
                :disabled="!canExecuteAny(editor, lists)"
                size="sm"
                variant="ghost"
            >
                <component :is="getCurrentIcon(editor)" />
                <ChevronDown class="size-2" />
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" as-child>
            <ButtonGroup class="min-w-0 gap-0.5 p-0.5" :orientation="orientation">
                <DropdownMenuItem v-for="list in lists" :key="list" as-child>
                    <ListButton :editor="editor" :type="list" />
                </DropdownMenuItem>
            </ButtonGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
