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
        <DropdownMenuTrigger as-child>
            <Button
                class="data-[active-state=true]:bg-accent gap-0 rounded! px-1!"
                :data-active-state="isActiveAny(editor, levels)"
                :disabled="!canExecuteAny(editor, levels)"
                size="sm"
                variant="ghost"
            >
                <component :is="getCurrentIcon(editor)" />
                <ChevronDown class="size-2" />
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" as-child>
            <ButtonGroup class="min-w-0 gap-0.5 p-0.5" orientation="vertical">
                <DropdownMenuItem v-for="level in levels" :key="level" as-child>
                    <HeadingButton class="px-2! py-1 text-xs" :editor="editor" :level="level" />
                </DropdownMenuItem>
            </ButtonGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
