import { createContext } from 'reka-ui';
import { Ref } from 'vue';

export interface Tab {
    id: string;
    name: string;
    content?: any;
}

export const [useTabs, provideTabsContext] = createContext<{
    tabs: Ref<Tab[]>;
    currentTab: Ref<string | undefined>;
    activeTab: (id: string) => void;
    pushTab: (tab: Tab) => void;
    popTab: (id: string) => void;
}>('Tabs');
