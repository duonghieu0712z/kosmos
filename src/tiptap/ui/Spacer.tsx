import { ComponentProps } from 'react';

import { cn } from '@/libs';

type SpacerProps = {
    orientation?: 'horizontal' | 'vertical';
};

export default function Spacer({ orientation = 'vertical', className, ...props }: SpacerProps & ComponentProps<'div'>) {
    return (
        <div
            className={cn('divider m-0', orientation === 'vertical' && 'divider-horizontal', className)}
            {...props}
        ></div>
    );
}
