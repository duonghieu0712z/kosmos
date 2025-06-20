import { Link } from 'lucide-react';

export default function LinkPopover() {
    return (
        <button className='btn btn-ghost m-0 size-fit border-none p-1'>
            <Link size={20} strokeWidth={1.5} />
        </button>
    );
}
