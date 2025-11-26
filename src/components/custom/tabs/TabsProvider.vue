<script setup lang="ts">
import { reactive, ref } from 'vue';

import type { Tab } from './utils';
import { provideTabsContext } from './utils';

const MAX_HISTORY = 100;

const tabs = reactive<Tab[]>([]);
const history = reactive<string[]>([]);
const currentTab = ref<string>();

function activeTab(id: string) {
    if (currentTab.value === id) {
        return;
    }

    currentTab.value = id;
    addToHistory(id);
}

function hasTab(id: string) {
    return tabs.some((tab) => tab.id === id);
}

function pushTab(tab: Tab) {
    activeTab(tab.id);
    if (!hasTab(tab.id)) {
        tabs.push(tab);
    }
}

function popTab(id: string) {
    const index = tabs.findIndex((tab) => tab.id === id);
    if (index !== -1) {
        tabs.splice(index, 1);
        removeFromHistory(id);

        if (currentTab.value === id) {
            const lastId = history.at(-1);
            activeTab(lastId!);
        }
    }
}

function addToHistory(id: string) {
    if (history.at(-1) === id) {
        return;
    }

    const index = history.indexOf(id);
    if (index !== -1) {
        history.splice(index, 1);
    }
    history.push(id);
    if (history.length > MAX_HISTORY) {
        history.shift();
    }
}

function removeFromHistory(id: string) {
    const index = history.indexOf(id);
    if (index !== -1) {
        history.splice(index, 1);
    }
}

provideTabsContext({
    tabs,
    currentTab,
    activeTab,
    pushTab,
    popTab,
});
</script>

<template>
    <slot />
</template>
