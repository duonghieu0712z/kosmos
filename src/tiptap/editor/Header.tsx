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
    Spacer,
    TextAlignDropdown,
} from '@/tiptap/ui';

export default function Header() {
    return (
        <div className='menu menu-horizontal rounded-box bg-base-200 w-full gap-0.5'>
            <HistoryButton action='undo' />
            <HistoryButton action='redo' />
            <Spacer />
            <HeadingDropdown />
            <FontFamilyDropdown />
            <FontSizeDropdown />
            <NodeButton node='blockquote' />
            <NodeButton node='codeblock' />
            <Spacer />
            <MarkButton mark='bold' />
            <MarkButton mark='italic' />
            <MarkButton mark='underline' />
            <MarkButton mark='strike' />
            <MarkButton mark='superscript' />
            <MarkButton mark='subscript' />
            <Spacer />
            <MarkButton mark='code' />
            <HighlightPopover />
            <LinkPopover />
            <Spacer />
            <TextAlignDropdown />
            <ListDropdown />
        </div>
    );
}
