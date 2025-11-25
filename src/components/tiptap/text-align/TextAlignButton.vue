<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit } from '@vueuse/core';

import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

import type { TextAlign } from './types';
import { ALIGN_ICONS } from './types';

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
    <Toggle
        v-bind="delegatedProps"
        :class="cn('rounded!', props.class)"
        :disabled="!editor.isEditable || !editor.can().setTextAlign(align)"
        :model-value="editor.isActive({ textAlign: align })"
        @click="
            () => {
                editor.chain().focus().setTextAlign(align).run();
                emits('update:toggle', align);
            }
        "
    >
        <component :is="ALIGN_ICONS[align]" />
    </Toggle>
</template>
