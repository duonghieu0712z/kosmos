<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import { ShortcutKeys } from '@/components/custom/shortcut-keys';
import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import type { TextAlign } from './utils';
import { canExecute, execute, getIcon, getLabel, getShortcutKeys, isActive } from './utils';

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
</script>

<template>
    <Tooltip>
        <TooltipTrigger>
            <Toggle
                v-bind="delegatedProps"
                :disabled="!canExecute(editor, align)"
                :model-value="isActive(editor, align)"
                @click="
                    () => {
                        execute(editor, align);
                        emits('update:toggle', align);
                    }
                "
            >
                <component :is="getIcon(align)" />
            </Toggle>
        </TooltipTrigger>

        <TooltipContent>
            {{ getLabel(align) }} (<ShortcutKeys :shortcut-keys="getShortcutKeys(align)"></ShortcutKeys>)
        </TooltipContent>
    </Tooltip>
</template>
