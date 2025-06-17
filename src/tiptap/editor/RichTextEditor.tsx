import { CharacterCount, Placeholder } from '@tiptap/extensions';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

import ToolBar from './ToolBar';

const extensions = [
    StarterKit,
    Placeholder.configure({ placeholder: 'Write something...' }),
    CharacterCount.configure({ limit: 2000 }),
];

export default function RichTextEditor() {
    const [content, setContent] = useState('');

    return (
        <EditorProvider
            extensions={extensions}
            content={content}
            onUpdate={({ editor }) => setContent(editor.getHTML())}
            editorContainerProps={{ className: 'size-full' }}
            editorProps={{
                attributes: {
                    class: 'prose prose-sm dark:prose-invert min-h-full min-w-full p-2 outline',
                    spellcheck: 'false',
                },
            }}
            slotBefore={<ToolBar />}
        />
    );
}
