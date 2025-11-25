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

import TextAlignButton from './TextAlignButton.vue';
import type { TextAlign } from './types';
import { ALIGN_ICONS } from './types';

const props = withDefaults(
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

const currentAlign = computed<TextAlign>(
    () => props.editor.getAttributes('paragraph').textAlign ?? props.editor.getAttributes('heading').textAlign ?? 'left'
);
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button class="gap-0 rounded! px-1!" size="sm" variant="ghost">
                <component :is="ALIGN_ICONS[currentAlign]" />
                <ChevronDown class="size-2" />
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" as-child>
            <ButtonGroup class="gap-0.5 p-0.5" :orientation="orientation">
                <DropdownMenuItem v-for="align in aligns" :key="align" as-child>
                    <TextAlignButton :align="align" :editor="editor" />
                </DropdownMenuItem>
            </ButtonGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
