import { BookText, PencilRuler, Settings } from 'lucide-react';
import { useState } from 'react';

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

export default function PrimarySidebar() {
    const [activeItem, setActiveItem] = useState(ITEMS[0]);
    const { setOpen } = useSidebar();

    return (
        <Sidebar
            collapsible='icon'
            className='h-[calc(100%-var(--footer-height))] overflow-hidden *:data-[sidebar=sidebar]:flex-row'
        >
            <Sidebar collapsible='none' className='w-[calc(var(--sidebar-width-icon)+1px)] border-r'>
                <SidebarHeader>
                    <SidebarTrigger className='size-9' />
                </SidebarHeader>
                <SidebarSeparator />

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {ITEMS.map((item) => (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton
                                            tooltip={{ children: item.name, hidden: false }}
                                            isActive={activeItem.name === item.name}
                                            onClick={() => {
                                                setActiveItem(item);
                                                setOpen(true);
                                            }}
                                        >
                                            <item.icon />
                                            <span>{item.name}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarSeparator />
                <SidebarFooter>
                    <SidebarMenuButton>
                        <Settings />
                    </SidebarMenuButton>
                </SidebarFooter>
            </Sidebar>

            <Sidebar collapsible='none' className='hidden flex-1 md:flex'>
                <SidebarHeader>Dashboard</SidebarHeader>
            </Sidebar>
        </Sidebar>
    );
}
