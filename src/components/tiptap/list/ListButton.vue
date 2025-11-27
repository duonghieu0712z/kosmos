<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

import type { ListType } from './types';
import { LIST_ICONS } from './types';

const props = withDefaults(
    defineProps<
        ToggleProps & {
            editor: Editor;
            type: ListType;
        }
    >(),
    {
        size: 'sm',
    }
);

const emits = defineEmits<{
    (e: 'update:toggle', type: ListType): void;
}>();

const delegatedProps = reactiveOmit(props, 'editor', 'type');

function canToggle() {
    const { editor, type } = props;
    if (!editor.isEditable) {
        return false;
    }

    switch (type) {
        case 'bullet':
            return editor.can().toggleBulletList();
        case 'ordered':
            return editor.can().toggleOrderedList();
        case 'task':
            return editor.can().toggleTaskList();
        default:
            return false;
    }
}

function isActive() {
    const { editor, type } = props;
    if (!editor.isEditable) {
        return false;
    }

    switch (type) {
        case 'bullet':
            return editor.isActive('bulletList');
        case 'ordered':
            return editor.isActive('orderedList');
        case 'task':
            return editor.isActive('taskList');
        default:
            return false;
    }
}
</script>

<template>
    <Toggle
        v-bind="delegatedProps"
        :class="cn('rounded!', props.class)"
        :disabled="!canToggle()"
        :model-value="isActive()"
        @click="
            () => {
                const chain = editor.chain().focus();
                switch (type) {
                    case 'bullet':
                        chain.toggleBulletList().run();
                        break;
                    case 'ordered':
                        chain.toggleOrderedList().run();
                        break;
                    case 'task':
                        chain.toggleTaskList().run();
                        break;
                }
                emits('update:toggle', type);
            }
        "
    >
        <component :is="LIST_ICONS[type]" />
    </Toggle>
</template>
