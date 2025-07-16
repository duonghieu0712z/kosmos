import { Search } from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { useTab } from '@/components/ui/tab-provider';
import { TreeView } from '@/components/ui/tree';

const wiki = [
    {
        uuid: 'characters',
        name: 'Characters',
        children: [
            { uuid: 'character-1', name: 'Character 1' },
            { uuid: 'character-2', name: 'Character 2' },
            { uuid: 'character-3', name: 'Character 3' },
        ],
    },
    {
        uuid: 'locations',
        name: 'Locations',
        children: [
            { uuid: 'location-1', name: 'Location 1' },
            { uuid: 'location-2', name: 'Location 2' },
            { uuid: 'location-3', name: 'Location 3' },
        ],
    },
    {
        uuid: 'organizations',
        name: 'Organizations',
        children: [
            { uuid: 'organization-1', name: 'Organization 1' },
            { uuid: 'organization-2', name: 'Organization 2' },
            { uuid: 'organization-3', name: 'Organization 3' },
        ],
    },
];

export default function TreeSidebar() {
    const { createTab } = useTab();

    return (
        <Sidebar collapsible='none' className='hidden flex-1 md:flex'>
            <SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupContent className='relative'>
                        <SidebarInput id='search' placeholder='Search...' className='pl-8' />
                        <Search className='pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none' />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarHeader>
            <SidebarSeparator />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <TreeView
                                items={wiki}
                                size='sm'
                                onClick={(id, name) => {
                                    createTab({ id, name });
                                }}
                            />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
