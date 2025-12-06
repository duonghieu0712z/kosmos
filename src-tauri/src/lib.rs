// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use tauri::Manager;
use tokio::sync::Mutex;

use crate::manager::{AppManager, new_project, open_project};

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

    builder
        .setup(|app| {
            app.manage(Mutex::new(AppManager::default()));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![new_project, open_project])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
