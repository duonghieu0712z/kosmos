<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit, reactivePick } from '@vueuse/core';

import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import type { UndoRedoAction, UseUndoRedoConfig } from './utils';
import { useUndoRedo } from './utils';

const props = withDefaults(
    defineProps<
        ButtonProps & {
            editor: Editor;
            action: UndoRedoAction;
        }
    >(),
    {
        variant: 'ghost',
        size: 'icon',
    },
);

const emits = defineEmits<{
    (e: 'update:executed', action: UndoRedoAction): void;
}>();

const delegatedProps = reactiveOmit(props, 'editor', 'action');

const config = reactivePick(props, 'editor', 'action') as UseUndoRedoConfig;
const { canExecute, label, icon, handleExecute } = useUndoRedo(config);

const onClick = () => {
    if (handleExecute()) {
        emits('update:executed', config.action);
    }
};
</script>

<template>
    <Tooltip>
        <TooltipTrigger>
            <Button v-bind="delegatedProps" :disabled="!canExecute" @click="onClick">
                <component :is="icon" />
            </Button>
        </TooltipTrigger>

        <TooltipContent>{{ label }}</TooltipContent>
    </Tooltip>
</template>
