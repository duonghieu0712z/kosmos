import { createContext } from 'reka-ui';

export const [useSettings, provideSettingsContext] = createContext<{
    openSettings: () => Promise<void>;
}>('Settings');
