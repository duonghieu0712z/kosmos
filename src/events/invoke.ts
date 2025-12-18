import { invoke } from '@tauri-apps/api/core';

import type { Project } from '@/stores';
import type { RecentProject } from '@/types';

export async function createProject(name: string, path: string) {
    try {
        return await invoke<Project>('create_project', { name, path });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function openProject(file: string) {
    try {
        return await invoke<Project>('open_project', { file });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getRecentProjects() {
    return await invoke<RecentProject[]>('get_recent_projects');
}
