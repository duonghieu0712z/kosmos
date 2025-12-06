<script setup lang="ts">
import { open } from '@tauri-apps/plugin-dialog';
import { FolderOpen } from 'lucide-vue-next';

import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { openProject } from '@/events';

import NewProjectDialog from './NewProjectDialog.vue';

async function onOpenProject() {
    const path = await open({ filters: [{ name: 'Kosmos Project', extensions: ['kosmos'] }] });
    if (!path) {
        return;
    }
    await openProject(path);
}
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
            <NewProjectDialog />

            <Button variant="outline" @click="onOpenProject">
                <FolderOpen />
                <span>Open Project</span>
            </Button>
        </EmptyContent>
    </Empty>
</template>
