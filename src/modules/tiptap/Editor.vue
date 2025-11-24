<script setup lang="ts">
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';

import { HeadingDropdown } from '@/components/tiptap/heading';
import { MarkButton } from '@/components/tiptap/mark';
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';

const editor = new Editor({
    content: '<h1>Welcome to Kosmos!</h1>',
    extensions: [StarterKit, Superscript, Subscript],
    editorProps: {
        attributes: {
            class: 'prose dark:prose-invert text-foreground min-h-full min-w-full cursor-text p-6 text-[12pt] outline-none border',
        },
    },
});
</script>

<template>
    <main v-if="editor" class="flex flex-col">
        <ButtonGroup class="w-full gap-0.5 px-2 pt-2">
            <HeadingDropdown :editor="editor" />

            <ButtonGroupSeparator />

            <MarkButton :editor="editor" type="bold" />
            <MarkButton :editor="editor" type="italic" />
            <MarkButton :editor="editor" type="underline" />
            <MarkButton :editor="editor" type="strike" />
            <MarkButton :editor="editor" type="code" />
            <MarkButton :editor="editor" type="superscript" />
            <MarkButton :editor="editor" type="subscript" />
        </ButtonGroup>

        <EditorContent class="flex-1 p-2" :editor="editor" />
    </main>
</template>
