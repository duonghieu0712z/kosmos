<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit, reactivePick } from '@vueuse/core';

import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import type { ListType, UseListConfig } from './utils';
import { useList } from './utils';

const props = withDefaults(
    defineProps<
        ToggleProps & {
            editor: Editor;
            list: ListType;
        }
    >(),
    {
        size: 'icon',
    },
);

const emits = defineEmits<{
    (e: 'update:toggled', list: ListType): void;
}>();

const delegatedProps = reactiveOmit(props, 'editor', 'list');

const config = reactivePick(props, 'editor', 'list') as UseListConfig;
const { canToggle, isActive, label, icon, handleToggle } = useList(config);

const onClick = () => {
    if (handleToggle()) {
        emits('update:toggled', config.list);
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
