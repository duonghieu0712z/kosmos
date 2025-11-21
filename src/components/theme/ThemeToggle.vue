<script setup lang="ts">
import { UseColorMode } from '@vueuse/components';
import { Laptop2, Moon, Sun } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
</script>

<template>
    <UseColorMode v-slot="color">
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button class="hover:[&>svg]:stroke-sidebar-foreground size-12" size="icon" variant="ghost">
                    <Sun v-if="color.mode === 'light'" class="stroke-muted-foreground size-6" />
                    <Moon v-else-if="color.mode === 'dark'" class="stroke-muted-foreground size-6" />
                    <Laptop2 v-else class="stroke-muted-foreground size-6" />
                    <span class="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" side="right">
                <DropdownMenuItem @click="color.mode = 'light'">Light</DropdownMenuItem>
                <DropdownMenuItem @click="color.mode = 'dark'">Dark</DropdownMenuItem>
                <DropdownMenuItem @click="color.mode = 'auto'">System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </UseColorMode>
</template>
