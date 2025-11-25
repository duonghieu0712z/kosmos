<script setup lang="ts">
import { Settings2 } from 'lucide-vue-next';

import { useTabs } from '@/components/custom/tabs';

import Settings from './Settings.vue';
import { provideSettingsContext } from './utils';

const { pushTab } = useTabs();

function openSettings() {
    pushTab({ id: 'settings', name: 'Settings', icon: Settings2, component: Settings });
}

provideSettingsContext({ openSettings });
</script>

<template>
    <slot />
</template>
