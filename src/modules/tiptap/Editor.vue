<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';

import { HeadingDropdown } from '@/components/tiptap/heading';
import { ButtonGroup } from '@/components/ui/button-group';

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
    <main v-if="editor" class="flex flex-col">
        <ButtonGroup class="px-2 pt-2">
            <HeadingDropdown :editor="editor" />
        </ButtonGroup>
        <EditorContent class="flex-1 p-2" :editor="editor" />
    </main>
</template>
