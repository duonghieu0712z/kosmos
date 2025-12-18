import { createGlobalState } from '@vueuse/core';
import { Settings2 } from 'lucide-vue-next';
import { markRaw, shallowRef } from 'vue';

import { useTabsStore } from '@/stores';

import Settings from './Settings.vue';

export const useSettings = createGlobalState(() => {
    const store = useTabsStore();

    const openSettings = async () => {
        await store.pushTab({
            id: 'settings',
            name: 'Settings',
            icon: markRaw(Settings2),
            component: shallowRef(markRaw(Settings)),
        });
    };

    return { openSettings };
});
