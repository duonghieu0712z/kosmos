<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { reactivePick } from '@vueuse/core';
import { HighlighterIcon } from 'lucide-vue-next';

import { ColorPopover } from '@/components/custom/color';

import { useHighlight, type UseHighlightConfig } from './utils';

const props = withDefaults(
    defineProps<{
        editor: Editor;
        colors?: { color: string; label: string }[];
    }>(),
    {
        colors: () => [
            { color: 'oklch(88.5% 0.062 18.334)', label: 'Red' },
            { color: 'oklch(90.1% 0.076 70.697)', label: 'Orange' },
            { color: 'oklch(94.5% 0.129 101.54)', label: 'Yellow' },
            { color: 'oklch(92.5% 0.084 155.995)', label: 'Green' },
            { color: 'oklch(91.7% 0.08 205.041)', label: 'Blue' },
        ],
    },
);

const config = reactivePick(props, 'editor') as UseHighlightConfig;
const { canHighlight, currentHighlight, setHighlight, removeHighlight } = useHighlight(config);
</script>

<template>
    <ColorPopover
        :colors="colors"
        :current-color="currentHighlight"
        :disabled="!canHighlight"
        tooltip="Highlight"
        @remove:color="removeHighlight"
        @set:color="setHighlight"
    >
        <HighlighterIcon />
    </ColorPopover>
</template>
