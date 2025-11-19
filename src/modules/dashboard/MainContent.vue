<script setup lang="ts">
import { SidebarInset } from '@/components/ui/sidebar';
import { Todo } from '@/modules/todo';
</script>

<template>
    <SidebarInset class="items-center justify-center">
        <Todo />
    </SidebarInset>
</template>
