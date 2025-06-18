import { useCurrentEditor } from '@tiptap/react';
import { Redo, Undo } from 'lucide-react';
import { ComponentProps } from 'react';

import { cn } from '@/libs';

type HistoryButton = {
    action: 'undo' | 'redo';
};

const ACTION_ICONS = {
    undo: Undo,
    redo: Redo,
} as const;

export default function HistoryButton({ action, className, ...props }: HistoryButton & ComponentProps<'button'>) {
    const { editor } = useCurrentEditor();
    if (!editor) {
        return null;
    }

    const Icon = ACTION_ICONS[action];
    return (
        <button
            className={cn('btn m-0 size-fit border-none p-1', className)}
            {...props}
            onClick={() => editor.commands[action]()}
            disabled={!editor.can()[action]()}
        >
            <Icon size={20} strokeWidth={1.5} />
        </button>
    );
}
