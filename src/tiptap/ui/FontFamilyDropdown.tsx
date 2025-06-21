import { ChevronDown } from 'lucide-react';
import { ComponentProps, useRef } from 'react';

import { cn } from '@/libs';
import { useTiptapEditor } from '@/tiptap/hooks';

const FONT_FAMILIES = ['Default', 'Lucida_Calligraphy'] as const;

function formatFontFamily(fontFamily: string) {
    return fontFamily.replace(/_/g, ' ');
}

export default function FontFamilyDropdown({ className, ...props }: ComponentProps<'div'>) {
    const ref = useRef<HTMLDivElement>(null);

    const { editor, editorState } = useTiptapEditor({
        selector({ editor }) {
            const fontFamily = editor?.getAttributes('textStyle').fontFamily || 'Default';
            return { fontFamily };
        },
    });

    return (
        <div ref={ref} className={cn('dropdown', className)} {...props}>
            <div tabIndex={0} role='button' className='btn btn-ghost m-0 size-fit gap-0 border-none p-1'>
                <div className='w-20 overflow-x-hidden text-start text-ellipsis whitespace-nowrap'>
                    {formatFontFamily(editorState!.fontFamily)}
                </div>
                <ChevronDown size={12} strokeWidth={1.5} />
            </div>

            <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow-sm'>
                {FONT_FAMILIES.map((fontFamily) => (
                    <li key={fontFamily}>
                        <button
                            className={`text-start whitespace-nowrap font-[${fontFamily}]`}
                            onClick={() => {
                                editor?.chain().focus().setFontFamily(fontFamily).run();
                                ref.current?.blur();
                            }}
                        >
                            {formatFontFamily(fontFamily)}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
