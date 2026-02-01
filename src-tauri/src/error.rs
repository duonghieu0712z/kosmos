use serde::{Serialize, Serializer};

#[derive(thiserror::Error, Debug, specta::Type)]
pub enum KosmosError {
    // --- Standard Library Errors ---
    #[error("IO error: {0}")]
    Io(
        #[from]
        #[specta(skip)]
        std::io::Error,
    ),

    #[error("Lock poisoned: {0}")]
    Poison(String),

    #[error("Path prefix error: {0}")]
    StripPrefix(
        #[from]
        #[specta(skip)]
        std::path::StripPrefixError,
    ),

    // --- External Library Errors ---
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

    #[error("Join error: {0}")]
    Join(
        #[from]
        #[specta(skip)]
        tokio::task::JoinError,
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

    #[error("Zip error: {0}")]
    Zip(
        #[from]
        #[specta(skip)]
        zip::result::ZipError,
    ),

    // --- Business Logic Errors ---
    #[error("Bundle error: {0}")]
    Bundle(String),

    #[error("Invalid file format")]
    InvalidFileFormat,

    #[error("Invalid path encountered")]
    InvalidPath,

    // --- Fallback Errors ---
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

impl<T> From<std::sync::PoisonError<T>> for KosmosError {
    fn from(e: std::sync::PoisonError<T>) -> Self {
        KosmosError::Poison(format!("{}: {}", std::any::type_name::<T>(), e))
    }
}

pub type KosmosResult<T> = Result<T, KosmosError>;
