<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactivePick } from '@vueuse/core';
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
const { canAlign, label, icon } = useTextAligns(config);
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger :disabled="!canAlign">
            <Tooltip>
                <TooltipTrigger>
                    <Button class="gap-0 px-1!" :disabled="!canAlign" size="icon-sm" variant="ghost">
                        <component :is="icon" />
                        <ChevronDown class="size-2" />
                    </Button>
                </TooltipTrigger>

                <TooltipContent>{{ label }}</TooltipContent>
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
