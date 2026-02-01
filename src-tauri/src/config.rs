use std::fs;
use std::path::PathBuf;

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use specta::Type;
use tauri::{AppHandle, Manager};

use crate::constants::CONFIG_FILE;
use crate::error::KosmosResult;

const DEFAULT_THEME: &str = "system";
const DEFAULT_LANGUAGE: &str = "en";

#[derive(Serialize, Deserialize, Debug, Clone, Type)]
#[serde(rename_all = "camelCase")]
pub struct Settings {
    pub theme: String,
    pub language: String,
}

impl Default for Settings {
    fn default() -> Self {
        Self {
            theme: DEFAULT_THEME.into(),
            language: DEFAULT_LANGUAGE.into(),
        }
    }
}

#[derive(Serialize, Deserialize, Debug, Clone, Type)]
#[serde(rename_all = "camelCase")]
pub struct RecentProject {
    pub name: String,
    pub path: PathBuf,
    #[serde(with = "chrono::serde::ts_seconds")]
    #[specta(type = f64)]
    pub last_opened: DateTime<Utc>,
}

#[derive(Serialize, Deserialize, Debug, Clone, Default, Type)]
#[serde(rename_all = "camelCase")]
pub struct Config {
    pub settings: Settings,
    pub recent_projects: Vec<RecentProject>,
}

impl Config {
    pub fn load(app_handle: &AppHandle) -> KosmosResult<Self> {
        let config_dir = app_handle.path().app_config_dir()?;
        if !config_dir.exists() {
            fs::create_dir_all(&config_dir)?;
        }

        let config_path = config_dir.join(CONFIG_FILE);
        if !config_path.exists() {
            let config = Self::default();
            config.save(app_handle)?;
            return Ok(config);
        }

        let content = fs::read_to_string(config_path)?;
        let config = serde_json::from_str(&content)?;
        Ok(config)
    }

    pub fn save(&self, app_handle: &AppHandle) -> KosmosResult<()> {
        let config_dir = app_handle.path().app_config_dir()?;
        let config_path = config_dir.join(CONFIG_FILE);
        let content = serde_json::to_string(self)?;
        fs::write(config_path, content)?;
        Ok(())
    }
}
