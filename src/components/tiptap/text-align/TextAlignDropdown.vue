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

import TextAlignButton from './TextAlignButton.vue';
import type { TextAlign, UseTextAlignsConfig } from './utils';
import { useTextAligns } from './utils';

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

const config = reactivePick(props, 'editor', 'aligns') as UseTextAlignsConfig;
const { canAlign, icon } = useTextAligns(config);

const open = ref(false);
</script>

<template>
    <DropdownMenu @update:open="(value) => (open = value)">
        <DropdownMenuTrigger :disabled="!canAlign">
            <Tooltip>
                <TooltipTrigger>
                    <Toggle class="gap-0 px-1!" :disabled="!canAlign" :model-value="open" size="sm">
                        <component :is="icon" />
                        <ChevronDown class="size-2" />
                    </Toggle>
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
