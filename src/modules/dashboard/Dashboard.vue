<script setup lang="ts">
import { TabsProvider } from '@/components/custom/tabs';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SettingsProvider } from '@/modules/settings';

import MainContent from './MainContent.vue';
import PrimarySidebar from './PrimarySidebar.vue';
</script>

<template>
    <SidebarProvider class="flex flex-col" :style="{ '--sidebar-width': '300px' }">
        <TabsProvider>
            <SettingsProvider>
                <main class="flex flex-1">
                    <PrimarySidebar />
                    <MainContent />
                </main>
            </SettingsProvider>
        </TabsProvider>
    </SidebarProvider>
</template>
