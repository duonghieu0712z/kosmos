import { createGlobalState } from '@vueuse/core';
import { Settings2 } from 'lucide-vue-next';
import { markRaw, shallowRef } from 'vue';

import { useTabs } from '@/composables';

import Settings from './Settings.vue';

export const useSettings = createGlobalState(() => {
    const { pushTab } = useTabs();

    const openSettings = async () => {
        await pushTab({
            id: 'settings',
            name: 'Settings',
            icon: markRaw(Settings2),
            component: shallowRef(markRaw(Settings)),
        });
    };

    return { openSettings };
});
