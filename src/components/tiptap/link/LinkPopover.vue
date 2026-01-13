<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3';
import { vOnKeyStroke } from '@vueuse/components';
import { reactivePick } from '@vueuse/core';
import { CornerDownLeftIcon, ExternalLinkIcon, LinkIcon, Trash2Icon } from 'lucide-vue-next';
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
    <Popover @update:open="open = $event">
        <PopoverTrigger as="div">
            <Tooltip>
                <TooltipTrigger>
                    <Toggle :disabled="!canLink" :model-value="isActive || open" size="icon">
                        <LinkIcon />
                    </Toggle>
                </TooltipTrigger>

                <TooltipContent side="bottom">Link</TooltipContent>
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
                class="border-none shadow-none focus-visible:ring-0 dark:bg-transparent"
                placeholder="Paste a link"
                type="url"
            />

            <ButtonGroup class="gap-0.5" spacing="spaced">
                <Tooltip>
                    <TooltipTrigger>
                        <Button :disabled="!url && !isActive" size="icon" variant="ghost" @click="setLink">
                            <CornerDownLeftIcon />
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent side="bottom">Set link</TooltipContent>
                </Tooltip>
                <ButtonGroupSeparator />

                <Tooltip>
                    <TooltipTrigger>
                        <Button :disabled="!url && !isActive" size="icon" variant="ghost" @click="openLink">
                            <ExternalLinkIcon />
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent side="bottom">Open link</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger>
                        <Button :disabled="!url && !isActive" size="icon" variant="ghost" @click="removeLink">
                            <Trash2Icon />
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent side="bottom">Remove link</TooltipContent>
                </Tooltip>
            </ButtonGroup>
        </PopoverContent>
    </Popover>
</template>
