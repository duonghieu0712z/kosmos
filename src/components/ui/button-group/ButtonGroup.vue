<script setup lang="ts">
import { cn } from '@/lib/utils';

import type { ButtonGroupProps } from '.';
import { buttonGroupVariants } from '.';

const props = withDefaults(defineProps<ButtonGroupProps>(), {
    orientation: 'horizontal',
    spacing: 'compact',
});
</script>

<template>
    <div
        :class="cn(buttonGroupVariants({ orientation, spacing }), props.class)"
        :data-orientation="orientation"
        data-slot="button-group"
        role="group"
    >
        <slot />
    </div>
</template>
