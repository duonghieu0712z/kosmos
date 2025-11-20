// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default();
    #[cfg(debug_assertions)]
    let builder = builder.plugin(tauri_plugin_devtools::init());

    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
