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
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';

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
    <Sidebar collapsible="icon" class="overflow-hidden transition-none *:data-[sidebar=sidebar]:flex-row">
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
                                    <span class="sr-only">{{ item.name }}</span>
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
