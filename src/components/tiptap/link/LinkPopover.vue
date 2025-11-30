<script setup lang="ts">
import { openUrl } from '@tauri-apps/plugin-opener';
import type { Editor } from '@tiptap/vue-3';
import { CornerDownLeft, ExternalLink, Trash2 } from 'lucide-vue-next';
import { onMounted, ref, watch } from 'vue';

import { Button } from '@/components/ui/button';
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { sanitizeUrl } from '@/lib/tiptap';

import { canExecute, getIcon, isActive } from './utils';

const props = defineProps<{
    editor: Editor;
}>();

const url = ref('');

watch(
    [() => props.editor, url],
    () => {
        const { editor } = props;

        const { href } = editor.getAttributes('link');
        if (isActive(editor) && !url.value) {
            url.value = href;
        }
    },
    { immediate: true }
);

onMounted(() => {
    watch(
        () => props.editor,
        (editor, _, onCleanup) => {
            const updateLinkState = () => {
                const { href } = editor.getAttributes('link');
                url.value = href;
            };

            editor.on('selectionUpdate', updateLinkState);
            onCleanup(() => editor.off('selectionUpdate', updateLinkState));
        },
        { immediate: true }
    );
});

function setLink() {
    if (!url.value) {
        return;
    }

    const { editor } = props;
    const selection = editor.state.selection;

    let chain = editor.chain().focus().extendMarkRange('link').setLink({ href: url.value });
    if (selection.empty) {
        chain = chain.insertContent({ type: 'text', text: url.value });
    }
    chain.run();

    url.value = '';
}

function removeLink() {
    const { editor } = props;
    editor.chain().focus().extendMarkRange('link').unsetLink().setMeta('preventAutolink', true).run();
}

async function openLink() {
    if (!url.value) {
        return;
    }

    const safeUrl = sanitizeUrl(url.value, window.location.href);
    if (safeUrl !== '#') {
        await openUrl(safeUrl);
    }
}

function changeUrl(ev: Event) {
    url.value = (ev.target as HTMLInputElement).value;
}

function handleKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Enter') {
        ev.preventDefault();
        setLink();
    }
}
</script>

<template>
    <Popover>
        <PopoverTrigger>
            <Tooltip>
                <TooltipTrigger>
                    <Button
                        class="data-[active-state=true]:bg-accent"
                        :data-active-state="isActive(editor)"
                        :disabled="!canExecute(editor)"
                        size="icon-sm"
                        variant="ghost"
                    >
                        <component :is="getIcon()" />
                    </Button>
                </TooltipTrigger>

                <TooltipContent>Link</TooltipContent>
            </Tooltip>
        </PopoverTrigger>

        <PopoverContent class="flex gap-0.5 p-1">
            <Input
                autocapitalize="off"
                autocomplete="off"
                autocorrect="off"
                autofocus
                class="bg-popover dark:bg-popover h-8 rounded border-none px-2 focus-visible:ring-0"
                :model-value="url"
                placeholder="Paste a link"
                type="url"
                @change="changeUrl"
                @keydown="handleKeydown"
            />

            <ButtonGroup class="gap-0.5" orientation="horizontal-rounded">
                <Button :disabled="!url && !isActive(editor)" size="icon-sm" variant="ghost" @click="setLink">
                    <CornerDownLeft />
                </Button>

                <ButtonGroupSeparator />

                <Button :disabled="!url && !isActive(editor)" size="icon-sm" variant="ghost" @click="openLink">
                    <ExternalLink />
                </Button>

                <Button :disabled="!url && !isActive(editor)" size="icon-sm" variant="ghost" @click="removeLink">
                    <Trash2 />
                </Button>
            </ButtonGroup>
        </PopoverContent>
    </Popover>
</template>
