mod bundle;
mod cmd;
mod config;
mod constants;
mod db;
mod error;

use std::sync::Mutex;

#[cfg(debug_assertions)]
use specta_typescript::Typescript;
use tauri::Manager;
use tauri_specta::{Builder, collect_commands};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() -> error::KosmosResult<()> {
    let specta_builder = Builder::<tauri::Wry>::new().commands(collect_commands![
        cmd::config::add_recent_project,
        cmd::config::get_config,
        cmd::config::update_settings,
        cmd::project::close_project,
        cmd::project::create_project,
        cmd::project::open_project,
        cmd::util::greet
    ]);

    #[cfg(all(debug_assertions, not(mobile)))]
    specta_builder.export(Typescript::default(), "../src/bindings.ts")?;

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
                    "[{}]|{:<5}: {}",
                    chrono::Local::now().format("%Y-%m-%d %H:%M:%S"),
                    record.level(),
                    message
                ))
            })
            .build(),
    );

    builder
        .invoke_handler(specta_builder.invoke_handler())
        .setup(|app| {
            let config = config::Config::load(app.handle())?;
            app.manage(Mutex::new(config));
            app.manage(Mutex::new(cmd::project::ProjectState::default()));

            #[cfg(debug_assertions)]
            {
                if let Some(window) = app.get_webview_window("main") {
                    window.open_devtools();
                }
            }
            Ok(())
        })
        .run(tauri::generate_context!())?;

    Ok(())
}
