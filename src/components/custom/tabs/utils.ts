import { createContext } from 'reka-ui';
import { ComputedRef } from 'vue';

export interface Tab {
    id: string;
    name: string;
    content?: any;
}

export const [useTabs, provideTabsContext] = createContext<{
    currentTab: ComputedRef<string | null>;
    setTab: (tab: Tab) => void;
}>('Tabs');
