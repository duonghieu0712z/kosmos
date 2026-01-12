<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import type { ScrollAreaRootProps } from 'reka-ui';
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

import { cn } from '@/lib/utils';

import ScrollBar from './ScrollBar.vue';

const props = withDefaults(
    defineProps<
        ScrollAreaRootProps & {
            class?: HTMLAttributes['class'];
            orientation?: 'vertical' | 'horizontal';
        }
    >(),
    {
        scrollHideDelay: 100,
        orientation: 'vertical',
    },
);

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <ScrollAreaRoot v-bind="delegatedProps" :class="cn('relative', props.class)" data-slot="scroll-area">
        <ScrollAreaViewport
            :class="[
                'size-full rounded-[inherit] transition-[color,box-shadow] outline-none',
                'focus-visible:ring-ring/50 focus-visible:ring-[1.5px] focus-visible:outline-1',
            ]"
            data-slot="scroll-area-viewport"
        >
            <slot />
        </ScrollAreaViewport>

        <ScrollBar :orientation="orientation" />
        <ScrollAreaCorner />
    </ScrollAreaRoot>
</template>
