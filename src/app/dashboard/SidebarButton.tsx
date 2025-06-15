import { LucideIcon } from 'lucide-react';
import { ComponentProps } from 'react';

import { cn } from '@/libs';

type SidebarButtonProps = {
    icon: LucideIcon;
    name: string;
    isExpanded?: boolean;
};

export default function SidebarButton({
    icon: Icon,
    name,
    isExpanded,
    className,
    ...props
}: SidebarButtonProps & ComponentProps<'button'>) {
    return (
        <button
            data-tip={name}
            className={cn(
                'btn btn-ghost flex w-full justify-start gap-2 px-1 font-medium',
                !isExpanded && 'tooltip tooltip-right',
                className
            )}
            {...props}
        >
            <Icon strokeWidth={1.5} />
            {isExpanded && name}
        </button>
    );
}
