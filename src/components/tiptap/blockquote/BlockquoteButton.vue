<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit, reactivePick } from '@vueuse/core';
import { TextQuote } from 'lucide-vue-next';

import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import type { UseBlockquoteConfig } from './utils';
import { useBlockquote } from './utils';

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

const config = reactivePick(props, 'editor') as UseBlockquoteConfig;
const { canToggle, isActive, handleToggle } = useBlockquote(config);

function onClick() {
    if (handleToggle()) {
        emits('update:toggled');
    }
}
</script>

<template>
    <Tooltip>
        <TooltipTrigger>
            <Toggle v-bind="delegatedProps" :disabled="!canToggle" :model-value="isActive" @click="onClick">
                <TextQuote />
            </Toggle>
        </TooltipTrigger>

        <TooltipContent>Blockquote</TooltipContent>
    </Tooltip>
</template>
