<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

import { cn } from '@/lib/utils';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();
</script>

<template>
    <div
        :class="cn('flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance', props.class)"
        data-slot="empty-content"
    >
        <slot />
    </div>
</template>
