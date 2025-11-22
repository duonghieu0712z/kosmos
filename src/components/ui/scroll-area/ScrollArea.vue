<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import type { ScrollAreaRootProps } from 'reka-ui';
import { ScrollAreaCorner, ScrollAreaRoot, ScrollAreaViewport } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

import { cn } from '@/lib/utils';

import ScrollBar from './ScrollBar.vue';

const props = defineProps<
    ScrollAreaRootProps & {
        class?: HTMLAttributes['class'];
        orientation?: 'vertical' | 'horizontal';
    }
>();

const delegatedProps = reactiveOmit(props, 'class', 'orientation');
</script>

<template>
    <ScrollAreaRoot v-bind="delegatedProps" :class="cn('relative', props.class)" data-slot="scroll-area">
        <ScrollAreaViewport
            class="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&>div]:flex [&>div]:h-6"
            data-slot="scroll-area-viewport"
        >
            <slot />
        </ScrollAreaViewport>
        <ScrollBar :orientation="props.orientation" />
        <ScrollAreaCorner />
    </ScrollAreaRoot>
</template>
