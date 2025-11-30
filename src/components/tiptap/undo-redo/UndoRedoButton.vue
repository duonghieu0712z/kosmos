<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import { ShortcutKeys } from '@/components/custom/shortcut-keys';
import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import type { UndoRedoType } from './utils';
import { canExecute, execute, getIcon, getLabel, getShortcutKeys } from './utils';

const props = withDefaults(
    defineProps<
        ButtonProps & {
            editor: Editor;
            type: UndoRedoType;
        }
    >(),
    {
        variant: 'ghost',
        size: 'icon-sm',
    }
);

const emits = defineEmits<{
    (e: 'update:action', type: UndoRedoType): void;
}>();

const delegatedProps = reactiveOmit(props, 'editor', 'type');
</script>

<template>
    <Tooltip>
        <TooltipTrigger>
            <Button
                v-bind="delegatedProps"
                :disabled="!canExecute(editor, type)"
                @click="
                    () => {
                        execute(editor, type);
                        emits('update:action', type);
                    }
                "
            >
                <component :is="getIcon(type)" />
            </Button>
        </TooltipTrigger>

        <TooltipContent>
            {{ getLabel(type) }} (<ShortcutKeys :shortcut-keys="getShortcutKeys(type)"></ShortcutKeys>)
        </TooltipContent>
    </Tooltip>
</template>
