<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { CheckIcon } from 'lucide-vue-next';
import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from 'reka-ui';
import { DropdownMenuCheckboxItem, DropdownMenuItemIndicator, useForwardPropsEmits } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

import { cn } from '@/lib/utils';

const props = defineProps<DropdownMenuCheckboxItemProps & { class?: HTMLAttributes['class'] }>();
const emits = defineEmits<DropdownMenuCheckboxItemEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <DropdownMenuCheckboxItem
        v-bind="forwarded"
        :class="
            cn(
                'relative flex h-8 cursor-default items-center gap-2 rounded-sm pr-2 pl-8 text-sm outline-hidden select-none',
                'focus:bg-accent focus:text-accent-foreground',
                'data-disabled:pointer-events-none data-disabled:opacity-50',
                `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
                props.class,
            )
        "
        data-slot="dropdown-menu-checkbox-item"
    >
        <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
            <DropdownMenuItemIndicator>
                <slot name="indicator-icon">
                    <CheckIcon class="size-4" />
                </slot>
            </DropdownMenuItemIndicator>
        </span>
        <slot />
    </DropdownMenuCheckboxItem>
</template>
