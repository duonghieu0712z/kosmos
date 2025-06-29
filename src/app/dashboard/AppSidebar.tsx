import { BookText, Eye, Globe2, Home, Hourglass, Map, PencilRuler, Settings } from 'lucide-react';
import { Link } from 'react-router';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarSeparator,
    SidebarTrigger,
} from '@/components/ui/sidebar';

const MENU_ITEMS = [
    { name: 'Home', icon: Home, to: 'home' },
    { name: 'Story', icon: BookText, to: 'story' },
    { name: 'Wiki', icon: PencilRuler, to: 'wiki' },
    { name: 'Map', icon: Map, to: 'map' },
    { name: 'Timeline', icon: Hourglass, to: 'timeline' },
    { name: 'World Settings', icon: Globe2, to: 'world-settings' },
    { name: 'View World', icon: Eye, to: 'view-world' },
];

export default function AppSidebar() {
    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader>
                <SidebarTrigger />
            </SidebarHeader>
            <SidebarSeparator />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {MENU_ITEMS.map((menu) => (
                            <SidebarMenuButton key={menu.name} tooltip={menu.name} asChild>
                                <Link to={menu.to} className='whitespace-nowrap'>
                                    <menu.icon />
                                    <div>{menu.name}</div>
                                </Link>
                            </SidebarMenuButton>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarSeparator />
            <SidebarFooter>
                <SidebarMenuButton tooltip='Settings' asChild>
                    <Link to='settings'>
                        <Settings />
                        <div>Settings</div>
                    </Link>
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    );
}
