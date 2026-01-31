use std::path::PathBuf;
use std::sync::Mutex;

use chrono::Utc;
use tauri::{AppHandle, State, command};

use crate::config::{Config, RecentProject, Settings};
use crate::error::{KosmosError, KosmosResult};

#[command]
#[specta::specta]
pub fn greet(name: String) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[command]
#[specta::specta]
pub fn get_config(config_state: State<'_, Mutex<Config>>) -> KosmosResult<Config> {
    let config = config_state
        .lock()
        .map_err(|e| KosmosError::Internal(e.to_string()))?;
    Ok(config.clone())
}

#[command]
#[specta::specta]
pub fn update_settings(
    settings: Settings,
    app_handle: AppHandle,
    config_state: State<'_, Mutex<Config>>,
) -> KosmosResult<()> {
    let mut config = config_state
        .lock()
        .map_err(|e| KosmosError::Internal(e.to_string()))?;
    config.settings = settings;
    config.save(&app_handle)?;
    Ok(())
}

#[command]
#[specta::specta]
pub fn add_recent_project(
    name: String,
    path: PathBuf,
    app_handle: AppHandle,
    config_state: State<'_, Mutex<Config>>,
) -> KosmosResult<()> {
    let mut config = config_state
        .lock()
        .map_err(|e| KosmosError::Internal(e.to_string()))?;

    config.recent_projects.retain(|p| p.path != path);
    config.recent_projects.insert(
        0,
        RecentProject {
            name,
            path,
            last_opened: Utc::now(),
        },
    );

    if config.recent_projects.len() > 10 {
        config.recent_projects.truncate(10);
    }

    config.save(&app_handle)?;
    Ok(())
}
