import { ChevronDown } from 'lucide-react';
import { ComponentProps, useRef } from 'react';

import { cn } from '@/libs';
import { useTiptapEditor } from '@/tiptap/hooks';
import { DEFAULT_FONT, SYSTEM_FONTS } from '@/utils';

import Spacer from './Spacer';

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
                    {editorState!.fontFamily}
                </div>
                <ChevronDown size={12} strokeWidth={1.5} />
            </div>

            <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow-sm'>
                <div className='h-60 overflow-auto'>
                    {SYSTEM_FONTS.map((font) => (
                        <>
                            <li key={font}>
                                <button
                                    className='text-start whitespace-nowrap'
                                    style={{ fontFamily: font }}
                                    onClick={() => {
                                        editor?.chain().focus().setFontFamily(font).run();
                                        ref.current?.blur();
                                    }}
                                >
                                    {font}
                                </button>
                            </li>
                            {font === DEFAULT_FONT && <Spacer orientation='horizontal' />}
                        </>
                    ))}
                </div>
            </ul>
        </div>
    );
}
