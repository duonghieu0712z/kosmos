<script setup lang="ts">
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

import NewProjectDialog from './NewProjectDialog.vue';
import OpenProjectDialog from './OpenProjectDialog.vue';
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
            <OpenProjectDialog />
        </EmptyContent>
    </Empty>
</template>
