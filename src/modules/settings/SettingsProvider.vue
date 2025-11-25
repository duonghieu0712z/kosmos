<script setup lang="ts">
import { useTabs } from '@/components/custom/tabs';

import Settings from './Settings.vue';
import { provideSettingsContext } from './utils';

const { pushTab } = useTabs();

function openSettings() {
    pushTab({ id: 'settings', name: 'Settings', component: Settings });
}

provideSettingsContext({ openSettings });
</script>

<template>
    <slot />
</template>
