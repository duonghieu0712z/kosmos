<script setup lang="ts">
import { BookText, PencilRuler, Settings } from 'lucide-vue-next';
import { ref } from 'vue';

import { ThemeToggle } from '@/components/custom/theme';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
    useSidebar,
} from '@/components/ui/sidebar';
import { useSettings } from '@/modules/settings';

import Explorer from './Explorer.vue';

const sidebarButtonClass =
    'data-[active=true]:[&>svg]:stroke-sidebar-foreground hover:[&>svg]:stroke-sidebar-foreground hover:bg-sidebar data-[active=true]:before:border-sidebar-foreground flex h-12 items-center justify-center rounded-none group-data-[collapsible=icon]:size-12! hover:cursor-pointer data-[active=true]:before:absolute data-[active=true]:before:top-0 data-[active=true]:before:left-0 data-[active=true]:before:h-full data-[active=true]:before:border-l-2';

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

const { open, setOpen, toggleSidebar } = useSidebar();
const { openSettings } = useSettings();

const activeItem = ref(ITEMS[0]);
</script>

<template>
    <Sidebar class="overflow-hidden *:data-[sidebar=sidebar]:flex-row" collapsible="icon">
        <Sidebar class="w-(--sidebar-width-icon) border-r" collapsible="none">
            <SidebarContent>
                <SidebarGroup class="p-0">
                    <SidebarGroupContent>
                        <SidebarMenu class="gap-0 overflow-x-hidden">
                            <SidebarMenuItem v-for="item in ITEMS" :key="item.name">
                                <SidebarMenuButton
                                    always-show-tooltip
                                    :class="sidebarButtonClass"
                                    :is-active="open && item.name === activeItem.name"
                                    :tooltip="item.name"
                                    @click="
                                        () => {
                                            if (item.name === activeItem.name) {
                                                toggleSidebar();
                                            } else {
                                                activeItem = item;
                                                setOpen(true);
                                            }
                                        }
                                    "
                                >
                                    <component :is="item.icon" class="stroke-muted-foreground size-6" />
                                    <span class="sr-only">{{ item.name }}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarSeparator />
            <SidebarFooter class="gap-0 p-0">
                <SidebarMenuButton as-child>
                    <ThemeToggle />
                </SidebarMenuButton>

                <SidebarMenuButton
                    always-show-tooltip
                    :class="sidebarButtonClass"
                    tooltip="Settings"
                    @click="openSettings"
                >
                    <Settings class="stroke-muted-foreground size-6" />
                    <span class="sr-only">Settings</span>
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>

        <Explorer />
    </Sidebar>
</template>
