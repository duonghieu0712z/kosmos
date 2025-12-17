use std::sync::Mutex;

use tauri::State;

use crate::{cache::RecentProject, error::KosmosResult, project::ProjectData};

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
