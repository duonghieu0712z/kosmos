<script setup lang="ts">
import { ref } from 'vue';

import { provideTabsContext, Tab } from './utils';

const MAX_HISTORY = 100;

const tabs = ref<Tab[]>([]);
const history = ref<string[]>([]);

const currentTab = ref<string>();

function activeTab(id: string) {
    if (currentTab.value === id) {
        return;
    }

    currentTab.value = id;
    addToHistory(id);
}

function hasTab(id: string) {
    return tabs.value.some((tab) => tab.id === id);
}

function pushTab(tab: Tab) {
    if (!hasTab(tab.id)) {
        tabs.value.push(tab);
        activeTab(tab.id);
    }
}

function popTab(id: string) {
    const index = tabs.value.findIndex((tab) => tab.id === id);
    if (index !== -1) {
        tabs.value.splice(index, 1);
        removeFromHistory(id);

        if (currentTab.value === id) {
            const lastId = history.value.at(-1);
            activeTab(lastId!);
        }
    }
}

function addToHistory(id: string) {
    if (history.value.at(-1) === id) {
        return;
    }

    const index = history.value.indexOf(id);
    if (index !== -1) {
        history.value.splice(index, 1);
    }
    history.value.push(id);
    if (history.value.length > MAX_HISTORY) {
        history.value.shift();
    }
}

function removeFromHistory(id: string) {
    const index = history.value.indexOf(id);
    if (index !== -1) {
        history.value.splice(index, 1);
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
