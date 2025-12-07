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
import { openProject } from '@/events';

import RecentProjectsTable from './RecentProjectsTable.vue';

const path = ref('');

async function selectPath() {
    const newPath = await open({ filters: [{ name: 'Kosmos Project', extensions: ['kosmos'] }] });
    if (newPath) {
        path.value = newPath;
    }
}
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

            <div class="grid grid-cols-7 items-center gap-1">
                <Label for="path">Project name</Label>

                <InputGroup class="col-span-6 h-8">
                    <InputGroupInput
                        id="path"
                        v-model="path"
                        autocapitalize="off"
                        autocomplete="off"
                        autocorrect="off"
                    />

                    <InputGroupAddon align="inline-end">
                        <InputGroupButton @click="selectPath">
                            <FolderOpen />
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </div>

            <RecentProjectsTable v-model:selected="path" />

            <DialogFooter>
                <DialogClose as-child>
                    <Button :disabled="!path" variant="outline" @click="openProject(path)">Open project</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
