<script setup lang="ts">
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';

import { HeadingDropdown } from '@/components/tiptap/heading';
import { MarkGroup } from '@/components/tiptap/mark';
import { TextAlignDropdown, TextAlignGroup } from '@/components/tiptap/text-align';
import { UndoRedoGroup } from '@/components/tiptap/undo-redo';
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';

const editor = new Editor({
    content: '<h1>Welcome to Kosmos!</h1>',
    extensions: [
        StarterKit,
        Superscript,
        Subscript,
        TextAlign.configure({ types: ['paragraph', 'heading'], defaultAlignment: 'left' }),
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
        <ButtonGroup class="w-full px-2 pt-2 has-[>[data-slot=button-group]]:gap-0.5">
            <UndoRedoGroup :editor="editor" />
            <ButtonGroupSeparator />
            <HeadingDropdown :editor="editor" />
            <ButtonGroupSeparator />
            <MarkGroup :editor="editor" />
            <ButtonGroupSeparator />
            <TextAlignGroup :editor="editor" />
            <TextAlignDropdown :editor="editor" />
        </ButtonGroup>

        <EditorContent class="flex-1 p-2" :editor="editor" />
    </main>
</template>
