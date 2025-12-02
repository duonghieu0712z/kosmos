<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { vOnKeyStroke } from '@vueuse/components';
import { reactivePick } from '@vueuse/core';
import { CornerDownLeft, ExternalLink, Trash2 } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import type { UseLinkConfig } from './utils';
import { useLink } from './utils';

const props = defineProps<{
    editor: Editor;
}>();

const config = reactivePick(props, 'editor') as UseLinkConfig;
const { url, canLink, isActive, label, icon, setLink, removeLink, openLink } = useLink(config);
</script>

<template>
    <Popover>
        <PopoverTrigger>
            <Tooltip>
                <TooltipTrigger>
                    <Toggle :disabled="!canLink" :model-value="isActive" size="sm">
                        <component :is="icon" />
                    </Toggle>
                </TooltipTrigger>

                <TooltipContent>{{ label }}</TooltipContent>
            </Tooltip>
        </PopoverTrigger>

        <PopoverContent class="flex gap-0.5 p-1">
            <Input
                v-model:model-value="url"
                v-on-key-stroke:Enter="[setLink, { eventName: 'keyup' }]"
                autocapitalize="off"
                autocomplete="off"
                autocorrect="off"
                autofocus
                class="bg-popover dark:bg-popover h-8 rounded border-none px-2 focus-visible:ring-0"
                placeholder="Paste a link"
                type="url"
            />

            <ButtonGroup class="gap-0.5" orientation="horizontal-rounded">
                <Button :disabled="!url && !isActive" size="icon-sm" variant="ghost" @click="setLink">
                    <CornerDownLeft />
                </Button>

                <ButtonGroupSeparator />

                <Button :disabled="!url && !isActive" size="icon-sm" variant="ghost" @click="openLink">
                    <ExternalLink />
                </Button>

                <Button :disabled="!url && !isActive" size="icon-sm" variant="ghost" @click="removeLink">
                    <Trash2 />
                </Button>
            </ButtonGroup>
        </PopoverContent>
    </Popover>
</template>
