<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { HEADING_ICONS, HeadingLevels } from './utils';

interface Props extends ButtonProps {
    editor: Editor;
    level: HeadingLevels;
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'ghost',
    size: 'sm',
});

const emits = defineEmits<{
    (e: 'update:toggle', level: HeadingLevels): void;
}>();
</script>

<template>
    <Button
        :class="cn('data-[active-state=true]:bg-accent rounded!', props.class)"
        :data-active-state="level === 0 ? editor.isActive('paragraph') : editor.isActive('heading', { level })"
        :size="size"
        :variant="variant"
        @click="
            () => {
                level === 0
                    ? editor.chain().focus().setParagraph().run()
                    : editor.chain().focus().toggleHeading({ level }).run();
                emits('update:toggle', level);
            }
        "
    >
        <component :is="HEADING_ICONS[level]" />
        <div v-if="level === 0" :class="cn(size?.includes('icon') ? 'sr-only' : 'flex-1')">Paragraph</div>
        <div v-else :class="cn(size?.includes('icon') ? 'sr-only' : 'flex-1')">Heading {{ level }}</div>
    </Button>
</template>
