import { createContext } from 'reka-ui';

export const [useSettings, provideSettingsContext] = createContext<{
    openSettings: () => void;
}>('Settings');
