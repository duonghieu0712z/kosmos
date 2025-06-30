import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTiptapEditor } from '@/tiptap/hooks';
import { DEFAULT_FONT, SYSTEM_FONTS } from '@/utils';

export default function FontFamilyDropdown() {
    const { editor, editorState } = useTiptapEditor({
        selector({ editor }) {
            const fontFamily: string = editor?.getAttributes('textStyle').fontFamily || 'Default';
            return { fontFamily };
        },
    });

    return (
        <Select
            defaultValue={DEFAULT_FONT}
            value={editorState?.fontFamily}
            onValueChange={(value) => {
                editor?.chain().focus().setFontFamily(value).run();
            }}
        >
            <SelectTrigger size='sm' className='w-30 px-2 py-1'>
                <SelectValue />
            </SelectTrigger>

            <SelectContent className={cn(SYSTEM_FONTS.length > 0 && 'h-80')}>
                <SelectItem value={DEFAULT_FONT}>Default</SelectItem>
                <SelectSeparator />

                {SYSTEM_FONTS.map((font) => (
                    <SelectItem key={font} value={font}>
                        <div style={{ fontFamily: font }}>{font}</div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
