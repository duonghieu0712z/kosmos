import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from 'lucide-react';
import { ComponentProps } from 'react';

import { cn } from '@/libs';
import { useTiptapEditor } from '@/tiptap/hooks';

type MarkButtonProps = {
    mark: 'bold' | 'italic' | 'underline' | 'strike' | 'superscript' | 'subscript' | 'code';
};

const MARK_ICONS = {
    bold: Bold,
    italic: Italic,
    underline: Underline,
    strike: Strikethrough,
    superscript: Superscript,
    subscript: Subscript,
    code: Code,
} as const;

export default function MarkButton({ mark, className, ...props }: MarkButtonProps & ComponentProps<'button'>) {
    const { editor, editorState } = useTiptapEditor({
        selector({ editor }) {
            return {
                isActive: editor?.isActive(mark),
                canActive: editor?.can().toggleMark(mark),
            };
        },
    });

    const Icon = MARK_ICONS[mark];
    return (
        <button
            className={cn(
                'btn btn-ghost m-0 size-fit border-none p-1',
                editorState?.isActive && 'btn-active',
                className
            )}
            onClick={() => editor?.chain().focus().toggleMark(mark).run()}
            disabled={!editorState?.canActive}
            {...props}
        >
            <Icon size={20} strokeWidth={1.5} />
        </button>
    );
}
