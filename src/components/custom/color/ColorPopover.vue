<script setup lang="ts">
import { CircleSlash2Icon } from 'lucide-vue-next';
import { ref } from 'vue';

import { Button } from '@/components/ui/button';
import { ButtonGroup, ButtonGroupSeparator } from '@/components/ui/button-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import ColorButton from './ColorButton.vue';

defineProps<{
    tooltip: string;
    colors: { color: string; label: string }[];
    currentColor: string | false;
    disabled?: boolean;
}>();

defineEmits<{
    (e: 'set:color', color: string): void;
    (e: 'remove:color'): void;
}>();

const open = ref(false);
</script>

<template>
    <Popover @update:open="open = $event">
        <PopoverTrigger as="div">
            <Tooltip>
                <TooltipTrigger>
                    <Toggle
                        class="flex-col gap-0"
                        :disabled="disabled"
                        :model-value="!!currentColor || open"
                        size="icon"
                    >
                        <slot />
                        <span
                            class="relative h-0.5 w-4 bg-(--highlight-color)"
                            :style="{ '--highlight-color': currentColor || 'transparent' }"
                        />
                    </Toggle>
                </TooltipTrigger>

                <TooltipContent>{{ tooltip }}</TooltipContent>
            </Tooltip>
        </PopoverTrigger>

        <PopoverContent as-child class="p-0.5">
            <ButtonGroup spacing="spaced">
                <ColorButton
                    v-for="{ color, label } in colors"
                    :key="color"
                    :color="color"
                    :label="label"
                    :model-value="color === currentColor"
                    @set:color="$emit('set:color', color)"
                />

                <ButtonGroupSeparator />

                <Tooltip>
                    <TooltipTrigger>
                        <Button size="icon" variant="ghost" @click="$emit('remove:color')">
                            <CircleSlash2Icon />
                        </Button>
                    </TooltipTrigger>

                    <TooltipContent>Remove {{ tooltip.replace(/^./, (c) => c.toLowerCase()) }}</TooltipContent>
                </Tooltip>
            </ButtonGroup>
        </PopoverContent>
    </Popover>
</template>
