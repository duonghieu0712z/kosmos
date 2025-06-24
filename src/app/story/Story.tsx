import { RichTextEditor } from '@/tiptap/editor';
import { ToC, ToCProvider } from '@/tiptap/ui';

export default function Story() {
    return (
        <div className='flex size-full items-center justify-center gap-0.5'>
            <ToCProvider>
                <aside className='h-full w-60'>
                    <ToC />
                </aside>
                <main className='flex h-full flex-1 flex-col gap-0.5 p-1'>
                    <RichTextEditor />
                </main>
                <aside></aside>
            </ToCProvider>
        </div>
    );
}
