<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';

import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { canExecute, isActive, setHighlight } from './utils';

defineProps<{
    editor: Editor;
    color: string;
}>();
</script>

<template>
    <Tooltip>
        <TooltipTrigger>
            <Toggle
                :disabled="!canExecute(editor)"
                :model-value="isActive(editor, color)"
                size="sm"
                @click="setHighlight(editor, color)"
            >
                <span
                    class="relative h-4 w-4 rounded-full bg-(--highlight-color) after:absolute after:top-0 after:left-0 after:box-border after:h-full after:w-full after:rounded-full after:border after:border-(--highlight-color) after:mix-blend-multiply after:brightness-95 after:content-[''] dark:after:mix-blend-lighten dark:after:brightness-140"
                    :style="{ '--highlight-color': color }"
                />
            </Toggle>
        </TooltipTrigger>

        <TooltipContent>Highlight</TooltipContent>
    </Tooltip>
</template>
