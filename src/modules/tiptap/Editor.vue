<script setup lang="ts">
import Highlight from '@tiptap/extension-highlight';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';

import { HeadingDropdown } from '@/components/tiptap/heading';
import { HighlightButton } from '@/components/tiptap/highlight';
import { LinkPopover } from '@/components/tiptap/link';
import { ListDropdown, ListGroup } from '@/components/tiptap/list';
import { MarkButton, MarkGroup } from '@/components/tiptap/mark';
import { TextAlignDropdown, TextAlignGroup } from '@/components/tiptap/text-align';
import { UndoRedoGroup } from '@/components/tiptap/undo-redo';
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';

const editor = new Editor({
    content: '<h1>Welcome to Kosmos!</h1>',
    extensions: [
        StarterKit.configure({
            link: {
                openOnClick: 'whenNotEditable',
                enableClickSelection: true,
                HTMLAttributes: {
                    target: null,
                },
            },
        }),
        Superscript,
        Subscript,
        TextAlign.configure({
            types: ['paragraph', 'heading'],
            defaultAlignment: 'left',
        }),
        Highlight.configure({ multicolor: true }),
    ],
    editorProps: {
        attributes: {
            class: 'prose dark:prose-invert text-foreground min-h-full min-w-full cursor-text p-6 text-[12pt] outline-none border',
            spellCheck: 'false',
        },
    },
});
</script>

<template>
    <main v-if="editor" class="flex flex-col">
        <ButtonGroup class="w-full px-2 pt-2 has-[>[data-slot=button-group]]:gap-0.5" orientation="horizontal-rounded">
            <UndoRedoGroup :editor="editor" />
            <ButtonGroupSeparator />
            <HeadingDropdown :editor="editor" />
            <ButtonGroupSeparator />
            <MarkGroup :editor="editor" />
            <ButtonGroupSeparator />
            <MarkGroup :editor="editor" :marks="['superscript', 'subscript']" />
            <ButtonGroupSeparator />
            <MarkButton :editor="editor" mark="code" />
            <LinkPopover :editor="editor" />
            <HighlightButton color="#ffd7a8" :editor="editor" />
            <ButtonGroupSeparator />
            <TextAlignGroup :editor="editor" />
            <ButtonGroupSeparator />
            <ListGroup :editor="editor" />
            <ButtonGroupSeparator />
            <TextAlignDropdown :editor="editor" />
            <ListDropdown :editor="editor" />
        </ButtonGroup>

        <EditorContent class="flex-1 p-2" :editor="editor" />
    </main>
</template>
