<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactivePick } from '@vueuse/core';
import { ChevronDownIcon } from 'lucide-vue-next';
import { ref } from 'vue';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import TextAlignGroup from './TextAlignGroup.vue';
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
    },
);

const config = reactivePick(props, 'editor', 'aligns') as UseTextAlignsConfig;
const { canAlign, icon } = useTextAligns(config);

const open = ref(false);
</script>

<template>
    <Popover @update:open="open = $event">
        <PopoverTrigger as="div" :disabled="!canAlign">
            <Tooltip>
                <TooltipTrigger>
                    <Toggle :disabled="!canAlign" :model-value="open" size="icon">
                        <component :is="icon" />
                        <ChevronDownIcon class="size-2" />
                    </Toggle>
                </TooltipTrigger>

                <TooltipContent side="bottom">Text align</TooltipContent>
            </Tooltip>
        </PopoverTrigger>

        <PopoverContent align="start" as-child class="p-0.5">
            <TextAlignGroup :aligns="aligns" :editor="editor" :orientation="orientation" />
        </PopoverContent>
    </Popover>
</template>
