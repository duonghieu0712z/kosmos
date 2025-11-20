<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { Moon, Sun } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mode = useColorMode();
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button class="hover:[&>svg]:stroke-sidebar-foreground size-12" size="icon" variant="ghost">
                <Moon
                    class="stroke-muted-foreground size-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
                />
                <Sun
                    class="stroke-muted-foreground absolute size-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
                />
                <span class="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" side="right">
            <DropdownMenuItem @click="mode = 'light'">Light</DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'dark'">Dark</DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'auto'">System</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
