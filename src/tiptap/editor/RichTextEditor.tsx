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

const CHARACTER_LIMIT = 2000;

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
            editorContainerProps={{ className: 'size-full' }}
            editorProps={{
                attributes: {
                    class: 'prose dark:prose-invert min-h-full min-w-full p-2 text-base/6 not-focus:rounded-sm not-focus:border-2',
                    spellcheck: 'false',
                },
            }}
            slotBefore={<Header />}
            slotAfter={<Footer limit={CHARACTER_LIMIT} />}
        />
    );
}
