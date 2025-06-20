import { ChevronDown, ListIcon, ListOrdered } from 'lucide-react';
import { ComponentProps, useRef } from 'react';

import { cn } from '@/libs';
import { useTiptapEditor } from '@/tiptap/hooks';

const LIST_ICONS = {
    bullet: ListIcon,
    ordered: ListOrdered,
} as const;

export default function ListDropdown({ className, ...props }: ComponentProps<'div'>) {
    const ref = useRef<HTMLDivElement>(null);

    const { editor, editorState } = useTiptapEditor({
        selector({ editor }) {
            const listType = Object.keys(LIST_ICONS).find((type) =>
                editor?.isActive(`${type}List`)
            ) as keyof typeof LIST_ICONS;
            return { listType };
        },
    });
    const isActive = !!editorState?.listType;

    return (
        <div ref={ref} className={cn('dropdown', className)} {...props}>
            <div
                tabIndex={0}
                role='button'
                className={cn('btn btn-ghost m-0 size-fit gap-0 border-none p-1', isActive && 'btn-active')}
            >
                {(() => {
                    const Icon = LIST_ICONS[editorState?.listType ?? 'bullet'];
                    return <Icon size={20} strokeWidth={1.5} />;
                })()}
                <ChevronDown size={12} strokeWidth={1.5} />
            </div>

            <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow-sm'>
                {Object.entries(LIST_ICONS).map(([listType, Icon]) => (
                    <li key={listType}>
                        <button
                            className='m-0 size-fit p-1'
                            onClick={() => {
                                switch (listType) {
                                    case 'bullet':
                                        editor?.chain().focus().toggleBulletList().run();
                                        break;
                                    case 'ordered':
                                        editor?.chain().focus().toggleOrderedList().run();
                                        break;
                                }
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
