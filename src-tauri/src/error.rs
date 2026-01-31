use serde::{Serialize, Serializer};

#[derive(thiserror::Error, Debug, specta::Type)]
pub enum KosmosError {
    #[error("Database error: {0}")]
    Database(
        #[from]
        #[specta(skip)]
        sqlx::Error,
    ),

    #[error("Specta export error: {0}")]
    Export(
        #[from]
        #[specta(skip)]
        specta_typescript::ExportError,
    ),

    #[error("IO error: {0}")]
    Io(
        #[from]
        #[specta(skip)]
        std::io::Error,
    ),

    #[error("JSON error: {0}")]
    SerdeJson(
        #[from]
        #[specta(skip)]
        serde_json::Error,
    ),

    #[error("Tauri error: {0}")]
    Tauri(
        #[from]
        #[specta(skip)]
        tauri::Error,
    ),

    #[error("Invalid path encountered")]
    InvalidPath,

    #[error("Internal error: {0}")]
    Internal(String),
}

impl Serialize for KosmosError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        log::error!("{self}");
        serializer.serialize_str(&self.to_string())
    }
}

pub type KosmosResult<T> = Result<T, KosmosError>;
