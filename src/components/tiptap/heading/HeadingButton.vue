<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactiveOmit, reactivePick } from '@vueuse/core';

import type { ToggleProps } from '@/components/ui/toggle';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

import type { HeadingLevel, UseHeadingConfig } from './utils';
import { useHeading } from './utils';

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
    (e: 'update:toggled', level: HeadingLevel): void;
}>();

const delegatedProps = reactiveOmit(props, 'editor', 'level');

const config = reactivePick(props, 'editor', 'level') as UseHeadingConfig;
const { canToggle, isActive, label, icon, handleToggle } = useHeading(config);

function onClick() {
    if (handleToggle()) {
        emits('update:toggled', config.level);
    }
}
</script>

<template>
    <Toggle
        v-bind="delegatedProps"
        :class="cn('w-full', props.class)"
        :disabled="!canToggle"
        :model-value="isActive"
        @click="onClick"
    >
        <component :is="icon" />
        <div class="flex-1">{{ label }}</div>
    </Toggle>
</template>
