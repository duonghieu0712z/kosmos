import { Highlighter } from 'lucide-react';

export default function HighlightPopover() {
    return (
        <button className='btn btn-ghost m-0 size-fit border-none p-1'>
            <Highlighter size={20} strokeWidth={1.5} />
        </button>
    );
}
