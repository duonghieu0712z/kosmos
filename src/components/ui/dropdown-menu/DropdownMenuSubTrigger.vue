<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { ChevronRightIcon } from 'lucide-vue-next';
import type { DropdownMenuSubTriggerProps } from 'reka-ui';
import { DropdownMenuSubTrigger, useForwardProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

import { cn } from '@/lib/utils';

const props = defineProps<DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class']; inset?: boolean }>();

const delegatedProps = reactiveOmit(props, 'class', 'inset');
const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <DropdownMenuSubTrigger
        v-bind="forwardedProps"
        :class="
            cn(
                'flex h-8 cursor-default items-center rounded-sm px-2 text-sm outline-hidden select-none',
                'focus:bg-accent focus:text-accent-foreground data-inset:pl-8',
                'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
                props.class,
            )
        "
        data-slot="dropdown-menu-sub-trigger"
    >
        <slot />
        <ChevronRightIcon class="ml-auto size-4" />
    </DropdownMenuSubTrigger>
</template>
