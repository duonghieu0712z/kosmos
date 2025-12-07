// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use tauri::Manager;
use tokio::sync::Mutex;

use crate::manager::{AppManager, get_recent_projects, new_project, open_project};

mod cache;
mod constants;
mod error;
mod manager;
mod project;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init());

    #[cfg(debug_assertions)]
    let builder = builder.plugin(tauri_plugin_devtools::init());

    #[cfg(not(debug_assertions))]
    let builder = builder.plugin(
        tauri_plugin_log::Builder::new()
            .target(tauri_plugin_log::Target::new(
                tauri_plugin_log::TargetKind::LogDir { file_name: None },
            ))
            .level(tauri_plugin_log::log::LevelFilter::Info)
            .filter(|metadata| metadata.target().starts_with("kosmos"))
            .build(),
    );

    builder
        .setup(|app| {
            let handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                handle.manage(Mutex::new(
                    AppManager::new(&handle)
                        .await
                        .map_err(|e| {
                            log::error!("{}", e);
                            e
                        })
                        .unwrap(),
                ));
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            new_project,
            open_project,
            get_recent_projects
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
