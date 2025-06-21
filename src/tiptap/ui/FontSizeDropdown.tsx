import { ChevronDown } from 'lucide-react';
import { ComponentProps, useRef } from 'react';

import { cn } from '@/libs';
import { useTiptapEditor } from '@/tiptap/hooks';

const FONT_SIZES = [10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72] as const;

function formatFontSize(size: string) {
    return parseFloat(size);
}

export default function FontSizeDropdown({ className, ...props }: ComponentProps<'div'>) {
    const ref = useRef<HTMLDivElement>(null);

    const { editor, editorState } = useTiptapEditor({
        selector({ editor }) {
            const fontSize = editor?.getAttributes('textStyle').fontSize || '12pt';
            return { fontSize };
        },
    });

    return (
        <div ref={ref} className={cn('dropdown', className)} {...props}>
            <div tabIndex={0} role='button' className='btn btn-ghost m-0 size-fit gap-0 border-none p-1'>
                <div className='w-6 text-start'>{formatFontSize(editorState!.fontSize)}</div>
                <ChevronDown size={12} strokeWidth={1.5} />
            </div>

            <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow-sm'>
                {FONT_SIZES.map((size) => (
                    <li key={size}>
                        <button
                            onClick={() => {
                                editor?.chain().focus().setFontSize(`${size}pt`).run();
                                ref.current?.blur();
                            }}
                        >
                            {size}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
