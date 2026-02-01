use std::path::PathBuf;
use std::sync::Mutex;

use chrono::Utc;
use tauri::{AppHandle, State};

use crate::config::{Config, RecentProject, Settings};
use crate::constants::MAX_RECENT_PROJECTS;
use crate::error::KosmosResult;

#[tauri::command]
#[specta::specta]
pub fn get_config(config_state: State<'_, Mutex<Config>>) -> KosmosResult<Config> {
    let config = config_state.lock()?;
    Ok(config.clone())
}

#[tauri::command]
#[specta::specta]
pub fn update_settings(
    settings: Settings,
    app_handle: AppHandle,
    config_state: State<'_, Mutex<Config>>,
) -> KosmosResult<()> {
    let mut config = config_state.lock()?;
    config.settings = settings;
    config.save(&app_handle)?;
    Ok(())
}

#[tauri::command]
#[specta::specta]
pub fn add_recent_project(
    name: String,
    path: PathBuf,
    app_handle: AppHandle,
    config_state: State<'_, Mutex<Config>>,
) -> KosmosResult<()> {
    let mut config = config_state.lock()?;

    config.recent_projects.retain(|p| p.path != path);
    config.recent_projects.insert(
        0,
        RecentProject {
            name,
            path,
            last_opened: Utc::now(),
        },
    );

    if config.recent_projects.len() > MAX_RECENT_PROJECTS {
        config.recent_projects.truncate(MAX_RECENT_PROJECTS);
    }

    config.save(&app_handle)?;
    Ok(())
}
