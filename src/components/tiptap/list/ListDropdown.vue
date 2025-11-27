<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { ChevronDown } from 'lucide-vue-next';
import { computed } from 'vue';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import ListButton from './ListButton.vue';
import type { ListType } from './types';
import { LIST_ICONS } from './types';

const props = withDefaults(
    defineProps<{
        editor: Editor;
        lists?: ListType[];
        orientation?: 'horizontal' | 'vertical';
    }>(),
    {
        lists: () => ['bullet', 'ordered'],
        orientation: 'horizontal',
    }
);

const isActive = computed(() => {
    const { editor } = props;
    if (!editor.isEditable) {
        return false;
    }

    return editor.isActive('bulletList') || editor.isActive('orderedList') || editor.isActive('taskList');
});

const currentList = computed(() => {
    const { editor } = props;
    if (!editor.isEditable) {
        return 'bullet';
    }

    if (editor.isActive('orderedList')) {
        return 'ordered';
    }

    if (editor.isActive('taskList')) {
        return 'task';
    }

    return 'bullet';
});
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button
                class="data-[active-state=true]:bg-accent gap-0 rounded! px-1!"
                :data-active-state="isActive"
                size="sm"
                variant="ghost"
            >
                <component :is="LIST_ICONS[currentList]" />
                <ChevronDown class="size-2" />
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" as-child>
            <ButtonGroup class="min-w-0 gap-0.5 p-0.5" :orientation="orientation">
                <DropdownMenuItem v-for="list in lists" :key="list" as-child>
                    <ListButton :editor="editor" :type="list" />
                </DropdownMenuItem>
            </ButtonGroup>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
