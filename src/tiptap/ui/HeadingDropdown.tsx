import { Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTiptapEditor } from '@/tiptap/hooks';

const HEADING_ICONS = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6] as const;

export default function HeadingDropdown() {
    const { editor, editorState } = useTiptapEditor({
        selector({ editor }) {
            const level: number = editor?.getAttributes('heading').level ?? 0;
            return { level };
        },
    });

    return (
        <Select
            defaultValue='0'
            value={`${editorState?.level}`}
            onValueChange={(value) => {
                if (value === '0') {
                    editor?.chain().focus().setParagraph().run();
                    return;
                }

                editor
                    ?.chain()
                    .focus()
                    .setHeading({ level: parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6 })
                    .run();
            }}
        >
            <SelectTrigger size='sm' className='w-16'>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {HEADING_ICONS.map((Icon, i) => (
                    <SelectItem key={`heading-${i + 1}`} value={`${i + 1}`}>
                        <Icon />
                        Heading {i + 1}
                    </SelectItem>
                ))}

                <SelectSeparator />
                <SelectItem value='0'>
                    <Heading />
                    Paragraph
                </SelectItem>
            </SelectContent>
        </Select>
    );
}
