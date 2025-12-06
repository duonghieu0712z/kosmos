<script setup lang="ts">
import { FolderOpen, FolderPlus } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
</script>

<template>
    <Empty>
        <EmptyHeader>
            <EmptyMedia>
                <img alt="logo" class="size-40" draggable="false" src="@/assets/images/logo.png" />
            </EmptyMedia>

            <EmptyTitle>No Project Yet</EmptyTitle>
            <EmptyDescription>
                You haven't created any projects yet. Get started by creating your first project.
            </EmptyDescription>
        </EmptyHeader>

        <EmptyContent class="flex-row justify-center">
            <Button variant="outline">
                <FolderPlus />
                <span>New Project</span>
            </Button>

            <Button variant="outline">
                <FolderOpen />
                <span>Open Project</span>
            </Button>
        </EmptyContent>
    </Empty>
</template>
