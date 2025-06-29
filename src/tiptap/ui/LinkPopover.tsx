import { Link } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function LinkPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='ghost' size='icon' className='size-8'>
                    <Link />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div>Link</div>
            </PopoverContent>
        </Popover>
    );
}
