<script setup lang="ts">
import { XIcon } from 'lucide-vue-next';

import { ScrollArea, vWheelX } from '@/components/ui/scroll-area';
import { SidebarInset } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Startup } from '@/modules/startup';
import { Todo } from '@/modules/todo';
import { useTabsStore } from '@/stores';

const store = useTabsStore();
</script>

<template>
    <SidebarInset class="min-w-0 items-center justify-center">
        <template v-if="store.tabs.length === 0">
            <Startup />
        </template>

        <template v-else>
            <Tabs
                class="size-full gap-2"
                :model-value="store.currentTab"
                @update:model-value="store.activeTab($event as string)"
            >
                <ScrollArea v-wheel-x orientation="horizontal">
                    <TabsList>
                        <TabsTrigger
                            v-for="tab in store.tabs"
                            :key="tab.id"
                            :class="[
                                'relative min-w-30 pr-1',
                                'hover:cursor-pointer hover:[&>span]:opacity-100',
                                'data-active:after:border-ring data-active:after:absolute data-active:after:bottom-0 data-active:after:left-0 data-active:after:w-full data-active:after:border-b-2 data-active:[&>span]:opacity-100',
                            ]"
                            :data-tab-id="`kosmos-tab-${tab.id}`"
                            :value="tab.id"
                            @click="store.activeTab(tab.id)"
                        >
                            <component :is="tab.icon" v-if="tab.icon" />
                            <div class="flex-1 truncate text-left text-xs">{{ tab.name }}</div>
                            <span
                                class="hover:bg-ring/20 rounded opacity-0"
                                @click.stop="store.popTab(tab.id)"
                                @mousedown.stop.prevent
                            >
                                <XIcon />
                            </span>
                        </TabsTrigger>
                    </TabsList>
                </ScrollArea>

                <TabsContent v-for="tab in store.tabs" :key="tab.id" as-child :value="tab.id">
                    <component :is="tab.component" v-if="tab.component" v-bind="tab.props" />
                    <Todo v-else />
                </TabsContent>
            </Tabs>
        </template>
    </SidebarInset>
</template>
