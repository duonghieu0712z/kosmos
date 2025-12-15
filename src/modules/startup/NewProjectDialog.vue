<script setup lang="ts">
import { open } from '@tauri-apps/plugin-dialog';
import { FolderOpen, FolderPlus } from 'lucide-vue-next';
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
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { createProject } from '@/events';

const name = ref('New Project');
const path = ref('');

async function selectPath() {
    const newPath = await open({ directory: true });
    if (newPath) {
        path.value = newPath;
    }
}

async function newProject() {
    await createProject(name.value, path.value);
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
                <div class="grid grid-cols-[100px_1fr] items-center gap-1">
                    <Label for="name">Project name</Label>

                    <InputGroup class="h-8 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
                        <InputGroupInput
                            id="name"
                            v-model="name"
                            autocapitalize="off"
                            autocomplete="off"
                            autocorrect="off"
                        />

                        <InputGroupAddon align="inline-end">
                            <InputGroupText>.kosmos</InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <div class="grid grid-cols-[100px_1fr] items-center gap-1">
                    <Label for="path">Location</Label>

                    <InputGroup class="h-8 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
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
            </div>

            <DialogFooter>
                <DialogClose as-child>
                    <Button :disabled="!name || !path" variant="outline" @click="newProject">Create project</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
