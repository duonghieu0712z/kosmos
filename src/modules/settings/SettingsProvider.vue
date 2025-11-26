<script setup lang="ts">
import { Settings2 } from 'lucide-vue-next';
import { markRaw } from 'vue';

import { useTabs } from '@/components/custom/tabs';

import Settings from './Settings.vue';
import { provideSettingsContext } from './utils';

const { pushTab } = useTabs();

function openSettings() {
    pushTab({ id: 'settings', name: 'Settings', icon: markRaw(Settings2), component: markRaw(Settings) });
}

provideSettingsContext({ openSettings });
</script>

<template>
    <slot />
</template>
