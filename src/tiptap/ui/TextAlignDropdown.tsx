import { AlignCenter, AlignJustify, AlignLeft, AlignRight, ChevronDown } from 'lucide-react';
import { ComponentProps, useRef } from 'react';

import { cn } from '@/libs';
import { useTiptapEditor } from '@/tiptap/hooks';

const TEXT_ALIGN_ICONS = {
    left: AlignLeft,
    center: AlignCenter,
    right: AlignRight,
    justify: AlignJustify,
} as const;

export default function TextAlignDropdown({ className, ...props }: ComponentProps<'div'>) {
    const ref = useRef<HTMLDivElement>(null);

    const { editor, editorState } = useTiptapEditor({
        selector({ editor }) {
            const align = Object.keys(TEXT_ALIGN_ICONS).find((textAlign) =>
                editor?.isActive({ textAlign })
            ) as keyof typeof TEXT_ALIGN_ICONS;
            return { align };
        },
    });

    return (
        <div ref={ref} className={cn('dropdown', className)} {...props}>
            <div tabIndex={0} role='button' className='btn btn-ghost m-0 size-fit gap-0 border-none p-1'>
                {(() => {
                    const Icon = TEXT_ALIGN_ICONS[editorState?.align ?? 'left'];
                    return <Icon size={20} strokeWidth={1.5} />;
                })()}
                <ChevronDown size={12} strokeWidth={1.5} />
            </div>

            <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow-sm'>
                {Object.entries(TEXT_ALIGN_ICONS).map(([align, Icon]) => (
                    <li key={align}>
                        <button
                            className='m-0 size-fit p-1'
                            onClick={() => {
                                editor?.chain().focus().setTextAlign(align).run();
                                ref.current?.blur();
                            }}
                        >
                            <Icon size={20} strokeWidth={1.5} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
