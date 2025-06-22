import DragHandle from '@tiptap/extension-drag-handle-react';
import { useCurrentEditor } from '@tiptap/react';
import { GripVertical } from 'lucide-react';

export default function DragHandler() {
    const { editor } = useCurrentEditor();
    return (
        <DragHandle editor={editor!}>
            <GripVertical strokeWidth={1.5} strokeOpacity={0.3} />
        </DragHandle>
    );
}
