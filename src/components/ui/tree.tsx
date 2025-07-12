import { ChevronRight } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar';

type TreeItem = {
    uuid: string;
    name: string;
    children?: TreeItem[];
};

export function TreeView<T extends TreeItem>({ items, size = 'sm' }: { items: T | T[]; size?: 'sm' | 'default' }) {
    if (Array.isArray(items)) {
        return items.map((item) => <TreeView key={item.uuid} items={item} size={size} />);
    }

    const { name, children } = items;
    if (!children?.length) {
        return <SidebarMenuButton size={size}>{name}</SidebarMenuButton>;
    }

    return (
        <SidebarMenuItem>
            <Collapsible className='group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90'>
                <SidebarMenuButton size={size}>
                    <CollapsibleTrigger asChild>
                        <ChevronRight className='transition-transform' />
                    </CollapsibleTrigger>
                    {name}
                </SidebarMenuButton>

                <CollapsibleContent>
                    <SidebarMenuSub>
                        <TreeView items={children} size={size} />
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    );
}
