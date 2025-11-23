<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';
import { Bold, Code2, Italic, Strikethrough, Subscript, Superscript, Underline } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';

type MarkType = 'bold' | 'italic' | 'strike' | 'underline' | 'code' | 'superscript' | 'subscript';

const MARK_ICONS = {
    bold: Bold,
    italic: Italic,
    strike: Strikethrough,
    underline: Underline,
    code: Code2,
    superscript: Superscript,
    subscript: Subscript,
};

const props = defineProps<{ editor: Editor; type: MarkType }>();
</script>

<template>
    <Button
        class="data-[active-state=true]:bg-accent!"
        :data-active-state="editor.isActive(props.type)"
        size="icon-sm"
        variant="outline"
        @click="editor.chain().focus().toggleMark(props.type).run()"
    >
        <component :is="MARK_ICONS[props.type]" />
    </Button>
</template>
