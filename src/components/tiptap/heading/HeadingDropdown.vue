<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { ChevronDown } from 'lucide-vue-next';
import { computed } from 'vue';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import HeadingButton from './HeadingButton.vue';
import type { HeadingLevel } from './types';
import { HEADING_ICONS } from './types';

const props = withDefaults(
    defineProps<{
        editor: Editor;
        levels?: HeadingLevel[];
    }>(),
    {
        levels: () => [1, 2, 3, 4, 0],
    }
);

const currentLevel = computed<number>(() => props.editor.getAttributes('heading').level ?? 0);
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button
                class="data-[active-state=true]:bg-accent gap-0 rounded! px-1!"
                :data-active-state="currentLevel !== 0"
                size="sm"
                variant="ghost"
            >
                <component :is="HEADING_ICONS[currentLevel]" />
                <ChevronDown class="size-2" />
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" as-child>
            <ButtonGroup class="min-w-0 gap-0.5 p-0.5" orientation="vertical">
                <DropdownMenuItem v-for="level in props.levels" :key="level" as-child>
                    <HeadingButton class="px-2! py-1 text-xs" :editor="editor" :level="level" />
                </DropdownMenuItem>
            </ButtonGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
