import { ComponentProps } from 'react';

import { cn } from '@/libs';

export default function SidebarSeparator({ className, ...props }: ComponentProps<'hr'>) {
    return <div className={cn('divider m-0', className)} {...props}></div>;
}
