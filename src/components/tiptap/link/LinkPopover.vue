<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { vOnKeyStroke } from '@vueuse/components';
import { reactivePick } from '@vueuse/core';
import { CornerDownLeft, ExternalLink, Link, Trash2 } from 'lucide-vue-next';
import { ref } from 'vue';

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
const { url, canLink, isActive, setLink, removeLink, openLink } = useLink(config);

const open = ref(false);
</script>

<template>
    <Popover @update:open="(value) => (open = value)">
        <PopoverTrigger>
            <Tooltip>
                <TooltipTrigger>
                    <Toggle :disabled="!canLink" :model-value="isActive || open" size="sm">
                        <Link />
                    </Toggle>
                </TooltipTrigger>

                <TooltipContent>Link</TooltipContent>
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
                <Tooltip>
                    <TooltipTrigger>
                        <Button :disabled="!url && !isActive" size="icon-sm" variant="ghost" @click="setLink">
                            <CornerDownLeft />
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>Set link</TooltipContent>
                </Tooltip>
                <ButtonGroupSeparator />

                <Tooltip>
                    <TooltipTrigger>
                        <Button :disabled="!url && !isActive" size="icon-sm" variant="ghost" @click="openLink">
                            <ExternalLink />
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>Open link</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger>
                        <Button :disabled="!url && !isActive" size="icon-sm" variant="ghost" @click="removeLink">
                            <Trash2 />
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>Remove link</TooltipContent>
                </Tooltip>
            </ButtonGroup>
        </PopoverContent>
    </Popover>
</template>
