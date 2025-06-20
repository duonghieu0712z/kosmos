import { RichTextEditor } from '@/tiptap/editor';

export default function Story() {
    return (
        <div className='flex size-full items-center justify-center gap-0.5'>
            <aside></aside>
            <main className='flex h-full flex-1 flex-col gap-0.5 p-1'>
                <RichTextEditor />
            </main>
            <aside></aside>
        </div>
    );
}
