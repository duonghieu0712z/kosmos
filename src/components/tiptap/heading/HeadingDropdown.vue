<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';
import { ChevronDown, Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type HEADING_LEVELS = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const HEADING_ICONS = [Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6];

const props = withDefaults(
    defineProps<{
        editor: Editor;
        levels?: HEADING_LEVELS[];
    }>(),
    { levels: () => [1, 2, 3, 4, 0] }
);
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button class="gap-1 px-2!" size="sm" variant="outline">
                <component :is="HEADING_ICONS[props.editor.getAttributes('heading').level ?? 0]" />
                <ChevronDown class="size-3" />
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" as-child>
            <ButtonGroup class="min-w-0 p-0.5 text-xs" orientation="vertical">
                <DropdownMenuItem v-for="level in props.levels" :key="level" as-child>
                    <Button
                        class="data-[active-state=true]:bg-accent justify-start rounded! px-2! py-1 text-xs"
                        :data-active-state="
                            level === 0 ? editor.isActive('paragraph') : editor.isActive('heading', { level })
                        "
                        size="sm"
                        variant="ghost"
                        @click="
                            level === 0
                                ? editor.chain().focus().setParagraph().run()
                                : editor.chain().focus().toggleHeading({ level }).run()
                        "
                    >
                        <component :is="HEADING_ICONS[level]" />
                        <div v-if="level === 0" class="flex-1">Paragraph</div>
                        <div v-else class="flex-1">Heading {{ level }}</div>
                    </Button>
                </DropdownMenuItem>
            </ButtonGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
