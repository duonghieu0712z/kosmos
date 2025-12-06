<script setup lang="ts">
import { open } from '@tauri-apps/plugin-dialog';
import { FolderOpen, FolderPlus, X } from 'lucide-vue-next';
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
import { newProject } from '@/events';

const name = ref('New Project');
const path = ref('');

async function selectPath() {
    const newPath = await open({ directory: true });
    if (newPath) {
        path.value = newPath;
    }
}

async function createProject() {
    await newProject(name.value, path.value);
}
</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <Button variant="outline">
                <FolderPlus />
                <span>New Project</span>
            </Button>
        </DialogTrigger>

        <DialogContent>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>Create a new project</DialogDescription>

            <div class="grid gap-4">
                <div class="grid grid-cols-4 items-center gap-1">
                    <Label for="name">Project name</Label>

                    <InputGroup class="col-span-3 h-8">
                        <InputGroupInput id="name" v-model="name" />

                        <InputGroupAddon align="inline-end">
                            <InputGroupButton @click="name = ''">
                                <X />
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <div class="grid grid-cols-4 items-center gap-1">
                    <Label for="path">Location</Label>

                    <InputGroup class="col-span-3 h-8">
                        <InputGroupInput id="path" v-model="path" />

                        <InputGroupAddon align="inline-end">
                            <InputGroupButton @click="selectPath">
                                <FolderOpen />
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </div>

            <DialogFooter>
                <DialogClose as-child>
                    <Button :disabled="!name || !path" variant="outline" @click="createProject">Create project</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
