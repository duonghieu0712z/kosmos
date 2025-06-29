import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTiptapEditor } from '@/tiptap/hooks';

const FONT_SIZES = [10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72] as const;

function getFontSize(size: string) {
    return size.replace(/\D/g, '');
}

export default function FontSizeDropdown() {
    const { editor, editorState } = useTiptapEditor({
        selector({ editor }) {
            const fontSize: string = editor?.getAttributes('textStyle').fontSize || '12pt';
            return { fontSize: getFontSize(fontSize) };
        },
    });

    return (
        <Select
            defaultValue='12'
            value={editorState?.fontSize}
            onValueChange={(value) => {
                editor?.chain().focus().setFontSize(`${value}pt`).run();
            }}
        >
            <SelectTrigger className='w-17'>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {FONT_SIZES.map((size) => (
                    <SelectItem key={size} value={`${size}`}>
                        {size}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
