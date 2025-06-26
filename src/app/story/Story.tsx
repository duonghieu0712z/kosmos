import { RichTextEditor } from '@/tiptap/editor';
import { ToC, ToCProvider } from '@/tiptap/ui';

export default function Story() {
    return (
        <div className='flex size-full items-center justify-center'>
            <ToCProvider>
                <main className='flex h-full flex-1 flex-col'>
                    <RichTextEditor />
                </main>
                <aside className='border-base-300 flex h-full w-60 flex-col border-l p-1'>
                    <ToC />
                </aside>
            </ToCProvider>
        </div>
    );
}
