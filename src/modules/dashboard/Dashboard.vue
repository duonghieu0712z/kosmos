<script setup lang="ts">
import { TabsProvider } from '@/components/custom/tabs';
import { SidebarProvider } from '@/components/ui/sidebar';

import MainContent from './MainContent.vue';
import PrimarySidebar from './PrimarySidebar.vue';
</script>

<template>
    <SidebarProvider class="flex flex-col" :style="{ '--sidebar-width': '300px' }">
        <TabsProvider>
            <main class="flex flex-1">
                <PrimarySidebar />
                <MainContent />
            </main>
        </TabsProvider>
    </SidebarProvider>
</template>
