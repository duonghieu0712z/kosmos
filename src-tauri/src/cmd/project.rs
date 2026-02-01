use std::fs;
use std::path::PathBuf;
use std::sync::Mutex;

use chrono::Utc;
use sqlx::SqlitePool;
use tauri::{AppHandle, State};
use tempfile::TempDir;
use tokio::task;
use uuid::Uuid;

use crate::bundle::{self, ProjectMetadata};
use crate::config::Config;
use crate::constants::{
    APPLICATION_ID, ASSETS_DIR, DB_FILE, DB_META_KEY, METADATA_FILE, SCHEMA_VERSION,
};
use crate::error::{KosmosError, KosmosResult};

#[derive(Default)]
pub struct ProjectState {
    pub pool: Option<SqlitePool>,
    pub workspace: Option<PathBuf>,
    pub temp_handle: Option<TempDir>,
}

#[tauri::command]
#[specta::specta]
pub async fn create_project(
    name: String,
    path: PathBuf,
    app_handle: AppHandle,
    config_state: State<'_, Mutex<Config>>,
    project_state: State<'_, Mutex<ProjectState>>,
) -> KosmosResult<PathBuf> {
    let temp_dir = tempfile::tempdir()?;
    let workspace = temp_dir.path().to_path_buf();
    let db_file = workspace.join(DB_FILE);
    let assets_dir = workspace.join(ASSETS_DIR);
    fs::create_dir_all(&assets_dir)?;

    let pool = crate::db::init_pool(Some(db_file.clone())).await?;

    let metadata = ProjectMetadata {
        id: Uuid::now_v7(),
        name: name.clone(),
        schema_version: SCHEMA_VERSION,
        app_version: app_handle.package_info().version.clone(),
        created_at: Utc::now(),
        updated_at: Utc::now(),
    };

    let metadata_json = serde_json::to_string(&metadata)?;

    sqlx::query("INSERT INTO project_info (key, value) VALUES (?, jsonb(?))")
        .bind(DB_META_KEY)
        .bind(&metadata_json)
        .execute(&pool)
        .await?;

    let metadata_path = workspace.join(METADATA_FILE);
    fs::write(metadata_path, &metadata_json)?;

    let path_clone = path.clone();
    let workspace_clone = workspace.clone();
    task::spawn_blocking(move || bundle::pack(workspace_clone, path_clone)).await??;

    let res_db_path = workspace.join(DB_FILE);

    let old_state = {
        let mut state = project_state.lock()?;
        let old_pool = state.pool.take();
        let old_handle = state.temp_handle.take();

        state.pool = Some(pool);
        state.workspace = Some(workspace);
        state.temp_handle = Some(temp_dir);

        (old_pool, old_handle)
    };

    if let Some(op) = old_state.0 {
        op.close().await;
    }

    super::config::add_recent_project(name, path, app_handle, config_state)?;
    Ok(res_db_path)
}

#[tauri::command]
#[specta::specta]
pub async fn open_project(
    path: PathBuf,
    app_handle: AppHandle,
    config_state: State<'_, Mutex<Config>>,
    project_state: State<'_, Mutex<ProjectState>>,
) -> KosmosResult<PathBuf> {
    if !path.exists() {
        return Err(KosmosError::InvalidPath);
    }

    let temp_dir = tempfile::tempdir()?;
    let workspace = temp_dir.path().to_path_buf();

    let path_clone = path.clone();
    let workspace_clone = workspace.clone();
    task::spawn_blocking(move || bundle::unpack(path_clone, workspace_clone)).await??;

    let db_file_path = workspace.join(DB_FILE);
    let pool = crate::db::init_pool(Some(&db_file_path)).await?;

    let app_id: (i64,) = sqlx::query_as("PRAGMA application_id")
        .fetch_one(&pool)
        .await?;

    if app_id.0 != APPLICATION_ID as i64 {
        pool.close().await;
        return Err(KosmosError::InvalidFileFormat);
    }

    let (metadata_json,): (String,) =
        sqlx::query_as("SELECT json(value) FROM project_info WHERE key = ?")
            .bind(DB_META_KEY)
            .fetch_one(&pool)
            .await?;

    let metadata: ProjectMetadata = serde_json::from_str(&metadata_json)?;

    let old_state = {
        let mut state = project_state.lock()?;
        let old_pool = state.pool.take();
        let old_handle = state.temp_handle.take();

        state.pool = Some(pool);
        state.workspace = Some(workspace);
        state.temp_handle = Some(temp_dir);

        (old_pool, old_handle)
    };

    if let Some(op) = old_state.0 {
        op.close().await;
    }

    super::config::add_recent_project(metadata.name, path, app_handle, config_state)?;

    Ok(db_file_path)
}

#[tauri::command]
#[specta::specta]
pub async fn close_project(project_state: State<'_, Mutex<ProjectState>>) -> KosmosResult<()> {
    let old_state = {
        let mut state = project_state.lock()?;
        let pool = state.pool.take();
        let workspace = state.workspace.take();
        let temp_handle = state.temp_handle.take();
        (pool, workspace, temp_handle)
    };

    if let Some(p) = old_state.0 {
        p.close().await;
    }
    Ok(())
}
