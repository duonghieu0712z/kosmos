<script setup lang="ts">
import { useTabs } from '@/components/custom/tabs';
import { SidebarInset } from '@/components/ui/sidebar';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Todo } from '@/modules/todo';

import TabsList from './TabsList.vue';

const { tabs, currentTab, activeTab } = useTabs();
</script>

<template>
    <SidebarInset class="min-w-0 items-center justify-center">
        <Tabs
            class="size-full gap-0"
            :model-value="currentTab"
            @update:model-value="(value) => activeTab(value as string)"
        >
            <TabsList />

            <TabsContent v-for="tab in tabs" :key="tab.id" as-child :value="tab.id">
                <component :is="tab.component" v-if="tab.component" />
                <Todo v-else />
            </TabsContent>
        </Tabs>
    </SidebarInset>
</template>
