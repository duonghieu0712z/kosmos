use serde::{Serialize, Serializer};

#[derive(thiserror::Error, Debug)]
pub enum KosmosError {
    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),

    #[error("Specta export error: {0}")]
    Export(#[from] specta_typescript::ExportError),

    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),

    #[error("JSON error: {0}")]
    SerdeJson(#[from] serde_json::Error),

    #[error("Tauri error: {0}")]
    Tauri(#[from] tauri::Error),

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
