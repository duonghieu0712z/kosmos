<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit, reactivePick } from '@vueuse/core';
import { SquareCode } from 'lucide-vue-next';

import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import type { UseCodeBlockConfig } from './utils';
import { useCodeBlock } from './utils';

const props = withDefaults(
    defineProps<
        ToggleProps & {
            editor: Editor;
        }
    >(),
    {
        size: 'sm',
    }
);

const emits = defineEmits<{
    (e: 'update:toggled'): void;
}>();

const delegatedProps = reactiveOmit(props, 'editor');

const config = reactivePick(props, 'editor') as UseCodeBlockConfig;
const { canToggle, isActive, handleToggle } = useCodeBlock(config);

const onClick = () => {
    if (handleToggle()) {
        emits('update:toggled');
    }
};
</script>

<template>
    <Tooltip>
        <TooltipTrigger>
            <Toggle v-bind="delegatedProps" :disabled="!canToggle" :model-value="isActive" @click="onClick">
                <SquareCode />
            </Toggle>
        </TooltipTrigger>

        <TooltipContent>Code Block</TooltipContent>
    </Tooltip>
</template>
