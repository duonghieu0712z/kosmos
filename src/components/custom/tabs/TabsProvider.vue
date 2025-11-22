<script setup lang="ts">
import { computed, ref } from 'vue';

import { provideTabsContext, Tab } from './utils';

const selectedTab = ref<Tab | null>(null);

const currentTab = computed(() => selectedTab.value?.id ?? null);

function setTab(tab: Tab) {
    selectedTab.value = tab;
}

provideTabsContext({
    currentTab,
    setTab,
});
</script>

<template>
    <slot />
</template>
