<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';
import { Bold, Code2, Italic, Strikethrough, Subscript, Superscript, Underline } from 'lucide-vue-next';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

interface Props extends ButtonProps {
    editor: Editor;
    type: MarkType;
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'ghost',
    size: 'icon-sm',
});

const emits = defineEmits<{
    (e: 'update:toggle', type: MarkType): void;
}>();
</script>

<template>
    <Button
        :class="cn('data-[active-state=true]:bg-accent rounded!', props.class)"
        :data-active-state="editor.isActive(props.type)"
        :size="size"
        :variant="variant"
        @click="
            () => {
                editor.chain().focus().toggleMark(props.type).run();
                emits('update:toggle', props.type);
            }
        "
    >
        <component :is="MARK_ICONS[props.type]" />
    </Button>
</template>
