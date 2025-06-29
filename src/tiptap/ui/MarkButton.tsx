import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from 'lucide-react';
import { ComponentProps } from 'react';

import { Toggle } from '@/components/ui/toggle';
import { useTiptapEditor } from '@/tiptap/hooks';

const MARK_ICONS = {
    bold: Bold,
    italic: Italic,
    underline: Underline,
    strike: Strikethrough,
    superscript: Superscript,
    subscript: Subscript,
    code: Code,
} as const;

type MarkButtonProps = {
    mark: keyof typeof MARK_ICONS;
};

export default function MarkButton({ mark, ...props }: MarkButtonProps & ComponentProps<'button'>) {
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
        <Toggle
            data-state={editorState?.isActive ? 'on' : 'off'}
            size='sm'
            onClick={() => editor?.chain().focus().toggleMark(mark).run()}
            disabled={!editorState?.canActive}
            {...props}
        >
            <Icon />
        </Toggle>
    );
}
