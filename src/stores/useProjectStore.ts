import { defineStore } from 'pinia';
import { ref } from 'vue';

import { createProject, getBook, getBooks, getChapter, getChapters, openProject } from '@/events';

export interface Project {
    id: string;
    name: string;
    description: string;
    author: string;
    genres: string[];
    createdAt: number;
    modifiedAt: number;
}

export interface Book {
    id: string;
    title: string;
    description: string;
    createdAt: number;
    modifiedAt: number;
}

export type BookManifest = Pick<Book, 'id' | 'title'> & { children: ChapterManifest[] };

export interface Chapter {
    id: string;
    parentId: string;
    title: string;
    status: string;
    wordCount: number;
    createdAt: number;
    modifiedAt: number;
}

export type ChapterManifest = Pick<Chapter, 'id' | 'title'>;

export const useProjectStore = defineStore('project', () => {
    const project = ref<Project | null>(null);
    const books = ref<BookManifest[]>([]);

    const _getChapters = async (id: string) => {
        if (project.value) {
            const book = books.value.find((book) => book.id === id);
            if (book) {
                book.children = await getChapters(id);
            }
        }
    };

    const _getChapter = async (id: string) => {
        if (project.value) {
            return await getChapter(id);
        }
    };

    const _getBooks = async () => {
        if (project.value) {
            books.value = await getBooks();
            for (const book of books.value) {
                await _getChapters(book.id);
            }
        }
    };

    const _getBook = async (id: string) => {
        if (project.value) {
            return await getBook(id);
        }
    };

    const _createProject = async (...args: Parameters<typeof createProject>) => {
        project.value = await createProject(...args);
        await _getBooks();
    };

    const _openProject = async (...args: Parameters<typeof openProject>) => {
        project.value = await openProject(...args);
        await _getBooks();
    };

    return {
        project,
        books,
        createProject: _createProject,
        openProject: _openProject,
        getBooks: _getBooks,
        getBook: _getBook,
        getChapters: _getChapters,
        getChapter: _getChapter,
    };
});
