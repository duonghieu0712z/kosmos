<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';

import { Toggle, type ToggleProps } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const props = withDefaults(
    defineProps<
        ToggleProps & {
            color: string;
            label: string;
        }
    >(),
    {
        size: 'icon',
    },
);

const emits = defineEmits<{
    (e: 'set:color', color: string): void;
}>();

const delegatedProps = reactiveOmit(props, 'color', 'label');
</script>

<template>
    <Tooltip>
        <TooltipTrigger>
            <Toggle v-bind="delegatedProps" @click="emits('set:color', color)">
                <span
                    :class="[
                        'relative h-4 w-4 rounded-full bg-(--highlight-color)',
                        `after:absolute after:top-0 after:left-0 after:h-full after:w-full after:content-['']`,
                        'after:box-border after:rounded-full after:border after:border-(--highlight-color)',
                        'after:mix-blend-multiply after:brightness-95',
                        'dark:after:mix-blend-lighten dark:after:brightness-140',
                    ]"
                    :style="{ '--highlight-color': color }"
                />
            </Toggle>
        </TooltipTrigger>

        <TooltipContent side="bottom">{{ label }}</TooltipContent>
    </Tooltip>
</template>
