<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import type { TabsListProps } from 'reka-ui';
import { TabsList } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

import { cn } from '@/lib/utils';

const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <TabsList
        v-bind="delegatedProps"
        :class="cn('bg-muted text-muted-foreground inline-flex h-8 w-full items-center justify-start', props.class)"
        data-slot="tabs-list"
    >
        <slot />
    </TabsList>
</template>
