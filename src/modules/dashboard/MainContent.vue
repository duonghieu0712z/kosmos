<script setup lang="ts">
import { X } from 'lucide-vue-next';
import type { VNode } from 'vue';

import { useTabs } from '@/components/custom/tabs';
import { ScrollArea, vWheelX } from '@/components/ui/scroll-area';
import { SidebarInset } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Todo } from '@/modules/todo';

const { tabs, currentTab, activeTab, popTab } = useTabs();

function scrollToTab(value: VNode) {
    if (currentTab.value) {
        (value.el as HTMLElement)?.querySelector(`[data-tab-id="tab-${currentTab.value}"]`)?.scrollIntoView(true);
    }
}
</script>

<template>
    <SidebarInset class="min-w-0 items-center justify-center">
        <Tabs
            class="size-full gap-0"
            :model-value="currentTab"
            @update:model-value="(value) => activeTab(value as string)"
        >
            <ScrollArea v-wheel-x orientation="horizontal">
                <TabsList class="h-6 w-full justify-start rounded-none p-0" @vue:updated="scrollToTab">
                    <TabsTrigger
                        v-for="tab in tabs"
                        :key="tab.id"
                        class="data-active:after:border-ring relative flex-none justify-end rounded-none pr-0.5 hover:cursor-pointer data-active:after:absolute data-active:after:bottom-0 data-active:after:left-0 data-active:after:w-full data-active:after:border-b-2 hover:[&>span]:opacity-100 data-active:[&>span]:opacity-100"
                        :data-tab-id="`tab-${tab.id}`"
                        :value="tab.id"
                    >
                        <component :is="tab.icon" v-if="tab.icon" />
                        <div class="flex-1 truncate text-xs">{{ tab.name }}</div>
                        <span
                            class="hover:bg-ring/20 rounded opacity-0"
                            @click="popTab(tab.id)"
                            @mousedown="
                                (ev) => {
                                    ev.preventDefault();
                                    ev.stopPropagation();
                                }
                            "
                            ><X
                        /></span>
                    </TabsTrigger>
                </TabsList>
            </ScrollArea>

            <TabsContent v-for="tab in tabs" :key="tab.id" as-child :value="tab.id">
                <component :is="tab.component" v-if="tab.component" v-bind="tab.props" />
                <Todo v-else />
            </TabsContent>
        </Tabs>
    </SidebarInset>
</template>
