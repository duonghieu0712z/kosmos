<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';

const editor = new Editor({
    content: '<h1>Welcome to Kosmos!</h1>',
    extensions: [StarterKit],
    editorProps: {
        attributes: {
            class: 'prose dark:prose-invert text-foreground min-h-full min-w-full cursor-text p-6 text-[12pt] outline-none border',
        },
    },
});
</script>

<template>
    <EditorContent class="p-2" :editor="editor" />
</template>
