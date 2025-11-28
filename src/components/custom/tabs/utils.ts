import type { LucideIcon } from 'lucide-vue-next';
import { createContext } from 'reka-ui';
import type { Component, Raw, Reactive, Ref } from 'vue';

export interface Tab {
    id: string;
    name: string;
    icon?: Raw<LucideIcon>;
    component?: Raw<Component>;
    props?: Record<string, any> | Reactive<Record<string, any>>;
}

export const [useTabs, provideTabsContext] = createContext<{
    tabs: Reactive<Tab[]>;
    currentTab: Ref<string | undefined>;
    activeTab: (id: string) => Promise<void>;
    pushTab: (tab: Tab) => Promise<void>;
    popTab: (id: string) => Promise<void>;
}>('Tabs');
