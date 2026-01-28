<!-- COMMENTED BY ANTIGRAVITY FOR CLEANUP
<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit, reactivePick } from '@vueuse/core';

import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import type { MarkType, UseMarkConfig } from './utils';
import { useMark } from './utils';

const props = withDefaults(
    defineProps<
        ToggleProps & {
            editor: Editor;
            mark: MarkType;
        }
    >(),
    {
        size: 'icon',
    },
);

const emits = defineEmits<{
    (e: 'update:toggled', mark: MarkType): void;
}>();

const delegatedProps = reactiveOmit(props, 'editor', 'mark');

const config = reactivePick(props, 'editor', 'mark') as UseMarkConfig;
const { canToggle, isActive, label, icon, handleToggle } = useMark(config);

const onClick = () => {
    if (handleToggle()) {
        emits('update:toggled', config.mark);
    }
};
</script>

<template>
    <Tooltip>
        <TooltipTrigger>
            <Toggle v-bind="delegatedProps" :disabled="!canToggle" :model-value="isActive" @click="onClick">
                <component :is="icon" />
            </Toggle>
        </TooltipTrigger>

        <TooltipContent side="bottom">{{ label }}</TooltipContent>
    </Tooltip>
</template>
-->
