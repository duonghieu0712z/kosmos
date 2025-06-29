import { Highlighter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function HighlightPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='ghost' size='icon'>
                    <Highlighter />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div>Highlighter</div>
            </PopoverContent>
        </Popover>
    );
}
