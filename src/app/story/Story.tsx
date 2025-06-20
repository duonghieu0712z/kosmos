import { RichTextEditor } from '@/tiptap/editor';

export default function Story() {
    return (
        <div className='flex size-9/10 flex-col items-center justify-center gap-0.5'>
            <RichTextEditor />
        </div>
    );
}
