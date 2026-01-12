<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import type { TabsTriggerProps } from 'reka-ui';
import { TabsTrigger, useForwardProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

import { cn } from '@/lib/utils';

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <TabsTrigger
        :class="
            cn(
                'text-foreground dark:text-muted-foreground border-r-border inline-flex h-[calc(100%-1px)] w-fit items-center justify-center gap-1.5 border-r border-b border-b-transparent px-2 text-sm whitespace-nowrap transition-[color,box-shadow]',
                'data-[state=active]:bg-background dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 data-[state=active]:shadow-xs',
                'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring focus-visible:ring-[1.5px] focus-visible:outline-1',
                'disabled:pointer-events-none disabled:opacity-50',
                `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
                props.class,
            )
        "
        data-slot="tabs-trigger"
        v-bind="forwardedProps"
    >
        <slot />
    </TabsTrigger>
</template>
