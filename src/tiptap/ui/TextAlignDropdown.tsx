import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTiptapEditor } from '@/tiptap/hooks';

const TEXT_ALIGN_ICONS = {
    left: AlignLeft,
    center: AlignCenter,
    right: AlignRight,
    justify: AlignJustify,
} as const;

export default function TextAlignDropdown() {
    const { editor, editorState } = useTiptapEditor({
        selector({ editor }) {
            const align: keyof typeof TEXT_ALIGN_ICONS =
                editor?.getAttributes('paragraph').textAlign ?? editor?.getAttributes('heading').textAlign ?? 'left';
            return { align };
        },
    });

    return (
        <Select
            defaultValue='left'
            value={editorState?.align}
            onValueChange={(value) => {
                editor?.chain().focus().setTextAlign(value).run();
            }}
        >
            <SelectTrigger size='sm' className='w-16'>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {Object.entries(TEXT_ALIGN_ICONS).map(([align, Icon]) => (
                    <SelectItem key={align} value={align}>
                        <Icon />
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
