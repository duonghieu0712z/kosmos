import { Bold } from 'lucide-react';

import { Button } from '@/components/ui/Button';

export default function ToolBar() {
    return (
        <div className='menu menu-horizontal rounded-box bg-base-200 w-full'>
            <Button>
                <Bold />
            </Button>
        </div>
    );
}
