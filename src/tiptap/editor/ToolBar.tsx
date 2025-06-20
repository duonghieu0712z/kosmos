import {
    HeadingDropdown,
    HistoryButton,
    ListDropdown,
    MarkButton,
    NodeButton,
    Spacer,
    TextAlignDropdown,
} from '@/tiptap/ui';

export default function ToolBar() {
    return (
        <div className='menu menu-horizontal rounded-box bg-base-200 w-full gap-0.5'>
            <HistoryButton action='undo' />
            <HistoryButton action='redo' />
            <Spacer />
            <HeadingDropdown />
            <NodeButton node='blockquote' />
            <NodeButton node='codeblock' />
            <Spacer />
            <MarkButton mark='bold' />
            <MarkButton mark='italic' />
            <MarkButton mark='underline' />
            <MarkButton mark='strike' />
            <Spacer />
            <MarkButton mark='superscript' />
            <MarkButton mark='subscript' />
            <Spacer />
            <MarkButton mark='code' />
            <Spacer />
            <TextAlignDropdown />
            <ListDropdown />
        </div>
    );
}
