import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, EditorContext, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

import ToolBar from './ToolBar';

const extensions = [
    StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
    Placeholder.configure({ placeholder: 'Write something...' }),
];

export default function RichTextEditor() {
    const [content, setContent] = useState('');

    const editor = useEditor({
        extensions,
        content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm dark:prose-invert min-h-full min-w-full p-2 outline',
            },
        },
    });

    return (
        <EditorContext.Provider value={{ editor }}>
            <ToolBar />
            <EditorContent className='flex size-full items-center justify-center' editor={editor} />;
        </EditorContext.Provider>
    );
}
