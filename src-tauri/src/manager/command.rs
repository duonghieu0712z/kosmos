use std::sync::Mutex;

use tauri::State;
use uuid::Uuid;

use crate::{
    book::{BookChapterData, BookData},
    cache::RecentProject,
    chapter::ChapterData,
    error::KosmosResult,
    project::ProjectData,
};

use super::AppManager;

#[tauri::command]
pub fn create_project(
    state: State<'_, Mutex<AppManager>>,
    name: &str,
    path: &str,
) -> KosmosResult<ProjectData> {
    let mut manager = state.lock()?;
    let project = manager.create_project(name, path)?;
    Ok(project.clone())
}

#[tauri::command]
pub fn open_project(state: State<'_, Mutex<AppManager>>, file: &str) -> KosmosResult<ProjectData> {
    let mut manager = state.lock()?;
    let project = manager.open_project(file)?;
    Ok(project.clone())
}

#[tauri::command]
pub fn close_project(state: State<'_, Mutex<AppManager>>) -> KosmosResult<()> {
    let mut manager = state.lock()?;
    manager.close_project()
}

#[tauri::command]
pub fn get_recent_projects(
    state: State<'_, Mutex<AppManager>>,
) -> KosmosResult<Vec<RecentProject>> {
    let manager = state.lock()?;
    let projects = manager.recent_projects();
    Ok(projects.clone())
}

#[tauri::command]
pub fn get_books(state: State<'_, Mutex<AppManager>>) -> KosmosResult<Vec<BookChapterData>> {
    let manager = state.lock()?;
    let books = manager.books();
    Ok(books.clone())
}

#[tauri::command]
pub fn get_book(state: State<'_, Mutex<AppManager>>, id: Uuid) -> KosmosResult<BookData> {
    let mut manager = state.lock()?;
    let book = manager.book(&id)?;
    Ok(book.clone())
}

#[tauri::command]
pub fn get_chapters(
    state: State<'_, Mutex<AppManager>>,
    id: Uuid,
) -> KosmosResult<Vec<BookChapterData>> {
    let mut manager = state.lock()?;
    let chapters = manager.chapters(&id)?;
    Ok(chapters.clone())
}

#[tauri::command]
pub fn get_chapter(state: State<'_, Mutex<AppManager>>, id: Uuid) -> KosmosResult<ChapterData> {
    let mut manager = state.lock()?;
    let chapter = manager.chapter(&id)?;
    Ok(chapter.clone())
}
