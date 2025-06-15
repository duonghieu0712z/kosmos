import { ComponentProps } from 'react';

import { cn } from '@/libs';

export default function SidebarSeparator({ className, ...props }: ComponentProps<'hr'>) {
    return <hr className={cn('bg-neutral my-1 h-px border-0', className)} {...props} />;
}
