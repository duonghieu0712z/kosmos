<script setup lang="ts">
import { SidebarProvider } from '@/components/ui/sidebar';

import MainContent from './MainContent.vue';
import PrimarySidebar from './PrimarySidebar.vue';
</script>

<template>
    <SidebarProvider class="flex flex-col" :style="{ '--sidebar-width': '300px' }">
        <main class="flex flex-1">
            <PrimarySidebar />
            <MainContent />
        </main>
    </SidebarProvider>
</template>
