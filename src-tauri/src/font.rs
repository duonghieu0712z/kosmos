use font_kit::source::SystemSource;

#[tauri::command]
pub(crate) fn get_fonts() -> Vec<String> {
    let source = SystemSource::new();
    let fonts = source.all_families();

    match fonts {
        Ok(mut fonts) => {
            fonts.sort_by_key(|font| font.to_lowercase());
            fonts
        }
        Err(_) => {
            eprintln!("Failed to load system fonts.");
            vec![]
        }
    }
}
