import { invoke } from '@tauri-apps/api/core';

export async function newProject(name: string, path: string) {
    try {
        const result = await invoke('new_project', { name, path });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

export async function openProject(path: string) {
    try {
        const result = await invoke('open_project', { path });
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
