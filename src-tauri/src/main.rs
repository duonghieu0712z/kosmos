#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    if let Err(e) = kosmos_lib::run() {
        eprintln!("{e}");
        std::process::exit(1);
    }
}
