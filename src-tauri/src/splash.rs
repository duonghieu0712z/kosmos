use std::sync::Mutex;

use tauri::{AppHandle, Manager, State};
use tokio::time::{Duration, sleep};

pub(crate) struct SetupState {
    pub(crate) frontend_task: bool,
    pub(crate) backend_task: bool,
}

pub(crate) async fn setup(app: AppHandle) -> Result<(), ()> {
    println!("Start backend setup task...");
    sleep(Duration::from_secs(3)).await;
    println!("Backend setup task completed!");

    set_complete(
        app.clone(),
        app.state::<Mutex<SetupState>>(),
        "backend".to_string(),
    )
    .await?;

    Ok(())
}

#[tauri::command]
pub(crate) async fn set_complete(
    app: AppHandle,
    state: State<'_, Mutex<SetupState>>,
    task: String,
) -> Result<(), ()> {
    let mut state_lock = state.lock().unwrap();
    match task.as_str() {
        "frontend" => state_lock.frontend_task = true,
        "backend" => state_lock.backend_task = true,
        _ => panic!("Invalid task completed!"),
    }

    if state_lock.backend_task && state_lock.frontend_task {
        let splash_window = app.get_webview_window("splash").unwrap();
        let main_window = app.get_webview_window("main").unwrap();

        splash_window.close().unwrap();
        main_window.show().unwrap();
    }

    Ok(())
}
