import type { LucideIcon } from 'lucide-vue-next';
import { defineStore } from 'pinia';
import type { Component, Raw, ShallowRef, VNodeRef } from 'vue';
import { nextTick, reactive, ref } from 'vue';

export interface Tab {
    id: string;
    name: string;
    icon?: LucideIcon;
    component?: ShallowRef<Raw<Component>>;
    props?: Record<string, any>;
}

const MAX_HISTORY = 100;

export const useTabsStore = defineStore('tabs', () => {
    const currentTab = ref<string>();
    const tabs = reactive<Tab[]>([]);
    const history = reactive<string[]>([]);

    const scrollEle = ref<VNodeRef>(null!);

    const addToHistory = (id: string) => {
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
    };

    const removeFromHistory = (id: string) => {
        const index = history.indexOf(id);
        if (index !== -1) {
            history.splice(index, 1);
        }
    };

    const activeTab = async (id: string) => {
        currentTab.value = id;
        addToHistory(id);

        await nextTick();
        document.querySelector(`[data-tab-id="kosmos-tab-${currentTab.value}"]`)?.scrollIntoView(true);
    };

    const pushTab = async (tab: Tab) => {
        if (!tabs.some((t) => t.id === tab.id)) {
            tabs.push(tab);
        }
        await activeTab(tab.id);
    };

    const popTab = async (id: string) => {
        const index = tabs.findIndex((tab) => tab.id === id);
        if (index === -1) {
            return;
        }

        tabs.splice(index, 1);
        removeFromHistory(id);

        if (currentTab.value === id) {
            const lastId = history.at(-1);
            await activeTab(lastId!);
        }
    };

    return {
        currentTab,
        tabs,
        scrollEle,
        activeTab,
        pushTab,
        popTab,
    };
});
