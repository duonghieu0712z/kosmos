<script setup lang="ts">
import { open } from '@tauri-apps/plugin-dialog';
import { FolderOpen } from 'lucide-vue-next';
import { ref } from 'vue';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { useProjectStore } from '@/stores';

import RecentProjectsTable from './RecentProjectsTable.vue';

const store = useProjectStore();

const file = ref('');

const selectFile = async () => {
    const path = await open({ filters: [{ name: 'Kosmos Project', extensions: ['kosmos'] }] });
    if (path) {
        file.value = path;
    }
};

const openProject = async () => {
    await store.openProject(file.value);
    file.value = '';
};
</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button variant="outline">
                <FolderOpen />
                <span>Open Project</span>
            </Button>
        </DialogTrigger>

        <DialogContent class="max-w-200!">
            <DialogTitle>Open Project</DialogTitle>
            <DialogDescription>Open an existing project</DialogDescription>

            <div class="grid grid-cols-[100px_1fr] items-center gap-1">
                <Label for="path">Project name</Label>

                <InputGroup class="h-8 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
                    <InputGroupInput
                        id="path"
                        v-model="file"
                        autocapitalize="off"
                        autocomplete="off"
                        autocorrect="off"
                    />

                    <InputGroupAddon align="inline-end">
                        <InputGroupButton @click="selectFile">
                            <FolderOpen />
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </div>

            <RecentProjectsTable v-model:selected="file" />

            <DialogFooter>
                <DialogClose as-child>
                    <Button :disabled="!file" variant="outline" @click="openProject">Open project</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
