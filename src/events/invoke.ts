import { invoke } from '@tauri-apps/api/core';

import type { RecentProject } from '@/types';

export async function createProject(name: string, path: string) {
    try {
        const result = await invoke('create_project', { name, path });
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export async function openProject(file: string) {
    try {
        const result = await invoke('open_project', { file });
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export async function getRecentProjects() {
    return await invoke<RecentProject[]>('get_recent_projects');
}
