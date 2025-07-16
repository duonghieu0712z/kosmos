import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

type Tab = {
    id: string;
    name: string;
};

type TabContextProps = {
    tabs: Tab[];
    activeTab: Tab | null;
    setActiveTab: (id: string) => void;
    hasTab: (id: string) => boolean;
    createTab: (tab: Tab) => void;
    removeTab: (id: string) => void;
};

const TabContext = createContext<TabContextProps>(null!);

export function useTab() {
    return useContext(TabContext);
}

export function TabProvider({ children }: { children: ReactNode }) {
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [activeTab, _setActiveTab] = useState<Tab | null>(null);

    const setActiveTab = useCallback((id: string) => _setActiveTab(tabs.find((tab) => tab.id === id) || null), [tabs]);
    const hasTab = useCallback((id: string) => tabs.some((tab) => tab.id === id), [tabs]);
    const createTab = useCallback(
        (tab: Tab) => {
            if (hasTab(tab.id)) {
                return;
            }
            setTabs((tabs) => [...tabs, tab]);
            setActiveTab(tab.id);
        },
        [hasTab, setActiveTab]
    );
    const removeTab = useCallback(
        (id: string) => {
            setTabs((tabs) => tabs.filter((tab) => tab.id !== id));
            if (activeTab?.id === id) {
                setActiveTab(tabs[0]?.id);
            }
        },
        [activeTab?.id, setActiveTab, tabs]
    );

    const contextValue = useMemo<TabContextProps>(
        () => ({ tabs, activeTab, setActiveTab, hasTab, createTab, removeTab }),
        [tabs, activeTab, setActiveTab, hasTab, createTab, removeTab]
    );

    return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>;
}
