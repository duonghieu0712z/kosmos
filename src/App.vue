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
    <div class="h-screen overflow-hidden">
        <div class="flex h-full flex-col items-center justify-center gap-0.5">
            <div class="font-lucida-calligraphy text-6xl font-bold">{{ appName }}</div>
            <div class="text-xs">v{{ appVersion }}</div>
        </div>
    </div>
</template>
