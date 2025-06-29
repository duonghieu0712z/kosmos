import { Separator } from '@/components/ui/separator';
import {
    FontFamilyDropdown,
    FontSizeDropdown,
    HeadingDropdown,
    HighlightPopover,
    HistoryButton,
    LinkPopover,
    ListDropdown,
    MarkButton,
    NodeButton,
    TextAlignDropdown,
} from '@/tiptap/ui';

export default function Header() {
    return (
        <>
            <div className='flex w-full gap-0.5 p-1'>
                <HistoryButton action='undo' />
                <HistoryButton action='redo' />

                <Separator orientation='vertical' />

                <HeadingDropdown />
                <FontFamilyDropdown />
                <FontSizeDropdown />

                <Separator orientation='vertical' />

                <MarkButton mark='bold' />
                <MarkButton mark='italic' />
                <MarkButton mark='underline' />
                <MarkButton mark='strike' />
                <MarkButton mark='superscript' />
                <MarkButton mark='subscript' />

                <Separator orientation='vertical' />

                <MarkButton mark='code' />
                <HighlightPopover />
                <LinkPopover />

                <Separator orientation='vertical' />

                <NodeButton node='blockquote' />
                <NodeButton node='codeblock' />
                <NodeButton node='hardBreak' />
                <NodeButton node='horizontalRule' />

                <Separator orientation='vertical' />

                <TextAlignDropdown />
                <ListDropdown />
            </div>
            <Separator />
        </>
    );
}
