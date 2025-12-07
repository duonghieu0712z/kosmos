<script setup lang="ts">
import { useArrayMap, useTimeAgo, useVModel } from '@vueuse/core';
import { EllipsisVertical, Folder, Star } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getRecentProjects } from '@/events';
import type { RecentProject } from '@/types';

const props = defineProps<{ selected: string }>();

const emits = defineEmits(['update:selected']);

const selected = useVModel(props, 'selected', emits);

const recentProjects = ref<RecentProject[]>([]);

const projects = useArrayMap(recentProjects, (project) => ({
    ...project,
    lastOpened: useTimeAgo(project.lastOpened),
}));

onMounted(async () => {
    recentProjects.value = await getRecentProjects();
});
</script>

<template>
    <Table class="table-fixed">
        <TableHeader>
            <TableRow>
                <TableHead class="w-8"></TableHead>
                <TableHead class="w-24">Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead class="w-8"></TableHead>
                <TableHead class="w-30 text-center">Last opened</TableHead>
                <TableHead class="w-8"></TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            <TableRow
                v-for="project in projects"
                :key="project.path"
                class="text-xs [&>td]:p-1.5"
                :data-state="project.path === selected ? 'selected' : ''"
                @click="selected = project.path"
            >
                <TableCell class="flex items-center justify-center"><Folder class="size-5" /></TableCell>
                <TableCell class="truncate">{{ project.name }}</TableCell>
                <TableCell class="truncate">{{ project.path }}</TableCell>
                <TableCell class="flex items-center justify-center"><Star class="size-5" /></TableCell>
                <TableCell class="text-center">{{ project.lastOpened }}</TableCell>
                <TableCell class="flex items-center justify-center"><EllipsisVertical class="size-5" /></TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>
