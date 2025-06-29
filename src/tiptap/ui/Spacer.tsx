import { ComponentProps } from 'react';

import { Separator } from '@/components/ui/separator';

type SpacerProps = {
    orientation?: 'horizontal' | 'vertical';
};

export default function Spacer({ orientation = 'vertical', ...props }: SpacerProps & ComponentProps<'div'>) {
    return <Separator orientation={orientation} {...props} />;
}
