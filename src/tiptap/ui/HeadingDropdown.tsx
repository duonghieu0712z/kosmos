import { ChevronDown, Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from 'lucide-react';
import { ComponentProps, useRef } from 'react';

import { cn } from '@/libs';
import { useTiptapEditor } from '@/tiptap/hooks';

const HEADING_ICONS = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6] as const;

export default function HeadingDropdown({ className, ...props }: ComponentProps<'div'>) {
    const ref = useRef<HTMLDivElement>(null);

    const { editor, editorState } = useTiptapEditor({
        selector({ editor }) {
            const level: number = editor?.getAttributes('heading').level ?? 0;
            return { level };
        },
    });
    const isHeading = editorState?.level !== 0;

    return (
        <div ref={ref} className={cn('dropdown', className)} {...props}>
            <div
                tabIndex={0}
                role='button'
                className={cn('btn btn-ghost m-0 size-fit gap-0 border-none p-1', isHeading && 'btn-active')}
            >
                {isHeading ? (
                    (() => {
                        const Icon = HEADING_ICONS[editorState!.level - 1];
                        return <Icon size={20} strokeWidth={1.5} />;
                    })()
                ) : (
                    <Heading size={20} strokeWidth={1.5} />
                )}
                <ChevronDown size={12} strokeWidth={1.5} />
            </div>

            <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow-sm'>
                {HEADING_ICONS.map((Icon, i) => (
                    <li key={`heading-${i + 1}`}>
                        <button
                            className='grid-cols-1'
                            onClick={() => {
                                editor
                                    ?.chain()
                                    .focus()
                                    .setNode('heading', { level: i + 1 })
                                    .run();
                                ref.current?.blur();
                            }}
                        >
                            <Icon size={20} strokeWidth={1.5} />
                            Heading {i + 1}
                        </button>
                    </li>
                ))}
                <hr className='bg-neutral my-1 h-px border-0' />
                <li key='paragraph'>
                    <button
                        onClick={() => {
                            editor?.chain().focus().setNode('paragraph').run();
                            ref.current?.blur();
                        }}
                    >
                        <div className='size-5'></div>
                        Paragraph
                    </button>
                </li>
            </ul>
        </div>
    );
}
