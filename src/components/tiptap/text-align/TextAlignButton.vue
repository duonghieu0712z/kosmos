<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit, reactivePick } from '@vueuse/core';

import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import type { TextAlign, UseTextAlignConfig } from './utils';
import { useTextAlign } from './utils';

const props = withDefaults(
    defineProps<
        ToggleProps & {
            editor: Editor;
            align: TextAlign;
        }
    >(),
    {
        size: 'sm',
    }
);

const emits = defineEmits<{
    (e: 'update:toggle', align: TextAlign): void;
}>();

const delegatedProps = reactiveOmit(props, 'editor', 'align');

const config = reactivePick(props, 'editor', 'align') as UseTextAlignConfig;
const { canAlign, isActive, label, icon, handleAlign } = useTextAlign(config);

function onClick() {
    if (handleAlign()) {
        emits('update:toggle', config.align);
    }
}
</script>

<template>
    <Tooltip>
        <TooltipTrigger>
            <Toggle v-bind="delegatedProps" :disabled="!canAlign" :model-value="isActive" @click="onClick">
                <component :is="icon" />
            </Toggle>
        </TooltipTrigger>

        <TooltipContent>{{ label }}</TooltipContent>
    </Tooltip>
</template>
