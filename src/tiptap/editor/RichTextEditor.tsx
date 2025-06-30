import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { getHierarchicalIndexes, TableOfContents } from '@tiptap/extension-table-of-contents';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import UniqueID from '@tiptap/extension-unique-id';
import { CharacterCount, Placeholder } from '@tiptap/extensions';
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

import { useToC } from '@/tiptap/hooks';
import { DragHandler } from '@/tiptap/ui';

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
    UniqueID.configure({ types: ['heading', 'paragraph'] }),
];

export default function RichTextEditor() {
    const [content, setContent] = useState('');
    const { setData } = useToC();

    const extensions = [
        ...EXTENSIONS,
        TableOfContents.configure({
            getIndex: getHierarchicalIndexes,
            onUpdate(data) {
                setData(data);
            },
        }),
    ];

    return (
        <EditorProvider
            extensions={extensions}
            content={content}
            onUpdate={({ editor }) => {
                setContent(editor.getHTML());
                // console.log(editor.getJSON());
            }}
            editorContainerProps={{
                className: 'size-full overflow-y-auto',
            }}
            editorProps={{
                attributes: {
                    class: 'prose dark:prose-invert text-foreground min-h-full min-w-full cursor-text p-6 text-[12pt] outline-none',
                    spellcheck: 'false',
                },
            }}
            slotBefore={<Header />}
            slotAfter={<Footer limit={CHARACTER_LIMIT} />}
        >
            <DragHandler />
        </EditorProvider>
    );
}
