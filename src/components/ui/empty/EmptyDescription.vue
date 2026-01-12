<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { cn } from '@/lib/utils';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <p
        :class="
            cn(
                'text-muted-foreground text-sm/relaxed',
                '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
                props.class,
            )
        "
        data-slot="empty-description"
    >
        <slot />
    </p>
</template>
