import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

type Tab = {
    id: string;
    name: string;
};

type TabContextProps = {
    tabs: Tab[];
    activeTab?: string;
    setActiveTab: (id: string) => void;
    hasTab: (id: string) => boolean;
    addTab: (tab: Tab) => void;
    removeTab: (id: string) => void;
};

const TabContext = createContext<TabContextProps>(null!);

export function useTab() {
    return useContext(TabContext);
}

const HISTORY_LIMIT = 100;

function useTabHistory() {
    const [tabHistory, setTabHistory] = useState<string[]>([]);

    const activeTab = useMemo(() => tabHistory.at(-1), [tabHistory]);

    const pushTabHistory = useCallback(
        (id: string) =>
            setTabHistory((history) => {
                if (activeTab === id) {
                    return history;
                }

                if (history.length === HISTORY_LIMIT) {
                    history.shift();
                }

                return [...history, id];
            }),
        [activeTab]
    );

    const removeTabHistory = useCallback(
        (id: string) => setTabHistory((history) => history.filter((tab) => tab !== id)),
        []
    );

    return { activeTab, pushTabHistory, removeTabHistory };
}

export function TabProvider({ children }: { children: ReactNode }) {
    const [tabs, setTabs] = useState<Tab[]>([]);
    const { activeTab, pushTabHistory, removeTabHistory } = useTabHistory();

    const hasTab = useCallback((id: string) => tabs.some((tab) => tab.id === id), [tabs]);

    const setActiveTab = useCallback(
        (id: string) => {
            if (!hasTab(id)) {
                return;
            }
            pushTabHistory(id);
        },
        [hasTab, pushTabHistory]
    );

    const addTab = useCallback(
        (tab: Tab) => {
            setTabs((tabs) => {
                if (hasTab(tab.id)) {
                    return tabs;
                }
                return [...tabs, tab];
            });
            pushTabHistory(tab.id);
        },
        [hasTab, pushTabHistory]
    );

    const removeTab = useCallback(
        (id: string) => {
            setTabs((tabs) => tabs.filter((tab) => tab.id !== id));
            removeTabHistory(id);
        },
        [removeTabHistory]
    );

    const contextValue = useMemo<TabContextProps>(
        () => ({ tabs, activeTab, setActiveTab, hasTab, addTab: addTab, removeTab }),
        [tabs, activeTab, setActiveTab, hasTab, addTab, removeTab]
    );

    return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>;
}
