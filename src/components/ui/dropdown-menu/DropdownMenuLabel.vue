<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import type { DropdownMenuLabelProps } from 'reka-ui';
import { DropdownMenuLabel, useForwardProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

import { cn } from '@/lib/utils';

const props = defineProps<DropdownMenuLabelProps & { class?: HTMLAttributes['class']; inset?: boolean }>();

const delegatedProps = reactiveOmit(props, 'class', 'inset');
const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <DropdownMenuLabel
        v-bind="forwardedProps"
        :class="cn('flex h-8 items-center px-2 text-sm font-medium data-inset:pl-8', props.class)"
        :data-inset="inset ? '' : undefined"
        data-slot="dropdown-menu-label"
    >
        <slot />
    </DropdownMenuLabel>
</template>
