import { MarkButton } from '@/tiptap/ui';

export default function ToolBar() {
    return (
        <div className='menu menu-horizontal rounded-box bg-base-200 w-full gap-0.5'>
            <MarkButton mark='bold' />
            <MarkButton mark='italic' />
            <MarkButton mark='underline' />
            <MarkButton mark='strike' />
            <MarkButton mark='superscript' />
            <MarkButton mark='subscript' />
            <MarkButton mark='code' />
        </div>
    );
}
