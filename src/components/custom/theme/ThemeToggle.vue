<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { Laptop2Icon, MoonIcon, SunIcon } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const colorMode = useColorMode();
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as="div" as-child>
            <Button class="hover:[&>svg]:stroke-sidebar-foreground size-12" size="icon" variant="ghost">
                <SunIcon v-if="colorMode === 'light'" class="stroke-muted-foreground size-6" />
                <MoonIcon v-else-if="colorMode === 'dark'" class="stroke-muted-foreground size-6" />
                <Laptop2Icon v-else class="stroke-muted-foreground size-6" />
                <span class="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" side="right">
            <DropdownMenuItem @click="colorMode = 'light'">Light</DropdownMenuItem>
            <DropdownMenuItem @click="colorMode = 'dark'">Dark</DropdownMenuItem>
            <DropdownMenuItem @click="colorMode = 'auto'">System</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
