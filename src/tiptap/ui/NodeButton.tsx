import { SquareCode, TextQuote } from 'lucide-react';
import { ComponentProps } from 'react';

import { cn } from '@/libs';
import { useTiptapEditor } from '@/tiptap/hooks';

const NODE_ICONS = {
    blockquote: TextQuote,
    codeblock: SquareCode,
} as const;

type NodeButtonProps = {
    node: keyof typeof NODE_ICONS;
};

export default function NodeButton({ node, className, ...props }: NodeButtonProps & ComponentProps<'button'>) {
    const { editor, editorState } = useTiptapEditor({
        selector({ editor }) {
            let canActive = true;
            switch (node) {
                case 'blockquote':
                    canActive = editor!.can().toggleBlockquote();
                    break;
                case 'codeblock':
                    canActive = editor!.can().toggleCodeBlock();
                    break;
            }
            return {
                isActive: editor?.isActive(node),
                canActive,
            };
        },
    });

    const Icon = NODE_ICONS[node];
    return (
        <button
            className={cn(
                'btn btn-ghost m-0 size-fit border-none p-1',
                editorState?.isActive && 'btn-active',
                className
            )}
            onClick={() => {
                switch (node) {
                    case 'blockquote':
                        editor?.chain().focus().toggleBlockquote().run();
                        break;
                    case 'codeblock':
                        editor?.chain().focus().toggleCodeBlock().run();
                        break;
                }
            }}
            disabled={!editorState?.canActive}
            {...props}
        >
            <Icon size={20} strokeWidth={1.5} />
        </button>
    );
}
