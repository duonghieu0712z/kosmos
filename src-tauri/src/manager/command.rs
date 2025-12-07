use std::{collections::BTreeMap, path::PathBuf};

use tauri::State;
use tokio::sync::Mutex;

use crate::{
    error::{KosmosResult, log_error},
    project::ProjectData,
};

use super::AppManager;

#[tauri::command]
pub async fn new_project(
    state: State<'_, Mutex<AppManager>>,
    name: &str,
    path: &str,
) -> KosmosResult<ProjectData> {
    log::info!("Create new project: {name}");
    let mut manager = state.lock().await;
    let result = manager.new_project(name, PathBuf::from(path)).await;
    log_error(result)
}

#[tauri::command]
pub async fn open_project(
    state: State<'_, Mutex<AppManager>>,
    path: &str,
) -> KosmosResult<ProjectData> {
    log::info!("Open project: {path}");
    let mut manager = state.lock().await;
    let result = manager.open_project(PathBuf::from(path)).await;
    log_error(result)
}

#[tauri::command]
pub async fn get_recent_projects(
    state: State<'_, Mutex<AppManager>>,
) -> KosmosResult<BTreeMap<String, String>> {
    log::info!("Get recent projects");
    let manager = state.lock().await;
    let projects = manager.get_recent_projects();
    Ok(projects)
}
