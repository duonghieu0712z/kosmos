<script setup lang="ts">
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/vue-3';
import { all, createLowlight } from 'lowlight';

import { BlockquoteButton } from '@/components/tiptap/blockquote';
import { CodeBlockButton } from '@/components/tiptap/code-block';
import { HeadingDropdown } from '@/components/tiptap/heading';
import { HighlightPopover } from '@/components/tiptap/highlight';
import { LinkPopover } from '@/components/tiptap/link';
import { ListDropdown, ListGroup } from '@/components/tiptap/list';
import { MarkButton, MarkGroup } from '@/components/tiptap/mark';
import { TextAlignDropdown, TextAlignGroup } from '@/components/tiptap/text-align';
import { UndoRedoGroup } from '@/components/tiptap/undo-redo';
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const lowlight = createLowlight(all);

const editor = useEditor({
    content: '<h1>Welcome to Kosmos!</h1>',
    extensions: [
        StarterKit.configure({
            codeBlock: false,
            link: {
                openOnClick: 'whenNotEditable',
                enableClickSelection: true,
                HTMLAttributes: { target: null },
            },
        }),
        Superscript,
        Subscript,
        TextAlign.configure({
            types: ['paragraph', 'heading'],
            defaultAlignment: 'left',
        }),
        Highlight.configure({ multicolor: true }),
        CodeBlockLowlight.configure({ lowlight, enableTabIndentation: true }),
    ],
    autofocus: 'end',
    editorProps: {
        attributes: {
            class: cn('prose dark:prose-invert text-foreground font-document min-h-full min-w-full p-4 outline-none'),
            spellCheck: 'false',
        },
    },
});
</script>

<template>
    <main v-if="editor" class="flex flex-col">
        <ButtonGroup class="w-full px-2 pt-2 has-[>[data-slot=button-group]]:gap-0.5" spacing="spaced">
            <UndoRedoGroup :editor="editor" />
            <ButtonGroupSeparator />
            <HeadingDropdown :editor="editor" />
            <ButtonGroupSeparator />
            <BlockquoteButton :editor="editor" />
            <CodeBlockButton :editor="editor" />
            <ButtonGroupSeparator />
            <MarkGroup :editor="editor" />
            <ButtonGroupSeparator />
            <MarkGroup :editor="editor" :marks="['superscript', 'subscript']" />
            <ButtonGroupSeparator />
            <MarkButton :editor="editor" mark="code" />
            <LinkPopover :editor="editor" />
            <HighlightPopover :editor="editor" />
            <ButtonGroupSeparator />
            <TextAlignGroup :editor="editor" />
            <ButtonGroupSeparator />
            <ListGroup :editor="editor" />
            <ButtonGroupSeparator />
            <TextAlignDropdown :editor="editor" />
            <ListDropdown :editor="editor" />
        </ButtonGroup>

        <ScrollArea class="m-2 flex-1 cursor-text border" type="always" @click="editor.chain().focus().run()">
            <EditorContent class="w-full" :editor="editor" />
        </ScrollArea>
    </main>
</template>
