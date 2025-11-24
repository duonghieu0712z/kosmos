<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { MARK_ICONS, MarkType } from './utils';

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
        :disabled="!editor.isEditable || !editor.can().toggleMark(props.type)"
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
