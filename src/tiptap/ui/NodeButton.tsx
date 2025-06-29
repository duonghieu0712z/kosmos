import { Minus, SquareCode, TextQuote, WrapText } from 'lucide-react';
import { ComponentProps } from 'react';

import { Toggle } from '@/components/ui/toggle';
import { useTiptapEditor } from '@/tiptap/hooks';

const NODE_ICONS = {
    blockquote: TextQuote,
    codeblock: SquareCode,
    hardBreak: WrapText,
    horizontalRule: Minus,
} as const;

type NodeButtonProps = {
    node: keyof typeof NODE_ICONS;
};

export default function NodeButton({ node, ...props }: NodeButtonProps & ComponentProps<'button'>) {
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
                case 'hardBreak':
                    canActive = editor!.can().setHardBreak();
                    break;
                case 'horizontalRule':
                    canActive = editor!.can().setHorizontalRule();
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
        <Toggle
            data-state={editorState?.isActive ? 'on' : 'off'}
            size='sm'
            onClick={() => {
                switch (node) {
                    case 'blockquote':
                        editor?.chain().focus().toggleBlockquote().run();
                        break;
                    case 'codeblock':
                        editor?.chain().focus().toggleCodeBlock().run();
                        break;
                    case 'hardBreak':
                        editor?.chain().focus().setHardBreak().run();
                        break;
                    case 'horizontalRule':
                        editor?.chain().focus().setHorizontalRule().run();
                        break;
                }
            }}
            disabled={!editorState?.canActive}
            {...props}
        >
            <Icon />
        </Toggle>
    );
}
