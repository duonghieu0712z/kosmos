<script setup lang="ts">
import { cn } from '@/lib/utils';

import type { ButtonGroupProps } from '.';
import { buttonGroupVariants } from '.';

const props = defineProps<ButtonGroupProps>();
</script>

<template>
    <div
        :class="cn(buttonGroupVariants({ orientation: props.orientation }), props.class)"
        :data-orientation="props.orientation"
        data-slot="button-group"
        role="group"
    >
        <slot />
    </div>
</template>
