import { ChevronRight } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar';

type TreeItem = {
    uuid: string;
    name: string;
    children?: TreeItem[];
};

export function TreeView<T extends TreeItem>({
    items,
    size = 'default',
    arrowOnly = false,
    onClick,
}: {
    items: T | T[];
    size?: 'default' | 'sm' | 'lg';
    arrowOnly?: boolean;
    onClick?: (id: string, name: string) => void;
}) {
    if (Array.isArray(items)) {
        return items.map((item) => <TreeView key={item.uuid} items={item} size={size} onClick={onClick} />);
    }

    const { name, children } = items;
    if (!children?.length) {
        return (
            <SidebarMenuButton size={size} onClick={() => onClick?.(items.uuid, items.name)}>
                {name}
            </SidebarMenuButton>
        );
    }

    return (
        <SidebarMenuItem>
            <Collapsible className='group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90'>
                {arrowOnly ? (
                    <SidebarMenuButton size={size}>
                        <CollapsibleTrigger asChild>
                            <ChevronRight className='transition-transform' />
                        </CollapsibleTrigger>
                        {name}
                    </SidebarMenuButton>
                ) : (
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton size={size}>
                            <ChevronRight className='transition-transform' />
                            {name}
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                )}

                <CollapsibleContent>
                    <SidebarMenuSub>
                        <TreeView items={children} size={size} onClick={onClick} />
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    );
}
