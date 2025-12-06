use std::path::PathBuf;

use tauri::State;
use tokio::sync::Mutex;

use crate::{error::KosmosResult, project::ProjectData};

use super::AppManager;

#[tauri::command]
pub async fn new_project(
    state: State<'_, Mutex<AppManager>>,
    name: &str,
    path: &str,
) -> KosmosResult<ProjectData> {
    let mut manager = state.lock().await;
    manager.new_project(name, &PathBuf::from(path)).await
}

#[tauri::command]
pub async fn open_project(
    state: State<'_, Mutex<AppManager>>,
    path: &str,
) -> KosmosResult<ProjectData> {
    let mut manager = state.lock().await;
    manager.open_project(&PathBuf::from(path)).await
}
