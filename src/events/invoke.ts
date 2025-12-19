import { invoke } from '@tauri-apps/api/core';

import type { Book, BookManifest, Chapter, ChapterManifest, Project } from '@/stores';
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
    try {
        return await invoke<RecentProject[]>('get_recent_projects');
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getBooks() {
    try {
        return await invoke<BookManifest[]>('get_books');
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getBook(id: string) {
    try {
        return await invoke<Book>('get_book', { id });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getChapters(id: string) {
    try {
        return await invoke<ChapterManifest[]>('get_chapters', { id });
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getChapter(id: string) {
    try {
        return await invoke<Chapter>('get_chapter', { id });
    } catch (error) {
        console.error(error);
        return null;
    }
}
