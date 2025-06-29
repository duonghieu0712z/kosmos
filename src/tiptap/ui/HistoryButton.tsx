import { Redo, Undo } from 'lucide-react';
import { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { useTiptapEditor } from '@/tiptap/hooks';

type HistoryButtonProps = {
    action: 'undo' | 'redo';
};

const ACTION_ICONS = {
    undo: Undo,
    redo: Redo,
} as const;

export default function HistoryButton({ action, ...props }: HistoryButtonProps & ComponentProps<'button'>) {
    const { editor, editorState } = useTiptapEditor({
        selector({ editor }) {
            return { canActive: editor?.can()[action]() };
        },
    });

    const Icon = ACTION_ICONS[action];
    return (
        <Button
            variant='ghost'
            size='icon'
            onClick={() => editor?.commands[action]()}
            disabled={!editorState?.canActive}
            {...props}
        >
            <Icon />
        </Button>
    );
}
