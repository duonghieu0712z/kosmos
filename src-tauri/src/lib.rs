// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

mod book;
mod cache;
mod chapter;
mod constants;
mod enums;
mod error;
mod file;
mod json;
mod manager;
mod project;
mod version;

use std::sync::Mutex;

use tauri::Manager;

use crate::manager::{
    AppManager, close_project, create_project, get_recent_projects, open_project,
};

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
            .level(tauri_plugin_log::log::LevelFilter::Info)
            .filter(|metadata| metadata.target().starts_with("kosmos"))
            .format(|out, message, record| {
                out.finish(format_args!(
                    "[{}][{}] {}",
                    chrono::Local::now().format("%Y-%m-%d %H:%M:%S"),
                    record.level(),
                    message
                ))
            })
            .build(),
    );

    builder
        .setup(|app| {
            let handle = app.app_handle();
            let manager = AppManager::new(handle)
                .inspect_err(|e| log::error!("{e}"))
                .unwrap();
            let mutex = Mutex::new(manager);
            app.manage(mutex);
            Ok(())
        })
        .on_window_event(|window, event| {
            let handle = window.app_handle();
            let state = handle.state::<Mutex<AppManager>>();
            match event {
                tauri::WindowEvent::CloseRequested { .. } => {
                    close_project(state)
                        .inspect_err(|e| log::error!("{e}"))
                        .unwrap();
                }
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![
            create_project,
            open_project,
            close_project,
            get_recent_projects
        ])
        .run(tauri::generate_context!())
        .inspect_err(|e| log::error!("{e}"))
        .expect("error while running tauri application");
}
