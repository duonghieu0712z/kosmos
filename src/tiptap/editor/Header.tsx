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
        <div className='menu menu-horizontal bg-base-200 border-base-300 w-full gap-0.5 border-b'>
            <HistoryButton action='undo' />
            <HistoryButton action='redo' />
            <Spacer />
            <HeadingDropdown />
            <FontFamilyDropdown />
            <FontSizeDropdown />
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
            <NodeButton node='blockquote' />
            <NodeButton node='codeblock' />
            <NodeButton node='hardBreak' />
            <NodeButton node='horizontalRule' />
            <Spacer />
            <TextAlignDropdown />
            <ListDropdown />
        </div>
    );
}
