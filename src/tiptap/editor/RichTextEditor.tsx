import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { CharacterCount, Placeholder } from '@tiptap/extensions';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

import Footer from './Footer';
import Header from './Header';

const CHARACTER_LIMIT = 20000;

const EXTENSIONS = [
    StarterKit,
    TextStyleKit,
    Superscript,
    Subscript,
    TextAlign.configure({ types: ['heading', 'paragraph'], defaultAlignment: 'left' }),
    Placeholder.configure({ placeholder: 'Write something...' }),
    CharacterCount.configure({ limit: CHARACTER_LIMIT }),
];

export default function RichTextEditor() {
    const [content, setContent] = useState('');

    return (
        <EditorProvider
            extensions={EXTENSIONS}
            content={content}
            onUpdate={({ editor }) => setContent(editor.getHTML())}
            editorContainerProps={{
                className: 'size-full overflow-y-auto rounded-sm outline',
            }}
            editorProps={{
                attributes: {
                    class: 'prose dark:prose-invert min-h-full min-w-full p-2 text-base/6 outline-none',
                    spellcheck: 'false',
                },
            }}
            slotBefore={<Header />}
            slotAfter={<Footer limit={CHARACTER_LIMIT} />}
        />
    );
}
