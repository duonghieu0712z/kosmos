import { Redo, Undo } from 'lucide-react';
import { ComponentProps } from 'react';

import { cn } from '@/libs';
import { useTiptapEditor } from '@/tiptap/hooks';

type HistoryButtonProps = {
    action: 'undo' | 'redo';
};

const ACTION_ICONS = {
    undo: Undo,
    redo: Redo,
} as const;

export default function HistoryButton({ action, className, ...props }: HistoryButtonProps & ComponentProps<'button'>) {
    const { editor, editorState } = useTiptapEditor({
        selector({ editor }) {
            return { canActive: editor?.can()[action]() };
        },
    });

    const Icon = ACTION_ICONS[action];
    return (
        <button
            className={cn('btn m-0 size-fit border-none p-1', className)}
            {...props}
            onClick={() => editor?.commands[action]()}
            disabled={!editorState?.canActive}
        >
            <Icon size={20} strokeWidth={1.5} />
        </button>
    );
}
