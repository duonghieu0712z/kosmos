use tauri::{State, async_runtime::Mutex};

use crate::{
    error::KosmosResult,
    project::{ProjectCache, ProjectData},
};

use super::AppManager;

#[tauri::command]
pub async fn create_project(
    state: State<'_, Mutex<AppManager>>,
    file: String,
) -> KosmosResult<ProjectData> {
    let mut manager = state.lock().await;
    let project_manager = manager.project_manager_mut();
    project_manager.create_project(file)?;
    let project = project_manager.project().clone();
    Ok(project)
}

#[tauri::command]
pub async fn open_project(
    state: State<'_, Mutex<AppManager>>,
    file: &str,
) -> KosmosResult<ProjectData> {
    let mut manager = state.lock().await;
    let project_manager = manager.project_manager_mut();
    project_manager.open_project(file)?;
    let project = project_manager.project().clone();
    Ok(project)
}

#[tauri::command]
pub async fn get_recent_projects(
    state: State<'_, Mutex<AppManager>>,
) -> KosmosResult<Vec<ProjectCache>> {
    let manager = state.lock().await;
    let cache_manager = manager.cache_manager();
    let projects = cache_manager.data().projects.clone();
    Ok(projects)
}
