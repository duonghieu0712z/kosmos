<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import { ShortcutKeys } from '@/components/custom/shortcut-keys';
import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import type { HeadingLevel } from './utils';
import { canExecute, execute, getIcon, getLabel, getShortcutKeys, isActive } from './utils';

const props = withDefaults(
    defineProps<
        ToggleProps & {
            editor: Editor;
            level: HeadingLevel;
        }
    >(),
    {
        size: 'sm',
    }
);

const emits = defineEmits<{
    (e: 'update:toggle', level: HeadingLevel): void;
}>();

const delegatedProps = reactiveOmit(props, 'editor', 'level');
</script>

<template>
    <Tooltip>
        <TooltipTrigger>
            <Toggle
                v-bind="delegatedProps"
                :class="cn('rounded!', props.class)"
                :disabled="!canExecute(editor, level)"
                :model-value="isActive(editor, level)"
                @click="
                    () => {
                        execute(editor, level);
                        emits('update:toggle', level);
                    }
                "
            >
                <component :is="getIcon(level)" />
                <div class="flex-1">{{ getLabel(level) }}</div>
            </Toggle>
        </TooltipTrigger>

        <TooltipContent side="right">
            <ShortcutKeys :shortcut-keys="getShortcutKeys(level)"></ShortcutKeys>
        </TooltipContent>
    </Tooltip>
</template>
