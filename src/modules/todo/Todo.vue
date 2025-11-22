<script setup lang="ts">
import { getName, getVersion } from '@tauri-apps/api/app';
import { onMounted, ref } from 'vue';

const appName = ref('');
const appVersion = ref('');

onMounted(async () => {
    appName.value = await getName();
    appVersion.value = await getVersion();
});
</script>

<template>
    <div class="flex h-full flex-col items-center justify-center">
        <div class="font-lucida-calligraphy text-6xl font-bold">{{ appName }}</div>
        <div class="text-xs">v{{ appVersion }}</div>

        <div class="mt-6 mb-2 text-2xl font-semibold">Coming Soon</div>
        <div>This feature is currently in development. Please check back later.</div>
    </div>
</template>
