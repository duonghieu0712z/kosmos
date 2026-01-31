use std::fs;
#[cfg(debug_assertions)]
use std::path::Path;
use std::str::FromStr;

use sqlx::sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePool, SqlitePoolOptions};
use tauri::AppHandle;
#[cfg(not(debug_assertions))]
use tauri::Manager;

#[cfg(not(debug_assertions))]
use crate::error::KosmosError;
use crate::error::KosmosResult;

#[allow(dead_code)]
pub async fn init_pool(_app_handle: &AppHandle) -> KosmosResult<SqlitePool> {
    #[cfg(debug_assertions)]
    let db_path = {
        let temp_dir = Path::new("temp");
        if !temp_dir.exists() {
            fs::create_dir_all(temp_dir)?;
        }
        "sqlite:temp/kosmos.db".to_string()
    };

    #[cfg(not(debug_assertions))]
    let db_path = {
        let app_dir = _app_handle.path().app_data_dir()?;
        if !app_dir.exists() {
            fs::create_dir_all(&app_dir)?;
        }
        let app_dir_str = app_dir.to_str().ok_or(KosmosError::InvalidPath)?;
        format!("sqlite:{}/kosmos.db", app_dir_str)
    };

    let connection_options = SqliteConnectOptions::from_str(&db_path)?
        .create_if_missing(true)
        .journal_mode(SqliteJournalMode::Wal)
        .foreign_keys(true);

    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect_with(connection_options)
        .await?;

    Ok(pool)
}
