import { LucideIcon } from 'lucide-react';
import { ComponentProps } from 'react';
import { NavLinkProps, useNavigate } from 'react-router';

import { cn } from '@/libs';

type SidebarButtonProps = {
    icon: LucideIcon;
    name: string;
    isExpanded?: boolean;
    to?: NavLinkProps['to'];
};

export default function SidebarButton({
    icon: Icon,
    name,
    isExpanded,
    className,
    to,
    ...props
}: SidebarButtonProps & ComponentProps<'button'>) {
    const navigate = useNavigate();
    return (
        <button
            data-tip={name}
            className={cn(
                'btn btn-ghost flex w-full justify-start gap-2 px-1 font-medium',
                !isExpanded && 'tooltip tooltip-right',
                className
            )}
            {...props}
            onClick={(ev) => {
                props.onClick?.(ev);
                if (to) {
                    navigate(to, { replace: true });
                }
            }}
        >
            <Icon strokeWidth={1.5} />
            {isExpanded && name}
        </button>
    );
}
