import { defineStore } from 'pinia';
import { ref } from 'vue';

import { createProject, openProject } from '@/events';

export interface Project {
    id: string;
    name: string;
    description: string;
    author: string;
    genres: string[];
    createdAt: number;
    modifiedAt: number;
}

export const useProjectStore = defineStore('project', () => {
    const project = ref<Project | null>(null);

    const _createProject = async (...args: Parameters<typeof createProject>) => {
        project.value = await createProject(...args);
    };

    const _openProject = async (...args: Parameters<typeof openProject>) => {
        project.value = await openProject(...args);
    };

    return {
        project,
        createProject: _createProject,
        openProject: _openProject,
    };
});
