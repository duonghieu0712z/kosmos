<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { computed } from 'vue';

import { useTabs } from '@/components/custom/tabs';
import { ScrollArea, vWheelX } from '@/components/ui/scroll-area';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

const { tabs, currentTab, popTab } = useTabs();

const tabEle = computed(() => document.querySelector(`[data-tab-id="tab-${currentTab.value}"]`));
</script>

<template>
    <ScrollArea v-wheel-x as-child orientation="horizontal">
        <TabsList class="h-6 w-full justify-start rounded-none p-0" @vue:updated="tabEle?.scrollIntoView(true)">
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
</template>
