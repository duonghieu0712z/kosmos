import { ListIcon, ListOrdered } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTiptapEditor } from '@/tiptap/hooks';

const LIST_ICONS = {
    bullet: ListIcon,
    ordered: ListOrdered,
} as const;

export default function ListDropdown() {
    const { editor, editorState } = useTiptapEditor({
        selector({ editor }) {
            const listType = Object.keys(LIST_ICONS).find((type) =>
                editor?.isActive(`${type}List`)
            ) as keyof typeof LIST_ICONS;
            return { listType };
        },
    });
    // const isActive = !!editorState?.listType;

    return (
        <Select
            defaultValue='bullet'
            value={editorState?.listType}
            onValueChange={(value) => {
                switch (value) {
                    case 'bullet':
                        editor?.chain().focus().toggleBulletList().run();
                        break;
                    case 'ordered':
                        editor?.chain().focus().toggleOrderedList().run();
                        break;
                }
            }}
        >
            <SelectTrigger size='sm' className='w-16'>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {Object.entries(LIST_ICONS).map(([listType, Icon]) => (
                    <SelectItem key={listType} value={listType}>
                        <Icon />
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
