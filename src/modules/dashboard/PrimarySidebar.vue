<script setup lang="ts">
import { BookText, PencilRuler, Settings } from 'lucide-vue-next';
import { h, ref } from 'vue';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';
import SidebarSeparator from '@/components/ui/sidebar/SidebarSeparator.vue';

const ITEMS = [
    {
        name: 'Story',
        icon: BookText,
    },
    {
        name: 'Wiki',
        icon: PencilRuler,
    },
];

const activeItem = ref(ITEMS[0]);
const { setOpen } = useSidebar();
</script>

<template>
    <Sidebar collapsible="icon" class="overflow-hidden *:data-[sidebar=sidebar]:flex-row">
        <Sidebar collapsible="none" class="w-[calc(var(--sidebar-width-icon)+1px)] border-r">
            <SidebarHeader>
                <SidebarTrigger class="size-8" />
            </SidebarHeader>
            <SidebarSeparator />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem v-for="item in ITEMS" :key="item.name">
                                <SidebarMenuButton
                                    :tooltip="h('div', { hidden: false }, item.name)"
                                    :is-active="activeItem.name === item.name"
                                    @click="
                                        () => {
                                            activeItem = item;
                                            setOpen(true);
                                        }
                                    "
                                >
                                    <component :is="item.icon" />
                                    <span>{{ item.name }}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarSeparator />
            <SidebarFooter>
                <SidebarMenuButton :tooltip="h('div', { hidden: false }, 'Settings')">
                    <Settings />
                    <span class="sr-only">Settings</span>
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    </Sidebar>
</template>
