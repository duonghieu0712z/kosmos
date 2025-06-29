import { Separator } from '@/components/ui/separator';
import { RichTextEditor } from '@/tiptap/editor';
import { ToC, ToCProvider } from '@/tiptap/ui';

export default function Story() {
    return (
        <div className='flex size-full items-center justify-center'>
            <ToCProvider>
                <main className='flex h-full flex-1 flex-col'>
                    <RichTextEditor />
                </main>
                <Separator orientation='vertical' />
                <aside className='flex h-full w-60 flex-col p-1'>
                    <ToC />
                </aside>
            </ToCProvider>
        </div>
    );
}
