<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import { ShortcutKeys } from '@/components/custom/shortcut-keys';
import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import type { MarkType } from './utils';
import { canExecute, execute, getIcon, getLabel, getShortcutKeys, isActive } from './utils';

const props = withDefaults(
    defineProps<
        ToggleProps & {
            editor: Editor;
            type: MarkType;
        }
    >(),
    {
        size: 'sm',
    }
);

const emits = defineEmits<{
    (e: 'update:toggle', type: MarkType): void;
}>();

const delegatedProps = reactiveOmit(props, 'editor', 'type');
</script>

<template>
    <Tooltip>
        <TooltipTrigger>
            <Toggle
                v-bind="delegatedProps"
                :class="cn('rounded!', props.class)"
                :disabled="!canExecute(editor, type)"
                :model-value="isActive(editor, type)"
                @click="
                    () => {
                        execute(editor, type);
                        emits('update:toggle', type);
                    }
                "
            >
                <component :is="getIcon(type)" />
            </Toggle>
        </TooltipTrigger>

        <TooltipContent>
            {{ getLabel(type) }} (<ShortcutKeys :shortcut-keys="getShortcutKeys(type)"></ShortcutKeys>)
        </TooltipContent>
    </Tooltip>
</template>
